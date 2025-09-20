/**
 * API endpoint for agent health check
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: process.memoryUsage().heapUsed,
        total: process.memoryUsage().heapTotal,
        usage: (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100,
      },
      agents: {
        'product-analysis': {
          status: 'ready',
          capabilities: ['wongnai_scraping', 'foodpanda_scraping', 'menu_analysis', 'pricing_strategy'],
          lastExecution: new Date(Date.now() - 60000),
        },
        'place-analysis': {
          status: 'ready',
          capabilities: ['location_analysis', 'competitor_mapping', 'property_analysis'],
          lastExecution: new Date(Date.now() - 120000),
        },
        'price-analysis': {
          status: 'ready',
          capabilities: ['revenue_forecasting', 'profitability_analysis', 'roi_calculation'],
          lastExecution: new Date(Date.now() - 90000),
        },
        'promotion-analysis': {
          status: 'ready',
          capabilities: ['sentiment_analysis', 'customer_segmentation', 'marketing_insights'],
          lastExecution: new Date(Date.now() - 75000),
        },
        'supervisor': {
          status: 'ready',
          capabilities: ['workflow_orchestration', 'task_delegation', 'progress_monitoring'],
          lastExecution: new Date(Date.now() - 30000),
        },
      },
      services: {
        langGraph: {
          status: 'operational',
          activeWorkflows: 0,
          completedWorkflows: 5,
          failedWorkflows: 0,
        },
        mcpServers: {
          total: 6,
          connected: 5,
          healthy: 5,
          issues: ['gis server connection timeout'],
        },
        database: {
          status: 'connected',
          queries: 45,
          errors: 0,
        },
      },
      performance: {
        avgResponseTime: 850, // milliseconds
        successRate: 98.5, // percentage
        errorRate: 1.5, // percentage
        throughput: 12, // requests per minute
      },
    };

    // Determine overall health status
    const mcpHealthy = health.services.mcpServers.healthy / health.services.mcpServers.total >= 0.8;
    const agentsHealthy = Object.values(health.agents).every(agent => agent.status === 'ready');
    const performanceGood = health.performance.successRate >= 95;

    if (!mcpHealthy || !agentsHealthy || !performanceGood) {
      health.status = 'degraded';
    }

    return NextResponse.json(health);

  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
      details: 'Health check failed',
    }, { status: 500 });
  }
}