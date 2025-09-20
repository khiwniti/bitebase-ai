/**
 * Enhanced Shared State Management System
 * Provides real-time synchronization across chat, map, and report interfaces
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { io, Socket } from 'socket.io-client';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { 
  SharedStateModel, 
  StateChange, 
  GenerativeUIComponent, 
  AgentStatus, 
  ChatMessage,
  RestaurantRequirements,
  ProductAnalysis,
  PlaceAnalysis,
  PriceAnalysis,
  PromotionAnalysis
} from '../shared/types';

interface SharedState {
  // Session Management
  sessionId: string;
  userSessions: string[];
  currentInterface: 'chat' | 'map' | 'report';
  
  // Data Synchronization
  synchronizedData: Record<string, any>;
  version: number;
  lastModified: Date;
  changeLog: StateChange[];
  
  // Real-time Components
  generativeComponents: GenerativeUIComponent[];
  agentStatuses: Record<string, AgentStatus>;
  chatMessages: ChatMessage[];
  
  // Analysis Data
  requirements?: RestaurantRequirements;
  productAnalysis?: ProductAnalysis;
  placeAnalysis?: PlaceAnalysis;
  priceAnalysis?: PriceAnalysis;
  promotionAnalysis?: PromotionAnalysis;
  
  // WebSocket Connection
  socket?: Socket;
  ydoc?: Y.Doc;
  wsProvider?: WebsocketProvider;
  
  // Actions
  setCurrentInterface: (interfaceType: 'chat' | 'map' | 'report') => void;
  updateSynchronizedData: (data: Partial<Record<string, any>>) => void;
  addGenerativeComponent: (component: GenerativeUIComponent) => void;
  updateGenerativeComponent: (componentId: string, updates: Partial<GenerativeUIComponent>) => void;
  removeGenerativeComponent: (componentId: string) => void;
  updateAgentStatus: (agentId: string, status: Partial<AgentStatus>) => void;
  addChatMessage: (message: ChatMessage) => void;
  setRequirements: (requirements: RestaurantRequirements) => void;
  setAnalysisData: (type: 'product' | 'place' | 'price' | 'promotion', data: any) => void;
  initializeRealTimeSync: (sessionId: string) => void;
  cleanup: () => void;
}

export const useSharedState = create<SharedState>()(
  subscribeWithSelector((set, get) => ({
    // Initial State
    sessionId: '',
    userSessions: [],
    currentInterface: 'chat',
    synchronizedData: {},
    version: 0,
    lastModified: new Date(),
    changeLog: [],
    generativeComponents: [],
    agentStatuses: {},
    chatMessages: [],
    
    // Actions
    setCurrentInterface: (interfaceType) => {
      const currentState = get();
      const change: StateChange = {
        changeId: crypto.randomUUID(),
        userId: currentState.sessionId,
        timestamp: new Date(),
        action: 'interface_change',
        component: 'global',
        oldValue: currentState.currentInterface,
        newValue: interfaceType,
      };
      
      set({
        currentInterface: interfaceType,
        version: currentState.version + 1,
        lastModified: new Date(),
        changeLog: [...currentState.changeLog, change],
      });
    },
    
    updateSynchronizedData: (data) => {
      const currentState = get();
      const change: StateChange = {
        changeId: crypto.randomUUID(),
        userId: currentState.sessionId,
        timestamp: new Date(),
        action: 'data_update',
        component: 'synchronized_data',
        oldValue: currentState.synchronizedData,
        newValue: { ...currentState.synchronizedData, ...data },
      };
      
      set({
        synchronizedData: { ...currentState.synchronizedData, ...data },
        version: currentState.version + 1,
        lastModified: new Date(),
        changeLog: [...currentState.changeLog, change],
      });
      
      // Broadcast changes via WebSocket
      if (currentState.socket) {
        currentState.socket.emit('state_update', {
          sessionId: currentState.sessionId,
          change,
        });
      }
      
      // Update Yjs document
      if (currentState.ydoc) {
        const yData = currentState.ydoc.getMap('sharedData');
        Object.entries(data).forEach(([key, value]) => {
          yData.set(key, value);
        });
      }
    },
    
    addGenerativeComponent: (component) => {
      const currentState = get();
      const change: StateChange = {
        changeId: crypto.randomUUID(),
        userId: currentState.sessionId,
        timestamp: new Date(),
        action: 'component_add',
        component: component.componentId,
        newValue: component,
      };
      
      set({
        generativeComponents: [...currentState.generativeComponents, component],
        version: currentState.version + 1,
        lastModified: new Date(),
        changeLog: [...currentState.changeLog, change],
      });
    },
    
    updateGenerativeComponent: (componentId, updates) => {
      const currentState = get();
      const existingComponent = currentState.generativeComponents.find(c => c.componentId === componentId);
      
      if (existingComponent) {
        const updatedComponent = { ...existingComponent, ...updates };
        const change: StateChange = {
          changeId: crypto.randomUUID(),
          userId: currentState.sessionId,
          timestamp: new Date(),
          action: 'component_update',
          component: componentId,
          oldValue: existingComponent,
          newValue: updatedComponent,
        };
        
        set({
          generativeComponents: currentState.generativeComponents.map(c =>
            c.componentId === componentId ? updatedComponent : c
          ),
          version: currentState.version + 1,
          lastModified: new Date(),
          changeLog: [...currentState.changeLog, change],
        });
      }
    },
    
    removeGenerativeComponent: (componentId) => {
      const currentState = get();
      const componentToRemove = currentState.generativeComponents.find(c => c.componentId === componentId);
      
      if (componentToRemove) {
        const change: StateChange = {
          changeId: crypto.randomUUID(),
          userId: currentState.sessionId,
          timestamp: new Date(),
          action: 'component_remove',
          component: componentId,
          oldValue: componentToRemove,
          newValue: null,
        };
        
        set({
          generativeComponents: currentState.generativeComponents.filter(c => c.componentId !== componentId),
          version: currentState.version + 1,
          lastModified: new Date(),
          changeLog: [...currentState.changeLog, change],
        });
      }
    },
    
    updateAgentStatus: (agentId, status) => {
      const currentState = get();
      const updatedStatus = { ...currentState.agentStatuses[agentId], ...status };
      
      set({
        agentStatuses: {
          ...currentState.agentStatuses,
          [agentId]: updatedStatus,
        },
        version: currentState.version + 1,
        lastModified: new Date(),
      });
    },
    
    addChatMessage: (message) => {
      const currentState = get();
      set({
        chatMessages: [...currentState.chatMessages, message],
        version: currentState.version + 1,
        lastModified: new Date(),
      });
    },
    
    setRequirements: (requirements) => {
      const currentState = get();
      const change: StateChange = {
        changeId: crypto.randomUUID(),
        userId: currentState.sessionId,
        timestamp: new Date(),
        action: 'requirements_update',
        component: 'requirements',
        oldValue: currentState.requirements,
        newValue: requirements,
      };
      
      set({
        requirements,
        version: currentState.version + 1,
        lastModified: new Date(),
        changeLog: [...currentState.changeLog, change],
      });
    },
    
    setAnalysisData: (type, data) => {
      const currentState = get();
      const fieldName = `${type}Analysis` as keyof SharedState;
      const change: StateChange = {
        changeId: crypto.randomUUID(),
        userId: currentState.sessionId,
        timestamp: new Date(),
        action: 'analysis_update',
        component: fieldName as string,
        oldValue: currentState[fieldName],
        newValue: data,
      };
      
      set({
        [fieldName]: data,
        version: currentState.version + 1,
        lastModified: new Date(),
        changeLog: [...currentState.changeLog, change],
      } as any);
    },
    
    initializeRealTimeSync: (sessionId) => {
      const currentState = get();
      
      // Initialize WebSocket connection
      const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001', {
        query: { sessionId },
      });
      
      // Initialize Yjs document
      const ydoc = new Y.Doc();
      const wsProvider = new WebsocketProvider(
        process.env.NEXT_PUBLIC_YJS_WEBSOCKET_URL || 'ws://localhost:1234',
        sessionId,
        ydoc
      );
      
      // Listen for socket events
      socket.on('state_update', (update: StateChange) => {
        // Handle incoming state updates from other clients
        console.log('Received state update:', update);
      });
      
      socket.on('agent_status_update', (update: { agentId: string; status: Partial<AgentStatus> }) => {
        get().updateAgentStatus(update.agentId, update.status);
      });
      
      // Listen for Yjs changes
      const yData = ydoc.getMap('sharedData');
      yData.observe((event) => {
        console.log('Yjs data changed:', event);
      });
      
      set({
        sessionId,
        socket,
        ydoc,
        wsProvider,
      });
    },
    
    cleanup: () => {
      const currentState = get();
      if (currentState.socket) {
        currentState.socket.disconnect();
      }
      if (currentState.wsProvider) {
        currentState.wsProvider.destroy();
      }
      set({
        socket: undefined,
        ydoc: undefined,
        wsProvider: undefined,
      });
    },
  }))
);

// Subscribe to state changes for logging
useSharedState.subscribe(
  (state) => state.version,
  (version) => {
    console.log('Shared state updated, version:', version);
  }
);

// Conflict Resolution Utilities
export class ConflictResolver {
  static resolveConflict(localChange: StateChange, remoteChange: StateChange): StateChange {
    // Simple last-write-wins strategy for now
    // In production, implement more sophisticated conflict resolution
    return localChange.timestamp > remoteChange.timestamp ? localChange : remoteChange;
  }
  
  static mergeStates(localState: SharedState, remoteState: SharedState): SharedState {
    // Merge strategy based on timestamps and priorities
    return {
      ...localState,
      version: Math.max(localState.version, remoteState.version),
      lastModified: new Date(Math.max(localState.lastModified.getTime(), remoteState.lastModified.getTime())),
      synchronizedData: { ...localState.synchronizedData, ...remoteState.synchronizedData },
      generativeComponents: this.mergeComponents(localState.generativeComponents, remoteState.generativeComponents),
      agentStatuses: { ...localState.agentStatuses, ...remoteState.agentStatuses },
    };
  }
  
  private static mergeComponents(
    localComponents: GenerativeUIComponent[],
    remoteComponents: GenerativeUIComponent[]
  ): GenerativeUIComponent[] {
    const componentMap = new Map<string, GenerativeUIComponent>();
    
    // Add local components
    localComponents.forEach(component => {
      componentMap.set(component.componentId, component);
    });
    
    // Merge remote components (remote wins for conflicts)
    remoteComponents.forEach(component => {
      componentMap.set(component.componentId, component);
    });
    
    return Array.from(componentMap.values());
  }
}