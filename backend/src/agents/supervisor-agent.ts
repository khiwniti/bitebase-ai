// BiteBase AI - Supervisor Agent
// Orchestrates multi-agent workflow for comprehensive restaurant market research

import { 
  BiteBaseState, 
  NodeResponse,
  AGENT_CONFIGS,
  canExecuteAgent,
  isAnalysisComplete
} from '../langgraph/state';

export class SupervisorAgent {
  private currentPlan: string[] = [];
  
  constructor() {
    console.log('👨‍💼 Supervisor Agent initialized');
  }

  // Determine the next agent to execute based on current state
  async determineNextAgent(state: BiteBaseState): Promise<string | null> {
    console.log(`📋 Supervisor analyzing state for session: ${state.sessionId}`);
    
    // Check if analysis is complete
    if (isAnalysisComplete(state)) {
      console.log('✅ All analysis complete, workflow finished');
      return null;
    }

    // Handle error recovery
    if (state.status === 'error' && state.retryCount < 3) {
      return this.handleErrorRecovery(state);
    }

    // Generate execution plan if not exists
    if (this.currentPlan.length === 0) {
      this.currentPlan = this.generateExecutionPlan(state);
      console.log('📝 Generated execution plan:', this.currentPlan);
    }

    // Find next executable agent
    return this.findNextExecutableAgent(state);
  }

  // Generate optimal execution plan based on parameters and dependencies
  private generateExecutionPlan(state: BiteBaseState): string[] {
    const { parameters } = state;
    const plan: string[] = [];

    // Always start with product analysis as it's foundational
    plan.push('product');

    // Determine parallel vs sequential execution based on parameters
    if (parameters.location) {
      // If location is specified, place analysis can run after product
      plan.push('place');
    }

    // Promotion analysis can run in parallel with place after product
    if (!plan.includes('promotion')) {
      plan.push('promotion');
    }

    // Price analysis requires both product and place data
    plan.push('price');

    // Report generation requires all other analyses
    plan.push('report');

    return plan;
  }

  // Find the next agent that can execute based on dependencies
  private findNextExecutableAgent(state: BiteBaseState): string | null {
    // Check agents in priority order
    const agentPriority = ['product', 'place', 'promotion', 'price', 'report'];
    
    for (const agentName of agentPriority) {
      // Skip if already completed
      if (state.results[agentName]) {
        continue;
      }

      // Check if agent can execute (dependencies met)
      if (canExecuteAgent(state, agentName)) {
        console.log(`🎯 Next executable agent: ${agentName}`);
        return agentName;
      }
    }

    console.log('⚠️ No executable agents found');
    return null;
  }

  // Handle error recovery strategies
  private handleErrorRecovery(state: BiteBaseState): string | null {
    console.log('🔧 Handling error recovery for session:', state.sessionId);
    
    // Identify the failed agent
    const failedAgent = state.currentAgent;
    const config = AGENT_CONFIGS[failedAgent];
    
    if (!config) {
      console.log('❌ Unknown failed agent, cannot recover');
      return null;
    }

    // Check retry limit
    if (state.retryCount >= config.retryLimit) {
      console.log(`❌ Retry limit exceeded for ${failedAgent}`);
      
      // Try to continue with other agents if this one isn't critical
      return this.findAlternativeAgent(state, failedAgent);
    }

    // Retry the same agent
    console.log(`🔄 Retrying ${failedAgent} (attempt ${state.retryCount + 1})`);
    return failedAgent;
  }

  // Find alternative execution path when an agent fails
  private findAlternativeAgent(state: BiteBaseState, failedAgent: string): string | null {
    console.log(`🔀 Finding alternative to failed agent: ${failedAgent}`);
    
    // For non-critical agents, try to continue
    const nonCriticalAgents = ['promotion']; // Promotion can be skipped if needed
    
    if (nonCriticalAgents.includes(failedAgent)) {
      return this.findNextExecutableAgent(state);
    }

    // For critical agents, analysis cannot continue
    console.log(`❌ Critical agent ${failedAgent} failed, cannot continue`);
    return null;
  }

  // Generate research plan based on user requirements
  generateResearchPlan(parameters: any): {
    agents: string[];
    parallelizable: { [key: string]: string[] };
    estimatedDuration: number;
    mcpServersRequired: string[];
  } {
    const agents = this.generateExecutionPlan({ parameters } as BiteBaseState);
    
    // Identify parallelizable agents
    const parallelizable: { [key: string]: string[] } = {
      'after-product': ['place', 'promotion'], // Can run in parallel after product
      'after-place-promotion': ['price'], // Requires both place and promotion
      'final': ['report'] // Requires all previous agents
    };

    // Calculate estimated duration
    const estimatedDuration = agents.reduce((total, agent) => {
      return total + (AGENT_CONFIGS[agent]?.estimatedDuration || 0);
    }, 0);

    // Collect required MCP servers
    const mcpServersRequired = Array.from(new Set(
      agents.flatMap(agent => AGENT_CONFIGS[agent]?.mcpServers || [])
    ));

    return {
      agents,
      parallelizable,
      estimatedDuration,
      mcpServersRequired
    };
  }

  // Monitor progress across all agents
  monitorProgress(state: BiteBaseState): {
    overallProgress: number;
    agentStatuses: { [key: string]: 'pending' | 'running' | 'completed' | 'failed' };
    bottlenecks: string[];
    recommendations: string[];
  } {
    const agentStatuses: { [key: string]: 'pending' | 'running' | 'completed' | 'failed' } = {};
    const allAgents = ['product', 'place', 'price', 'promotion', 'report'];
    
    let completedCount = 0;
    const bottlenecks: string[] = [];
    const recommendations: string[] = [];

    // Analyze each agent status
    allAgents.forEach(agent => {
      if (state.results[agent]) {
        agentStatuses[agent] = 'completed';
        completedCount++;
      } else if (state.currentAgent === agent) {
        agentStatuses[agent] = 'running';
      } else if (canExecuteAgent(state, agent)) {
        agentStatuses[agent] = 'pending';
      } else {
        agentStatuses[agent] = 'pending';
        
        // Check for bottlenecks
        const config = AGENT_CONFIGS[agent];
        const missingDeps = config.dependencies.filter(dep => !state.results[dep]);
        if (missingDeps.length > 0) {
          bottlenecks.push(`${agent} waiting for: ${missingDeps.join(', ')}`);
        }
      }
    });

    // Calculate overall progress
    const overallProgress = (completedCount / allAgents.length) * 100;

    // Generate recommendations
    if (state.retryCount > 0) {
      recommendations.push('Consider adjusting parameters if analysis continues to fail');
    }
    
    if (bottlenecks.length > 0) {
      recommendations.push('Some agents are waiting for dependencies to complete');
    }

    return {
      overallProgress,
      agentStatuses,
      bottlenecks,
      recommendations
    };
  }

  // Task delegation logic for specialized agents
  delegateTask(taskType: string, state: BiteBaseState): {
    assignedAgent: string;
    priority: 'high' | 'medium' | 'low';
    estimatedTime: number;
  } {
    const taskMappings: { [key: string]: string } = {
      'menu-analysis': 'product',
      'location-evaluation': 'place',
      'pricing-strategy': 'price',
      'customer-sentiment': 'promotion',
      'report-generation': 'report'
    };

    const assignedAgent = taskMappings[taskType] || 'product';
    const config = AGENT_CONFIGS[assignedAgent];
    
    // Determine priority based on dependencies and current state
    let priority: 'high' | 'medium' | 'low' = 'medium';
    
    if (config.dependencies.length === 0) {
      priority = 'high'; // No dependencies, can start immediately
    } else if (config.dependencies.every(dep => state.results[dep])) {
      priority = 'high'; // All dependencies met
    } else {
      priority = 'low'; // Waiting for dependencies
    }

    return {
      assignedAgent,
      priority,
      estimatedTime: config.estimatedDuration
    };
  }
}