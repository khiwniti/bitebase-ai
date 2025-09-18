import { GeoPoint, CompetitorInfo } from '@/lib/geospatial-analysis';
import { getConfig, UserMessages } from '@/config/production';

// Data types for external restaurant API
export interface ExternalRestaurantData {
  publicId: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  reviewCount: number;
  priceLevel: number;
  categories: string[];
  openingHours?: {
    [key: string]: string;
  };
  photos?: string[];
  contactInfo?: {
    phone?: string;
    website?: string;
  };
}

export interface ExternalMenuData {
  restaurantId: string;
  categories: MenuCategory[];
  totalItems: number;
  averagePrice: number;
  popularItems: MenuItem[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  isPopular?: boolean;
  imageUrl?: string;
  allergens?: string[];
  nutritionInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

// Normalized internal data types
export interface Restaurant {
  id: string;
  name: string;
  address: string;
  location: GeoPoint;
  rating: number;
  reviewCount: number;
  priceRange: '$$' | '$$$' | '$$$$';
  cuisineType: string[];
  openingHours: string;
  photos: string[];
  contact: {
    phone?: string;
    website?: string;
  };
  businessMetrics: {
    footTraffic: 'low' | 'medium' | 'high';
    marketShare?: number;
    competitiveScore: number;
  };
}

export interface RestaurantMenu {
  restaurantId: string;
  categories: MenuCategory[];
  analytics: {
    totalItems: number;
    averagePrice: number;
    priceRange: { min: number; max: number };
    popularCategories: string[];
    recommendedItems: MenuItem[];
  };
}

// Restaurant data service class
export class RestaurantDataService {
  private config = getConfig();
  private static readonly BASE_URL = getConfig().dataServices.restaurantAPI.baseUrl;
  private static readonly CACHE_DURATION = getConfig().dataServices.restaurantAPI.cacheTimeout;
  private cache = new Map<string, { data: any; timestamp: number }>();

  // Fetch restaurants from external API
  async fetchRestaurants(params: {
    location?: GeoPoint;
    radius?: number; // in km
    cuisine?: string;
    priceLevel?: number;
    limit?: number;
  } = {}): Promise<Restaurant[]> {
    const cacheKey = `restaurants-${JSON.stringify(params)}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      if (params.location) {
        queryParams.append('lat', params.location.lat.toString());
        queryParams.append('lng', params.location.lng.toString());
      }
      if (params.radius) {
        queryParams.append('radius', params.radius.toString());
      }
      if (params.cuisine) {
        queryParams.append('category', params.cuisine);
      }
      if (params.limit) {
        queryParams.append('limit', params.limit.toString());
      }

      const response = await fetch(`${RestaurantDataService.BASE_URL}/businesses?${queryParams}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const restaurants = this.transformRestaurantData(data.businesses || data.results || []);
      
      this.setCachedData(cacheKey, restaurants);
      return restaurants;

    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
      // Return fallback data if API fails
      return this.getFallbackRestaurants(params);
    }
  }

  // Fetch menu data for specific restaurant
  async fetchRestaurantMenu(publicId: string): Promise<RestaurantMenu | null> {
    const cacheKey = `menu-${publicId}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${RestaurantDataService.BASE_URL}/restaurants/${publicId}/delivery-menu`);
      if (!response.ok) {
        throw new Error(`Menu API request failed: ${response.status}`);
      }

      const data = await response.json();
      const menu = this.transformMenuData(publicId, data);
      
      this.setCachedData(cacheKey, menu);
      return menu;

    } catch (error) {
      console.error('Failed to fetch menu:', error);
      return this.getFallbackMenu(publicId);
    }
  }

  // Search restaurants by query
  async searchRestaurants(query: string, location?: GeoPoint): Promise<Restaurant[]> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('q', query);
      if (location) {
        queryParams.append('lat', location.lat.toString());
        queryParams.append('lng', location.lng.toString());
      }

      const response = await fetch(`${RestaurantDataService.BASE_URL}/businesses?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Search API request failed: ${response.status}`);
      }

      const data = await response.json();
      return this.transformRestaurantData(data.businesses || data.results || []);

    } catch (error) {
      console.error('Failed to search restaurants:', error);
      return [];
    }
  }

  // Transform external API data to internal format
  private transformRestaurantData(externalData: any[]): Restaurant[] {
    return externalData.map((item: any) => {
      const restaurant: Restaurant = {
        id: item.publicId || item.id || Math.random().toString(36),
        name: item.name || 'Unknown Restaurant',
        address: item.address || item.location?.address || 'Address not available',
        location: {
          lat: item.location?.latitude || item.lat || 0,
          lng: item.location?.longitude || item.lng || 0
        },
        rating: item.rating || item.averageRating || 0,
        reviewCount: item.reviewCount || item.totalReviews || 0,
        priceRange: this.mapPriceLevel(item.priceLevel || item.price_level || 2),
        cuisineType: this.extractCuisineTypes(item.categories || item.cuisine || []),
        openingHours: this.formatOpeningHours(item.openingHours || item.hours),
        photos: item.photos?.map((p: any) => p.url || p) || [],
        contact: {
          phone: item.phone || item.contactInfo?.phone,
          website: item.website || item.contactInfo?.website
        },
        businessMetrics: {
          footTraffic: this.calculateFootTraffic(item.rating, item.reviewCount),
          competitiveScore: this.calculateCompetitiveScore(item)
        }
      };

      return restaurant;
    });
  }

  // Transform menu data
  private transformMenuData(restaurantId: string, externalData: any): RestaurantMenu {
    const categories = this.transformMenuCategories(externalData.categories || externalData.menu || []);
    const analytics = this.calculateMenuAnalytics(categories);

    return {
      restaurantId,
      categories,
      analytics
    };
  }

  private transformMenuCategories(externalCategories: any[]): MenuCategory[] {
    return externalCategories.map((cat: any) => ({
      id: cat.id || Math.random().toString(36),
      name: cat.name || cat.title || 'Category',
      items: (cat.items || cat.dishes || []).map((item: any) => ({
        id: item.id || Math.random().toString(36),
        name: item.name || item.title || 'Item',
        description: item.description || '',
        price: this.parsePrice(item.price || item.cost || 0),
        category: cat.name || 'General',
        isPopular: item.isPopular || item.recommended || false,
        imageUrl: item.image || item.photo || '',
        allergens: item.allergens || [],
        nutritionInfo: item.nutrition || {}
      }))
    }));
  }

  private calculateMenuAnalytics(categories: MenuCategory[]) {
    const allItems = categories.flatMap(cat => cat.items);
    const prices = allItems.map(item => item.price).filter(p => p > 0);
    
    return {
      totalItems: allItems.length,
      averagePrice: prices.length > 0 ? prices.reduce((a, b) => a + b) / prices.length : 0,
      priceRange: {
        min: prices.length > 0 ? Math.min(...prices) : 0,
        max: prices.length > 0 ? Math.max(...prices) : 0
      },
      popularCategories: categories
        .filter(cat => cat.items.some(item => item.isPopular))
        .map(cat => cat.name),
      recommendedItems: allItems.filter(item => item.isPopular).slice(0, 5)
    };
  }

  // Helper methods
  private mapPriceLevel(level: number): '$$' | '$$$' | '$$$$' {
    if (level <= 1) return '$$';
    if (level <= 2) return '$$$';
    return '$$$$';
  }

  private extractCuisineTypes(categories: any[]): string[] {
    if (Array.isArray(categories)) {
      return categories.map(cat => typeof cat === 'string' ? cat : cat.name || cat.title || '').filter(Boolean);
    }
    return [];
  }

  private formatOpeningHours(hours: any): string {
    if (!hours) return 'Hours not available';
    if (typeof hours === 'string') return hours;
    
    // Format structured hours data
    const today = new Date().getDay();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayHours = hours[days[today]];
    
    return todayHours || 'Hours not available';
  }

  private calculateFootTraffic(rating: number, reviewCount: number): 'low' | 'medium' | 'high' {
    const score = (rating * 0.7) + (Math.log(reviewCount + 1) * 0.3);
    if (score > 4.0) return 'high';
    if (score > 3.0) return 'medium';
    return 'low';
  }

  private calculateCompetitiveScore(item: any): number {
    const rating = item.rating || 0;
    const reviewCount = item.reviewCount || 0;
    const priceLevel = item.priceLevel || 2;
    
    // Weighted scoring algorithm
    const ratingScore = (rating / 5) * 40;
    const popularityScore = Math.min((reviewCount / 100) * 30, 30);
    const priceScore = (4 - priceLevel) * 10; // Lower price = higher score
    const baseScore = 20;
    
    return Math.round(ratingScore + popularityScore + priceScore + baseScore);
  }

  private parsePrice(priceString: any): number {
    if (typeof priceString === 'number') return priceString;
    if (typeof priceString === 'string') {
      const match = priceString.match(/[\d,]+/);
      return match ? parseInt(match[0].replace(',', '')) : 0;
    }
    return 0;
  }

  // Cache management
  private getCachedData(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < RestaurantDataService.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Fallback data for when API fails
  private getFallbackRestaurants(params: any): Restaurant[] {
    return [
      {
        id: 'fallback-1',
        name: 'Restaurant Data Unavailable',
        address: 'Please check your connection',
        location: params.location || { lat: 0, lng: 0 },
        rating: 0,
        reviewCount: 0,
        priceRange: '$$',
        cuisineType: ['General'],
        openingHours: 'Hours not available',
        photos: [],
        contact: {},
        businessMetrics: {
          footTraffic: 'medium',
          competitiveScore: 50
        }
      }
    ];
  }

  private getFallbackMenu(restaurantId: string): RestaurantMenu {
    return {
      restaurantId,
      categories: [
        {
          id: 'fallback-cat',
          name: 'Menu Data Unavailable',
          items: [
            {
              id: 'fallback-item',
              name: 'Menu information not available',
              description: 'Please check your connection',
              price: 0,
              category: 'General'
            }
          ]
        }
      ],
      analytics: {
        totalItems: 0,
        averagePrice: 0,
        priceRange: { min: 0, max: 0 },
        popularCategories: [],
        recommendedItems: []
      }
    };
  }

  // Convert restaurants to competitor format for geospatial analysis
  toCompetitorInfo(restaurants: Restaurant[]): CompetitorInfo[] {
    return restaurants.map(restaurant => ({
      id: restaurant.id,
      name: restaurant.name,
      category: restaurant.cuisineType[0] || 'Restaurant',
      rating: restaurant.rating,
      priceRange: restaurant.priceRange,
      location: restaurant.location,
      distance: 0, // Will be calculated by geospatial analyzer
      marketShare: restaurant.businessMetrics.marketShare
    }));
  }
}

// Singleton instance
export const restaurantDataService = new RestaurantDataService();