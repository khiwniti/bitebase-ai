/**
 * Enhanced MCP Integration Manager for BiteBase Intelligence
 * Manages connections to multiple MCP servers with health monitoring and fallbacks
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { CallToolRequest, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { spawn, ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
import { MCP_SERVERS, MCPServerConfig, getRequiredServers } from './mcp-server-config.js';

export interface MCPConnection {
  client: Client;
  transport: SSEClientTransport | StdioClientTransport;
  process?: ChildProcess;
  config: MCPServerConfig;
  status: 'connected' | 'disconnected' | 'error' | 'connecting';
  lastHealthCheck: Date;
  errorCount: number;
}

export interface MCPToolCall {
  serverId: string;
  toolName: string;
  arguments: Record<string, unknown>;
  timeout?: number;
}

export interface MCPToolResult {
  serverId: string;
  toolName: string;
  result: CallToolResult;
  executionTime: number;
  success: boolean;
  error?: string;
}

/**
 * Enhanced MCP Manager with health monitoring and intelligent routing
 */
export class EnhancedMCPManager extends EventEmitter {
  private connections: Map<string, MCPConnection> = new Map();
  private healthCheckInterval?: NodeJS.Timeout;
  private reconnectAttempts: Map<string, number> = new Map();
  private readonly maxReconnectAttempts = 5;
  private readonly reconnectDelay = 2000;

  constructor() {
    super();
    this.startHealthMonitoring();
  }

  /**
   * Initialize connections to required MCP servers
   */
  async initializeServers(requiredCapabilities: string[] = []): Promise<void> {
    const serversToInit = requiredCapabilities.length > 0 
      ? this.getServersByCapabilities(requiredCapabilities)
      : Object.keys(MCP_SERVERS);

    const initPromises = serversToInit.map(serverId => this.connectServer(serverId));
    await Promise.allSettled(initPromises);

    this.emit('initialization_complete', {
      connectedServers: Array.from(this.connections.keys()).filter(
        id => this.connections.get(id)?.status === 'connected'
      ),
      totalServers: serversToInit.length,
    });
  }

  /**
   * Connect to a specific MCP server
   */
  async connectServer(serverId: string): Promise<boolean> {
    const config = MCP_SERVERS[serverId];
    if (!config) {
      throw new Error(`Server configuration not found: ${serverId}`);
    }

    try {
      this.emit('server_connecting', { serverId, config });
      
      const connection = await this.createConnection(serverId, config);
      this.connections.set(serverId, connection);
      
      this.emit('server_connected', { serverId, config });
      return true;
    } catch (error) {
      this.emit('server_connection_failed', { serverId, error: error.message });
      this.scheduleReconnect(serverId);
      return false;
    }
  }

  /**
   * Create connection to MCP server
   */
  private async createConnection(serverId: string, config: MCPServerConfig): Promise<MCPConnection> {
    const transport = new StdioClientTransport({
      command: config.command,
      args: config.args || [],
      env: { ...process.env, ...config.env },
      cwd: config.cwd,
    });

    const client = new Client({
      name: `bitebase-${serverId}`,
      version: '1.0.0',
    }, {
      capabilities: {
        roots: {
          listChanged: true,
        },
        sampling: {},
      },
    });

    await client.connect(transport);

    return {
      client,
      transport,
      config,
      status: 'connected',
      lastHealthCheck: new Date(),
      errorCount: 0,
    };
  }

  /**
   * Execute tool call with intelligent routing and fallbacks
   */
  async executeTool(toolCall: MCPToolCall): Promise<MCPToolResult> {
    const startTime = Date.now();
    const connection = this.connections.get(toolCall.serverId);

    if (!connection || connection.status !== 'connected') {
      const fallbackServers = this.findFallbackServers(toolCall.serverId, toolCall.toolName);
      if (fallbackServers.length > 0) {
        return this.executeTool({
          ...toolCall,
          serverId: fallbackServers[0],
        });
      }
      
      throw new Error(`Server ${toolCall.serverId} is not available and no fallbacks found`);
    }

    try {
      const result = await this.executeWithTimeout(
        connection.client.callTool({
          name: toolCall.toolName,
          arguments: toolCall.arguments,
        } as CallToolRequest),
        toolCall.timeout || 30000
      );

      const executionTime = Date.now() - startTime;
      
      this.emit('tool_executed', {
        serverId: toolCall.serverId,
        toolName: toolCall.toolName,
        executionTime,
        success: true,
      });

      return {
        serverId: toolCall.serverId,
        toolName: toolCall.toolName,
        result,
        executionTime,
        success: true,
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      connection.errorCount++;
      
      this.emit('tool_execution_failed', {
        serverId: toolCall.serverId,
        toolName: toolCall.toolName,
        error: error.message,
        executionTime,
      });

      // Try fallback servers
      const fallbackServers = this.findFallbackServers(toolCall.serverId, toolCall.toolName);
      if (fallbackServers.length > 0) {
        return this.executeTool({
          ...toolCall,
          serverId: fallbackServers[0],
        });
      }

      return {
        serverId: toolCall.serverId,
        toolName: toolCall.toolName,
        result: { content: [], isError: true },
        executionTime,
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Find fallback servers for a given tool
   */
  private findFallbackServers(originalServerId: string, toolName: string): string[] {
    const originalConfig = MCP_SERVERS[originalServerId];
    if (!originalConfig) return [];

    const fallbacks: string[] = [];
    
    for (const [serverId, config] of Object.entries(MCP_SERVERS)) {
      if (serverId === originalServerId) continue;
      
      const connection = this.connections.get(serverId);
      if (!connection || connection.status !== 'connected') continue;
      
      // Check if server has similar capabilities
      const hasOverlapCapabilities = config.capabilities.some(cap => 
        originalConfig.capabilities.includes(cap)
      );
      
      if (hasOverlapCapabilities) {
        fallbacks.push(serverId);
      }
    }
    
    return fallbacks.sort((a, b) => {
      const aConnection = this.connections.get(a)!;
      const bConnection = this.connections.get(b)!;
      return aConnection.errorCount - bConnection.errorCount;
    });
  }

  /**
   * Health monitoring for all connections
   */
  private startHealthMonitoring(): void {
    this.healthCheckInterval = setInterval(async () => {
      for (const [serverId, connection] of this.connections.entries()) {
        if (connection.config.healthCheck?.enabled) {
          await this.performHealthCheck(serverId);
        }
      }
    }, 15000); // Check every 15 seconds
  }

  /**
   * Perform health check on specific server
   */
  private async performHealthCheck(serverId: string): Promise<void> {
    const connection = this.connections.get(serverId);
    if (!connection) return;

    try {
      // Simple ping to check if server is responsive
      await this.executeWithTimeout(
        connection.client.ping(),
        connection.config.healthCheck?.timeout || 5000
      );
      
      connection.lastHealthCheck = new Date();
      connection.errorCount = Math.max(0, connection.errorCount - 1);
      
      if (connection.status !== 'connected') {
        connection.status = 'connected';
        this.emit('server_health_recovered', { serverId });
      }
    } catch (error) {
      connection.errorCount++;
      
      if (connection.errorCount > 3) {
        connection.status = 'error';
        this.emit('server_health_failed', { serverId, error: error.message });
        this.scheduleReconnect(serverId);
      }
    }
  }

  /**
   * Get servers by capabilities
   */
  private getServersByCapabilities(capabilities: string[]): string[] {
    const servers: string[] = [];
    
    for (const [serverId, config] of Object.entries(MCP_SERVERS)) {
      if (capabilities.some(cap => config.capabilities.includes(cap))) {
        servers.push(serverId);
      }
    }
    
    return servers;
  }

  /**
   * Schedule reconnection for failed server
   */
  private scheduleReconnect(serverId: string): void {
    const attempts = this.reconnectAttempts.get(serverId) || 0;
    
    if (attempts >= this.maxReconnectAttempts) {
      this.emit('server_reconnect_failed', { serverId, attempts });
      return;
    }

    setTimeout(async () => {
      this.reconnectAttempts.set(serverId, attempts + 1);
      const success = await this.connectServer(serverId);
      
      if (success) {
        this.reconnectAttempts.delete(serverId);
        this.emit('server_reconnected', { serverId, attempts: attempts + 1 });
      } else {
        this.scheduleReconnect(serverId);
      }
    }, this.reconnectDelay * Math.pow(2, attempts));
  }

  /**
   * Execute with timeout
   */
  private async executeWithTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => 
        setTimeout(() => reject(new Error('Operation timed out')), timeout)
      ),
    ]);
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): Record<string, { status: string; lastHealthCheck: Date; errorCount: number }> {
    const status: Record<string, any> = {};
    
    for (const [serverId, connection] of this.connections.entries()) {
      status[serverId] = {
        status: connection.status,
        lastHealthCheck: connection.lastHealthCheck,
        errorCount: connection.errorCount,
      };
    }
    
    return status;
  }

  /**
   * Graceful shutdown
   */
  async shutdown(): Promise<void> {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    const disconnectPromises = Array.from(this.connections.values()).map(async connection => {
      try {
        await connection.client.close();
        if (connection.process) {
          connection.process.kill('SIGTERM');
        }
      } catch (error) {
        console.warn('Error during connection shutdown:', error.message);
      }
    });

    await Promise.allSettled(disconnectPromises);
    this.connections.clear();
    this.emit('shutdown_complete');
  }
}

// Singleton instance for global access
export const mcpManager = new EnhancedMCPManager();