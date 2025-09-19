import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

interface StreamEventData {
  type: 'agent_status' | 'task_progress' | 'analysis_result' | 'error' | 'completion';
  agentId?: string;
  status?: 'idle' | 'busy' | 'error' | 'completed';
  progress?: number;
  message?: string;
  data?: any;
  timestamp: string;
}

class AgentStreamManager {
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
    for (const sessionId of this.controllers.keys()) {
      this.broadcast(sessionId, data);
    }
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('sessionId') || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const streamManager = AgentStreamManager.getInstance();

  const stream = new ReadableStream({
    start(controller) {
      // Set SSE headers
      const headers = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Cache-Control',
      };

      // Add controller to manager
      streamManager.addController(sessionId, controller);

      // Send initial connection message
      const initialData: StreamEventData = {
        type: 'agent_status',
        message: 'Connected to agent stream',
        timestamp: new Date().toISOString()
      };

      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(initialData)}\n\n`));

      // Send periodic heartbeat to keep connection alive
      const heartbeatInterval = setInterval(() => {
        try {
          const heartbeat = `data: ${JSON.stringify({
            type: 'heartbeat',
            timestamp: new Date().toISOString()
          })}\n\n`;
          controller.enqueue(new TextEncoder().encode(heartbeat));
        } catch (error) {
          clearInterval(heartbeatInterval);
          streamManager.removeController(sessionId);
        }
      }, 30000); // 30 seconds

      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeatInterval);
        streamManager.removeController(sessionId);
        try {
          controller.close();
        } catch (error) {
          // Connection already closed
        }
      });
    },

    cancel() {
      streamManager.removeController(sessionId);
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, eventData } = await request.json();

    if (!sessionId || !eventData) {
      return Response.json({ error: 'Missing sessionId or eventData' }, { status: 400 });
    }

    const streamManager = AgentStreamManager.getInstance();

    // Add timestamp if not provided
    if (!eventData.timestamp) {
      eventData.timestamp = new Date().toISOString();
    }

    // Broadcast to specific session or all sessions
    if (sessionId === 'broadcast') {
      streamManager.broadcastToAll(eventData);
    } else {
      streamManager.broadcast(sessionId, eventData);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Export the stream manager for use by the orchestrator
export { AgentStreamManager };