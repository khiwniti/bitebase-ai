/**
 * Enhanced State Management for BiteBase LangGraph Framework
 * Implements comprehensive state management with real-time synchronization
 */

import { z } from 'zod';
import { BaseMessage } from '@langchain/core/messages';
import { Document } from '@langchain/core/documents';

// Restaurant Parameters Schema
export const RestaurantParamsSchema = z.object({
  type: z.string().describe('Restaurant type (cafe, fine-dining, fast-food, etc.)'),
  cuisine: z.string().describe('Cuisine type (Thai, Japanese, Italian, etc.)'),
  location: z.object({
    address: z.string(),
    district: z.string(),
    city: z.string().default('Bangkok'),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }),
  budget: z.object({
    min: z.number().describe('Minimum budget in THB'),
    max: z.number().describe('Maximum budget in THB'),
  }),
  targetCustomers: z.array(z.string()).describe('Target customer demographics'),
  businessModel: z.enum(['dine-in', 'delivery', 'takeaway', 'hybrid']),
  radius: z.number().default(2).describe('Analysis radius in kilometers'),
  capacity: z.number().optional().describe('Expected seating capacity'),
});

// Analysis Progress Schema
export const AnalysisProgressSchema = z.object({
  agentId: z.string(),
  agentName: z.string(),
  status: z.enum(['pending', 'running', 'completed', 'failed', 'paused']),
  progress: z.number().min(0).max(100),
  currentTask: z.string(),
  startTime: z.date(),
  endTime: z.date().optional(),
  error: z.string().optional(),
  results: z.record(z.any()).optional(),
});

// Data Collection Status Schema
export const DataCollectionSchema = z.object({
  source: z.string(),
  status: z.enum(['pending', 'collecting', 'completed', 'failed']),
  recordsCollected: z.number().default(0),
  totalRecords: z.number().optional(),
  lastUpdated: z.date(),
  error: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

// Analysis Results Schema
export const AnalysisResultsSchema = z.object({
  productAnalysis: z.object({
    popularDishes: z.array(z.object({
      name: z.string(),
      popularity: z.number(),
      avgPrice: z.number(),
      profitability: z.number(),
    })),
    pricingRecommendations: z.array(z.object({
      category: z.string(),
      suggestedPrice: z.number(),
      reasoning: z.string(),
    })),
    seasonalTrends: z.record(z.any()),
    competitorAnalysis: z.record(z.any()),
  }).optional(),
  
  placeAnalysis: z.object({
    locationScore: z.number(),
    competitorDensity: z.number(),
    footTrafficScore: z.number(),
    rentalCostAnalysis: z.object({
      avgRentPerSqm: z.number(),
      priceRange: z.object({
        min: z.number(),
        max: z.number(),
      }),
      recommendations: z.array(z.string()),
    }),
    deliveryCoverage: z.object({
      coverage: z.number(),
      hotspots: z.array(z.object({
        area: z.string(),
        demand: z.number(),
      })),
    }),
  }).optional(),
  
  priceAnalysis: z.object({
    revenueForecasting: z.object({
      monthlyRevenue: z.number(),
      peakHours: z.array(z.string()),
      seasonalMultipliers: z.record(z.number()),
    }),
    breakEvenAnalysis: z.object({
      breakEvenPoint: z.number(),
      roi: z.number(),
      paybackPeriod: z.number(),
    }),
    pricingOptimization: z.array(z.object({
      item: z.string(),
      currentPrice: z.number(),
      optimizedPrice: z.number(),
      expectedImpact: z.string(),
    })),
  }).optional(),
  
  promotionAnalysis: z.object({
    sentimentAnalysis: z.object({
      overallSentiment: z.number(),
      keyThemes: z.array(z.string()),
      customerComplaints: z.array(z.string()),
      positiveAspects: z.array(z.string()),
    }),
    customerSegmentation: z.array(z.object({
      segment: z.string(),
      size: z.number(),
      characteristics: z.array(z.string()),
      preferences: z.array(z.string()),
    })),
    marketingOpportunities: z.array(z.object({
      opportunity: z.string(),
      potential: z.number(),
      implementation: z.string(),
    })),
  }).optional(),
});

// Enhanced State Schema
export const EnhancedStateSchema = z.object({
  // Core Configuration
  sessionId: z.string(),
  userId: z.string().optional(),
  restaurantParams: RestaurantParamsSchema,
  
  // Messages and Context
  messages: z.array(z.any()).default([]),
  documents: z.array(z.any()).default([]),
  context: z.record(z.any()).default({}),
  
  // Analysis Progress Tracking
  analysisProgress: z.array(AnalysisProgressSchema).default([]),
  currentAgent: z.string().optional(),
  overallProgress: z.number().min(0).max(100).default(0),
  
  // Data Collection Status
  dataCollection: z.record(DataCollectionSchema).default({}),
  
  // Analysis Results
  results: AnalysisResultsSchema.optional(),
  
  // Real-time Status
  status: z.enum(['idle', 'analyzing', 'completed', 'error', 'paused']).default('idle'),
  statusMessage: z.string().optional(),
  lastUpdated: z.date().default(() => new Date()),
  
  // Error Handling
  errors: z.array(z.object({
    agentId: z.string(),
    error: z.string(),
    timestamp: z.date(),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
  })).default([]),
  
  // Collaboration and Sharing
  isShared: z.boolean().default(false),
  collaborators: z.array(z.string()).default([]),
  permissions: z.record(z.array(z.string())).default({}),
  
  // MCP Server Status
  mcpStatus: z.record(z.object({
    connected: z.boolean(),
    lastHealthCheck: z.date(),
    errorCount: z.number(),
  })).default({}),
  
  // Workflow Metadata
  workflowId: z.string().optional(),
  parentSessionId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
});

export type EnhancedState = z.infer<typeof EnhancedStateSchema>;
export type RestaurantParams = z.infer<typeof RestaurantParamsSchema>;
export type AnalysisProgress = z.infer<typeof AnalysisProgressSchema>;
export type DataCollection = z.infer<typeof DataCollectionSchema>;
export type AnalysisResults = z.infer<typeof AnalysisResultsSchema>;

/**
 * State Management Utilities
 */
export class StateManager {
  /**
   * Create initial state for new analysis session
   */
  static createInitialState(
    sessionId: string,
    restaurantParams: RestaurantParams,
    userId?: string
  ): EnhancedState {
    return EnhancedStateSchema.parse({
      sessionId,
      userId,
      restaurantParams,
      messages: [],
      documents: [],
      context: {},
      analysisProgress: [],
      dataCollection: {},
      status: 'idle',
      lastUpdated: new Date(),
      errors: [],
      isShared: false,
      collaborators: [],
      permissions: {},
      mcpStatus: {},
      tags: [],
      priority: 'normal',
    });
  }

  /**
   * Update agent progress
   */
  static updateAgentProgress(
    state: EnhancedState,
    agentId: string,
    progress: Partial<AnalysisProgress>
  ): EnhancedState {
    const existingIndex = state.analysisProgress.findIndex(p => p.agentId === agentId);
    
    if (existingIndex >= 0) {
      state.analysisProgress[existingIndex] = {
        ...state.analysisProgress[existingIndex],
        ...progress,
      };
    } else {
      state.analysisProgress.push({
        agentId,
        agentName: progress.agentName || agentId,
        status: 'pending',
        progress: 0,
        currentTask: '',
        startTime: new Date(),
        ...progress,
      } as AnalysisProgress);
    }

    // Update overall progress
    const totalProgress = state.analysisProgress.reduce((sum, p) => sum + p.progress, 0);
    state.overallProgress = Math.round(totalProgress / state.analysisProgress.length);
    state.lastUpdated = new Date();

    return state;
  }

  /**
   * Update data collection status
   */
  static updateDataCollection(
    state: EnhancedState,
    source: string,
    update: Partial<DataCollection>
  ): EnhancedState {
    state.dataCollection[source] = {
      source,
      status: 'pending',
      recordsCollected: 0,
      lastUpdated: new Date(),
      ...state.dataCollection[source],
      ...update,
    };

    state.lastUpdated = new Date();
    return state;
  }

  /**
   * Add analysis results
   */
  static addAnalysisResults(
    state: EnhancedState,
    category: keyof AnalysisResults,
    results: any
  ): EnhancedState {
    if (!state.results) {
      state.results = {};
    }

    state.results[category] = results;
    state.lastUpdated = new Date();

    return state;
  }

  /**
   * Add error to state
   */
  static addError(
    state: EnhancedState,
    agentId: string,
    error: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): EnhancedState {
    state.errors.push({
      agentId,
      error,
      timestamp: new Date(),
      severity,
    });

    // Update status if critical error
    if (severity === 'critical') {
      state.status = 'error';
      state.statusMessage = error;
    }

    state.lastUpdated = new Date();
    return state;
  }

  /**
   * Update MCP server status
   */
  static updateMCPStatus(
    state: EnhancedState,
    serverId: string,
    status: { connected: boolean; errorCount: number }
  ): EnhancedState {
    state.mcpStatus[serverId] = {
      ...status,
      lastHealthCheck: new Date(),
    };

    state.lastUpdated = new Date();
    return state;
  }

  /**
   * Validate state integrity
   */
  static validateState(state: unknown): EnhancedState {
    return EnhancedStateSchema.parse(state);
  }

  /**
   * Get state summary for monitoring
   */
  static getStateSummary(state: EnhancedState) {
    return {
      sessionId: state.sessionId,
      status: state.status,
      overallProgress: state.overallProgress,
      activeAgents: state.analysisProgress.filter(p => p.status === 'running').length,
      completedAgents: state.analysisProgress.filter(p => p.status === 'completed').length,
      errorCount: state.errors.length,
      lastUpdated: state.lastUpdated,
      dataSourcesActive: Object.keys(state.dataCollection).length,
      mcpServersConnected: Object.values(state.mcpStatus).filter(s => s.connected).length,
    };
  }

  /**
   * Check if analysis is complete
   */
  static isAnalysisComplete(state: EnhancedState): boolean {
    return state.analysisProgress.length > 0 && 
           state.analysisProgress.every(p => p.status === 'completed' || p.status === 'failed');
  }
}