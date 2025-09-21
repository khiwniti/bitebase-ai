/**
 * MCP Server Configuration
 * Centralized configuration for all Model Context Protocol servers
 */

export interface MCPServerConfig {
  name: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
  enabled: boolean;
  description: string;
  capabilities: string[];
}

export const MCP_SERVERS: Record<string, MCPServerConfig> = {
  // Web Scraping - Playwright MCP Server
  playwright: {
    name: "Playwright MCP",
    command: "npx",
    args: ["@executeautomation/playwright-mcp-server"],
    enabled: true,
    description: "Advanced browser automation for web scraping with dynamic content handling",
    capabilities: [
      "browser_automation",
      "dynamic_content_scraping",
      "anti_bot_protection_handling",
      "javascript_rendering",
      "page_interaction"
    ]
  },

  // Database Operations - SQLite MCP Server
  sqlite: {
    name: "SQLite MCP",
    command: "npx",
    args: ["sqlite-mcp-server", "./database/bitebase.db"],
    enabled: true,
    description: "Local database operations and data persistence",
    capabilities: [
      "database_operations",
      "data_storage",
      "advanced_querying",
      "data_aggregation",
      "statistical_analysis"
    ]
  },

  // Visualization - ECharts MCP Server
  echarts: {
    name: "ECharts MCP",
    command: "npx",
    args: ["hustcc/mcp-echarts"],
    enabled: true,
    description: "Interactive business charts and data visualization",
    capabilities: [
      "chart_generation",
      "interactive_visualizations",
      "business_metrics_display",
      "data_presentation"
    ]
  },

  // Diagrams - Mermaid MCP Server
  mermaid: {
    name: "Mermaid MCP",
    command: "npx",
    args: ["hustcc/mcp-mermaid"],
    enabled: true,
    description: "Process flows, organizational charts, and business model diagrams",
    capabilities: [
      "diagram_generation",
      "process_flows",
      "organizational_charts",
      "business_model_visualization"
    ]
  },

  // Financial Analysis - Finance Tools MCP
  financeTools: {
    name: "Finance Tools MCP",
    command: "npx",
    args: ["VoxLink-org/finance-tools-mcp"],
    enabled: true,
    description: "Financial analysis and market intelligence tools",
    capabilities: [
      "financial_analysis",
      "market_intelligence",
      "revenue_forecasting",
      "profitability_analysis"
    ]
  },

  // Market Data - Financial Datasets MCP
  financialDatasets: {
    name: "Financial Datasets MCP",
    command: "npx",
    args: ["financial-datasets/mcp-server"],
    enabled: true,
    description: "Market data and financial datasets for analysis",
    capabilities: [
      "market_data",
      "financial_datasets",
      "industry_benchmarks",
      "economic_indicators"
    ]
  },

  // Market Sizing - Market Analysis MCP
  marketSizing: {
    name: "Market Sizing MCP",
    command: "npx",
    args: ["gvaibhav-tam-mcp-server"],
    enabled: true,
    description: "Comprehensive market sizing and business intelligence",
    capabilities: [
      "market_sizing",
      "business_intelligence",
      "competitive_analysis",
      "market_opportunity_assessment"
    ]
  },

  // GIS Analysis - Geospatial MCP (Future Implementation)
  gis: {
    name: "GIS MCP",
    command: "npx",
    args: ["mahdin75/gis-mcp"],
    enabled: false, // Will be enabled in Phase 16
    description: "Advanced geospatial operations and spatial analysis",
    capabilities: [
      "geospatial_analysis",
      "buffer_analysis",
      "intersection_calculations",
      "proximity_analysis"
    ]
  },

  // Collaboration - Firebase MCP (Future Implementation)
  firebase: {
    name: "Firebase MCP",
    command: "npx",
    args: ["gannonh/firebase-mcp"],
    enabled: false, // Will be enabled in Phase 14
    description: "Real-time data synchronization and collaboration",
    capabilities: [
      "real_time_sync",
      "collaborative_features",
      "cloud_storage",
      "user_management"
    ]
  },

  // Backend Collaboration - Convex MCP (Future Implementation)
  convex: {
    name: "Convex MCP",
    command: "npx",
    args: ["get-convex/convex-backend"],
    enabled: false, // Will be enabled in Phase 14
    description: "Collaborative data management and backend services",
    capabilities: [
      "collaborative_data_management",
      "backend_services",
      "real_time_updates",
      "conflict_resolution"
    ]
  }
};

// Helper functions for MCP server management
export const getEnabledServers = (): MCPServerConfig[] => {
  return Object.values(MCP_SERVERS).filter(server => server.enabled);
};

export const getServerByCapability = (capability: string): MCPServerConfig[] => {
  return Object.values(MCP_SERVERS).filter(server => 
    server.enabled && server.capabilities.includes(capability)
  );
};

export const getServerConfig = (serverName: string): MCPServerConfig | undefined => {
  return MCP_SERVERS[serverName];
};