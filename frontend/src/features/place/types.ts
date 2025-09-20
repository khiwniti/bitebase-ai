// Place Module Types - Geospatial Market Intelligence
import { RestaurantType, CuisineType, PriceRange, CustomerSegment, OperatingHours } from '../../shared/types';

export interface CompetitorAnalysis {
  id: string;
  timestamp: Date;
  location: { lat: number; lng: number };
  radius: number;
  competitors: CompetitorData[];
  marketSaturation: "low" | "medium" | "high" | "critical";
  proximityThreats: {
    immediate: CompetitorData[]; // < 0.5km
    nearby: CompetitorData[]; // 0.5-1km
    distant: CompetitorData[]; // 1-2km
  };
  competitiveAdvantages: string[];
  marketGaps: MarketGap[];
  insights: string[];
}

export interface CompetitorData {
  id: string;
  name: string;
  type: RestaurantType;
  cuisine: CuisineType;
  priceRange: PriceRange;
  coordinates: { lat: number; lng: number };
  distance: number; // meters from analysis center
  threatLevel: "low" | "medium" | "high" | "critical";
  marketShare: number; // estimated percentage
  rating: number;
  reviewCount: number;
  averageOrderValue: number;
  operatingHours: OperatingHours;
  deliveryCapabilities: boolean;
  uniqueSellingPoints: string[];
  weaknesses: string[];
}

export interface MarketGap {
  id: string;
  location: { lat: number; lng: number };
  opportunityType: "cuisine" | "price_point" | "service_type" | "demographic";
  description: string;
  estimatedDemand: number;
  competitorGap: number; // distance to nearest competitor in meters
  demographicFit: number; // 0-1 score
  revenueProjection: {
    conservative: number;
    realistic: number;
    optimistic: number;
  };
}

export interface HotspotAnalysis {
  id: string;
  timestamp: Date;
  analysisType: "delivery" | "dine_in" | "revenue" | "profit" | "customer_density";
  location: { lat: number; lng: number };
  gridSize: number; // meters
  timeFrame: "hourly" | "daily" | "weekly" | "monthly";
  statisticalData: {
    zScoreThreshold: number;
    pValueThreshold: number;
    confidenceLevel: number;
  };
  hotspots: Hotspot[];
  coldspots: Hotspot[];
  insights: string[];
}

export interface Hotspot {
  id: string;
  coordinates: { lat: number; lng: number };
  intensity: number;
  zScore: number;
  pValue: number;
  significance: "high" | "medium" | "low";
  type: "hot" | "cold";
  averageValue: number;
  gridCellCount: number;
  customerSegments: CustomerSegment[];
  timePatterns: {
    [hour: string]: number;
  };
  seasonalVariation: {
    [month: string]: number;
  };
}

export interface CustomerDensityLayer {
  id: string;
  data: CustomerDensityPoint[];
  radiusPixels: number;
  intensity: number;
  threshold: number;
  colorRange: string[];
  weightProperty: string;
}

export interface CustomerDensityPoint {
  coordinates: { lat: number; lng: number };
  weight: number;
  customerCount: number;
  averageOrderValue: number;
  frequency: number;
  segment: CustomerSegment;
  timeOfVisit: string[];
}