/**
 * Web Scraping Service
 * Handles web scraping operations using Playwright MCP server
 */

import { MCPServerManager } from './mcp-server-manager.js';
import { v4 as uuidv4 } from 'uuid';

export interface ScrapingParams {
  url: string;
  waitFor?: string; // CSS selector to wait for
  timeout?: number;
  extractData?: {
    selectors: Record<string, string>;
    attributes?: string[];
  };
  pagination?: {
    nextButtonSelector: string;
    maxPages: number;
  };
}

export interface ScrapedData {
  url: string;
  title?: string;
  data: Record<string, any>;
  timestamp: string;
  success: boolean;
  error?: string;
}

export interface WongnaiScrapingResult {
  restaurants: Array<{
    name: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    cuisine: string;
    location: string;
    dishes: Array<{
      name: string;
      price: number;
      rating: number;
      reviewCount: number;
    }>;
    reviews: Array<{
      rating: number;
      text: string;
      date: string;
      helpful: number;
    }>;
  }>;
}

export interface FoodPandaScrapingResult {
  restaurants: Array<{
    name: string;
    rating: number;
    deliveryTime: string;
    deliveryFee: number;
    minimumOrder: number;
    cuisine: string[];
    location: string;
    menu: Array<{
      category: string;
      items: Array<{
        name: string;
        price: number;
        description: string;
        image?: string;
      }>;
    }>;
  }>;
}

export class WebScrapingService {
  private mcpManager: MCPServerManager;

  constructor(mcpManager: MCPServerManager) {
    this.mcpManager = mcpManager;
  }

  /**
   * Generic web scraping method
   */
  async scrapeWebsite(params: ScrapingParams): Promise<ScrapedData> {
    if (!this.mcpManager.isServerRunning('playwright')) {
      throw new Error('Playwright MCP server is not running');
    }

    const messageId = uuidv4();
    
    try {
      const result = await this.mcpManager.sendMessage('playwright', {
        id: messageId,
        method: 'scrape_page',
        params: {
          url: params.url,
          wait_for: params.waitFor,
          timeout: params.timeout || 30000,
          extract_data: params.extractData,
          pagination: params.pagination
        }
      });

      return {
        url: params.url,
        data: result,
        timestamp: new Date().toISOString(),
        success: true
      };
    } catch (error) {
      console.error(`Scraping failed for ${params.url}:`, error);
      return {
        url: params.url,
        data: {},
        timestamp: new Date().toISOString(),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Scrape Wongnai restaurant data
   */
  async scrapeWongnai(options: {
    location: string;
    cuisine?: string;
    priceRange?: string;
    radius?: number;
    maxPages?: number;
  }): Promise<WongnaiScrapingResult> {
    console.log('🍽️ Scraping Wongnai data...');
    
    const baseUrl = 'https://www.wongnai.com/restaurants';
    const searchParams = new URLSearchParams({
      q: options.location,
      ...(options.cuisine && { cuisine: options.cuisine }),
      ...(options.priceRange && { price: options.priceRange })
    });

    const scrapingParams: ScrapingParams = {
      url: `${baseUrl}?${searchParams.toString()}`,
      waitFor: '.restaurant-item, .shop-card',
      timeout: 45000,
      extractData: {
        selectors: {
          'restaurants': '.restaurant-item, .shop-card',
          'restaurant_name': '.shop-name, .restaurant-name',
          'rating': '.rating-score, .star-rating',
          'review_count': '.review-count',
          'price_range': '.price-range, .price-level',
          'cuisine_type': '.cuisine-type, .category',
          'location': '.address, .location',
          'dishes': '.menu-item, .dish-item',
          'dish_name': '.dish-name, .menu-item-name',
          'dish_price': '.price, .dish-price',
          'reviews': '.review-item, .comment',
          'review_text': '.review-content, .comment-text',
          'review_rating': '.review-rating, .comment-rating'
        }
      },
      pagination: {
        nextButtonSelector: '.pagination .next, .load-more',
        maxPages: options.maxPages || 5
      }
    };

    const result = await this.scrapeWebsite(scrapingParams);
    
    if (!result.success) {
      throw new Error(`Wongnai scraping failed: ${result.error}`);
    }

    // Transform raw data into structured format
    return this.transformWongnaiData(result.data);
  }

  /**
   * Scrape Food Panda restaurant data
   */
  async scrapeFoodPanda(options: {
    location: string;
    cuisine?: string;
    deliveryArea?: string;
    maxPages?: number;
  }): Promise<FoodPandaScrapingResult> {
    console.log('🛵 Scraping Food Panda data...');
    
    const baseUrl = 'https://www.foodpanda.co.th/restaurants';
    const searchParams = new URLSearchParams({
      address: options.location,
      ...(options.cuisine && { cuisine: options.cuisine })
    });

    const scrapingParams: ScrapingParams = {
      url: `${baseUrl}?${searchParams.toString()}`,
      waitFor: '.restaurant-card, .vendor-card',
      timeout: 45000,
      extractData: {
        selectors: {
          'restaurants': '.restaurant-card, .vendor-card',
          'restaurant_name': '.vendor-name, .restaurant-name',
          'rating': '.rating, .vendor-rating',
          'delivery_time': '.delivery-time, .eta',
          'delivery_fee': '.delivery-fee',
          'minimum_order': '.minimum-order',
          'cuisine_tags': '.cuisine-tag, .category-tag',
          'menu_categories': '.menu-category',
          'menu_items': '.menu-item, .product-card',
          'item_name': '.product-name, .item-name',
          'item_price': '.product-price, .item-price',
          'item_description': '.product-description, .item-description'
        }
      },
      pagination: {
        nextButtonSelector: '.pagination .next, .load-more-restaurants',
        maxPages: options.maxPages || 3
      }
    };

    const result = await this.scrapeWebsite(scrapingParams);
    
    if (!result.success) {
      throw new Error(`Food Panda scraping failed: ${result.error}`);
    }

    // Transform raw data into structured format
    return this.transformFoodPandaData(result.data);
  }

  /**
   * Scrape DDProperty rental data
   */
  async scrapeDDProperty(options: {
    location: string;
    propertyType?: 'shophouse' | 'commercial' | 'office';
    priceRange?: { min: number; max: number };
    size?: { min: number; max: number };
  }) {
    console.log('🏢 Scraping DDProperty data...');
    
    const baseUrl = 'https://www.ddproperty.com/en/commercial-for-rent';
    const searchParams = new URLSearchParams({
      q: options.location,
      ...(options.propertyType && { type: options.propertyType }),
      ...(options.priceRange && { 
        'price-min': options.priceRange.min.toString(),
        'price-max': options.priceRange.max.toString()
      })
    });

    const scrapingParams: ScrapingParams = {
      url: `${baseUrl}?${searchParams.toString()}`,
      waitFor: '.property-card, .listing-card',
      timeout: 45000,
      extractData: {
        selectors: {
          'properties': '.property-card, .listing-card',
          'property_title': '.property-title, .listing-title',
          'price': '.price, .rental-price',
          'size': '.size, .area',
          'location': '.location, .address',
          'property_type': '.property-type, .type',
          'amenities': '.amenity, .feature',
          'description': '.description, .details'
        }
      }
    };

    return await this.scrapeWebsite(scrapingParams);
  }

  /**
   * Scrape RentHub rental data
   */
  async scrapeRentHub(options: {
    location: string;
    propertyType?: string;
    priceRange?: { min: number; max: number };
  }) {
    console.log('🏠 Scraping RentHub data...');
    
    const baseUrl = 'https://www.renthub.in.th/en/property-for-rent';
    const searchParams = new URLSearchParams({
      location: options.location,
      ...(options.propertyType && { type: options.propertyType })
    });

    const scrapingParams: ScrapingParams = {
      url: `${baseUrl}?${searchParams.toString()}`,
      waitFor: '.property-item, .listing-item',
      timeout: 45000,
      extractData: {
        selectors: {
          'properties': '.property-item, .listing-item',
          'title': '.property-title, .listing-title',
          'price': '.price, .rent-price',
          'size': '.size, .area',
          'location': '.location, .district',
          'type': '.property-type',
          'facilities': '.facility, .amenity'
        }
      }
    };

    return await this.scrapeWebsite(scrapingParams);
  }

  /**
   * Batch scrape multiple sources
   */
  async batchScrape(sources: Array<{
    type: 'wongnai' | 'foodpanda' | 'ddproperty' | 'renthub';
    options: any;
  }>) {
    console.log('🔄 Starting batch scraping...');
    
    const results = await Promise.allSettled(
      sources.map(async (source) => {
        switch (source.type) {
          case 'wongnai':
            return { type: 'wongnai', data: await this.scrapeWongnai(source.options) };
          case 'foodpanda':
            return { type: 'foodpanda', data: await this.scrapeFoodPanda(source.options) };
          case 'ddproperty':
            return { type: 'ddproperty', data: await this.scrapeDDProperty(source.options) };
          case 'renthub':
            return { type: 'renthub', data: await this.scrapeRentHub(source.options) };
          default:
            throw new Error(`Unknown source type: ${source.type}`);
        }
      })
    );

    return results.map((result, index) => ({
      source: sources[index].type,
      status: result.status,
      data: result.status === 'fulfilled' ? result.value.data : null,
      error: result.status === 'rejected' ? result.reason.message : null
    }));
  }

  /**
   * Transform raw Wongnai data into structured format
   */
  private transformWongnaiData(rawData: any): WongnaiScrapingResult {
    // This is a simplified transformation - in real implementation,
    // this would parse the actual scraped HTML/data structure
    return {
      restaurants: rawData.restaurants?.map((restaurant: any) => ({
        name: restaurant.name || '',
        rating: parseFloat(restaurant.rating) || 0,
        reviewCount: parseInt(restaurant.review_count) || 0,
        priceRange: restaurant.price_range || '',
        cuisine: restaurant.cuisine_type || '',
        location: restaurant.location || '',
        dishes: restaurant.dishes?.map((dish: any) => ({
          name: dish.name || '',
          price: parseFloat(dish.price) || 0,
          rating: parseFloat(dish.rating) || 0,
          reviewCount: parseInt(dish.review_count) || 0
        })) || [],
        reviews: restaurant.reviews?.map((review: any) => ({
          rating: parseFloat(review.rating) || 0,
          text: review.text || '',
          date: review.date || '',
          helpful: parseInt(review.helpful) || 0
        })) || []
      })) || []
    };
  }

  /**
   * Transform raw Food Panda data into structured format
   */
  private transformFoodPandaData(rawData: any): FoodPandaScrapingResult {
    // This is a simplified transformation - in real implementation,
    // this would parse the actual scraped HTML/data structure
    return {
      restaurants: rawData.restaurants?.map((restaurant: any) => ({
        name: restaurant.name || '',
        rating: parseFloat(restaurant.rating) || 0,
        deliveryTime: restaurant.delivery_time || '',
        deliveryFee: parseFloat(restaurant.delivery_fee) || 0,
        minimumOrder: parseFloat(restaurant.minimum_order) || 0,
        cuisine: restaurant.cuisine_tags || [],
        location: restaurant.location || '',
        menu: restaurant.menu_categories?.map((category: any) => ({
          category: category.name || '',
          items: category.items?.map((item: any) => ({
            name: item.name || '',
            price: parseFloat(item.price) || 0,
            description: item.description || '',
            image: item.image || ''
          })) || []
        })) || []
      })) || []
    };
  }

  /**
   * Get scraping statistics
   */
  getScrapingStats() {
    return {
      playwrightStatus: this.mcpManager.getServerStatus('playwright'),
      isReady: this.mcpManager.isServerRunning('playwright'),
      capabilities: [
        'wongnai_scraping',
        'foodpanda_scraping',
        'ddproperty_scraping',
        'renthub_scraping',
        'batch_scraping',
        'dynamic_content_handling'
      ]
    };
  }
}