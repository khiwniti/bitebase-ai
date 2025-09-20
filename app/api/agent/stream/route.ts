import { NextRequest } from 'next/server';
import { AgentStreamManager, type StreamEventData } from '@/lib/agent-stream-manager';

export const runtime = 'nodejs';

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