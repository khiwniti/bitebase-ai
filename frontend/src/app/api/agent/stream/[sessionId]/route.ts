/**
 * API endpoint for streaming LangGraph updates
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params;

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }

  // Create Server-Sent Events stream
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      const data = JSON.stringify({
        type: 'connection',
        sessionId,
        timestamp: new Date().toISOString(),
        message: 'Connected to analysis stream',
      });
      
      controller.enqueue(encoder.encode(`data: ${data}\n\n`));

      // Simulate streaming updates (in production, this would connect to actual LangGraph streams)
      const interval = setInterval(() => {
        const update = {
          type: 'progress',
          sessionId,
          timestamp: new Date().toISOString(),
          agentProgress: {
            'product-analysis': {
              status: 'running',
              progress: Math.min(100, Math.floor(Math.random() * 100)),
              currentTask: 'Analyzing Wongnai data...',
            },
            'place-analysis': {
              status: 'pending',
              progress: 0,
              currentTask: 'Waiting for product analysis...',
            },
          },
          overallProgress: Math.min(100, Math.floor(Math.random() * 100)),
          mcpServerStatus: {
            playwright: { connected: true, lastHealthCheck: new Date(), errorCount: 0 },
            sqlite: { connected: true, lastHealthCheck: new Date(), errorCount: 0 },
            echarts: { connected: true, lastHealthCheck: new Date(), errorCount: 0 },
          },
        };

        const updateData = JSON.stringify(update);
        controller.enqueue(encoder.encode(`data: ${updateData}\n\n`));
      }, 2000);

      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });

      // Auto-close after 10 minutes
      setTimeout(() => {
        clearInterval(interval);
        const finalData = JSON.stringify({
          type: 'complete',
          sessionId,
          timestamp: new Date().toISOString(),
          message: 'Analysis completed',
        });
        controller.enqueue(encoder.encode(`data: ${finalData}\n\n`));
        controller.close();
      }, 600000);
    },
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