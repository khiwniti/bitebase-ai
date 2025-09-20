/**
 * Enhanced BiteBase Restaurant Intelligence LangGraph Server
 * Integrates the new comprehensive agent framework with MCP servers
 */

import { app, InputSchema, OutputSchema } from './enhanced-langgraph-app.js';
import { RestaurantParamsSchema, EnhancedState } from './state/enhanced-state.js';
import { supervisorAgent } from './agents/enhanced-supervisor-agent.js';
import { mcpManager } from './mcp/enhanced-mcp-manager.js';

/**
 * Main LangGraph application for restaurant intelligence
 */
export default app;

/**
 * Export schemas for LangGraph CLI integration
 */
export { InputSchema, OutputSchema };

/**
 * Legacy compatibility wrapper for existing integrations
 */
export const bitebaseGraph = {
  invoke: async (input: any, config?: any) => {
    try {
      // Transform legacy input format to new schema
      const transformedInput = {
        restaurantParams: {
          type: input.restaurant?.type || 'restaurant',
          cuisine: input.restaurant?.cuisine || 'Thai',
          location: {
            address: input.restaurant?.location?.address || '',
            district: input.restaurant?.location?.district || 'Bangkok',
            city: input.restaurant?.location?.city || 'Bangkok',
            coordinates: input.restaurant?.location?.coordinates,
          },
          budget: {
            min: input.restaurant?.priceRange?.min || 100000,
            max: input.restaurant?.priceRange?.max || 500000,
          },
          targetCustomers: input.restaurant?.targetAudience || ['general'],
          businessModel: 'hybrid' as const,
          radius: 2,
        },
        sessionId: config?.configurable?.thread_id,
        analysisType: input.analysisType || 'comprehensive',
      };

      return await app.invoke(transformedInput, config);
    } catch (error) {
      console.error('Legacy wrapper error:', error);
      throw error;
    }
  },

  stream: async function* (input: any, config?: any) {
    try {
      const transformedInput = {
        restaurantParams: {
          type: input.restaurant?.type || 'restaurant',
          cuisine: input.restaurant?.cuisine || 'Thai',
          location: {
            address: input.restaurant?.location?.address || '',
            district: input.restaurant?.location?.district || 'Bangkok',
            city: input.restaurant?.location?.city || 'Bangkok',
            coordinates: input.restaurant?.location?.coordinates,
          },
          budget: {
            min: input.restaurant?.priceRange?.min || 100000,
            max: input.restaurant?.priceRange?.max || 500000,
          },
          targetCustomers: input.restaurant?.targetAudience || ['general'],
          businessModel: 'hybrid' as const,
          radius: 2,
        },
        sessionId: config?.configurable?.thread_id,
        analysisType: input.analysisType || 'comprehensive',
      };

      for await (const update of app.stream(transformedInput, config)) {
        yield update;
      }
    } catch (error) {
      console.error('Legacy stream wrapper error:', error);
      throw error;
    }
  },
};

/**
 * Utility functions for direct access to components
 */
export const utils = {
  // Get application information
  getAppInfo: () => app.getAppInfo(),
  
  // Get MCP server status
  getMCPStatus: () => mcpManager.getConnectionStatus(),
  
  // Get workflow status
  getWorkflowStatus: () => supervisorAgent.getWorkflowStatus(),
  
  // Validate restaurant parameters
  validateRestaurantParams: (params: any) => {
    try {
      return RestaurantParamsSchema.parse(params);
    } catch (error) {
      throw new Error(`Invalid restaurant parameters: ${error.message}`);
    }
  },
  
  // Health check
  healthCheck: async () => {
    const mcpStatus = mcpManager.getConnectionStatus();
    const connectedServers = Object.values(mcpStatus).filter(s => s.status === 'connected').length;
    const totalServers = Object.keys(mcpStatus).length;
    
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      mcp: {
        connected: connectedServers,
        total: totalServers,
        health: connectedServers / totalServers,
      },
      agents: {
        available: supervisorAgent.getWorkflowStatus().agentsAvailable.length,
      },
    };
  },
};

/**
 * Initialize the enhanced framework
 */
async function initialize() {
  try {
    console.log('🚀 Initializing BiteBase Intelligence Framework...');
    
    // Initialize core MCP servers
    await mcpManager.initializeServers([
      'web_scraping',
      'database',
      'chart_generation',
    ]);
    
    console.log('✅ BiteBase Intelligence Framework initialized successfully');
    console.log('📊 Available capabilities:', app.getAppInfo().capabilities);
    
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize BiteBase Intelligence Framework:', error);
    return false;
  }
}

// Auto-initialize when module is loaded
initialize().catch(console.error);

/**
 * Export types for TypeScript integration
 */
export type {
  EnhancedState,
  RestaurantParams,
  AnalysisProgress,
  AnalysisResults,
} from './state/enhanced-state.js';

export type {
  MCPServerConfig,
  MCPToolCall,
  MCPToolResult,
} from './mcp/enhanced-mcp-manager.js';

export type {
  AnalysisPlan,
  WorkflowStep,
} from './agents/enhanced-supervisor-agent.js';