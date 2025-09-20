import { io, Socket } from 'socket.io-client';

export interface AnalysisProgress {
  sessionId: string;
  agent: string;
  agentProgress: number;
  overallProgress: number;
  message: string;
}

export interface AgentStarted {
  sessionId: string;
  agent: string;
  label: string;
  progress: number;
}

export interface AgentCompleted {
  sessionId: string;
  agent: string;
  data: any;
}

export interface AnalysisCompleted {
  sessionId: string;
  finalReport: any;
  timestamp: string;
}

export interface AnalysisError {
  sessionId: string;
  error: string;
}

export class SocketService {
  private socket: Socket | null = null;
  private serverUrl: string;
  private progressCallbacks: Map<string, (progress: AnalysisProgress) => void> = new Map();
  private agentStartedCallbacks: Map<string, (data: AgentStarted) => void> = new Map();
  private agentCompletedCallbacks: Map<string, (data: AgentCompleted) => void> = new Map();
  private analysisCompletedCallbacks: Map<string, (data: AnalysisCompleted) => void> = new Map();
  private errorCallbacks: Map<string, (error: AnalysisError) => void> = new Map();

  constructor(serverUrl: string = 'http://localhost:45003') {
    this.serverUrl = serverUrl;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve();
        return;
      }

      this.socket = io(this.serverUrl, {
        timeout: 10000,
        forceNew: false,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
      });

      this.socket.on('connect', () => {
        console.log('🔌 Connected to BiteBase AI backend');
        resolve();
      });

      this.socket.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error);
        reject(error);
      });

      this.socket.on('disconnect', (reason) => {
        console.log('❌ Disconnected from backend:', reason);
      });

      // Set up event listeners
      this.setupEventListeners();
    });
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('progress-update', (data: AnalysisProgress) => {
      this.progressCallbacks.forEach(callback => callback(data));
    });

    this.socket.on('agent-started', (data: AgentStarted) => {
      this.agentStartedCallbacks.forEach(callback => callback(data));
    });

    this.socket.on('agent-completed', (data: AgentCompleted) => {
      this.agentCompletedCallbacks.forEach(callback => callback(data));
    });

    this.socket.on('analysis-completed', (data: AnalysisCompleted) => {
      this.analysisCompletedCallbacks.forEach(callback => callback(data));
    });

    this.socket.on('analysis-error', (data: AnalysisError) => {
      this.errorCallbacks.forEach(callback => callback(data));
    });

    this.socket.on('analysis-paused', (data: { sessionId: string }) => {
      console.log(`⏸️ Analysis paused: ${data.sessionId}`);
    });

    this.socket.on('analysis-resumed', (data: { sessionId: string }) => {
      console.log(`▶️ Analysis resumed: ${data.sessionId}`);
    });

    this.socket.on('analysis-stopped', (data: { sessionId: string }) => {
      console.log(`🛑 Analysis stopped: ${data.sessionId}`);
    });
  }

  startAnalysis(sessionId: string, parameters: any): void {
    if (!this.socket?.connected) {
      console.error('❌ Socket not connected');
      return;
    }

    console.log(`🚀 Starting analysis for session: ${sessionId}`);
    this.socket.emit('start-analysis', { sessionId, parameters });
  }

  pauseAnalysis(sessionId: string): void {
    if (!this.socket?.connected) {
      console.error('❌ Socket not connected');
      return;
    }

    console.log(`⏸️ Pausing analysis: ${sessionId}`);
    this.socket.emit('pause-analysis', { sessionId });
  }

  resumeAnalysis(sessionId: string): void {
    if (!this.socket?.connected) {
      console.error('❌ Socket not connected');
      return;
    }

    console.log(`▶️ Resuming analysis: ${sessionId}`);
    this.socket.emit('resume-analysis', { sessionId });
  }

  stopAnalysis(sessionId: string): void {
    if (!this.socket?.connected) {
      console.error('❌ Socket not connected');
      return;
    }

    console.log(`🛑 Stopping analysis: ${sessionId}`);
    this.socket.emit('stop-analysis', { sessionId });
  }

  // Callback registration methods
  onProgress(callback: (progress: AnalysisProgress) => void): string {
    const id = Math.random().toString(36).substr(2, 9);
    this.progressCallbacks.set(id, callback);
    return id;
  }

  onAgentStarted(callback: (data: AgentStarted) => void): string {
    const id = Math.random().toString(36).substr(2, 9);
    this.agentStartedCallbacks.set(id, callback);
    return id;
  }

  onAgentCompleted(callback: (data: AgentCompleted) => void): string {
    const id = Math.random().toString(36).substr(2, 9);
    this.agentCompletedCallbacks.set(id, callback);
    return id;
  }

  onAnalysisCompleted(callback: (data: AnalysisCompleted) => void): string {
    const id = Math.random().toString(36).substr(2, 9);
    this.analysisCompletedCallbacks.set(id, callback);
    return id;
  }

  onError(callback: (error: AnalysisError) => void): string {
    const id = Math.random().toString(36).substr(2, 9);
    this.errorCallbacks.set(id, callback);
    return id;
  }

  // Cleanup methods
  removeCallback(type: 'progress' | 'agentStarted' | 'agentCompleted' | 'analysisCompleted' | 'error', id: string): void {
    switch (type) {
      case 'progress':
        this.progressCallbacks.delete(id);
        break;
      case 'agentStarted':
        this.agentStartedCallbacks.delete(id);
        break;
      case 'agentCompleted':
        this.agentCompletedCallbacks.delete(id);
        break;
      case 'analysisCompleted':
        this.analysisCompletedCallbacks.delete(id);
        break;
      case 'error':
        this.errorCallbacks.delete(id);
        break;
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    
    // Clear all callbacks
    this.progressCallbacks.clear();
    this.agentStartedCallbacks.clear();
    this.agentCompletedCallbacks.clear();
    this.analysisCompletedCallbacks.clear();
    this.errorCallbacks.clear();
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getConnectionStatus(): 'connected' | 'disconnected' | 'connecting' {
    if (!this.socket) return 'disconnected';
    if (this.socket.connected) return 'connected';
    if (this.socket.connecting) return 'connecting';
    return 'disconnected';
  }
}

// Global socket service instance
export const socketService = new SocketService();