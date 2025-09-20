// BiteBase AI - LangGraph State Management
// Professional agent coordination system with StateGraph integration

import { BaseMessage } from '@langchain/core/messages';

// Enhanced state interface for LangGraph integration
export interface BiteBaseState {
  sessionId: string;
  status: 'initializing' | 'running' | 'completed' | 'error' | 'paused';
  progress: number;
  currentAgent: string;
  
  // Analysis parameters
  parameters: {
    location?: {
      lat: number;
      lng: number;
      radius?: number;
      address?: string;
    };
    restaurantType?: string;
    cuisine?: string[];
    budget?: {
      min: number;
      max: number;
    };
    targetMarket?: string;
    businessModel?: 'dine-in' | 'delivery' | 'takeaway' | 'hybrid';
  };
  
  // Agent results following the 4P framework
  results: {
    product?: ProductAnalysisResult;
    place?: PlaceAnalysisResult;
    price?: PriceAnalysisResult;
    promotion?: PromotionAnalysisResult;
    report?: ReportGenerationResult;
  };
  
  // LangGraph specific fields
  messages: BaseMessage[];
  nextAgent?: string;
  errors: string[];
  retryCount: number;
  
  // Real-time collaboration fields
  socketId?: string;
  lastUpdated: Date;
  collaborators: string[];
}

// 4P Analysis Result Interfaces
export interface ProductAnalysisResult {
  topDishes: string[];
  dishAnalysis: {
    name: string;
    popularity: number;
    profitability: number;
    seasonality: string[];
  }[];
  menuOptimization: {
    recommendations: string[];
    pricing: { [dish: string]: number };
  };
  competitorMenus: {
    restaurant: string;
    dishes: string[];
    avgPrice: number;
  }[];
  marketTrends: string[];
  confidence: number;
}

export interface PlaceAnalysisResult {
  locationScore: number;
  competitorDensity: {
    count: number;
    radius: number;
    saturation: 'low' | 'medium' | 'high';
  };
  demographics: {
    population: number;
    avgIncome: number;
    ageGroups: { [range: string]: number };
  };
  accessibility: {
    publicTransport: number;
    parking: number;
    walkability: number;
  };
  rentAnalysis: {
    avgRent: number;
    priceRange: { min: number; max: number };
    availability: string[];
  };
  deliveryAnalysis: {
    coverage: string;
    demand: number;
    competition: number;
  };
  confidence: number;
}

export interface PriceAnalysisResult {
  revenueForecasting: {
    monthly: number[];
    annual: number;
    breakEven: number;
  };
  pricing: {
    optimal: { [category: string]: number };
    competitive: { [category: string]: number };
    premium: { [category: string]: number };
  };
  peakAnalysis: {
    hours: string[];
    days: string[];
    seasonal: string[];
  };
  profitability: {
    margins: { [item: string]: number };
    costOptimization: string[];
  };
  confidence: number;
}

export interface PromotionAnalysisResult {
  sentimentAnalysis: {
    overall: number;
    aspects: { [aspect: string]: number };
    keywords: string[];
  };
  customerSegmentation: {
    segments: {
      name: string;
      size: number;
      preferences: string[];
      spending: number;
    }[];
  };
  marketingOpportunities: {
    channels: string[];
    strategies: string[];
    campaigns: {
      name: string;
      target: string;
      expectedROI: number;
    }[];
  };
  competitorPromotions: {
    restaurant: string;
    strategies: string[];
    effectiveness: number;
  }[];
  confidence: number;
}

export interface ReportGenerationResult {
  executiveSummary: string;
  viabilityScore: number;
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    category: 'product' | 'place' | 'price' | 'promotion';
    action: string;
    impact: string;
    timeline: string;
  }[];
  risks: {
    level: 'high' | 'medium' | 'low';
    description: string;
    mitigation: string;
  }[];
  financialProjection: {
    investment: number;
    roi: number;
    paybackPeriod: number;
  };
  nextSteps: string[];
  confidence: number;
}

// LangGraph Node Response Interface
export interface NodeResponse {
  nextAgent?: string;
  shouldContinue: boolean;
  errors?: string[];
  progress?: number;
  data?: any;
}

// Agent Configuration Interface
export interface AgentConfig {
  name: string;
  label: string;
  description: string;
  dependencies: string[];
  estimatedDuration: number;
  mcpServers?: string[];
  retryLimit: number;
}

// Default agent configurations following the 4P framework
export const AGENT_CONFIGS: { [key: string]: AgentConfig } = {
  product: {
    name: 'product',
    label: 'Product Analysis Agent',
    description: 'Analyzes menu items, dish popularity, and profitability using Wongnai and Food Panda data',
    dependencies: [],
    estimatedDuration: 5000,
    mcpServers: ['playwright-mcp', 'sqlite-mcp'],
    retryLimit: 3
  },
  place: {
    name: 'place',
    label: 'Place Analysis Agent',
    description: 'Evaluates location viability using competitor density and rental data from DDProperty/RentHub',
    dependencies: ['product'],
    estimatedDuration: 4000,
    mcpServers: ['playwright-mcp', 'gis-mcp', 'sqlite-mcp'],
    retryLimit: 3
  },
  price: {
    name: 'price',
    label: 'Price Analysis Agent',
    description: 'Performs revenue forecasting and pricing optimization analysis',
    dependencies: ['product', 'place'],
    estimatedDuration: 3000,
    mcpServers: ['finance-tools-mcp', 'sqlite-mcp'],
    retryLimit: 3
  },
  promotion: {
    name: 'promotion',
    label: 'Promotion Analysis Agent',
    description: 'Conducts sentiment analysis and customer segmentation using review data',
    dependencies: ['product'],
    estimatedDuration: 4000,
    mcpServers: ['playwright-mcp', 'sqlite-mcp'],
    retryLimit: 3
  },
  report: {
    name: 'report',
    label: 'Report Generation Agent',
    description: 'Synthesizes all analysis results into comprehensive business intelligence report',
    dependencies: ['product', 'place', 'price', 'promotion'],
    estimatedDuration: 2000,
    mcpServers: ['echarts-mcp', 'mermaid-mcp', 'sqlite-mcp'],
    retryLimit: 2
  }
};

// State update helpers
export function updateStateProgress(state: BiteBaseState, agent: string, progress: number): BiteBaseState {
  return {
    ...state,
    currentAgent: agent,
    progress,
    lastUpdated: new Date()
  };
}

export function updateStateResult(state: BiteBaseState, agent: string, result: any): BiteBaseState {
  return {
    ...state,
    results: {
      ...state.results,
      [agent]: result
    },
    lastUpdated: new Date()
  };
}

export function updateStateError(state: BiteBaseState, error: string): BiteBaseState {
  return {
    ...state,
    errors: [...state.errors, error],
    retryCount: state.retryCount + 1,
    lastUpdated: new Date()
  };
}

// State validation functions
export function validateAnalysisParameters(parameters: any): boolean {
  if (!parameters) return false;
  
  // At minimum, we need either location or restaurant type
  return !!(parameters.location || parameters.restaurantType);
}

export function canExecuteAgent(state: BiteBaseState, agentName: string): boolean {
  const config = AGENT_CONFIGS[agentName];
  if (!config) return false;
  
  // Check if all dependencies are completed
  return config.dependencies.every(dep => !!state.results[dep]);
}

export function isAnalysisComplete(state: BiteBaseState): boolean {
  const requiredAgents = ['product', 'place', 'price', 'promotion', 'report'];
  return requiredAgents.every(agent => !!state.results[agent]);
}

// Initial state factory
export function createInitialState(sessionId: string, parameters: any): BiteBaseState {
  return {
    sessionId,
    status: 'initializing',
    progress: 0,
    currentAgent: 'initializing',
    parameters,
    results: {},
    messages: [],
    errors: [],
    retryCount: 0,
    lastUpdated: new Date(),
    collaborators: []
  };
}