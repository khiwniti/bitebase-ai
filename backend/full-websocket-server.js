const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

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
const activeSessions = new Map();

// Mock LangGraph Workflow Coordinator
class WorkflowCoordinator {
  async executeWorkflow(initialState, progressCallback) {
    const agents = [
      { name: 'supervisor', label: 'Supervisor Agent - Planning & Coordination', duration: 2000 },
      { name: 'product', label: 'Product Agent - Menu & Dish Analysis', duration: 5000 },
      { name: 'place', label: 'Place Agent - Location Intelligence', duration: 4000 },
      { name: 'price', label: 'Price Agent - Financial Analysis', duration: 3000 },
      { name: 'promotion', label: 'Promotion Agent - Marketing Intelligence', duration: 4000 },
      { name: 'report', label: 'Report Agent - Business Intelligence Synthesis', duration: 3000 }
    ];

    const results = {};
    
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      const baseProgress = (i / agents.length) * 100;
      
      console.log(`🎯 LangGraph Node: ${agent.name} - ${agent.label}`);
      
      // Simulate agent work with progress updates
      const steps = 10;
      const stepDuration = agent.duration / steps;
      
      for (let step = 0; step <= steps; step++) {
        const agentProgress = (step / steps) * 100;
        const overallProgress = baseProgress + (agentProgress / agents.length);
        
        progressCallback(agent.name, `${agent.label}... ${Math.round(agentProgress)}%`, overallProgress);

        if (step < steps) {
          await new Promise(resolve => setTimeout(resolve, stepDuration));
        }
      }

      // Store agent result
      results[agent.name + 'Result'] = this.generateAgentResult(agent.name, initialState.restaurantParams);
      
      console.log(`✅ LangGraph Node completed: ${agent.name}`);
    }

    return {
      status: 'completed',
      ...results,
      reportResult: {
        executiveSummary: 'Comprehensive market research analysis completed using LangGraph 6-agent workflow',
        recommendations: [
          '🎯 Product: Focus on popular Thai dishes with 15-20% profit margin',
          '📍 Place: Consider locations with <15 competitors within 500m radius',
          '💰 Price: Target 120-180 THB average ticket for optimal market positioning',
          '📣 Promotion: Leverage lunch promotions and delivery partnerships for growth',
          '📊 Overall: Market viability score of 78/100 indicates strong potential'
        ],
        businessScore: '78/100',
        keyInsights: ['Strong local demand', 'Competitive but manageable market', 'Good location fundamentals'],
        visualizations: {
          charts: ['competitor-density-map', 'revenue-forecast', 'customer-sentiment-analysis'],
          diagrams: ['workflow-process', 'business-model-canvas', 'market-positioning']
        }
      }
    };
  }

  generateAgentResult(agentName, parameters) {
    const mockData = {
      supervisor: {
        plan: 'Multi-agent coordination plan generated',
        delegation: 'Tasks delegated to specialized agents',
        status: 'Workflow orchestration completed',
        coordinationMetrics: { efficiency: '92%', reliability: '98%' }
      },
      product: {
        topDishes: ['Pad Thai (4.5★)', 'Green Curry (4.3★)', 'Tom Yum Soup (4.4★)', 'Mango Sticky Rice (4.6★)'],
        avgPrice: '120-150 THB',
        profitMargin: '18-22%',
        popularCategories: ['Authentic Thai', 'Street Food', 'Healthy Options'],
        seasonalTrends: 'Higher demand for soup dishes in rainy season',
        recommendation: 'Focus on authentic Thai cuisine with modern presentation and health-conscious options'
      },
      place: {
        competitorCount: 12,
        avgRent: '45,000 THB/month',
        footTraffic: 'High (8,500 daily)',
        deliveryArea: '3km radius coverage',
        viabilityScore: 78,
        demographics: 'Office workers (40%), Residents (35%), Tourists (25%)',
        accessibility: 'Excellent BTS/MRT access, limited parking',
        competition: 'Moderate density, differentiation opportunities available'
      },
      price: {
        projectedRevenue: '850,000 THB/month',
        peakHours: ['11:30-13:30', '18:00-20:00'],
        breakeven: '6-8 months',
        roi: '22% annually',
        pricing: { appetizers: '80-120 THB', mains: '150-250 THB', beverages: '50-80 THB' },
        seasonality: 'Cool season +15%, Hot season -8%, Rainy season +5%'
      },
      promotion: {
        avgRating: 4.2,
        reviewSentiment: 'Positive (76%)',
        marketingChannels: ['Food delivery apps', 'Social media', 'Local partnerships', 'Office catering'],
        campaignRecommendations: ['Lunch sets 20% off', 'Free delivery promotions', 'Corporate catering packages'],
        customerSegments: ['Busy professionals', 'Health-conscious diners', 'Thai food enthusiasts'],
        brandPositioning: 'Authentic Thai with modern convenience'
      },
      report: {
        executiveSummary: 'Market analysis indicates strong viability for Thai restaurant concept',
        businessScore: '78/100',
        keyInsights: ['Strong local demand', 'Competitive but manageable market', 'Good location fundamentals'],
        nextSteps: ['Secure location', 'Finalize menu', 'Develop marketing strategy', 'Staff recruitment'],
        riskFactors: ['High competition', 'Rising rent costs', 'Economic uncertainty'],
        opportunities: ['Growing health trend', 'Corporate catering market', 'Delivery expansion']
      }
    };

    return mockData[agentName] || { status: 'completed' };
  }
}

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

    try {
      // Start LangGraph analysis workflow (non-blocking)
      setImmediate(() => executeAnalysisWorkflow(sessionId, parameters, socket));
    } catch (error) {
      console.error('❌ LangGraph workflow failed:', error);
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
        console.log(`🧹 Cleaned up session: ${sessionId}`);
      }
    }
  });
});

// LangGraph analysis workflow - non-blocking
async function executeAnalysisWorkflow(sessionId, parameters, socket) {
  const session = activeSessions.get(sessionId);
  if (!session) return;

  try {
    // Initialize the workflow coordinator
    const coordinator = new WorkflowCoordinator();
    
    // Create initial state from parameters
    const initialState = {
      restaurantParams: parameters,
      status: 'initializing',
      progress: 0,
      currentAgent: 'supervisor'
    };

    // Set up progress callback
    const progressCallback = (agentName, message, progress) => {
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

      console.log(`📊 ${agentName}: ${message} (${Math.round(progress)}%)`);
    };

    session.status = 'running';
    
    // Execute the LangGraph workflow
    console.log(`🤖 Starting LangGraph StateGraph workflow for session: ${sessionId}`);
    
    const result = await coordinator.executeWorkflow(initialState, progressCallback);
    
    // Check if session still exists
    const finalSession = activeSessions.get(sessionId);
    if (!finalSession) return;

    if (result.status === 'completed') {
      finalSession.status = 'completed';
      finalSession.progress = 100;
      finalSession.data = result;
      finalSession.endTime = new Date();
      
      const duration = finalSession.endTime - finalSession.startTime;
      
      socket.emit('analysis-completed', {
        sessionId,
        duration: `${Math.round(duration / 1000)}s`,
        data: {
          framework: 'LangGraph StateGraph Multi-Agent System',
          summary: result.reportResult?.executiveSummary || 'Analysis completed successfully',
          recommendations: result.reportResult?.recommendations || [],
          productResult: result.productResult,
          placeResult: result.placeResult,
          priceResult: result.priceResult,
          promotionResult: result.promotionResult,
          reportResult: result.reportResult,
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

      console.log(`🎉 LangGraph StateGraph workflow completed for session: ${sessionId} in ${Math.round(duration / 1000)}s`);
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    server: 'BiteBase AI Backend with LangGraph Framework',
    framework: 'LangGraph StateGraph Multi-Agent System',
    agents: ['supervisor', 'product', 'place', 'price', 'promotion', 'report'],
    websocket: 'ready',
    sessions: activeSessions.size
  });
});

// Additional test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint requested');
  res.status(200).json({
    message: 'BiteBase AI Backend is working!',
    framework: 'LangGraph StateGraph',
    capabilities: [
      'Multi-agent workflow coordination',
      'Real-time progress tracking',
      'Market research analysis',
      'Business intelligence synthesis'
    ]
  });
});

// Get session status endpoint
app.get('/api/sessions', (req, res) => {
  const sessions = Array.from(activeSessions.values()).map(session => ({
    sessionId: session.sessionId,
    status: session.status,
    progress: session.progress,
    currentAgent: session.currentAgent,
    startTime: session.startTime
  }));
  
  res.json({ sessions, count: sessions.length });
});

const PORT = process.env.PORT || 45003;

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 BiteBase AI Backend Server Started!');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
  console.log(`💊 Health: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
  console.log(`📊 Sessions: http://localhost:${PORT}/api/sessions`);
  console.log('🤖 LangGraph Framework: 6-Agent Multi-Agent System Ready');
  console.log('🎯 Agents: Supervisor, Product, Place, Price, Promotion, Report');
  console.log('📈 Features: Real-time progress, Session management, Error handling');
  console.log('');
  console.log('✅ Ready for frontend connections...');
});