// Geospatial analysis types and interfaces
export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface GeoFeature {
  id: string;
  type: 'competitor' | 'customer' | 'supplier' | 'poi' | 'demographic';
  location: GeoPoint;
  properties: Record<string, any>;
  score?: number;
}

export interface GeoBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface DemographicData {
  population: number;
  avgAge: number;
  avgIncome: number;
  educationLevel: string;
  familySize: number;
  employmentRate: number;
  industries: string[];
}

export interface TrafficPattern {
  hour: number;
  footTraffic: number;
  vehicleTraffic: number;
  publicTransport: number;
}

export interface CompetitorInfo {
  id: string;
  name: string;
  category: string;
  rating: number;
  priceRange: string;
  location: GeoPoint;
  distance: number;
  marketShare?: number;
}

export interface HotspotAnalysis {
  center: GeoPoint;
  radius: number; // in meters
  score: number; // 0-100
  factors: {
    footTraffic: number;
    demographics: number;
    competition: number;
    accessibility: number;
    costEfficiency: number;
  };
  insights: string[];
  recommendations: string[];
}

// Geospatial utility functions
export class GeospatialAnalyzer {
  // Calculate distance between two points using Haversine formula
  static calculateDistance(point1: GeoPoint, point2: GeoPoint): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(point2.lat - point1.lat);
    const dLng = this.toRadians(point2.lng - point1.lng);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1.lat)) * Math.cos(this.toRadians(point2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Find features within radius
  static findFeaturesWithinRadius(
    center: GeoPoint,
    features: GeoFeature[],
    radiusKm: number
  ): GeoFeature[] {
    return features.filter(feature => 
      this.calculateDistance(center, feature.location) <= radiusKm
    );
  }

  // Calculate geographic center of multiple points
  static calculateCenter(points: GeoPoint[]): GeoPoint {
    if (points.length === 0) return { lat: 0, lng: 0 };
    
    const sum = points.reduce(
      (acc, point) => ({
        lat: acc.lat + point.lat,
        lng: acc.lng + point.lng
      }),
      { lat: 0, lng: 0 }
    );
    
    return {
      lat: sum.lat / points.length,
      lng: sum.lng / points.length
    };
  }

  // Generate hotspot analysis for restaurant placement
  static analyzeHotspots(
    bounds: GeoBounds,
    competitors: CompetitorInfo[],
    demographics: Map<string, DemographicData>,
    trafficData: Map<string, TrafficPattern[]>,
    gridSize: number = 0.005 // approximately 500m
  ): HotspotAnalysis[] {
    const hotspots: HotspotAnalysis[] = [];
    
    // Generate grid points
    for (let lat = bounds.south; lat <= bounds.north; lat += gridSize) {
      for (let lng = bounds.west; lng <= bounds.east; lng += gridSize) {
        const center: GeoPoint = { lat, lng };
        const analysis = this.analyzeLocationPotential(
          center,
          competitors,
          demographics,
          trafficData
        );
        
        if (analysis.score > 60) { // Only include promising locations
          hotspots.push(analysis);
        }
      }
    }
    
    return hotspots.sort((a, b) => b.score - a.score);
  }

  // Analyze potential of specific location
  static analyzeLocationPotential(
    location: GeoPoint,
    competitors: CompetitorInfo[],
    demographics: Map<string, DemographicData>,
    trafficData: Map<string, TrafficPattern[]>
  ): HotspotAnalysis {
    const radius = 500; // 500m analysis radius
    
    // Find nearby competitors
    const nearbyCompetitors = competitors.filter(comp =>
      this.calculateDistance(location, comp.location) <= 0.5 // 500m
    );
    
    // Calculate competition density
    const competitionScore = Math.max(0, 100 - (nearbyCompetitors.length * 10));
    
    // Analyze demographics (simplified - would use real demographic API)
    const demographicScore = this.calculateDemographicScore(location, demographics);
    
    // Analyze foot traffic (simplified - would use real traffic data)
    const trafficScore = this.calculateTrafficScore(location, trafficData);
    
    // Analyze accessibility (simplified)
    const accessibilityScore = this.calculateAccessibilityScore(location);
    
    // Calculate cost efficiency (simplified)
    const costScore = this.calculateCostScore(location);
    
    // Weighted average
    const factors = {
      footTraffic: trafficScore,
      demographics: demographicScore,
      competition: competitionScore,
      accessibility: accessibilityScore,
      costEfficiency: costScore
    };
    
    const score = (
      factors.footTraffic * 0.25 +
      factors.demographics * 0.2 +
      factors.competition * 0.2 +
      factors.accessibility * 0.2 +
      factors.costEfficiency * 0.15
    );
    
    return {
      center: location,
      radius,
      score: Math.round(score),
      factors,
      insights: this.generateInsights(factors, nearbyCompetitors),
      recommendations: this.generateRecommendations(factors, score)
    };
  }

  // Calculate demographic score
  private static calculateDemographicScore(
    location: GeoPoint,
    demographics: Map<string, DemographicData>
  ): number {
    // Simplified scoring based on income and population density
    // In reality, would use census data APIs
    const baseScore = 70;
    const proximityBonus = Math.random() * 30; // Placeholder for real demographic analysis
    return Math.min(100, baseScore + proximityBonus);
  }

  // Calculate traffic score
  private static calculateTrafficScore(
    location: GeoPoint,
    trafficData: Map<string, TrafficPattern[]>
  ): number {
    // Simplified traffic analysis
    // In reality, would integrate with Google Places API, foot traffic APIs
    const baseScore = 60;
    const trafficBonus = Math.random() * 40; // Placeholder for real traffic data
    return Math.min(100, baseScore + trafficBonus);
  }

  // Calculate accessibility score
  private static calculateAccessibilityScore(location: GeoPoint): number {
    // Simplified accessibility analysis
    // In reality, would analyze public transport, parking, walkability
    return 70 + Math.random() * 30;
  }

  // Calculate cost efficiency score
  private static calculateCostScore(location: GeoPoint): number {
    // Simplified cost analysis
    // In reality, would integrate with real estate APIs
    return 60 + Math.random() * 40;
  }

  // Generate insights based on analysis
  private static generateInsights(
    factors: HotspotAnalysis['factors'],
    nearbyCompetitors: CompetitorInfo[]
  ): string[] {
    const insights: string[] = [];
    
    if (factors.footTraffic > 80) {
      insights.push("High foot traffic area with excellent customer flow potential");
    }
    
    if (factors.demographics > 85) {
      insights.push("Target demographic profile strongly matches restaurant market");
    }
    
    if (factors.competition < 50) {
      insights.push("Low competition density provides market opportunity");
    } else if (nearbyCompetitors.length > 3) {
      insights.push(`${nearbyCompetitors.length} competitors nearby - consider differentiation strategy`);
    }
    
    if (factors.accessibility > 80) {
      insights.push("Excellent accessibility via public transport and major roads");
    }
    
    if (factors.costEfficiency > 75) {
      insights.push("Cost-effective location with favorable rent-to-revenue potential");
    }
    
    return insights;
  }

  // Generate recommendations
  private static generateRecommendations(
    factors: HotspotAnalysis['factors'],
    score: number
  ): string[] {
    const recommendations: string[] = [];
    
    if (score > 85) {
      recommendations.push("Highly recommended location - proceed with detailed feasibility study");
    } else if (score > 70) {
      recommendations.push("Good potential - consider market testing and customer validation");
    }
    
    if (factors.competition > 70) {
      recommendations.push("High competition - focus on unique value proposition and differentiation");
    }
    
    if (factors.footTraffic < 60) {
      recommendations.push("Consider marketing strategies to drive foot traffic and awareness");
    }
    
    if (factors.costEfficiency < 50) {
      recommendations.push("Evaluate cost optimization strategies or alternative locations");
    }
    
    return recommendations;
  }

  // Delivery zone optimization
  static optimizeDeliveryZones(
    restaurantLocation: GeoPoint,
    customerDensity: Map<string, number>,
    maxDeliveryTime: number = 30 // minutes
  ): GeoFeature[] {
    const zones: GeoFeature[] = [];
    const maxRadius = (maxDeliveryTime * 0.5) / 60; // Approximate km for 30min delivery
    
    // Create concentric zones based on delivery time
    const zoneCount = 3;
    for (let i = 1; i <= zoneCount; i++) {
      const radius = (maxRadius / zoneCount) * i;
      const deliveryTime = (radius / 0.5) * 60; // Approximate delivery time
      
      zones.push({
        id: `zone-${i}`,
        type: 'poi',
        location: restaurantLocation,
        properties: {
          radius,
          deliveryTime,
          priority: zoneCount - i + 1,
          description: `${deliveryTime.toFixed(0)}-minute delivery zone`
        }
      });
    }
    
    return zones;
  }

  // Market penetration analysis
  static analyzeMarketPenetration(
    restaurantLocation: GeoPoint,
    competitors: CompetitorInfo[],
    radiusKm: number = 2
  ): {
    marketShare: number;
    competitorDensity: number;
    opportunities: string[];
    threats: string[];
  } {
    const nearbyCompetitors = this.findFeaturesWithinRadius(
      restaurantLocation,
      competitors.map(c => ({
        id: c.id,
        type: 'competitor' as const,
        location: c.location,
        properties: c
      })),
      radiusKm
    );
    
    const competitorDensity = nearbyCompetitors.length / (Math.PI * radiusKm * radiusKm);
    const estimatedMarketShare = Math.max(5, 100 / (nearbyCompetitors.length + 1));
    
    const opportunities: string[] = [];
    const threats: string[] = [];
    
    if (competitorDensity < 2) {
      opportunities.push("Low competitor density allows for market leadership");
    }
    
    if (nearbyCompetitors.length > 5) {
      threats.push("High competition may impact customer acquisition");
    }
    
    const highRatedCompetitors = competitors.filter(c => c.rating > 4.5);
    if (highRatedCompetitors.length > 2) {
      threats.push("Multiple high-rated competitors require excellence in execution");
    }
    
    return {
      marketShare: estimatedMarketShare,
      competitorDensity,
      opportunities,
      threats
    };
  }
}

// Export utility functions
export const calculateWalkingTime = (distanceKm: number): number => {
  const walkingSpeedKmh = 5; // Average walking speed
  return (distanceKm / walkingSpeedKmh) * 60; // Return minutes
};

export const calculateDrivingTime = (distanceKm: number): number => {
  const drivingSpeedKmh = 30; // Average city driving speed
  return (distanceKm / drivingSpeedKmh) * 60; // Return minutes
};

export const isWithinDeliveryRadius = (
  restaurantLocation: GeoPoint,
  customerLocation: GeoPoint,
  maxDeliveryTimeMinutes: number = 30
): boolean => {
  const distance = GeospatialAnalyzer.calculateDistance(restaurantLocation, customerLocation);
  const drivingTime = calculateDrivingTime(distance);
  return drivingTime <= maxDeliveryTimeMinutes;
};