import { StateGraph, START, END } from '@langchain/langgraph';
import { BaseMessage, HumanMessage, AIMessage } from '@langchain/core/messages';
import { BiteBaseResearchState, BiteBaseStateManager, BiteBaseStateAnnotation, BiteBaseStateType } from '../workflows/state.js';
import { ProductAnalysisAgent } from './ProductAnalysisAgent.js';
import { PlaceAnalysisAgent } from './PlaceAnalysisAgent.js';
import { PriceAnalysisAgent } from './PriceAnalysisAgent.js';
import { PromotionAnalysisAgent } from './PromotionAnalysisAgent.js';
import { ReportGenerationAgent } from './ReportGenerationAgent.js';
import { MCPManager } from '../mcp/MCPManager.js';
import { logger } from '../utils/logger.js';

export class SupervisorAgent {
  private mcpManager: MCPManager;
  private productAgent: ProductAnalysisAgent;
  private placeAgent: PlaceAnalysisAgent;
  private priceAgent: PriceAnalysisAgent;
  private promotionAgent: PromotionAnalysisAgent;
  private reportAgent: ReportGenerationAgent;
  private workflow: StateGraph<typeof BiteBaseStateAnnotation>;
  private activeSessions: Map<string, BiteBaseStateType> = new Map();

  constructor(mcpManager: MCPManager) {
    this.mcpManager = mcpManager;
    this.productAgent = new ProductAnalysisAgent(mcpManager);
    this.placeAgent = new PlaceAnalysisAgent(mcpManager);
    this.priceAgent = new PriceAnalysisAgent(mcpManager);
    this.promotionAgent = new PromotionAnalysisAgent(mcpManager);
    this.reportAgent = new ReportGenerationAgent(mcpManager);
    
    this.workflow = this.createWorkflow();
  }

  async initialize(): Promise<void> {
    logger.info('🎯 Initializing Supervisor Agent and workflow...');
    
    // Initialize all specialized agents
    await Promise.all([
      this.productAgent.initialize(),
      this.placeAgent.initialize(),
      this.priceAgent.initialize(),
      this.promotionAgent.initialize(),
      this.reportAgent.initialize()
    ]);
    
    logger.info('✅ All specialized agents initialized');
  }

  private createWorkflow(): StateGraph<typeof BiteBaseStateAnnotation> {
    const workflow = new StateGraph(BiteBaseStateAnnotation);

    // Add nodes for each agent
    workflow.addNode('supervisor', this.supervisorNode.bind(this));
    workflow.addNode('product_analysis', this.productAnalysisNode.bind(this));
    workflow.addNode('place_analysis', this.placeAnalysisNode.bind(this));
    workflow.addNode('price_analysis', this.priceAnalysisNode.bind(this));
    workflow.addNode('promotion_analysis', this.promotionAnalysisNode.bind(this));
    workflow.addNode('report_generation', this.reportGenerationNode.bind(this));

    // Define workflow edges
    workflow.addEdge(START, 'supervisor');
    workflow.addConditionalEdges(
      'supervisor',
      this.routeToAgent.bind(this),
      {
        'product': 'product_analysis',
        'place': 'place_analysis', 
        'price': 'price_analysis',
        'promotion': 'promotion_analysis',
        'report': 'report_generation',
        'end': END
      }
    );

    // All agents return to supervisor for coordination
    workflow.addEdge('product_analysis', 'supervisor');
    workflow.addEdge('place_analysis', 'supervisor');
    workflow.addEdge('price_analysis', 'supervisor');
    workflow.addEdge('promotion_analysis', 'supervisor');
    workflow.addEdge('report_generation', END);

    return workflow.compile();
  }

  private async supervisorNode(state: BiteBaseStateType): Promise<Partial<BiteBaseStateType>> {
    logger.info(`🎯 Supervisor coordinating research for session: ${state.sessionId}`);
    
    // Determine next action based on current state
    const nextAgent = this.determineNextAgent(state);
    
    if (nextAgent) {
      logger.info(`📋 Delegating to ${nextAgent} agent`);
      return {
        progress: {
          ...state.progress,
          currentAgent: nextAgent
        }
      };
    } else {
      // All agents completed, move to report generation
      logger.info('📊 All analysis complete, generating final report');
      return {
        progress: {
          ...state.progress,
          currentAgent: 'report'
        }
      };
    }
  }

  private determineNextAgent(state: BiteBaseStateType): string | null {
    // Check which agents haven't been completed yet
    if (state.productAnalysis.status === 'pending') return 'product';
    if (state.placeAnalysis.status === 'pending') return 'place';
    if (state.priceAnalysis.status === 'pending') return 'price';
    if (state.promotionAnalysis.status === 'pending') return 'promotion';
    if (state.reportGeneration.status === 'pending') return 'report';
    
    return null; // All complete
  }

  private async routeToAgent(state: BiteBaseStateType): Promise<string> {
    const nextAgent = this.determineNextAgent(state);
    
    if (!nextAgent) {
      return 'end';
    }
    
    return nextAgent;
  }

  private async productAnalysisNode(state: BiteBaseStateType): Promise<Partial<BiteBaseStateType>> {
    try {
      logger.info('🍽️ Starting product analysis...');
      
      const result = await this.productAgent.analyze(state.parameters);
      
      return {
        productAnalysis: {
          status: 'completed',
          data: result
        },
        progress: {
          ...state.progress,
          agentProgress: {
            ...state.progress.agentProgress,
            product: 100
          }
        }
      };
    } catch (error) {
      logger.error('❌ Product analysis failed:', error);
      return {
        productAnalysis: {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  private async placeAnalysisNode(state: BiteBaseStateType): Promise<Partial<BiteBaseStateType>> {
    try {
      logger.info('📍 Starting place analysis...');
      
      const result = await this.placeAgent.analyze(state.parameters);
      
      return {
        placeAnalysis: {
          status: 'completed',
          data: result
        },
        progress: {
          ...state.progress,
          agentProgress: {
            ...state.progress.agentProgress,
            place: 100
          }
        }
      };
    } catch (error) {
      logger.error('❌ Place analysis failed:', error);
      return {
        placeAnalysis: {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  private async priceAnalysisNode(state: BiteBaseStateType): Promise<Partial<BiteBaseStateType>> {
    try {
      logger.info('💰 Starting price analysis...');
      
      const result = await this.priceAgent.analyze(state.parameters, state.productAnalysis.data);
      
      return {
        priceAnalysis: {
          status: 'completed',
          data: result
        },
        progress: {
          ...state.progress,
          agentProgress: {
            ...state.progress.agentProgress,
            price: 100
          }
        }
      };
    } catch (error) {
      logger.error('❌ Price analysis failed:', error);
      return {
        priceAnalysis: {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  private async promotionAnalysisNode(state: BiteBaseStateType): Promise<Partial<BiteBaseStateType>> {
    try {
      logger.info('📢 Starting promotion analysis...');
      
      const result = await this.promotionAgent.analyze(state.parameters);
      
      return {
        promotionAnalysis: {
          status: 'completed',
          data: result
        },
        progress: {
          ...state.progress,
          agentProgress: {
            ...state.progress.agentProgress,
            promotion: 100
          }
        }
      };
    } catch (error) {
      logger.error('❌ Promotion analysis failed:', error);
      return {
        promotionAnalysis: {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  private async reportGenerationNode(state: BiteBaseStateType): Promise<Partial<BiteBaseStateType>> {
    try {
      logger.info('📋 Starting report generation...');
      
      const result = await this.reportAgent.generateReport({
        product: state.productAnalysis.data,
        place: state.placeAnalysis.data,
        price: state.priceAnalysis.data,
        promotion: state.promotionAnalysis.data
      });
      
      return {
        reportGeneration: {
          status: 'completed',
          data: result
        },
        progress: {
          ...state.progress,
          agentProgress: {
            ...state.progress.agentProgress,
            report: 100
          },
          status: 'completed'
        }
      };
    } catch (error) {
      logger.error('❌ Report generation failed:', error);
      return {
        reportGeneration: {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  async conductResearch(sessionId: string, parameters: any): Promise<BiteBaseStateType> {
    logger.info(`🚀 Starting research for session: ${sessionId}`);
    
    // Create initial state
    const initialState: BiteBaseStateType = {
      sessionId,
      parameters,
      progress: {
        currentAgent: 'initializing',
        overallProgress: 0,
        agentProgress: {
          product: 0,
          place: 0,
          price: 0,
          promotion: 0,
          report: 0
        },
        status: 'initializing',
        startTime: new Date()
      },
      productAnalysis: { status: 'pending' },
      placeAnalysis: { status: 'pending' },
      priceAnalysis: { status: 'pending' },
      promotionAnalysis: { status: 'pending' },
      reportGeneration: { status: 'pending' },
      messages: [],
      errors: [],
      lastUpdate: new Date(),
      subscribers: []
    };
    
    // Store session
    this.activeSessions.set(sessionId, initialState);
    
    try {
      // Execute the workflow
      const finalState = await this.workflow.invoke(initialState);
      
      // Update stored session
      this.activeSessions.set(sessionId, finalState);
      
      logger.info(`✅ Research completed for session: ${sessionId}`);
      return finalState;
      
    } catch (error) {
      logger.error(`❌ Research failed for session ${sessionId}:`, error);
      
      const errorState: BiteBaseStateType = {
        ...initialState,
        progress: {
          ...initialState.progress,
          status: 'error'
        },
        errors: [{
          agent: 'supervisor',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date(),
          recovered: false
        }]
      };
      
      this.activeSessions.set(sessionId, errorState);
      throw error;
    }
  }

  async pauseResearch(sessionId: string): Promise<void> {
    const state = this.activeSessions.get(sessionId);
    if (state) {
      state.progress.status = 'paused';
      logger.info(`⏸️ Research paused for session: ${sessionId}`);
    }
  }

  async resumeResearch(sessionId: string): Promise<void> {
    const state = this.activeSessions.get(sessionId);
    if (state && state.progress.status === 'paused') {
      state.progress.status = 'running';
      logger.info(`▶️ Research resumed for session: ${sessionId}`);
    }
  }

  async stopResearch(sessionId: string): Promise<void> {
    const state = this.activeSessions.get(sessionId);
    if (state) {
      state.progress.status = 'error';
      logger.info(`🛑 Research stopped for session: ${sessionId}`);
    }
  }

  getSessionState(sessionId: string): BiteBaseStateType | undefined {
    return this.activeSessions.get(sessionId);
  }

  getActiveSessions(): string[] {
    return Array.from(this.activeSessions.keys());
  }

  async cleanupSession(sessionId: string): Promise<void> {
    this.activeSessions.delete(sessionId);
    logger.info(`🧹 Cleaned up session: ${sessionId}`);
  }
}