import { AnalysisResult } from './generative-ui';
import { AIAction, AIActionResult } from '@/components/shared/EnhancedSharedStateProvider';

// Workflow types
export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  action: AIAction;
  dependencies?: string[];
  priority: number;
  estimatedTime: number; // in seconds
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: AIActionResult;
  error?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number; // 0-100
  startTime?: Date;
  endTime?: Date;
  results: AnalysisResult[];
}

// Predefined workflow templates
export const WORKFLOW_TEMPLATES = {
  // Comprehensive market entry analysis
  MARKET_ENTRY: {
    name: "Market Entry Analysis",
    description: "Complete analysis for entering a new market",
    steps: [
      {
        id: "place-analysis",
        name: "Location Analysis",
        description: "Analyze target location demographics and market conditions",
        action: { type: "ANALYZE_LOCATION", payload: {} },
        priority: 1,
        estimatedTime: 30,
      },
      {
        id: "competitor-analysis", 
        name: "Competitor Analysis",
        description: "Map competitors and analyze competitive landscape",
        action: { type: "ANALYZE_COMPETITORS", payload: {} },
        priority: 1,
        estimatedTime: 45,
      },
      {
        id: "product-analysis",
        name: "Product Market Fit",
        description: "Analyze product demand and preferences",
        action: { type: "ANALYZE_MENU_PERFORMANCE", payload: {} },
        dependencies: ["place-analysis"],
        priority: 2,
        estimatedTime: 35,
      },
      {
        id: "pricing-analysis",
        name: "Pricing Strategy",
        description: "Determine optimal pricing for the market",
        action: { type: "OPTIMIZE_PRICING", payload: {} },
        dependencies: ["competitor-analysis", "product-analysis"],
        priority: 3,
        estimatedTime: 25,
      },
      {
        id: "promotion-analysis",
        name: "Marketing Strategy",
        description: "Develop launch marketing and promotion strategy",
        action: { type: "ANALYZE_MARKETING_CHANNELS", payload: {} },
        dependencies: ["place-analysis", "product-analysis"],
        priority: 3,
        estimatedTime: 30,
      },
    ],
  },

  // Restaurant optimization workflow
  RESTAURANT_OPTIMIZATION: {
    name: "Restaurant Optimization",
    description: "Comprehensive optimization of existing restaurant operations",
    steps: [
      {
        id: "performance-audit",
        name: "Performance Audit",
        description: "Analyze current restaurant performance metrics",
        action: { type: "ANALYZE_PERFORMANCE", payload: {} },
        priority: 1,
        estimatedTime: 20,
      },
      {
        id: "menu-optimization",
        name: "Menu Optimization",
        description: "Optimize menu items and pricing",
        action: { type: "OPTIMIZE_MENU", payload: {} },
        priority: 2,
        estimatedTime: 40,
      },
      {
        id: "customer-analysis",
        name: "Customer Segmentation",
        description: "Analyze customer behavior and preferences",
        action: { type: "SEGMENT_CUSTOMERS", payload: {} },
        priority: 2,
        estimatedTime: 35,
      },
      {
        id: "operational-efficiency",
        name: "Operational Analysis",
        description: "Identify operational improvement opportunities",
        action: { type: "ANALYZE_OPERATIONS", payload: {} },
        dependencies: ["performance-audit"],
        priority: 3,
        estimatedTime: 30,
      },
    ],
  },

  // Site selection workflow
  SITE_SELECTION: {
    name: "Site Selection Analysis",
    description: "Comprehensive analysis for selecting optimal restaurant location",
    steps: [
      {
        id: "demographic-analysis",
        name: "Demographic Analysis",
        description: "Analyze target area demographics",
        action: { type: "ANALYZE_DEMOGRAPHICS", payload: {} },
        priority: 1,
        estimatedTime: 25,
      },
      {
        id: "foot-traffic-analysis",
        name: "Foot Traffic Analysis", 
        description: "Analyze pedestrian and vehicle traffic patterns",
        action: { type: "ANALYZE_FOOT_TRAFFIC", payload: {} },
        priority: 1,
        estimatedTime: 30,
      },
      {
        id: "accessibility-analysis",
        name: "Accessibility Analysis",
        description: "Evaluate location accessibility and transportation",
        action: { type: "ANALYZE_ACCESSIBILITY", payload: {} },
        priority: 2,
        estimatedTime: 20,
      },
      {
        id: "cost-analysis",
        name: "Cost Analysis",
        description: "Analyze real estate costs and financial projections",
        action: { type: "ANALYZE_COSTS", payload: {} },
        dependencies: ["demographic-analysis", "foot-traffic-analysis"],
        priority: 3,
        estimatedTime: 35,
      },
    ],
  },

  // Customer intelligence workflow
  CUSTOMER_INTELLIGENCE: {
    name: "Customer Intelligence Analysis",
    description: "Deep dive into customer behavior and preferences",
    steps: [
      {
        id: "behavior-analysis",
        name: "Behavior Analysis",
        description: "Analyze customer visit patterns and preferences",
        action: { type: "ANALYZE_CUSTOMER_BEHAVIOR", payload: {} },
        priority: 1,
        estimatedTime: 30,
      },
      {
        id: "loyalty-analysis",
        name: "Loyalty Analysis",
        description: "Analyze customer retention and loyalty patterns",
        action: { type: "ANALYZE_LOYALTY", payload: {} },
        priority: 2,
        estimatedTime: 25,
      },
      {
        id: "churn-prediction",
        name: "Churn Prediction",
        description: "Predict customer churn risk and prevention strategies",
        action: { type: "PREDICT_CHURN", payload: {} },
        dependencies: ["behavior-analysis", "loyalty-analysis"],
        priority: 3,
        estimatedTime: 35,
      },
    ],
  },
};

// Workflow orchestrator class
export class WorkflowOrchestrator {
  private workflows: Map<string, Workflow> = new Map();
  private executeAction: (action: AIAction) => Promise<AIActionResult>;

  constructor(executeAction: (action: AIAction) => Promise<AIActionResult>) {
    this.executeAction = executeAction;
  }

  // Create workflow from template
  createWorkflow(templateKey: keyof typeof WORKFLOW_TEMPLATES, customParams?: any): Workflow {
    const template = WORKFLOW_TEMPLATES[templateKey];
    const workflowId = `${templateKey.toLowerCase()}-${Date.now()}`;
    
    const workflow: Workflow = {
      id: workflowId,
      name: template.name,
      description: template.description,
      steps: template.steps.map(step => ({
        ...step,
        status: 'pending' as const,
        action: {
          ...step.action,
          payload: { ...step.action.payload, ...customParams }
        }
      })),
      status: 'pending',
      progress: 0,
      results: [],
    };

    this.workflows.set(workflowId, workflow);
    return workflow;
  }

  // Execute workflow
  async executeWorkflow(workflowId: string): Promise<Workflow> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    workflow.status = 'running';
    workflow.startTime = new Date();

    try {
      // Execute steps based on dependencies and priority
      const executionQueue = this.buildExecutionQueue(workflow.steps);
      
      for (const step of executionQueue) {
        await this.executeStep(workflow, step);
      }

      workflow.status = 'completed';
      workflow.progress = 100;
      workflow.endTime = new Date();

    } catch (error) {
      workflow.status = 'failed';
      console.error(`Workflow ${workflowId} failed:`, error);
    }

    return workflow;
  }

  // Execute individual step
  private async executeStep(workflow: Workflow, step: WorkflowStep): Promise<void> {
    // Check dependencies
    if (step.dependencies) {
      const pendingDeps = step.dependencies.filter(depId => {
        const depStep = workflow.steps.find(s => s.id === depId);
        return !depStep || depStep.status !== 'completed';
      });

      if (pendingDeps.length > 0) {
        throw new Error(`Step ${step.id} has unmet dependencies: ${pendingDeps.join(', ')}`);
      }
    }

    step.status = 'running';
    
    try {
      // Execute the AI action
      const result = await this.executeAction(step.action);
      
      step.status = 'completed';
      step.result = result;

      // Convert result to AnalysisResult and add to workflow results
      const analysisResult = this.convertToAnalysisResult(step, result);
      workflow.results.push(analysisResult);

      // Update workflow progress
      const completedSteps = workflow.steps.filter(s => s.status === 'completed').length;
      workflow.progress = (completedSteps / workflow.steps.length) * 100;

    } catch (error) {
      step.status = 'failed';
      step.error = error instanceof Error ? error.message : 'Unknown error';
      throw error;
    }
  }

  // Build execution queue based on dependencies and priority
  private buildExecutionQueue(steps: WorkflowStep[]): WorkflowStep[] {
    const queue: WorkflowStep[] = [];
    const processed = new Set<string>();

    // Helper function to process step and its dependencies
    const processStep = (step: WorkflowStep) => {
      if (processed.has(step.id)) return;

      // Process dependencies first
      if (step.dependencies) {
        for (const depId of step.dependencies) {
          const depStep = steps.find(s => s.id === depId);
          if (depStep && !processed.has(depId)) {
            processStep(depStep);
          }
        }
      }

      queue.push(step);
      processed.add(step.id);
    };

    // Sort steps by priority and process
    const sortedSteps = [...steps].sort((a, b) => a.priority - b.priority);
    for (const step of sortedSteps) {
      processStep(step);
    }

    return queue;
  }

  // Convert AI action result to analysis result
  private convertToAnalysisResult(step: WorkflowStep, result: AIActionResult): AnalysisResult {
    // Determine analysis type based on step action
    let type: 'place' | 'product' | 'price' | 'promotion' = 'place';
    
    if (step.action.type.includes('MENU') || step.action.type.includes('PRODUCT')) {
      type = 'product';
    } else if (step.action.type.includes('PRIC')) {
      type = 'price';
    } else if (step.action.type.includes('MARKETING') || step.action.type.includes('PROMOTION')) {
      type = 'promotion';
    }

    return {
      type,
      title: step.name,
      summary: step.description,
      data: result.data || {},
      insights: result.insights || [],
      recommendations: result.recommendations || [],
      confidence: result.confidence || 85,
      timestamp: new Date(),
    };
  }

  // Get workflow status
  getWorkflow(workflowId: string): Workflow | undefined {
    return this.workflows.get(workflowId);
  }

  // Get all workflows
  getAllWorkflows(): Workflow[] {
    return Array.from(this.workflows.values());
  }

  // Cancel workflow
  cancelWorkflow(workflowId: string): boolean {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return false;

    if (workflow.status === 'running') {
      workflow.status = 'failed';
      workflow.endTime = new Date();
      
      // Mark pending steps as failed
      workflow.steps.forEach(step => {
        if (step.status === 'pending' || step.status === 'running') {
          step.status = 'failed';
          step.error = 'Workflow cancelled';
        }
      });
    }

    return true;
  }

  // Estimate workflow completion time
  estimateWorkflowTime(workflow: Workflow): number {
    return workflow.steps.reduce((total, step) => total + step.estimatedTime, 0);
  }
}

// Workflow execution utilities
export const createWorkflowExecutor = (executeAction: (action: AIAction) => Promise<AIActionResult>) => {
  return new WorkflowOrchestrator(executeAction);
};

export const getWorkflowTemplate = (key: keyof typeof WORKFLOW_TEMPLATES) => {
  return WORKFLOW_TEMPLATES[key];
};

export const getAllWorkflowTemplates = () => {
  return Object.entries(WORKFLOW_TEMPLATES).map(([key, template]) => ({
    key: key as keyof typeof WORKFLOW_TEMPLATES,
    ...template,
  }));
};