import express = require('express');
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors = require('cors');
import helmet = require('helmet');
import morgan = require('morgan');
import * as dotenv from 'dotenv';
import winston = require('winston');

// Import our new services and agents
import { MCPServerManager } from './services/mcp-server-manager.js';
import { WebScrapingService } from './services/web-scraping-service.js';
import { SupervisorAgent } from './agents/supervisor-agent.js';
import { ProductAgent } from './agents/product-agent.js';
import { PlaceAgent } from './agents/place-agent.js';
import { PriceAgent } from './agents/price-agent.js';
import { PromotionAgent } from './agents/promotion-agent.js';
import { ReportAgent } from './agents/report-agent.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Initialize MCP Server Manager and Services
const mcpManager = new MCPServerManager();
const webScrapingService = new WebScrapingService(mcpManager);

// Initialize Agents (without MCPManager for now - we'll add that integration later)
const supervisorAgent = { determineNextAgent: async (state: any) => 'product' };
const productAgent = new ProductAgent(mcpManager);
const placeAgent = new PlaceAgent();
const priceAgent = new PriceAgent();
const promotionAgent = new PromotionAgent();
const reportAgent = new ReportAgent();

// Store active research sessions
const activeSessions = new Map<string, any>();

// Initialize Socket.IO with CORS
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
});

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ],
});

// Middleware
app.use(helmet.default());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('combined', { stream: { write: (message: string) => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MCP Server Status endpoint
app.get('/api/mcp/status', (req, res) => {
  try {
    const serverStatuses = mcpManager.getServerStatuses();
    res.json({
      success: true,
      servers: serverStatuses,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error getting MCP status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get MCP server status'
    });
  }
});

// Web scraping test endpoint
app.post('/api/scraping/test', async (req, res) => {
  try {
    const { type, options } = req.body;
    let result;

    switch (type) {
      case 'wongnai':
        result = await webScrapingService.scrapeWongnai(options);
        break;
      case 'foodpanda':
        result = await webScrapingService.scrapeFoodPanda(options);
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid scraping type'
        });
    }

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error in scraping test:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Scraping failed'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  const mcpStatus = mcpManager.getServerStatuses();
  const enabledServers = mcpStatus.filter(s => s.status === 'running').length;
  const totalServers = mcpStatus.length;
  
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'bitebase-backend',
    mcp: {
      servers: `${enabledServers}/${totalServers} running`,
      details: mcpStatus
    }
  });
});

// API Routes
app.use('/api/research', require('./routes/research'));
app.use('/api/agents', require('./routes/agents'));
app.use('/api/components', require('./routes/components'));

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('join-session', (sessionId: string) => {
    socket.join(`session-${sessionId}`);
    logger.info(`Client ${socket.id} joined session ${sessionId}`);
  });

  socket.on('start-research', async (data) => {
    try {
      const { sessionId, parameters } = data;
      
      // Join session room
      socket.join(`session-${sessionId}`);
      
      // Store session data
      activeSessions.set(sessionId, {
        status: 'running',
        startTime: new Date(),
        parameters,
        socketId: socket.id
      });
      
      // Start the research process
      logger.info(`Starting research for session: ${sessionId}`, parameters);
      
      // Emit initial status
      io.to(`session-${sessionId}`).emit('status-update', {
        sessionId,
        status: 'running',
        progress: 0,
        currentAgent: 'supervisor',
        message: 'Initializing research workflow...'
      });

      // Start real agent workflow
      await executeAgentWorkflow(sessionId, parameters, io);

    } catch (error) {
      logger.error('Error starting research:', error);
      socket.emit('error', { 
        message: 'Failed to start research',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  socket.on('pause-research', (data) => {
    const { sessionId } = data;
    io.to(`session-${sessionId}`).emit('status-update', {
      sessionId,
      status: 'paused',
      message: 'Research paused'
    });
  });

  socket.on('resume-research', (data) => {
    const { sessionId } = data;
    io.to(`session-${sessionId}`).emit('status-update', {
      sessionId,
      status: 'running',
      message: 'Research resumed'
    });
  });

  socket.on('stop-research', (data) => {
    const { sessionId } = data;
    io.to(`session-${sessionId}`).emit('status-update', {
      sessionId,
      status: 'stopped',
      message: 'Research stopped'
    });
  });

  socket.on('component-created', (data) => {
    const { sessionId, component } = data;
    socket.to(`session-${sessionId}`).emit('component-update', {
      type: 'created',
      component
    });
  });

  socket.on('component-updated', (data) => {
    const { sessionId, componentId, updates } = data;
    socket.to(`session-${sessionId}`).emit('component-update', {
      type: 'updated',
      componentId,
      updates
    });
  });

  socket.on('component-deleted', (data) => {
    const { sessionId, componentId } = data;
    socket.to(`session-${sessionId}`).emit('component-update', {
      type: 'deleted',
      componentId
    });
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Simplified agent workflow execution (without complex LangGraph integration for now)
async function executeAgentWorkflow(sessionId: string, parameters: any, io: Server) {
  try {
    logger.info(`🚀 Starting agent workflow for session: ${sessionId}`);
    
    // Step 1: Supervisor determines workflow
    io.to(`session-${sessionId}`).emit('agent-update', {
      agentType: 'supervisor',
      status: 'completed',
      progress: 100,
      data: { plan: ['product', 'place', 'price', 'promotion', 'report'] },
      message: 'Research plan created'
    });

    // Step 2: Product Analysis (the only one with real MCP integration so far)
    io.to(`session-${sessionId}`).emit('status-update', {
      sessionId,
      status: 'running',
      progress: 20,
      currentAgent: 'product',
      message: 'Analyzing menu and dish popularity...'
    });

    try {
      // Create a simplified state for the product agent
      const productState = {
        sessionId,
        parameters,
        currentAgent: 'product',
        status: 'running' as const,
        progress: 20,
        results: {},
        messages: [],
        errors: [],
        retryCount: 0,
        lastUpdated: new Date()
      };

      const productResult = await productAgent.execute(productState);

      io.to(`session-${sessionId}`).emit('agent-update', {
        agentType: 'product',
        status: 'completed',
        progress: 100,
        data: productResult.data,
        message: 'Product analysis completed with real web scraping'
      });
    } catch (error) {
      logger.error('Product agent error:', error);
      io.to(`session-${sessionId}`).emit('agent-update', {
        agentType: 'product',
        status: 'error',
        progress: 0,
        message: `Product analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }

    // Steps 3-6: Other agents (simplified for now)
    const agents = [
      { name: 'place', progress: 40, message: 'Analyzing location and competition...' },
      { name: 'price', progress: 60, message: 'Calculating financial projections...' },
      { name: 'promotion', progress: 80, message: 'Analyzing customer sentiment...' },
      { name: 'report', progress: 90, message: 'Generating comprehensive report...' }
    ];

    for (const agent of agents) {
      io.to(`session-${sessionId}`).emit('status-update', {
        sessionId,
        status: 'running',
        progress: agent.progress,
        currentAgent: agent.name,
        message: agent.message
      });

      // Simulate some work
      await new Promise(resolve => setTimeout(resolve, 2000));

      io.to(`session-${sessionId}`).emit('agent-update', {
        agentType: agent.name,
        status: 'completed',
        progress: 100,
        data: generateMockData(agent.name),
        message: `${agent.name} analysis completed (mock data)`
      });
    }

    // Final completion
    io.to(`session-${sessionId}`).emit('status-update', {
      sessionId,
      status: 'completed',
      progress: 100,
      message: 'Research completed successfully'
    });

    // Update session status
    const session = activeSessions.get(sessionId);
    if (session) {
      session.status = 'completed';
      session.endTime = new Date();
    }

    logger.info(`✅ Research workflow completed for session: ${sessionId}`);

  } catch (error) {
    logger.error(`❌ Error in agent workflow for session ${sessionId}:`, error);
    
    io.to(`session-${sessionId}`).emit('status-update', {
      sessionId,
      status: 'error',
      message: `Research failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: true
    });

    // Update session status
    const session = activeSessions.get(sessionId);
    if (session) {
      session.status = 'error';
      session.error = error instanceof Error ? error.message : 'Unknown error';
      session.endTime = new Date();
    }
  }
}

function generateMockData(agent: string) {
  const mockData = {
    product: {
      popularDishes: ['Pad Thai', 'Tom Yum', 'Green Curry'],
      priceRange: { min: 80, max: 250 },
      competitorCount: 15
    },
    place: {
      footTraffic: 'High',
      competitorDensity: 'Medium',
      rentalCost: 45000
    },
    price: {
      avgRevenue: 850000,
      breakEvenPoint: 180,
      profitMargin: 0.35
    },
    promotion: {
      sentiment: 'Positive',
      reviewCount: 1250,
      avgRating: 4.2
    },
    report: {
      viabilityScore: 8.2,
      riskLevel: 'Medium',
      roi: 0.28
    }
  };
  
  return mockData[agent as keyof typeof mockData] || {};
}

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3001;

// Initialize MCP servers and start the main server
async function startServer() {
  try {
    logger.info('🚀 Starting BiteBase Backend Server...');
    
    // Initialize MCP servers first
    logger.info('📡 Initializing MCP servers...');
    await mcpManager.initializeServers();
    
    // Start the HTTP server
    httpServer.listen(PORT, () => {
      logger.info(`✅ BiteBase Backend Server running on port ${PORT}`);
      logger.info(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`🔧 MCP Servers: ${mcpManager.getServerStatuses().filter(s => s.status === 'running').length} running`);
    });
    
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

export { app, io };