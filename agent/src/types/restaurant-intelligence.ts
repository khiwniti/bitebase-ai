// Restaurant Intelligence Types for BiteBase Agent

export interface RestaurantLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  type: 'own' | 'competitor';
  cuisine?: string;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  rating?: number;
  isSelected?: boolean;
}

export interface CustomerDataPoint {
  id: string;
  lat: number;
  lng: number;
  orderValue: number;
  orderCount: number;
  lastOrderDate: string;
  customerSegment: 'new' | 'regular' | 'vip' | 'at-risk';
}

export interface MenuItemAnalytics {
  id: string;
  name: string;
  category: string;
  salesVolume: number;
  revenue: number;
  cogs: number;
  profitMargin: number;
  popularity: number; // percentile
  profitability: number; // percentile
  trend: 'up' | 'down' | 'stable';
}

export interface HotspotData {
  id: string;
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: {
    value: number;
    zScore: number;
    pValue: number;
    significance: 'hot' | 'cold' | 'neutral';
    metric: string;
  };
}

export interface MapViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

export interface AnalyticsFilters {
  timeRange: {
    start: string;
    end: string;
    preset: 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
  };
  selectedBranch?: string;
  dayOfWeek?: string[];
  timeOfDay?: {
    start: string;
    end: string;
  };
  customerSegments?: string[];
  menuCategories?: string[];
}

export interface RestaurantAnalyticsState {
  // Map State
  mapView: MapViewState;
  restaurants: RestaurantLocation[];
  customers: CustomerDataPoint[];
  hotspots: HotspotData[];
  selectedLocation?: string;
  
  // Analytics State
  activeModule: 'place' | 'product' | 'price' | 'promotion';
  filters: AnalyticsFilters;
  menuItems: MenuItemAnalytics[];
  
  // UI State
  isLoading: boolean;
  showHeatmap: boolean;
  showCompetitors: boolean;
  showHotspots: boolean;
  
  // AI State
  lastAIAction?: string;
  aiInsights: string[];
}

// Analysis Result Types
export interface CompetitorAnalysisResult {
  analysis: 'competitor_density';
  location: string;
  radius: number;
  competitorCount: number;
  marketSaturation: 'low' | 'moderate' | 'high';
  recommendations: string[];
  insight: string;
}

export interface HotspotAnalysisResult {
  analysis: 'customer_hotspots';
  timeframe: string;
  metric: string;
  hotspots: Array<{
    area: string;
    zScore: number;
    pValue: number;
    significance: string;
    metric: string;
    averageValue: number;
    recommendation: string;
  }>;
  insight: string;
}

export interface MenuAnalysisResult {
  analysis: 'menu_performance';
  category: string;
  sortBy: string;
  items: Array<{
    name: string;
    category: string;
    salesVolume: number;
    revenue: number;
    cogs: number;
    profitMargin: number;
    popularity: number;
    profitability: number;
    quadrant: 'Star' | 'Puzzle' | 'Plow Horse' | 'Dog';
    recommendation: string;
  }>;
  summary: {
    totalItems: number;
    stars: number;
    puzzles: number;
    plowHorses: number;
    dogs: number;
  };
  insight: string;
}

export interface PricingAnalysisResult {
  analysis: 'pricing_strategy';
  item: string;
  currentPrice: number;
  competitorAverage: number;
  priceDifference: string;
  positioning: 'competitive' | 'premium' | 'value';
  elasticityCoefficient: number;
  optimalPrice: number;
  potentialRevenueIncrease: string;
  pricePoints: Array<{
    price: number;
    demand: number;
    revenue: number;
  }>;
  insight: string;
}

export interface CustomerSegmentAnalysisResult {
  analysis: 'customer_segments';
  segmentationType: string;
  segments: Array<{
    name: string;
    count: number;
    recency: number;
    frequency: number;
    monetary: number;
    characteristics: string[];
    ltv: number;
    recommendations: string[];
  }>;
  summary: {
    totalCustomers: number;
    averageLTV: string;
    highValueSegments: number;
    atRiskCustomers: number;
  };
  insight: string;
}

// Tool Input Types
export interface CompetitorDensityInput {
  radius: number;
  location: string;
}

export interface CustomerHotspotsInput {
  timeframe: string;
  metric: string;
}

export interface MenuPerformanceInput {
  category?: string;
  sortBy: string;
}

export interface PricingStrategyInput {
  item: string;
  competitorPrices: number[];
}

export interface CustomerSegmentsInput {
  segmentationType: string;
}