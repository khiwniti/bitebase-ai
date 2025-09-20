import { MCPManager } from '../mcp/MCPManager.js';
import { logger } from '../utils/logger.js';

export interface PriceAnalysisResult {
  marketPricing: {
    competitors: Record<string, { min: number; max: number; avg: number }>;
    pricePositioning: 'budget' | 'mid-range' | 'premium';
    elasticity: number;
  };
  financialProjections: {
    revenue: {
      monthly: number[];
      annually: number;
      peakSeasons: string[];
    };
    costs: {
      fixed: number;
      variable: number;
      labor: number;
      ingredients: number;
    };
    profitability: {
      grossMargin: number;
      netMargin: number;
      breakEvenPoint: number;
      roi: number;
    };
  };
  recommendations: {
    optimalPricing: Record<string, number>;
    menuEngineering: string[];
    costOptimization: string[];
    revenueStrategies: string[];
  };
}

export class PriceAnalysisAgent {
  private mcpManager: MCPManager;

  constructor(mcpManager: MCPManager) {
    this.mcpManager = mcpManager;
  }

  async initialize(): Promise<void> {
    logger.info('💰 Initializing Price Analysis Agent...');
    // Verify required MCP servers are available
    const requiredServers = ['finance-tools', 'sqlite-database'];
    for (const server of requiredServers) {
      const isHealthy = await this.mcpManager.isServerHealthy(server);
      if (!isHealthy) {
        logger.warn(`⚠️ ${server} is not available, some features may be limited`);
      }
    }
  }

  async analyze(parameters: any, productData?: any): Promise<PriceAnalysisResult> {
    logger.info('🔍 Starting price analysis...');
    
    try {
      // Step 1: Analyze market pricing from competitor data
      const marketPricing = await this.analyzeMarketPricing(parameters, productData);
      
      // Step 2: Calculate financial projections
      const financialProjections = await this.calculateFinancialProjections(parameters, marketPricing);
      
      // Step 3: Generate pricing recommendations
      const recommendations = await this.generatePricingRecommendations(
        parameters,
        marketPricing,
        financialProjections,
        productData
      );
      
      logger.info('✅ Price analysis completed successfully');
      
      return {
        marketPricing,
        financialProjections,
        recommendations
      };
      
    } catch (error) {
      logger.error('❌ Price analysis failed:', error);
      throw error;
    }
  }

  private async analyzeMarketPricing(parameters: any, productData?: any): Promise<PriceAnalysisResult['marketPricing']> {
    logger.info('📊 Analyzing market pricing...');
    
    try {
      // Use finance tools MCP for market analysis
      const marketData = await this.mcpManager.invokeServer(
        'finance-tools',
        'analyze_market_pricing',
        {
          location: parameters.location,
          cuisine: parameters.cuisine,
          competitors: productData?.competitorMenus || []
        }
      );
      
      // Analyze competitor pricing from product data
      const competitors: Record<string, { min: number; max: number; avg: number }> = {};
      
      if (productData?.competitorMenus) {
        for (const competitor of productData.competitorMenus) {
          const { min, max } = competitor.priceRange;
          competitors[competitor.restaurant] = {
            min,
            max,
            avg: (min + max) / 2
          };
        }
      }
      
      // Determine price positioning
      const avgMarketPrice = Object.values(competitors).reduce((sum, comp) => sum + comp.avg, 0) / Object.keys(competitors).length;
      const pricePositioning = this.determinePricePositioning(avgMarketPrice, parameters.budget);
      
      // Calculate price elasticity (simplified)
      const elasticity = this.calculatePriceElasticity(competitors, parameters);
      
      return {
        competitors,
        pricePositioning,
        elasticity
      };
      
    } catch (error) {
      logger.error('❌ Market pricing analysis failed:', error);
      return this.getMockMarketPricing();
    }
  }

  private determinePricePositioning(avgMarketPrice: number, budget: { min: number; max: number }): 'budget' | 'mid-range' | 'premium' {
    const targetPrice = (budget.min + budget.max) / 2;
    
    if (targetPrice < avgMarketPrice * 0.8) return 'budget';
    if (targetPrice > avgMarketPrice * 1.2) return 'premium';
    return 'mid-range';
  }

  private calculatePriceElasticity(competitors: Record<string, any>, parameters: any): number {
    // Simplified elasticity calculation
    // In real implementation, this would use historical data and demand analysis
    const cuisineElasticity = {
      'thai': -0.8,
      'japanese': -0.6,
      'italian': -0.9,
      'chinese': -0.7,
      'western': -0.5
    };
    
    return cuisineElasticity[parameters.cuisine?.toLowerCase() as keyof typeof cuisineElasticity] || -0.7;
  }

  private async calculateFinancialProjections(parameters: any, marketPricing: PriceAnalysisResult['marketPricing']): Promise<PriceAnalysisResult['financialProjections']> {
    logger.info('💹 Calculating financial projections...');
    
    try {
      // Use finance tools for comprehensive financial modeling
      const projectionData = await this.mcpManager.invokeServer(
        'finance-tools',
        'calculate_financial_projections',
        {
          location: parameters.location,
          cuisine: parameters.cuisine,
          budget: parameters.budget,
          pricePositioning: marketPricing.pricePositioning
        }
      );
      
      // Calculate revenue projections
      const baseMonthlyRevenue = this.calculateBaseRevenue(parameters, marketPricing);
      const seasonalMultipliers = [0.8, 0.9, 1.1, 1.2, 1.0, 0.9, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3]; // Monthly seasonality
      
      const monthly = seasonalMultipliers.map(multiplier => baseMonthlyRevenue * multiplier);
      const annually = monthly.reduce((sum, month) => sum + month, 0);
      
      // Calculate costs
      const costs = this.calculateOperatingCosts(parameters, annually);
      
      // Calculate profitability metrics
      const profitability = this.calculateProfitability(annually, costs);
      
      return {
        revenue: {
          monthly,
          annually,
          peakSeasons: ['April', 'December', 'January'] // Thai New Year, Christmas, New Year
        },
        costs,
        profitability
      };
      
    } catch (error) {
      logger.error('❌ Financial projections failed:', error);
      return this.getMockFinancialProjections();
    }
  }

  private calculateBaseRevenue(parameters: any, marketPricing: PriceAnalysisResult['marketPricing']): number {
    // Simplified revenue calculation based on location, pricing, and market factors
    const locationMultipliers = {
      'sukhumvit': 1.2,
      'silom': 1.1,
      'chatuchak': 0.9,
      'default': 1.0
    };
    
    const cuisineMultipliers = {
      'thai': 1.0,
      'japanese': 1.1,
      'italian': 0.9,
      'chinese': 0.8,
      'western': 1.2
    };
    
    const district = parameters.location.toLowerCase().includes('sukhumvit') ? 'sukhumvit' :
                    parameters.location.toLowerCase().includes('silom') ? 'silom' :
                    parameters.location.toLowerCase().includes('chatuchak') ? 'chatuchak' : 'default';
    
    const baseRevenue = 500000; // Base monthly revenue in THB
    const locationFactor = locationMultipliers[district as keyof typeof locationMultipliers];
    const cuisineFactor = cuisineMultipliers[parameters.cuisine?.toLowerCase() as keyof typeof cuisineMultipliers] || 1.0;
    
    return baseRevenue * locationFactor * cuisineFactor;
  }

  private calculateOperatingCosts(parameters: any, annualRevenue: number): PriceAnalysisResult['financialProjections']['costs'] {
    // Industry standard cost percentages for restaurants in Bangkok
    return {
      fixed: annualRevenue * 0.25,      // Rent, utilities, insurance (25%)
      variable: annualRevenue * 0.15,   // Marketing, maintenance (15%)
      labor: annualRevenue * 0.30,      // Staff salaries and benefits (30%)
      ingredients: annualRevenue * 0.28  // Food and beverage costs (28%)
    };
  }

  private calculateProfitability(revenue: number, costs: PriceAnalysisResult['financialProjections']['costs']): PriceAnalysisResult['financialProjections']['profitability'] {
    const totalCosts = costs.fixed + costs.variable + costs.labor + costs.ingredients;
    const grossProfit = revenue - costs.ingredients;
    const netProfit = revenue - totalCosts;
    
    return {
      grossMargin: (grossProfit / revenue) * 100,
      netMargin: (netProfit / revenue) * 100,
      breakEvenPoint: Math.ceil(totalCosts / (revenue / 12)), // Months to break even
      roi: (netProfit / (costs.fixed * 0.6)) * 100 // Assuming 60% of fixed costs is initial investment
    };
  }

  private async generatePricingRecommendations(
    parameters: any,
    marketPricing: PriceAnalysisResult['marketPricing'],
    financialProjections: PriceAnalysisResult['financialProjections'],
    productData?: any
  ): Promise<PriceAnalysisResult['recommendations']> {
    logger.info('💡 Generating pricing recommendations...');
    
    // Optimal pricing based on market analysis
    const optimalPricing: Record<string, number> = {};
    if (productData?.popularDishes) {
      for (const dish of productData.popularDishes.slice(0, 10)) {
        const marketAvg = dish.avgPrice || 120;
        const adjustment = marketPricing.pricePositioning === 'budget' ? 0.9 :
                          marketPricing.pricePositioning === 'premium' ? 1.15 : 1.0;
        optimalPricing[dish.name] = Math.round(marketAvg * adjustment);
      }
    }
    
    const menuEngineering = [
      'Position signature dishes at premium pricing',
      'Create value meal combinations for price-sensitive customers',
      'Use psychological pricing (prices ending in 9 or 5)',
      'Implement tiered pricing for different portion sizes',
      'Offer limited-time promotional pricing for new items'
    ];
    
    const costOptimization = [
      'Negotiate bulk purchasing agreements with suppliers',
      'Implement portion control to reduce food waste',
      'Cross-train staff to optimize labor costs',
      'Use seasonal ingredients to reduce costs',
      'Implement inventory management system'
    ];
    
    const revenueStrategies = [
      'Introduce high-margin beverages and desserts',
      'Offer catering services for corporate clients',
      'Implement loyalty program to increase repeat customers',
      'Add delivery and takeaway options',
      'Create special event packages'
    ];
    
    return {
      optimalPricing,
      menuEngineering,
      costOptimization,
      revenueStrategies
    };
  }

  private getMockMarketPricing(): PriceAnalysisResult['marketPricing'] {
    return {
      competitors: {
        'Thai Garden': { min: 80, max: 200, avg: 130 },
        'Bangkok Kitchen': { min: 90, max: 250, avg: 150 },
        'Spice Route': { min: 100, max: 300, avg: 180 }
      },
      pricePositioning: 'mid-range',
      elasticity: -0.8
    };
  }

  private getMockFinancialProjections(): PriceAnalysisResult['financialProjections'] {
    const monthly = [400000, 450000, 550000, 600000, 500000, 450000, 400000, 450000, 500000, 550000, 600000, 650000];
    const annually = monthly.reduce((sum, month) => sum + month, 0);
    
    return {
      revenue: {
        monthly,
        annually,
        peakSeasons: ['April', 'December', 'January']
      },
      costs: {
        fixed: annually * 0.25,
        variable: annually * 0.15,
        labor: annually * 0.30,
        ingredients: annually * 0.28
      },
      profitability: {
        grossMargin: 72,
        netMargin: 2,
        breakEvenPoint: 18,
        roi: 8.5
      }
    };
  }
}