/**
 * MCP Server Configuration for BiteBase Intelligence
 * Comprehensive open-source MCP server integration
 */

import { z } from 'zod';

export const MCPServerConfigSchema = z.object({
  name: z.string(),
  description: z.string(),
  command: z.string(),
  args: z.array(z.string()).optional(),
  env: z.record(z.string()).optional(),
  cwd: z.string().optional(),
  capabilities: z.array(z.string()),
  healthCheck: z.object({
    enabled: z.boolean().default(true),
    interval: z.number().default(30000),
    timeout: z.number().default(5000),
  }).optional(),
});

export type MCPServerConfig = z.infer<typeof MCPServerConfigSchema>;

/**
 * Comprehensive MCP Server Configuration for Restaurant Intelligence
 */
export const MCP_SERVERS: Record<string, MCPServerConfig> = {
  // Web Scraping and Browser Automation
  playwright: {
    name: 'playwright-mcp',
    description: 'Advanced browser automation for Wongnai, Food Panda, DDProperty, RentHub scraping',
    command: 'npx',
    args: ['@executeautomation/playwright-mcp-server'],
    capabilities: ['web_scraping', 'browser_automation', 'dynamic_content'],
    healthCheck: {
      enabled: true,
      interval: 30000,
      timeout: 10000,
    },
  },

  // Database Operations
  sqlite: {
    name: 'sqlite-mcp',
    description: 'Local database operations and data persistence',
    command: 'npx',
    args: ['@modelcontextprotocol/server-sqlite', './data/bitebase.db'],
    capabilities: ['database', 'crud_operations', 'data_analysis'],
    healthCheck: {
      enabled: true,
      interval: 15000,
      timeout: 5000,
    },
  },

  // Visualization and Chart Generation
  echarts: {
    name: 'echarts-mcp',
    description: 'Interactive business charts and data visualization',
    command: 'npx',
    args: ['hustcc/mcp-echarts'],
    capabilities: ['chart_generation', 'data_visualization', 'interactive_charts'],
  },

  mermaid: {
    name: 'mermaid-mcp',
    description: 'Process flows, organizational charts, and business diagrams',
    command: 'npx',
    args: ['hustcc/mcp-mermaid'],
    capabilities: ['diagram_generation', 'process_flows', 'organizational_charts'],
  },

  // Financial Analysis
  financeTools: {
    name: 'finance-tools-mcp',
    description: 'Financial analysis tools for restaurant business intelligence',
    command: 'npx',
    args: ['VoxLink-org/finance-tools-mcp'],
    capabilities: ['financial_analysis', 'market_intelligence', 'roi_calculation'],
  },

  financialDatasets: {
    name: 'financial-datasets-mcp',
    description: 'Market data and financial datasets for analysis',
    command: 'npx',
    args: ['financial-datasets/mcp-server'],
    capabilities: ['market_data', 'financial_datasets', 'trend_analysis'],
  },

  marketSizing: {
    name: 'market-sizing-mcp',
    description: 'Comprehensive business intelligence and market sizing',
    command: 'npx',
    args: ['gvaibhav-tam-mcp-server'],
    capabilities: ['market_sizing', 'business_intelligence', 'competitive_analysis'],
  },

  // Geospatial Analysis
  gis: {
    name: 'gis-mcp',
    description: 'Advanced geospatial operations and location intelligence',
    command: 'npx',
    args: ['mahdin75/gis-mcp'],
    capabilities: ['geospatial_analysis', 'buffer_analysis', 'proximity_calculations'],
  },

  mapbox: {
    name: 'mapbox-mcp',
    description: 'Professional mapping and location services',
    command: 'npx',
    args: ['mapbox-mcp-server'],
    capabilities: ['mapping', 'location_intelligence', 'demographic_overlay'],
    env: {
      MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN || '',
    },
  },

  // Real-time Collaboration
  firebase: {
    name: 'firebase-mcp',
    description: 'Real-time data synchronization and collaboration',
    command: 'npx',
    args: ['gannonh/firebase-mcp'],
    capabilities: ['real_time_sync', 'collaboration', 'data_persistence'],
    env: {
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
      FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY || '',
    },
  },

  convex: {
    name: 'convex-mcp',
    description: 'Collaborative data management and real-time updates',
    command: 'npx',
    args: ['get-convex/convex-backend'],
    capabilities: ['collaborative_editing', 'real_time_updates', 'data_management'],
    env: {
      CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT || '',
    },
  },

  // File System Operations
  filesystem: {
    name: 'filesystem-mcp',
    description: 'File system operations for data import/export',
    command: 'npx',
    args: ['@modelcontextprotocol/server-filesystem', './data'],
    capabilities: ['file_operations', 'data_import', 'report_export'],
  },

  // Search and Information Retrieval
  brave: {
    name: 'brave-search-mcp',
    description: 'Web search for market research and competitor analysis',
    command: 'npx',
    args: ['@modelcontextprotocol/server-brave-search'],
    capabilities: ['web_search', 'market_research', 'competitor_intelligence'],
    env: {
      BRAVE_API_KEY: process.env.BRAVE_API_KEY || '',
    },
  },

  // Memory and Context Management
  memory: {
    name: 'memory-mcp',
    description: 'Persistent memory and context management',
    command: 'npx',
    args: ['@modelcontextprotocol/server-memory'],
    capabilities: ['memory_management', 'context_persistence', 'session_continuity'],
  },
};

/**
 * MCP Server Categories for organized management
 */
export const MCP_CATEGORIES = {
  CORE: ['playwright', 'sqlite', 'filesystem', 'memory'],
  VISUALIZATION: ['echarts', 'mermaid'],
  FINANCIAL: ['financeTools', 'financialDatasets', 'marketSizing'],
  GEOSPATIAL: ['gis', 'mapbox'],
  COLLABORATION: ['firebase', 'convex'],
  SEARCH: ['brave'],
} as const;

/**
 * Required capabilities for different analysis types
 */
export const ANALYSIS_CAPABILITIES = {
  PRODUCT_ANALYSIS: ['web_scraping', 'data_analysis', 'chart_generation'],
  PLACE_ANALYSIS: ['geospatial_analysis', 'mapping', 'demographic_overlay'],
  PRICE_ANALYSIS: ['financial_analysis', 'market_data', 'trend_analysis'],
  PROMOTION_ANALYSIS: ['web_search', 'data_visualization', 'competitive_analysis'],
  REPORT_GENERATION: ['chart_generation', 'diagram_generation', 'file_operations'],
} as const;

/**
 * Get required MCP servers for specific analysis type
 */
export function getRequiredServers(analysisType: keyof typeof ANALYSIS_CAPABILITIES): string[] {
  const capabilities = ANALYSIS_CAPABILITIES[analysisType];
  const requiredServers: string[] = [];

  Object.entries(MCP_SERVERS).forEach(([serverName, config]) => {
    if (capabilities.some(capability => config.capabilities.includes(capability))) {
      requiredServers.push(serverName);
    }
  });

  return requiredServers;
}

/**
 * Validate MCP server configuration
 */
export function validateMCPConfig(config: unknown): MCPServerConfig {
  return MCPServerConfigSchema.parse(config);
}

/**
 * Get MCP server by capability
 */
export function getServersByCapability(capability: string): MCPServerConfig[] {
  return Object.values(MCP_SERVERS).filter(server => 
    server.capabilities.includes(capability)
  );
}