import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

// Configure CORS for Express
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:51553', 'http://localhost:57594'],
  credentials: true
}));

app.use(express.json());

// Configure Socket.IO with CORS
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:51553', 'http://localhost:57594'],
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
      // Simulate agent workflow for demo
      await simulateAnalysisWorkflow(sessionId, parameters, socket);
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
    console.log(`❌ Client disconnected: ${socket.id}`);
    // Clean up sessions for this socket
    for (const [sessionId, session] of activeSessions.entries()) {
      if (session.socketId === socket.id) {
        activeSessions.delete(sessionId);
      }
    }
  });
});

// Simulate the 4P analysis workflow
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
    
    session.currentAgent = agent.name;
    
    // Emit start of agent
    socket.emit('agent-started', {
      sessionId,
      agent: agent.name,
      label: agent.label,
      progress: baseProgress
    });

    // Simulate progressive work
    const steps = 10;
    const stepDuration = agent.duration / steps;
    
    for (let step = 0; step <= steps; step++) {
      if (session.status === 'paused') {
        // Wait for resume
        while (session.status === 'paused') {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      if (!activeSessions.has(sessionId)) {
        return; // Session was stopped
      }

      const agentProgress = (step / steps) * 100;
      const overallProgress = baseProgress + (agentProgress / agents.length);
      
      session.progress = overallProgress;
      
      // Emit progress update
      socket.emit('progress-update', {
        sessionId,
        agent: agent.name,
        agentProgress,
        overallProgress,
        message: `${agent.label}: ${step}/${steps} steps completed`
      });

      await new Promise(resolve => setTimeout(resolve, stepDuration));
    }

    // Emit agent completion
    socket.emit('agent-completed', {
      sessionId,
      agent: agent.name,
      data: generateMockAgentData(agent.name, parameters)
    });

    console.log(`✅ ${agent.label} completed for session: ${sessionId}`);
  }

  // Complete the analysis
  session.status = 'completed';
  session.progress = 100;

  socket.emit('analysis-completed', {
    sessionId,
    finalReport: generateMockFinalReport(parameters),
    timestamp: new Date().toISOString()
  });

  console.log(`🎉 Analysis completed for session: ${sessionId}`);
}

// Generate mock data for each agent
function generateMockAgentData(agentName: string, parameters: any) {
  switch (agentName) {
    case 'product':
      return {
        popularDishes: [
          { name: 'Pad Thai', popularity: 95, profitability: 78 },
          { name: 'Tom Yum Goong', popularity: 87, profitability: 82 },
          { name: 'Green Curry', popularity: 91, profitability: 75 }
        ],
        marketTrends: ['Authentic Thai', 'Spicy dishes popular', 'Vegetarian options growing'],
        competitorAnalysis: {
          averagePrice: 120,
          topCompetitors: 5,
          marketSaturation: 'medium'
        }
      };

    case 'place':
      return {
        locationScore: 85,
        competition: {
          density: 'medium',
          marketSaturation: 65
        },
        demographics: {
          targetCustomers: 75,
          averageIncome: 45000,
          ageGroup: '25-45'
        },
        accessibility: {
          publicTransport: 90,
          walkability: 80,
          parking: 70
        }
      };

    case 'price':
      return {
        financialProjections: {
          revenue: {
            monthly: 180000,
            annually: 2160000
          },
          profitability: {
            netMargin: 12,
            breakEvenPoint: 14,
            roi: 18
          }
        },
        pricingStrategy: 'Premium positioning with competitive pricing'
      };

    case 'promotion':
      return {
        sentiment: {
          overall: 0.72,
          positive: 78,
          negative: 12,
          neutral: 10
        },
        customerSegments: [
          { name: 'Food Enthusiasts', size: 35, characteristics: ['Quality focused', 'Willing to pay premium'] },
          { name: 'Families', size: 40, characteristics: ['Value oriented', 'Large portions'] },
          { name: 'Young Professionals', size: 25, characteristics: ['Convenience', 'Quick service'] }
        ],
        marketingOpportunities: [
          'Social media engagement',
          'Food delivery partnerships',
          'Local community events'
        ]
      };

    case 'report':
      return {
        viabilityScore: 82,
        recommendations: [
          'Focus on authentic Thai dishes',
          'Target families and food enthusiasts',
          'Invest in delivery capabilities',
          'Premium pricing strategy'
        ]
      };

    default:
      return {};
  }
}

function generateMockFinalReport(parameters: any) {
  return {
    executiveSummary: `Comprehensive market analysis for ${parameters.cuisine} restaurant in ${parameters.location} shows strong viability with 82% confidence score.`,
    viabilityScore: 82,
    riskAssessment: {
      level: 'medium' as const,
      factors: ['Competition density', 'Market saturation'],
      mitigation: ['Differentiated menu', 'Superior service quality']
    },
    recommendations: {
      immediate: ['Secure location', 'Finalize menu', 'Setup suppliers'],
      shortTerm: ['Launch marketing', 'Train staff', 'Soft opening'],
      longTerm: ['Expansion planning', 'Brand building', 'Loyalty program']
    },
    financialSummary: {
      initialInvestment: 2000000,
      projectedRevenue: 2160000,
      breakEvenMonths: 14,
      roiTimeframe: '2-3 years'
    }
  };
}

// REST API endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    activeSessions: activeSessions.size
  });
});

app.get('/api/sessions', (req, res) => {
  const sessions = Array.from(activeSessions.values()).map(session => ({
    sessionId: session.sessionId,
    status: session.status,
    progress: session.progress,
    currentAgent: session.currentAgent
  }));
  res.json({ sessions });
});

app.get('/api/sessions/:sessionId', (req, res) => {
  const session = activeSessions.get(req.params.sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  res.json({
    sessionId: session.sessionId,
    status: session.status,
    progress: session.progress,
    currentAgent: session.currentAgent,
    data: session.data
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 BiteBase AI Backend Server running on port ${PORT}`);
  console.log(`🌐 WebSocket server ready for real-time communication`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});