// Restaurant Data Service - MCP-powered data collection and analysis
export interface Restaurant {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  cuisine: string[];
  priceRange: number; // 1-4 scale
  rating: number;
  reviewCount: number;
  deliveryAvailable: boolean;
  features: string[];
}

export interface MarketData {
  restaurants: Restaurant[];
  competitorDensity: number;
  avgPricing: number;
  popularCuisines: string[];
  marketSaturation: number;
}

export class RestaurantDataService {
  async getRestaurantsInArea(lat: number, lng: number, radius: number): Promise<Restaurant[]> {
    // Simulated data for development
    return [
      {
        id: '1',
        name: 'Thai Garden',
        location: { lat: lat + 0.001, lng: lng + 0.001, address: '123 Main St' },
        cuisine: ['Thai'],
        priceRange: 2,
        rating: 4.2,
        reviewCount: 156,
        deliveryAvailable: true,
        features: ['Outdoor Seating', 'Delivery']
      },
      {
        id: '2', 
        name: 'Sushi Express',
        location: { lat: lat - 0.001, lng: lng + 0.002, address: '456 Oak Ave' },
        cuisine: ['Japanese', 'Sushi'],
        priceRange: 3,
        rating: 4.5,
        reviewCount: 89,
        deliveryAvailable: true,
        features: ['Takeout', 'Delivery']
      }
    ];
  }

  async analyzeMarket(location: { lat: number; lng: number }, radius: number): Promise<MarketData> {
    const restaurants = await this.getRestaurantsInArea(location.lat, location.lng, radius);
    
    return {
      restaurants,
      competitorDensity: restaurants.length / (Math.PI * radius * radius),
      avgPricing: restaurants.reduce((sum, r) => sum + r.priceRange, 0) / restaurants.length,
      popularCuisines: ['Thai', 'Japanese', 'Italian'],
      marketSaturation: 0.65
    };
  }
}

export const restaurantDataService = new RestaurantDataService();