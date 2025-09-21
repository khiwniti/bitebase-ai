import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { WorkflowCoordinator } from './langgraph/workflow-coordinator';
import { BiteBaseState } from './langgraph/state';

const app = express();
const httpServer = createServer(app);

// Configure CORS for Express
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:51553', 'http://localhost:57594'],
  credentials: true
}));

app.use(express.json());

// Configure Socket.IO with CORS
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:51553', 'http://localhost:57594'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Store active analysis sessions
const activeSessions = new Map<string, {
  sessionId: string;
  status: 'initializing' | 'running' | 'completed' | 'error' | 'paused';
  progress: number;
  currentAgent: string;
  data?: any;
  socketId: string;
}>();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on('start-analysis', async (data) => {
    const { sessionId, parameters } = data;
    console.log(`🚀 Starting analysis for session: ${sessionId}`);

    // Create session
    activeSessions.set(sessionId, {
      sessionId,
      status: 'initializing',
      progress: 0,
      currentAgent: 'initializing',
      socketId: socket.id
    });

    try {
      // Start LangGraph analysis workflow (non-blocking)
      setImmediate(() => executeAnalysisWorkflow(sessionId, parameters, socket));
    } catch (error) {
      console.error('❌ Analysis failed:', error);
      socket.emit('analysis-error', {
        sessionId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  socket.on('pause-analysis', (data) => {
    const { sessionId } = data;
    const session = activeSessions.get(sessionId);
    if (session) {
      session.status = 'paused';
      socket.emit('analysis-paused', { sessionId });
      console.log(`⏸️ Analysis paused: ${sessionId}`);
    }
  });

  socket.on('resume-analysis', (data) => {
    const { sessionId } = data;
    const session = activeSessions.get(sessionId);
    if (session && session.status === 'paused') {
      session.status = 'running';
      socket.emit('analysis-resumed', { sessionId });
      console.log(`▶️ Analysis resumed: ${sessionId}`);
    }
  });

  socket.on('stop-analysis', (data) => {
    const { sessionId } = data;
    activeSessions.delete(sessionId);
    socket.emit('analysis-stopped', { sessionId });
    console.log(`🛑 Analysis stopped: ${sessionId}`);
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
    // Clean up sessions for this socket
    for (const [sessionId, session] of activeSessions.entries()) {
      if (session.socketId === socket.id) {
        activeSessions.delete(sessionId);
      }
    }
  });
});

// LangGraph analysis workflow - non-blocking
async function executeAnalysisWorkflow(sessionId: string, parameters: any, socket: any) {
  const session = activeSessions.get(sessionId);
  if (!session) return;

  try {
    // Initialize the workflow coordinator
    const coordinator = new WorkflowCoordinator();
    
    // Create initial state from parameters
    const initialState: BiteBaseState = {
      restaurantParams: parameters,
      status: 'initializing',
      progress: 0,
      currentAgent: 'supervisor'
    };

    // Set up progress callback
    const progressCallback = (agentName: string, message: string, progress: number) => {
      const currentSession = activeSessions.get(sessionId);
      if (!currentSession) return;

      currentSession.currentAgent = agentName;
      currentSession.progress = progress;

      socket.emit('agent-progress', {
        sessionId,
        agent: agentName,
        agentProgress: progress,
        overallProgress: progress,
        message
      });

      console.log(`📊 ${agentName}: ${message} (${progress}%)`);
    };

    session.status = 'running';
    
    // Execute the LangGraph workflow
    console.log(`🤖 Starting LangGraph workflow for session: ${sessionId}`);
    
    const result = await coordinator.executeWorkflow(initialState, progressCallback);
    
    // Check if session still exists
    const finalSession = activeSessions.get(sessionId);
    if (!finalSession) return;

    if (result.status === 'completed') {
      finalSession.status = 'completed';
      finalSession.progress = 100;
      finalSession.data = result;
      
      socket.emit('analysis-completed', {
        sessionId,
        data: {
          summary: result.reportResult?.executiveSummary || 'Analysis completed successfully',
          recommendations: result.reportResult?.recommendations || [],
          productResult: result.productResult,
          placeResult: result.placeResult,
          priceResult: result.priceResult,
          promotionResult: result.promotionResult,
          reportResult: result.reportResult
        }
      });

      console.log(`✅ LangGraph workflow completed for session: ${sessionId}`);
    } else {
      throw new Error(result.error || 'Workflow execution failed');
    }

  } catch (error) {
    console.error(`❌ LangGraph workflow failed for session ${sessionId}:`, error);
    
    const errorSession = activeSessions.get(sessionId);
    if (errorSession) {
      errorSession.status = 'error';
      
      socket.emit('analysis-error', {
        sessionId,
        error: error instanceof Error ? error.message : 'Workflow execution failed'
      });
    }
  }
}

// Generate mock data for each agent (keeping for backward compatibility)
function generateMockData(agentType: string, parameters: any) {
  const mockData: any = {
    product: {
      topDishes: ['Pad Thai', 'Green Curry', 'Tom Yum Soup'],
      avgPrice: 120,
      popularCategories: ['Thai', 'Asian Fusion', 'Street Food']
    },
    place: {
      competitorCount: 15,
      avgRent: 45000,
      footTraffic: 'High',
      deliveryArea: '3km radius'
    },
    price: {
      avgRevenue: 85000,
      peakHours: ['11:30-13:30', '18:00-20:00'],
      seasonality: 'Higher demand in cool season'
    },
    promotion: {
      avgRating: 4.2,
      reviewSentiment: 'Positive',
      successfulPromotions: ['Happy Hour', 'Lunch Sets']
    },
    report: {
      viabilityScore: 75,
      recommendations: ['Focus on delivery', 'Mid-price positioning']
    }
  };

  return mockData[agentType] || {};
}

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    server: 'BiteBase AI Backend',
    websocket: 'ready'
  });
});

// Additional test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint requested');
  res.status(200).send('Server is working!');
});

const PORT = process.env.PORT || 45003;

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 BiteBase AI Backend Server running on port ${PORT}`);
  console.log(`🌐 WebSocket server ready for real-time communication`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});