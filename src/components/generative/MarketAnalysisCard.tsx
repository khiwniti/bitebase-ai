import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, BarChart3, Users, DollarSign, Target, 
         MapPin, Clock, Star, Utensils, TrendingUpIcon, PieChart, Activity, Shield } from 'lucide-react';
import { useSharedState } from '@/components/shared/SharedStateProvider';

interface CompetitorData {
  name: string;
  distance: number;
  rating: number;
  priceRange: string;
  cuisine: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  weaknesses: string[];
  strengths: string[];
  marketShare: number;
}

interface MarketMetrics {
  marketSize: number; // Total market value in area
  marketGrowth: number; // Year-over-year growth percentage
  customerAcquisitionCost: number;
  averageLifetimeValue: number;
  marketPenetration: number; // Percentage of market captured
  seasonalityIndex: number; // Variation coefficient
}

interface DemographicInsights {
  totalPopulation: number;
  targetDemographic: number; // Population matching target
  avgIncome: number;
  diningFrequency: number; // Times per month
  preferredCuisines: string[];
  priceToleranceRange: { min: number; max: number };
  primaryAgeGroups: { [key: string]: number };
  lifestyleSegments: { [key: string]: number };
}

interface MarketAnalysisCardProps {
  analysis: {
    id?: string;
    location: { lat: number; lng: number };
    locationName?: string;
    radius: number;
    competitorCount: number;
    marketSaturation: 'low' | 'medium' | 'high';
    opportunityScore: number;
    confidenceLevel: number; // Statistical confidence 0-100
    recommendedCuisines: string[];
    recommendedPriceRange: '$' | '$$' | '$$$' | '$$$$';
    estimatedRevenue: {
      conservative: number;
      realistic: number;
      optimistic: number;
    };
    riskFactors: string[];
    strengths: string[];
    insights: string[];
    // Enhanced analytics
    competitors?: CompetitorData[];
    marketMetrics?: MarketMetrics;
    demographics?: DemographicInsights;
    recommendations?: {
      positioning: string;
      menuStrategy: string[];
      pricingStrategy: string;
      marketingChannels: string[];
      operationalInsights: string[];
    };
    swotAnalysis?: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    };
    footTrafficAnalysis?: {
      peakHours: string[];
      dailyTraffic: number;
      seasonalVariation: number;
      weekdayVsWeekend: { weekday: number; weekend: number };
    };
  };
  onApprove: (analysis: any) => void;
  onReject: () => void;
  onRequestDetails: () => void;
  showActions?: boolean;
}

export function MarketAnalysisCard({ 
  analysis, 
  onApprove, 
  onReject, 
  onRequestDetails,
  showActions = true 
}: MarketAnalysisCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { conductMarketAnalysis, addMarker } = useSharedState();

  const getSaturationColor = (saturation: string) => {
    switch (saturation) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOpportunityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleApprove = async () => {
    try {
      // Add analysis location as a marker
      await addMarker({
        type: 'business',
        position: analysis.location,
        title: `Market Analysis - ${analysis.locationName || 'Location'}`,
        description: `Opportunity Score: ${analysis.opportunityScore}/100`,
        properties: {
          analysisData: analysis,
          type: 'market_analysis',
          addedFromChat: true,
          timestamp: new Date().toISOString(),
        }
      });

      onApprove(analysis);
    } catch (error) {
      console.error('Failed to add market analysis:', error);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
              Market Analysis
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              {analysis.locationName || `${analysis.location.lat.toFixed(4)}, ${analysis.location.lng.toFixed(4)}`} • 
              {analysis.radius}m radius
            </CardDescription>
          </div>
          <Badge className={`ml-2 ${getSaturationColor(analysis.marketSaturation)} flex-shrink-0`}>
            {analysis.marketSaturation} saturation
          </Badge>
        </div>

        {/* Opportunity Score */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 font-medium">Opportunity Score</span>
            <span className={`font-bold text-lg ${getOpportunityColor(analysis.opportunityScore)}`}>
              {analysis.opportunityScore}/100
            </span>
          </div>
          <Progress value={analysis.opportunityScore} className="h-3" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Target className="w-4 h-4 mr-2 text-blue-500" />
            <div>
              <div className="font-medium">{analysis.competitorCount} Competitors</div>
              <div className="text-xs text-gray-500">in {analysis.radius}m</div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2 text-green-500" />
            <div>
              <div className="font-medium">{analysis.recommendedPriceRange}</div>
              <div className="text-xs text-gray-500">recommended</div>
            </div>
          </div>
        </div>

        {/* Demographics */}
        {analysis.demographics && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-700 font-medium text-sm mb-2">
              <Users className="w-4 h-4 mr-2" />
              Demographics
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>Population: {analysis.demographics.totalPopulation.toLocaleString()}</div>
              <div>Avg Income: ${analysis.demographics.avgIncome.toLocaleString()}</div>
              <div className="col-span-2">Primary Age: {analysis.demographics.primaryAgeGroup}</div>
            </div>
          </div>
        )}

        {/* Revenue Projections */}
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center text-gray-700 font-medium text-sm mb-2">
            <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
            Revenue Projections (Annual)
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Conservative:</span>
              <span className="font-medium text-gray-700">
                {formatCurrency(analysis.estimatedRevenue.conservative)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Realistic:</span>
              <span className="font-medium text-green-700">
                {formatCurrency(analysis.estimatedRevenue.realistic)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Optimistic:</span>
              <span className="font-medium text-green-800">
                {formatCurrency(analysis.estimatedRevenue.optimistic)}
              </span>
            </div>
          </div>
        </div>

        {/* Recommended Cuisines */}
        {analysis.recommendedCuisines.length > 0 && (
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Recommended Cuisines:</div>
            <div className="flex flex-wrap gap-1">
              {analysis.recommendedCuisines.slice(0, 3).map((cuisine, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs capitalize">
                  {cuisine}
                </Badge>
              ))}
              {analysis.recommendedCuisines.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{analysis.recommendedCuisines.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Risk Factors & Strengths */}
        <div className="grid grid-cols-1 gap-3">
          {analysis.riskFactors.length > 0 && (
            <div>
              <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <AlertTriangle className="w-4 h-4 mr-1 text-orange-500" />
                Risk Factors
              </div>
              <div className="space-y-1">
                {analysis.riskFactors.slice(0, 2).map((risk, idx) => (
                  <div key={idx} className="text-xs text-orange-700 bg-orange-50 p-2 rounded">
                    • {risk}
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis.strengths.length > 0 && (
            <div>
              <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                Strengths
              </div>
              <div className="space-y-1">
                {analysis.strengths.slice(0, 2).map((strength, idx) => (
                  <div key={idx} className="text-xs text-green-700 bg-green-50 p-2 rounded">
                    • {strength}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Insights */}
        {analysis.insights.length > 0 && (
          <div className="border-t pt-3">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm w-full text-left"
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              AI Insights ({analysis.insights.length})
              <span className="ml-auto text-xs">
                {isExpanded ? '▲' : '▼'}
              </span>
            </button>
            
            {isExpanded && (
              <div className="mt-2 space-y-1">
                {analysis.insights.map((insight, idx) => (
                  <div key={idx} className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                    • {insight}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>

      {showActions && (
        <CardFooter className="flex gap-2 pt-4">
          <Button 
            onClick={handleApprove}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            size="sm"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Add Analysis
          </Button>
          
          <Button 
            onClick={onRequestDetails}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Full Report
          </Button>
          
          <Button 
            onClick={onReject}
            variant="outline"
            size="sm"
            className="px-3 border-red-200 text-red-600 hover:bg-red-50"
          >
            ✕
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}