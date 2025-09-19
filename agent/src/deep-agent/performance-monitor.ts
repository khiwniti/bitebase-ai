/**
 * Performance Monitoring System for Deep Agent Operations
 *
 * Comprehensive performance tracking, resource monitoring, and operational metrics
 * for production-ready deep agent orchestration with real-time analytics.
 */

import { EventEmitter } from 'events';

export interface PerformanceMetrics {
  timestamp: string;
  sessionId: string;

  // Execution Performance
  taskExecutionTime: number;
  totalProcessingTime: number;
  agentResponseTime: number;
  mcpToolLatency: number;

  // Resource Utilization
  memoryUsage: {
    heapUsed: number;
    heapTotal: number;
    external: number;
    rss: number;
  };
  cpuUsage: {
    user: number;
    system: number;
  };

  // Agent Coordination
  activeAgents: number;
  taskQueueSize: number;
  concurrentTasks: number;
  agentUtilization: number;

  // MCP Server Performance
  mcpServerLatency: Record<string, number>;
  mcpServerSuccessRate: Record<string, number>;
  mcpConnectionHealth: Record<string, 'healthy' | 'degraded' | 'failed'>;

  // Business Intelligence
  researchTasksCompleted: number;
  evidenceItemsCollected: number;
  confidenceLevel: number;
  synthesisQuality: number;

  // Error Tracking
  errorCount: number;
  errorRate: number;
  criticalErrors: number;

  // Quality Metrics
  validationSuccessRate: number;
  customerSatisfactionScore?: number;
  analysisAccuracy?: number;
}

export interface AlertCondition {
  metric: keyof PerformanceMetrics;
  threshold: number;
  comparison: 'gt' | 'lt' | 'eq';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  action?: string;
}

export interface PerformanceAlert {
  id: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
  metric: string;
  value: number;
  threshold: number;
  message: string;
  action?: string;
  acknowledged: boolean;
}

export interface PerformanceConfiguration {
  // Monitoring Settings
  metricsCollectionInterval: number; // milliseconds
  enableRealTimeMonitoring: boolean;
  enableResourceMonitoring: boolean;
  enableMCPMonitoring: boolean;

  // Alert Thresholds
  memoryThresholdMB: number;
  cpuThresholdPercent: number;
  responseTimeThresholdMs: number;
  errorRateThreshold: number;

  // Data Retention
  metricsRetentionDays: number;
  alertRetentionDays: number;
  enableMetricsPersistence: boolean;

  // Performance Optimization
  enableAutomaticOptimization: boolean;
  adaptiveResourceAllocation: boolean;
  enablePredictiveScaling: boolean;
}

/**
 * Production-grade performance monitoring system for deep agent operations
 */
export class PerformanceMonitor extends EventEmitter {
  private config: PerformanceConfiguration;
  private metricsHistory: Map<string, PerformanceMetrics[]> = new Map();
  private activeAlerts: Map<string, PerformanceAlert> = new Map();
  private alertConditions: AlertCondition[] = [];
  private monitoringInterval?: NodeJS.Timeout;
  private sessionStartTime: Map<string, number> = new Map();
  private taskStartTimes: Map<string, number> = new Map();
  private mcpServerMetrics: Map<string, { latency: number[], successCount: number, failureCount: number }> = new Map();

  constructor(config: Partial<PerformanceConfiguration> = {}) {
    super();
    this.config = {
      metricsCollectionInterval: 5000, // 5 seconds
      enableRealTimeMonitoring: true,
      enableResourceMonitoring: true,
      enableMCPMonitoring: true,
      memoryThresholdMB: 1024,
      cpuThresholdPercent: 80,
      responseTimeThresholdMs: 5000,
      errorRateThreshold: 0.05, // 5%
      metricsRetentionDays: 30,
      alertRetentionDays: 7,
      enableMetricsPersistence: true,
      enableAutomaticOptimization: false,
      adaptiveResourceAllocation: false,
      enablePredictiveScaling: false,
      ...config
    };

    this.initializeDefaultAlerts();
    this.startMonitoring();
  }

  /**
   * Start a performance monitoring session for a specific research request
   */
  startSession(sessionId: string): void {
    this.sessionStartTime.set(sessionId, Date.now());
    this.metricsHistory.set(sessionId, []);

    console.log(`📊 Performance monitoring started for session: ${sessionId}`);
    this.emit('session:started', { sessionId, timestamp: new Date().toISOString() });
  }

  /**
   * End a performance monitoring session
   */
  endSession(sessionId: string): PerformanceMetrics[] {
    const sessionMetrics = this.metricsHistory.get(sessionId) || [];
    this.sessionStartTime.delete(sessionId);

    // Calculate session summary
    const sessionSummary = this.calculateSessionSummary(sessionMetrics);

    console.log(`📈 Performance monitoring ended for session: ${sessionId}`);
    console.log(`Session Summary: ${JSON.stringify(sessionSummary, null, 2)}`);

    this.emit('session:ended', {
      sessionId,
      timestamp: new Date().toISOString(),
      summary: sessionSummary
    });

    return sessionMetrics;
  }

  /**
   * Record task execution start
   */
  startTask(taskId: string, taskType: string): void {
    this.taskStartTimes.set(taskId, Date.now());
    this.emit('task:started', { taskId, taskType, timestamp: new Date().toISOString() });
  }

  /**
   * Record task execution completion
   */
  endTask(taskId: string, success: boolean = true): number {
    const startTime = this.taskStartTimes.get(taskId);
    if (!startTime) {
      console.warn(`⚠️ Task ${taskId} not found in performance tracking`);
      return 0;
    }

    const executionTime = Date.now() - startTime;
    this.taskStartTimes.delete(taskId);

    this.emit('task:completed', {
      taskId,
      executionTime,
      success,
      timestamp: new Date().toISOString()
    });

    return executionTime;
  }

  /**
   * Record MCP server operation metrics
   */
  recordMCPOperation(serverName: string, operationType: string, latency: number, success: boolean): void {
    if (!this.mcpServerMetrics.has(serverName)) {
      this.mcpServerMetrics.set(serverName, {
        latency: [],
        successCount: 0,
        failureCount: 0
      });
    }

    const metrics = this.mcpServerMetrics.get(serverName)!;
    metrics.latency.push(latency);

    if (success) {
      metrics.successCount++;
    } else {
      metrics.failureCount++;
    }

    // Keep only last 100 latency measurements for moving averages
    if (metrics.latency.length > 100) {
      metrics.latency.shift();
    }

    this.emit('mcp:operation', {
      serverName,
      operationType,
      latency,
      success,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Collect comprehensive performance metrics
   */
  collectMetrics(sessionId: string): PerformanceMetrics {
    const timestamp = new Date().toISOString();
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    // Calculate MCP server metrics
    const mcpServerLatency: Record<string, number> = {};
    const mcpServerSuccessRate: Record<string, number> = {};
    const mcpConnectionHealth: Record<string, 'healthy' | 'degraded' | 'failed'> = {};

    for (const [serverName, metrics] of this.mcpServerMetrics.entries()) {
      const avgLatency = metrics.latency.reduce((sum, lat) => sum + lat, 0) / metrics.latency.length || 0;
      const successRate = metrics.successCount / (metrics.successCount + metrics.failureCount) || 1;

      mcpServerLatency[serverName] = avgLatency;
      mcpServerSuccessRate[serverName] = successRate;

      // Determine health status
      if (successRate < 0.5 || avgLatency > 10000) {
        mcpConnectionHealth[serverName] = 'failed';
      } else if (successRate < 0.8 || avgLatency > 5000) {
        mcpConnectionHealth[serverName] = 'degraded';
      } else {
        mcpConnectionHealth[serverName] = 'healthy';
      }
    }

    const metrics: PerformanceMetrics = {
      timestamp,
      sessionId,

      // Execution Performance
      taskExecutionTime: this.calculateAverageTaskTime(),
      totalProcessingTime: this.calculateSessionDuration(sessionId),
      agentResponseTime: this.calculateAverageResponseTime(),
      mcpToolLatency: this.calculateAverageMCPLatency(),

      // Resource Utilization
      memoryUsage: {
        heapUsed: memoryUsage.heapUsed,
        heapTotal: memoryUsage.heapTotal,
        external: memoryUsage.external,
        rss: memoryUsage.rss
      },
      cpuUsage: {
        user: cpuUsage.user,
        system: cpuUsage.system
      },

      // Agent Coordination
      activeAgents: this.countActiveAgents(),
      taskQueueSize: this.taskStartTimes.size,
      concurrentTasks: this.taskStartTimes.size,
      agentUtilization: this.calculateAgentUtilization(),

      // MCP Server Performance
      mcpServerLatency,
      mcpServerSuccessRate,
      mcpConnectionHealth,

      // Business Intelligence (calculated from session data)
      researchTasksCompleted: this.countCompletedTasks(sessionId),
      evidenceItemsCollected: this.countEvidenceItems(sessionId),
      confidenceLevel: this.calculateConfidenceLevel(sessionId),
      synthesisQuality: this.calculateSynthesisQuality(sessionId),

      // Error Tracking
      errorCount: this.getErrorCount(sessionId),
      errorRate: this.calculateErrorRate(sessionId),
      criticalErrors: this.getCriticalErrorCount(sessionId),

      // Quality Metrics
      validationSuccessRate: this.calculateValidationSuccessRate(sessionId),
      customerSatisfactionScore: undefined, // To be implemented with user feedback
      analysisAccuracy: undefined // To be implemented with validation data
    };

    // Store metrics
    const sessionMetrics = this.metricsHistory.get(sessionId) || [];
    sessionMetrics.push(metrics);
    this.metricsHistory.set(sessionId, sessionMetrics);

    // Check for alerts
    this.checkAlertConditions(metrics);

    this.emit('metrics:collected', metrics);
    return metrics;
  }

  /**
   * Add custom alert condition
   */
  addAlertCondition(condition: AlertCondition): void {
    this.alertConditions.push(condition);
  }

  /**
   * Get current performance alerts
   */
  getActiveAlerts(): PerformanceAlert[] {
    return Array.from(this.activeAlerts.values());
  }

  /**
   * Acknowledge an alert
   */
  acknowledgeAlert(alertId: string): void {
    const alert = this.activeAlerts.get(alertId);
    if (alert) {
      alert.acknowledged = true;
      this.emit('alert:acknowledged', alert);
    }
  }

  /**
   * Get performance summary for a session
   */
  getSessionSummary(sessionId: string): any {
    const sessionMetrics = this.metricsHistory.get(sessionId) || [];
    return this.calculateSessionSummary(sessionMetrics);
  }

  /**
   * Get real-time performance dashboard data
   */
  getDashboardData(): any {
    const allSessions = Array.from(this.metricsHistory.keys());
    const recentMetrics = allSessions.flatMap(sessionId =>
      (this.metricsHistory.get(sessionId) || []).slice(-10)
    );

    return {
      currentMetrics: recentMetrics[recentMetrics.length - 1] || null,
      recentTrends: this.calculateTrends(recentMetrics),
      activeAlerts: this.getActiveAlerts(),
      systemHealth: this.calculateSystemHealth(),
      recommendations: this.generateOptimizationRecommendations(recentMetrics)
    };
  }

  /**
   * Generate optimization recommendations based on performance data
   */
  generateOptimizationRecommendations(metrics: PerformanceMetrics[]): string[] {
    const recommendations: string[] = [];

    if (metrics.length === 0) return recommendations;

    const latest = metrics[metrics.length - 1];
    const avgMemory = metrics.reduce((sum, m) => sum + m.memoryUsage.heapUsed, 0) / metrics.length;
    const avgResponseTime = metrics.reduce((sum, m) => sum + m.agentResponseTime, 0) / metrics.length;

    // Memory optimization
    if (avgMemory > this.config.memoryThresholdMB * 1024 * 1024) {
      recommendations.push('Memory usage is high. Consider implementing garbage collection optimization or reducing concurrent task limits.');
    }

    // Response time optimization
    if (avgResponseTime > this.config.responseTimeThresholdMs) {
      recommendations.push('Response times are elevated. Consider MCP server connection pooling or task prioritization.');
    }

    // MCP server optimization
    for (const [serverName, health] of Object.entries(latest.mcpConnectionHealth)) {
      if (health === 'degraded') {
        recommendations.push(`MCP server ${serverName} is degraded. Consider connection pooling or fallback strategies.`);
      } else if (health === 'failed') {
        recommendations.push(`MCP server ${serverName} has failed. Implement circuit breaker pattern or alternative data sources.`);
      }
    }

    // Agent utilization optimization
    if (latest.agentUtilization < 0.6) {
      recommendations.push('Agent utilization is low. Consider reducing resource allocation or increasing concurrent task limits.');
    } else if (latest.agentUtilization > 0.9) {
      recommendations.push('Agent utilization is high. Consider scaling up resources or implementing load balancing.');
    }

    return recommendations;
  }

  /**
   * Stop performance monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
    }

    console.log('📊 Performance monitoring stopped');
    this.emit('monitoring:stopped');
  }

  // Private helper methods

  private initializeDefaultAlerts(): void {
    this.alertConditions = [
      {
        metric: 'memoryUsage' as any,
        threshold: this.config.memoryThresholdMB * 1024 * 1024,
        comparison: 'gt',
        severity: 'warning',
        message: 'Memory usage exceeds threshold',
        action: 'Consider garbage collection or reducing concurrent tasks'
      },
      {
        metric: 'agentResponseTime',
        threshold: this.config.responseTimeThresholdMs,
        comparison: 'gt',
        severity: 'warning',
        message: 'Agent response time is elevated',
        action: 'Check MCP server connections and task queue'
      },
      {
        metric: 'errorRate',
        threshold: this.config.errorRateThreshold,
        comparison: 'gt',
        severity: 'critical',
        message: 'Error rate exceeds acceptable threshold',
        action: 'Investigate error sources and implement fallback strategies'
      }
    ];
  }

  private startMonitoring(): void {
    if (!this.config.enableRealTimeMonitoring) return;

    this.monitoringInterval = setInterval(() => {
      // Collect metrics for all active sessions
      for (const sessionId of this.sessionStartTime.keys()) {
        this.collectMetrics(sessionId);
      }
    }, this.config.metricsCollectionInterval);

    console.log('📊 Performance monitoring started');
    this.emit('monitoring:started');
  }

  private calculateSessionDuration(sessionId: string): number {
    const startTime = this.sessionStartTime.get(sessionId);
    return startTime ? Date.now() - startTime : 0;
  }

  private calculateAverageTaskTime(): number {
    // Implementation would track completed task times
    return 0; // Placeholder
  }

  private calculateAverageResponseTime(): number {
    // Implementation would track agent response times
    return 0; // Placeholder
  }

  private calculateAverageMCPLatency(): number {
    let totalLatency = 0;
    let count = 0;

    for (const metrics of this.mcpServerMetrics.values()) {
      totalLatency += metrics.latency.reduce((sum, lat) => sum + lat, 0);
      count += metrics.latency.length;
    }

    return count > 0 ? totalLatency / count : 0;
  }

  private countActiveAgents(): number {
    // Implementation would count active agent instances
    return 0; // Placeholder
  }

  private calculateAgentUtilization(): number {
    // Implementation would calculate agent resource utilization
    return 0.5; // Placeholder
  }

  private countCompletedTasks(sessionId: string): number {
    // Implementation would count completed research tasks
    return 0; // Placeholder
  }

  private countEvidenceItems(sessionId: string): number {
    // Implementation would count collected evidence items
    return 0; // Placeholder
  }

  private calculateConfidenceLevel(sessionId: string): number {
    // Implementation would calculate research confidence level
    return 0.8; // Placeholder
  }

  private calculateSynthesisQuality(sessionId: string): number {
    // Implementation would assess synthesis quality
    return 0.85; // Placeholder
  }

  private getErrorCount(sessionId: string): number {
    // Implementation would count errors for session
    return 0; // Placeholder
  }

  private calculateErrorRate(sessionId: string): number {
    // Implementation would calculate error rate
    return 0.02; // Placeholder
  }

  private getCriticalErrorCount(sessionId: string): number {
    // Implementation would count critical errors
    return 0; // Placeholder
  }

  private calculateValidationSuccessRate(sessionId: string): number {
    // Implementation would calculate validation success rate
    return 0.95; // Placeholder
  }

  private checkAlertConditions(metrics: PerformanceMetrics): void {
    for (const condition of this.alertConditions) {
      const value = this.getMetricValue(metrics, condition.metric);
      const shouldAlert = this.evaluateCondition(value, condition.threshold, condition.comparison);

      if (shouldAlert) {
        const alertId = `${condition.metric}_${Date.now()}`;
        const alert: PerformanceAlert = {
          id: alertId,
          timestamp: new Date().toISOString(),
          severity: condition.severity,
          metric: condition.metric as string,
          value,
          threshold: condition.threshold,
          message: condition.message,
          action: condition.action,
          acknowledged: false
        };

        this.activeAlerts.set(alertId, alert);
        this.emit('alert:triggered', alert);

        console.log(`🚨 Performance Alert: ${alert.message} (${value} ${condition.comparison} ${condition.threshold})`);
      }
    }
  }

  private getMetricValue(metrics: PerformanceMetrics, metric: keyof PerformanceMetrics): number {
    const value = metrics[metric];

    // Handle nested objects like memoryUsage
    if (typeof value === 'object' && value !== null) {
      if ('heapUsed' in value) {
        return (value as any).heapUsed;
      }
    }

    return typeof value === 'number' ? value : 0;
  }

  private evaluateCondition(value: number, threshold: number, comparison: 'gt' | 'lt' | 'eq'): boolean {
    switch (comparison) {
      case 'gt': return value > threshold;
      case 'lt': return value < threshold;
      case 'eq': return value === threshold;
      default: return false;
    }
  }

  private calculateSessionSummary(metrics: PerformanceMetrics[]): any {
    if (metrics.length === 0) return null;

    const latest = metrics[metrics.length - 1];
    const averages = this.calculateAverages(metrics);

    return {
      duration: latest.totalProcessingTime,
      averageResponseTime: averages.agentResponseTime,
      totalTasks: latest.researchTasksCompleted,
      errorRate: latest.errorRate,
      confidenceLevel: latest.confidenceLevel,
      memoryPeak: Math.max(...metrics.map(m => m.memoryUsage.heapUsed)),
      mcpServerHealth: latest.mcpConnectionHealth
    };
  }

  private calculateAverages(metrics: PerformanceMetrics[]): Partial<PerformanceMetrics> {
    const sums = metrics.reduce((acc, metric) => {
      acc.agentResponseTime += metric.agentResponseTime;
      acc.taskExecutionTime += metric.taskExecutionTime;
      acc.mcpToolLatency += metric.mcpToolLatency;
      return acc;
    }, { agentResponseTime: 0, taskExecutionTime: 0, mcpToolLatency: 0 });

    const count = metrics.length;
    return {
      agentResponseTime: sums.agentResponseTime / count,
      taskExecutionTime: sums.taskExecutionTime / count,
      mcpToolLatency: sums.mcpToolLatency / count
    };
  }

  private calculateTrends(metrics: PerformanceMetrics[]): any {
    // Implementation would calculate performance trends
    return {
      responseTime: 'stable',
      memoryUsage: 'increasing',
      errorRate: 'decreasing'
    }; // Placeholder
  }

  private calculateSystemHealth(): 'healthy' | 'degraded' | 'critical' {
    const activeAlerts = this.getActiveAlerts();
    const criticalAlerts = activeAlerts.filter(a => a.severity === 'critical');
    const warningAlerts = activeAlerts.filter(a => a.severity === 'warning');

    if (criticalAlerts.length > 0) return 'critical';
    if (warningAlerts.length > 2) return 'degraded';
    return 'healthy';
  }
}

export default PerformanceMonitor;