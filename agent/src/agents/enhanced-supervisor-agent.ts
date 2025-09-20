/**
 * Enhanced Supervisor Agent for BiteBase Intelligence
 * Orchestrates multi-agent analysis workflow with LangGraph integration
 */

import { StateGraph, END } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { EnhancedState, StateManager, RestaurantParams } from '../state/enhanced-state.js';
import { mcpManager } from '../mcp/enhanced-mcp-manager.js';
import { ProductAnalysisAgent } from './product-analysis-agent.js';

export interface AnalysisPlan {
  analysisType: 'comprehensive' | 'focused' | 'quick';
  requiredAgents: string[];
  estimatedDuration: number;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  parallelExecution: boolean;
  dependencies: Record<string, string[]>;
}

export interface WorkflowStep {
  agentId: string;
  agentName: string;
  description: string;
  estimatedTime: number;
  dependencies: string[];
  parallelGroup?: string;
}

/**
 * Enhanced Supervisor Agent with LangGraph workflow orchestration
 */
export class EnhancedSupervisorAgent {
  private llm: ChatOpenAI;
  private workflow: StateGraph<EnhancedState>;
  private agents: Map<string, any> = new Map();
  private agentId = 'supervisor-agent';
  private agentName = 'Supervisor Agent';

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0.1,
    });

    this.initializeAgents();
    this.buildWorkflow();
  }

  /**
   * Initialize all available agents
   */
  private initializeAgents(): void {
    this.agents.set('product-analysis', new ProductAnalysisAgent());
    // Add other agents as they are implemented
    // this.agents.set('place-analysis', new PlaceAnalysisAgent());
    // this.agents.set('price-analysis', new PriceAnalysisAgent());
    // this.agents.set('promotion-analysis', new PromotionAnalysisAgent());
  }

  /**
   * Build LangGraph workflow
   */
  private buildWorkflow(): void {
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

    // Define workflow nodes
    workflow.addNode('supervisor', this.supervisorNode.bind(this));
    workflow.addNode('product-analysis', this.productAnalysisNode.bind(this));
    workflow.addNode('place-analysis', this.placeAnalysisNode.bind(this));
    workflow.addNode('price-analysis', this.priceAnalysisNode.bind(this));
    workflow.addNode('promotion-analysis', this.promotionAnalysisNode.bind(this));
    workflow.addNode('report-generation', this.reportGenerationNode.bind(this));
    workflow.addNode('error-handler', this.errorHandlerNode.bind(this));

    // Define workflow edges
    workflow.setEntryPoint('supervisor');
    
    workflow.addConditionalEdges(
      'supervisor',
      this.routeAnalysis.bind(this),
      {
        'product-analysis': 'product-analysis',
        'place-analysis': 'place-analysis',
        'price-analysis': 'price-analysis',
        'promotion-analysis': 'promotion-analysis',
        'report-generation': 'report-generation',
        'error': 'error-handler',
        'end': END,
      }
    );

    // Connect analysis nodes back to supervisor for coordination
    workflow.addEdge('product-analysis', 'supervisor');
    workflow.addEdge('place-analysis', 'supervisor');
    workflow.addEdge('price-analysis', 'supervisor');
    workflow.addEdge('promotion-analysis', 'supervisor');
    workflow.addEdge('report-generation', END);
    workflow.addEdge('error-handler', 'supervisor');

    this.workflow = workflow;
  }

  /**
   * Start comprehensive analysis
   */
  async startAnalysis(restaurantParams: RestaurantParams, sessionId: string, userId?: string): Promise<EnhancedState> {
    // Initialize state
    const initialState = StateManager.createInitialState(sessionId, restaurantParams, userId);
    
    // Initialize required MCP servers
    await this.initializeMCPServers(restaurantParams);
    
    // Generate analysis plan
    const analysisPlan = await this.generateAnalysisPlan(restaurantParams);
    initialState.context.analysisPlan = analysisPlan;
    
    // Update state with plan
    StateManager.updateAgentProgress(initialState, this.agentId, {
      agentName: this.agentName,
      status: 'running',
      progress: 5,
      currentTask: 'Analysis plan generated',
      startTime: new Date(),
    });

    // Execute workflow
    const compiledWorkflow = this.workflow.compile();
    const finalState = await compiledWorkflow.invoke(initialState);

    return finalState;
  }

  /**
   * Supervisor node - orchestrates the analysis workflow
   */
  private async supervisorNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    try {
      const analysisPlan: AnalysisPlan = state.context.analysisPlan;
      
      if (!analysisPlan) {
        throw new Error('Analysis plan not found in state');
      }

      // Determine next action based on current progress
      const completedAgents = state.analysisProgress
        .filter(p => p.status === 'completed')
        .map(p => p.agentId);

      const failedAgents = state.analysisProgress
        .filter(p => p.status === 'failed')
        .map(p => p.agentId);

      const nextAgent = this.determineNextAgent(analysisPlan, completedAgents, failedAgents);

      if (nextAgent) {
        return {
          currentAgent: nextAgent,
          statusMessage: `Starting ${nextAgent} analysis`,
        };
      } else if (completedAgents.length === analysisPlan.requiredAgents.length) {
        return {
          currentAgent: 'report-generation',
          statusMessage: 'All analysis completed, generating report',
        };
      } else {
        return {
          currentAgent: 'error',
          statusMessage: 'Analysis workflow encountered issues',
        };
      }

    } catch (error) {
      console.error('Supervisor Node Error:', error);
      return {
        currentAgent: 'error',
        statusMessage: `Supervisor error: ${error.message}`,
      };
    }
  }

  /**
   * Product Analysis Node
   */
  private async productAnalysisNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    const agent = this.agents.get('product-analysis');
    if (!agent) {
      throw new Error('Product analysis agent not found');
    }

    const updatedState = await agent.analyze(state);
    return updatedState;
  }

  /**
   * Place Analysis Node (placeholder)
   */
  private async placeAnalysisNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    // Placeholder for Place Analysis Agent
    StateManager.updateAgentProgress(state, 'place-analysis', {
      agentName: 'Place Analysis Agent',
      status: 'completed',
      progress: 100,
      currentTask: 'Place analysis completed (placeholder)',
      startTime: new Date(),
      endTime: new Date(),
    });

    return state;
  }

  /**
   * Price Analysis Node (placeholder)
   */
  private async priceAnalysisNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    // Placeholder for Price Analysis Agent
    StateManager.updateAgentProgress(state, 'price-analysis', {
      agentName: 'Price Analysis Agent',
      status: 'completed',
      progress: 100,
      currentTask: 'Price analysis completed (placeholder)',
      startTime: new Date(),
      endTime: new Date(),
    });

    return state;
  }

  /**
   * Promotion Analysis Node (placeholder)
   */
  private async promotionAnalysisNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    // Placeholder for Promotion Analysis Agent
    StateManager.updateAgentProgress(state, 'promotion-analysis', {
      agentName: 'Promotion Analysis Agent',
      status: 'completed',
      progress: 100,
      currentTask: 'Promotion analysis completed (placeholder)',
      startTime: new Date(),
      endTime: new Date(),
    });

    return state;
  }

  /**
   * Report Generation Node
   */
  private async reportGenerationNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    try {
      StateManager.updateAgentProgress(state, 'report-generation', {
        agentName: 'Report Generation Agent',
        status: 'running',
        progress: 0,
        currentTask: 'Generating comprehensive report',
        startTime: new Date(),
      });

      // Generate comprehensive report
      // This would use the visualization MCP servers
      
      StateManager.updateAgentProgress(state, 'report-generation', {
        status: 'completed',
        progress: 100,
        currentTask: 'Report generated successfully',
        endTime: new Date(),
      });

      return {
        status: 'completed',
        statusMessage: 'Analysis and report generation completed',
        overallProgress: 100,
      };

    } catch (error) {
      StateManager.addError(state, 'report-generation', error.message, 'high');
      return {
        status: 'error',
        statusMessage: `Report generation failed: ${error.message}`,
      };
    }
  }

  /**
   * Error Handler Node
   */
  private async errorHandlerNode(state: EnhancedState): Promise<Partial<EnhancedState>> {
    const criticalErrors = state.errors.filter(e => e.severity === 'critical');
    
    if (criticalErrors.length > 0) {
      return {
        status: 'error',
        statusMessage: 'Critical errors prevent analysis continuation',
      };
    }

    // Try to recover from non-critical errors
    return {
      statusMessage: 'Attempting to recover from errors',
    };
  }

  /**
   * Route analysis based on current state
   */
  private routeAnalysis(state: EnhancedState): string {
    if (state.currentAgent === 'error') {
      return 'error';
    }

    if (state.currentAgent === 'report-generation') {
      return 'report-generation';
    }

    if (state.currentAgent) {
      return state.currentAgent;
    }

    return 'end';
  }

  /**
   * Generate analysis plan based on restaurant parameters
   */
  private async generateAnalysisPlan(params: RestaurantParams): Promise<AnalysisPlan> {
    const planningPrompt = `
Generate an analysis plan for a new restaurant with the following parameters:

Restaurant Details:
- Type: ${params.type}
- Cuisine: ${params.cuisine}
- Location: ${params.location.district}, ${params.location.city}
- Budget: ${params.budget.min} - ${params.budget.max} THB
- Business Model: ${params.businessModel}
- Target Customers: ${params.targetCustomers.join(', ')}

Available Analysis Agents:
1. Product Analysis (menu, pricing, dish popularity)
2. Place Analysis (location, competition, foot traffic)
3. Price Analysis (revenue forecasting, profitability)
4. Promotion Analysis (marketing, customer sentiment)

Determine:
1. Which agents are required for this restaurant type
2. Execution priority and dependencies
3. Whether parallel execution is beneficial
4. Estimated duration for each analysis

Respond in JSON format with the analysis plan.
`;

    const response = await this.llm.invoke([
      new SystemMessage('You are an expert restaurant analysis coordinator.'),
      new HumanMessage(planningPrompt),
    ]);

    try {
      const plan = JSON.parse(response.content as string);
      return {
        analysisType: 'comprehensive',
        requiredAgents: ['product-analysis', 'place-analysis', 'price-analysis', 'promotion-analysis'],
        estimatedDuration: 1800, // 30 minutes
        priority: 'normal',
        parallelExecution: true,
        dependencies: {
          'price-analysis': ['product-analysis'],
          'promotion-analysis': ['product-analysis'],
        },
        ...plan,
      };
    } catch (error) {
      // Fallback plan
      return {
        analysisType: 'comprehensive',
        requiredAgents: ['product-analysis', 'place-analysis', 'price-analysis', 'promotion-analysis'],
        estimatedDuration: 1800,
        priority: 'normal',
        parallelExecution: false,
        dependencies: {},
      };
    }
  }

  /**
   * Determine next agent to execute
   */
  private determineNextAgent(plan: AnalysisPlan, completed: string[], failed: string[]): string | null {
    for (const agentId of plan.requiredAgents) {
      if (completed.includes(agentId) || failed.includes(agentId)) {
        continue;
      }

      // Check dependencies
      const dependencies = plan.dependencies[agentId] || [];
      const dependenciesMet = dependencies.every(dep => completed.includes(dep));

      if (dependenciesMet) {
        return agentId;
      }
    }

    return null;
  }

  /**
   * Initialize required MCP servers based on analysis plan
   */
  private async initializeMCPServers(params: RestaurantParams): Promise<void> {
    const requiredCapabilities = [
      'web_scraping',
      'database',
      'chart_generation',
      'geospatial_analysis',
      'financial_analysis',
    ];

    await mcpManager.initializeServers(requiredCapabilities);
  }

  /**
   * Get workflow status
   */
  getWorkflowStatus(): any {
    return {
      agentsAvailable: Array.from(this.agents.keys()),
      mcpStatus: mcpManager.getConnectionStatus(),
    };
  }
}

// Export singleton instance
export const supervisorAgent = new EnhancedSupervisorAgent();