// Enhanced Shared State Provider - Cross-module analytics state management
"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { aiActionDispatcher, type ActionResult } from '../../lib/ai-actions';

// Import all module types
import type { CompetitorAnalysis, HotspotAnalysis, CustomerDensityLayer } from '../../features/place/types';
import type { MenuAnalysis, SalesForecasting, CustomerSegmentAnalysis } from '../../features/product/types';
import type { PriceBenchmarkingAnalysis, PriceElasticityAnalysis } from '../../features/price/types';
import type { MarketingCampaign, SentimentAnalysis, LoyaltyProgramAnalysis } from '../../features/promotion/types';

// Enhanced application state interface
export interface EnhancedAppState {
  // Core map state
  map: {
    center: { lat: number; lng: number };
    zoom: number;
    markers: Array<{
      id: string;
      type: string;
      position: { lat: number; lng: number };
      title: string;
      description?: string;
    }>;
    bounds?: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
    layers: MapLayer[];
    activeAnalysis?: string;
  };

  // Place module state
  place: {
    competitorAnalyses: CompetitorAnalysis[];
    hotspotAnalyses: HotspotAnalysis[];
    customerDensityLayers: CustomerDensityLayer[];
    activeAnalysis?: CompetitorAnalysis | HotspotAnalysis;
    marketGaps: any[];
    isAnalyzing: boolean;
  };

  // Product module state
  product: {
    menuAnalyses: MenuAnalysis[];
    salesForecasts: SalesForecasting[];
    customerSegments: CustomerSegmentAnalysis[];
    activeAnalysis?: MenuAnalysis | SalesForecasting;
    isAnalyzing: boolean;
  };

  // Price module state
  price: {
    pricingAnalyses: PriceBenchmarkingAnalysis[];
    elasticityAnalyses: PriceElasticityAnalysis[];
    competitorPricing: any[];
    activeAnalysis?: PriceBenchmarkingAnalysis | PriceElasticityAnalysis;
    isAnalyzing: boolean;
  };

  // Promotion module state
  promotion: {
    campaigns: MarketingCampaign[];
    sentimentAnalyses: SentimentAnalysis[];
    loyaltyAnalyses: LoyaltyProgramAnalysis[];
    activeAnalysis?: MarketingCampaign | SentimentAnalysis;
    isAnalyzing: boolean;
  };

  // Cross-module analytics
  analytics: {
    crossModuleInsights: CrossModuleInsight[];
    activeWorkflow?: AnalyticsWorkflow;
    generatedComponents: GeneratedComponent[];
  };

  // UI state
  ui: {
    activeModule: 'place' | 'product' | 'price' | 'promotion' | null;
    sidebarOpen: boolean;
    modalStack: ModalState[];
    notifications: Notification[];
    isAIThinking: boolean;
  };

  // Chat state
  chat: {
    messages: ChatMessage[];
    isProcessing: boolean;
    context: any;
  };
}

export interface MapLayer {
  id: string;
  type: 'competitor' | 'hotspot' | 'density' | 'market_gap' | 'customer_segment';
  visible: boolean;
  data: any;
  style: any;
}

export interface CrossModuleInsight {
  id: string;
  type: 'correlation' | 'recommendation' | 'alert' | 'opportunity';
  modules: string[];
  title: string;
  description: string;
  actionable: boolean;
  confidence: number;
  timestamp: Date;
}

export interface AnalyticsWorkflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
  currentStep: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  results: any[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  module: string;
  action: string;
  parameters: any;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: ActionResult;
}

export interface GeneratedComponent {
  id: string;
  type: 'chart' | 'card' | 'table' | 'map_layer' | 'modal';
  component: string;
  props: any;
  position: 'main' | 'sidebar' | 'modal' | 'overlay';
  persistent: boolean;
}

export interface ModalState {
  id: string;
  component: string;
  props: any;
  closable: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  persistent: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  actions?: any[];
  components?: GeneratedComponent[];
}

// Action types
export type EnhancedAppAction = 
  | { type: 'SET_MAP_CENTER'; payload: { lat: number; lng: number } }
  | { type: 'SET_MAP_ZOOM'; payload: number }
  | { type: 'ADD_MARKER'; payload: any }
  | { type: 'ADD_MAP_LAYER'; payload: MapLayer }
  | { type: 'TOGGLE_MAP_LAYER'; payload: string }
  | { type: 'SET_ACTIVE_MODULE'; payload: 'place' | 'product' | 'price' | 'promotion' | null }
  | { type: 'ADD_COMPETITOR_ANALYSIS'; payload: CompetitorAnalysis }
  | { type: 'ADD_HOTSPOT_ANALYSIS'; payload: HotspotAnalysis }
  | { type: 'ADD_MENU_ANALYSIS'; payload: MenuAnalysis }
  | { type: 'ADD_PRICING_ANALYSIS'; payload: PriceBenchmarkingAnalysis }
  | { type: 'ADD_CAMPAIGN'; payload: MarketingCampaign }
  | { type: 'START_ANALYTICS_WORKFLOW'; payload: AnalyticsWorkflow }
  | { type: 'UPDATE_WORKFLOW_STEP'; payload: { workflowId: string; stepId: string; result: ActionResult } }
  | { type: 'ADD_GENERATED_COMPONENT'; payload: GeneratedComponent }
  | { type: 'REMOVE_GENERATED_COMPONENT'; payload: string }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_AI_THINKING'; payload: boolean }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

// Reducer function
function enhancedAppReducer(state: EnhancedAppState, action: EnhancedAppAction): EnhancedAppState {
  switch (action.type) {
    case 'SET_MAP_CENTER':
      return {
        ...state,
        map: { ...state.map, center: action.payload }
      };
    
    case 'SET_MAP_ZOOM':
      return {
        ...state,
        map: { ...state.map, zoom: action.payload }
      };
    
    case 'ADD_MAP_LAYER':
      return {
        ...state,
        map: { 
          ...state.map, 
          layers: [...state.map.layers, action.payload] 
        }
      };
    
    case 'SET_ACTIVE_MODULE':
      return {
        ...state,
        ui: { ...state.ui, activeModule: action.payload }
      };
    
    case 'ADD_COMPETITOR_ANALYSIS':
      return {
        ...state,
        place: {
          ...state.place,
          competitorAnalyses: [...state.place.competitorAnalyses, action.payload],
          activeAnalysis: action.payload
        }
      };
    
    case 'ADD_GENERATED_COMPONENT':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          generatedComponents: [...state.analytics.generatedComponents, action.payload]
        }
      };
    
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chat: {
          ...state.chat,
          messages: [...state.chat.messages, action.payload]
        }
      };
    
    case 'SET_AI_THINKING':
      return {
        ...state,
        ui: { ...state.ui, isAIThinking: action.payload }
      };
    
    default:
      return state;
  }
}

// Initial state
const initialState: EnhancedAppState = {
  map: {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 12,
    markers: [],
    layers: [],
  },
  place: {
    competitorAnalyses: [],
    hotspotAnalyses: [],
    customerDensityLayers: [],
    marketGaps: [],
    isAnalyzing: false,
  },
  product: {
    menuAnalyses: [],
    salesForecasts: [],
    customerSegments: [],
    isAnalyzing: false,
  },
  price: {
    pricingAnalyses: [],
    elasticityAnalyses: [],
    competitorPricing: [],
    isAnalyzing: false,
  },
  promotion: {
    campaigns: [],
    sentimentAnalyses: [],
    loyaltyAnalyses: [],
    isAnalyzing: false,
  },
  analytics: {
    crossModuleInsights: [],
    generatedComponents: [],
  },
  ui: {
    activeModule: null,
    sidebarOpen: true,
    modalStack: [],
    notifications: [],
    isAIThinking: false,
  },
  chat: {
    messages: [],
    isProcessing: false,
    context: {},
  },
};

// Context
const EnhancedSharedStateContext = createContext<{
  state: EnhancedAppState;
  dispatch: React.Dispatch<EnhancedAppAction>;
  actions: {
    executeAIAction: (actionName: string, parameters: any) => Promise<ActionResult>;
    generateComponent: (description: string, data: any) => Promise<void>;
    startWorkflow: (workflowName: string, parameters: any) => Promise<void>;
  };
} | null>(null);

// Provider component
export function EnhancedSharedStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(enhancedAppReducer, initialState);

  // Initialize AI action dispatcher with state context
  useEffect(() => {
    aiActionDispatcher.setStateContext(state);
  }, [state]);

  // Enhanced actions
  const actions = {
    async executeAIAction(actionName: string, parameters: any): Promise<ActionResult> {
      dispatch({ type: 'SET_AI_THINKING', payload: true });
      
      try {
        const result = await aiActionDispatcher.dispatch(actionName as any, parameters);
        
        // Handle result visualizations
        if (result.visualizations) {
          for (const viz of result.visualizations) {
            dispatch({
              type: 'ADD_GENERATED_COMPONENT',
              payload: {
                id: `${actionName}-${Date.now()}`,
                type: viz.type as any,
                component: viz.component,
                props: viz.props,
                position: viz.position || 'main',
                persistent: false,
              }
            });
          }
        }
        
        return result;
      } finally {
        dispatch({ type: 'SET_AI_THINKING', payload: false });
      }
    },

    async generateComponent(description: string, data: any): Promise<void> {
      // AI-driven component generation logic
      const component: GeneratedComponent = {
        id: `generated-${Date.now()}`,
        type: 'card',
        component: 'AnalyticsCard',
        props: { description, data },
        position: 'sidebar',
        persistent: false,
      };
      
      dispatch({ type: 'ADD_GENERATED_COMPONENT', payload: component });
    },

    async startWorkflow(workflowName: string, parameters: any): Promise<void> {
      // Initialize and execute multi-step analytics workflow
      const workflow: AnalyticsWorkflow = {
        id: `workflow-${Date.now()}`,
        name: workflowName,
        steps: [], // Would be populated based on workflow type
        currentStep: 0,
        status: 'running',
        results: [],
      };
      
      dispatch({ type: 'START_ANALYTICS_WORKFLOW', payload: workflow });
    },
  };

  return (
    <EnhancedSharedStateContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </EnhancedSharedStateContext.Provider>
  );
}

// Hook for consuming the context
export function useEnhancedSharedState() {
  const context = useContext(EnhancedSharedStateContext);
  if (!context) {
    throw new Error('useEnhancedSharedState must be used within EnhancedSharedStateProvider');
  }
  return context;
}

// Selector hooks for specific modules
export function usePlaceState() {
  const { state } = useEnhancedSharedState();
  return state.place;
}

export function useProductState() {
  const { state } = useEnhancedSharedState();
  return state.product;
}

export function usePriceState() {
  const { state } = useEnhancedSharedState();
  return state.price;
}

export function usePromotionState() {
  const { state } = useEnhancedSharedState();
  return state.promotion;
}

export function useAnalyticsState() {
  const { state } = useEnhancedSharedState();
  return state.analytics;
}
