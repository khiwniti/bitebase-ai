/**
 * MCP (Model Context Protocol) Server Integration
 * Manages connections to various MCP servers for enhanced capabilities
 */

import { MCPServerConfig } from '../shared/types';
import { spawn, ChildProcess } from 'child_process';
import WebSocket from 'ws';

export interface MCPServerInstance {
  config: MCPServerConfig;
  process?: ChildProcess;
  websocket?: WebSocket;
  status: 'stopped' | 'starting' | 'running' | 'error';
  lastError?: string;
}

export class MCPIntegrationManager {
  private servers: Map<string, MCPServerInstance> = new Map();
  private retryTimeouts: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    this.initializeDefaultServers();
  }

  private initializeDefaultServers() {
    const defaultServers: MCPServerConfig[] = [
      {
        name: 'playwright-scraper',
        command: 'npx',
        args: ['@executeautomation/playwright-mcp-server'],
        env: {},
        enabled: true,
        retryCount: 3,
        capabilities: ['web_scraping', 'browser_automation', 'dynamic_content'],
        healthCheckUrl: 'http://localhost:3000/health'
      },
      {
        name: 'sqlite-database',
        command: 'npx',
        args: ['sqlite-mcp-server', '--database', './data/restaurant_intelligence.db'],
        env: {},
        enabled: true,
        retryCount: 3,
        capabilities: ['database_operations', 'data_storage', 'querying'],
      },
      {
        name: 'echarts-visualization',
        command: 'npx',
        args: ['hustcc/mcp-echarts'],
        env: {},
        enabled: true,
        retryCount: 3,
        capabilities: ['chart_generation', 'data_visualization', 'interactive_charts'],
      },
      {
        name: 'mermaid-diagrams',
        command: 'npx',
        args: ['hustcc/mcp-mermaid'],
        env: {},
        enabled: true,
        retryCount: 3,
        capabilities: ['diagram_generation', 'flowcharts', 'process_visualization'],
      },
      {
        name: 'finance-tools',
        command: 'npx',
        args: ['VoxLink-org/finance-tools-mcp'],
        env: {},
        enabled: true,
        retryCount: 3,
        capabilities: ['financial_analysis', 'market_data', 'investment_metrics'],
      },
      {
        name: 'financial-datasets',
        command: 'npx',
        args: ['financial-datasets/mcp-server'],
        env: {},
        enabled: true,
        retryCount: 3,
        capabilities: ['market_datasets', 'financial_intelligence', 'industry_analysis'],
      },
      {
        name: 'market-sizing',
        command: 'npx',
        args: ['gvaibhav-tam-mcp-server'],
        env: {},
        enabled: true,
        retryCount: 3,
        capabilities: ['market_sizing', 'business_intelligence', 'competitive_analysis'],
      },
      {
        name: 'gis-analysis',
        command: 'npx',
        args: ['mahdin75/gis-mcp'],
        env: {},
        enabled: true,
        retryCount: 3,
        capabilities: ['geospatial_analysis', 'buffer_analysis', 'proximity_calculation'],
      },
      {
        name: 'firebase-realtime',
        command: 'npx',
        args: ['gannonh/firebase-mcp'],
        env: {
          FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
          FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
        },
        enabled: true,
        retryCount: 3,
        capabilities: ['realtime_sync', 'document_storage', 'authentication'],
      },
      {
        name: 'convex-collaboration',
        command: 'npx',
        args: ['get-convex/convex-backend'],
        env: {
          CONVEX_URL: process.env.CONVEX_URL || '',
        },
        enabled: true,
        retryCount: 3,
        capabilities: ['collaborative_editing', 'real_time_updates', 'conflict_resolution'],
      }
    ];

    defaultServers.forEach(config => {
      if (config.enabled) {
        this.servers.set(config.name, {
          config,
          status: 'stopped'
        });
      }
    });
  }

  async startServer(serverName: string): Promise<boolean> {
    const server = this.servers.get(serverName);
    if (!server) {
      throw new Error(`Server ${serverName} not found`);
    }

    if (server.status === 'running') {
      return true;
    }

    server.status = 'starting';
    
    try {
      // Start the MCP server process
      const process = spawn(server.config.command, server.config.args, {
        env: { ...process.env, ...server.config.env },
        stdio: ['pipe', 'pipe', 'pipe']
      });

      server.process = process;

      // Handle process events
      process.on('error', (error) => {
        console.error(`MCP Server ${serverName} error:`, error);
        server.status = 'error';
        server.lastError = error.message;
        this.scheduleRestart(serverName);
      });

      process.on('exit', (code) => {
        console.log(`MCP Server ${serverName} exited with code:`, code);
        if (code !== 0) {
          server.status = 'error';
          server.lastError = `Process exited with code ${code}`;
          this.scheduleRestart(serverName);
        } else {
          server.status = 'stopped';
        }
      });

      // Log output for debugging
      process.stdout?.on('data', (data) => {
        console.log(`MCP Server ${serverName} stdout:`, data.toString());
      });

      process.stderr?.on('data', (data) => {
        console.error(`MCP Server ${serverName} stderr:`, data.toString());
      });

      // Wait for server to be ready (simplified check)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      server.status = 'running';
      console.log(`MCP Server ${serverName} started successfully`);
      return true;

    } catch (error) {
      server.status = 'error';
      server.lastError = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Failed to start MCP Server ${serverName}:`, error);
      return false;
    }
  }

  async stopServer(serverName: string): Promise<boolean> {
    const server = this.servers.get(serverName);
    if (!server || server.status === 'stopped') {
      return true;
    }

    try {
      if (server.process) {
        server.process.kill('SIGTERM');
        
        // Wait for graceful shutdown
        await new Promise(resolve => {
          const timeout = setTimeout(() => {
            server.process?.kill('SIGKILL');
            resolve(void 0);
          }, 5000);
          
          server.process?.on('exit', () => {
            clearTimeout(timeout);
            resolve(void 0);
          });
        });
      }

      if (server.websocket) {
        server.websocket.close();
        server.websocket = undefined;
      }

      server.status = 'stopped';
      server.process = undefined;
      console.log(`MCP Server ${serverName} stopped successfully`);
      return true;

    } catch (error) {
      console.error(`Failed to stop MCP Server ${serverName}:`, error);
      return false;
    }
  }

  async startAllServers(): Promise<void> {
    const startPromises = Array.from(this.servers.keys()).map(serverName => 
      this.startServer(serverName).catch(error => {
        console.error(`Failed to start ${serverName}:`, error);
        return false;
      })
    );

    await Promise.all(startPromises);
  }

  async stopAllServers(): Promise<void> {
    const stopPromises = Array.from(this.servers.keys()).map(serverName => 
      this.stopServer(serverName)
    );

    await Promise.all(stopPromises);
  }

  private scheduleRestart(serverName: string): void {
    const server = this.servers.get(serverName);
    if (!server || server.config.retryCount <= 0) {
      return;
    }

    // Clear existing timeout
    const existingTimeout = this.retryTimeouts.get(serverName);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Schedule restart with exponential backoff
    const retryDelay = Math.min(1000 * Math.pow(2, 3 - server.config.retryCount), 30000);
    
    const timeout = setTimeout(async () => {
      console.log(`Attempting to restart MCP Server ${serverName}...`);
      server.config.retryCount--;
      const success = await this.startServer(serverName);
      
      if (!success && server.config.retryCount > 0) {
        this.scheduleRestart(serverName);
      }
    }, retryDelay);

    this.retryTimeouts.set(serverName, timeout);
  }

  getServerStatus(serverName: string): MCPServerInstance | undefined {
    return this.servers.get(serverName);
  }

  getAllServerStatuses(): Map<string, MCPServerInstance> {
    return new Map(this.servers);
  }

  async healthCheck(): Promise<Record<string, boolean>> {
    const healthStatus: Record<string, boolean> = {};
    
    for (const [serverName, server] of this.servers) {
      if (server.config.healthCheckUrl) {
        try {
          const response = await fetch(server.config.healthCheckUrl, {
            timeout: 5000
          });
          healthStatus[serverName] = response.ok;
        } catch {
          healthStatus[serverName] = false;
        }
      } else {
        healthStatus[serverName] = server.status === 'running';
      }
    }

    return healthStatus;
  }

  // MCP Communication Methods
  async sendRequest(serverName: string, method: string, params: any): Promise<any> {
    const server = this.servers.get(serverName);
    if (!server || server.status !== 'running') {
      throw new Error(`Server ${serverName} is not running`);
    }

    // Implement MCP protocol communication
    // This is a simplified version - actual implementation would use proper MCP protocol
    if (server.websocket) {
      return new Promise((resolve, reject) => {
        const requestId = Math.random().toString(36).substr(2, 9);
        const request = {
          jsonrpc: '2.0',
          id: requestId,
          method,
          params
        };

        const timeout = setTimeout(() => {
          reject(new Error(`Request timeout for ${method}`));
        }, 30000);

        const messageHandler = (data: any) => {
          try {
            const response = JSON.parse(data.toString());
            if (response.id === requestId) {
              clearTimeout(timeout);
              server.websocket?.removeListener('message', messageHandler);
              
              if (response.error) {
                reject(new Error(response.error.message));
              } else {
                resolve(response.result);
              }
            }
          } catch (error) {
            // Ignore parsing errors for non-matching messages
          }
        };

        server.websocket?.on('message', messageHandler);
        server.websocket?.send(JSON.stringify(request));
      });
    } else {
      throw new Error(`No WebSocket connection for server ${serverName}`);
    }
  }

  // Specific MCP Operations
  async scrapeWebsite(url: string, selectors: Record<string, string>): Promise<any> {
    return this.sendRequest('playwright-scraper', 'scrape', { url, selectors });
  }

  async queryDatabase(query: string, params?: any[]): Promise<any> {
    return this.sendRequest('sqlite-database', 'query', { query, params });
  }

  async generateChart(chartConfig: any): Promise<string> {
    return this.sendRequest('echarts-visualization', 'generate', chartConfig);
  }

  async generateDiagram(diagramConfig: any): Promise<string> {
    return this.sendRequest('mermaid-diagrams', 'generate', diagramConfig);
  }

  async performGISAnalysis(operation: string, geometry: any, params: any): Promise<any> {
    return this.sendRequest('gis-analysis', operation, { geometry, params });
  }

  async getFinancialData(symbol: string, metrics: string[]): Promise<any> {
    return this.sendRequest('finance-tools', 'get_data', { symbol, metrics });
  }

  cleanup(): void {
    // Clear all retry timeouts
    for (const timeout of this.retryTimeouts.values()) {
      clearTimeout(timeout);
    }
    this.retryTimeouts.clear();

    // Stop all servers
    this.stopAllServers();
  }
}

// Singleton instance
export const mcpManager = new MCPIntegrationManager();

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('Shutting down MCP servers...');
  mcpManager.cleanup();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down MCP servers...');
  mcpManager.cleanup();
  process.exit(0);
});