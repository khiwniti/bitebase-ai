"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

// Enhanced types for professional-grade restaurant market research
type MarkerType = "location" | "poi" | "business" | "route" | "custom" | "restaurant" | "cafe" | "competitor" | "demographic" | "hotspot" | "market_gap" | "delivery_zone";
type LayerType = "markers" | "routes" | "heatmap" | "clusters" | "custom" | "foot_traffic" | "demographics" | "competitors" | "revenue_zones" | "delivery_hotspots" | "market_saturation" | "price_comparison";
type ActionType = "add_marker" | "remove_marker" | "update_marker" | "zoom" | "pan" | "select" | "clear" | "generate_component" | "update_layer" | "analyze_market" | "generate_report" | "competitor_analysis" | "hotspot_analysis" | "price_benchmarking" | "customer_segmentation";

// Professional restaurant analytics types
type CuisineType = "american" | "italian" | "mexican" | "asian" | "mediterranean" | "french" | "indian" | "chinese" | "japanese" | "thai" | "vietnamese" | "korean" | "middle_eastern" | "fusion" | "vegan" | "organic" | "bbq" | "seafood" | "steakhouse" | "pizza" | "sushi" | "other";
type RestaurantType = "fast_food" | "casual_dining" | "fine_dining" | "cafe" | "bakery" | "bar" | "food_truck" | "buffet" | "catering" | "ghost_kitchen" | "cloud_kitchen" | "pop_up" | "franchise" | "chain";
type DemographicSegment = "young_professionals" | "families" | "students" | "seniors" | "tourists" | "locals" | "millennials" | "gen_z" | "high_income" | "middle_income" | "budget_conscious";
type PriceRange = "$" | "$$" | "$$$" | "$$$$" | "$$$$$";
type BusinessDayPart = "breakfast" | "brunch" | "lunch" | "afternoon" | "dinner" | "late_night";
type MarketingChannel = "google_ads" | "facebook_ads" | "instagram" | "email" | "sms" | "loyalty_program" | "word_of_mouth" | "delivery_apps" | "local_partnerships";
type CustomerSegment = "new_customers" | "regular_customers" | "vip_customers" | "at_risk_customers" | "champions" | "loyalists" | "potential_loyalists" | "cannot_lose_them";

export interface RestaurantData {
  id: string;
  name: string;
  type: RestaurantType;
  cuisine: CuisineType;
  priceRange: PriceRange;
  averageSpend: number;
  capacity: number;
  operatingHours: {
    monday: { open: string; close: string; isOpen: boolean; };
    tuesday: { open: string; close: string; isOpen: boolean; };
    wednesday: { open: string; close: string; isOpen: boolean; };
    thursday: { open: string; close: string; isOpen: boolean; };
    friday: { open: string; close: string; isOpen: boolean; };
    saturday: { open: string; close: string; isOpen: boolean; };
    sunday: { open: string; close: string; isOpen: boolean; };
  };
  coordinates: { lat: number; lng: number; };
  address: string;
  phone?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  isCompetitor: boolean;
  competitorThreatLevel?: "low" | "medium" | "high" | "critical";
  marketShare?: number; // percentage of local market
  distanceFromUser?: number; // in meters
  establishedDate?: string;
  footTraffic?: FootTrafficData;
  revenue?: RevenueData;
  demographics?: DemographicProfile;
  marketingPresence?: MarketingPresenceData;
  menuAnalysis?: MenuAnalysisData;
  customerSentiment?: SentimentData;
  deliveryCapabilities?: DeliveryData;
  businessMetrics?: BusinessMetricsData;
}

interface FootTrafficData {
  hourly: { [hour: string]: number };
  daily: { [day: string]: number };
  seasonal: { [month: string]: number };
  peakHours: string[];
  averageDwellTime: number; // in minutes
  totalVisitors: number;
  uniqueVisitors: number;
  repeatVisitorRate: number; // percentage
}

export interface DemographicProfile {
  id: string;
  coordinates: { lat: number; lng: number; };
  radius: number; // in meters
  population: number;
  ageGroups: {
    "18-25": number;
    "26-35": number;
    "36-45": number;
    "46-55": number;
    "56-65": number;
    "65+": number;
  };
  incomeRanges: {
    "under_30k": number;
    "30k_50k": number;
    "50k_75k": number;
    "75k_100k": number;
    "100k_150k": number;
    "over_150k": number;
  };
  lifestyleSegments: {
    [key in DemographicSegment]: number;
  };
  diningFrequency: {
    daily: number;
    weekly: number;
    monthly: number;
    occasionally: number;
  };
  spendingPower: number; // average disposable income
  educationLevel: {
    "high_school": number;
    "bachelor": number;
    "master": number;
    "phd": number;
  };
}

// Keep original DemographicData for backward compatibility
interface DemographicData {
  id: string;
  coordinates: { lat: number; lng: number; };
  radius: number; // in meters
  population: number;
  ageGroups: {
    "18-25": number;
    "26-35": number;
    "36-45": number;
    "46-55": number;
    "56-65": number;
    "65+": number;
  };
  incomeRanges: {
    "under_30k": number;
    "30k_50k": number;
    "50k_75k": number;
    "75k_100k": number;
    "100k_150k": number;
    "over_150k": number;
  };
  lifestyleSegments: {
    [key in DemographicSegment]: number;
  };
  diningFrequency: {
    daily: number;
    weekly: number;
    monthly: number;
    occasionally: number;
  };
}

interface RevenueData {
  monthlyRevenue: { [month: string]: number };
  dailyAverage: number;
  projectedAnnual: number;
  costStructure: {
    food: number;
    labor: number;
    rent: number;
    utilities: number;
    marketing: number;
    other: number;
  };
  profitMargin: number;
  // Enhanced revenue analytics
  daily: { [date: string]: number };
  monthly: { [month: string]: number };
  seasonal: { [season: string]: number };
  totalRevenue: number;
  averageOrderValue: number;
  peakRevenueHours: string[];
  revenueByDayPart: { [key in BusinessDayPart]: number };
  revenueGrowthRate: number; // percentage
  costOfGoodsSold: number;
  operatingExpenses: number;
  netProfit: number;
  breakEvenPoint: number; // orders per day
}

interface MarketingPresenceData {
  onlinePresence: {
    website: boolean;
    googleMyBusiness: boolean;
    socialMedia: {
      facebook: boolean;
      instagram: boolean;
      twitter: boolean;
      tiktok: boolean;
    };
    deliveryApps: string[];
  };
  marketingChannels: {
    [key in MarketingChannel]: {
      active: boolean;
      budget?: number;
      roi?: number;
      reach?: number;
    };
  };
  brandRecognition: number; // score 0-100
  localMarketShare: number; // percentage
}

interface MenuAnalysisData {
  totalItems: number;
  categories: string[];
  priceRange: {
    min: number;
    max: number;
    average: number;
  };
  popularItems: {
    name: string;
    category: string;
    price: number;
    salesVolume: number;
    profitMargin: number;
  }[];
  menuEngineering: {
    stars: number; // high profit, high popularity
    plowhorses: number; // low profit, high popularity
    puzzles: number; // high profit, low popularity
    dogs: number; // low profit, low popularity
  };
  cuisineComplexity: "simple" | "moderate" | "complex";
  healthyOptions: number;
  vegetarianOptions: number;
  veganOptions: number;
  glutenFreeOptions: number;
}

interface SentimentData {
  overallSentiment: "positive" | "neutral" | "negative";
  sentimentScore: number; // -1 to 1
  totalReviews: number;
  recentReviews: {
    date: string;
    rating: number;
    sentiment: "positive" | "neutral" | "negative";
    text: string;
    source: string;
  }[];
  keywordAnalysis: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
  aspectSentiments: {
    food: number;
    service: number;
    ambiance: number;
    value: number;
    cleanliness: number;
  };
  trendingTopics: string[];
  competitorComparisons: {
    betterThan: string[];
    worseThan: string[];
  };
}

interface DeliveryData {
  hasDelivery: boolean;
  deliveryZones: {
    coordinates: { lat: number; lng: number; }[];
    deliveryTime: number; // minutes
    deliveryFee: number;
  }[];
  deliveryPartners: string[];
  averageDeliveryTime: number;
  deliveryRating: number;
  deliveryVolume: number; // orders per day
  deliveryHotspots: {
    coordinates: { lat: number; lng: number; };
    orderCount: number;
    averageOrderValue: number;
    customerSegment: CustomerSegment;
  }[];
}

interface BusinessMetricsData {
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
  customerRetentionRate: number; // percentage
  averageOrderFrequency: number; // orders per month
  seasonalityIndex: number; // variance coefficient
  marketPosition: "leader" | "challenger" | "follower" | "niche";
  competitiveAdvantages: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  swotScore: number; // overall SWOT analysis score
}

export interface MarketAnalysis {
  id: string;
  timestamp: Date;
  location: { lat: number; lng: number; };
  radius: number;
  competitorCount: number;
  marketSaturation: "low" | "medium" | "high";
  opportunityScore: number; // 0-100
  recommendedCuisines: CuisineType[];
  recommendedPriceRange: "$" | "$$" | "$$$" | "$$$$";
  estimatedRevenue: {
    conservative: number;
    optimistic: number;
    realistic: number;
  };
  riskFactors: string[];
  strengths: string[];
  insights: string[];
}

interface Marker {
  id: string;
  type: MarkerType;
  position: { lat: number; lng: number };
  title: string;
  description?: string;
  selected: boolean;
  properties?: Record<string, any>;
  component?: React.ComponentType<any>;
  style?: Record<string, any>;
}

interface MapLayer {
  id: string;
  type: LayerType;
  visible: boolean;
  data: any[];
  style?: Record<string, any>;
  component?: React.ComponentType<any>;
}

interface ActionHistory {
  id: string;
  type: ActionType;
  timestamp: Date;
  data: any;
  description: string;
}

interface GenerativeUICommand {
  id: string;
  command: string;
  parameters: Record<string, any>;
  timestamp: Date;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  result?: any;
}

export interface MapState {
  // Core map state
  zoom: number;
  center: { lat: number; lng: number };
  bounds?: { north: number; south: number; east: number; west: number };
  
  // Enhanced marker system
  markers: Marker[];
  selectedMarkerId: string | null;
  
  // Layer management
  layers: MapLayer[];
  activeLayers: string[];
  
  // Interaction modes
  mode: "explore" | "add" | "select" | "edit" | "route" | "measure" | "analyze";
  activeMarkerType: MarkerType | null;
  
  // Restaurant Research Data
  restaurants: RestaurantData[];
  demographics: DemographicData[];
  marketAnalyses: MarketAnalysis[];
  selectedRestaurantId: string | null;
  selectedDemographicId: string | null;
  
  // Research Filters - Enhanced for professional analytics
  researchFilters: {
    cuisineTypes: CuisineType[];
    restaurantTypes: RestaurantType[];
    priceRanges: PriceRange[];
    radius: number; // in kilometers
    showCompetitors: boolean;
    showDemographics: boolean;
    showFootTraffic: boolean;
    showRevenueZones: boolean;
    showDeliveryHotspots: boolean;
    showMarketGaps: boolean;
    showPriceComparison: boolean;
    competitorThreatLevel: ("low" | "medium" | "high" | "critical")[];
    marketPosition: ("leader" | "challenger" | "follower" | "niche")[];
    minimumRating: number;
    maximumDistance: number; // in meters
    dayPartFilter: BusinessDayPart[];
    customerSegmentFilter: CustomerSegment[];
  };
  
  // Advanced Analytics Layers
  analyticsLayers: {
    hotspotAnalysis: {
      enabled: boolean;
      type: "delivery" | "dine_in" | "revenue" | "profit";
      timeFrame: "hourly" | "daily" | "weekly" | "monthly";
      statisticalSignificance: number; // p-value threshold
      zScoreThreshold: number;
      gridSize: number; // for spatial aggregation
    };
    competitiveAnalysis: {
      enabled: boolean;
      showThreatLevels: boolean;
      showMarketShare: boolean;
      proximityRadius: number;
      benchmarkMetrics: ("price" | "rating" | "volume" | "sentiment")[];
    };
    customerFlow: {
      enabled: boolean;
      showOriginDestination: boolean;
      timeOfDay: string[];
      dayOfWeek: string[];
      animationSpeed: number;
    };
    marketSaturation: {
      enabled: boolean;
      saturationThreshold: number;
      gridResolution: number;
      colorScheme: "viridis" | "plasma" | "inferno" | "magma";
    };
    priceMapping: {
      enabled: boolean;
      showPriceRange: boolean;
      showPriceDisparity: boolean;
      normalizeByCuisine: boolean;
    };
  };
  
  // Buffer Radius Visualization
  bufferRadius: number; // radius in meters
  showBufferRadius: boolean;
  bufferCenter: { lat: number; lng: number } | null;
  bufferOpacity: number; // 0-1 for circle opacity
  
  // Analysis State
  currentAnalysis: MarketAnalysis | null;
  isAnalyzing: boolean;
  analysisProgress: number; // 0-100
  
  // State synchronization
  isSyncing: boolean;
  lastSyncTime: Date | null;
  
  // Action history for undo/redo
  history: ActionHistory[];
  historyIndex: number;
  
  // Generative UI system
  pendingCommands: GenerativeUICommand[];
  componentRegistry: Map<string, React.ComponentType<any>>;
  
  // Real-time features
  isRealTimeEnabled: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
}

interface SharedStateContextType {
  // State
  mapState: MapState;
  
  // Core map operations
  updateZoom: (zoom: number) => void;
  updateCenter: (center: { lat: number; lng: number }) => void;
  updateBounds: (bounds: { north: number; south: number; east: number; west: number }) => void;
  
  // Enhanced marker operations
  addMarker: (marker: Omit<Marker, "id" | "selected">) => Promise<string>;
  updateMarker: (id: string, updates: Partial<Marker>) => void;
  removeMarker: (id: string) => void;
  selectMarker: (id: string) => void;
  clearMarkers: () => void;
  bulkAddMarkers: (markers: Omit<Marker, "id" | "selected">[]) => Promise<string[]>;
  
  // Layer management
  addLayer: (layer: Omit<MapLayer, "id">) => string;
  updateLayer: (id: string, updates: Partial<MapLayer>) => void;
  removeLayer: (id: string) => void;
  toggleLayer: (id: string) => void;
  
  // Mode and interaction
  setMode: (mode: MapState["mode"]) => void;
  setActiveMarkerType: (type: MarkerType | null) => void;
  
  // Generative UI system
  executeCommand: (command: string, parameters?: Record<string, any>) => Promise<any>;
  registerComponent: (name: string, component: React.ComponentType<any>) => void;
  generateComponent: (description: string, props?: Record<string, any>) => Promise<React.ComponentType<any>>;
  
  // Restaurant Research Functions
  addRestaurant: (restaurant: Omit<RestaurantData, "id">) => Promise<string>;
  updateRestaurant: (id: string, updates: Partial<RestaurantData>) => void;
  removeRestaurant: (id: string) => void;
  selectRestaurant: (id: string) => void;
  getRestaurantsByType: (type: RestaurantType) => RestaurantData[];
  getRestaurantsByCuisine: (cuisine: CuisineType) => RestaurantData[];
  getCompetitors: (location: { lat: number; lng: number }, radius: number) => RestaurantData[];
  
  // Demographic Analysis
  addDemographicData: (demographic: Omit<DemographicData, "id">) => Promise<string>;
  updateDemographicData: (id: string, updates: Partial<DemographicData>) => void;
  removeDemographicData: (id: string) => void;
  selectDemographic: (id: string) => void;
  getDemographicsInRadius: (location: { lat: number; lng: number }, radius: number) => DemographicData[];
  
  // Market Analysis
  conductMarketAnalysis: (location: { lat: number; lng: number }, radius: number, options?: { cuisineType?: CuisineType; restaurantType?: RestaurantType }) => Promise<MarketAnalysis>;
  updateMarketAnalysis: (id: string, updates: Partial<MarketAnalysis>) => void;
  removeMarketAnalysis: (id: string) => void;
  getLatestAnalysis: () => MarketAnalysis | null;
  
  // Research Filters
  updateResearchFilters: (filters: Partial<MapState["researchFilters"]>) => void;
  resetResearchFilters: () => void;
  
  // AI-Powered Insights
  generateLocationInsights: (location: { lat: number; lng: number }) => Promise<string[]>;
  generateCompetitorAnalysis: (location: { lat: number; lng: number }, radius: number) => Promise<any>;
  generateRevenueProjection: (restaurant: Partial<RestaurantData>, demographics: DemographicData[]) => Promise<RevenueData>;
  generateOptimalPricing: (location: { lat: number; lng: number }, cuisine: CuisineType) => Promise<{ priceRange: string; reasoning: string }>;
  
  // Data Export/Import
  exportRestaurantData: () => string;
  importRestaurantData: (data: string) => void;
  generateMarketReport: (analysisId: string) => Promise<{ pdf: Blob; insights: string[] }>;
  
  // History management
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clearHistory: () => void;
  
  // Real-time synchronization
  enableRealTime: () => void;
  disableRealTime: () => void;
  forceSync: () => Promise<void>;
  
  // Utility functions
  setSyncing: (isSyncing: boolean) => void;
  getMarkersByType: (type: MarkerType) => Marker[];
  getMarkersInBounds: (bounds: { north: number; south: number; east: number; west: number }) => Marker[];
  exportState: () => string;
  importState: (state: string) => void;

  // Buffer Radius Management
  setBufferRadius: (radius: number) => void;
  setBufferCenter: (center: { lat: number; lng: number } | null) => void;
  toggleBufferRadius: () => void;
  setBufferOpacity: (opacity: number) => void;
}

const initialState: MapState = {
  zoom: 12,
  center: { lat: 13.7563, lng: 100.5018 }, // Bangkok coordinates
  markers: [
    {
      id: "bkk-1",
      type: "location",
      position: { lat: 13.7563, lng: 100.5018 },
      title: "Bangkok",
      description: "The vibrant capital of Thailand",
      selected: false,
    },
    {
      id: "bkk-2",
      type: "poi",
      position: { lat: 37.8059, lng: -122.4103 },
      title: "North Beach",
      description: "Historic Italian neighborhood",
      selected: false,
    },
  ],
  selectedMarkerId: null,
  layers: [],
  activeLayers: [],
  mode: "explore",
  activeMarkerType: null,
  
  // Restaurant Research Data
  restaurants: [
    {
      id: "sample-restaurant-1",
      name: "Bangkok Bistro",
      type: "casual_dining",
      cuisine: "thai",
      priceRange: "$$",
      averageSpend: 25,
      capacity: 80,
      operatingHours: {
        monday: { open: "11:00", close: "22:00", isOpen: true },
        tuesday: { open: "11:00", close: "22:00", isOpen: true },
        wednesday: { open: "11:00", close: "22:00", isOpen: true },
        thursday: { open: "11:00", close: "22:00", isOpen: true },
        friday: { open: "11:00", close: "23:00", isOpen: true },
        saturday: { open: "11:00", close: "23:00", isOpen: true },
        sunday: { open: "12:00", close: "21:00", isOpen: true },
      },
      coordinates: { lat: 13.7563, lng: 100.5018 },
      address: "123 Sukhumvit Road, Bangkok 10110",
      phone: "+66-2-123-4567",
      website: "https://bangkokbistro.com",
      rating: 4.2,
      reviewCount: 245,
      isCompetitor: false,
      competitorThreatLevel: "low",
      marketShare: 12.5,
      distanceFromUser: 0,
      establishedDate: "2019-06-15",
    }
  ],
  demographics: [
    {
      id: "sample-demo-1",
      coordinates: { lat: 13.7563, lng: 100.5018 },
      radius: 1000,
      population: 8500,
      ageGroups: {
        "18-25": 1200,
        "26-35": 2800,
        "36-45": 2100,
        "46-55": 1600,
        "56-65": 500,
        "65+": 300,
      },
      incomeRanges: {
        "under_30k": 1500,
        "30k_50k": 2200,
        "50k_75k": 2600,
        "75k_100k": 1400,
        "100k_150k": 600,
        "over_150k": 200,
      },
      lifestyleSegments: {
        young_professionals: 3000,
        families: 2500,
        students: 1500,
        seniors: 800,
        tourists: 500,
        locals: 7200,
        millennials: 2800,
        gen_z: 1200,
        high_income: 1800,
        middle_income: 4200,
        budget_conscious: 2500,
      },
      diningFrequency: {
        daily: 2000,
        weekly: 4500,
        monthly: 1500,
        occasionally: 500,
      },
    }
  ],
  marketAnalyses: [],
  selectedRestaurantId: null,
  selectedDemographicId: null,
  
  // Research Filters - Enhanced
  researchFilters: {
    cuisineTypes: [],
    restaurantTypes: [],
    priceRanges: [],
    radius: 2, // 2km default
    showCompetitors: true,
    showDemographics: true,
    showFootTraffic: false,
    showRevenueZones: false,
    showDeliveryHotspots: false,
    showMarketGaps: false,
    showPriceComparison: false,
    competitorThreatLevel: ["low", "medium", "high", "critical"],
    marketPosition: ["leader", "challenger", "follower", "niche"],
    minimumRating: 0,
    maximumDistance: 5000, // 5km
    dayPartFilter: [],
    customerSegmentFilter: [],
  },
  
  // Advanced Analytics Layers
  analyticsLayers: {
    hotspotAnalysis: {
      enabled: false,
      type: "delivery",
      timeFrame: "daily",
      statisticalSignificance: 0.05,
      zScoreThreshold: 1.96,
      gridSize: 100,
    },
    competitiveAnalysis: {
      enabled: false,
      showThreatLevels: true,
      showMarketShare: true,
      proximityRadius: 1000,
      benchmarkMetrics: ["price", "rating"],
    },
    customerFlow: {
      enabled: false,
      showOriginDestination: false,
      timeOfDay: [],
      dayOfWeek: [],
      animationSpeed: 1,
    },
    marketSaturation: {
      enabled: false,
      saturationThreshold: 0.7,
      gridResolution: 50,
      colorScheme: "viridis",
    },
    priceMapping: {
      enabled: false,
      showPriceRange: true,
      showPriceDisparity: false,
      normalizeByCuisine: true,
    },
  },
  
  // Buffer Radius Visualization
  bufferRadius: 500, // 500 meters default
  showBufferRadius: false,
  bufferCenter: null,
  bufferOpacity: 0.3,
  
  // Analysis State
  currentAnalysis: null,
  isAnalyzing: false,
  analysisProgress: 0,
  
  isSyncing: false,
  lastSyncTime: null,
  history: [],
  historyIndex: -1,
  pendingCommands: [],
  componentRegistry: new Map(),
  isRealTimeEnabled: false,
  connectionStatus: 'connected',
};

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export function SharedStateProvider({ children }: { children: React.ReactNode }) {
  const [mapState, setMapState] = useState<MapState>(initialState);
  const syncTimeoutRef = useRef<NodeJS.Timeout>();
  const commandQueueRef = useRef<GenerativeUICommand[]>([]);

  // Enhanced sync mechanism with debouncing
  const triggerSync = useCallback((immediate = false) => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    const syncFn = () => {
      setMapState(prev => ({
        ...prev,
        isSyncing: true,
        lastSyncTime: new Date(),
      }));

      // Simulate sync completion
      setTimeout(() => {
        setMapState(prev => ({ ...prev, isSyncing: false }));
      }, immediate ? 300 : 1000);
    };

    if (immediate) {
      syncFn();
    } else {
      syncTimeoutRef.current = setTimeout(syncFn, 100);
    }
  }, []);

  // Action history management
  const addToHistory = useCallback((action: Omit<ActionHistory, "id" | "timestamp">) => {
    const historyItem: ActionHistory = {
      id: uuidv4(),
      timestamp: new Date(),
      ...action,
    };

    setMapState(prev => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(historyItem);
      
      // Limit history size
      if (newHistory.length > 100) {
        newHistory.shift();
      }

      return {
        ...prev,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  // Core map operations
  const updateZoom = useCallback((zoom: number) => {
    setMapState(prev => ({ ...prev, zoom }));
    addToHistory({ type: "zoom", data: { zoom }, description: `Zoomed to level ${zoom}` });
    triggerSync();
  }, [addToHistory, triggerSync]);

  const updateCenter = useCallback((center: { lat: number; lng: number }) => {
    setMapState(prev => ({ ...prev, center }));
    addToHistory({ type: "pan", data: { center }, description: `Moved to ${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}` });
    triggerSync();
  }, [addToHistory, triggerSync]);

  const updateBounds = useCallback((bounds: { north: number; south: number; east: number; west: number }) => {
    setMapState(prev => ({ ...prev, bounds }));
    triggerSync();
  }, [triggerSync]);

  // Enhanced marker operations
  const addMarker = useCallback(async (marker: Omit<Marker, "id" | "selected">): Promise<string> => {
    const id = uuidv4();
    const newMarker: Marker = { ...marker, id, selected: false };

    setMapState(prev => ({
      ...prev,
      markers: [...prev.markers, newMarker],
    }));

    addToHistory({
      type: "add_marker",
      data: { marker: newMarker },
      description: `Added ${marker.type} marker: ${marker.title}`,
    });

    triggerSync();
    return id;
  }, [addToHistory, triggerSync]);

  const updateMarker = useCallback((id: string, updates: Partial<Marker>) => {
    setMapState(prev => ({
      ...prev,
      markers: prev.markers.map(marker =>
        marker.id === id ? { ...marker, ...updates } : marker
      ),
    }));

    addToHistory({
      type: "update_marker",
      data: { id, updates },
      description: `Updated marker ${id}`,
    });

    triggerSync();
  }, [addToHistory, triggerSync]);

  const removeMarker = useCallback((id: string) => {
    setMapState(prev => {
      const marker = prev.markers.find(m => m.id === id);
      return {
        ...prev,
        markers: prev.markers.filter(m => m.id !== id),
        selectedMarkerId: prev.selectedMarkerId === id ? null : prev.selectedMarkerId,
      };
    });

    addToHistory({
      type: "remove_marker",
      data: { id },
      description: `Removed marker ${id}`,
    });

    triggerSync();
  }, [addToHistory, triggerSync]);

  const selectMarker = useCallback((id: string) => {
    setMapState(prev => ({
      ...prev,
      markers: prev.markers.map(marker => ({
        ...marker,
        selected: marker.id === id,
      })),
      selectedMarkerId: id,
    }));

    addToHistory({
      type: "select",
      data: { id },
      description: `Selected marker ${id}`,
    });

    triggerSync();
  }, [addToHistory, triggerSync]);

  const clearMarkers = useCallback(() => {
    setMapState(prev => ({
      ...prev,
      markers: [],
      selectedMarkerId: null,
    }));

    addToHistory({
      type: "clear",
      data: {},
      description: "Cleared all markers",
    });

    triggerSync();
  }, [addToHistory, triggerSync]);

  const bulkAddMarkers = useCallback(async (markers: Omit<Marker, "id" | "selected">[]): Promise<string[]> => {
    const newMarkers = markers.map(marker => ({
      ...marker,
      id: uuidv4(),
      selected: false,
    }));

    setMapState(prev => ({
      ...prev,
      markers: [...prev.markers, ...newMarkers],
    }));

    addToHistory({
      type: "add_marker",
      data: { markers: newMarkers },
      description: `Added ${markers.length} markers`,
    });

    triggerSync();
    return newMarkers.map(m => m.id);
  }, [addToHistory, triggerSync]);

  // Layer management
  const addLayer = useCallback((layer: Omit<MapLayer, "id">): string => {
    const id = uuidv4();
    const newLayer: MapLayer = { ...layer, id };

    setMapState(prev => ({
      ...prev,
      layers: [...prev.layers, newLayer],
      activeLayers: [...prev.activeLayers, id],
    }));

    triggerSync();
    return id;
  }, [triggerSync]);

  const updateLayer = useCallback((id: string, updates: Partial<MapLayer>) => {
    setMapState(prev => ({
      ...prev,
      layers: prev.layers.map(layer =>
        layer.id === id ? { ...layer, ...updates } : layer
      ),
    }));

    triggerSync();
  }, [triggerSync]);

  const removeLayer = useCallback((id: string) => {
    setMapState(prev => ({
      ...prev,
      layers: prev.layers.filter(layer => layer.id !== id),
      activeLayers: prev.activeLayers.filter(layerId => layerId !== id),
    }));

    triggerSync();
  }, [triggerSync]);

  const toggleLayer = useCallback((id: string) => {
    setMapState(prev => ({
      ...prev,
      activeLayers: prev.activeLayers.includes(id)
        ? prev.activeLayers.filter(layerId => layerId !== id)
        : [...prev.activeLayers, id],
    }));

    triggerSync();
  }, [triggerSync]);

  // Mode and interaction
  const setMode = useCallback((mode: MapState["mode"]) => {
    setMapState(prev => ({ ...prev, mode }));
    triggerSync();
  }, [triggerSync]);

  const setActiveMarkerType = useCallback((type: MarkerType | null) => {
    setMapState(prev => ({ ...prev, activeMarkerType: type }));
  }, []);

  // Generative UI system
  const executeCommand = useCallback(async (command: string, parameters: Record<string, any> = {}): Promise<any> => {
    const commandId = uuidv4();
    const generativeCommand: GenerativeUICommand = {
      id: commandId,
      command,
      parameters,
      timestamp: new Date(),
      status: 'pending',
    };

    setMapState(prev => ({
      ...prev,
      pendingCommands: [...prev.pendingCommands, generativeCommand],
    }));

    try {
      // Update status to executing
      setMapState(prev => ({
        ...prev,
        pendingCommands: prev.pendingCommands.map(cmd =>
          cmd.id === commandId ? { ...cmd, status: 'executing' } : cmd
        ),
      }));

      // Execute command based on type
      let result: any;
      const lowerCommand = command.toLowerCase();

      if (lowerCommand.includes('add') && lowerCommand.includes('marker')) {
        const { lat, lng, title, type = 'location' } = parameters;
        result = await addMarker({
          type: type as MarkerType,
          position: { lat: lat || mapState.center.lat, lng: lng || mapState.center.lng },
          title: title || 'AI Generated Marker',
          description: `Generated by AI command: ${command}`,
        });
      } else if (lowerCommand.includes('clear')) {
        clearMarkers();
        result = 'Markers cleared';
      } else if (lowerCommand.includes('zoom')) {
        const { level } = parameters;
        updateZoom(level || mapState.zoom + 1);
        result = `Zoomed to level ${level || mapState.zoom + 1}`;
      } else if (lowerCommand.includes('center') || lowerCommand.includes('move')) {
        const { lat, lng } = parameters;
        updateCenter({ lat: lat || mapState.center.lat, lng: lng || mapState.center.lng });
        result = `Moved to ${lat}, ${lng}`;
      }

      // Update status to completed
      setMapState(prev => ({
        ...prev,
        pendingCommands: prev.pendingCommands.map(cmd =>
          cmd.id === commandId ? { ...cmd, status: 'completed', result } : cmd
        ),
      }));

      return result;
    } catch (error) {
      // Update status to failed
      setMapState(prev => ({
        ...prev,
        pendingCommands: prev.pendingCommands.map(cmd =>
          cmd.id === commandId ? { ...cmd, status: 'failed', result: error } : cmd
        ),
      }));

      throw error;
    }
  }, [addMarker, clearMarkers, updateZoom, updateCenter, mapState.center, mapState.zoom]);

  const registerComponent = useCallback((name: string, component: React.ComponentType<any>) => {
    setMapState(prev => {
      const newRegistry = new Map(prev.componentRegistry);
      newRegistry.set(name, component);
      return { ...prev, componentRegistry: newRegistry };
    });
  }, []);

  const generateComponent = useCallback(async (description: string, props: Record<string, any> = {}): Promise<React.ComponentType<any>> => {
    // This would integrate with an AI service to generate components
    // For now, return a simple component
    const GeneratedComponent: React.ComponentType<any> = (componentProps) => (
      <div className="bg-blue-100 p-2 rounded border">
        <h4 className="font-semibold">AI Generated: {description}</h4>
        <pre className="text-xs">{JSON.stringify({ ...props, ...componentProps }, null, 2)}</pre>
      </div>
    );

    const componentName = `generated_${Date.now()}`;
    registerComponent(componentName, GeneratedComponent);
    
    return GeneratedComponent;
  }, [registerComponent]);

  // History management
  const undo = useCallback(() => {
    if (mapState.historyIndex > 0) {
      setMapState(prev => ({ ...prev, historyIndex: prev.historyIndex - 1 }));
      // Apply undo logic here
      triggerSync();
    }
  }, [mapState.historyIndex, triggerSync]);

  const redo = useCallback(() => {
    if (mapState.historyIndex < mapState.history.length - 1) {
      setMapState(prev => ({ ...prev, historyIndex: prev.historyIndex + 1 }));
      // Apply redo logic here
      triggerSync();
    }
  }, [mapState.historyIndex, mapState.history.length, triggerSync]);

  const canUndo = useCallback(() => mapState.historyIndex > 0, [mapState.historyIndex]);
  const canRedo = useCallback(() => mapState.historyIndex < mapState.history.length - 1, [mapState.historyIndex, mapState.history.length]);

  const clearHistory = useCallback(() => {
    setMapState(prev => ({ ...prev, history: [], historyIndex: -1 }));
  }, []);

  // Real-time synchronization
  const enableRealTime = useCallback(() => {
    setMapState(prev => ({ ...prev, isRealTimeEnabled: true, connectionStatus: 'connected' }));
  }, []);

  const disableRealTime = useCallback(() => {
    setMapState(prev => ({ ...prev, isRealTimeEnabled: false, connectionStatus: 'disconnected' }));
  }, []);

  const forceSync = useCallback(async () => {
    triggerSync(true);
  }, [triggerSync]);

  // Utility functions
  const setSyncing = useCallback((isSyncing: boolean) => {
    setMapState(prev => ({ ...prev, isSyncing }));
  }, []);

  const getMarkersByType = useCallback((type: MarkerType) => {
    return mapState.markers.filter(marker => marker.type === type);
  }, [mapState.markers]);

  const getMarkersInBounds = useCallback((bounds: { north: number; south: number; east: number; west: number }) => {
    return mapState.markers.filter(marker => 
      marker.position.lat <= bounds.north &&
      marker.position.lat >= bounds.south &&
      marker.position.lng <= bounds.east &&
      marker.position.lng >= bounds.west
    );
  }, [mapState.markers]);

  const exportState = useCallback(() => {
    return JSON.stringify({
      ...mapState,
      componentRegistry: Array.from(mapState.componentRegistry.entries()),
    });
  }, [mapState]);

  const importState = useCallback((state: string) => {
    try {
      const parsed = JSON.parse(state);
      const componentRegistry = new Map(parsed.componentRegistry || []);
      setMapState({ ...parsed, componentRegistry });
      triggerSync();
    } catch (error) {
      console.error('Failed to import state:', error);
    }
  }, [triggerSync]);

  // Restaurant Research Functions
  const addRestaurant = useCallback(async (restaurant: Omit<RestaurantData, "id">): Promise<string> => {
    const id = uuidv4();
    const newRestaurant: RestaurantData = { ...restaurant, id };

    setMapState(prev => ({
      ...prev,
      restaurants: [...prev.restaurants, newRestaurant],
    }));

    addToHistory({
      type: "add_marker",
      data: { restaurant: newRestaurant },
      description: `Added restaurant: ${restaurant.name}`,
    });

    triggerSync();
    return id;
  }, [addToHistory, triggerSync]);

  const updateRestaurant = useCallback((id: string, updates: Partial<RestaurantData>) => {
    setMapState(prev => ({
      ...prev,
      restaurants: prev.restaurants.map(restaurant =>
        restaurant.id === id ? { ...restaurant, ...updates } : restaurant
      ),
    }));

    addToHistory({
      type: "update_marker",
      data: { id, updates },
      description: `Updated restaurant ${id}`,
    });

    triggerSync();
  }, [addToHistory, triggerSync]);

  const removeRestaurant = useCallback((id: string) => {
    setMapState(prev => ({
      ...prev,
      restaurants: prev.restaurants.filter(r => r.id !== id),
      selectedRestaurantId: prev.selectedRestaurantId === id ? null : prev.selectedRestaurantId,
    }));

    addToHistory({
      type: "remove_marker",
      data: { id },
      description: `Removed restaurant ${id}`,
    });

    triggerSync();
  }, [addToHistory, triggerSync]);

  const selectRestaurant = useCallback((id: string) => {
    setMapState(prev => ({
      ...prev,
      selectedRestaurantId: id,
    }));

    addToHistory({
      type: "select",
      data: { id },
      description: `Selected restaurant ${id}`,
    });

    triggerSync();
  }, [addToHistory, triggerSync]);

  const getRestaurantsByType = useCallback((type: RestaurantType) => {
    return mapState.restaurants.filter(restaurant => restaurant.type === type);
  }, [mapState.restaurants]);

  const getRestaurantsByCuisine = useCallback((cuisine: CuisineType) => {
    return mapState.restaurants.filter(restaurant => restaurant.cuisine === cuisine);
  }, [mapState.restaurants]);

  const getCompetitors = useCallback((location: { lat: number; lng: number }, radius: number) => {
    return mapState.restaurants.filter(restaurant => {
      if (!restaurant.isCompetitor) return false;
      const distance = Math.sqrt(
        Math.pow(restaurant.coordinates.lat - location.lat, 2) + 
        Math.pow(restaurant.coordinates.lng - location.lng, 2)
      ) * 111000; // Rough conversion to meters
      return distance <= radius;
    });
  }, [mapState.restaurants]);

  // Demographic Analysis Functions
  const addDemographicData = useCallback(async (demographic: Omit<DemographicData, "id">): Promise<string> => {
    const id = uuidv4();
    const newDemographic: DemographicData = { ...demographic, id };

    setMapState(prev => ({
      ...prev,
      demographics: [...prev.demographics, newDemographic],
    }));

    triggerSync();
    return id;
  }, [triggerSync]);

  const updateDemographicData = useCallback((id: string, updates: Partial<DemographicData>) => {
    setMapState(prev => ({
      ...prev,
      demographics: prev.demographics.map(demo =>
        demo.id === id ? { ...demo, ...updates } : demo
      ),
    }));

    triggerSync();
  }, [triggerSync]);

  const removeDemographicData = useCallback((id: string) => {
    setMapState(prev => ({
      ...prev,
      demographics: prev.demographics.filter(d => d.id !== id),
      selectedDemographicId: prev.selectedDemographicId === id ? null : prev.selectedDemographicId,
    }));

    triggerSync();
  }, [triggerSync]);

  const selectDemographic = useCallback((id: string) => {
    setMapState(prev => ({
      ...prev,
      selectedDemographicId: id,
    }));

    triggerSync();
  }, [triggerSync]);

  const getDemographicsInRadius = useCallback((location: { lat: number; lng: number }, radius: number) => {
    return mapState.demographics.filter(demo => {
      const distance = Math.sqrt(
        Math.pow(demo.coordinates.lat - location.lat, 2) + 
        Math.pow(demo.coordinates.lng - location.lng, 2)
      ) * 111000; // Rough conversion to meters
      return distance <= radius;
    });
  }, [mapState.demographics]);

  // Market Analysis Functions
  const conductMarketAnalysis = useCallback(async (
    location: { lat: number; lng: number }, 
    radius: number, 
    options?: { cuisineType?: CuisineType; restaurantType?: RestaurantType }
  ): Promise<MarketAnalysis> => {
    const id = uuidv4();
    
    setMapState(prev => ({ ...prev, isAnalyzing: true, analysisProgress: 0 }));

    // Simulate analysis with progress updates
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setMapState(prev => ({ ...prev, analysisProgress: i }));
    }

    const competitors = getCompetitors(location, radius);
    const demographics = getDemographicsInRadius(location, radius);
    
    const analysis: MarketAnalysis = {
      id,
      timestamp: new Date(),
      location,
      radius,
      competitorCount: competitors.length,
      marketSaturation: competitors.length > 10 ? "high" : competitors.length > 5 ? "medium" : "low",
      opportunityScore: Math.max(0, 100 - (competitors.length * 10)),
      recommendedCuisines: ["italian", "mexican", "asian"] as CuisineType[],
      recommendedPriceRange: "$$",
      estimatedRevenue: {
        conservative: 180000,
        realistic: 250000,
        optimistic: 320000,
      },
      riskFactors: competitors.length > 8 ? ["High competition", "Market saturation"] : ["Normal market risk"],
      strengths: demographics.length > 0 ? ["Good demographic data available"] : [],
      insights: [
        `${competitors.length} competitors found within ${radius}m radius`,
        `Market saturation level: ${competitors.length > 10 ? "high" : competitors.length > 5 ? "medium" : "low"}`,
        `Demographic data shows ${demographics.reduce((sum, d) => sum + d.population, 0)} people in area`
      ]
    };

    setMapState(prev => ({
      ...prev,
      marketAnalyses: [...prev.marketAnalyses, analysis],
      currentAnalysis: analysis,
      isAnalyzing: false,
      analysisProgress: 100,
    }));

    triggerSync();
    return analysis;
  }, [getCompetitors, getDemographicsInRadius, triggerSync]);

  const updateMarketAnalysis = useCallback((id: string, updates: Partial<MarketAnalysis>) => {
    setMapState(prev => ({
      ...prev,
      marketAnalyses: prev.marketAnalyses.map(analysis =>
        analysis.id === id ? { ...analysis, ...updates } : analysis
      ),
    }));

    triggerSync();
  }, [triggerSync]);

  const removeMarketAnalysis = useCallback((id: string) => {
    setMapState(prev => ({
      ...prev,
      marketAnalyses: prev.marketAnalyses.filter(a => a.id !== id),
      currentAnalysis: prev.currentAnalysis?.id === id ? null : prev.currentAnalysis,
    }));

    triggerSync();
  }, [triggerSync]);

  const getLatestAnalysis = useCallback(() => {
    return mapState.currentAnalysis;
  }, [mapState.currentAnalysis]);

  // Research Filters
  const updateResearchFilters = useCallback((filters: Partial<MapState["researchFilters"]>) => {
    setMapState(prev => ({
      ...prev,
      researchFilters: { ...prev.researchFilters, ...filters },
    }));

    triggerSync();
  }, [triggerSync]);

  const resetResearchFilters = useCallback(() => {
    setMapState(prev => ({
      ...prev,
      researchFilters: {
        cuisineTypes: [],
        restaurantTypes: [],
        priceRanges: [],
        radius: 2,
        showCompetitors: true,
        showDemographics: true,
        showFootTraffic: false,
        showRevenueZones: false,
        showDeliveryHotspots: false,
        showMarketGaps: false,
        showPriceComparison: false,
        competitorThreatLevel: ["low", "medium", "high", "critical"],
        marketPosition: ["leader", "challenger", "follower", "niche"],
        minimumRating: 0,
        maximumDistance: 5000,
        dayPartFilter: [],
        customerSegmentFilter: [],
      },
    }));

    triggerSync();
  }, [triggerSync]);

  // AI-Powered Insights (Mock implementations for now)
  const generateLocationInsights = useCallback(async (location: { lat: number; lng: number }): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    return [
      "High foot traffic area with excellent visibility",
      "Strong demographic match for casual dining",
      "Limited parking but good public transport access",
      "Growing neighborhood with increasing property values"
    ];
  }, []);

  const generateCompetitorAnalysis = useCallback(async (location: { lat: number; lng: number }, radius: number) => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    const competitors = getCompetitors(location, radius);
    return {
      competitorCount: competitors.length,
      averageRating: competitors.reduce((sum, c) => sum + c.rating, 0) / competitors.length || 0,
      priceDistribution: competitors.reduce((acc, c) => {
        acc[c.priceRange] = (acc[c.priceRange] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      cuisineGaps: ["korean", "mediterranean", "middle_eastern"] as CuisineType[],
    };
  }, [getCompetitors]);

  const generateRevenueProjection = useCallback(async (
    restaurant: Partial<RestaurantData>, 
    demographics: DemographicData[]
  ): Promise<RevenueData> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate complex calculation
    
    const totalPopulation = demographics.reduce((sum, d) => sum + d.population, 0);
    const averageSpend = restaurant.averageSpend || 25;
    const capacity = restaurant.capacity || 50;
    
    const totalRevenue = Math.round(totalPopulation * 0.1 * averageSpend * 12);
    
    return {
      monthlyRevenue: {
        "Jan": 18000, "Feb": 19000, "Mar": 22000, "Apr": 24000,
        "May": 26000, "Jun": 28000, "Jul": 30000, "Aug": 29000,
        "Sep": 25000, "Oct": 23000, "Nov": 21000, "Dec": 25000
      },
      dailyAverage: Math.round((totalPopulation * 0.1 * averageSpend) / 30),
      projectedAnnual: totalRevenue,
      costStructure: {
        food: 0.30,
        labor: 0.25,
        rent: 0.15,
        utilities: 0.05,
        marketing: 0.08,
        other: 0.17,
      },
      profitMargin: 0.12,
      // Enhanced revenue analytics
      daily: { "2024-01-01": 800, "2024-01-02": 850, "2024-01-03": 900 },
      monthly: { "Jan": 18000, "Feb": 19000, "Mar": 22000, "Apr": 24000 },
      seasonal: { "Spring": 72000, "Summer": 87000, "Fall": 69000, "Winter": 62000 },
      totalRevenue: totalRevenue,
      averageOrderValue: averageSpend,
      peakRevenueHours: ["12:00", "18:00", "19:00"],
      revenueByDayPart: {
        breakfast: 5000,
        brunch: 8000,
        lunch: 12000,
        afternoon: 3000,
        dinner: 15000,
        late_night: 2000,
      },
      revenueGrowthRate: 5.2, // percentage
      costOfGoodsSold: totalRevenue * 0.30,
      operatingExpenses: totalRevenue * 0.70,
      netProfit: totalRevenue * 0.12,
      breakEvenPoint: 45, // orders per day
    };
  }, []);

  const generateOptimalPricing = useCallback(async (
    location: { lat: number; lng: number }, 
    cuisine: CuisineType
  ): Promise<{ priceRange: string; reasoning: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    const demographics = getDemographicsInRadius(location, 1000);
    const avgIncome = demographics.reduce((sum, d) => {
      return sum + (d.incomeRanges["50k_75k"] + d.incomeRanges["75k_100k"] * 1.5);
    }, 0) / demographics.length || 0;

    const priceRange = avgIncome > 1000 ? "$$" : "$";
    const reasoning = `Based on local demographics showing average income levels, ${priceRange} pricing is optimal for ${cuisine} cuisine in this area.`;
    
    return { priceRange, reasoning };
  }, [getDemographicsInRadius]);

  // Data Export/Import
  const exportRestaurantData = useCallback(() => {
    return JSON.stringify({
      restaurants: mapState.restaurants,
      demographics: mapState.demographics,
      marketAnalyses: mapState.marketAnalyses,
      researchFilters: mapState.researchFilters,
      exportedAt: new Date().toISOString(),
    });
  }, [mapState]);

  const importRestaurantData = useCallback((data: string) => {
    try {
      const parsed = JSON.parse(data);
      setMapState(prev => ({
        ...prev,
        restaurants: parsed.restaurants || [],
        demographics: parsed.demographics || [],
        marketAnalyses: parsed.marketAnalyses || [],
        researchFilters: parsed.researchFilters || prev.researchFilters,
      }));
      triggerSync();
    } catch (error) {
      console.error('Failed to import restaurant data:', error);
    }
  }, [triggerSync]);

  const generateMarketReport = useCallback(async (analysisId: string): Promise<{ pdf: Blob; insights: string[] }> => {
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate report generation
    const analysis = mapState.marketAnalyses.find(a => a.id === analysisId);
    
    if (!analysis) {
      throw new Error('Analysis not found');
    }

    // Mock PDF generation
    const pdfContent = `Market Analysis Report for ${analysis.location.lat}, ${analysis.location.lng}`;
    const pdf = new Blob([pdfContent], { type: 'application/pdf' });
    
    return {
      pdf,
      insights: analysis.insights,
    };
  }, [mapState.marketAnalyses]);

  // Buffer Radius Management Functions
  const setBufferRadius = useCallback((radius: number) => {
    setMapState(prev => ({
      ...prev,
      bufferRadius: Math.max(50, Math.min(10000, radius)), // Clamp between 50m and 10km
    }));
    triggerSync();
  }, [triggerSync]);

  const setBufferCenter = useCallback((center: { lat: number; lng: number } | null) => {
    setMapState(prev => ({
      ...prev,
      bufferCenter: center,
    }));
    triggerSync();
  }, [triggerSync]);

  const toggleBufferRadius = useCallback(() => {
    setMapState(prev => ({
      ...prev,
      showBufferRadius: !prev.showBufferRadius,
      // If enabling and no center is set, use map center
      bufferCenter: !prev.showBufferRadius && !prev.bufferCenter 
        ? { lat: prev.center.lat, lng: prev.center.lng }
        : prev.bufferCenter,
    }));
    triggerSync();
  }, [triggerSync]);

  const setBufferOpacity = useCallback((opacity: number) => {
    setMapState(prev => ({
      ...prev,
      bufferOpacity: Math.max(0, Math.min(1, opacity)), // Clamp between 0 and 1
    }));
    triggerSync();
  }, [triggerSync]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, []);

  return (
    <SharedStateContext.Provider
      value={{
        mapState,
        updateZoom,
        updateCenter,
        updateBounds,
        addMarker,
        updateMarker,
        removeMarker,
        selectMarker,
        clearMarkers,
        bulkAddMarkers,
        addLayer,
        updateLayer,
        removeLayer,
        toggleLayer,
        setMode,
        setActiveMarkerType,
        executeCommand,
        registerComponent,
        generateComponent,
        
        // Restaurant Research Functions
        addRestaurant,
        updateRestaurant,
        removeRestaurant,
        selectRestaurant,
        getRestaurantsByType,
        getRestaurantsByCuisine,
        getCompetitors,
        
        // Demographic Analysis
        addDemographicData,
        updateDemographicData,
        removeDemographicData,
        selectDemographic,
        getDemographicsInRadius,
        
        // Market Analysis
        conductMarketAnalysis,
        updateMarketAnalysis,
        removeMarketAnalysis,
        getLatestAnalysis,
        
        // Research Filters
        updateResearchFilters,
        resetResearchFilters,
        
        // AI-Powered Insights
        generateLocationInsights,
        generateCompetitorAnalysis,
        generateRevenueProjection,
        generateOptimalPricing,
        
        // Data Export/Import
        exportRestaurantData,
        importRestaurantData,
        generateMarketReport,
        
        undo,
        redo,
        canUndo,
        canRedo,
        clearHistory,
        enableRealTime,
        disableRealTime,
        forceSync,
        setSyncing,
        getMarkersByType,
        getMarkersInBounds,
        exportState,
        importState,

        // Buffer Radius Management
        setBufferRadius,
        setBufferCenter,
        toggleBufferRadius,
        setBufferOpacity,
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
}

// Custom hook to use the shared state
export function useSharedState() {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
}