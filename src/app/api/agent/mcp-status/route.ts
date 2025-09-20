/**
 * API endpoint for MCP server status
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In production, this would check actual MCP server connections
    const mcpStatus = {
      playwright: {
        connected: true,
        lastHealthCheck: new Date(),
        errorCount: 0,
        capabilities: ['web_scraping', 'browser_automation', 'dynamic_content'],
        version: '1.0.0',
      },
      sqlite: {
        connected: true,
        lastHealthCheck: new Date(),
        errorCount: 0,
        capabilities: ['database', 'crud_operations', 'data_analysis'],
        version: '1.0.0',
      },
      echarts: {
        connected: true,
        lastHealthCheck: new Date(),
        errorCount: 0,
        capabilities: ['chart_generation', 'data_visualization', 'interactive_charts'],
        version: '1.0.0',
      },
      mermaid: {
        connected: true,
        lastHealthCheck: new Date(),
        errorCount: 0,
        capabilities: ['diagram_generation', 'process_flows', 'organizational_charts'],
        version: '1.0.0',
      },
      financeTools: {
        connected: true,
        lastHealthCheck: new Date(),
        errorCount: 0,
        capabilities: ['financial_analysis', 'market_intelligence', 'roi_calculation'],
        version: '1.0.0',
      },
      gis: {
        connected: false,
        lastHealthCheck: new Date(Date.now() - 300000), // 5 minutes ago
        errorCount: 2,
        capabilities: ['geospatial_analysis', 'buffer_analysis', 'proximity_calculations'],
        version: '1.0.0',
        error: 'Connection timeout',
      },
    };

    const summary = {
      total: Object.keys(mcpStatus).length,
      connected: Object.values(mcpStatus).filter(s => s.connected).length,
      disconnected: Object.values(mcpStatus).filter(s => !s.connected).length,
      healthScore: Object.values(mcpStatus).filter(s => s.connected).length / Object.keys(mcpStatus).length,
      lastUpdate: new Date(),
    };

    return NextResponse.json({
      status: 'success',
      summary,
      servers: mcpStatus,
    });

  } catch (error) {
    console.error('MCP status error:', error);
    return NextResponse.json(
      { error: 'Failed to get MCP server status', details: error.message },
      { status: 500 }
    );
  }
}