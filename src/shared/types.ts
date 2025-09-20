// Core types shared across all modules
export type RestaurantType = "fast_food" | "casual_dining" | "fine_dining" | "cafe" | "bakery" | "bar" | "food_truck" | "buffet" | "catering" | "ghost_kitchen" | "cloud_kitchen" | "pop_up" | "franchise" | "chain";
export type CuisineType = "american" | "italian" | "mexican" | "asian" | "mediterranean" | "french" | "indian" | "chinese" | "japanese" | "thai" | "vietnamese" | "korean" | "middle_eastern" | "fusion" | "vegan" | "organic" | "bbq" | "seafood" | "steakhouse" | "pizza" | "sushi" | "other";
export type PriceRange = "$" | "$$" | "$$$" | "$$$$" | "$$$$$";
export type CustomerSegment = "new_customers" | "regular_customers" | "vip_customers" | "at_risk_customers" | "champions" | "loyalists" | "potential_loyalists" | "cannot_lose_them";
export type DemographicSegment = "young_professionals" | "families" | "students" | "seniors" | "tourists" | "locals" | "millennials" | "gen_z" | "high_income" | "middle_income" | "budget_conscious";
export type BusinessDayPart = "breakfast" | "brunch" | "lunch" | "afternoon" | "dinner" | "late_night";

export interface OperatingHours {
  monday: { open: string; close: string; isOpen: boolean; };
  tuesday: { open: string; close: string; isOpen: boolean; };
  wednesday: { open: string; close: string; isOpen: boolean; };
  thursday: { open: string; close: string; isOpen: boolean; };
  friday: { open: string; close: string; isOpen: boolean; };
  saturday: { open: string; close: string; isOpen: boolean; };
  sunday: { open: string; close: string; isOpen: boolean; };
}

// Agent Status Types for Real-time Tracking
export type AgentStatusType = "idle" | "processing" | "waiting" | "error" | "completed";
export type StepStatusType = "pending" | "active" | "completed" | "failed";

export interface AgentStatus {
  agentId: string;
  agentName: string;
  status: AgentStatusType;
  currentTask: string;
  progressPercentage: number;
  substeps: SubstepStatus[];
  estimatedCompletion?: Date;
  dataProcessed: number;
  processingRate: number;
  errors: StatusError[];
  lastUpdate: Date;
  userInteractionsPending: UserInteraction[];
}

export interface SubstepStatus {
  stepId: string;
  stepName: string;
  status: StepStatusType;
  progress: number;
  startTime?: Date;
  endTime?: Date;
  details: string;
  dataPointsProcessed: number;
}

export interface StatusError {
  errorId: string;
  message: string;
  severity: "low" | "medium" | "high";
  timestamp: Date;
  context?: Record<string, any>;
}

export interface UserInteraction {
  requestId: string;
  agentId: string;
  prompt: string;
  inputType: "confirmation" | "selection" | "text_input" | "file_upload";
  options?: string[];
  timeout?: Date;
  priority: number;
}

// Restaurant Requirements for Analysis
export interface RestaurantRequirements {
  restaurantType: RestaurantType;
  cuisineType: CuisineType;
  location: string;
  budgetRange: [number, number];
  targetCustomers: string;
  businessModel: "dine_in" | "delivery" | "takeaway" | "hybrid";
  operatingHours?: OperatingHours;
  targetRadius?: number;
  specialRequirements?: string[];
}

// Enhanced Analysis Results
export interface ProductAnalysis {
  menuInsights: Record<string, any>;
  pricingAnalysis: Record<string, number>;
  competitorDishes: Array<{
    dishName: string;
    restaurant: string;
    price: number;
    rating: number;
    popularity: number;
  }>;
  seasonalTrends: Record<string, any[]>;
  profitabilityMetrics: Record<string, number>;
  recommendations: string[];
}

export interface PlaceAnalysis {
  locationScore: number;
  competitorDensity: Record<string, number>;
  customerDemographics: Record<string, any>;
  rentalCosts: Record<string, number>;
  accessibilityScore: number;
  deliveryCoverage: Record<string, boolean>;
  footTrafficPatterns: Record<string, number>;
  proximityToTransport: number;
}

export interface PriceAnalysis {
  revenueForecast: Record<string, number>;
  breakEvenAnalysis: Record<string, any>;
  pricingRecommendations: Record<string, number>;
  peakHours: string[];
  seasonalPatterns: Record<string, any[]>;
  marketPositioning: Record<string, any>;
  profitMargins: Record<string, number>;
}

export interface PromotionAnalysis {
  sentimentAnalysis: Record<string, number>;
  customerSegments: Array<{
    segment: string;
    size: number;
    characteristics: string[];
    preferences: string[];
  }>;
  marketingOpportunities: string[];
  campaignRecommendations: Array<{
    type: string;
    description: string;
    estimatedROI: number;
    timeline: string;
  }>;
  competitiveAnalysis: Record<string, any>;
}

// Shared State Management
export interface SharedStateModel {
  sessionId: string;
  userSessions: string[];
  currentInterface: "chat" | "map" | "report";
  synchronizedData: Record<string, any>;
  version: number;
  lastModified: Date;
  conflictResolution: Record<string, any>;
  changeLog: StateChange[];
}

export interface StateChange {
  changeId: string;
  userId: string;
  timestamp: Date;
  action: string;
  component: string;
  oldValue?: any;
  newValue: any;
  conflictResolved?: boolean;
}

// Generative UI Components
export interface GenerativeUIComponent {
  componentId: string;
  componentType: "chart" | "map" | "text_block" | "table" | "form" | "image" | "video";
  dataBinding: Record<string, any>;
  styling: Record<string, any>;
  interactions: string[];
  editableProperties: string[];
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  parentContainer?: string;
  isEditable: boolean;
  isVisible: boolean;
}

// Geospatial Analysis
export interface GeospatialAnalysis {
  locationCoordinates: [number, number];
  bufferAnalysis: Record<string, any>;
  proximityScores: Record<string, number>;
  demographicOverlay: Record<string, any>;
  accessibilityMetrics: Record<string, number>;
  heatmapData: Array<{
    lat: number;
    lng: number;
    intensity: number;
    category: string;
  }>;
  choroplethData: Record<string, any>;
}

// MCP Server Configuration
export interface MCPServerConfig {
  name: string;
  command: string;
  args: string[];
  env: Record<string, string>;
  enabled: boolean;
  retryCount: number;
  capabilities: string[];
  healthCheckUrl?: string;
}

// Chat Message Types
export interface ChatMessage {
  messageId: string;
  sender: "user" | "agent" | "system";
  content: string;
  timestamp: Date;
  messageType: "status_update" | "user_query" | "agent_response" | "error" | "notification";
  metadata: Record<string, any>;
  relatedComponents?: string[];
}

// Report Generation
export interface ReportSection {
  sectionId: string;
  title: string;
  content: string;
  visualizations?: string[];
  tables?: any[];
  recommendations?: string[];
  confidence: number;
  order: number;
}

export interface ComprehensiveReport {
  reportId: string;
  title: string;
  description: string;
  requirements: RestaurantRequirements;
  sections: ReportSection[];
  executiveSummary: string;
  keyFindings: string[];
  recommendations: string[];
  riskAssessment: string[];
  nextSteps: string[];
  generatedAt: Date;
  confidence: number;
  dataSources: string[];
}