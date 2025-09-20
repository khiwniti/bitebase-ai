/**
 * API endpoint for starting LangGraph analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reportId, restaurantParams, analysisType = 'comprehensive' } = body;

    if (!reportId || !restaurantParams) {
      return NextResponse.json(
        { error: 'Missing required parameters: reportId and restaurantParams' },
        { status: 400 }
      );
    }

    // Start the LangGraph agent analysis
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const workflowId = `workflow_${sessionId}`;

    // Call the enhanced LangGraph agent
    const agentCommand = `cd agent && npm run invoke -- --input '${JSON.stringify({
      restaurantParams,
      sessionId,
      analysisType,
    })}'`;

    // Start the analysis in the background
    execAsync(agentCommand).catch(error => {
      console.error('Agent execution error:', error);
    });

    return NextResponse.json({
      success: true,
      sessionId,
      workflowId,
      status: 'started',
      message: 'Analysis started successfully',
    });

  } catch (error) {
    console.error('Start analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to start analysis', details: error.message },
      { status: 500 }
    );
  }
}