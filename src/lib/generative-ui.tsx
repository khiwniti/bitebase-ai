import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Users,
  DollarSign,
  Star,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
} from 'lucide-react';

// Types for generative UI components
export interface GenerativeUIComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: GenerativeUIComponent[];
}

export interface AnalysisResult {
  type: 'place' | 'product' | 'price' | 'promotion';
  title: string;
  summary: string;
  data: any;
  insights: string[];
  recommendations: string[];
  confidence: number;
  timestamp: Date;
}

// Chart component generators
export const generateBarChart = (data: any[], title: string, xKey: string, yKey: string) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="flex items-center">
        <BarChart3 className="w-5 h-5 mr-2" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm font-medium">{item[xKey]}</span>
            <div className="flex items-center space-x-2">
              <Progress value={(item[yKey] / Math.max(...data.map(d => d[yKey]))) * 100} className="w-20" />
              <span className="text-sm text-gray-600">{item[yKey]}</span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Metric card generators
export const generateMetricCard = (title: string, value: string | number, change?: number, icon?: React.ReactNode) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {change !== undefined && (
            <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '↗' : '↘'} {Math.abs(change)}%
            </p>
          )}
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
    </CardContent>
  </Card>
);

// Insight list generator
export const generateInsightsList = (insights: string[], title: string = "Key Insights") => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Zap className="w-5 h-5 mr-2" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">{insight}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Recommendation cards generator
export const generateRecommendationCards = (recommendations: string[], title: string = "Recommendations") => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Target className="w-5 h-5 mr-2" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">{rec}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Place analysis component generator
export const generatePlaceAnalysis = (result: AnalysisResult) => {
  const { data, insights, recommendations, confidence } = result;
  
  return (
    <div className="space-y-6">
      {/* Confidence indicator */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Analysis Confidence</span>
            <Badge variant={confidence >= 80 ? "default" : confidence >= 60 ? "secondary" : "destructive"}>
              {confidence}%
            </Badge>
          </div>
          <Progress value={confidence} className="mt-2" />
        </CardContent>
      </Card>

      {/* Location metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {generateMetricCard("Foot Traffic", data?.footTraffic || "N/A", data?.footTrafficChange, <Users className="w-6 h-6" />)}
        {generateMetricCard("Market Size", data?.marketSize || "N/A", data?.marketGrowth, <TrendingUp className="w-6 h-6" />)}
        {generateMetricCard("Competition", data?.competitorCount || "N/A", undefined, <Target className="w-6 h-6" />)}
      </div>

      {/* Demographics chart */}
      {data?.demographics && generateBarChart(
        data.demographics,
        "Demographics Analysis",
        "ageGroup",
        "percentage"
      )}

      {/* Insights and recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {generateInsightsList(insights, "Location Insights")}
        {generateRecommendationCards(recommendations, "Site Recommendations")}
      </div>
    </div>
  );
};

// Product analysis component generator
export const generateProductAnalysis = (result: AnalysisResult) => {
  const { data, insights, recommendations, confidence } = result;
  
  return (
    <div className="space-y-6">
      {/* Product performance metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {generateMetricCard("Avg Rating", data?.avgRating || "N/A", data?.ratingChange, <Star className="w-6 h-6" />)}
        {generateMetricCard("Sales Volume", data?.salesVolume || "N/A", data?.salesChange, <TrendingUp className="w-6 h-6" />)}
        {generateMetricCard("Price Point", data?.avgPrice || "N/A", data?.priceChange, <DollarSign className="w-6 h-6" />)}
        {generateMetricCard("Demand Score", data?.demandScore || "N/A", data?.demandChange, <BarChart3 className="w-6 h-6" />)}
      </div>

      {/* Product category performance */}
      {data?.categoryPerformance && generateBarChart(
        data.categoryPerformance,
        "Category Performance",
        "category",
        "revenue"
      )}

      {/* Product insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {generateInsightsList(insights, "Product Insights")}
        {generateRecommendationCards(recommendations, "Menu Optimization")}
      </div>
    </div>
  );
};

// Price analysis component generator
export const generatePriceAnalysis = (result: AnalysisResult) => {
  const { data, insights, recommendations, confidence } = result;
  
  return (
    <div className="space-y-6">
      {/* Pricing metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {generateMetricCard("Optimal Price", data?.optimalPrice || "N/A", undefined, <DollarSign className="w-6 h-6" />)}
        {generateMetricCard("Price Elasticity", data?.elasticity || "N/A", undefined, <TrendingUp className="w-6 h-6" />)}
        {generateMetricCard("Revenue Impact", data?.revenueImpact || "N/A", data?.revenueChange, <BarChart3 className="w-6 h-6" />)}
      </div>

      {/* Price comparison chart */}
      {data?.priceComparison && generateBarChart(
        data.priceComparison,
        "Competitive Price Analysis",
        "competitor",
        "price"
      )}

      {/* Pricing insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {generateInsightsList(insights, "Pricing Insights")}
        {generateRecommendationCards(recommendations, "Pricing Strategy")}
      </div>
    </div>
  );
};

// Promotion analysis component generator
export const generatePromotionAnalysis = (result: AnalysisResult) => {
  const { data, insights, recommendations, confidence } = result;
  
  return (
    <div className="space-y-6">
      {/* Promotion metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {generateMetricCard("ROI", data?.roi || "N/A", data?.roiChange, <TrendingUp className="w-6 h-6" />)}
        {generateMetricCard("Conversion Rate", data?.conversionRate || "N/A", data?.conversionChange, <Target className="w-6 h-6" />)}
        {generateMetricCard("Customer Acquisition", data?.newCustomers || "N/A", data?.acquisitionChange, <Users className="w-6 h-6" />)}
        {generateMetricCard("Campaign Reach", data?.reach || "N/A", data?.reachChange, <Zap className="w-6 h-6" />)}
      </div>

      {/* Campaign performance chart */}
      {data?.campaignPerformance && generateBarChart(
        data.campaignPerformance,
        "Campaign Performance",
        "campaign",
        "effectiveness"
      )}

      {/* Promotion insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {generateInsightsList(insights, "Campaign Insights")}
        {generateRecommendationCards(recommendations, "Marketing Strategy")}
      </div>
    </div>
  );
};

// Main generative UI function
export const generateAnalysisUI = (result: AnalysisResult): React.ReactNode => {
  switch (result.type) {
    case 'place':
      return generatePlaceAnalysis(result);
    case 'product':
      return generateProductAnalysis(result);
    case 'price':
      return generatePriceAnalysis(result);
    case 'promotion':
      return generatePromotionAnalysis(result);
    default:
      return (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <div>
                <h3 className="font-semibold">Unknown Analysis Type</h3>
                <p className="text-sm text-gray-600">Unable to generate UI for this analysis type.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
  }
};

// Cross-module workflow UI generator
export const generateWorkflowUI = (results: AnalysisResult[]) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Cross-Module Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {results.map((result, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <Badge className="mb-2">{result.type.toUpperCase()}</Badge>
                <h4 className="font-semibold text-sm">{result.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{result.summary}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {results.map((result, index) => (
        <div key={index}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Badge className="mr-3">{result.type.toUpperCase()}</Badge>
            {result.title}
          </h3>
          {generateAnalysisUI(result)}
        </div>
      ))}
    </div>
  );
};