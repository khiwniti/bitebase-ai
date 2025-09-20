/**
 * Supervisor Agent - Central coordinator for restaurant market research
 * Manages workflow orchestration and task delegation to specialized agents
 */

import { StateGraph } from "@langchain/langgraph";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { MarketResearchAgentStateType } from "../state";
import { RestaurantRequirements, AgentStatus } from "../../../../src/shared/types";

export interface ResearchPlan {
  objectives: string[];
  methodology: string[];
  timeline: Record<string, string>;
  resources: string[];
  deliverables: string[];
  successCriteria: string[];
  agentTasks: Record<string, string[]>;
}

export interface TaskResult {
  agentId: string;
  taskId: string;
  status: 'completed' | 'failed' | 'in_progress';
  data?: any;
  error?: string;
  confidence: number;
}

export class SupervisorAgent {
  private llm: ChatOpenAI;
  private agentStatuses: Map<string, AgentStatus> = new Map();
  private taskQueue: Array<{ agentId: string; task: string; priority: number }> = [];

  constructor() {
    this.llm = new ChatOpenAI({
      model: "gpt-4",
      temperature: 0.1,
    });
  }

  async planResearch(requirements: RestaurantRequirements): Promise<ResearchPlan> {
    const planningPrompt = `
You are a market research supervisor planning comprehensive analysis for a new restaurant venture.

Restaurant Requirements:
- Type: ${requirements.restaurantType}
- Cuisine: ${requirements.cuisineType}
- Location: ${requirements.location}
- Budget Range: $${requirements.budgetRange[0].toLocaleString()} - $${requirements.budgetRange[1].toLocaleString()}
- Target Customers: ${requirements.targetCustomers}
- Business Model: ${requirements.businessModel}

Create a detailed research plan that includes:
1. Clear objectives for each analysis type (Product, Place, Price, Promotion)
2. Methodology for data collection and analysis
3. Timeline for completion
4. Required resources and data sources
5. Expected deliverables
6. Success criteria
7. Specific tasks for each specialized agent

Respond in JSON format with the structure: {
  "objectives": ["..."],
  "methodology": ["..."],
  "timeline": {"phase1": "...", "phase2": "..."},
  "resources": ["..."],
  "deliverables": ["..."],
  "successCriteria": ["..."],
  "agentTasks": {
    "product_agent": ["..."],
    "place_agent": ["..."],
    "price_agent": ["..."],
    "promotion_agent": ["..."]
  }
}
`;

    const response = await this.llm.invoke([new SystemMessage(planningPrompt)]);
    
    try {
      const plan = JSON.parse(response.content as string);
      return plan;
    } catch (error) {
      throw new Error(`Failed to parse research plan: ${error}`);
    }
  }

  async delegateTask(agentId: string, task: string, priority: number = 1): Promise<string> {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.taskQueue.push({ agentId, task, priority });
    this.taskQueue.sort((a, b) => b.priority - a.priority);

    // Update agent status
    this.updateAgentStatus(agentId, {
      agentId,
      agentName: this.getAgentName(agentId),
      status: 'processing',
      currentTask: task,
      progressPercentage: 0,
      substeps: [],
      dataProcessed: 0,
      processingRate: 0,
      errors: [],
      lastUpdate: new Date(),
      userInteractionsPending: []
    });

    return taskId;
  }

  async monitorProgress(): Promise<Record<string, AgentStatus>> {
    const statuses: Record<string, AgentStatus> = {};
    
    for (const [agentId, status] of this.agentStatuses) {
      statuses[agentId] = { ...status };
    }

    return statuses;
  }

  async coordinateReportGeneration(results: TaskResult[]): Promise<any> {
    const completedResults = results.filter(r => r.status === 'completed');
    const failedResults = results.filter(r => r.status === 'failed');

    if (failedResults.length > 0) {
      console.warn(`${failedResults.length} tasks failed. Implementing fallback strategies...`);
      await this.handleFailedTasks(failedResults);
    }

    const reportData = {
      executiveSummary: await this.generateExecutiveSummary(completedResults),
      analysisResults: this.aggregateAnalysisResults(completedResults),
      recommendations: await this.synthesizeRecommendations(completedResults),
      riskAssessment: await this.generateRiskAssessment(completedResults),
      confidence: this.calculateOverallConfidence(completedResults),
      nextSteps: await this.generateNextSteps(completedResults)
    };

    return reportData;
  }

  private updateAgentStatus(agentId: string, status: AgentStatus): void {
    this.agentStatuses.set(agentId, status);
  }

  private getAgentName(agentId: string): string {
    const agentNames: Record<string, string> = {
      'product_agent': 'Product Analysis Agent',
      'place_agent': 'Place Analysis Agent',
      'price_agent': 'Price Analysis Agent',
      'promotion_agent': 'Promotion Analysis Agent',
      'geospatial_agent': 'Geospatial Analysis Agent',
      'report_agent': 'Report Generation Agent'
    };
    return agentNames[agentId] || agentId;
  }

  private async handleFailedTasks(failedResults: TaskResult[]): Promise<void> {
    for (const result of failedResults) {
      console.log(`Implementing fallback for failed task: ${result.taskId}`);
      
      // Implement fallback strategies
      switch (result.agentId) {
        case 'product_agent':
          // Use cached data or simplified analysis
          break;
        case 'place_agent':
          // Use alternative data sources
          break;
        case 'price_agent':
          // Use industry benchmarks
          break;
        case 'promotion_agent':
          // Use template-based recommendations
          break;
      }
    }
  }

  private async generateExecutiveSummary(results: TaskResult[]): Promise<string> {
    const summaryPrompt = `
Based on the following analysis results, generate a comprehensive executive summary for a restaurant market research report:

${results.map(r => `${r.agentId}: ${JSON.stringify(r.data)}`).join('\n')}

The summary should be:
- Concise but comprehensive (2-3 paragraphs)
- Business-focused and actionable
- Highlighting key insights and opportunities
- Written for investors and stakeholders
`;

    const response = await this.llm.invoke([new SystemMessage(summaryPrompt)]);
    return response.content as string;
  }

  private aggregateAnalysisResults(results: TaskResult[]): Record<string, any> {
    const aggregated: Record<string, any> = {};
    
    for (const result of results) {
      aggregated[result.agentId] = result.data;
    }

    return aggregated;
  }

  private async synthesizeRecommendations(results: TaskResult[]): Promise<string[]> {
    const recommendationPrompt = `
Based on the comprehensive market research analysis, provide 5-7 specific, actionable recommendations for the restaurant venture:

Analysis Results:
${results.map(r => `${r.agentId}: ${JSON.stringify(r.data)}`).join('\n')}

Each recommendation should be:
- Specific and actionable
- Prioritized by impact and feasibility
- Backed by the analysis data
- Business-focused

Format as a JSON array of strings.
`;

    const response = await this.llm.invoke([new SystemMessage(recommendationPrompt)]);
    
    try {
      return JSON.parse(response.content as string);
    } catch {
      return [
        "Finalize location selection based on analysis scores",
        "Optimize menu pricing using competitive analysis",
        "Implement targeted marketing strategy",
        "Establish vendor relationships",
        "Complete financial projections and funding requirements"
      ];
    }
  }

  private async generateRiskAssessment(results: TaskResult[]): Promise<string[]> {
    const riskPrompt = `
Identify potential risks and mitigation strategies based on the market research analysis:

Analysis Results:
${results.map(r => `${r.agentId}: ${JSON.stringify(r.data)}`).join('\n')}

Identify 3-5 key risks with mitigation strategies. Format as JSON array of strings.
`;

    const response = await this.llm.invoke([new SystemMessage(riskPrompt)]);
    
    try {
      return JSON.parse(response.content as string);
    } catch {
      return [
        "Market saturation risk - differentiate through unique value proposition",
        "Location risk - ensure foot traffic and accessibility",
        "Financial risk - maintain adequate cash flow reserves",
        "Competition risk - monitor competitor activities and adapt quickly"
      ];
    }
  }

  private calculateOverallConfidence(results: TaskResult[]): number {
    if (results.length === 0) return 0;
    
    const totalConfidence = results.reduce((sum, result) => sum + result.confidence, 0);
    return Math.round(totalConfidence / results.length);
  }

  private async generateNextSteps(results: TaskResult[]): Promise<string[]> {
    return [
      "Review and validate all analysis findings",
      "Develop detailed business plan",
      "Secure necessary permits and licenses",
      "Finalize location lease agreements",
      "Begin vendor and supplier negotiations",
      "Develop marketing and launch strategy",
      "Set up operational systems and processes"
    ];
  }

  // Error handling and recovery
  async handleAgentError(agentId: string, error: Error): Promise<void> {
    console.error(`Agent ${agentId} encountered error:`, error);

    this.updateAgentStatus(agentId, {
      agentId,
      agentName: this.getAgentName(agentId),
      status: 'error',
      currentTask: 'Error recovery',
      progressPercentage: 0,
      substeps: [],
      dataProcessed: 0,
      processingRate: 0,
      errors: [{
        errorId: Date.now().toString(),
        message: error.message,
        severity: 'high',
        timestamp: new Date(),
        context: { agentId }
      }],
      lastUpdate: new Date(),
      userInteractionsPending: []
    });

    // Implement retry logic
    await this.retryAgentTask(agentId);
  }

  private async retryAgentTask(agentId: string, maxRetries: number = 3): Promise<void> {
    // Implementation would retry the failed task with exponential backoff
    console.log(`Retrying task for agent ${agentId}`);
  }

  // Progress tracking
  updateTaskProgress(agentId: string, progress: number, details?: string): void {
    const currentStatus = this.agentStatuses.get(agentId);
    if (currentStatus) {
      this.updateAgentStatus(agentId, {
        ...currentStatus,
        progressPercentage: progress,
        lastUpdate: new Date(),
        currentTask: details || currentStatus.currentTask
      });
    }
  }
}

// Factory function for creating the supervisor workflow
export function createSupervisorWorkflow() {
  const supervisor = new SupervisorAgent();

  const workflow = new StateGraph(MarketResearchAgentStateType)
    .addNode("plan_research", async (state) => {
      if (!state.researchContext.sessionId) {
        throw new Error("Session ID required for research planning");
      }

      const plan = await supervisor.planResearch({
        restaurantType: 'cafe',
        cuisineType: 'other',
        location: 'Bangkok, Thailand',
        budgetRange: [50000, 200000],
        targetCustomers: 'young professionals',
        businessModel: 'hybrid'
      });

      return {
        researchPlan: plan,
        researchContext: {
          ...state.researchContext,
          phase: 'data_collection' as const
        }
      };
    })
    .addNode("coordinate_agents", async (state) => {
      // Delegate tasks to specialized agents
      const taskIds = await Promise.all([
        supervisor.delegateTask('product_agent', 'Analyze menu and pricing data', 3),
        supervisor.delegateTask('place_agent', 'Evaluate location and demographics', 3),
        supervisor.delegateTask('price_agent', 'Perform financial analysis', 2),
        supervisor.delegateTask('promotion_agent', 'Analyze marketing opportunities', 2)
      ]);

      return {
        agentCoordination: {
          ...state.agentCoordination,
          activeAgents: ['product_agent', 'place_agent', 'price_agent', 'promotion_agent']
        }
      };
    })
    .addNode("monitor_progress", async (state) => {
      const statuses = await supervisor.monitorProgress();
      
      return {
        agentCoordination: {
          ...state.agentCoordination,
          agentStatus: statuses
        }
      };
    })
    .addNode("generate_report", async (state) => {
      // Mock results for demonstration
      const results: TaskResult[] = [
        { agentId: 'product_agent', taskId: 'task1', status: 'completed', confidence: 85, data: {} },
        { agentId: 'place_agent', taskId: 'task2', status: 'completed', confidence: 90, data: {} },
        { agentId: 'price_agent', taskId: 'task3', status: 'completed', confidence: 80, data: {} },
        { agentId: 'promotion_agent', taskId: 'task4', status: 'completed', confidence: 75, data: {} }
      ];

      const reportData = await supervisor.coordinateReportGeneration(results);

      return {
        researchContext: {
          ...state.researchContext,
          phase: 'reporting' as const,
          findings: reportData
        }
      };
    })
    .addEdge("plan_research", "coordinate_agents")
    .addEdge("coordinate_agents", "monitor_progress")
    .addEdge("monitor_progress", "generate_report")
    .setEntryPoint("plan_research");

  return workflow.compile();
}