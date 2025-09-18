// Promotion Module Types - Marketing and Customer Engagement
import { CustomerSegment } from '../../shared/types';

export interface MarketingCampaign {
  id: string;
  name: string;
  type: "email" | "social_media" | "google_ads" | "facebook_ads" | "loyalty_program" | "influencer" | "local_partnership" | "direct_mail";
  status: "draft" | "active" | "paused" | "completed" | "cancelled";
  startDate: Date;
  endDate: Date;
  budget: number;
  spent: number;
  targetAudience: {
    segments: CustomerSegment[];
    demographics: {
      ageRange: string[];
      incomeLevel: string[];
      location: string[];
    };
    behavioralTargets: string[];
  };
  creative: {
    headline: string;
    description: string;
    imageUrl?: string;
    callToAction: string;
  };
  objectives: {
    primary: "awareness" | "acquisition" | "retention" | "revenue" | "engagement";
    secondary: string[];
  };
  metrics: CampaignMetrics;
  insights: string[];
}

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  clickThroughRate: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  customerAcquisitionCost: number;
  returnOnAdSpend: number;
  returnOnInvestment: number;
  brandLift: number;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    saves: number;
  };
  attribution: AttributionData[];
}

export interface AttributionData {
  touchpoint: string;
  timestamp: Date;
  contribution: number; // percentage of conversion
  customerId: string;
  channelType: string;
}

export interface RetentionStrategy {
  id: string;
  name: string;
  description: string;
  targetSegment: CustomerSegment;
  expectedImpact: number;
  cost: number;
  timeline: string;
}

export interface CustomerLifecycleAnalysis {
  id: string;
  timestamp: Date;
  segments: {
    [segment in CustomerSegment]: LifecycleMetrics;
  };
  cohortAnalysis: CohortData[];
  churnPrediction: ChurnPrediction[];
  retentionStrategies: RetentionStrategy[];
  insights: string[];
}

export interface LifecycleMetrics {
  acquisitionRate: number;
  activationRate: number;
  retentionRate: number;
  revenueGrowth: number;
  churnRate: number;
  averageLifetime: number; // days
  lifetimeValue: number;
  engagementScore: number;
  satisfactionScore: number;
  loyaltyIndex: number;
}

export interface CohortData {
  cohortMonth: string;
  totalCustomers: number;
  retentionByMonth: {
    [month: string]: number;
  };
  revenueByMonth: {
    [month: string]: number;
  };
  averageOrderValue: number;
  lifetimeValue: number;
}

export interface ChurnPrediction {
  customerId: string;
  segment: CustomerSegment;
  churnProbability: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  factors: ChurnFactor[];
  interventionRecommendations: InterventionRecommendation[];
  timeToChurn: number; // days
  lifetimeValueAtRisk: number;
}

export interface ChurnFactor {
  factor: string;
  impact: number; // 0-1 score
  description: string;
}

export interface InterventionRecommendation {
  action: string;
  description: string;
  estimatedEffectiveness: number; // 0-1
  cost: number;
  timeline: string;
}

export interface SentimentAnalysis {
  id: string;
  timestamp: Date;
  source: "yelp" | "google" | "facebook" | "tripadvisor" | "internal" | "social_media";
  totalReviews: number;
  overallSentiment: {
    positive: number;
    neutral: number;
    negative: number;
    score: number; // -1 to 1
  };
  aspectSentiments: {
    food: number;
    service: number;
    ambiance: number;
    value: number;
    cleanliness: number;
    speed: number;
    staff: number;
  };
  keywordAnalysis: {
    positive: KeywordFrequency[];
    negative: KeywordFrequency[];
    trending: KeywordFrequency[];
  };
  competitorComparison: CompetitorSentiment[];
  sentimentTrends: SentimentTrend[];
  actionableInsights: SentimentInsight[];
}

export interface KeywordFrequency {
  keyword: string;
  frequency: number;
  sentiment: number;
  impact: number;
}

export interface CompetitorSentiment {
  competitorId: string;
  competitorName: string;
  overallScore: number;
  aspectComparison: {
    [aspect: string]: {
      ourScore: number;
      theirScore: number;
      difference: number;
    };
  };
}

export interface SentimentTrend {
  date: Date;
  sentiment: number;
  reviewCount: number;
  majorEvents: string[];
}

export interface SentimentInsight {
  type: "strength" | "weakness" | "opportunity" | "threat";
  description: string;
  impact: "low" | "medium" | "high";
  actionRecommendation: string;
  urgency: "low" | "medium" | "high";
}

export interface LoyaltyProgramAnalysis {
  id: string;
  timestamp: Date;
  programMetrics: {
    totalMembers: number;
    activeMembers: number;
    activationRate: number;
    engagementRate: number;
    retentionRate: number;
    pointsIssued: number;
    pointsRedeemed: number;
    redemptionRate: number;
  };
  tierAnalysis: {
    [tier: string]: TierMetrics;
  };
  rewardEffectiveness: RewardAnalysis[];
  memberBehavior: LoyaltyBehaviorPattern[];
  programROI: {
    costs: number;
    revenue: number;
    incrementalRevenue: number;
    roi: number;
  };
  recommendations: LoyaltyRecommendation[];
}

export interface TierMetrics {
  memberCount: number;
  averageSpend: number;
  frequency: number;
  tenure: number;
  upgradePath: number;
  satisfactionScore: number;
}

export interface RewardAnalysis {
  rewardType: string;
  totalOffered: number;
  totalRedeemed: number;
  redemptionRate: number;
  averageOrderLift: number;
  customerSatisfaction: number;
  cost: number;
  incrementalRevenue: number;
  roi: number;
}

export interface LoyaltyBehaviorPattern {
  segment: CustomerSegment;
  enrollmentTriggers: string[];
  engagementDrivers: string[];
  redemptionPatterns: string[];
  churnIndicators: string[];
  lifetimeValue: number;
}

export interface LoyaltyRecommendation {
  type: "reward_structure" | "tier_benefits" | "engagement" | "retention" | "acquisition";
  description: string;
  expectedImpact: {
    membershipGrowth: number;
    engagementIncrease: number;
    revenueImpact: number;
  };
  implementation: {
    effort: "low" | "medium" | "high";
    timeline: string;
    cost: number;
  };
}