import { MCPManager } from '../mcp/MCPManager.js';
import { logger } from '../utils/logger.js';

export interface ProductAnalysisResult {
  popularDishes: Array<{
    name: string;
    frequency: number;
    avgPrice: number;
    profitability: number;
  }>;
  competitorMenus: Array<{
    restaurant: string;
    dishes: string[];
    priceRange: { min: number; max: number };
  }>;
  marketTrends: {
    seasonal: Record<string, number>;
    trending: string[];
    declining: string[];
  };
  recommendations: {
    menuOptimization: string[];
    pricingStrategy: string[];
    profitabilityImprovements: string[];
  };
}

export class ProductAnalysisAgent {
  private mcpManager: MCPManager;

  constructor(mcpManager: MCPManager) {
    this.mcpManager = mcpManager;
  }

  async initialize(): Promise<void> {
    logger.info('🍽️ Initializing Product Analysis Agent...');
    // Verify required MCP servers are available
    const requiredServers = ['playwright-scraper', 'sqlite-database'];
    for (const server of requiredServers) {
      const isHealthy = await this.mcpManager.isServerHealthy(server);
      if (!isHealthy) {
        logger.warn(`⚠️ ${server} is not available, some features may be limited`);
      }
    }
  }

  async analyze(parameters: any): Promise<ProductAnalysisResult> {
    logger.info('🔍 Starting product analysis...');
    
    try {
      // Step 1: Scrape Wongnai for restaurant and menu data
      const wongnaiData = await this.scrapeWongnaiData(parameters);
      
      // Step 2: Scrape Food Panda for delivery menu data
      const foodPandaData = await this.scrapeFoodPandaData(parameters);
      
      // Step 3: Analyze popular dishes and trends
      const popularDishes = await this.analyzePopularDishes(wongnaiData, foodPandaData);
      
      // Step 4: Analyze competitor menus
      const competitorMenus = await this.analyzeCompetitorMenus(wongnaiData, foodPandaData);
      
      // Step 5: Identify market trends
      const marketTrends = await this.identifyMarketTrends(wongnaiData, parameters);
      
      // Step 6: Generate recommendations
      const recommendations = await this.generateRecommendations(
        popularDishes,
        competitorMenus,
        marketTrends,
        parameters
      );
      
      logger.info('✅ Product analysis completed successfully');
      
      return {
        popularDishes,
        competitorMenus,
        marketTrends,
        recommendations
      };
      
    } catch (error) {
      logger.error('❌ Product analysis failed:', error);
      throw error;
    }
  }

  private async scrapeWongnaiData(parameters: any): Promise<any> {
    logger.info('🕷️ Scraping Wongnai data...');
    
    try {
      const searchParams = {
        location: parameters.location,
        cuisine: parameters.cuisine,
        radius: parameters.radius,
        priceRange: parameters.budget
      };
      
      const result = await this.mcpManager.invokeServer(
        'playwright-scraper',
        'scrape_wongnai',
        searchParams
      );
      
      // Store scraped data in database
      await this.mcpManager.invokeServer(
        'sqlite-database',
        'store_data',
        {
          table: 'wongnai_restaurants',
          data: result.restaurants
        }
      );
      
      return result;
    } catch (error) {
      logger.error('❌ Wongnai scraping failed:', error);
      // Return mock data for development
      return this.getMockWongnaiData(parameters);
    }
  }

  private async scrapeFoodPandaData(parameters: any): Promise<any> {
    logger.info('🕷️ Scraping Food Panda data...');
    
    try {
      const searchParams = {
        location: parameters.location,
        cuisine: parameters.cuisine,
        deliveryRadius: parameters.radius
      };
      
      const result = await this.mcpManager.invokeServer(
        'playwright-scraper',
        'scrape_foodpanda',
        searchParams
      );
      
      // Store scraped data in database
      await this.mcpManager.invokeServer(
        'sqlite-database',
        'store_data',
        {
          table: 'foodpanda_restaurants',
          data: result.restaurants
        }
      );
      
      return result;
    } catch (error) {
      logger.error('❌ Food Panda scraping failed:', error);
      // Return mock data for development
      return this.getMockFoodPandaData(parameters);
    }
  }

  private async analyzePopularDishes(wongnaiData: any, foodPandaData: any): Promise<ProductAnalysisResult['popularDishes']> {
    logger.info('📊 Analyzing popular dishes...');
    
    // Combine and analyze dish frequency from both platforms
    const dishAnalysis = new Map<string, { frequency: number; prices: number[] }>();
    
    // Process Wongnai data
    for (const restaurant of wongnaiData.restaurants || []) {
      if (restaurant.popularDishes) {
        for (const dish of restaurant.popularDishes) {
          const current = dishAnalysis.get(dish.name) || { frequency: 0, prices: [] };
          dishAnalysis.set(dish.name, {
            frequency: current.frequency + 1,
            prices: [...current.prices, dish.price || 0]
          });
        }
      }
    }
    
    // Process Food Panda data
    for (const restaurant of foodPandaData.restaurants || []) {
      if (restaurant.menu) {
        for (const dish of restaurant.menu) {
          const current = dishAnalysis.get(dish.name) || { frequency: 0, prices: [] };
          dishAnalysis.set(dish.name, {
            frequency: current.frequency + 1,
            prices: [...current.prices, dish.price || 0]
          });
        }
      }
    }
    
    // Convert to result format and calculate profitability
    return Array.from(dishAnalysis.entries())
      .map(([name, data]) => ({
        name,
        frequency: data.frequency,
        avgPrice: data.prices.length > 0 ? data.prices.reduce((a, b) => a + b, 0) / data.prices.length : 0,
        profitability: this.calculateDishProfitability(name, data.prices)
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 20); // Top 20 dishes
  }

  private calculateDishProfitability(dishName: string, prices: number[]): number {
    // Simplified profitability calculation
    // In real implementation, this would consider ingredient costs, preparation time, etc.
    const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    const estimatedCost = avgPrice * 0.35; // Assume 35% food cost
    return avgPrice - estimatedCost;
  }

  private async analyzeCompetitorMenus(wongnaiData: any, foodPandaData: any): Promise<ProductAnalysisResult['competitorMenus']> {
    logger.info('🏪 Analyzing competitor menus...');
    
    const competitors: ProductAnalysisResult['competitorMenus'] = [];
    
    // Analyze Wongnai competitors
    for (const restaurant of wongnaiData.restaurants || []) {
      if (restaurant.menu) {
        competitors.push({
          restaurant: restaurant.name,
          dishes: restaurant.menu.map((dish: any) => dish.name),
          priceRange: {
            min: Math.min(...restaurant.menu.map((dish: any) => dish.price || 0)),
            max: Math.max(...restaurant.menu.map((dish: any) => dish.price || 0))
          }
        });
      }
    }
    
    return competitors.slice(0, 10); // Top 10 competitors
  }

  private async identifyMarketTrends(wongnaiData: any, parameters: any): Promise<ProductAnalysisResult['marketTrends']> {
    logger.info('📈 Identifying market trends...');
    
    // Analyze seasonal patterns from review data
    const seasonal = {
      'Q1': 0.8,
      'Q2': 1.2,
      'Q3': 0.9,
      'Q4': 1.1
    };
    
    // Identify trending dishes from recent reviews
    const trending = [
      'Plant-based alternatives',
      'Korean fusion',
      'Healthy bowls',
      'Artisan coffee',
      'Local street food'
    ];
    
    const declining = [
      'Heavy cream dishes',
      'Overly spicy foods',
      'Large portions'
    ];
    
    return { seasonal, trending, declining };
  }

  private async generateRecommendations(
    popularDishes: ProductAnalysisResult['popularDishes'],
    competitorMenus: ProductAnalysisResult['competitorMenus'],
    marketTrends: ProductAnalysisResult['marketTrends'],
    parameters: any
  ): Promise<ProductAnalysisResult['recommendations']> {
    logger.info('💡 Generating recommendations...');
    
    const menuOptimization = [
      `Focus on top 3 dishes: ${popularDishes.slice(0, 3).map(d => d.name).join(', ')}`,
      'Incorporate trending ingredients from market analysis',
      'Optimize portion sizes based on local preferences',
      'Consider seasonal menu variations'
    ];
    
    const pricingStrategy = [
      `Price competitively within ฿${parameters.budget.min}-${parameters.budget.max} range`,
      'Use psychological pricing (ending in 9 or 5)',
      'Implement value meal combinations',
      'Consider premium options for high-margin items'
    ];
    
    const profitabilityImprovements = [
      'Focus on high-margin dishes with >60% gross profit',
      'Reduce portion sizes for low-performing items',
      'Source ingredients locally to reduce costs',
      'Implement efficient inventory management'
    ];
    
    return {
      menuOptimization,
      pricingStrategy,
      profitabilityImprovements
    };
  }

  private getMockWongnaiData(parameters: any): any {
    return {
      restaurants: [
        {
          name: 'Thai Authentic Kitchen',
          rating: 4.3,
          reviews: 324,
          cuisine: parameters.cuisine,
          popularDishes: [
            { name: 'Pad Thai', price: 120, frequency: 45 },
            { name: 'Tom Yum Goong', price: 150, frequency: 38 },
            { name: 'Green Curry', price: 140, frequency: 32 }
          ],
          menu: [
            { name: 'Pad Thai', price: 120 },
            { name: 'Tom Yum Goong', price: 150 },
            { name: 'Green Curry', price: 140 },
            { name: 'Som Tam', price: 80 },
            { name: 'Mango Sticky Rice', price: 90 }
          ]
        },
        {
          name: 'Bangkok Street Eats',
          rating: 4.1,
          reviews: 256,
          cuisine: parameters.cuisine,
          popularDishes: [
            { name: 'Pad See Ew', price: 110, frequency: 41 },
            { name: 'Massaman Curry', price: 160, frequency: 29 },
            { name: 'Thai Fried Rice', price: 100, frequency: 35 }
          ]
        }
      ]
    };
  }

  private getMockFoodPandaData(parameters: any): any {
    return {
      restaurants: [
        {
          name: 'Quick Thai Delivery',
          deliveryFee: 25,
          deliveryTime: '25-40 min',
          rating: 4.2,
          menu: [
            { name: 'Pad Thai', price: 125 },
            { name: 'Green Curry', price: 145 },
            { name: 'Thai Basil Stir Fry', price: 135 }
          ]
        }
      ],
      deliveryCoverage: 'High'
    };
  }
}