import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config();

const app = express();
const httpServer = createServer(app);

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
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('combined', { stream: { write: (message: string) => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'bitebase-backend'
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
      
      // Start the research process
      logger.info(`Starting research for session: ${sessionId}`);
      
      // Emit initial status
      io.to(`session-${sessionId}`).emit('status-update', {
        sessionId,
        status: 'running',
        progress: 0,
        currentAgent: 'initializing',
        message: 'Research started successfully'
      });

      // Simulate agent workflow (replace with actual agent calls)
      simulateAgentWorkflow(sessionId, parameters, io);

    } catch (error) {
      logger.error('Error starting research:', error);
      socket.emit('error', { message: 'Failed to start research' });
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

// Simulate agent workflow (replace with actual LangGraph integration)
async function simulateAgentWorkflow(sessionId: string, parameters: any, io: Server) {
  const agents = ['product', 'place', 'price', 'promotion', 'report'];
  
  for (let i = 0; i < agents.length; i++) {
    const agent = agents[i];
    const progress = Math.round((i + 1) / agents.length * 100);
    
    // Simulate agent work
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    io.to(`session-${sessionId}`).emit('agent-update', {
      agentType: agent,
      status: 'running',
      progress: 50,
      message: `${agent} analysis in progress`
    });
    
    // Simulate completion
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    io.to(`session-${sessionId}`).emit('agent-update', {
      agentType: agent,
      status: 'completed',
      progress: 100,
      data: generateMockData(agent),
      message: `${agent} analysis completed`
    });
    
    io.to(`session-${sessionId}`).emit('status-update', {
      sessionId,
      status: 'running',
      progress,
      currentAgent: agent,
      message: `Completed ${agent} analysis`
    });
  }
  
  // Final completion
  io.to(`session-${sessionId}`).emit('status-update', {
    sessionId,
    status: 'completed',
    progress: 100,
    message: 'Research completed successfully'
  });
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

httpServer.listen(PORT, () => {
  logger.info(`BiteBase Backend Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export { app, io };