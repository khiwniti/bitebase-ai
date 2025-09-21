/**
 * MCP Server Manager
 * Handles connection, communication, and lifecycle management of MCP servers
 */

import { spawn, ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
import { MCPServerConfig, getEnabledServers, getServerConfig } from '../config/mcp-servers.js';

export interface MCPMessage {
  id: string;
  method: string;
  params?: any;
  result?: any;
  error?: any;
}

export interface MCPServerStatus {
  name: string;
  status: 'starting' | 'running' | 'error' | 'stopped';
  pid?: number;
  lastError?: string;
  capabilities: string[];
}

export class MCPServerManager extends EventEmitter {
  private servers: Map<string, ChildProcess> = new Map();
  private serverStatus: Map<string, MCPServerStatus> = new Map();
  private messageQueue: Map<string, MCPMessage[]> = new Map();
  private reconnectAttempts: Map<string, number> = new Map();
  private maxReconnectAttempts = 3;
  private reconnectDelay = 5000; // 5 seconds

  constructor() {
    super();
    this.setupCleanupHandlers();
  }

  /**
   * Initialize all enabled MCP servers
   */
  async initializeServers(): Promise<void> {
    console.log('🚀 Initializing MCP servers...');
    const enabledServers = getEnabledServers();
    
    for (const serverConfig of enabledServers) {
      await this.startServer(serverConfig);
    }

    // Wait for all servers to be ready
    await this.waitForServersReady();
    console.log('✅ All MCP servers initialized successfully');
  }

  /**
   * Start a specific MCP server
   */
  async startServer(config: MCPServerConfig): Promise<void> {
    const { name, command, args, env } = config;
    
    console.log(`🔄 Starting ${name}...`);
    
    try {
      // Set initial status
      this.serverStatus.set(name, {
        name: config.name,
        status: 'starting',
        capabilities: config.capabilities
      });

      // Spawn the MCP server process
      const serverProcess = spawn(command, args, {
        env: { ...process.env, ...env },
        stdio: ['pipe', 'pipe', 'pipe']
      });

      this.servers.set(name, serverProcess);
      this.messageQueue.set(name, []);

      // Handle process events
      serverProcess.on('spawn', () => {
        this.updateServerStatus(name, {
          status: 'running',
          pid: serverProcess.pid
        });
        console.log(`✅ ${name} started successfully (PID: ${serverProcess.pid})`);
        this.emit('serverStarted', name);
      });

      serverProcess.on('error', (error) => {
        console.error(`❌ ${name} failed to start:`, error.message);
        this.updateServerStatus(name, {
          status: 'error',
          lastError: error.message
        });
        this.handleServerError(name, error);
      });

      serverProcess.on('exit', (code, signal) => {
        console.warn(`⚠️ ${name} exited with code ${code}, signal ${signal}`);
        this.updateServerStatus(name, {
          status: 'stopped'
        });
        this.handleServerExit(name, code, signal);
      });

      // Handle server output
      serverProcess.stdout?.on('data', (data) => {
        this.handleServerMessage(name, data.toString());
      });

      serverProcess.stderr?.on('data', (data) => {
        console.warn(`${name} stderr:`, data.toString());
      });

    } catch (error) {
      console.error(`❌ Failed to start ${name}:`, error);
      this.updateServerStatus(name, {
        status: 'error',
        lastError: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Stop a specific MCP server
   */
  async stopServer(serverName: string): Promise<void> {
    const server = this.servers.get(serverName);
    if (!server) {
      console.warn(`⚠️ Server ${serverName} not found`);
      return;
    }

    console.log(`🛑 Stopping ${serverName}...`);
    
    // Graceful shutdown
    server.kill('SIGTERM');
    
    // Force kill after timeout
    setTimeout(() => {
      if (!server.killed) {
        console.warn(`🔪 Force killing ${serverName}...`);
        server.kill('SIGKILL');
      }
    }, 5000);

    this.servers.delete(serverName);
    this.serverStatus.delete(serverName);
    this.messageQueue.delete(serverName);
    this.reconnectAttempts.delete(serverName);
  }

  /**
   * Stop all MCP servers
   */
  async stopAllServers(): Promise<void> {
    console.log('🛑 Stopping all MCP servers...');
    const serverNames = Array.from(this.servers.keys());
    
    await Promise.all(
      serverNames.map(serverName => this.stopServer(serverName))
    );
    
    console.log('✅ All MCP servers stopped');
  }

  /**
   * Send a message to a specific MCP server
   */
  async sendMessage(serverName: string, message: MCPMessage): Promise<any> {
    const server = this.servers.get(serverName);
    const status = this.serverStatus.get(serverName);

    if (!server || status?.status !== 'running') {
      throw new Error(`Server ${serverName} is not running`);
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Timeout waiting for response from ${serverName}`));
      }, 30000); // 30 second timeout

      // Send message to server
      const messageStr = JSON.stringify(message) + '\n';
      server.stdin?.write(messageStr);

      // Wait for response (simplified - in real implementation would match message IDs)
      const handleResponse = (response: any) => {
        clearTimeout(timeout);
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response.result);
        }
      };

      // Store response handler (simplified)
      this.once(`response:${serverName}:${message.id}`, handleResponse);
    });
  }

  /**
   * Get status of all servers
   */
  getServerStatuses(): MCPServerStatus[] {
    return Array.from(this.serverStatus.values());
  }

  /**
   * Get status of a specific server
   */
  getServerStatus(serverName: string): MCPServerStatus | undefined {
    return this.serverStatus.get(serverName);
  }

  /**
   * Check if a server is running
   */
  isServerRunning(serverName: string): boolean {
    const status = this.serverStatus.get(serverName);
    return status?.status === 'running';
  }

  /**
   * Restart a server
   */
  async restartServer(serverName: string): Promise<void> {
    console.log(`🔄 Restarting ${serverName}...`);
    
    await this.stopServer(serverName);
    
    const config = getServerConfig(serverName);
    if (config) {
      await this.startServer(config);
    } else {
      throw new Error(`Configuration for server ${serverName} not found`);
    }
  }

  /**
   * Handle server error with retry logic
   */
  private async handleServerError(serverName: string, error: Error): Promise<void> {
    const attempts = this.reconnectAttempts.get(serverName) || 0;
    
    if (attempts < this.maxReconnectAttempts) {
      this.reconnectAttempts.set(serverName, attempts + 1);
      console.log(`🔄 Attempting to restart ${serverName} (attempt ${attempts + 1}/${this.maxReconnectAttempts})`);
      
      setTimeout(async () => {
        try {
          await this.restartServer(serverName);
          this.reconnectAttempts.set(serverName, 0); // Reset on success
        } catch (restartError) {
          console.error(`❌ Failed to restart ${serverName}:`, restartError);
        }
      }, this.reconnectDelay * (attempts + 1)); // Exponential backoff
    } else {
      console.error(`❌ ${serverName} failed permanently after ${this.maxReconnectAttempts} attempts`);
      this.emit('serverFailed', serverName, error);
    }
  }

  /**
   * Handle server exit
   */
  private async handleServerExit(serverName: string, code: number | null, signal: string | null): Promise<void> {
    // Only auto-restart if it was an unexpected exit
    if (code !== 0 && signal !== 'SIGTERM') {
      const config = getServerConfig(serverName);
      if (config?.enabled) {
        console.log(`🔄 Unexpected exit of ${serverName}, attempting restart...`);
        await this.handleServerError(serverName, new Error(`Process exited with code ${code}`));
      }
    }
  }

  /**
   * Handle messages from servers
   */
  private handleServerMessage(serverName: string, data: string): void {
    try {
      const lines = data.trim().split('\n');
      for (const line of lines) {
        if (line.trim()) {
          const message = JSON.parse(line);
          this.emit(`response:${serverName}:${message.id}`, message);
          this.emit('serverMessage', serverName, message);
        }
      }
    } catch (error) {
      console.warn(`Failed to parse message from ${serverName}:`, data);
    }
  }

  /**
   * Update server status
   */
  private updateServerStatus(serverName: string, updates: Partial<MCPServerStatus>): void {
    const currentStatus = this.serverStatus.get(serverName);
    if (currentStatus) {
      this.serverStatus.set(serverName, {
        ...currentStatus,
        ...updates
      });
      this.emit('statusUpdate', serverName, this.serverStatus.get(serverName));
    }
  }

  /**
   * Wait for all servers to be ready
   */
  private async waitForServersReady(timeout = 30000): Promise<void> {
    const startTime = Date.now();
    
    return new Promise((resolve, reject) => {
      const checkReady = () => {
        const allStatuses = Array.from(this.serverStatus.values());
        const runningServers = allStatuses.filter(s => s.status === 'running');
        const enabledServersCount = getEnabledServers().length;
        
        if (runningServers.length === enabledServersCount) {
          resolve();
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('Timeout waiting for servers to start'));
        } else {
          setTimeout(checkReady, 1000);
        }
      };
      
      checkReady();
    });
  }

  /**
   * Setup cleanup handlers
   */
  private setupCleanupHandlers(): void {
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down MCP servers...');
      this.stopAllServers().then(() => {
        process.exit(0);
      });
    });

    process.on('SIGTERM', () => {
      console.log('\n🛑 Shutting down MCP servers...');
      this.stopAllServers().then(() => {
        process.exit(0);
      });
    });
  }
}