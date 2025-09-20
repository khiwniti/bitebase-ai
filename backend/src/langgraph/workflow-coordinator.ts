// BiteBase AI - LangGraph Workflow Coordinator
// Professional StateGraph implementation for 4P analysis coordination

import { StateGraph, END } from '@langchain/langgraph';
import { 
  BiteBaseState, 
  NodeResponse, 
  AGENT_CONFIGS,
  createInitialState,
  updateStateProgress,
  updateStateResult,
  updateStateError,
  canExecuteAgent,
  isAnalysisComplete
} from './state';
import { ProductAgent } from '../agents/product-agent';
import { PlaceAgent } from '../agents/place-agent';
import { PriceAgent } from '../agents/price-agent';
import { PromotionAgent } from '../agents/promotion-agent';
import { ReportAgent } from '../agents/report-agent';
import { SupervisorAgent } from '../agents/supervisor-agent';

export class BiteBaseWorkflowCoordinator {
  private stateGraph: StateGraph<BiteBaseState>;
  private agents: Map<string, any>;
  private supervisorAgent: SupervisorAgent;

  constructor() {
    this.agents = new Map();
    this.supervisorAgent = new SupervisorAgent();
    this.initializeAgents();
    this.buildStateGraph();
  }

  private initializeAgents(): void {
    // Initialize all 4P analysis agents
    this.agents.set('product', new ProductAgent());
    this.agents.set('place', new PlaceAgent());
    this.agents.set('price', new PriceAgent());
    this.agents.set('promotion', new PromotionAgent());
    this.agents.set('report', new ReportAgent());
    
    console.log('🤖 BiteBase agents initialized:', Array.from(this.agents.keys()));
  }

  private buildStateGraph(): void {
    // Create StateGraph with BiteBaseState
    this.stateGraph = new StateGraph<BiteBaseState>({
      channels: {
        sessionId: {
          reducer: (existing: string, update: string) => update || existing,
          default: () => ''
        },
        status: {
          reducer: (existing: string, update: string) => update || existing,
          default: () => 'initializing'
        },
        progress: {
          reducer: (existing: number, update: number) => update ?? existing,
          default: () => 0
        },
        currentAgent: {
          reducer: (existing: string, update: string) => update || existing,
          default: () => 'supervisor'
        },
        parameters: {
          reducer: (existing: any, update: any) => ({ ...existing, ...update }),
          default: () => ({})
        },
        results: {
          reducer: (existing: any, update: any) => ({ ...existing, ...update }),
          default: () => ({})
        },
        messages: {
          reducer: (existing: any[], update: any[]) => [...existing, ...(update || [])],
          default: () => []
        },
        nextAgent: {
          reducer: (existing: string, update: string) => update || existing,
          default: () => undefined
        },
        errors: {
          reducer: (existing: string[], update: string[]) => [...existing, ...(update || [])],
          default: () => []
        },
        retryCount: {
          reducer: (existing: number, update: number) => update ?? existing,
          default: () => 0
        },
        socketId: {
          reducer: (existing: string, update: string) => update || existing,
          default: () => undefined
        },
        lastUpdated: {
          reducer: (existing: Date, update: Date) => update || existing,
          default: () => new Date()
        },
        collaborators: {
          reducer: (existing: string[], update: string[]) => update || existing,
          default: () => []
        }
      }
    });

    // Add nodes for each agent
    this.stateGraph.addNode('supervisor', this.supervisorNode.bind(this));
    this.stateGraph.addNode('product', this.productNode.bind(this));
    this.stateGraph.addNode('place', this.placeNode.bind(this));
    this.stateGraph.addNode('price', this.priceNode.bind(this));
    this.stateGraph.addNode('promotion', this.promotionNode.bind(this));
    this.stateGraph.addNode('report', this.reportNode.bind(this));

    // Set entry point
    this.stateGraph.setEntryPoint('supervisor');

    // Add conditional routing from supervisor
    this.stateGraph.addConditionalEdges(
      'supervisor',
      this.routeToNextAgent.bind(this),
      {
        'product': 'product',
        'place': 'place', 
        'price': 'price',
        'promotion': 'promotion',
        'report': 'report',
        'end': END
      }
    );

    // Add edges back to supervisor for coordination
    this.stateGraph.addEdge('product', 'supervisor');
    this.stateGraph.addEdge('place', 'supervisor');
    this.stateGraph.addEdge('price', 'supervisor');
    this.stateGraph.addEdge('promotion', 'supervisor');
    this.stateGraph.addEdge('report', END);

    console.log('📊 LangGraph StateGraph constructed with 4P analysis workflow');
  }

  // Supervisor node - coordinates the analysis workflow
  private async supervisorNode(state: BiteBaseState): Promise<Partial<BiteBaseState>> {
    console.log(`👨‍💼 Supervisor evaluating session: ${state.sessionId}`);
    
    try {
      const nextAgent = await this.supervisorAgent.determineNextAgent(state);
      
      if (!nextAgent) {
        return {
          status: 'completed',
          nextAgent: 'end',
          lastUpdated: new Date()
        };
      }

      return {
        nextAgent,
        currentAgent: nextAgent,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('❌ Supervisor error:', error);
      return {
        status: 'error',
        errors: [error instanceof Error ? error.message : 'Supervisor coordination failed'],
        lastUpdated: new Date()
      };
    }
  }

  // Product Analysis Node
  private async productNode(state: BiteBaseState): Promise<Partial<BiteBaseState>> {
    return this.executeAgentNode('product', state);
  }

  // Place Analysis Node
  private async placeNode(state: BiteBaseState): Promise<Partial<BiteBaseState>> {
    return this.executeAgentNode('place', state);
  }

  // Price Analysis Node
  private async priceNode(state: BiteBaseState): Promise<Partial<BiteBaseState>> {
    return this.executeAgentNode('price', state);
  }

  // Promotion Analysis Node  
  private async promotionNode(state: BiteBaseState): Promise<Partial<BiteBaseState>> {
    return this.executeAgentNode('promotion', state);
  }

  // Report Generation Node
  private async reportNode(state: BiteBaseState): Promise<Partial<BiteBaseState>> {
    return this.executeAgentNode('report', state);
  }

  // Generic agent execution
  private async executeAgentNode(agentName: string, state: BiteBaseState): Promise<Partial<BiteBaseState>> {
    console.log(`🔄 Executing ${agentName} agent for session: ${state.sessionId}`);
    
    const agent = this.agents.get(agentName);
    if (!agent) {
      return {
        status: 'error',
        errors: [`Agent ${agentName} not found`],
        lastUpdated: new Date()
      };
    }

    try {
      // Check if agent can execute
      if (!canExecuteAgent(state, agentName)) {
        return {
          status: 'error',
          errors: [`Agent ${agentName} dependencies not met`],
          lastUpdated: new Date()
        };
      }

      // Execute agent
      const result = await agent.execute(state);
      
      if (result.errors && result.errors.length > 0) {
        return {
          status: 'error',
          errors: result.errors,
          retryCount: state.retryCount + 1,
          lastUpdated: new Date()
        };
      }

      // Update results
      const updatedResults = {
        ...state.results,
        [agentName]: result.data
      };

      return {
        results: updatedResults,
        progress: result.progress || state.progress,
        status: 'running',
        lastUpdated: new Date()
      };

    } catch (error) {
      console.error(`❌ ${agentName} agent error:`, error);
      return {
        status: 'error',
        errors: [error instanceof Error ? error.message : `${agentName} agent execution failed`],
        retryCount: state.retryCount + 1,
        lastUpdated: new Date()
      };
    }
  }

  // Route to next agent based on state
  private routeToNextAgent(state: BiteBaseState): string {
    if (state.status === 'error' && state.retryCount >= 3) {
      return 'end';
    }

    if (state.status === 'completed' || isAnalysisComplete(state)) {
      return 'end';
    }

    return state.nextAgent || 'end';
  }

  // Public interface to start analysis
  async startAnalysis(sessionId: string, parameters: any, socketCallback?: (update: any) => void): Promise<BiteBaseState> {
    console.log(`🚀 Starting LangGraph analysis for session: ${sessionId}`);
    
    const initialState = createInitialState(sessionId, parameters);
    
    try {
      // Compile and run the workflow
      const compiledGraph = this.stateGraph.compile();
      
      // Run with streaming for real-time updates
      const stream = await compiledGraph.stream(initialState, {
        configurable: {
          sessionId,
          socketCallback
        }
      });

      let finalState: BiteBaseState = initialState;

      // Process streaming updates
      for await (const update of stream) {
        console.log('📊 Workflow update:', Object.keys(update));
        
        // Get the latest state from the update
        const stateKeys = Object.keys(update);
        if (stateKeys.length > 0) {
          finalState = { ...finalState, ...update[stateKeys[0]] };
          
          // Send real-time update via socket if callback provided
          if (socketCallback) {
            socketCallback({
              type: 'workflow-update',
              sessionId,
              update: finalState
            });
          }
        }
      }

      console.log(`✅ Analysis completed for session: ${sessionId}`);
      return finalState;

    } catch (error) {
      console.error('❌ LangGraph workflow error:', error);
      
      const errorState = updateStateError(initialState, 
        error instanceof Error ? error.message : 'Workflow execution failed'
      );
      
      if (socketCallback) {
        socketCallback({
          type: 'workflow-error',
          sessionId,
          error: errorState.errors
        });
      }
      
      return errorState;
    }
  }

  // Pause analysis workflow
  async pauseAnalysis(sessionId: string): Promise<void> {
    console.log(`⏸️ Pausing analysis for session: ${sessionId}`);
    // Implementation would depend on StateGraph pause capabilities
  }

  // Resume analysis workflow
  async resumeAnalysis(sessionId: string): Promise<void> {
    console.log(`▶️ Resuming analysis for session: ${sessionId}`);
    // Implementation would depend on StateGraph resume capabilities
  }

  // Get current workflow state
  getWorkflowInfo(): any {
    return {
      agents: Array.from(this.agents.keys()),
      configs: AGENT_CONFIGS,
      graphStructure: {
        nodes: ['supervisor', 'product', 'place', 'price', 'promotion', 'report'],
        entryPoint: 'supervisor',
        coordination: 'supervisor-based'
      }
    };
  }
}