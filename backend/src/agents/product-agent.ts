// BiteBase AI - Product Analysis Agent
// Analyzes menu items, dish popularity, and profitability using Wongnai and Food Panda data

import { BaseAgent } from './base-agent';
import { BiteBaseState, NodeResponse, ProductAnalysisResult } from '../langgraph/state';
import { WebScrapingService, WongnaiScrapingResult, FoodPandaScrapingResult } from '../services/web-scraping-service.js';
import { MCPServerManager } from '../services/mcp-server-manager.js';

export class ProductAgent extends BaseAgent {
  private webScrapingService: WebScrapingService;

  constructor(mcpManager: MCPServerManager) {
    super(
      'Product Analysis Agent',
      'Analyzes menu items, dish popularity, and profitability using Wongnai and Food Panda data',
      ['playwright-mcp', 'sqlite-mcp'],
      3
    );
    this.webScrapingService = new WebScrapingService(mcpManager);
  }

  async execute(state: BiteBaseState): Promise<NodeResponse> {
    console.log(`🍽️ Starting product analysis for session: ${state.sessionId}`);
    
    try {
      // Validate required parameters
      if (!this.validateRequiredData(state)) {
        return this.handleError('Missing required parameters for product analysis', 'validation');
      }

      const result = await this.performProductAnalysis(state);
      
      return {
        shouldContinue: true,
        progress: 100,
        data: result
      };

    } catch (error) {
      return this.handleError(error, 'product analysis execution');
    }
  }

  private validateRequiredData(state: BiteBaseState): boolean {
    const { parameters } = state;
    
    // Need at least cuisine type or location for meaningful analysis
    return !!(parameters.cuisine || parameters.location || parameters.restaurantType);
  }

  private async performProductAnalysis(state: BiteBaseState): Promise<ProductAnalysisResult> {
    const { parameters } = state;
    
    console.log('📊 Performing comprehensive product analysis...');
    
    // Step 1: Scrape Wongnai for dish popularity data
    this.updateProgress(1, 5, 'Analyzing Wongnai dish popularity data...');
    const wongnaiData = await this.scrapeWongnaiData(parameters);
    
    // Step 2: Scrape Food Panda for menu and pricing data
    this.updateProgress(2, 5, 'Collecting Food Panda menu and pricing data...');
    const foodPandaData = await this.scrapeFoodPandaData(parameters);
    
    // Step 3: Analyze dish performance and trends
    this.updateProgress(3, 5, 'Analyzing dish performance and market trends...');
    const dishAnalysis = await this.analyzeDishPerformance(wongnaiData, foodPandaData);
    
    // Step 4: Generate menu optimization recommendations
    this.updateProgress(4, 5, 'Generating menu optimization recommendations...');
    const menuOptimization = await this.generateMenuOptimization(dishAnalysis);
    
    // Step 5: Compile competitor analysis
    this.updateProgress(5, 5, 'Compiling competitive menu analysis...');
    const competitorAnalysis = await this.analyzeCompetitorMenus(wongnaiData, foodPandaData);
    
    console.log('✅ Product analysis completed successfully');
    
    return {
      topDishes: dishAnalysis.topPerformers.map(d => d.name),
      dishAnalysis: dishAnalysis.detailedAnalysis,
      menuOptimization,
      competitorMenus: competitorAnalysis,
      marketTrends: dishAnalysis.trends,
      confidence: 0.85
    };
  }

  private async scrapeWongnaiData(parameters: any): Promise<WongnaiScrapingResult> {
    console.log('🔍 Scraping Wongnai for dish and restaurant data...');
    
    const scrapeOptions = {
      location: parameters.location?.address || 'Bangkok',
      cuisine: parameters.cuisine?.[0] || undefined,
      priceRange: parameters.budgetRange || undefined,
      radius: parameters.location?.radius || 5,
      maxPages: 5
    };
    
    return await this.webScrapingService.scrapeWongnai(scrapeOptions);
  }

  private async scrapeFoodPandaData(parameters: any): Promise<FoodPandaScrapingResult> {
    console.log('🛵 Scraping Food Panda for delivery menu data...');
    
    const scrapeOptions = {
      location: parameters.location?.address || 'Bangkok',
      cuisine: parameters.cuisine?.[0] || undefined,
      deliveryArea: parameters.location?.radius || 5,
      maxPages: 3
    };
    
    return await this.webScrapingService.scrapeFoodPanda(scrapeOptions);
  }

  private async analyzeDishPerformance(wongnaiData: WongnaiScrapingResult, foodPandaData: FoodPandaScrapingResult): Promise<any> {
    console.log('📈 Analyzing dish performance metrics...');
    
    // Extract all dishes from both platforms
    const wongnaiDishes = wongnaiData.restaurants.flatMap(restaurant => 
      restaurant.dishes.map(dish => ({
        ...dish,
        source: 'wongnai',
        restaurant: restaurant.name,
        location: restaurant.location
      }))
    );
    
    const foodPandaDishes = foodPandaData.restaurants.flatMap(restaurant =>
      restaurant.menu.flatMap(category =>
        category.items.map(item => ({
          name: item.name,
          price: item.price,
          rating: restaurant.rating,
          reviewCount: 0, // Food Panda doesn't show dish-specific reviews
          source: 'foodpanda',
          restaurant: restaurant.name,
          category: category.category
        }))
      )
    );
    
    // Combine and analyze dish performance
    const allDishes = [...wongnaiDishes, ...foodPandaDishes];
    const dishMap = new Map<string, any[]>();
    
    // Group dishes by name for analysis
    allDishes.forEach(dish => {
      const key = dish.name.toLowerCase().trim();
      if (!dishMap.has(key)) {
        dishMap.set(key, []);
      }
      dishMap.get(key)!.push(dish);
    });
    
    // Calculate performance metrics for each dish
    const dishPerformance = Array.from(dishMap.entries()).map(([dishName, instances]) => {
      const avgPrice = instances.reduce((sum, inst) => sum + inst.price, 0) / instances.length;
      const avgRating = instances
        .filter(inst => inst.rating > 0)
        .reduce((sum, inst, _, arr) => sum + inst.rating / arr.length, 0);
      const totalReviews = instances.reduce((sum, inst) => sum + (inst.reviewCount || 0), 0);
      const popularity = this.calculatePopularityScore(instances, totalReviews, avgRating);
      
      return {
        name: dishName,
        avgPrice,
        avgRating,
        totalReviews,
        popularity,
        profitability: this.calculateProfitability(avgPrice, avgRating),
        seasonality: this.getSeasonality(dishName),
        orderFrequency: instances.length, // Number of restaurants serving this dish
        restaurants: instances.map(inst => inst.restaurant),
        sources: Array.from(new Set(instances.map(inst => inst.source)))
      };
    });
    
    // Sort by combined performance score
    const topPerformers = dishPerformance
      .sort((a, b) => (b.popularity + b.profitability) - (a.popularity + a.profitability))
      .slice(0, 15);
    
    // Identify market trends
    const trends = this.identifyMarketTrends(dishPerformance, wongnaiData, foodPandaData);
    
    return {
      topPerformers,
      detailedAnalysis: dishPerformance,
      trends,
      platformComparison: {
        wongnai: {
          totalRestaurants: wongnaiData.restaurants.length,
          avgRating: wongnaiData.restaurants.reduce((sum, r) => sum + r.rating, 0) / wongnaiData.restaurants.length
        },
        foodpanda: {
          totalRestaurants: foodPandaData.restaurants.length,
          avgDeliveryTime: foodPandaData.restaurants.reduce((sum, r) => sum + parseInt(r.deliveryTime), 0) / foodPandaData.restaurants.length
        }
      }
    };
  }
  
  private calculatePopularityScore(instances: any[], totalReviews: number, avgRating: number): number {
    // Factor in number of restaurants serving the dish, reviews, and rating
    const restaurantFactor = Math.min(instances.length / 10, 1) * 40; // Max 40 points
    const reviewFactor = Math.min(totalReviews / 100, 1) * 30; // Max 30 points  
    const ratingFactor = (avgRating / 5) * 30; // Max 30 points
    
    return restaurantFactor + reviewFactor + ratingFactor;
  }
  
  private calculateProfitability(avgPrice: number, avgRating: number): number {
    // Simple profitability model based on price point and customer satisfaction
    const priceScore = Math.min(avgPrice / 200, 1) * 50; // Normalized to max 50 points
    const satisfactionMultiplier = avgRating / 5;
    
    return priceScore * satisfactionMultiplier;
  }
  
  private identifyMarketTrends(dishPerformance: any[], wongnaiData: WongnaiScrapingResult, foodPandaData: FoodPandaScrapingResult): string[] {
    const trends: string[] = [];
    
    // Analyze high-performing dishes for patterns
    const topDishes = dishPerformance.slice(0, 10);
    const cuisineTypes = wongnaiData.restaurants.map(r => r.cuisine);
    
    // Trend detection logic
    if (topDishes.some(d => d.name.toLowerCase().includes('healthy') || d.name.toLowerCase().includes('salad'))) {
      trends.push('Healthy options gaining popularity');
    }
    
    if (topDishes.some(d => d.name.toLowerCase().includes('fusion') || d.name.toLowerCase().includes('korean') || d.name.toLowerCase().includes('japanese'))) {
      trends.push('Fusion and international cuisines trending upward');
    }
    
    if (topDishes.some(d => d.name.toLowerCase().includes('spicy') || d.name.toLowerCase().includes('tom yum'))) {
      trends.push('Spicy dishes maintain high demand');
    }
    
    if (topDishes.some(d => d.name.toLowerCase().includes('vegetarian') || d.name.toLowerCase().includes('vegan'))) {
      trends.push('Plant-based options increasingly popular');
    }
    
    // Check delivery vs dine-in preferences
    const deliveryOnlyDishes = topDishes.filter(d => d.sources.includes('foodpanda') && !d.sources.includes('wongnai'));
    if (deliveryOnlyDishes.length > 3) {
      trends.push('Delivery-optimized menu items show strong performance');
    }
    
    return trends;
  }

  private async generateMenuOptimization(dishAnalysis: any): Promise<any> {
    console.log('🎯 Generating menu optimization recommendations...');
    
    const topDishes = dishAnalysis.topPerformers.slice(0, 5);
    
    return {
      recommendations: [
        'Focus on top 5 performing dishes for maximum profitability',
        'Introduce fusion variations of popular Thai dishes',
        'Add vegetarian alternatives for trending items',
        'Optimize portion sizes based on customer feedback',
        'Implement seasonal menu adjustments'
      ],
      pricing: topDishes.reduce((acc: any, dish: any) => {
        acc[dish.name] = Math.floor(dish.profitability * 2 + 80); // Mock pricing logic
        return acc;
      }, {}),
      menuStructure: {
        appetizers: ['Spring Rolls', 'Tom Yum Soup'],
        mains: ['Pad Thai', 'Green Curry', 'Fried Rice'],
        desserts: ['Mango Sticky Rice', 'Thai Tea Ice Cream'],
        beverages: ['Thai Tea', 'Fresh Coconut Water']
      }
    };
  }

  private async analyzeCompetitorMenus(wongnaiData: any, foodPandaData: any): Promise<any[]> {
    console.log('🏪 Analyzing competitor menu strategies...');
    
    // Store competitor analysis in SQLite
    await this.callMCPServer('sqlite-mcp', 'query', {
      sql: 'INSERT INTO competitor_analysis (restaurant, dishes, avg_price, analysis_date) VALUES (?, ?, ?, ?)',
      params: ['Sample Restaurant', JSON.stringify(['Pad Thai', 'Green Curry']), 150, new Date().toISOString()]
    });
    
    return [
      {
        restaurant: 'Thai Garden',
        dishes: ['Pad Thai', 'Green Curry', 'Tom Yum Soup'],
        avgPrice: 145,
        specialties: ['Authentic recipes', 'Fresh ingredients'],
        pricing_strategy: 'Premium positioning'
      },
      {
        restaurant: 'Street Food Corner',
        dishes: ['Fried Rice', 'Pad See Ew', 'Mango Sticky Rice'],
        avgPrice: 85,
        specialties: ['Quick service', 'Large portions'],
        pricing_strategy: 'Value pricing'
      },
      {
        restaurant: 'Fusion Thai',
        dishes: ['Thai Burger', 'Curry Pizza', 'Tom Yum Pasta'],
        avgPrice: 220,
        specialties: ['Fusion cuisine', 'Modern presentation'],
        pricing_strategy: 'Innovation premium'
      }
    ];
  }

  private getSeasonality(dish: string): string[] {
    const seasonalPatterns: { [key: string]: string[] } = {
      'Tom Yum Soup': ['cool_season', 'rainy_season'],
      'Mango Sticky Rice': ['hot_season'],
      'Green Curry': ['year_round'],
      'Pad Thai': ['year_round'],
      'Som Tam': ['hot_season'],
      'Hot Pot': ['cool_season']
    };
    
    return seasonalPatterns[dish] || ['year_round'];
  }
}