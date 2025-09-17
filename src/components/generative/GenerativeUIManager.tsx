import React, { useState, useCallback } from 'react';
import { LocationCard } from './LocationCard';
import { MarketAnalysisCard } from './MarketAnalysisCard';
import { CompetitorAnalysisCard } from './CompetitorAnalysisCard';
import { useSharedState } from '@/components/shared/SharedStateProvider';

export interface GenerativeUIProps {
  type: 'location' | 'market_analysis' | 'competitor_analysis' | 'demographic_data' | 'revenue_projection';
  data: any;
  onApprove?: (data: any) => void;
  onReject?: () => void;
  onRequestMore?: () => void;
  messageId?: string;
  showActions?: boolean;
}

export function GenerativeUIManager({ 
  type, 
  data, 
  onApprove, 
  onReject, 
  onRequestMore,
  messageId,
  showActions = true 
}: GenerativeUIProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { 
    addMarker, 
    addRestaurant, 
    conductMarketAnalysis, 
    generateLocationInsights,
    generateCompetitorAnalysis,
    generateRevenueProjection 
  } = useSharedState();

  const handleApprove = useCallback(async (approvedData: any) => {
    setIsProcessing(true);
    try {
      if (onApprove) {
        await onApprove(approvedData);
      }
      
      // Auto-trigger related analyses
      if (type === 'location' && approvedData.coordinates) {
        // Automatically generate market analysis for the location
        setTimeout(async () => {
          try {
            const analysis = await conductMarketAnalysis(
              approvedData.coordinates, 
              1000, // 1km radius
              { 
                cuisineType: approvedData.cuisine,
                restaurantType: approvedData.type 
              }
            );
            console.log('Auto-generated market analysis:', analysis);
          } catch (error) {
            console.error('Failed to auto-generate market analysis:', error);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to approve data:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [onApprove, type, conductMarketAnalysis]);

  const handleReject = useCallback(() => {
    if (onReject) {
      onReject();
    }
  }, [onReject]);

  const handleRequestMore = useCallback(async () => {
    if (onRequestMore) {
      onRequestMore();
    }

    // Generate additional insights based on type
    if (type === 'location' && data.coordinates) {
      try {
        const insights = await generateLocationInsights(data.coordinates);
        console.log('Generated additional insights:', insights);
        // You could update the data with additional insights here
      } catch (error) {
        console.error('Failed to generate additional insights:', error);
      }
    }
  }, [onRequestMore, type, data, generateLocationInsights]);

  // Render the appropriate component based on type
  switch (type) {
    case 'location':
      return (
        <LocationCard
          location={data}
          onApprove={handleApprove}
          onReject={handleReject}
          onRequestMoreInfo={handleRequestMore}
          showActions={showActions && !isProcessing}
        />
      );

    case 'market_analysis':
      return (
        <MarketAnalysisCard
          analysis={data}
          onApprove={handleApprove}
          onReject={handleReject}
          onRequestDetails={handleRequestMore}
          showActions={showActions && !isProcessing}
        />
      );

    case 'competitor_analysis':
      return (
        <CompetitorAnalysisCard
          analysis={data}
          onApprove={handleApprove}
          onReject={handleReject}
          onViewDetails={handleRequestMore}
          showActions={showActions && !isProcessing}
        />
      );

    case 'demographic_data':
      return (
        <DemographicDataCard
          data={data}
          onApprove={handleApprove}
          onReject={handleReject}
          onViewDetails={handleRequestMore}
          showActions={showActions && !isProcessing}
        />
      );

    case 'revenue_projection':
      return (
        <RevenueProjectionCard
          projection={data}
          onApprove={handleApprove}
          onReject={handleReject}
          onViewDetails={handleRequestMore}
          showActions={showActions && !isProcessing}
        />
      );

    default:
      return (
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-gray-600">Unknown component type: {type}</p>
          <pre className="text-xs text-gray-500 mt-2 overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      );
  }
}

// Placeholder components for other types (to be implemented)
function DemographicDataCard({ data, onApprove, onReject, onViewDetails, showActions }: any) {
  return (
    <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
      <h3 className="font-semibold text-purple-800 mb-2">Demographic Data</h3>
      <p className="text-purple-700 text-sm mb-3">
        Population: {data.population?.toLocaleString() || 'N/A'} • 
        Avg Income: ${data.avgIncome?.toLocaleString() || 'N/A'}
      </p>
      {showActions && (
        <div className="flex gap-2">
          <button 
            onClick={() => onApprove(data)}
            className="px-3 py-1 bg-purple-600 text-white rounded text-sm"
          >
            Add to Analysis
          </button>
          <button 
            onClick={onViewDetails}
            className="px-3 py-1 border border-purple-300 rounded text-sm"
          >
            View Details
          </button>
          <button 
            onClick={onReject}
            className="px-3 py-1 border border-red-300 text-red-600 rounded text-sm"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

function RevenueProjectionCard({ projection, onApprove, onReject, onViewDetails, showActions }: any) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-4 border border-green-200 rounded-lg bg-green-50">
      <h3 className="font-semibold text-green-800 mb-2">Revenue Projection</h3>
      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-sm">
          <span className="text-green-700">Conservative:</span>
          <span className="font-medium">{formatCurrency(projection.conservative || 0)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-green-700">Realistic:</span>
          <span className="font-medium">{formatCurrency(projection.realistic || 0)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-green-700">Optimistic:</span>
          <span className="font-medium">{formatCurrency(projection.optimistic || 0)}</span>
        </div>
      </div>
      {showActions && (
        <div className="flex gap-2">
          <button 
            onClick={() => onApprove(projection)}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
          >
            Use Projection
          </button>
          <button 
            onClick={onViewDetails}
            className="px-3 py-1 border border-green-300 rounded text-sm"
          >
            Full Report
          </button>
          <button 
            onClick={onReject}
            className="px-3 py-1 border border-red-300 text-red-600 rounded text-sm"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

// Factory function to create generative UI components
export function createGenerativeUI(type: GenerativeUIProps['type'], data: any, options?: {
  onApprove?: (data: any) => void;
  onReject?: () => void;
  onRequestMore?: () => void;
  messageId?: string;
  showActions?: boolean;
}) {
  return React.createElement(GenerativeUIManager, {
    type,
    data,
    ...options,
  });
}

// Helper function to generate location data from search queries
export function generateLocationFromQuery(query: string, coordinates?: { lat: number; lng: number }) {
  // This would normally use real APIs, but for demo purposes, we'll generate mock data
  const mockLocations = [
    {
      name: "Bella Vista Italian Restaurant",
      address: "123 Main Street, Downtown",
      coordinates: coordinates || { lat: 13.7563, lng: 100.5018 },
      type: 'restaurant' as const,
      cuisine: 'italian',
      priceRange: '$$' as const,
      rating: 4.3,
      reviewCount: 187,
      capacity: 85,
      averageSpend: 32,
      footTraffic: {
        level: 'high' as const,
        peakHours: ['12:00-14:00', '19:00-21:00']
      },
      insights: [
        "High foot traffic location with excellent street visibility",
        "Strong local customer base with repeat visitors",
        "Limited parking but close to public transportation",
        "Growing neighborhood with young professional demographic"
      ],
      opportunityScore: 85
    },
    {
      name: "Potential Restaurant Site",
      address: "456 Business District, Commercial Area",
      coordinates: coordinates || { lat: 13.7580, lng: 100.5050 },
      type: 'potential_site' as const,
      demographics: {
        population: 12500,
        avgIncome: "$75,000",
        ageGroup: "25-40 years"
      },
      insights: [
        "High-income area with disposable income for dining",
        "Lack of quality restaurant options in immediate vicinity",
        "Strong foot traffic during business hours",
        "Excellent visibility from main road"
      ],
      opportunityScore: 92
    }
  ];

  // Simple keyword matching for demo
  if (query.toLowerCase().includes('italian') || query.toLowerCase().includes('restaurant')) {
    return mockLocations[0];
  } else if (query.toLowerCase().includes('site') || query.toLowerCase().includes('location')) {
    return mockLocations[1];
  }

  return mockLocations[0]; // Default
}

// Helper function to generate market analysis data
export function generateMarketAnalysisFromLocation(location: { lat: number; lng: number }, options?: any) {
  return {
    location,
    locationName: options?.locationName || "Selected Location",
    radius: options?.radius || 1000,
    competitorCount: Math.floor(Math.random() * 15) + 3,
    marketSaturation: (['low', 'medium', 'high'] as const)[Math.floor(Math.random() * 3)],
    opportunityScore: Math.floor(Math.random() * 40) + 60,
    recommendedCuisines: ['italian', 'mexican', 'asian', 'american'],
    recommendedPriceRange: '$$' as const,
    estimatedRevenue: {
      conservative: 180000 + Math.floor(Math.random() * 50000),
      realistic: 250000 + Math.floor(Math.random() * 80000),
      optimistic: 350000 + Math.floor(Math.random() * 100000),
    },
    riskFactors: [
      "Moderate competition in the area",
      "Seasonal foot traffic variations",
      "Parking limitations during peak hours"
    ],
    strengths: [
      "Strong demographic match for target market",
      "High visibility location",
      "Growing neighborhood with increasing property values"
    ],
    insights: [
      "Market analysis shows strong potential for casual dining",
      "Italian and Mexican cuisines show lowest competition",
      "Peak hours align well with business district lunch crowd",
      "Demographics indicate strong spending power for $$ price range"
    ],
    demographics: {
      totalPopulation: 8500 + Math.floor(Math.random() * 5000),
      avgIncome: 65000 + Math.floor(Math.random() * 25000),
      primaryAgeGroup: "25-40 years"
    }
  };
}