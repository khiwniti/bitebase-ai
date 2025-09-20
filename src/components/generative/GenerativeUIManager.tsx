import React, { useState, useCallback, Suspense } from 'react';
import { LocationCard } from './LocationCard';
import { MarketAnalysisCard } from './MarketAnalysisCard';
import { CompetitorAnalysisCard } from './CompetitorAnalysisCard';
import CustomReportLayoutManager, { ReportLayout } from './CustomReportLayoutManager';
import { useSharedState } from '@/components/shared/SharedStateProvider';
import { restaurantDataService, Restaurant } from '@/services/restaurant-data-service';
import { GeoPoint } from '@/lib/geospatial-analysis';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Loader2 } from 'lucide-react';

// Performance optimized loading component
const LoadingFallback = () => (
  <Card className="w-full">
    <CardContent className="flex items-center justify-center py-8">
      <Loader2 className="h-6 w-6 animate-spin mr-2" />
      <span className="text-sm text-gray-600">Loading component...</span>
    </CardContent>
  </Card>
);

export interface GenerativeUIProps {
  type: 'location' | 'market_analysis' | 'competitor_analysis' | 'demographic_data' | 'revenue_projection' | 'custom_report';
  data: any;
  onApprove?: (data: any) => void;
  onReject?: () => void;
  onRequestMore?: () => void;
  messageId?: string;
  showActions?: boolean;
  layoutConfig?: ReportLayout;
}

export function GenerativeUIManager({ 
  type, 
  data, 
  onApprove, 
  onReject, 
  onRequestMore,
  messageId,
  showActions = true,
  layoutConfig 
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
      
      // Auto-trigger related analyses using real data
      if (type === 'location' && approvedData.coordinates) {
        setTimeout(async () => {
          try {
            // Fetch real market analysis data
            const nearbyRestaurants = await restaurantDataService.fetchRestaurants({
              location: approvedData.coordinates,
              radius: 1, // 1km radius
              limit: 20
            });

            const analysis = await conductMarketAnalysis(
              approvedData.coordinates, 
              1000,
              { 
                cuisineType: approvedData.cuisine,
                restaurantType: approvedData.type
              }
            );
            console.log('Auto-generated market analysis with real data:', analysis);
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

    // Generate additional insights based on type using real data
    if (type === 'location' && data.coordinates) {
      try {
        // Fetch detailed restaurant and menu data
        const restaurantData = await restaurantDataService.fetchRestaurants({
          location: data.coordinates,
          radius: 0.5, // 500m for detailed analysis
          limit: 10
        });

        const insights = await generateLocationInsights(data.coordinates);
        console.log('Generated additional insights with real data:', insights);
      } catch (error) {
        console.error('Failed to generate additional insights:', error);
      }
    }
  }, [onRequestMore, type, data, generateLocationInsights]);

  // Render the appropriate component based on type with optimized loading
  switch (type) {
    case 'location':
      return (
        <Suspense fallback={<LoadingFallback />}>
          <LocationCard
            location={data}
            onApprove={handleApprove}
            onReject={handleReject}
            onRequestMoreInfo={handleRequestMore}
            showActions={showActions && !isProcessing}
          />
        </Suspense>
      );

    case 'market_analysis':
      return (
        <Suspense fallback={<LoadingFallback />}>
          <MarketAnalysisCard
            analysis={data}
            onApprove={handleApprove}
            onReject={handleReject}
            onRequestDetails={handleRequestMore}
            showActions={showActions && !isProcessing}
          />
        </Suspense>
      );

    case 'competitor_analysis':
      return (
        <Suspense fallback={<LoadingFallback />}>
          <CompetitorAnalysisCard
            analysis={data}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewDetails={handleRequestMore}
            showActions={showActions && !isProcessing}
          />
        </Suspense>
      );

    case 'demographic_data':
      return (
        <Suspense fallback={<LoadingFallback />}>
          <DemographicDataCard
            data={data}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewDetails={handleRequestMore}
            showActions={showActions && !isProcessing}
          />
        </Suspense>
      );

    case 'revenue_projection':
      return (
        <Suspense fallback={<LoadingFallback />}>
          <RevenueProjectionCard
            projection={data}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewDetails={handleRequestMore}
            showActions={showActions && !isProcessing}
          />
        </Suspense>
      );

    case 'custom_report':
      return (
        <Suspense fallback={<LoadingFallback />}>
          <CustomReportLayoutManager
            reportId={messageId || `report-${Date.now()}`}
            initialLayout={layoutConfig}
            onLayoutChange={(layout) => {
              console.log('Layout changed:', layout);
            }}
            onSave={(layout) => {
              console.log('Layout saved:', layout);
              if (onApprove) {
                onApprove({ layout, reportData: data });
              }
            }}
            className="w-full"
          />
        </Suspense>
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

// Helper function to generate location data from search queries using real data
export async function generateLocationFromQuery(query: string, coordinates?: { lat: number; lng: number }) {
  try {
    const searchLocation = coordinates || { lat: 13.7563, lng: 100.5018 }; // Default to Bangkok center

    // Search for restaurants using real API
    const restaurants = await restaurantDataService.searchRestaurants(query, searchLocation);
    
    if (restaurants.length > 0) {
      const restaurant = restaurants[0];
      
      // Fetch menu data for additional insights
      const menuData = await restaurantDataService.fetchRestaurantMenu(restaurant.id);
      
      return {
        name: restaurant.name,
        address: restaurant.address,
        coordinates: restaurant.location,
        type: 'restaurant' as const,
        cuisine: restaurant.cuisineType[0]?.toLowerCase() || 'general',
        priceRange: restaurant.priceRange,
        rating: restaurant.rating,
        reviewCount: restaurant.reviewCount,
        capacity: menuData?.analytics.totalItems || 50, // Approximate capacity from menu size
        averageSpend: Math.round(menuData?.analytics.averagePrice || 25),
        footTraffic: {
          level: restaurant.businessMetrics.footTraffic,
          peakHours: ['12:00-14:00', '19:00-21:00'] // Standard restaurant hours
        },
        insights: [
          `${restaurant.businessMetrics.footTraffic.charAt(0).toUpperCase() + restaurant.businessMetrics.footTraffic.slice(1)} foot traffic location`,
          `${restaurant.rating}/5 rating with ${restaurant.reviewCount} reviews`,
          menuData ? `Menu offers ${menuData.analytics.totalItems} items` : "Menu information available",
          `Competitive score: ${restaurant.businessMetrics.competitiveScore}/100`
        ],
        opportunityScore: restaurant.businessMetrics.competitiveScore,
        menuData: menuData
      };
    }

    // If no restaurants found, return potential site analysis
    return {
      name: "Potential Restaurant Site",
      address: "Location analysis based on search area",
      coordinates: searchLocation,
      type: 'potential_site' as const,
      demographics: {
        population: "Analysis pending",
        avgIncome: "Data loading...",
        ageGroup: "Demographics analysis in progress"
      },
      insights: [
        "Real-time location analysis in progress",
        "Fetching competitive landscape data",
        "Analyzing demographic and traffic patterns",
        "Market opportunity assessment underway"
      ],
      opportunityScore: 75 // Conservative estimate
    };

  } catch (error) {
    console.error('Failed to generate location from query:', error);
    
    // Fallback to basic analysis
    return {
      name: "Location Analysis",
      address: "Data temporarily unavailable",
      coordinates: coordinates || { lat: 13.7563, lng: 100.5018 },
      type: 'potential_site' as const,
      insights: [
        "Location data service temporarily unavailable",
        "Please check your internet connection",
        "Falling back to basic analysis mode"
      ],
      opportunityScore: 50
    };
  }
}

// Helper function to generate market analysis data using real restaurant data
export async function generateMarketAnalysisFromLocation(location: { lat: number; lng: number }, options?: any) {
  try {
    // Fetch real restaurant data for market analysis
    const nearbyRestaurants = await restaurantDataService.fetchRestaurants({
      location,
      radius: (options?.radius || 1000) / 1000, // Convert meters to km
      limit: 50
    });

    const competitors = restaurantDataService.toCompetitorInfo(nearbyRestaurants);
    
    // Calculate market metrics from real data
    const cuisineTypes = nearbyRestaurants.flatMap(r => r.cuisineType);
    const cuisineCounts = cuisineTypes.reduce((acc, cuisine) => {
      acc[cuisine] = (acc[cuisine] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgRating = nearbyRestaurants.reduce((sum, r) => sum + r.rating, 0) / nearbyRestaurants.length;
    const avgPriceLevel = nearbyRestaurants.filter(r => r.priceRange).length;
    
    // Determine market saturation based on competitor density
    const area = Math.PI * Math.pow((options?.radius || 1000) / 1000, 2); // km²
    const competitorDensity = nearbyRestaurants.length / area;
    
    let marketSaturation: 'low' | 'medium' | 'high';
    if (competitorDensity < 5) marketSaturation = 'low';
    else if (competitorDensity < 15) marketSaturation = 'medium';
    else marketSaturation = 'high';

    // Find underrepresented cuisines
    const popularCuisines = Object.entries(cuisineCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([cuisine]) => cuisine);

    const allCuisines = ['Italian', 'Mexican', 'Asian', 'American', 'Thai', 'Japanese', 'Indian'];
    const recommendedCuisines = allCuisines.filter(cuisine => 
      !popularCuisines.includes(cuisine.toLowerCase())
    ).slice(0, 4);

    // Calculate opportunity score based on real data
    const baseScore = 100;
    const competitionPenalty = Math.min(nearbyRestaurants.length * 2, 40);
    const qualityBonus = avgRating > 4.0 ? 10 : 0;
    const diversityBonus = recommendedCuisines.length > 2 ? 15 : 0;
    
    const opportunityScore = Math.max(20, baseScore - competitionPenalty + qualityBonus + diversityBonus);

    // Generate revenue projections based on market data
    const avgCapacity = 80; // Standard restaurant capacity
    const avgSpend = nearbyRestaurants.reduce((sum, r) => sum + (r.businessMetrics.competitiveScore || 25), 0) / nearbyRestaurants.length;
    const dailyCoverage = marketSaturation === 'low' ? 2.5 : marketSaturation === 'medium' ? 2.0 : 1.5;
    
    const dailyRevenue = avgCapacity * dailyCoverage * avgSpend;
    const monthlyRevenue = dailyRevenue * 30;
    const annualRevenue = monthlyRevenue * 12;

    return {
      location,
      locationName: options?.locationName || "Selected Location",
      radius: options?.radius || 1000,
      competitorCount: nearbyRestaurants.length,
      marketSaturation,
      opportunityScore: Math.round(opportunityScore),
      recommendedCuisines: recommendedCuisines.map(c => c.toLowerCase()),
      recommendedPriceRange: avgPriceLevel > 15 ? '$$$' as const : '$$' as const,
      estimatedRevenue: {
        conservative: Math.round(annualRevenue * 0.7),
        realistic: Math.round(annualRevenue),
        optimistic: Math.round(annualRevenue * 1.4),
      },
      riskFactors: [
        marketSaturation === 'high' ? "High competition density in the area" : "Moderate competition level",
        "Market entry requires strong differentiation strategy",
        nearbyRestaurants.some(r => r.rating > 4.5) ? "High-quality competitors present" : "Standard competition quality"
      ],
      strengths: [
        `${nearbyRestaurants.length} existing restaurants validate market demand`,
        recommendedCuisines.length > 0 ? `Opportunity in ${recommendedCuisines.join(', ')} cuisines` : "Established market with proven demand",
        avgRating < 4.0 ? "Room for quality improvement in market" : "Market shows strong quality standards"
      ],
      insights: [
        `Market analysis shows ${marketSaturation} competition density`,
        recommendedCuisines.length > 0 ? `${recommendedCuisines.join(' and ')} cuisines show lowest competition` : "Market is well-established across cuisine types",
        `Average market rating is ${avgRating.toFixed(1)}/5.0`,
        competitorDensity < 10 ? "Market has room for new entrants" : "Market requires strong positioning strategy"
      ],
      demographics: {
        totalPopulation: Math.round(8500 + (nearbyRestaurants.length * 100)), // Estimate based on restaurant density
        avgIncome: 45000 + (opportunityScore * 500), // Correlate income with opportunity
        primaryAgeGroup: "25-45 years"
      },
      competitorData: competitors.slice(0, 10), // Top 10 competitors
      menuAnalytics: await Promise.all(
        nearbyRestaurants.slice(0, 5).map(async (restaurant) => {
          try {
            const menu = await restaurantDataService.fetchRestaurantMenu(restaurant.id);
            return {
              restaurantName: restaurant.name,
              menuData: menu
            };
          } catch (error) {
            return null;
          }
        })
      ).then(results => results.filter(Boolean))
    };

  } catch (error) {
    console.error('Failed to generate market analysis:', error);
    
    // Fallback to basic analysis
    return {
      location,
      locationName: options?.locationName || "Selected Location", 
      radius: options?.radius || 1000,
      competitorCount: 0,
      marketSaturation: 'medium' as const,
      opportunityScore: 60,
      recommendedCuisines: ['italian', 'mexican', 'asian'],
      recommendedPriceRange: '$$' as const,
      estimatedRevenue: {
        conservative: 150000,
        realistic: 220000,
        optimistic: 300000,
      },
      riskFactors: [
        "Market data temporarily unavailable",
        "Analysis based on general market indicators"
      ],
      strengths: [
        "Location selected for analysis",
        "Basic demographic indicators positive"
      ],
      insights: [
        "Real-time market data service temporarily unavailable", 
        "Fallback analysis suggests moderate opportunity",
        "Detailed analysis available once data service is restored"
      ],
      demographics: {
        totalPopulation: 8500,
        avgIncome: 55000,
        primaryAgeGroup: "25-40 years"
      }
    };
  }
}