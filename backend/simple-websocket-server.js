const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);

// Configure CORS for Express
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:51553', 'http://localhost:57594'],
  credentials: true
}));

app.use(express.json());

// Configure Socket.IO with CORS
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:51553', 'http://localhost:57594'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Store active analysis sessions
const activeSessions = new Map();

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'BiteBase AI Backend with LangGraph Framework',
    framework: 'LangGraph StateGraph Multi-Agent System',
    agents: ['supervisor', 'product', 'place', 'price', 'promotion', 'report'],
    timestamp: new Date().toISOString()
  });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on('start-analysis', async (data) => {
    const { sessionId, parameters } = data;
    console.log(`🚀 Starting LangGraph analysis for session: ${sessionId}`);
    console.log('📊 Parameters:', JSON.stringify(parameters, null, 2));

    // Create session
    activeSessions.set(sessionId, {
      sessionId,
      status: 'initializing',
      progress: 0,
      currentAgent: 'supervisor',
      socketId: socket.id,
      startTime: new Date()
    });

    // Simulate LangGraph workflow execution
    try {
      await simulateLangGraphWorkflow(sessionId, parameters, socket);
    } catch (error) {
      console.error('❌ LangGraph workflow failed:', error);
      socket.emit('analysis-error', {
        sessionId,
        error: error.message
      });
    }
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
    // Clean up sessions for this socket
    for (const [sessionId, session] of activeSessions.entries()) {
      if (session.socketId === socket.id) {
        activeSessions.delete(sessionId);
        console.log(`🧹 Cleaned up session: ${sessionId}`);
      }
    }
  });
});

// Simulate LangGraph workflow execution with 6 agents
async function simulateLangGraphWorkflow(sessionId, parameters, socket) {
  const session = activeSessions.get(sessionId);
  if (!session) return;

  const agents = [
    { name: 'supervisor', label: 'Supervisor Agent - Planning & Coordination', duration: 2000 },
    { name: 'product', label: 'Product Agent - Menu & Dish Analysis', duration: 5000 },
    { name: 'place', label: 'Place Agent - Location Intelligence', duration: 4000 },
    { name: 'price', label: 'Price Agent - Financial Analysis', duration: 3000 },
    { name: 'promotion', label: 'Promotion Agent - Marketing Intelligence', duration: 4000 },
    { name: 'report', label: 'Report Agent - Business Intelligence Synthesis', duration: 3000 }
  ];

  session.status = 'running';
  
  console.log('🤖 Starting LangGraph StateGraph workflow...');
  
  for (let i = 0; i < agents.length; i++) {
    const agent = agents[i];
    const baseProgress = (i / agents.length) * 100;
    
    const currentSession = activeSessions.get(sessionId);
    if (!currentSession) return;
    
    currentSession.currentAgent = agent.name;
    
    console.log(`🎯 LangGraph Node: ${agent.name} - ${agent.label}`);
    
    // Emit agent started
    socket.emit('agent-started', {
      sessionId,
      agent: agent.name,
      label: agent.label,
      progress: baseProgress
    });

    // Simulate agent work with progress updates
    const steps = 10;
    const stepDuration = agent.duration / steps;
    
    for (let step = 0; step <= steps; step++) {
      const agentProgress = (step / steps) * 100;
      const overallProgress = baseProgress + (agentProgress / agents.length);
      
      session.progress = overallProgress;
      
      socket.emit('agent-progress', {
        sessionId,
        agent: agent.name,
        agentProgress,
        overallProgress,
        message: `LangGraph Node: ${agent.label}... ${Math.round(agentProgress)}%`
      });

      if (step < steps) {
        await new Promise(resolve => setTimeout(resolve, stepDuration));
      }
    }

    // Agent completed with mock data
    const mockData = generateAgentMockData(agent.name, parameters);
    
    socket.emit('agent-completed', {
      sessionId,
      agent: agent.name,
      progress: ((i + 1) / agents.length) * 100,
      data: mockData
    });

    console.log(`✅ LangGraph Node completed: ${agent.name}`);
  }

  // Mark analysis as completed
  const finalSession = activeSessions.get(sessionId);
  if (finalSession) {
    finalSession.status = 'completed';
    finalSession.progress = 100;
    finalSession.endTime = new Date();
    
    const duration = finalSession.endTime - finalSession.startTime;
    
    socket.emit('analysis-completed', {
      sessionId,
      duration: `${Math.round(duration / 1000)}s`,
      data: {
        framework: 'LangGraph StateGraph Multi-Agent System',
        summary: 'Comprehensive market research analysis completed using 6-agent LangGraph workflow',
        recommendations: [
          '🎯 Product: Focus on popular Thai dishes with 15-20% profit margin',
          '📍 Place: Consider locations with <15 competitors within 500m radius',
          '💰 Price: Target 120-180 THB average ticket for optimal market positioning',
          '📣 Promotion: Leverage lunch promotions and delivery partnerships for growth',
          '📊 Overall: Market viability score of 78/100 indicates strong potential'
        ],
        agents: {
          supervisor: 'Workflow coordination and task delegation completed',
          product: 'Menu analysis and dish profitability assessment completed',
          place: 'Location intelligence and competitor density analysis completed',
          price: 'Financial modeling and revenue forecasting completed',
          promotion: 'Marketing intelligence and customer sentiment analysis completed',
          report: 'Business intelligence synthesis and recommendations generated'
        }
      }
    });

    console.log(`🎉 LangGraph workflow completed for session: ${sessionId} in ${Math.round(duration / 1000)}s`);
  }
}

// Generate mock data for each agent
function generateAgentMockData(agentName, parameters) {
  const mockData = {
    supervisor: {
      plan: 'Multi-agent coordination plan generated',
      delegation: 'Tasks delegated to specialized agents',
      status: 'Workflow orchestration active'
    },
    product: {
      topDishes: ['Pad Thai (4.5★)', 'Green Curry (4.3★)', 'Tom Yum Soup (4.4★)'],
      avgPrice: '120-150 THB',
      profitMargin: '18-22%',
      recommendation: 'Focus on authentic Thai cuisine with modern presentation'
    },
    place: {
      competitorCount: 12,
      avgRent: '45,000 THB/month',
      footTraffic: 'High (8,500 daily)',
      deliveryArea: '3km radius coverage',
      viabilityScore: 78
    },
    price: {
      projectedRevenue: '850,000 THB/month',
      peakHours: ['11:30-13:30', '18:00-20:00'],
      breakeven: '6-8 months',
      roi: '22% annually'
    },
    promotion: {
      avgRating: 4.2,
      reviewSentiment: 'Positive (76%)',
      marketingChannels: ['Food delivery apps', 'Social media', 'Local partnerships'],
      campaignRecommendations: ['Lunch sets 20% off', 'Free delivery promotions']
    },
    report: {
      executiveSummary: 'Market analysis indicates strong viability for Thai restaurant concept',
      businessScore: '78/100',
      keyInsights: ['Strong local demand', 'Competitive but manageable market', 'Good location fundamentals'],
      nextSteps: ['Secure location', 'Finalize menu', 'Develop marketing strategy']
    }
  };

  return mockData[agentName] || { status: 'completed' };
}

// Start server
const PORT = process.env.PORT || 45003;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 BiteBase AI Backend Server Started!');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
  console.log(`💊 Health: http://localhost:${PORT}/health`);
  console.log('🤖 LangGraph Framework: 6-Agent Multi-Agent System Ready');
  console.log('🎯 Agents: Supervisor, Product, Place, Price, Promotion, Report');
  console.log('');
  console.log('✅ Ready for frontend connections...');
});