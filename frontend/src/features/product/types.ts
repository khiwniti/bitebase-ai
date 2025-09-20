// Product Module Types - Menu and Sales Performance Analytics
import { CuisineType, PriceRange, CustomerSegment } from '../../shared/types';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  costOfGoodsSold: number;
  grossMargin: number;
  grossMarginPercentage: number;
  salesVolume: number;
  popularity: number; // 0-1 score based on sales volume
  profitability: number; // 0-1 score based on margin
  menuEngineeringCategory: "star" | "plow_horse" | "puzzle" | "dog";
  ingredients: string[];
  allergens: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sodium: number;
  };
  preparationTime: number; // minutes
  complexity: "simple" | "moderate" | "complex";
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isDairyFree: boolean;
  isAvailable: boolean;
  seasonality: string[];
}

export interface MenuAnalysis {
  id: string;
  timestamp: Date;
  totalItems: number;
  totalRevenue: number;
  totalProfit: number;
  averagePrice: number;
  averageMargin: number;
  categoryBreakdown: {
    [category: string]: {
      items: number;
      revenue: number;
      profit: number;
      averagePrice: number;
    };
  };
  engineeringMatrix: {
    stars: MenuItem[];
    plowHorses: MenuItem[];
    puzzles: MenuItem[];
    dogs: MenuItem[];
  };
  topPerformers: {
    byRevenue: MenuItem[];
    byProfit: MenuItem[];
    byVolume: MenuItem[];
    byMargin: MenuItem[];
  };
  insights: string[];
  recommendations: MenuRecommendation[];
}

export interface MenuRecommendation {
  id: string;
  type: "add_item" | "remove_item" | "modify_price" | "promote_item" | "reposition_item";
  targetItem?: string;
  description: string;
  reasoning: string;
  expectedImpact: {
    revenueChange: number;
    profitChange: number;
    customerSatisfaction: number;
  };
  confidence: number; // 0-1
  urgency: "low" | "medium" | "high";
}

export interface SalesForecasting {
  id: string;
  timestamp: Date;
  forecastPeriod: {
    start: Date;
    end: Date;
  };
  granularity: "daily" | "weekly" | "monthly";
  confidence: number;
  algorithm: "arima" | "linear_regression" | "seasonal_decomposition" | "neural_network";
  historicalData: SalesDataPoint[];
  forecastData: SalesDataPoint[];
  predictionInterval: {
    lower: SalesDataPoint[];
    upper: SalesDataPoint[];
  };
  seasonalFactors: {
    [period: string]: number;
  };
  trendAnalysis: {
    direction: "increasing" | "decreasing" | "stable";
    strength: number;
    significance: number;
  };
  insights: string[];
}

export interface SalesDataPoint {
  date: Date;
  value: number;
  itemId?: string;
  category?: string;
  dayOfWeek?: string;
  isHoliday?: boolean;
  weatherFactor?: number;
  promotionActive?: boolean;
}

export interface CustomerSegmentAnalysis {
  id: string;
  timestamp: Date;
  segments: {
    [segment in CustomerSegment]: SegmentProfile;
  };
  crossSegmentInsights: string[];
  segmentationStrategy: SegmentationRecommendation[];
}

export interface SegmentProfile {
  size: number;
  revenue: number;
  averageOrderValue: number;
  frequency: number;
  lifetime_value: number;
  preferredItems: MenuItem[];
  preferredCategories: string[];
  priceElasticity: number;
  loyaltyScore: number;
  churnRisk: number;
  growthPotential: number;
  demographics: {
    ageRange: string;
    incomeLevel: string;
    diningFrequency: string;
  };
  behaviorPatterns: {
    preferredTimes: string[];
    seasonalPreferences: string[];
    channelPreferences: string[];
  };
}

export interface SegmentationRecommendation {
  targetSegment: CustomerSegment;
  action: "acquire" | "retain" | "grow" | "winback";
  strategy: string;
  tactics: string[];
  estimatedROI: number;
  timeframe: string;
}