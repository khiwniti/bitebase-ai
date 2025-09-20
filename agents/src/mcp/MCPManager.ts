import { spawn, ChildProcess } from 'child_process';
import { logger } from '../utils/logger.js';

export interface MCPServerConfig {
  name: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
  capabilities: string[];
  description: string;
}

export class MCPManager {
  private servers: Map<string, ChildProcess> = new Map();
  private serverConfigs: MCPServerConfig[] = [
    {
      name: 'playwright-scraper',
      command: 'npx',
      args: ['@executeautomation/playwright-mcp-server'],
      capabilities: ['web-scraping', 'browser-automation', 'dynamic-content'],
      description: 'Advanced web scraping with browser automation for Wongnai, Food Panda, DDProperty'
    },
    {
      name: 'sqlite-database',
      command: 'sqlite-mcp-server',
      args: ['--database', './data/research.db'],
      capabilities: ['data-storage', 'querying', 'aggregation'],
      description: 'Local database operations for storing and analyzing scraped data'
    },
    {
      name: 'echarts-visualization',
      command: 'npx',
      args: ['hustcc/mcp-echarts'],
      capabilities: ['charts', 'graphs', 'interactive-visualizations'],
      description: 'Professional chart generation for business analytics'
    },
    {
      name: 'mermaid-diagrams',
      command: 'npx',
      args: ['hustcc/mcp-mermaid'],
      capabilities: ['diagrams', 'flowcharts', 'process-flows'],
      description: 'Business process diagrams and organizational charts'
    },
    {
      name: 'finance-tools',
      command: 'npx',
      args: ['VoxLink-org/finance-tools-mcp'],
      capabilities: ['financial-analysis', 'market-intelligence', 'calculations'],
      description: 'Financial modeling and market analysis tools'
    },
    {
      name: 'financial-datasets',
      command: 'npx',
      args: ['financial-datasets/mcp-server'],
      capabilities: ['market-data', 'financial-datasets', 'benchmarking'],
      description: 'Access to financial datasets for market benchmarking'
    },
    {
      name: 'market-sizing',
      command: 'npx',
      args: ['gvaibhav-tam-mcp-server'],
      capabilities: ['market-sizing', 'business-intelligence', 'tam-analysis'],
      description: 'Market sizing and total addressable market analysis'
    }
  ];

  async initialize(): Promise<void> {
    logger.info('🔧 Initializing MCP servers...');
    
    // Create data directory
    await this.createDataDirectory();
    
    // Start all MCP servers
    for (const config of this.serverConfigs) {
      try {
        await this.startServer(config);
        await this.waitForServerReady(config.name);
        logger.info(`✅ ${config.name} server started successfully`);
      } catch (error) {
        logger.error(`❌ Failed to start ${config.name}:`, error);
        // Continue with other servers instead of failing completely
      }
    }
    
    logger.info(`🎯 ${this.servers.size}/${this.serverConfigs.length} MCP servers initialized`);
  }

  private async createDataDirectory(): Promise<void> {
    const fs = await import('fs/promises');
    try {
      await fs.mkdir('./data', { recursive: true });
      await fs.mkdir('./logs', { recursive: true });
    } catch (error) {
      logger.warn('Directory creation warning:', error);
    }
  }

  private async startServer(config: MCPServerConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      logger.info(`🚀 Starting ${config.name}...`);
      
      const process = spawn(config.command, config.args, {
        env: { ...process.env, ...config.env },
        stdio: ['pipe', 'pipe', 'pipe']
      });

      process.stdout?.on('data', (data) => {
        logger.debug(`${config.name} stdout:`, data.toString());
      });

      process.stderr?.on('data', (data) => {
        logger.debug(`${config.name} stderr:`, data.toString());
      });

      process.on('error', (error) => {
        logger.error(`${config.name} process error:`, error);
        reject(error);
      });

      process.on('exit', (code, signal) => {
        logger.warn(`${config.name} exited with code ${code}, signal ${signal}`);
        this.servers.delete(config.name);
      });

      // Store the process
      this.servers.set(config.name, process);
      
      // Give the server a moment to start
      setTimeout(() => resolve(), 2000);
    });
  }

  private async waitForServerReady(serverName: string, timeout = 10000): Promise<void> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      if (await this.isServerHealthy(serverName)) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    throw new Error(`Server ${serverName} did not become ready within ${timeout}ms`);
  }

  async isServerHealthy(serverName: string): Promise<boolean> {
    const process = this.servers.get(serverName);
    return process ? !process.killed : false;
  }

  async getServerCapabilities(serverName: string): Promise<string[]> {
    const config = this.serverConfigs.find(c => c.name === serverName);
    return config?.capabilities || [];
  }

  async invokeServer(serverName: string, method: string, params: any): Promise<any> {
    if (!this.servers.has(serverName)) {
      throw new Error(`Server ${serverName} is not running`);
    }

    logger.debug(`📡 Invoking ${serverName}.${method}`, params);
    
    // Simulate MCP server communication
    // In a real implementation, this would use the MCP protocol
    return this.simulateServerResponse(serverName, method, params);
  }

  private async simulateServerResponse(serverName: string, method: string, params: any): Promise<any> {
    // Simulate responses for different servers and methods
    switch (serverName) {
      case 'playwright-scraper':
        return this.simulateScrapingResponse(method, params);
      case 'sqlite-database':
        return this.simulateDatabaseResponse(method, params);
      case 'echarts-visualization':
        return this.simulateVisualizationResponse(method, params);
      default:
        return { success: true, data: `Simulated response from ${serverName}` };
    }
  }

  private async simulateScrapingResponse(method: string, params: any): Promise<any> {
    switch (method) {
      case 'scrape_wongnai':
        return {
          restaurants: [
            {
              name: 'Thai Garden Restaurant',
              rating: 4.2,
              reviews: 245,
              priceRange: '80-250 THB',
              cuisine: 'Thai',
              location: 'Sukhumvit Rd'
            }
          ],
          totalFound: 1
        };
      case 'scrape_foodpanda':
        return {
          restaurants: [
            {
              name: 'Bangkok Bistro',
              deliveryFee: 25,
              deliveryTime: '30-45 min',
              rating: 4.5,
              priceRange: '100-300 THB'
            }
          ],
          deliveryCoverage: 'High'
        };
      default:
        return { success: true, message: `Scraping method ${method} executed` };
    }
  }

  private async simulateDatabaseResponse(method: string, params: any): Promise<any> {
    switch (method) {
      case 'store_data':
        return { success: true, recordsStored: params.data?.length || 1 };
      case 'query_data':
        return { 
          results: [
            { id: 1, name: 'Sample Restaurant', category: 'Thai', rating: 4.2 }
          ],
          count: 1 
        };
      default:
        return { success: true, message: `Database method ${method} executed` };
    }
  }

  private async simulateVisualizationResponse(method: string, params: any): Promise<any> {
    switch (method) {
      case 'create_chart':
        return {
          chartId: 'chart-' + Date.now(),
          chartType: params.type || 'bar',
          chartUrl: `/charts/chart-${Date.now()}.png`,
          success: true
        };
      default:
        return { success: true, message: `Visualization method ${method} executed` };
    }
  }

  async shutdown(): Promise<void> {
    logger.info('🛑 Shutting down MCP servers...');
    
    for (const [name, process] of this.servers) {
      try {
        process.kill('SIGTERM');
        logger.info(`✅ ${name} server stopped`);
      } catch (error) {
        logger.error(`❌ Error stopping ${name}:`, error);
      }
    }
    
    this.servers.clear();
  }

  getRunningServers(): string[] {
    return Array.from(this.servers.keys());
  }

  getServerStatus(): Record<string, boolean> {
    const status: Record<string, boolean> = {};
    for (const config of this.serverConfigs) {
      status[config.name] = this.servers.has(config.name);
    }
    return status;
  }
}