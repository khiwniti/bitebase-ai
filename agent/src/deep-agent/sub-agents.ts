/**
 * Specialized Sub-Agents for Market Research
 * Each agent has specific expertise and tool access for different aspects of market research
 */

import { MarketResearchAgentStateType } from "./state";
import { MemoryManager } from "./memory-manager";
import { CompetitorAgent as CompetitorAgentClass } from "./agents/competitor-agent";
import { MarketTrendAgent as MarketTrendAgentClass } from "./agents/market-trend-agent";
import { ConsumerAgent as ConsumerAgentClass } from "./agents/consumer-agent";
import { FinancialAgent as FinancialAgentClass } from "./agents/financial-agent";
import { TechnicalAgent as TechnicalAgentClass } from "./agents/technical-agent";
import { RegulatoryAgent as RegulatoryAgentClass } from "./agents/regulatory-agent";
import { PropertyAgent as PropertyAgentClass } from "./agents/property-agent";

// Enhanced Sub-Agent Interface with coordination capabilities
export interface SubAgent {
  name: string;
  expertise: string[];
  description: string;
  tools: string[];
  dependencies: string[]; // Other agents this depends on
  outputTypes: string[]; // Types of data this agent produces
  memoryTags: string[]; // Tags for memory storage and retrieval
  coordination: {
    maxConcurrency: number;
    preferredMode: 'parallel' | 'sequential' | 'hybrid';
    resourceWeight: number;
  };
  prompts: {
    systemPrompt: string;
    taskPrompts: Record<string, string>;
  };
}

// Agent Execution Context
export interface AgentExecutionContext {
  sessionId: string;
  researchObjectives: string[];
  targetCompany?: string;
  industrySector?: string;
  geographicScope?: string[];
  availableMemory: any[];
  activeAgents: string[];
  completedTasks: string[];
}

// Agent Execution Result
export interface AgentExecutionResult {
  agentName: string;
  taskId: string;
  status: 'completed' | 'failed' | 'partial';
  data: any;
  insights: string[];
  nextActions: string[];
  memoryItems: any[];
  executionTime: number;
  confidence: number;
}

// Competitor Analysis Agent
export const CompetitorAgent: SubAgent = {
  name: "CompetitorAgent",
  expertise: [
    "competitive analysis",
    "market positioning",
    "pricing strategies",
    "competitor profiling",
    "SWOT analysis",
    "competitive intelligence"
  ],
  description: "Specializes in analyzing competitors, their strategies, positioning, and market dynamics",
  dependencies: [], // No dependencies - can start immediately
  outputTypes: ["competitor_profiles", "competitive_analysis", "swot_matrices"],
  memoryTags: ["competitor", "analysis", "market_position"],
  coordination: {
    maxConcurrency: 3,
    preferredMode: 'parallel',
    resourceWeight: 3
  },
  tools: [
    "web_search",
    "browser_automation",
    "financial_data_analysis",
    "document_analysis",
    "swot_analysis_generator"
  ],
  prompts: {
    systemPrompt: `You are a specialized Competitor Analysis agent with deep expertise in competitive intelligence and market analysis.

Your core responsibilities:
- Analyze competitor strategies, positioning, and performance
- Conduct comprehensive competitor profiling
- Perform SWOT analysis for competitors
- Track competitive pricing and product strategies
- Identify competitive threats and opportunities
- Monitor competitor financial health and market moves

When analyzing competitors:
1. Gather comprehensive data from multiple sources
2. Analyze financial performance and market position
3. Evaluate product/service offerings and pricing
4. Assess marketing and positioning strategies
5. Identify strengths, weaknesses, opportunities, and threats
6. Provide actionable competitive insights

Always maintain objectivity and base conclusions on evidence from reliable sources.`,
    
    taskPrompts: {
      "analyze_competitor": "Conduct a comprehensive analysis of {competitor_name} including their market position, financial performance, product offerings, pricing strategy, and key strengths/weaknesses.",
      "competitive_landscape": "Map the competitive landscape for {industry} identifying key players, market share, positioning, and competitive dynamics.",
      "swot_analysis": "Perform a detailed SWOT analysis for {company_name} compared to their main competitors in {market_segment}.",
      "pricing_analysis": "Analyze pricing strategies across competitors in {market} and identify pricing gaps and opportunities."
    }
  }
};

// Market Trend Analysis Agent  
export const MarketTrendAgent: SubAgent = {
  name: "MarketTrendAgent",
  expertise: [
    "market trends analysis",
    "industry forecasting",
    "emerging technologies",
    "market dynamics",
    "trend prediction",
    "technology adoption"
  ],
  description: "Focuses on identifying and analyzing market trends, emerging technologies, and industry evolution",
  dependencies: [], // No dependencies - can start immediately
  outputTypes: ["trend_analysis", "market_forecasts", "technology_assessments"],
  memoryTags: ["trends", "forecasting", "technology"],
  coordination: {
    maxConcurrency: 2,
    preferredMode: 'parallel',
    resourceWeight: 2
  },
  tools: [
    "web_search",
    "news_aggregation",
    "trend_analysis",
    "patent_search",
    "technology_tracking"
  ],
  prompts: {
    systemPrompt: `You are a specialized Market Trend Analysis agent with expertise in identifying, analyzing, and forecasting market trends and industry evolution.

Your core responsibilities:
- Identify emerging market trends and technologies
- Analyze industry evolution and market dynamics
- Forecast market developments and technology adoption
- Track innovation patterns and disruption indicators
- Assess trend impact on different market segments
- Provide strategic trend insights for decision-making

When analyzing trends:
1. Gather data from diverse sources (news, patents, research, social media)
2. Identify pattern recognition and emerging signals
3. Assess trend magnitude, timeline, and impact potential
4. Evaluate adoption drivers and barriers
5. Consider regional and demographic variations
6. Provide actionable trend intelligence

Focus on evidence-based analysis and clearly differentiate between established trends and emerging signals.`,
    
    taskPrompts: {
      "trend_analysis": "Analyze emerging trends in {industry} and assess their potential impact over the next {timeframe}.",
      "technology_forecast": "Forecast the adoption timeline and market impact of {technology} in {industry}.",
      "market_evolution": "Map the evolution of {market} and identify key transformation drivers and future scenarios.",
      "disruption_assessment": "Assess disruption potential in {industry} from emerging technologies and new business models."
    }
  }
};

// Consumer Insights Agent
export const ConsumerAgent: SubAgent = {
  name: "ConsumerAgent",
  expertise: [
    "consumer behavior analysis",
    "customer segmentation",
    "user experience research",
    "demographics analysis",
    "psychographics",
    "customer journey mapping"
  ],
  description: "Specializes in understanding consumer behavior, preferences, and decision-making patterns",
  dependencies: ["MarketTrendAgent"], // Depends on market trends for context
  outputTypes: ["consumer_profiles", "behavior_analysis", "segmentation_data"],
  memoryTags: ["consumer", "behavior", "segmentation"],
  coordination: {
    maxConcurrency: 2,
    preferredMode: 'sequential',
    resourceWeight: 2
  },
  tools: [
    "social_media_analysis",
    "survey_analysis",
    "sentiment_analysis",
    "demographic_analysis",
    "behavior_tracking"
  ],
  prompts: {
    systemPrompt: `You are a specialized Consumer Insights agent with deep expertise in consumer behavior analysis and customer research.

Your core responsibilities:
- Analyze consumer behavior patterns and preferences
- Segment customers based on demographics and psychographics
- Map customer journeys and decision-making processes
- Identify consumer pain points and unmet needs
- Track sentiment and satisfaction across touchpoints
- Provide actionable consumer insights for strategy

When analyzing consumers:
1. Gather data from multiple touchpoints and sources
2. Segment consumers based on relevant criteria
3. Analyze behavior patterns and decision drivers
4. Map customer journeys and identify friction points
5. Assess sentiment and satisfaction levels
6. Identify opportunities for better customer experience

Always respect privacy considerations and base insights on aggregated, anonymized data when possible.`,
    
    taskPrompts: {
      "consumer_segmentation": "Segment the {market} consumer base and develop detailed personas for each segment.",
      "behavior_analysis": "Analyze consumer behavior patterns for {product_category} purchases and usage.",
      "journey_mapping": "Map the customer journey for {service} and identify optimization opportunities.",
      "sentiment_analysis": "Analyze consumer sentiment towards {brand} across different channels and touchpoints."
    }
  }
};

// Financial Analysis Agent
export const FinancialAgent: SubAgent = {
  name: "FinancialAgent",
  expertise: [
    "financial analysis",
    "valuation modeling",
    "investment analysis",
    "financial forecasting",
    "ratio analysis",
    "risk assessment"
  ],
  description: "Provides comprehensive financial analysis, valuation, and investment insights",
  dependencies: ["CompetitorAgent"], // Depends on competitor data for financial analysis
  outputTypes: ["financial_analysis", "valuation_models", "risk_assessments"],
  memoryTags: ["financial", "valuation", "risk"],
  coordination: {
    maxConcurrency: 1,
    preferredMode: 'sequential',
    resourceWeight: 3
  },
  tools: [
    "financial_databases",
    "ratio_calculator",
    "valuation_models",
    "financial_modeling",
    "risk_analysis"
  ],
  prompts: {
    systemPrompt: `You are a specialized Financial Analysis agent with expertise in corporate finance, valuation, and investment analysis.

Your core responsibilities:
- Analyze financial performance and health of companies
- Conduct valuation analysis using multiple methodologies
- Assess investment opportunities and risks
- Perform ratio analysis and benchmarking
- Forecast financial performance and scenarios
- Provide investment recommendations and insights

When conducting financial analysis:
1. Gather comprehensive financial data and statements
2. Calculate and analyze key financial ratios
3. Perform comparative analysis with industry peers
4. Conduct valuation using appropriate methodologies
5. Assess financial risks and growth prospects
6. Provide clear, actionable financial insights

Always ensure accuracy of financial data and clearly state assumptions used in analysis.`,
    
    taskPrompts: {
      "financial_health": "Assess the financial health of {company} using comprehensive ratio analysis and peer comparison.",
      "valuation_analysis": "Conduct a detailed valuation analysis of {company} using DCF, comparable company, and asset-based approaches.",
      "investment_analysis": "Analyze {company} as an investment opportunity including risks, growth prospects, and return potential.",
      "financial_forecasting": "Create financial forecasts for {company} over {timeframe} considering market conditions and business strategy."
    }
  }
};

// Technical Analysis Agent
export const TechnicalAgent: SubAgent = {
  name: "TechnicalAgent",
  expertise: [
    "technical analysis",
    "product evaluation",
    "technology assessment",
    "specification analysis",
    "innovation tracking",
    "patent analysis"
  ],
  description: "Focuses on technical aspects, product analysis, and technology evaluation",
  dependencies: ["CompetitorAgent", "MarketTrendAgent"], // Needs competitor and trend data
  outputTypes: ["technical_analysis", "product_evaluations", "patent_landscapes"],
  memoryTags: ["technical", "product", "innovation"],
  coordination: {
    maxConcurrency: 2,
    preferredMode: 'hybrid',
    resourceWeight: 2
  },
  tools: [
    "technical_documentation",
    "patent_databases",
    "product_comparison",
    "specification_analysis",
    "technology_assessment"
  ],
  prompts: {
    systemPrompt: `You are a specialized Technical Analysis agent with deep expertise in technology evaluation and product analysis.

Your core responsibilities:
- Analyze technical specifications and capabilities
- Evaluate product features and performance
- Assess technology maturity and adoption
- Review patent landscapes and innovation trends
- Compare technical solutions and architectures
- Provide technical feasibility and risk assessments

When conducting technical analysis:
1. Gather detailed technical specifications and documentation
2. Evaluate performance characteristics and capabilities
3. Assess technology maturity and implementation complexity
4. Compare solutions against alternatives and benchmarks
5. Identify technical risks and dependencies
6. Provide clear technical insights and recommendations

Focus on objective technical evaluation while considering practical implementation aspects.`,
    
    taskPrompts: {
      "product_analysis": "Analyze the technical specifications and capabilities of {product} compared to market alternatives.",
      "technology_assessment": "Assess the maturity, capabilities, and adoption potential of {technology}.",
      "patent_landscape": "Map the patent landscape for {technology_area} and identify key innovation trends.",
      "technical_feasibility": "Evaluate the technical feasibility and implementation challenges of {solution}."
    }
  }
};

// Regulatory and Legal Agent
export const RegulatoryAgent: SubAgent = {
  name: "RegulatoryAgent",
  expertise: [
    "regulatory analysis",
    "compliance requirements",
    "legal landscape",
    "policy tracking",
    "risk assessment",
    "regulatory impact"
  ],
  description: "Specializes in regulatory landscape analysis and compliance requirements",
  dependencies: ["MarketTrendAgent"], // Depends on trend analysis for regulatory context
  outputTypes: ["regulatory_analysis", "compliance_reports", "policy_impacts"],
  memoryTags: ["regulatory", "compliance", "policy"],
  coordination: {
    maxConcurrency: 1,
    preferredMode: 'sequential',
    resourceWeight: 1
  },
  tools: [
    "regulatory_databases",
    "legal_research",
    "compliance_tracking",
    "policy_monitoring",
    "regulatory_analysis"
  ],
  prompts: {
    systemPrompt: `You are a specialized Regulatory Analysis agent with expertise in legal and regulatory landscape analysis.

Your core responsibilities:
- Monitor regulatory changes and policy developments
- Analyze compliance requirements and obligations
- Assess regulatory risks and impacts
- Track policy trends and legislative changes
- Evaluate regulatory barriers and opportunities
- Provide regulatory intelligence and recommendations

When conducting regulatory analysis:
1. Monitor relevant regulatory bodies and jurisdictions
2. Track policy changes and proposed regulations
3. Analyze compliance requirements and impacts
4. Assess regulatory risks and mitigation strategies
5. Evaluate market access and regulatory barriers
6. Provide actionable regulatory insights

Always verify regulatory information with official sources and consider jurisdictional differences.`,
    
    taskPrompts: {
      "regulatory_landscape": "Map the regulatory landscape for {industry} across {jurisdictions} and identify key compliance requirements.",
      "compliance_analysis": "Analyze compliance requirements for {business_activity} and assess implementation challenges.",
      "regulatory_impact": "Assess the impact of {regulation} on {industry} and identify affected stakeholders.",
      "policy_tracking": "Track policy developments in {policy_area} and assess potential business implications."
    }
  }
};

// Property and Location Analysis Agent
export const PropertyAgent: SubAgent = {
  name: "PropertyAgent",
  expertise: [
    "property market analysis",
    "real estate intelligence",
    "location optimization",
    "accommodation density analysis",
    "investment potential assessment",
    "commercial property trends"
  ],
  description: "Specializes in property market analysis, location intelligence, and accommodation trends for restaurant site selection",
  dependencies: [], // No dependencies - can start immediately
  outputTypes: ["property_analysis", "location_intelligence", "accommodation_insights"],
  memoryTags: ["property", "location", "real_estate"],
  coordination: {
    maxConcurrency: 2,
    preferredMode: 'parallel',
    resourceWeight: 2
  },
  tools: [
    "property_analysis",
    "accommodation_density_analysis",
    "location_investment_analysis",
    "market_intelligence",
    "geographic_analysis"
  ],
  prompts: {
    systemPrompt: `You are a specialized Property Analysis agent with deep expertise in real estate intelligence and location optimization for restaurant businesses.

Your core responsibilities:
- Analyze property market conditions and rental rates
- Assess accommodation density and tourism patterns
- Evaluate location investment potential and risks
- Provide commercial real estate market intelligence
- Optimize restaurant location selection decisions
- Assess catchment areas and demographic profiles

When analyzing properties and locations:
1. Gather comprehensive property market data
2. Analyze rental rates and market trends
3. Evaluate accommodation density and tourism impact
4. Assess location accessibility and visibility
5. Calculate investment potential and risks
6. Provide actionable location recommendations

Focus on data-driven insights that directly support restaurant location planning and business decisions.`,

    taskPrompts: {
      "property_analysis": "Analyze property market conditions for restaurant locations in {region} including rental rates, availability, and market trends.",
      "accommodation_analysis": "Assess accommodation density and tourism patterns in {location} to understand customer flow and business potential.",
      "location_investment": "Evaluate investment potential for restaurant location at {address} considering market conditions, risks, and returns.",
      "market_intelligence": "Provide comprehensive property market intelligence for restaurant planning in {market_area}."
    }
  }
};

// Sub-Agent Registry
export const SubAgentRegistry = {
  CompetitorAgent,
  MarketTrendAgent,
  ConsumerAgent,
  FinancialAgent,
  TechnicalAgent,
  RegulatoryAgent,
  PropertyAgent
};

// Sub-Agent Selection Logic
export function selectSubAgent(taskType: string, domain?: string): SubAgent {
  const taskTypeMap: Record<string, keyof typeof SubAgentRegistry> = {
    "competitor_analysis": "CompetitorAgent",
    "competitive_intelligence": "CompetitorAgent",
    "market_trends": "MarketTrendAgent",
    "trend_analysis": "MarketTrendAgent",
    "consumer_research": "ConsumerAgent",
    "customer_analysis": "ConsumerAgent",
    "financial_analysis": "FinancialAgent",
    "valuation": "FinancialAgent",
    "technical_analysis": "TechnicalAgent",
    "product_evaluation": "TechnicalAgent",
    "regulatory_analysis": "RegulatoryAgent",
    "compliance": "RegulatoryAgent",
    "property_analysis": "PropertyAgent",
    "location_analysis": "PropertyAgent",
    "accommodation_analysis": "PropertyAgent",
    "real_estate_analysis": "PropertyAgent",
    "site_selection": "PropertyAgent",
    "investment_analysis": "PropertyAgent"
  };

  const selectedAgentKey = taskTypeMap[taskType] || "CompetitorAgent";
  return SubAgentRegistry[selectedAgentKey];
}

// Task Delegation Interface
export interface DelegationTask {
  id: string;
  type: string;
  description: string;
  assignedAgent: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  context: Record<string, any>;
  result?: any;
  createdAt: string;
  updatedAt: string;
}

export type SubAgentType = keyof typeof SubAgentRegistry;

/**
 * Sub-Agent Executor with Memory Integration
 */
export class SubAgentExecutor {
  private memoryManager: MemoryManager;
  private activeSessions: Map<string, AgentExecutionContext> = new Map();
  private agentInstances: Map<string, any> = new Map();

  constructor(memoryManager: MemoryManager) {
    this.memoryManager = memoryManager;
    this.initializeAgentInstances();
  }

  /**
   * Initialize specialized agent instances
   */
  private initializeAgentInstances(): void {
    // Initialize CompetitorAgent
    this.agentInstances.set('CompetitorAgent', new CompetitorAgentClass(this.memoryManager));

    // Initialize MarketTrendAgent
    this.agentInstances.set('MarketTrendAgent', new MarketTrendAgentClass(this.memoryManager));

    // Initialize ConsumerAgent
    this.agentInstances.set('ConsumerAgent', new ConsumerAgentClass(this.memoryManager));

    // Initialize FinancialAgent
    this.agentInstances.set('FinancialAgent', new FinancialAgentClass(this.memoryManager));

    // Initialize TechnicalAgent
    this.agentInstances.set('TechnicalAgent', new TechnicalAgentClass(this.memoryManager));

    // Initialize RegulatoryAgent
    this.agentInstances.set('RegulatoryAgent', new RegulatoryAgentClass(this.memoryManager));

    // Initialize PropertyAgent
    this.agentInstances.set('PropertyAgent', new PropertyAgentClass(this.memoryManager));
  }

  /**
   * Execute agent with full context and memory integration
   */
  async executeAgent(
    agent: SubAgent,
    task: DelegationTask,
    context: AgentExecutionContext
  ): Promise<AgentExecutionResult> {
    const startTime = Date.now();
    const sessionKey = `${agent.name}_${task.id}`;

    try {
      // Store execution context
      this.activeSessions.set(sessionKey, context);

      // Retrieve relevant memories
      const relevantMemories = await this.memoryManager.retrieveMemories({
        tags: agent.memoryTags,
        sessionId: context.sessionId,
        limit: 10
      });

      // Prepare agent-specific context
      const agentContext = {
        ...context,
        memories: relevantMemories,
        agentExpertise: agent.expertise,
        availableTools: agent.tools
      };

      // Execute agent task (placeholder for actual implementation)
      const result = await this.performAgentTask(agent, task, agentContext);

      // Store insights in memory
      if (result.insights.length > 0) {
        await this.memoryManager.storeMemory(
          'insight',
          result.insights,
          {
            sessionId: context.sessionId,
            relevanceScore: result.confidence,
            tags: [...agent.memoryTags, 'insight'],
            source: agent.name
          }
        );
      }

      // Store results in memory for future reference
      await this.memoryManager.storeMemory(
        'finding',
        result.data,
        {
          sessionId: context.sessionId,
          relevanceScore: result.confidence,
          tags: [...agent.memoryTags, ...agent.outputTypes],
          source: agent.name
        }
      );

      return {
        ...result,
        executionTime: Date.now() - startTime
      };

    } catch (error) {
      console.error(`Agent execution failed for ${agent.name}:`, error);
      return {
        agentName: agent.name,
        taskId: task.id,
        status: 'failed',
        data: null,
        insights: [],
        nextActions: [],
        memoryItems: [],
        executionTime: Date.now() - startTime,
        confidence: 0
      };
    } finally {
      this.activeSessions.delete(sessionKey);
    }
  }

  /**
   * Execute agent task using specialized agent implementations
   */
  private async performAgentTask(
    agent: SubAgent,
    task: DelegationTask,
    context: any
  ): Promise<Omit<AgentExecutionResult, 'executionTime'>> {
    // Get specialized agent instance
    const agentInstance = this.agentInstances.get(agent.name);

    if (agentInstance && typeof agentInstance.executeTask === 'function') {
      // Execute using specialized agent implementation
      const result = await agentInstance.executeTask(task, context);
      // Remove executionTime as it will be added by the caller
      const { executionTime, ...resultWithoutTime } = result;
      return resultWithoutTime;
    } else {
      // Fallback to placeholder implementation for agents not yet implemented
      console.warn(`Specialized implementation not found for ${agent.name}, using fallback`);
      return {
        agentName: agent.name,
        taskId: task.id,
        status: 'completed',
        data: {
          placeholder: 'agent execution result',
          note: `${agent.name} implementation pending`
        },
        insights: [
          `${agent.name} completed task: ${task.description}`,
          `Note: Using fallback implementation - specialized agent pending`
        ],
        nextActions: [`Implement specialized ${agent.name} for enhanced analysis`],
        memoryItems: [],
        confidence: 0.6
      };
    }
  }

  /**
   * Get execution status for active sessions
   */
  getActiveExecutions(): string[] {
    return Array.from(this.activeSessions.keys());
  }

  /**
   * Get available specialized agents
   */
  getAvailableAgents(): string[] {
    return Array.from(this.agentInstances.keys());
  }

  /**
   * Check if agent has specialized implementation
   */
  hasSpecializedImplementation(agentName: string): boolean {
    const instance = this.agentInstances.get(agentName);
    return instance && typeof instance.executeTask === 'function';
  }
}

/**
 * Agent Coordination Manager for dependency-aware execution
 */
export class AgentCoordinationManager {
  private dependencyGraph: Map<string, string[]> = new Map();
  private executionOrder: string[] = [];

  constructor() {
    this.buildDependencyGraph();
  }

  /**
   * Build dependency graph from agent definitions
   */
  private buildDependencyGraph(): void {
    Object.values(SubAgentRegistry).forEach(agent => {
      this.dependencyGraph.set(agent.name, agent.dependencies);
    });
    this.executionOrder = this.topologicalSort();
  }

  /**
   * Topological sort for optimal execution order
   */
  private topologicalSort(): string[] {
    const visited = new Set<string>();
    const temp = new Set<string>();
    const result: string[] = [];

    const visit = (node: string) => {
      if (temp.has(node)) {
        throw new Error(`Circular dependency detected involving ${node}`);
      }
      if (!visited.has(node)) {
        temp.add(node);
        const dependencies = this.dependencyGraph.get(node) || [];
        dependencies.forEach(dep => visit(dep));
        temp.delete(node);
        visited.add(node);
        result.push(node);
      }
    };

    Array.from(this.dependencyGraph.keys()).forEach(node => visit(node));
    return result;
  }

  /**
   * Get optimal execution order for given agents
   */
  getExecutionOrder(agentNames: string[]): string[] {
    return this.executionOrder.filter(name => agentNames.includes(name));
  }

  /**
   * Get agents that can execute in parallel
   */
  getParallelizableGroups(agentNames: string[]): string[][] {
    const groups: string[][] = [];
    const processed = new Set<string>();

    agentNames.forEach(agentName => {
      if (processed.has(agentName)) return;

      const agent = Object.values(SubAgentRegistry).find(a => a.name === agentName);
      if (!agent) return;

      if (agent.dependencies.length === 0 ||
          agent.dependencies.every(dep => processed.has(dep))) {
        // Find other agents that can run in parallel
        const parallelGroup = agentNames.filter(name => {
          if (processed.has(name)) return false;
          const otherAgent = Object.values(SubAgentRegistry).find(a => a.name === name);
          return otherAgent &&
                 (otherAgent.dependencies.length === 0 ||
                  otherAgent.dependencies.every(dep => processed.has(dep)));
        });

        groups.push(parallelGroup);
        parallelGroup.forEach(name => processed.add(name));
      }
    });

    return groups;
  }

  /**
   * Check if agent dependencies are satisfied
   */
  areDependenciesSatisfied(agentName: string, completedAgents: string[]): boolean {
    const dependencies = this.dependencyGraph.get(agentName) || [];
    return dependencies.every(dep => completedAgents.includes(dep));
  }
}