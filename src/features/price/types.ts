// Price Module Types - Competitive and Strategic Pricing
import { CuisineType, PriceRange } from '../../shared/types';
import { MenuItem } from '../product/types';

export interface PriceBenchmarkingAnalysis {
  id: string;
  timestamp: Date;
  location: { lat: number; lng: number };
  radius: number;
  targetItem: MenuItem;
  competitorPrices: CompetitorPricing[];
  marketPriceAnalysis: {
    minimum: number;
    maximum: number;
    median: number;
    mean: number;
    standardDeviation: number;
    quartiles: {
      q1: number;
      q2: number;
      q3: number;
    };
  };
  pricePosition: "below_market" | "at_market" | "above_market" | "premium";
  recommendations: PricingRecommendation[];
  insights: string[];
}

export interface CompetitorPricing {
  competitorId: string;
  competitorName: string;
  itemName: string;
  price: number;
  priceRange: PriceRange;
  portionSize: string;
  quality: "budget" | "standard" | "premium" | "luxury";
  distance: number; // meters
  cuisine: CuisineType;
  lastUpdated: Date;
  source: "manual" | "scraping" | "api" | "mystery_shopping";
  confidence: number; // 0-1
}

export interface PricingRecommendation {
  id: string;
  type: "increase" | "decrease" | "maintain" | "dynamic" | "bundle";
  currentPrice: number;
  recommendedPrice: number;
  reasoning: string;
  expectedImpact: {
    demandChange: number; // percentage
    revenueChange: number; // percentage
    profitChange: number; // percentage
    marketShareChange: number; // percentage
  };
  confidence: number; // 0-1
  riskLevel: "low" | "medium" | "high";
  implementation: {
    timeline: string;
    testingStrategy: string;
    rollbackPlan: string;
  };
}

export interface PriceElasticityAnalysis {
  id: string;
  timestamp: Date;
  itemId: string;
  analysisPeriod: {
    start: Date;
    end: Date;
  };
  historicalData: PriceVolumeDataPoint[];
  elasticityCoefficient: number;
  elasticityType: "elastic" | "inelastic" | "unitary";
  optimalPriceRange: {
    minimum: number;
    maximum: number;
    optimal: number;
  };
  revenueOptimization: {
    currentRevenue: number;
    projectedRevenue: number;
    revenueIncrease: number;
  };
  demandCurve: DemandCurvePoint[];
  insights: string[];
}

export interface PriceVolumeDataPoint {
  date: Date;
  price: number;
  volume: number;
  revenue: number;
  externalFactors: {
    seasonality: number;
    competition: number;
    marketing: number;
    weather: number;
  };
}

export interface DemandCurvePoint {
  price: number;
  quantity: number;
  revenue: number;
  profit: number;
}

export interface BreakEvenAnalysis {
  id: string;
  timestamp: Date;
  itemId: string;
  fixedCosts: number;
  variableCostPerUnit: number;
  sellingPrice: number;
  breakEvenQuantity: number;
  breakEvenRevenue: number;
  marginOfSafety: {
    units: number;
    percentage: number;
    revenue: number;
  };
  scenarios: BreakEvenScenario[];
  sensitivityAnalysis: {
    priceChange: SensitivityPoint[];
    costChange: SensitivityPoint[];
    volumeChange: SensitivityPoint[];
  };
  insights: string[];
}

export interface BreakEvenScenario {
  name: string;
  priceChange: number; // percentage
  costChange: number; // percentage
  volumeChange: number; // percentage
  newBreakEven: number;
  impact: string;
}

export interface SensitivityPoint {
  change: number; // percentage change in input
  breakEvenImpact: number; // impact on break-even quantity
  profitImpact: number; // impact on profit
}

export interface DynamicPricingStrategy {
  id: string;
  timestamp: Date;
  itemId: string;
  strategy: "time_based" | "demand_based" | "inventory_based" | "competitor_based" | "hybrid";
  rules: PricingRule[];
  performanceMetrics: {
    revenueIncrease: number;
    profitIncrease: number;
    customerSatisfaction: number;
    competitivePosition: number;
  };
  schedule: PricingSchedule[];
  insights: string[];
}

export interface PricingRule {
  id: string;
  condition: string;
  priceAdjustment: number; // percentage or absolute
  maxPrice: number;
  minPrice: number;
  active: boolean;
  priority: number;
}

export interface PricingSchedule {
  date: Date;
  time: string;
  price: number;
  reasoning: string;
  expectedDemand: number;
}