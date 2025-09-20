#!/usr/bin/env node

import { config } from 'dotenv';
import { SupervisorAgent } from './agents/SupervisorAgent.js';
import { MCPManager } from './mcp/MCPManager.js';
import { logger } from './utils/logger.js';

// Load environment variables
config();

async function main() {
  try {
    logger.info('🚀 Initializing BiteBase AI Agent System');
    
    // Initialize MCP Manager
    const mcpManager = new MCPManager();
    await mcpManager.initialize();
    
    // Initialize Supervisor Agent
    const supervisor = new SupervisorAgent(mcpManager);
    await supervisor.initialize();
    
    logger.info('✅ BiteBase AI Agent System initialized successfully');
    logger.info('🎯 Ready to process restaurant market research requests');
    
    // Example usage for testing
    if (process.argv.includes('--test')) {
      const testParameters = {
        restaurantType: 'cafe',
        cuisine: 'thai',
        location: 'Bangkok, Sukhumvit',
        budget: { min: 30000, max: 80000 },
        radius: 2000
      };
      
      logger.info('🧪 Running test analysis...');
      const result = await supervisor.conductResearch('test-session', testParameters);
      logger.info('🎉 Test completed:', result);
    }
    
  } catch (error) {
    logger.error('❌ Failed to initialize agent system:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  logger.info('🛑 Shutting down BiteBase AI Agent System...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('🛑 Shutting down BiteBase AI Agent System...');
  process.exit(0);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };