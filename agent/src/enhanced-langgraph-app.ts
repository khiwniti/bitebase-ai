/**
 * Enhanced LangGraph Server for BiteBase Intelligence
 * Main entry point for the restaurant intelligence agent framework
 */

import { StateGraph, END } from '@langchain/langgraph';
import { MemorySaver } from '@langchain/langgraph';
import { EnhancedState, StateManager, RestaurantParamsSchema } from './state/enhanced-state.js';
import { supervisorAgent } from './agents/enhanced-supervisor-agent.js';
import { mcpManager } from './mcp/enhanced-mcp-manager.js';
import { z } from 'zod';

// Input schema for the LangGraph app
const InputSchema = z.object({
  restaurantParams: RestaurantParamsSchema,
  sessionId: z.string().optional(),
  userId: z.string().optional(),
  analysisType: z.enum(['comprehensive', 'focused', 'quick']).default('comprehensive'),
});

// Output schema for the LangGraph app
const OutputSchema = z.object({
  sessionId: z.string(),
  status: z.enum(['idle', 'analyzing', 'completed', 'error', 'paused']),
  overallProgress: z.number(),
  results: z.any().optional(),
  errors: z.array(z.any()),
  summary: z.object({
    analysisComplete: z.boolean(),
    agentsCompleted: z.number(),
    totalAgents: z.number(),
    estimatedCompletionTime: z.string().optional(),
  }),
});

/**
 * Enhanced Restaurant Intelligence LangGraph Application
 */
class BiteBaseIntelligenceApp {
  private workflow: StateGraph<EnhancedState>;
  private memory: MemorySaver;

  constructor() {
    this.memory = new MemorySaver();
    this.buildMainWorkflow();
    this.initializeEventHandlers();
  }

  /**
   * Build the main LangGraph workflow
   */
  private buildMainWorkflow(): void {
    const workflow = new StateGraph<EnhancedState>({
      channels: {
        sessionId: null,
        userId: null,
        restaurantParams: null,
        messages: null,
        documents: null,
        context: null,
        analysisProgress: null,
        currentAgent: null,
        overallProgress: null,
        dataCollection: null,
        results: null,
        status: null,
        statusMessage: null,
        lastUpdated: null,
        errors: null,
        isShared: null,
        collaborators: null,
        permissions: null,
        mcpStatus: null,
        workflowId: null,
        parentSessionId: null,
        tags: null,
        priority: null,
      },
    });

    // Main workflow nodes
    workflow.addNode('initialize', this.initializeNode.bind(this));
    workflow.addNode('validate-input', this.validateInputNode.bind(this));
    workflow.addNode('setup-mcp', this.setupMCPNode.bind(this));
    workflow.addNode('run-analysis', this.runAnalysisNode.bind(this));
    workflow.addNode('finalize', this.finalizeNode.bind(this));
    workflow.addNode('error-handler', this.errorHandlerNode.bind(this));

    // Workflow routing
    workflow.setEntryPoint('initialize');
    workflow.addEdge('initialize', 'validate-input');
    
    workflow.addConditionalEdges(
      'validate-input',
      this.routeAfterValidation.bind(this),
      {
        'setup-mcp': 'setup-mcp',
        'error': 'error-handler',
      }
    );

    workflow.addEdge('setup-mcp', 'run-analysis');
    workflow.addEdge('run-analysis', 'finalize');
    workflow.addEdge('finalize', END);
    workflow.addEdge('error-handler', END);

    this.workflow = workflow;
  }

  /**
   * Initialize node - set up session and basic state
   */
  private async initializeNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    try {
      const sessionId = state.sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        sessionId,
        status: 'idle',
        overallProgress: 0,
        lastUpdated: new Date(),
        workflowId: `workflow_${sessionId}`,
      };
    } catch (error) {
      console.error('Initialize Node Error:', error);
      return {
        status: 'error',
        statusMessage: `Initialization failed: ${error.message}`,
      };
    }
  }

  /**
   * Validate input node - ensure restaurant parameters are valid
   */
  private async validateInputNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    try {
      // Validate restaurant parameters
      const validatedParams = RestaurantParamsSchema.parse(state.restaurantParams);
      
      return {
        restaurantParams: validatedParams,
        statusMessage: 'Input validation completed',
        overallProgress: 10,
      };
    } catch (error) {
      console.error('Validation Error:', error);
      StateManager.addError(state, 'validation', error.message, 'critical');
      return {
        status: 'error',
        statusMessage: `Input validation failed: ${error.message}`,
      };
    }
  }

  /**
   * Setup MCP servers node
   */
  private async setupMCPNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    try {
      // Initialize required MCP servers
      const requiredCapabilities = [
        'web_scraping',
        'database',
        'chart_generation',
        'geospatial_analysis',
        'financial_analysis',
      ];

      await mcpManager.initializeServers(requiredCapabilities);
      
      const mcpStatus = mcpManager.getConnectionStatus();
      const connectedServers = Object.values(mcpStatus).filter(s => s.status === 'connected').length;
      
      return {
        mcpStatus: mcpStatus,
        statusMessage: `MCP servers initialized (${connectedServers} connected)`,
        overallProgress: 20,
      };
    } catch (error) {
      console.error('MCP Setup Error:', error);
      StateManager.addError(state, 'mcp-setup', error.message, 'high');
      return {
        statusMessage: `MCP setup completed with warnings: ${error.message}`,
        overallProgress: 15,
      };
    }
  }

  /**
   * Run analysis node - execute the main analysis workflow
   */
  private async runAnalysisNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    try {
      // Start the supervisor agent analysis
      const analysisResult = await supervisorAgent.startAnalysis(
        state.restaurantParams,
        state.sessionId,
        state.userId
      );

      return {
        ...analysisResult,
        statusMessage: 'Analysis workflow completed',
      };
    } catch (error) {
      console.error('Analysis Error:', error);
      StateManager.addError(state, 'analysis', error.message, 'critical');
      return {
        status: 'error',
        statusMessage: `Analysis failed: ${error.message}`,
      };
    }
  }

  /**
   * Finalize node - clean up and prepare final output
   */
  private async finalizeNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    try {
      const isComplete = StateManager.isAnalysisComplete(state);
      const summary = StateManager.getStateSummary(state);

      return {
        status: isComplete ? 'completed' : 'error',
        statusMessage: isComplete ? 'Analysis completed successfully' : 'Analysis completed with errors',
        overallProgress: 100,
        lastUpdated: new Date(),
        context: {
          ...state.context,
          summary,
          finalizedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Finalize Error:', error);
      return {
        status: 'error',
        statusMessage: `Finalization failed: ${error.message}`,
      };
    }
  }

  /**
   * Error handler node
   */
  private async errorHandlerNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    const criticalErrors = state.errors.filter(e => e.severity === 'critical');
    
    return {
      status: 'error',
      statusMessage: `Workflow failed with ${criticalErrors.length} critical errors`,
      overallProgress: 0,
      lastUpdated: new Date(),
    };
  }

  /**
   * Route after validation
   */
  private routeAfterValidation(state: EnhancedState): string {
    if (state.status === 'error') {
      return 'error';
    }
    return 'setup-mcp';
  }

  /**
   * Initialize event handlers for real-time updates
   */
  private initializeEventHandlers(): void {
    // MCP Manager event handlers
    mcpManager.on('server_connected', (event) => {
      console.log(`MCP Server connected: ${event.serverId}`);
    });

    mcpManager.on('server_connection_failed', (event) => {
      console.warn(`MCP Server connection failed: ${event.serverId} - ${event.error}`);
    });

    mcpManager.on('tool_executed', (event) => {
      console.log(`Tool executed: ${event.serverId}/${event.toolName} in ${event.executionTime}ms`);
    });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('Shutting down BiteBase Intelligence App...');
      await mcpManager.shutdown();
      process.exit(0);
    });
  }

  /**
   * Main invocation method for LangGraph
   */
  async invoke(input: z.infer<typeof InputSchema>, config?: any) {
    try {
      // Validate input
      const validatedInput = InputSchema.parse(input);
      
      // Create initial state
      const sessionId = validatedInput.sessionId || `session_${Date.now()}`;
      const initialState = StateManager.createInitialState(
        sessionId,
        validatedInput.restaurantParams,
        validatedInput.userId
      );

      // Add analysis type to context
      initialState.context.analysisType = validatedInput.analysisType;

      // Compile and run workflow
      const compiledWorkflow = this.workflow.compile({
        checkpointer: this.memory,
      });

      const result = await compiledWorkflow.invoke(initialState, {
        configurable: { thread_id: sessionId },
        ...config,
      });

      // Format output
      const output = {
        sessionId: result.sessionId,
        status: result.status,
        overallProgress: result.overallProgress,
        results: result.results,
        errors: result.errors,
        summary: {
          analysisComplete: StateManager.isAnalysisComplete(result),
          agentsCompleted: result.analysisProgress.filter(p => p.status === 'completed').length,
          totalAgents: result.analysisProgress.length,
          estimatedCompletionTime: result.context?.summary?.estimatedCompletionTime,
        },
      };

      return OutputSchema.parse(output);
    } catch (error) {
      console.error('App Invocation Error:', error);
      throw error;
    }
  }

  /**
   * Stream method for real-time updates
   */
  async *stream(input: z.infer<typeof InputSchema>, config?: any) {
    const validatedInput = InputSchema.parse(input);
    const sessionId = validatedInput.sessionId || `session_${Date.now()}`;
    
    const initialState = StateManager.createInitialState(
      sessionId,
      validatedInput.restaurantParams,
      validatedInput.userId
    );

    initialState.context.analysisType = validatedInput.analysisType;

    const compiledWorkflow = this.workflow.compile({
      checkpointer: this.memory,
    });

    for await (const update of compiledWorkflow.stream(initialState, {
      configurable: { thread_id: sessionId },
      ...config,
    })) {
      yield {
        sessionId: update.sessionId,
        status: update.status,
        overallProgress: update.overallProgress,
        currentAgent: update.currentAgent,
        statusMessage: update.statusMessage,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Get application info
   */
  getAppInfo() {
    return {
      name: 'BiteBase Restaurant Intelligence',
      version: '1.0.0',
      description: 'Comprehensive restaurant market analysis using LangGraph and MCP servers',
      capabilities: [
        'Product Analysis (Menu & Pricing)',
        'Place Analysis (Location & Competition)',
        'Price Analysis (Revenue & Profitability)',
        'Promotion Analysis (Marketing & Sentiment)',
        'Report Generation',
        'Real-time Collaboration',
        'Geospatial Analysis',
        'Financial Modeling',
      ],
      mcpServers: Object.keys(mcpManager.getConnectionStatus()),
    };
  }
}

// Export the app instance
export const app = new BiteBaseIntelligenceApp();

// Export schemas for LangGraph CLI
export { InputSchema, OutputSchema };