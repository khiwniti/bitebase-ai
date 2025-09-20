import { BaseMessage } from '@langchain/core/messages';
import { StateGraph, START, END } from '@langchain/langgraph';

// Core state interface for the BiteBase research workflow
export interface BiteBaseResearchState {
  sessionId: string;
  
  // Input parameters
  parameters: {
    restaurantType: string;
    cuisine: string;
    location: string;
    budget: { min: number; max: number };
    radius: number;
    targetCustomers?: string[];
    businessModel?: 'dine-in' | 'delivery' | 'takeaway' | 'hybrid';
  };
  
  // Research progress
  progress: {
    currentAgent: string;
    overallProgress: number;
    agentProgress: Record<string, number>;
    status: 'initializing' | 'running' | 'completed' | 'error' | 'paused';
    startTime: Date;
    estimatedCompletion?: Date;
  };
  
  // Agent-specific data
  productAnalysis: {
    status: 'pending' | 'running' | 'completed' | 'error';
    data?: {
      popularDishes: Array<{
        name: string;
        frequency: number;
        avgPrice: number;
        profitability: number;
      }>;
      competitorMenus: Array<{
        restaurant: string;
        dishes: string[];
        priceRange: { min: number; max: number };
      }>;
      marketTrends: {
        seasonal: Record<string, number>;
        trending: string[];
        declining: string[];
      };
      recommendations: {
        menuOptimization: string[];
        pricingStrategy: string[];
        profitabilityImprovements: string[];
      };
    };
    error?: string;
  };
  
  placeAnalysis: {
    status: 'pending' | 'running' | 'completed' | 'error';
    data?: {
      location: {
        coordinates: { lat: number; lng: number };
        address: string;
        district: string;
      };
      demographics: {
        population: number;
        avgIncome: number;
        ageGroups: Record<string, number>;
        lifestyle: string[];
      };
      competition: {
        nearbyRestaurants: Array<{
          name: string;
          distance: number;
          cuisine: string;
          rating: number;
        }>;
        density: 'low' | 'medium' | 'high';
        marketSaturation: number;
      };
      accessibility: {
        publicTransport: number;
        parking: number;
        walkability: number;
        deliveryAccess: number;
      };
      realEstate: {
        avgRent: number;
        availability: number;
        propertyTypes: string[];
        futureProjects: string[];
      };
      recommendations: {
        optimalLocations: Array<{
          address: string;
          score: number;
          reasons: string[];
        }>;
        locationStrategy: string[];
      };
    };
    error?: string;
  };
  
  priceAnalysis: {
    status: 'pending' | 'running' | 'completed' | 'error';
    data?: {
      marketPricing: {
        competitors: Record<string, { min: number; max: number; avg: number }>;
        pricePositioning: 'budget' | 'mid-range' | 'premium';
        elasticity: number;
      };
      financialProjections: {
        revenue: {
          monthly: number[];
          annually: number;
          peakSeasons: string[];
        };
        costs: {
          fixed: number;
          variable: number;
          labor: number;
          ingredients: number;
        };
        profitability: {
          grossMargin: number;
          netMargin: number;
          breakEvenPoint: number;
          roi: number;
        };
      };
      recommendations: {
        optimalPricing: Record<string, number>;
        menuEngineering: string[];
        costOptimization: string[];
        revenueStrategies: string[];
      };
    };
    error?: string;
  };
  
  promotionAnalysis: {
    status: 'pending' | 'running' | 'completed' | 'error';
    data?: {
      sentiment: {
        overall: number;
        aspects: Record<string, number>;
        keywords: { positive: string[]; negative: string[] };
      };
      customerSegments: Array<{
        segment: string;
        size: number;
        characteristics: string[];
        preferences: string[];
      }>;
      marketingOpportunities: {
        channels: Record<string, number>;
        campaigns: string[];
        partnerships: string[];
        seasonalOpportunities: string[];
      };
      recommendations: {
        brandPositioning: string[];
        marketingStrategy: string[];
        customerAcquisition: string[];
        retentionStrategy: string[];
      };
    };
    error?: string;
  };
  
  reportGeneration: {
    status: 'pending' | 'running' | 'completed' | 'error';
    data?: {
      executiveSummary: string;
      viabilityScore: number;
      riskAssessment: {
        level: 'low' | 'medium' | 'high';
        factors: string[];
        mitigation: string[];
      };
      recommendations: {
        immediate: string[];
        shortTerm: string[];
        longTerm: string[];
      };
      financialSummary: {
        initialInvestment: number;
        projectedRevenue: number;
        breakEvenMonths: number;
        roiTimeframe: string;
      };
      nextSteps: string[];
    };
    error?: string;
  };
  
  // Messages and communication
  messages: BaseMessage[];
  
  // Error handling
  errors: Array<{
    agent: string;
    error: string;
    timestamp: Date;
    recovered: boolean;
  }>;
  
  // Real-time updates
  lastUpdate: Date;
  subscribers: string[]; // WebSocket connection IDs
}

// State management utilities
export class BiteBaseStateManager {
  static createInitialState(sessionId: string, parameters: any): BiteBaseResearchState {
    return {
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
  }
  
  static updateAgentStatus(
    state: BiteBaseResearchState, 
    agent: string, 
    status: 'running' | 'completed' | 'error', 
    progress: number = 0,
    data?: any,
    error?: string
  ): BiteBaseResearchState {
    const newState = { ...state };
    
    // Update specific agent
    const agentKey = `${agent}Analysis` as keyof BiteBaseResearchState;
    if (agentKey in newState) {
      (newState[agentKey] as any) = {
        ...((newState[agentKey] as any) || {}),
        status,
        data: data || (newState[agentKey] as any)?.data,
        error
      };
    }
    
    // Update progress
    newState.progress.agentProgress[agent] = progress;
    newState.progress.currentAgent = agent;
    
    // Calculate overall progress
    const agentProgressValues = Object.values(newState.progress.agentProgress);
    newState.progress.overallProgress = Math.round(
      agentProgressValues.reduce((sum, p) => sum + p, 0) / agentProgressValues.length
    );
    
    // Update status
    if (status === 'error') {
      newState.progress.status = 'error';
      newState.errors.push({
        agent,
        error: error || 'Unknown error',
        timestamp: new Date(),
        recovered: false
      });
    } else if (newState.progress.overallProgress === 100) {
      newState.progress.status = 'completed';
      newState.progress.estimatedCompletion = new Date();
    } else {
      newState.progress.status = 'running';
    }
    
    newState.lastUpdate = new Date();
    
    return newState;
  }
  
  static addSubscriber(state: BiteBaseResearchState, subscriberId: string): BiteBaseResearchState {
    return {
      ...state,
      subscribers: [...state.subscribers, subscriberId],
      lastUpdate: new Date()
    };
  }
  
  static removeSubscriber(state: BiteBaseResearchState, subscriberId: string): BiteBaseResearchState {
    return {
      ...state,
      subscribers: state.subscribers.filter(id => id !== subscriberId),
      lastUpdate: new Date()
    };
  }
  
  static addMessage(state: BiteBaseResearchState, message: BaseMessage): BiteBaseResearchState {
    return {
      ...state,
      messages: [...state.messages, message],
      lastUpdate: new Date()
    };
  }
  
  static estimateCompletion(state: BiteBaseResearchState): Date {
    const startTime = state.progress.startTime.getTime();
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = state.progress.overallProgress;
    
    if (progress === 0) {
      return new Date(currentTime + (20 * 60 * 1000)); // 20 minutes default
    }
    
    const totalEstimated = (elapsed / progress) * 100;
    const remaining = totalEstimated - elapsed;
    
    return new Date(currentTime + remaining);
  }
}

// Export the state type for use in other modules
export type ResearchState = BiteBaseResearchState;