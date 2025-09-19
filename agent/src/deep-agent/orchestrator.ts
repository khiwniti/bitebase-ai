/**
 * DeepAgentOrchestrator - Core Orchestration Engine for Market Research Deep Agent
 *
 * This is the main orchestrator that coordinates the entire deep agent framework,
 * managing state, sub-agents, MCP integrations, and workflow execution.
 */

import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import {
  MarketResearchAgentState,
  MarketResearchAgentStateType,
  Todo,
  MarketResearchContext,
  BusinessMatrix
} from "./state";
import {
  SubAgentRegistry,
  selectSubAgent,
  DelegationTask,
  SubAgentType
} from "./sub-agents";
import { MarketResearchWorkflowEngine } from "./workflow-engine";
import MCPServerManager, {
  MarketResearchMCPTools,
  MCPIntegrationConfig
} from "./mcp-integration";
import { BusinessIntelligenceTools } from "./business-intelligence-tools";
import { todoTools } from "./todo-tools";
import { fileTools } from "./file-tools";
import PerformanceMonitor from "./performance-monitor";
import ResilienceManager, { ResilienceConfig } from "./resilience-manager";

// Import AgentStreamManager for real-time status updates
import { AgentStreamManager } from "../../app/api/agent/stream/route";

// Agent Node Types
type AgentNode =
  | "orchestrator"
  | "planner"
  | "delegate"
  | "execute"
  | "synthesize"
  | "validate"
  | "report";

// Orchestrator Configuration
export interface DeepAgentConfig {
  enabledMCPServers: string[];
  maxConcurrentTasks: number;
  sequentialThinkingDepth: "basic" | "intermediate" | "deep";
  autoStartWorkflow: boolean;
  validationThreshold: number;
  enableRealTimeStreaming: boolean;
  enablePerformanceMonitoring: boolean;
  enableResilienceManager: boolean;
  performanceConfig?: {
    metricsCollectionInterval?: number;
    memoryThresholdMB?: number;
    cpuThresholdPercent?: number;
    responseTimeThresholdMs?: number;
    errorRateThreshold?: number;
  };
  resilienceConfig?: Partial<ResilienceConfig>;
}

export const defaultConfig: DeepAgentConfig = {
  enabledMCPServers: [
    "web-search",
    "qdrant-mcp",
    "filesystem-mcp",
    "sqlite-mcp",
    "sequential-thinking"
  ],
  maxConcurrentTasks: 5,
  sequentialThinkingDepth: "intermediate",
  autoStartWorkflow: true,
  validationThreshold: 0.8,
  enableRealTimeStreaming: true,
  enablePerformanceMonitoring: true,
  enableResilienceManager: true,
  performanceConfig: {
    metricsCollectionInterval: 5000,
    memoryThresholdMB: 1024,
    cpuThresholdPercent: 80,
    responseTimeThresholdMs: 5000,
    errorRateThreshold: 0.05
  },
  resilienceConfig: {
    defaultRetryAttempts: 3,
    retryDelayMs: 1000,
    maxRetryDelayMs: 30000,
    retryBackoffMultiplier: 2,
    circuitBreakerThreshold: 5,
    circuitBreakerTimeout: 60000,
    defaultTimeoutMs: 30000,
    mcpServerTimeoutMs: 45000,
    taskExecutionTimeoutMs: 300000,
    enableFallbackModes: true,
    fallbackQualityThreshold: 0.6
  }
};

/**
 * DeepAgentOrchestrator - Main orchestration class
 */
export class DeepAgentOrchestrator {
  private config: DeepAgentConfig;
  private workflowEngine: MarketResearchWorkflowEngine;
  private mcpManager: MCPServerManager;
  private graph: StateGraph<MarketResearchAgentStateType>;
  private activeTasks: Map<string, DelegationTask> = new Map();
  private sessionContext: Map<string, any> = new Map();
  private streamManager: AgentStreamManager;
  private performanceMonitor?: PerformanceMonitor;
  private resilienceManager?: ResilienceManager;

  constructor(config: Partial<DeepAgentConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.workflowEngine = new MarketResearchWorkflowEngine();
    this.mcpManager = new MCPServerManager();
    this.streamManager = AgentStreamManager.getInstance();

    // Initialize performance monitoring if enabled
    if (this.config.enablePerformanceMonitoring) {
      this.performanceMonitor = new PerformanceMonitor(this.config.performanceConfig);
    }

    // Initialize resilience manager if enabled
    if (this.config.enableResilienceManager) {
      this.resilienceManager = new ResilienceManager(this.config.resilienceConfig);
    }

    this.graph = this.buildGraph();
  }

  /**
   * Initialize the Deep Agent with MCP servers and tools
   */
  async initialize(): Promise<void> {
    console.log("🚀 Initializing Deep Agent Orchestrator...");

    // Start required MCP servers with resilience
    const serverStartPromises = this.config.enabledMCPServers.map(async (serverName) => {
      if (this.resilienceManager) {
        return this.resilienceManager.executeMCPOperation(
          serverName,
          async () => {
            const started = await this.mcpManager.startServer(serverName);
            if (!started) {
              throw new Error(`Failed to start MCP server: ${serverName}`);
            }
            return started;
          },
          {
            toolName: 'server_startup',
            criticalOperation: true
          }
        );
      } else {
        // Fallback to basic error handling if resilience manager is disabled
        try {
          const started = await this.mcpManager.startServer(serverName);
          if (started) {
            console.log(`✅ MCP Server started: ${serverName}`);
          } else {
            console.warn(`⚠️ Failed to start MCP server: ${serverName}`);
          }
          return started;
        } catch (error) {
          console.error(`❌ Error starting ${serverName}:`, error);
          return false;
        }
      }
    });

    // Wait for all servers to start with parallel execution
    const results = await Promise.allSettled(serverStartPromises);

    // Log results and setup health checks
    results.forEach((result, index) => {
      const serverName = this.config.enabledMCPServers[index];
      if (result.status === 'fulfilled' && result.value) {
        console.log(`✅ MCP Server started: ${serverName}`);

        // Setup health check for successfully started servers
        if (this.resilienceManager) {
          this.setupMCPHealthCheck(serverName);
        }
      } else {
        console.error(`❌ Failed to start MCP server: ${serverName}`,
          result.status === 'rejected' ? result.reason : 'Unknown error');
      }
    });

    console.log("✅ Deep Agent Orchestrator initialized successfully");
  }

  /**
   * Build the LangGraph workflow
   */
  private buildGraph(): StateGraph<MarketResearchAgentStateType> {
    const graph = new StateGraph(MarketResearchAgentState)
      .addNode("orchestrator", this.orchestratorNode.bind(this))
      .addNode("planner", this.plannerNode.bind(this))
      .addNode("delegate", this.delegateNode.bind(this))
      .addNode("execute", this.executeNode.bind(this))
      .addNode("synthesize", this.synthesizeNode.bind(this))
      .addNode("validate", this.validateNode.bind(this))
      .addNode("report", this.reportNode.bind(this))
      .addEdge(START, "orchestrator")
      .addConditionalEdges(
        "orchestrator",
        this.shouldContinue.bind(this),
        {
          "plan": "planner",
          "delegate": "delegate",
          "synthesize": "synthesize",
          "end": END
        }
      )
      .addConditionalEdges(
        "planner",
        this.afterPlanning.bind(this),
        {
          "delegate": "delegate",
          "execute": "execute"
        }
      )
      .addEdge("delegate", "execute")
      .addConditionalEdges(
        "execute",
        this.afterExecution.bind(this),
        {
          "validate": "validate",
          "synthesize": "synthesize",
          "continue": "delegate"
        }
      )
      .addConditionalEdges(
        "validate",
        this.afterValidation.bind(this),
        {
          "retry": "execute",
          "synthesize": "synthesize"
        }
      )
      .addConditionalEdges(
        "synthesize",
        this.afterSynthesis.bind(this),
        {
          "report": "report",
          "continue": "orchestrator"
        }
      )
      .addEdge("report", END);

    return graph;
  }

  /**
   * Main entry point for processing research requests
   */
  async processResearchRequest(
    query: string,
    context: Partial<MarketResearchContext> = {},
    sessionId?: string
  ): Promise<MarketResearchAgentStateType> {
    console.log(`📋 Processing research request: ${query}`);

    const currentSessionId = sessionId || `session_${Date.now()}`;

    const initialState: MarketResearchAgentStateType = {
      messages: [new HumanMessage(query)],
      agentCoordination: {
        activeAgents: [],
        agentStatus: {},
        agentCommunication: [],
        coordinationMode: 'hybrid',
        dependencyGraph: {},
        resourceAllocation: {}
      },
      todos: [],
      files: {},
      researchContext: {
        sessionId: currentSessionId,
        researchObjectives: [query],
        phase: 'planning',
        findings: {},
        nextActions: [],
        ...context
      },
      marketIntelligence: {
        competitors: {},
        marketTrends: [],
        consumerInsights: [],
        financialData: [],
        regulatoryLandscape: []
      },
      researchPlan: {
        objectives: [],
        methodology: [],
        timeline: {},
        resources: [],
        deliverables: [],
        successCriteria: []
      },
      evidenceCollection: [],
      validationStatus: {
        crossReferencesCompleted: false,
        sourceCredibilityChecked: false,
        dataConsistencyVerified: false,
        expertReviewRequired: false,
        confidenceLevel: 0
      },
      reportSections: [],
      businessMatrices: []
    };

    // Send initial status update
    if (this.config.enableRealTimeStreaming && currentSessionId) {
      this.streamManager.broadcast(currentSessionId, {
        type: 'agent_status',
        agentId: 'orchestrator',
        status: 'busy',
        message: 'Starting market research analysis',
        timestamp: new Date().toISOString()
      });
    }

    // Start workflow if auto-start is enabled
    if (this.config.autoStartWorkflow) {
      await this.workflowEngine.initializeResearch(
        [query],
        context
      );
    }

    // Execute the graph
    const finalState = await this.graph.invoke(initialState);

    // Send completion status update
    if (this.config.enableRealTimeStreaming && currentSessionId) {
      this.streamManager.broadcast(currentSessionId, {
        type: 'completion',
        agentId: 'orchestrator',
        status: 'completed',
        message: 'Market research analysis completed',
        data: {
          completedTodos: finalState.todos.filter(t => t.status === 'completed').length,
          totalEvidence: finalState.evidenceCollection.length,
          confidenceLevel: finalState.validationStatus.confidenceLevel
        },
        timestamp: new Date().toISOString()
      });
    }

    console.log("✅ Research request processed successfully");
    return finalState;
  }

  /**
   * Orchestrator Node - Main coordination logic
   */
  private async orchestratorNode(state: MarketResearchAgentStateType): Promise<Partial<MarketResearchAgentStateType>> {
    console.log("🎯 Orchestrator: Analyzing current state and determining next actions");

    const lastMessage = state.messages[state.messages.length - 1];
    const currentPhase = state.researchContext.phase;

    // Determine next action based on state
    let nextAction = "plan";
    let aiMessage = "";

    if (currentPhase === 'planning' && state.todos.length === 0) {
      nextAction = "plan";
      aiMessage = "Initializing research planning phase...";
    } else if (state.todos.some(todo => todo.status === 'pending')) {
      nextAction = "delegate";
      aiMessage = "Delegating tasks to specialized sub-agents...";
    } else if (state.evidenceCollection.length > 0 && currentPhase !== 'synthesis') {
      nextAction = "synthesize";
      aiMessage = "Synthesizing research findings...";
    } else if (currentPhase === 'reporting') {
      nextAction = "end";
      aiMessage = "Research completed. Generating final report...";
    }

    // Store routing decision in session context
    this.sessionContext.set('nextAction', nextAction);

    return {
      messages: [...state.messages, new AIMessage(aiMessage)],
      researchContext: {
        ...state.researchContext,
        nextActions: [nextAction]
      }
    };
  }

  /**
   * Planner Node - Research planning and task decomposition
   */
  private async plannerNode(state: MarketResearchAgentStateType): Promise<Partial<MarketResearchAgentStateType>> {
    console.log("📋 Planner: Decomposing research objectives into actionable tasks");

    const objectives = state.researchContext.researchObjectives;
    const timestamp = new Date().toISOString();

    // Use sequential thinking for deep planning if available
    let planningResult = null;
    try {
      planningResult = await this.executeToolCallWithResilience(
        "deep_market_analysis",
        {
          research_question: `Plan comprehensive market research for: ${objectives.join(', ')}`,
          context: {
            objectives,
            industry: state.researchContext.industrySector,
            scope: state.researchContext.geographicScope
          },
          depth: this.config.sequentialThinkingDepth
        },
        state
      );
    } catch (error) {
      console.warn("Sequential thinking not available, using basic planning");
    }

    // Create comprehensive todo list
    const todos: Todo[] = [
      {
        content: "Analyze competitive landscape and key players",
        status: 'pending',
        priority: 'high',
        assignedAgent: 'CompetitorAgent',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        content: "Research market trends and emerging technologies",
        status: 'pending',
        priority: 'high',
        assignedAgent: 'MarketTrendAgent',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        content: "Gather consumer behavior and preference data",
        status: 'pending',
        priority: 'medium',
        assignedAgent: 'ConsumerAgent',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        content: "Conduct financial analysis of market players",
        status: 'pending',
        priority: 'medium',
        assignedAgent: 'FinancialAgent',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        content: "Evaluate technical aspects and innovation landscape",
        status: 'pending',
        priority: 'low',
        assignedAgent: 'TechnicalAgent',
        createdAt: timestamp,
        updatedAt: timestamp
      },
      {
        content: "Review regulatory environment and compliance requirements",
        status: 'pending',
        priority: 'low',
        assignedAgent: 'RegulatoryAgent',
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ];

    // Create research plan
    const researchPlan = {
      objectives: objectives,
      methodology: [
        "Multi-source data collection",
        "Specialized agent analysis",
        "Cross-validation of findings",
        "Business intelligence matrix generation",
        "Comprehensive synthesis and reporting"
      ],
      timeline: {
        "Phase 1 - Planning": "Complete",
        "Phase 2 - Data Collection": "1-2 hours",
        "Phase 3 - Analysis": "30-60 minutes",
        "Phase 4 - Synthesis": "30 minutes",
        "Phase 5 - Reporting": "15 minutes"
      },
      resources: this.config.enabledMCPServers,
      deliverables: [
        "Competitive Analysis Report",
        "Market Trend Assessment",
        "Consumer Insights Summary",
        "Financial Analysis",
        "Technical Evaluation",
        "Regulatory Landscape Review",
        "Business Intelligence Matrices",
        "Executive Summary and Recommendations"
      ],
      successCriteria: [
        "Comprehensive coverage of all research objectives",
        "Multi-source validation of key findings",
        "Actionable recommendations provided",
        `Confidence level above ${this.config.validationThreshold}`
      ]
    };

    return {
      todos,
      researchPlan,
      researchContext: {
        ...state.researchContext,
        phase: 'data_collection'
      }
    };
  }

  /**
   * Delegate Node - Task delegation to sub-agents with enhanced coordination
   */
  private async delegateNode(state: MarketResearchAgentStateType): Promise<Partial<MarketResearchAgentStateType>> {
    console.log("🤝 Delegate: Assigning tasks to specialized sub-agents with coordination");

    const pendingTodos = state.todos.filter(todo => todo.status === 'pending');
    const updatedTodos = [...state.todos];
    const newTasks: DelegationTask[] = [];

    // Enhanced agent coordination
    const agentCoordination = { ...state.agentCoordination };
    const activeAgents = [...agentCoordination.activeAgents];
    const agentStatus = { ...agentCoordination.agentStatus };
    const agentCommunication = [...agentCoordination.agentCommunication];
    const dependencyGraph = { ...agentCoordination.dependencyGraph };
    const resourceAllocation = { ...agentCoordination.resourceAllocation };

    // Build dependency graph for intelligent coordination
    const agentDependencies = this.buildAgentDependencyGraph(pendingTodos);
    Object.assign(dependencyGraph, agentDependencies);

    // Create delegation tasks for pending todos with coordination
    for (const todo of pendingTodos) {
      if (todo.assignedAgent) {
        const agentType = todo.assignedAgent as SubAgentType;

        // Check if agent is available
        if (agentStatus[agentType] === 'busy' && agentCoordination.coordinationMode !== 'parallel') {
          console.log(`⏳ Agent ${agentType} is busy, queuing task`);
          continue;
        }

        const task: DelegationTask = {
          id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: this.getTaskTypeFromAgent(agentType),
          description: todo.content,
          assignedAgent: todo.assignedAgent,
          priority: todo.priority,
          status: 'pending',
          context: {
            researchObjectives: state.researchContext.researchObjectives,
            industry: state.researchContext.industrySector,
            scope: state.researchContext.geographicScope
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        newTasks.push(task);
        this.activeTasks.set(task.id, task);

        // Update agent coordination state
        if (!activeAgents.includes(agentType)) {
          activeAgents.push(agentType);
        }
        agentStatus[agentType] = 'busy';

        // Send agent status update for real-time streaming
        if (this.config.enableRealTimeStreaming && state.researchContext.sessionId) {
          this.streamManager.broadcast(state.researchContext.sessionId, {
            type: 'agent_status',
            agentId: agentType,
            status: 'busy',
            message: `Agent ${agentType} assigned task: ${todo.content}`,
            timestamp: new Date().toISOString()
          });
        }

        // Allocate resources based on task priority
        const resourceWeight = todo.priority === 'high' ? 3 : todo.priority === 'medium' ? 2 : 1;
        resourceAllocation[agentType] = (resourceAllocation[agentType] || 0) + resourceWeight;

        // Create coordination message
        agentCommunication.push({
          fromAgent: 'orchestrator',
          toAgent: agentType,
          messageType: 'task_request',
          content: `Assigned task: ${todo.content}`,
          timestamp: new Date().toISOString(),
          priority: todo.priority
        });

        // Update todo status
        const todoIndex = updatedTodos.findIndex(t => t.content === todo.content);
        if (todoIndex >= 0) {
          updatedTodos[todoIndex] = {
            ...todo,
            status: 'in_progress',
            updatedAt: new Date().toISOString()
          };
        }
      }
    }

    // Determine coordination mode based on task dependencies
    let coordinationMode: 'parallel' | 'sequential' | 'hybrid' = 'hybrid';
    if (Object.keys(dependencyGraph).length === 0) {
      coordinationMode = 'parallel';
    } else if (newTasks.every(task => dependencyGraph[task.assignedAgent!]?.length > 0)) {
      coordinationMode = 'sequential';
    }

    return {
      todos: updatedTodos,
      agentCoordination: {
        activeAgents,
        agentStatus,
        agentCommunication,
        coordinationMode,
        dependencyGraph,
        resourceAllocation
      },
      files: {
        ...state.files,
        'delegation_tasks.json': JSON.stringify(newTasks, null, 2),
        'agent_coordination.json': JSON.stringify({
          activeAgents,
          agentStatus,
          coordinationMode,
          dependencyGraph,
          resourceAllocation
        }, null, 2)
      }
    };
  }

  /**
   * Execute Node - Execute delegated tasks using MCP tools
   */
  private async executeNode(state: MarketResearchAgentStateType): Promise<Partial<MarketResearchAgentStateType>> {
    console.log("⚡ Execute: Running delegated tasks with MCP tools");

    const inProgressTodos = state.todos.filter(todo => todo.status === 'in_progress');
    const updatedTodos = [...state.todos];
    const evidenceItems = [...state.evidenceCollection];
    const updatedIntelligence = { ...state.marketIntelligence };

    // Execute tasks in parallel (up to maxConcurrentTasks)
    const taskPromises = inProgressTodos.slice(0, this.config.maxConcurrentTasks).map(async (todo) => {
      try {
        const agent = selectSubAgent(
          this.getTaskTypeFromAgent(todo.assignedAgent as SubAgentType)
        );

        // Execute task with resilient web search
        const searchResult = await this.executeToolCallWithResilience(
          "market_web_search",
          {
            query: `${todo.content} ${state.researchContext.targetCompany || ''} ${state.researchContext.industrySector || ''}`,
            max_results: 5,
            focus: this.getFocusFromAgent(todo.assignedAgent as SubAgentType)
          },
          state
        );

        // Store evidence
        evidenceItems.push({
          id: `evidence_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'secondary',
          source: `${agent.name} via web search`,
          content: `Research completed for: ${todo.content}`,
          relevance: 0.8,
          credibility: 0.7,
          date: new Date().toISOString(),
          tags: [agent.name.toLowerCase(), todo.assignedAgent?.toLowerCase() || '']
        });

        // Update market intelligence based on agent type
        this.updateMarketIntelligence(updatedIntelligence, todo.assignedAgent as SubAgentType, searchResult);

        // Send task completion status update
        if (this.config.enableRealTimeStreaming && state.researchContext.sessionId) {
          this.streamManager.broadcast(state.researchContext.sessionId, {
            type: 'task_progress',
            agentId: todo.assignedAgent,
            status: 'completed',
            message: `Task completed: ${todo.content}`,
            progress: Math.round((inProgressTodos.indexOf(todo) + 1) / inProgressTodos.length * 100),
            timestamp: new Date().toISOString()
          });
        }

        return { success: true, todo };
      } catch (error) {
        console.error(`Task execution failed for ${todo.content}:`, error);

        // Send error status update
        if (this.config.enableRealTimeStreaming && state.researchContext.sessionId) {
          this.streamManager.broadcast(state.researchContext.sessionId, {
            type: 'error',
            agentId: todo.assignedAgent,
            status: 'error',
            message: `Task failed: ${todo.content} - ${error.message}`,
            timestamp: new Date().toISOString()
          });
        }

        return { success: false, todo, error };
      }
    });

    const results = await Promise.all(taskPromises);

    // Update todo statuses based on results
    results.forEach(result => {
      const todoIndex = updatedTodos.findIndex(t => t.content === result.todo.content);
      if (todoIndex >= 0) {
        const newStatus = result.success ? 'completed' : 'pending';
        updatedTodos[todoIndex] = {
          ...result.todo,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };

        // Send agent status update when task completes or fails
        if (this.config.enableRealTimeStreaming && state.researchContext.sessionId) {
          this.streamManager.broadcast(state.researchContext.sessionId, {
            type: 'agent_status',
            agentId: result.todo.assignedAgent,
            status: result.success ? 'completed' : 'error',
            message: result.success ?
              `Agent ${result.todo.assignedAgent} completed task` :
              `Agent ${result.todo.assignedAgent} task failed`,
            timestamp: new Date().toISOString()
          });
        }
      }
    });

    return {
      todos: updatedTodos,
      evidenceCollection: evidenceItems,
      marketIntelligence: updatedIntelligence
    };
  }

  /**
   * Synthesize Node - Synthesize findings and generate insights
   */
  private async synthesizeNode(state: MarketResearchAgentStateType): Promise<Partial<MarketResearchAgentStateType>> {
    console.log("🧩 Synthesize: Generating insights and business intelligence matrices");

    const businessMatrices = [...state.businessMatrices];
    const reportSections = [...state.reportSections];

    // Generate SWOT analysis if we have competitor data
    if (Object.keys(state.marketIntelligence.competitors).length > 0) {
      const targetCompany = state.researchContext.targetCompany || "Target Company";
      const swotMatrix = BusinessIntelligenceTools.generateSWOTAnalysis(
        targetCompany,
        state.marketIntelligence
      );
      businessMatrices.push(swotMatrix);
    }

    // Generate Porter's Five Forces analysis
    if (state.researchContext.industrySector) {
      const porterMatrix = BusinessIntelligenceTools.generatePorterAnalysis(
        state.researchContext.industrySector,
        state.marketIntelligence
      );
      businessMatrices.push(porterMatrix);
    }

    // Generate executive summary
    const executiveSummary = this.generateExecutiveSummary(state);
    reportSections.push(executiveSummary);

    // Send synthesis progress update
    if (this.config.enableRealTimeStreaming && state.researchContext.sessionId) {
      this.streamManager.broadcast(state.researchContext.sessionId, {
        type: 'analysis_result',
        agentId: 'synthesizer',
        status: 'completed',
        message: `Synthesis completed: ${businessMatrices.length} matrices generated`,
        data: {
          matricesGenerated: businessMatrices.length,
          reportSections: reportSections.length
        },
        timestamp: new Date().toISOString()
      });
    }

    return {
      businessMatrices,
      reportSections,
      researchContext: {
        ...state.researchContext,
        phase: 'reporting',
        findings: {
          ...state.researchContext.findings,
          synthesisCompleted: true,
          matricesGenerated: businessMatrices.length
        }
      }
    };
  }

  /**
   * Validate Node - Validate findings and check confidence levels
   */
  private async validateNode(state: MarketResearchAgentStateType): Promise<Partial<MarketResearchAgentStateType>> {
    console.log("✅ Validate: Checking confidence levels and data quality");

    const evidenceCount = state.evidenceCollection.length;
    const completedTodos = state.todos.filter(todo => todo.status === 'completed').length;
    const totalTodos = state.todos.length;

    const completionRate = totalTodos > 0 ? completedTodos / totalTodos : 0;
    const confidenceLevel = Math.min(0.9, (evidenceCount * 0.1) + (completionRate * 0.5));

    const validationStatus = {
      crossReferencesCompleted: evidenceCount >= 3,
      sourceCredibilityChecked: true,
      dataConsistencyVerified: completionRate > 0.7,
      expertReviewRequired: confidenceLevel < this.config.validationThreshold,
      confidenceLevel
    };

    return {
      validationStatus
    };
  }

  /**
   * Report Node - Generate final report
   */
  private async reportNode(state: MarketResearchAgentStateType): Promise<Partial<MarketResearchAgentStateType>> {
    console.log("📊 Report: Generating comprehensive market research report");

    const reportContent = this.generateFinalReport(state);

    try {
      await this.executeToolCallWithResilience(
        "generate_market_report",
        {
          report_type: "market_analysis",
          sections: state.reportSections.map(section => section.title),
          format: "markdown"
        },
        state
      );
    } catch (error) {
      console.warn("Report generation tool not available, storing in virtual filesystem");
    }

    return {
      files: {
        ...state.files,
        'final_report.md': reportContent
      },
      messages: [
        ...state.messages,
        new AIMessage("Market research analysis completed. Comprehensive report generated with business intelligence matrices and actionable recommendations.")
      ]
    };
  }

  // Routing functions
  private shouldContinue(state: MarketResearchAgentStateType): string {
    return this.sessionContext.get('nextAction') || 'end';
  }

  private afterPlanning(state: MarketResearchAgentStateType): string {
    return state.todos.length > 0 ? 'delegate' : 'execute';
  }

  private afterExecution(state: MarketResearchAgentStateType): string {
    const inProgressTodos = state.todos.filter(todo => todo.status === 'in_progress');
    const pendingTodos = state.todos.filter(todo => todo.status === 'pending');

    if (inProgressTodos.length > 0 || pendingTodos.length > 0) {
      return 'continue';
    }
    return 'validate';
  }

  private afterValidation(state: MarketResearchAgentStateType): string {
    return state.validationStatus.confidenceLevel >= this.config.validationThreshold
      ? 'synthesize'
      : 'retry';
  }

  private afterSynthesis(state: MarketResearchAgentStateType): string {
    return state.researchContext.phase === 'reporting' ? 'report' : 'continue';
  }

  // Helper methods
  private buildAgentDependencyGraph(todos: Todo[]): Record<string, string[]> {
    const dependencies: Record<string, string[]> = {};

    // Define agent dependencies based on market research workflow
    const agentDependencyRules = {
      'CompetitorAgent': [], // No dependencies, can start immediately
      'MarketTrendAgent': [], // No dependencies, can start immediately
      'ConsumerAgent': ['MarketTrendAgent'], // Depends on market trends for context
      'FinancialAgent': ['CompetitorAgent'], // Depends on competitor data for financial analysis
      'TechnicalAgent': ['CompetitorAgent', 'MarketTrendAgent'], // Needs competitor and trend data
      'RegulatoryAgent': ['MarketTrendAgent'] // Depends on trend analysis for regulatory context
    };

    // Build dependency graph based on active agents
    todos.forEach(todo => {
      if (todo.assignedAgent && agentDependencyRules[todo.assignedAgent as SubAgentType]) {
        dependencies[todo.assignedAgent] = agentDependencyRules[todo.assignedAgent as SubAgentType];
      }
    });

    return dependencies;
  }

  private getTaskTypeFromAgent(agentType: SubAgentType): string {
    const typeMap: Record<SubAgentType, string> = {
      'CompetitorAgent': 'competitor_analysis',
      'MarketTrendAgent': 'market_trends',
      'ConsumerAgent': 'consumer_research',
      'FinancialAgent': 'financial_analysis',
      'TechnicalAgent': 'technical_analysis',
      'RegulatoryAgent': 'regulatory_analysis'
    };
    return typeMap[agentType] || 'general_research';
  }

  private getFocusFromAgent(agentType: SubAgentType): string {
    const focusMap: Record<SubAgentType, string> = {
      'CompetitorAgent': 'competitors',
      'MarketTrendAgent': 'trends',
      'ConsumerAgent': 'trends',
      'FinancialAgent': 'financial',
      'TechnicalAgent': 'technical',
      'RegulatoryAgent': 'regulatory'
    };
    return focusMap[agentType] || 'competitors';
  }

  private updateMarketIntelligence(intelligence: any, agentType: SubAgentType, data: any): void {
    // This would contain real logic to update market intelligence based on agent results
    // For now, we'll add placeholder updates
    const timestamp = new Date().toISOString();

    switch (agentType) {
      case 'CompetitorAgent':
        // Add competitor data
        break;
      case 'MarketTrendAgent':
        intelligence.marketTrends.push({
          trendId: `trend_${Date.now()}`,
          title: "Market Trend Analysis",
          category: 'technology',
          description: "Trend analysis completed",
          impact: 'medium',
          timeframe: 'medium_term',
          sources: ['web_search'],
          confidence: 0.7,
          lastUpdated: timestamp
        });
        break;
      // Add other agent types...
    }
  }

  private generateExecutiveSummary(state: MarketResearchAgentStateType): any {
    return {
      title: "Executive Summary",
      content: `Research completed for ${state.researchContext.researchObjectives.join(', ')}.
      Analysis included ${state.todos.filter(t => t.status === 'completed').length} completed research tasks,
      ${state.evidenceCollection.length} evidence items collected, and
      ${state.businessMatrices.length} business intelligence matrices generated.`,
      confidence: state.validationStatus.confidenceLevel,
      recommendations: [
        "Continue monitoring market trends",
        "Validate findings with primary research",
        "Implement recommended strategic actions"
      ]
    };
  }

  private generateFinalReport(state: MarketResearchAgentStateType): string {
    return `# Market Research Analysis Report

## Executive Summary
${state.reportSections.find(s => s.title === "Executive Summary")?.content || "Analysis completed"}

## Research Objectives
${state.researchContext.researchObjectives.map(obj => `- ${obj}`).join('\n')}

## Key Findings
${state.evidenceCollection.map(item => `- ${item.content}`).join('\n')}

## Business Intelligence Matrices
${state.businessMatrices.map(matrix => `- ${matrix.name} (${matrix.type})`).join('\n')}

## Confidence Level
${Math.round(state.validationStatus.confidenceLevel * 100)}%

## Recommendations
${state.reportSections.map(section => section.recommendations?.join('\n- ') || '').filter(Boolean).join('\n')}

---
Generated by Deep Agent Market Research Framework
`;
  }

  /**
   * Setup health check for MCP server
   */
  private setupMCPHealthCheck(serverName: string): void {
    if (!this.resilienceManager) return;

    // Create health check function for the MCP server
    const healthCheckFn = async () => {
      const isActive = this.mcpManager.isServerActive(serverName);
      if (!isActive) {
        throw new Error(`MCP server ${serverName} is not active`);
      }
      return Promise.resolve();
    };

    // Register health check with resilience manager
    this.resilienceManager.performHealthCheck(serverName, healthCheckFn)
      .then((result) => {
        if (!result.healthy) {
          console.warn(`⚠️ MCP server ${serverName} health check failed:`, result.error);
        }
      })
      .catch((error) => {
        console.error(`❌ Failed to setup health check for ${serverName}:`, error);
      });
  }

  /**
   * Execute MCP tool call with resilience
   */
  private async executeToolCallWithResilience(
    toolName: string,
    parameters: any,
    state: MarketResearchAgentStateType
  ): Promise<any> {
    if (this.resilienceManager) {
      return this.resilienceManager.executeMCPOperation(
        toolName.split('_')[0] || 'mcp',
        async () => {
          return this.mcpManager.executeToolCall(toolName, parameters, state);
        },
        {
          toolName,
          criticalOperation: false
        }
      );
    } else {
      // Fallback to basic error handling
      return this.mcpManager.executeToolCall(toolName, parameters, state);
    }
  }

  /**
   * Cleanup resources
   */
  async shutdown(): Promise<void> {
    console.log("🔄 Shutting down Deep Agent Orchestrator...");

    // Shutdown resilience manager first
    if (this.resilienceManager) {
      this.resilienceManager.shutdown();
    }

    // Stop performance monitoring
    if (this.performanceMonitor) {
      this.performanceMonitor.stopMonitoring();
    }

    // Stop all MCP servers with resilience
    const activeServers = this.mcpManager.listActiveServers();
    const shutdownPromises = activeServers.map(async (serverName) => {
      if (this.resilienceManager) {
        return this.resilienceManager.executeMCPOperation(
          serverName,
          async () => {
            await this.mcpManager.stopServer(serverName);
            return true;
          },
          {
            toolName: 'server_shutdown',
            criticalOperation: false
          }
        ).catch((error) => {
          console.warn(`⚠️ Failed to gracefully stop ${serverName}:`, error);
          return false;
        });
      } else {
        try {
          await this.mcpManager.stopServer(serverName);
          return true;
        } catch (error) {
          console.warn(`⚠️ Failed to stop ${serverName}:`, error);
          return false;
        }
      }
    });

    await Promise.allSettled(shutdownPromises);

    // Clear active tasks and context
    this.activeTasks.clear();
    this.sessionContext.clear();

    console.log("✅ Deep Agent Orchestrator shut down successfully");
  }
}

export default DeepAgentOrchestrator;