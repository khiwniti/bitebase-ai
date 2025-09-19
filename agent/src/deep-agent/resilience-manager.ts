/**
 * Production Resilience Manager for Deep Agent Operations
 *
 * Comprehensive error handling, circuit breaker patterns, retry logic, and
 * graceful degradation strategies for production-ready deep agent systems.
 */

import { EventEmitter } from 'events';

export interface ResilienceConfig {
  // Retry Configuration
  defaultRetryAttempts: number;
  retryDelayMs: number;
  maxRetryDelayMs: number;
  retryBackoffMultiplier: number;

  // Circuit Breaker Configuration
  circuitBreakerThreshold: number;
  circuitBreakerTimeout: number;
  circuitBreakerResetTimeout: number;

  // Timeout Configuration
  defaultTimeoutMs: number;
  mcpServerTimeoutMs: number;
  taskExecutionTimeoutMs: number;

  // Health Check Configuration
  healthCheckIntervalMs: number;
  healthCheckTimeoutMs: number;

  // Error Classification
  retryableErrorTypes: string[];
  fatalErrorTypes: string[];

  // Graceful Degradation
  enableFallbackModes: boolean;
  fallbackQualityThreshold: number;
}

export const defaultResilienceConfig: ResilienceConfig = {
  // Retry Configuration
  defaultRetryAttempts: 3,
  retryDelayMs: 1000,
  maxRetryDelayMs: 30000,
  retryBackoffMultiplier: 2,

  // Circuit Breaker Configuration
  circuitBreakerThreshold: 5, // failures before opening circuit
  circuitBreakerTimeout: 60000, // 1 minute
  circuitBreakerResetTimeout: 300000, // 5 minutes

  // Timeout Configuration
  defaultTimeoutMs: 30000, // 30 seconds
  mcpServerTimeoutMs: 45000, // 45 seconds
  taskExecutionTimeoutMs: 300000, // 5 minutes

  // Health Check Configuration
  healthCheckIntervalMs: 30000, // 30 seconds
  healthCheckTimeoutMs: 5000, // 5 seconds

  // Error Classification
  retryableErrorTypes: [
    'NETWORK_ERROR',
    'TIMEOUT_ERROR',
    'RATE_LIMIT_ERROR',
    'TEMPORARY_SERVER_ERROR',
    'CONNECTION_RESET',
    'ECONNRESET',
    'ENOTFOUND',
    'ETIMEDOUT'
  ],
  fatalErrorTypes: [
    'AUTHENTICATION_ERROR',
    'AUTHORIZATION_ERROR',
    'INVALID_CONFIG_ERROR',
    'SYNTAX_ERROR',
    'OUT_OF_MEMORY'
  ],

  // Graceful Degradation
  enableFallbackModes: true,
  fallbackQualityThreshold: 0.6
};

export interface CircuitBreakerState {
  state: 'closed' | 'open' | 'half-open';
  failureCount: number;
  lastFailureTime: number;
  nextAttemptTime: number;
}

export interface RetryContext {
  attempt: number;
  maxAttempts: number;
  lastError: Error | null;
  totalElapsed: number;
  operation: string;
}

export interface HealthCheckResult {
  component: string;
  healthy: boolean;
  responseTime: number;
  error?: string;
  lastCheck: number;
}

export interface ErrorClassification {
  type: 'retryable' | 'fatal' | 'degraded';
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  shouldRetry: boolean;
  fallbackAvailable: boolean;
}

/**
 * Production-grade resilience manager for deep agent operations
 */
export class ResilienceManager extends EventEmitter {
  private config: ResilienceConfig;
  private circuitBreakers: Map<string, CircuitBreakerState> = new Map();
  private healthChecks: Map<string, HealthCheckResult> = new Map();
  private operationCounters: Map<string, { success: number; failure: number }> = new Map();
  private activeRetries: Map<string, RetryContext> = new Map();
  private healthCheckInterval?: NodeJS.Timeout;

  constructor(config: Partial<ResilienceConfig> = {}) {
    super();
    this.config = { ...defaultResilienceConfig, ...config };
    this.startHealthChecking();
  }

  /**
   * Execute operation with comprehensive resilience patterns
   */
  async executeWithResilience<T>(
    operationId: string,
    operation: () => Promise<T>,
    options: {
      retryAttempts?: number;
      timeoutMs?: number;
      enableCircuitBreaker?: boolean;
      fallbackOperation?: () => Promise<T>;
      errorContext?: Record<string, any>;
    } = {}
  ): Promise<T> {
    const {
      retryAttempts = this.config.defaultRetryAttempts,
      timeoutMs = this.config.defaultTimeoutMs,
      enableCircuitBreaker = true,
      fallbackOperation,
      errorContext = {}
    } = options;

    // Check circuit breaker state
    if (enableCircuitBreaker && this.isCircuitOpen(operationId)) {
      const circuitState = this.circuitBreakers.get(operationId);
      throw new Error(
        `Circuit breaker is open for operation: ${operationId}. ` +
        `Next attempt allowed at: ${new Date(circuitState!.nextAttemptTime).toISOString()}`
      );
    }

    let lastError: Error | null = null;
    const startTime = Date.now();

    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        // Update retry context
        this.activeRetries.set(operationId, {
          attempt,
          maxAttempts: retryAttempts,
          lastError,
          totalElapsed: Date.now() - startTime,
          operation: operationId
        });

        // Execute with timeout
        const result = await this.executeWithTimeout(operation, timeoutMs);

        // Success - reset circuit breaker and clean up
        if (enableCircuitBreaker) {
          this.recordSuccess(operationId);
        }
        this.activeRetries.delete(operationId);

        this.emit('operation:success', {
          operationId,
          attempt,
          elapsed: Date.now() - startTime,
          ...errorContext
        });

        return result;

      } catch (error) {
        lastError = error as Error;
        const classification = this.classifyError(lastError);

        // Record failure for circuit breaker
        if (enableCircuitBreaker) {
          this.recordFailure(operationId);
        }

        this.emit('operation:error', {
          operationId,
          attempt,
          error: lastError,
          classification,
          ...errorContext
        });

        // Check if we should retry
        if (attempt === retryAttempts || !classification.shouldRetry) {
          break;
        }

        // Wait before retry with exponential backoff
        const delay = this.calculateRetryDelay(attempt);
        await this.sleep(delay);

        console.warn(`🔄 Retrying operation ${operationId} (attempt ${attempt + 1}/${retryAttempts}) after ${delay}ms delay`);
      }
    }

    // All retries exhausted - try fallback if available
    if (fallbackOperation && this.config.enableFallbackModes) {
      try {
        console.warn(`🔄 Attempting fallback for operation: ${operationId}`);
        const fallbackResult = await fallbackOperation();

        this.emit('operation:fallback', {
          operationId,
          error: lastError,
          ...errorContext
        });

        return fallbackResult;
      } catch (fallbackError) {
        console.error(`❌ Fallback also failed for operation ${operationId}:`, fallbackError);
        lastError = fallbackError as Error;
      }
    }

    // Clean up and throw final error
    this.activeRetries.delete(operationId);

    const finalError = new Error(
      `Operation ${operationId} failed after ${retryAttempts} attempts. Last error: ${lastError?.message}`
    );
    (finalError as any).originalError = lastError;
    (finalError as any).operationId = operationId;
    (finalError as any).attempts = retryAttempts;
    (finalError as any).context = errorContext;

    throw finalError;
  }

  /**
   * Execute MCP server operation with specialized resilience
   */
  async executeMCPOperation<T>(
    serverName: string,
    operation: () => Promise<T>,
    options: {
      toolName?: string;
      fallbackData?: T;
      criticalOperation?: boolean;
    } = {}
  ): Promise<T> {
    const { toolName, fallbackData, criticalOperation = false } = options;
    const operationId = `mcp:${serverName}:${toolName || 'unknown'}`;

    const fallbackOperation = fallbackData
      ? async () => {
          console.warn(`📋 Using fallback data for ${operationId}`);
          return fallbackData;
        }
      : undefined;

    return this.executeWithResilience(operationId, operation, {
      timeoutMs: this.config.mcpServerTimeoutMs,
      retryAttempts: criticalOperation ? this.config.defaultRetryAttempts + 2 : this.config.defaultRetryAttempts,
      fallbackOperation,
      errorContext: {
        serverName,
        toolName,
        criticalOperation
      }
    });
  }

  /**
   * Execute task with specialized timeout and error handling
   */
  async executeTask<T>(
    taskId: string,
    taskOperation: () => Promise<T>,
    options: {
      agentType?: string;
      fallbackStrategy?: 'skip' | 'retry' | 'degrade';
      priority?: 'low' | 'medium' | 'high' | 'critical';
    } = {}
  ): Promise<T> {
    const { agentType, fallbackStrategy = 'retry', priority = 'medium' } = options;
    const operationId = `task:${taskId}:${agentType || 'unknown'}`;

    // Adjust timeout based on priority
    const timeoutMultiplier = {
      low: 0.5,
      medium: 1,
      high: 1.5,
      critical: 2
    }[priority];

    const taskTimeout = this.config.taskExecutionTimeoutMs * timeoutMultiplier;

    const fallbackOperation = fallbackStrategy === 'degrade'
      ? async () => {
          console.warn(`🔄 Task ${taskId} degraded to minimal execution`);
          // Return a degraded result structure
          return {
            taskId,
            status: 'degraded',
            result: null,
            message: 'Task completed with degraded functionality'
          } as T;
        }
      : undefined;

    return this.executeWithResilience(operationId, taskOperation, {
      timeoutMs: taskTimeout,
      retryAttempts: priority === 'critical' ? this.config.defaultRetryAttempts + 1 : this.config.defaultRetryAttempts,
      fallbackOperation,
      errorContext: {
        taskId,
        agentType,
        priority,
        fallbackStrategy
      }
    });
  }

  /**
   * Health check for system components
   */
  async performHealthCheck(
    componentName: string,
    healthCheckFn: () => Promise<void>
  ): Promise<HealthCheckResult> {
    const startTime = Date.now();

    try {
      await this.executeWithTimeout(healthCheckFn, this.config.healthCheckTimeoutMs);

      const result: HealthCheckResult = {
        component: componentName,
        healthy: true,
        responseTime: Date.now() - startTime,
        lastCheck: Date.now()
      };

      this.healthChecks.set(componentName, result);
      return result;

    } catch (error) {
      const result: HealthCheckResult = {
        component: componentName,
        healthy: false,
        responseTime: Date.now() - startTime,
        error: (error as Error).message,
        lastCheck: Date.now()
      };

      this.healthChecks.set(componentName, result);

      this.emit('health:degraded', result);
      return result;
    }
  }

  /**
   * Get current system health status
   */
  getSystemHealth(): {
    overallHealthy: boolean;
    components: HealthCheckResult[];
    circuitBreakers: { [key: string]: CircuitBreakerState };
    activeRetries: { [key: string]: RetryContext };
  } {
    const components = Array.from(this.healthChecks.values());
    const overallHealthy = components.length > 0 && components.every(c => c.healthy);

    return {
      overallHealthy,
      components,
      circuitBreakers: Object.fromEntries(this.circuitBreakers),
      activeRetries: Object.fromEntries(this.activeRetries)
    };
  }

  /**
   * Get resilience metrics for monitoring
   */
  getResilienceMetrics(): {
    operationCounts: { [key: string]: { success: number; failure: number; successRate: number } };
    circuitBreakerStatus: { [key: string]: string };
    activeRetries: number;
    healthyComponents: number;
    totalComponents: number;
  } {
    const operationCounts: { [key: string]: { success: number; failure: number; successRate: number } } = {};

    for (const [operation, counts] of this.operationCounters.entries()) {
      const total = counts.success + counts.failure;
      operationCounts[operation] = {
        ...counts,
        successRate: total > 0 ? counts.success / total : 0
      };
    }

    const circuitBreakerStatus: { [key: string]: string } = {};
    for (const [operation, state] of this.circuitBreakers.entries()) {
      circuitBreakerStatus[operation] = state.state;
    }

    const healthyComponents = Array.from(this.healthChecks.values()).filter(h => h.healthy).length;

    return {
      operationCounts,
      circuitBreakerStatus,
      activeRetries: this.activeRetries.size,
      healthyComponents,
      totalComponents: this.healthChecks.size
    };
  }

  /**
   * Shutdown resilience manager
   */
  shutdown(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = undefined;
    }

    this.circuitBreakers.clear();
    this.healthChecks.clear();
    this.operationCounters.clear();
    this.activeRetries.clear();

    console.log("🔄 Resilience Manager shut down successfully");
  }

  // Private helper methods

  private async executeWithTimeout<T>(
    operation: () => Promise<T>,
    timeoutMs: number
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Operation timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      operation()
        .then(result => {
          clearTimeout(timeoutId);
          resolve(result);
        })
        .catch(error => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  }

  private classifyError(error: Error): ErrorClassification {
    const errorMessage = error.message.toLowerCase();
    const errorName = error.name || '';

    // Check for fatal errors
    for (const fatalType of this.config.fatalErrorTypes) {
      if (errorMessage.includes(fatalType.toLowerCase()) || errorName.includes(fatalType)) {
        return {
          type: 'fatal',
          category: fatalType,
          severity: 'critical',
          shouldRetry: false,
          fallbackAvailable: false
        };
      }
    }

    // Check for retryable errors
    for (const retryableType of this.config.retryableErrorTypes) {
      if (errorMessage.includes(retryableType.toLowerCase()) || errorName.includes(retryableType)) {
        return {
          type: 'retryable',
          category: retryableType,
          severity: 'medium',
          shouldRetry: true,
          fallbackAvailable: this.config.enableFallbackModes
        };
      }
    }

    // Default classification for unknown errors
    return {
      type: 'degraded',
      category: 'UNKNOWN_ERROR',
      severity: 'medium',
      shouldRetry: true,
      fallbackAvailable: this.config.enableFallbackModes
    };
  }

  private calculateRetryDelay(attempt: number): number {
    const baseDelay = this.config.retryDelayMs;
    const backoffDelay = baseDelay * Math.pow(this.config.retryBackoffMultiplier, attempt - 1);
    const jitteredDelay = backoffDelay * (0.5 + Math.random() * 0.5); // Add jitter

    return Math.min(jitteredDelay, this.config.maxRetryDelayMs);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private isCircuitOpen(operationId: string): boolean {
    const circuitState = this.circuitBreakers.get(operationId);
    if (!circuitState) return false;

    const now = Date.now();

    switch (circuitState.state) {
      case 'open':
        if (now >= circuitState.nextAttemptTime) {
          // Transition to half-open
          circuitState.state = 'half-open';
          return false;
        }
        return true;
      case 'half-open':
        return false;
      case 'closed':
      default:
        return false;
    }
  }

  private recordSuccess(operationId: string): void {
    // Reset circuit breaker on success
    const circuitState = this.circuitBreakers.get(operationId);
    if (circuitState) {
      circuitState.state = 'closed';
      circuitState.failureCount = 0;
    }

    // Update operation counters
    const counters = this.operationCounters.get(operationId) || { success: 0, failure: 0 };
    counters.success++;
    this.operationCounters.set(operationId, counters);
  }

  private recordFailure(operationId: string): void {
    // Update circuit breaker state
    let circuitState = this.circuitBreakers.get(operationId);
    if (!circuitState) {
      circuitState = {
        state: 'closed',
        failureCount: 0,
        lastFailureTime: 0,
        nextAttemptTime: 0
      };
      this.circuitBreakers.set(operationId, circuitState);
    }

    circuitState.failureCount++;
    circuitState.lastFailureTime = Date.now();

    // Open circuit if threshold exceeded
    if (circuitState.failureCount >= this.config.circuitBreakerThreshold) {
      circuitState.state = 'open';
      circuitState.nextAttemptTime = Date.now() + this.config.circuitBreakerTimeout;

      this.emit('circuit:opened', {
        operationId,
        failureCount: circuitState.failureCount,
        nextAttemptTime: circuitState.nextAttemptTime
      });
    }

    // Update operation counters
    const counters = this.operationCounters.get(operationId) || { success: 0, failure: 0 };
    counters.failure++;
    this.operationCounters.set(operationId, counters);
  }

  private startHealthChecking(): void {
    if (this.config.healthCheckIntervalMs > 0) {
      this.healthCheckInterval = setInterval(() => {
        this.emit('health:check', { timestamp: Date.now() });
      }, this.config.healthCheckIntervalMs);
    }
  }
}

export default ResilienceManager;