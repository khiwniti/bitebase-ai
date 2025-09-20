'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

// Enhanced interfaces for shared state management
export interface GenerativeComponent {
  id: string;
  type: 'text' | 'chart' | 'table' | 'map' | 'image' | 'heading' | 'list' | 'quote' | 'divider';
  content: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  locked: boolean;
  interface: 'chat' | 'map' | 'report';
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SharedState {
  sessionId: string | null;
  status: 'idle' | 'running' | 'completed' | 'error';
  progress: number;
  currentAgent: string | null;
  parameters: {
    restaurantType?: string;
    cuisine?: string;
    location?: string;
    budget?: { min: number; max: number };
    radius?: number;
  };
  components: GenerativeComponent[];
  messages: Array<{
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    interface: 'chat' | 'map' | 'report';
  }>;
  agents: {
    product: { status: string; progress: number; data?: any };
    place: { status: string; progress: number; data?: any };
    price: { status: string; progress: number; data?: any };
    promotion: { status: string; progress: number; data?: any };
    report: { status: string; progress: number; data?: any };
  };
  currentInterface: 'chat' | 'map' | 'report';
}

interface SharedStateContextType {
  state: SharedState;
  
  // Session management
  createSession: (parameters: any) => Promise<string>;
  updateParameters: (parameters: Partial<SharedState['parameters']>) => void;
  
  // Component management
  createComponent: (component: Omit<GenerativeComponent, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateComponent: (id: string, updates: Partial<GenerativeComponent>) => void;
  deleteComponent: (id: string) => void;
  getComponentsByInterface: (interface: 'chat' | 'map' | 'report') => GenerativeComponent[];
  
  // Message management
  addMessage: (message: Omit<SharedState['messages'][0], 'id' | 'timestamp'>) => void;
  
  // Interface management
  setCurrentInterface: (interface: 'chat' | 'map' | 'report') => void;
  
  // Agent communication
  startResearch: () => Promise<void>;
  pauseResearch: () => Promise<void>;
  resumeResearch: () => Promise<void>;
  stopResearch: () => Promise<void>;
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
};

interface SharedStateProviderProps {
  children: ReactNode;
}

export const SharedStateProvider: React.FC<SharedStateProviderProps> = ({ children }) => {
  const [state, setState] = useState<SharedState>({
    sessionId: null,
    status: 'idle',
    progress: 0,
    currentAgent: null,
    parameters: {},
    components: [],
    messages: [],
    agents: {
      product: { status: 'pending', progress: 0 },
      place: { status: 'pending', progress: 0 },
      price: { status: 'pending', progress: 0 },
      promotion: { status: 'pending', progress: 0 },
      report: { status: 'pending', progress: 0 },
    },
    currentInterface: 'chat',
  });

  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    const socketConnection = io(backendUrl, {
      transports: ['websocket'],
      autoConnect: true,
    });

    socketConnection.on('connect', () => {
      console.log('Connected to backend server');
    });

    socketConnection.on('status-update', (data: any) => {
      setState(prev => ({
        ...prev,
        status: data.status,
        progress: data.progress || prev.progress,
        currentAgent: data.currentAgent || prev.currentAgent,
      }));
    });

    socketConnection.on('agent-update', (data: any) => {
      setState(prev => ({
        ...prev,
        agents: {
          ...prev.agents,
          [data.agentType]: {
            status: data.status,
            progress: data.progress,
            data: data.data,
          },
        },
      }));
    });

    socketConnection.on('component-update', (data: any) => {
      setState(prev => ({
        ...prev,
        components: prev.components.map(comp =>
          comp.id === data.componentId
            ? { ...comp, ...data.updates, updatedAt: new Date() }
            : comp
        ),
      }));
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // Session management
  const createSession = useCallback(async (parameters: any): Promise<string> => {
    const sessionId = uuidv4();
    
    setState(prev => ({
      ...prev,
      sessionId,
      parameters,
      status: 'idle',
      progress: 0,
    }));

    return sessionId;
  }, []);

  const updateParameters = useCallback((parameters: Partial<SharedState['parameters']>) => {
    setState(prev => ({
      ...prev,
      parameters: { ...prev.parameters, ...parameters },
    }));
  }, []);

  // Component management
  const createComponent = useCallback((component: Omit<GenerativeComponent, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newComponent: GenerativeComponent = {
      ...component,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setState(prev => ({
      ...prev,
      components: [...prev.components, newComponent],
    }));

    // Broadcast to other interfaces via WebSocket
    if (socket) {
      socket.emit('component-created', {
        sessionId: state.sessionId,
        component: newComponent,
      });
    }
  }, [socket, state.sessionId]);

  const updateComponent = useCallback((id: string, updates: Partial<GenerativeComponent>) => {
    setState(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === id
          ? { ...comp, ...updates, updatedAt: new Date() }
          : comp
      ),
    }));

    // Broadcast to other interfaces via WebSocket
    if (socket) {
      socket.emit('component-updated', {
        sessionId: state.sessionId,
        componentId: id,
        updates,
      });
    }
  }, [socket, state.sessionId]);

  const deleteComponent = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      components: prev.components.filter(comp => comp.id !== id),
    }));

    // Broadcast to other interfaces via WebSocket
    if (socket) {
      socket.emit('component-deleted', {
        sessionId: state.sessionId,
        componentId: id,
      });
    }
  }, [socket, state.sessionId]);

  const getComponentsByInterface = useCallback((interface: 'chat' | 'map' | 'report') => {
    return state.components.filter(comp => comp.interface === interface && comp.visible);
  }, [state.components]);

  // Message management
  const addMessage = useCallback((message: Omit<SharedState['messages'][0], 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: uuidv4(),
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  }, []);

  // Interface management
  const setCurrentInterface = useCallback((interface: 'chat' | 'map' | 'report') => {
    setState(prev => ({ ...prev, currentInterface: interface }));
  }, []);

  // Agent communication
  const startResearch = useCallback(async () => {
    if (!state.sessionId || !socket) return;

    setState(prev => ({ ...prev, status: 'running', progress: 0 }));

    socket.emit('start-research', {
      sessionId: state.sessionId,
      parameters: state.parameters,
    });
  }, [state.sessionId, state.parameters, socket]);

  const pauseResearch = useCallback(async () => {
    if (!state.sessionId || !socket) return;

    socket.emit('pause-research', { sessionId: state.sessionId });
  }, [state.sessionId, socket]);

  const resumeResearch = useCallback(async () => {
    if (!state.sessionId || !socket) return;

    socket.emit('resume-research', { sessionId: state.sessionId });
  }, [state.sessionId, socket]);

  const stopResearch = useCallback(async () => {
    if (!state.sessionId || !socket) return;

    setState(prev => ({ ...prev, status: 'idle', progress: 0 }));
    socket.emit('stop-research', { sessionId: state.sessionId });
  }, [state.sessionId, socket]);

  const contextValue: SharedStateContextType = {
    state,
    createSession,
    updateParameters,
    createComponent,
    updateComponent,
    deleteComponent,
    getComponentsByInterface,
    addMessage,
    setCurrentInterface,
    startResearch,
    pauseResearch,
    resumeResearch,
    stopResearch,
  };

  return (
    <SharedStateContext.Provider value={contextValue}>
      {children}
    </SharedStateContext.Provider>
  );
};