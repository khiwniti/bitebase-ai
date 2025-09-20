import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

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
      // Start analysis workflow (non-blocking)
      setImmediate(() => simulateAnalysisWorkflow(sessionId, parameters, socket));
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

// Fixed analysis workflow - non-blocking
async function simulateAnalysisWorkflow(sessionId: string, parameters: any, socket: any) {
  const session = activeSessions.get(sessionId);
  if (!session) return;

  const agents = [
    { name: 'product', label: 'Product Analysis', duration: 5000 },
    { name: 'place', label: 'Place Analysis', duration: 4000 },
    { name: 'price', label: 'Price Analysis', duration: 3000 },
    { name: 'promotion', label: 'Promotion Analysis', duration: 4000 },
    { name: 'report', label: 'Report Generation', duration: 2000 }
  ];

  session.status = 'running';
  
  for (let i = 0; i < agents.length; i++) {
    const agent = agents[i];
    const baseProgress = (i / agents.length) * 100;
    
    // Check if session still exists and is not stopped
    const currentSession = activeSessions.get(sessionId);
    if (!currentSession) return;
    
    currentSession.currentAgent = agent.name;
    
    // Emit start of agent
    socket.emit('agent-started', {
      sessionId,
      agent: agent.name,
      label: agent.label,
      progress: baseProgress
    });

    // Simulate progressive work with non-blocking approach
    const steps = 10;
    const stepDuration = agent.duration / steps;
    
    for (let step = 0; step <= steps; step++) {
      // Non-blocking pause check
      const session = activeSessions.get(sessionId);
      if (!session) return; // Session was stopped
      
      if (session.status === 'paused') {
        // Schedule retry instead of blocking
        setTimeout(() => {
          simulateAnalysisWorkflow(sessionId, parameters, socket);
        }, 1000);
        return;
      }

      const agentProgress = (step / steps) * 100;
      const overallProgress = baseProgress + (agentProgress / agents.length);
      
      session.progress = overallProgress;
      
      socket.emit('agent-progress', {
        sessionId,
        agent: agent.name,
        agentProgress,
        overallProgress,
        message: `Processing ${agent.label}... ${Math.round(agentProgress)}%`
      });

      // Non-blocking delay
      if (step < steps) {
        await new Promise(resolve => setTimeout(resolve, stepDuration));
      }
    }

    // Agent completed
    socket.emit('agent-completed', {
      sessionId,
      agent: agent.name,
      progress: ((i + 1) / agents.length) * 100,
      data: generateMockData(agent.name, parameters)
    });

    console.log(`✅ ${agent.label} completed for session: ${sessionId}`);
  }

  // Mark analysis as completed
  const finalSession = activeSessions.get(sessionId);
  if (finalSession) {
    finalSession.status = 'completed';
    finalSession.progress = 100;
    
    socket.emit('analysis-completed', {
      sessionId,
      data: {
        summary: 'Market research analysis completed successfully',
        recommendations: [
          'Consider targeting mid-price segment',
          'Focus on delivery-friendly menu items',
          'Optimize for peak hours (11:30-13:30, 18:00-20:00)'
        ]
      }
    });

    console.log(`🎉 Analysis completed for session: ${sessionId}`);
  }
}

// Generate mock data for each agent
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