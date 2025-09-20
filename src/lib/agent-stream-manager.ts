interface StreamEventData {
  type: 'agent_status' | 'task_progress' | 'analysis_result' | 'error' | 'completion';
  agentId?: string;
  status?: 'idle' | 'busy' | 'error' | 'completed';
  progress?: number;
  message?: string;
  data?: any;
  timestamp: string;
}

export class AgentStreamManager {
  private static instance: AgentStreamManager;
  private controllers: Map<string, ReadableStreamDefaultController> = new Map();
  private sessionData: Map<string, any> = new Map();

  static getInstance(): AgentStreamManager {
    if (!AgentStreamManager.instance) {
      AgentStreamManager.instance = new AgentStreamManager();
    }
    return AgentStreamManager.instance;
  }

  addController(sessionId: string, controller: ReadableStreamDefaultController) {
    this.controllers.set(sessionId, controller);
  }

  removeController(sessionId: string) {
    this.controllers.delete(sessionId);
    this.sessionData.delete(sessionId);
  }

  broadcast(sessionId: string, data: StreamEventData) {
    const controller = this.controllers.get(sessionId);
    if (controller) {
      try {
        const eventData = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(new TextEncoder().encode(eventData));
      } catch (error) {
        console.error('Error broadcasting to session:', sessionId, error);
        this.removeController(sessionId);
      }
    }
  }

  broadcastToAll(data: StreamEventData) {
    Array.from(this.controllers.keys()).forEach(sessionId => {
      this.broadcast(sessionId, data);
    });
  }

  setSessionData(sessionId: string, key: string, value: any) {
    if (!this.sessionData.has(sessionId)) {
      this.sessionData.set(sessionId, {});
    }
    this.sessionData.get(sessionId)[key] = value;
  }

  getSessionData(sessionId: string, key: string): any {
    return this.sessionData.get(sessionId)?.[key];
  }
}

export type { StreamEventData };