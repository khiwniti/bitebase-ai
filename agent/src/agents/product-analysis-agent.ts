/**
 * Product Analysis Agent for BiteBase Intelligence
 * Analyzes menu items, pricing, and competitive product landscape using Wongnai and Food Panda data
 */

import { ChatOpenAI } from '@langchain/openai';
import { BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { Tool } from '@langchain/core/tools';
import { mcpManager, MCPToolCall } from '../mcp/enhanced-mcp-manager.js';
import { EnhancedState, StateManager, RestaurantParams } from '../state/enhanced-state.js';
import { z } from 'zod';

export interface ProductAnalysisResult {
  popularDishes: Array<{
    name: string;
    popularity: number;
    avgPrice: number;
    profitability: number;
    source: string;
  }>;
  pricingRecommendations: Array<{
    category: string;
    suggestedPrice: number;
    reasoning: string;
    marketPosition: string;
  }>;
  seasonalTrends: {
    [dishCategory: string]: {
      [season: string]: {
        demand: number;
        avgPrice: number;
        profitMargin: number;
      };
    };
  };
  competitorAnalysis: {
    directCompetitors: Array<{
      name: string;
      cuisine: string;
      avgRating: number;
      priceRange: string;
      popularDishes: string[];
      location: string;
    }>;
    marketGaps: string[];
    pricePositioning: {
      budget: number;
      midRange: number;
      premium: number;
    };
  };
}

/**
 * Product Analysis Agent - Analyzes menu and pricing strategy
 */
export class ProductAnalysisAgent {
  private llm: ChatOpenAI;
  private agentId = 'product-analysis-agent';
  private agentName = 'Product Analysis Agent';

  constructor() {
    this.llm = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0.1,
    });
  }

  /**
   * Main analysis method
   */
  async analyze(state: EnhancedState): Promise<EnhancedState> {
    const { restaurantParams } = state;
    
    try {
      // Update progress: Starting analysis
      StateManager.updateAgentProgress(state, this.agentId, {
        agentName: this.agentName,
        status: 'running',
        progress: 0,
        currentTask: 'Initializing product analysis',
        startTime: new Date(),
      });

      // Step 1: Scrape Wongnai data
      const wongnaiData = await this.scrapeWongnaiData(restaurantParams);
      StateManager.updateAgentProgress(state, this.agentId, {
        progress: 25,
        currentTask: 'Collected Wongnai restaurant data',
      });

      // Step 2: Scrape Food Panda data
      const foodPandaData = await this.scrapeFoodPandaData(restaurantParams);
      StateManager.updateAgentProgress(state, this.agentId, {
        progress: 50,
        currentTask: 'Collected Food Panda delivery data',
      });

      // Step 3: Analyze popular dishes and trends
      const dishAnalysis = await this.analyzeDishPopularity(wongnaiData, foodPandaData, restaurantParams);
      StateManager.updateAgentProgress(state, this.agentId, {
        progress: 70,
        currentTask: 'Analyzed dish popularity and trends',
      });

      // Step 4: Generate pricing recommendations
      const pricingAnalysis = await this.generatePricingRecommendations(dishAnalysis, restaurantParams);
      StateManager.updateAgentProgress(state, this.agentId, {
        progress: 85,
        currentTask: 'Generated pricing recommendations',
      });

      // Step 5: Competitor analysis
      const competitorAnalysis = await this.analyzeCompetitors(wongnaiData, foodPandaData, restaurantParams);
      StateManager.updateAgentProgress(state, this.agentId, {
        progress: 95,
        currentTask: 'Completed competitor analysis',
      });

      // Compile final results
      const results: ProductAnalysisResult = {
        popularDishes: dishAnalysis.popularDishes,
        pricingRecommendations: pricingAnalysis.recommendations,
        seasonalTrends: dishAnalysis.seasonalTrends,
        competitorAnalysis: competitorAnalysis,
      };

      // Update state with results
      StateManager.addAnalysisResults(state, 'productAnalysis', results);
      StateManager.updateAgentProgress(state, this.agentId, {
        status: 'completed',
        progress: 100,
        currentTask: 'Product analysis completed',
        endTime: new Date(),
        results,
      });

      return state;

    } catch (error) {
      console.error('Product Analysis Agent Error:', error);
      StateManager.addError(state, this.agentId, error.message, 'high');
      StateManager.updateAgentProgress(state, this.agentId, {
        status: 'failed',
        error: error.message,
        endTime: new Date(),
      });
      return state;
    }
  }

  /**
   * Scrape restaurant and menu data from Wongnai
   */
  private async scrapeWongnaiData(params: RestaurantParams) {
    const searchTerms = [
      `${params.cuisine} restaurant ${params.location.district}`,
      `${params.type} ${params.location.district} Bangkok`,
      `food ${params.location.district} delivery`,
    ];

    const wongnaiResults = [];

    for (const searchTerm of searchTerms) {
      try {
        const toolCall: MCPToolCall = {
          serverId: 'playwright',
          toolName: 'navigate_and_scrape',
          arguments: {
            url: 'https://www.wongnai.com/search',
            searchQuery: searchTerm,
            location: params.location.district,
            extractData: {
              restaurants: true,
              menuItems: true,
              prices: true,
              ratings: true,
              reviews: true,
              photos: true,
            },
            pagination: {
              maxPages: 5,
              waitBetweenPages: 2000,
            },
            filters: {
              cuisine: params.cuisine,
              priceRange: `${params.budget.min}-${params.budget.max}`,
              location: params.location.district,
            },
          },
          timeout: 60000,
        };

        const result = await mcpManager.executeTool(toolCall);
        if (result.success) {
          wongnaiResults.push(result.result);
        }
      } catch (error) {
        console.warn(`Failed to scrape Wongnai for ${searchTerm}:`, error.message);
      }
    }

    return wongnaiResults;
  }

  /**
   * Scrape delivery and menu data from Food Panda
   */
  private async scrapeFoodPandaData(params: RestaurantParams) {
    try {
      const toolCall: MCPToolCall = {
        serverId: 'playwright',
        toolName: 'navigate_and_scrape',
        arguments: {
          url: 'https://www.foodpanda.co.th',
          location: `${params.location.district}, Bangkok`,
          extractData: {
            restaurants: true,
            menuItems: true,
            prices: true,
            deliveryFees: true,
            ratings: true,
            deliveryTime: true,
          },
          filters: {
            cuisine: params.cuisine,
            deliveryArea: params.location.district,
          },
          pagination: {
            maxPages: 3,
            waitBetweenPages: 3000,
          },
        },
        timeout: 90000,
      };

      const result = await mcpManager.executeTool(toolCall);
      return result.success ? result.result : null;
    } catch (error) {
      console.warn('Failed to scrape Food Panda:', error.message);
      return null;
    }
  }

  /**
   * Analyze dish popularity and identify trends
   */
  private async analyzeDishPopularity(wongnaiData: any[], foodPandaData: any, params: RestaurantParams) {
    const analysisPrompt = `
You are a restaurant menu analyst. Analyze the collected data to identify:

1. Most popular dishes in the ${params.cuisine} cuisine category
2. Average pricing for different dish categories
3. Seasonal trends and patterns
4. Customer preferences and review sentiment

Restaurant Context:
- Type: ${params.type}
- Cuisine: ${params.cuisine}
- Location: ${params.location.district}, Bangkok
- Budget Range: ${params.budget.min} - ${params.budget.max} THB
- Target Customers: ${params.targetCustomers.join(', ')}

Wongnai Data: ${JSON.stringify(wongnaiData, null, 2)}
Food Panda Data: ${JSON.stringify(foodPandaData, null, 2)}

Please provide analysis in the following format:
{
  "popularDishes": [
    {
      "name": "dish name",
      "popularity": 0-100,
      "avgPrice": price_in_thb,
      "profitability": 0-100,
      "source": "wongnai/foodpanda"
    }
  ],
  "seasonalTrends": {
    "category": {
      "season": {
        "demand": 0-100,
        "avgPrice": price_in_thb,
        "profitMargin": 0-100
      }
    }
  }
}
`;

    const response = await this.llm.invoke([
      new SystemMessage('You are an expert restaurant menu analyst with deep knowledge of Thai food market trends.'),
      new HumanMessage(analysisPrompt),
    ]);

    try {
      return JSON.parse(response.content as string);
    } catch (error) {
      // Fallback parsing if JSON is malformed
      return {
        popularDishes: [],
        seasonalTrends: {},
      };
    }
  }

  /**
   * Generate pricing recommendations based on market analysis
   */
  private async generatePricingRecommendations(dishAnalysis: any, params: RestaurantParams) {
    const pricingPrompt = `
Based on the dish analysis and market data, generate specific pricing recommendations for a new ${params.type} restaurant.

Dish Analysis: ${JSON.stringify(dishAnalysis, null, 2)}

Restaurant Context:
- Type: ${params.type}
- Cuisine: ${params.cuisine}
- Budget Range: ${params.budget.min} - ${params.budget.max} THB
- Business Model: ${params.businessModel}
- Target Customers: ${params.targetCustomers.join(', ')}

Please provide pricing recommendations that consider:
1. Market positioning (budget/mid-range/premium)
2. Profit margins (aim for 60-70% gross margin)
3. Competitive pricing
4. Customer value perception

Format:
{
  "recommendations": [
    {
      "category": "dish category",
      "suggestedPrice": price_in_thb,
      "reasoning": "detailed reasoning",
      "marketPosition": "budget/mid-range/premium"
    }
  ]
}
`;

    const response = await this.llm.invoke([
      new SystemMessage('You are an expert restaurant pricing strategist with knowledge of Thai market economics.'),
      new HumanMessage(pricingPrompt),
    ]);

    try {
      return JSON.parse(response.content as string);
    } catch (error) {
      return { recommendations: [] };
    }
  }

  /**
   * Analyze direct competitors and market positioning
   */
  private async analyzeCompetitors(wongnaiData: any[], foodPandaData: any, params: RestaurantParams) {
    const competitorPrompt = `
Analyze the competitive landscape for a new ${params.type} restaurant serving ${params.cuisine} cuisine.

Market Data: ${JSON.stringify({ wongnai: wongnaiData, foodpanda: foodPandaData }, null, 2)}

Restaurant Context:
- Type: ${params.type}
- Cuisine: ${params.cuisine}
- Location: ${params.location.district}, Bangkok
- Budget Range: ${params.budget.min} - ${params.budget.max} THB

Identify:
1. Direct competitors (same cuisine type and location)
2. Market gaps and opportunities
3. Price positioning segments
4. Competitive advantages and disadvantages

Format:
{
  "directCompetitors": [
    {
      "name": "restaurant name",
      "cuisine": "cuisine type",
      "avgRating": rating,
      "priceRange": "price range",
      "popularDishes": ["dish1", "dish2"],
      "location": "location"
    }
  ],
  "marketGaps": ["opportunity1", "opportunity2"],
  "pricePositioning": {
    "budget": percentage,
    "midRange": percentage,
    "premium": percentage
  }
}
`;

    const response = await this.llm.invoke([
      new SystemMessage('You are a competitive intelligence analyst specializing in restaurant markets.'),
      new HumanMessage(competitorPrompt),
    ]);

    try {
      return JSON.parse(response.content as string);
    } catch (error) {
      return {
        directCompetitors: [],
        marketGaps: [],
        pricePositioning: { budget: 0, midRange: 0, premium: 0 },
      };
    }
  }

  /**
   * Get agent capabilities
   */
  getCapabilities(): string[] {
    return [
      'web_scraping',
      'data_analysis',
      'menu_analysis',
      'pricing_strategy',
      'competitive_intelligence',
      'market_research',
    ];
  }

  /**
   * Get required MCP servers
   */
  getRequiredMCPServers(): string[] {
    return ['playwright', 'sqlite', 'echarts'];
  }
}