// BiteBase AI - Base Agent Interface
// Abstract base class for all analysis agents with MCP integration

import { BiteBaseState, NodeResponse } from '../langgraph/state';

export abstract class BaseAgent {
  protected name: string;
  protected description: string;
  protected mcpServers: string[];
  protected retryLimit: number;

  constructor(name: string, description: string, mcpServers: string[] = [], retryLimit: number = 3) {
    this.name = name;
    this.description = description;
    this.mcpServers = mcpServers;
    this.retryLimit = retryLimit;
    
    console.log(`🤖 ${this.name} agent initialized`);
  }

  // Abstract method to be implemented by each agent
  abstract execute(state: BiteBaseState): Promise<NodeResponse>;

  // Common progress update method
  protected updateProgress(
    current: number, 
    total: number, 
    message: string,
    socketCallback?: (update: any) => void
  ): void {
    const progress = Math.round((current / total) * 100);
    
    console.log(`📊 ${this.name}: ${progress}% - ${message}`);
    
    if (socketCallback) {
      socketCallback({
        type: 'agent-progress',
        agent: this.name,
        progress,
        message
      });
    }
  }

  // Common error handling
  protected handleError(error: any, context: string): NodeResponse {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ ${this.name} error in ${context}:`, errorMessage);
    
    return {
      shouldContinue: false,
      errors: [errorMessage],
      data: null
    };
  }

  // Validate required parameters for the agent
  protected validateParameters(state: BiteBaseState, requiredParams: string[]): boolean {
    const missing = requiredParams.filter(param => {
      const keys = param.split('.');
      let current: any = state.parameters;
      
      for (const key of keys) {
        if (!current || !current[key]) return true;
        current = current[key];
      }
      return false;
    });

    if (missing.length > 0) {
      console.warn(`⚠️ ${this.name} missing required parameters:`, missing);
      return false;
    }

    return true;
  }

  // Simulate MCP server call (will be replaced with actual MCP integration)
  protected async callMCPServer(
    serverName: string, 
    operation: string, 
    parameters: any
  ): Promise<any> {
    console.log(`🔌 ${this.name} calling ${serverName}.${operation}`, parameters);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Mock responses based on server type
    return this.generateMockMCPResponse(serverName, operation, parameters);
  }

  // Generate mock MCP responses for development
  private generateMockMCPResponse(serverName: string, operation: string, parameters: any): any {
    const mockResponses: { [key: string]: any } = {
      'playwright-mcp.scrape': {
        success: true,
        data: [
          { name: 'Thai Garden', rating: 4.2, price: 150, reviews: 156 },
          { name: 'Sushi Express', rating: 4.5, price: 280, reviews: 89 }
        ],
        timestamp: new Date().toISOString()
      },
      'sqlite-mcp.query': {
        success: true,
        data: [],
        affected: 0
      },
      'gis-mcp.analyze': {
        success: true,
        locationScore: 85,
        demographics: { population: 50000, avgIncome: 450000 },
        accessibility: { publicTransport: 8, parking: 6, walkability: 9 }
      },
      'finance-tools-mcp.forecast': {
        success: true,
        revenue: { monthly: [120000, 135000, 145000], annual: 1620000 },
        breakEven: 8,
        roi: 0.25
      },
      'echarts-mcp.generate': {
        success: true,
        chartUrl: '/charts/analysis-chart.png',
        chartData: { type: 'bar', data: [1, 2, 3, 4, 5] }
      }
    };

    const key = `${serverName}.${operation}`;
    return mockResponses[key] || { success: false, error: 'Unknown operation' };
  }

  // Get agent information
  getInfo(): {
    name: string;
    description: string;
    mcpServers: string[];
    retryLimit: number;
  } {
    return {
      name: this.name,
      description: this.description,
      mcpServers: this.mcpServers,
      retryLimit: this.retryLimit
    };
  }
}