/**
 * Enhanced Deep Agent State Management for Market Research
 * Based on LangChain deep-agents-from-scratch patterns with market research specialization
 */

import { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";
import { RestaurantAnalyticsState } from "../types/restaurant-intelligence";

// TODO Task Tracking
export interface Todo {
  content: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedAgent?: string;
  createdAt: string;
  updatedAt: string;
}

// Market Research Context
export interface MarketResearchContext {
  sessionId: string;
  targetCompany?: string;
  industrySector?: string;
  geographicScope?: string[];
  researchObjectives: string[];
  timeHorizon?: string;
  phase: 'planning' | 'data_collection' | 'analysis' | 'synthesis' | 'reporting';
  findings: Record<string, any>;
  nextActions: string[];
}

// Competitor Profile for competitive analysis
export interface CompetitorProfile {
  name: string;
  industry: string;
  marketCap?: number;
  revenue?: number;
  employees?: number;
  keyProducts: string[];
  marketPosition: string;
  strengths: string[];
  weaknesses: string[];
  marketShare?: number;
  lastUpdated: string;
}

// Market Trend Analysis
export interface TrendAnalysis {
  trendId: string;
  title: string;
  category: 'technology' | 'consumer' | 'regulatory' | 'economic' | 'social';
  description: string;
  impact: 'low' | 'medium' | 'high';
  timeframe: 'short_term' | 'medium_term' | 'long_term';
  sources: string[];
  confidence: number;
  lastUpdated: string;
}

// Consumer Insights Profile
export interface ConsumerProfile {
  segment: string;
  demographics: Record<string, any>;
  behaviors: string[];
  preferences: string[];
  painPoints: string[];
  trends: string[];
  lastUpdated: string;
}

// Financial Analysis Data
export interface FinancialAnalysis {
  companyName: string;
  period: string;
  metrics: Record<string, number>;
  ratios: Record<string, number>;
  growth: Record<string, number>;
  valuation: Record<string, number>;
  lastUpdated: string;
}

// Regulatory Update Tracking
export interface RegulatoryUpdate {
  jurisdiction: string;
  category: string;
  title: string;
  description: string;
  effectiveDate?: string;
  impact: 'low' | 'medium' | 'high';
  affectedIndustries: string[];
  lastUpdated: string;
}

// Research Plan Structure
export interface ResearchPlan {
  objectives: string[];
  methodology: string[];
  timeline: Record<string, string>;
  resources: string[];
  deliverables: string[];
  successCriteria: string[];
}

// Evidence Collection Item
export interface EvidenceItem {
  id: string;
  type: 'primary' | 'secondary' | 'tertiary';
  source: string;
  content: string;
  relevance: number;
  credibility: number;
  date: string;
  tags: string[];
}

// Validation State
export interface ValidationState {
  crossReferencesCompleted: boolean;
  sourceCredibilityChecked: boolean;
  dataConsistencyVerified: boolean;
  expertReviewRequired: boolean;
  confidenceLevel: number;
}

// Report Section
export interface ReportSection {
  title: string;
  content: string;
  charts?: string[];
  tables?: string[];
  recommendations?: string[];
  confidence: number;
}

// Market Intelligence aggregated data
export interface MarketIntelligence {
  competitors: Record<string, CompetitorProfile>;
  marketTrends: TrendAnalysis[];
  consumerInsights: ConsumerProfile[];
  financialData: FinancialAnalysis[];
  regulatoryLandscape: RegulatoryUpdate[];
}

// Enhanced Business Intelligence Matrices
export interface BusinessMatrix {
  name: string;
  type: 'swot' | 'porter_5_forces' | 'bcg' | 'ansoff' | 'value_chain' | 'pest' | 'canvas' | 'kpi_dashboard';
  data: Record<string, any>;
  analysis: Record<string, any>;
  recommendations: string[];
  confidence: number;
  lastUpdated: string;
}

// Enhanced Deep Agent State for Market Research
export const MarketResearchAgentState = Annotation.Root({
  // Core messaging
  messages: Annotation<BaseMessage[]>({
    reducer: (currentState: BaseMessage[], updateValue: BaseMessage[]) => currentState.concat(updateValue),
    default: () => [],
  }),
  
  // Task Planning & Progress Tracking
  todos: Annotation<Todo[]>({
    reducer: (left: Todo[] | undefined, right: Todo[] | undefined) => {
      if (!left) return right || [];
      if (!right) return left;
      
      const merged = [...left];
      for (const newTodo of right) {
        const existingIndex = merged.findIndex(todo => todo.content === newTodo.content);
        if (existingIndex >= 0) {
          merged[existingIndex] = newTodo;
        } else {
          merged.push(newTodo);
        }
      }
      return merged;
    },
    default: () => [],
  }),
  
  // Virtual Filesystem for Context Offloading
  files: Annotation<Record<string, string>>({
    reducer: (left: Record<string, string> | undefined, right: Record<string, string> | undefined) => {
      if (!left) return right || {};
      if (!right) return left;
      return { ...left, ...right };
    },
    default: () => ({}),
  }),

  // Market Research Context
  researchContext: Annotation<MarketResearchContext>({
    reducer: (left: MarketResearchContext | undefined, right: MarketResearchContext | undefined) => {
      if (!left) return right;
      if (!right) return left;
      return { ...left, ...right };
    },
    default: () => ({
      sessionId: '',
      researchObjectives: [],
      phase: 'planning',
      findings: {},
      nextActions: []
    }),
  }),

  // Market Intelligence Layer
  marketIntelligence: Annotation<MarketIntelligence>({
    reducer: (left: MarketIntelligence | undefined, right: MarketIntelligence | undefined) => {
      if (!left) return right || {
        competitors: {},
        marketTrends: [],
        consumerInsights: [],
        financialData: [],
        regulatoryLandscape: []
      };
      if (!right) return left;
      
      return {
        competitors: { ...left.competitors, ...right.competitors },
        marketTrends: [...left.marketTrends, ...right.marketTrends],
        consumerInsights: [...left.consumerInsights, ...right.consumerInsights],
        financialData: [...left.financialData, ...right.financialData],
        regulatoryLandscape: [...left.regulatoryLandscape, ...right.regulatoryLandscape]
      };
    },
    default: () => ({
      competitors: {},
      marketTrends: [],
      consumerInsights: [],
      financialData: [],
      regulatoryLandscape: []
    }),
  }),

  // Research Workflow State
  researchPlan: Annotation<ResearchPlan>({
    reducer: (left: ResearchPlan | undefined, right: ResearchPlan | undefined) => {
      if (!left) return right;
      if (!right) return left;
      return { ...left, ...right };
    },
    default: () => ({
      objectives: [],
      methodology: [],
      timeline: {},
      resources: [],
      deliverables: [],
      successCriteria: []
    }),
  }),

  // Evidence Collection
  evidenceCollection: Annotation<EvidenceItem[]>({
    reducer: (left: EvidenceItem[] | undefined, right: EvidenceItem[] | undefined) => {
      if (!left) return right || [];
      if (!right) return left;
      
      const merged = [...left];
      for (const newEvidence of right) {
        const existingIndex = merged.findIndex(evidence => evidence.id === newEvidence.id);
        if (existingIndex >= 0) {
          merged[existingIndex] = newEvidence;
        } else {
          merged.push(newEvidence);
        }
      }
      return merged;
    },
    default: () => [],
  }),

  // Validation Status
  validationStatus: Annotation<ValidationState>({
    reducer: (left: ValidationState | undefined, right: ValidationState | undefined) => {
      if (!left) return right;
      if (!right) return left;
      return { ...left, ...right };
    },
    default: () => ({
      crossReferencesCompleted: false,
      sourceCredibilityChecked: false,
      dataConsistencyVerified: false,
      expertReviewRequired: false,
      confidenceLevel: 0
    }),
  }),

  // Report Sections
  reportSections: Annotation<ReportSection[]>({
    reducer: (left: ReportSection[] | undefined, right: ReportSection[] | undefined) => {
      if (!left) return right || [];
      if (!right) return left;
      
      const merged = [...left];
      for (const newSection of right) {
        const existingIndex = merged.findIndex(section => section.title === newSection.title);
        if (existingIndex >= 0) {
          merged[existingIndex] = newSection;
        } else {
          merged.push(newSection);
        }
      }
      return merged;
    },
    default: () => [],
  }),
  
  // Business Intelligence Matrices
  businessMatrices: Annotation<BusinessMatrix[]>({
    reducer: (left: BusinessMatrix[] | undefined, right: BusinessMatrix[] | undefined) => {
      if (!left) return right || [];
      if (!right) return left;
      
      const merged = [...left];
      for (const newMatrix of right) {
        const existingIndex = merged.findIndex(matrix => matrix.name === newMatrix.name && matrix.type === newMatrix.type);
        if (existingIndex >= 0) {
          merged[existingIndex] = newMatrix;
        } else {
          merged.push(newMatrix);
        }
      }
      return merged;
    },
    default: () => [],
  }),
});

export type MarketResearchAgentStateType = typeof MarketResearchAgentState.State;

// Keep backward compatibility
export const DeepAgentState = MarketResearchAgentState;
export type DeepAgentStateType = MarketResearchAgentStateType;