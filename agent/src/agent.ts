/**
 * BiteBase Restaurant Intelligence Agent
 * AI-powered market research assistant for restaurant analytics
 */

import { z } from "zod";
import { RunnableConfig } from "@langchain/core/runnables";
import { tool } from "@langchain/core/tools";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { AIMessage, SystemMessage, BaseMessage } from "@langchain/core/messages";
import { MemorySaver, START, StateGraph, Annotation } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { RestaurantAnalyticsState } from "./types/restaurant-intelligence";

// Restaurant Intelligence Agent State
const AgentStateAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (currentState: BaseMessage[], updateValue: BaseMessage[]) => currentState.concat(updateValue),
    default: () => [],
  }),
  // Restaurant Analytics State
  restaurantData: Annotation<RestaurantAnalyticsState>({
    reducer: (currentState: RestaurantAnalyticsState, updateValue: RestaurantAnalyticsState) => ({ ...currentState, ...updateValue }),
    default: () => ({
      mapView: { latitude: 37.7749, longitude: -122.4194, zoom: 12, bearing: 0, pitch: 0 },
      restaurants: [],
      customers: [],
      hotspots: [],
      activeModule: 'place',
      filters: {
        timeRange: {
          start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          end: new Date().toISOString(),
          preset: 'week'
        }
      },
      menuItems: [],
      isLoading: false,
      showHeatmap: true,
      showCompetitors: true,
      showHotspots: false,
      aiInsights: []
    })
  }),
});

export type AgentState = typeof AgentStateAnnotation.State;

// Restaurant Intelligence Tools
const analyzeCompetitorDensity = tool(
  (args: { radius: number; location: string }) => {
    // Simulate competitor analysis
    const competitorCount = Math.floor(Math.random() * 10) + 3;
    const marketSaturation = competitorCount > 6 ? 'high' : competitorCount > 3 ? 'moderate' : 'low';
    
    return {
      analysis: 'competitor_density',
      location: args.location,
      radius: args.radius,
      competitorCount,
      marketSaturation,
      recommendations: marketSaturation === 'high' 
        ? ['Focus on differentiation', 'Consider niche positioning', 'Analyze competitor weaknesses']
        : ['Market expansion opportunity', 'Consider aggressive marketing', 'Monitor new entrants'],
      insight: `Found ${competitorCount} competitors within ${args.radius} miles of ${args.location}. Market saturation: ${marketSaturation}.`
    };
  },
  {
    name: "analyzeCompetitorDensity",
    description: "Analyze competitor density in a specific area around a restaurant location.",
    schema: z.object({
      radius: z.number().describe("Radius in miles to analyze"),
      location: z.string().describe("Restaurant location or address"),
    }),
  }
);

const identifyCustomerHotspots = tool(
  (args: { timeframe: string; metric: string }) => {
    // Simulate hotspot analysis using Getis-Ord Gi* statistical method
    const hotspots = [
      {
        area: 'Financial District',
        zScore: 2.8,
        pValue: 0.005,
        significance: 'statistically significant hot spot',
        metric: args.metric,
        averageValue: args.metric === 'order_value' ? 45.20 : 12.5,
        recommendation: 'High-value customer area - increase marketing spend'
      },
      {
        area: 'SOMA',
        zScore: -1.9,
        pValue: 0.058,
        significance: 'cold spot',
        metric: args.metric,
        averageValue: args.metric === 'order_value' ? 28.50 : 6.2,
        recommendation: 'Underperforming area - investigate service issues'
      }
    ];

    return {
      analysis: 'customer_hotspots',
      timeframe: args.timeframe,
      metric: args.metric,
      hotspots,
      insight: `Statistical analysis identified ${hotspots.filter(h => h.significance.includes('hot')).length} significant hotspots and ${hotspots.filter(h => h.significance.includes('cold')).length} cold spots for ${args.metric} in the ${args.timeframe} period.`
    };
  },
  {
    name: "identifyCustomerHotspots",
    description: "Perform statistical hotspot analysis to identify significant clusters of customer activity.",
    schema: z.object({
      timeframe: z.string().describe("Time period for analysis (e.g., 'last_week', 'last_month')"),
      metric: z.string().describe("Metric to analyze (e.g., 'order_value', 'frequency', 'customer_count')"),
    }),
  }
);

const analyzeMenuPerformance = tool(
  (args: { category?: string; sortBy: string }) => {
    // Simulate menu engineering analysis
    const menuItems = [
      {
        name: 'Margherita Pizza',
        category: 'Pizza',
        salesVolume: 150,
        revenue: 2250,
        cogs: 900,
        profitMargin: 60,
        popularity: 85, // percentile
        profitability: 75, // percentile
        quadrant: 'Star', // High popularity, high profitability
        recommendation: 'Promote heavily - signature item'
      },
      {
        name: 'Truffle Pasta',
        category: 'Pasta',
        salesVolume: 45,
        revenue: 1350,
        cogs: 450,
        profitMargin: 66.7,
        popularity: 25,
        profitability: 90,
        quadrant: 'Puzzle', // Low popularity, high profitability
        recommendation: 'Improve marketing and menu placement'
      },
      {
        name: 'House Salad',
        category: 'Salads',
        salesVolume: 120,
        revenue: 960,
        cogs: 480,
        profitMargin: 50,
        popularity: 80,
        profitability: 35,
        quadrant: 'Plow Horse', // High popularity, low profitability
        recommendation: 'Increase price or reduce costs'
      }
    ];

    const filteredItems = args.category 
      ? menuItems.filter(item => item.category.toLowerCase() === (args.category || '').toLowerCase())
      : menuItems;

    const sortedItems = filteredItems.sort((a, b) => {
      switch (args.sortBy) {
        case 'revenue': return b.revenue - a.revenue;
        case 'profit_margin': return b.profitMargin - a.profitMargin;
        case 'popularity': return b.popularity - a.popularity;
        default: return b.salesVolume - a.salesVolume;
      }
    });

    return {
      analysis: 'menu_performance',
      category: args.category || 'all',
      sortBy: args.sortBy,
      items: sortedItems,
      summary: {
        totalItems: sortedItems.length,
        stars: sortedItems.filter(item => item.quadrant === 'Star').length,
        puzzles: sortedItems.filter(item => item.quadrant === 'Puzzle').length,
        plowHorses: sortedItems.filter(item => item.quadrant === 'Plow Horse').length,
        dogs: sortedItems.filter(item => item.quadrant === 'Dog').length,
      },
      insight: `Menu analysis shows ${sortedItems.filter(item => item.quadrant === 'Star').length} star items and ${sortedItems.filter(item => item.quadrant === 'Puzzle').length} puzzle items with optimization potential.`
    };
  },
  {
    name: "analyzeMenuPerformance",
    description: "Analyze menu item performance using the menu engineering matrix (BCG-style analysis).",
    schema: z.object({
      category: z.string().optional().nullable().describe("Menu category to filter by (optional)"),
      sortBy: z.string().describe("Sort criteria: 'sales_volume', 'revenue', 'profit_margin', 'popularity'"),
    }),
  }
);

const analyzePricingStrategy = tool(
  (args: { item: string; competitorPrices: number[] }) => {
    const ourPrice = 18.00; // Example current price
    const avgCompetitorPrice = args.competitorPrices.reduce((a, b) => a + b, 0) / args.competitorPrices.length;
    const priceDifference = ((ourPrice - avgCompetitorPrice) / avgCompetitorPrice) * 100;
    
    // Price elasticity simulation
    const elasticityCoefficient = -1.2; // Moderately elastic
    const pricePoints = [];
    for (let price = ourPrice * 0.8; price <= ourPrice * 1.3; price += 0.5) {
      const demandChange = elasticityCoefficient * ((price - ourPrice) / ourPrice);
      const newDemand = 100 * (1 + demandChange); // Base demand of 100 units
      const revenue = price * Math.max(0, newDemand);
      pricePoints.push({ price, demand: Math.max(0, newDemand), revenue });
    }
    
    const optimalPoint = pricePoints.reduce((max, point) => 
      point.revenue > max.revenue ? point : max
    );

    return {
      analysis: 'pricing_strategy',
      item: args.item,
      currentPrice: ourPrice,
      competitorAverage: avgCompetitorPrice,
      priceDifference: priceDifference.toFixed(1),
      positioning: Math.abs(priceDifference) < 5 ? 'competitive' : priceDifference > 0 ? 'premium' : 'value',
      elasticityCoefficient,
      optimalPrice: optimalPoint.price,
      potentialRevenueIncrease: ((optimalPoint.revenue - (ourPrice * 100)) / (ourPrice * 100) * 100).toFixed(1),
      pricePoints,
      insight: `${args.item} is priced ${priceDifference > 0 ? 'above' : 'below'} market average by ${Math.abs(priceDifference).toFixed(1)}%. Optimal price point: $${optimalPoint.price.toFixed(2)}.`
    };
  },
  {
    name: "analyzePricingStrategy",
    description: "Analyze pricing strategy and simulate price elasticity for menu items.",
    schema: z.object({
      item: z.string().describe("Menu item name to analyze"),
      competitorPrices: z.array(z.number()).describe("Array of competitor prices for the same item"),
    }),
  }
);

const analyzeCustomerSegments = tool(
  (args: { segmentationType: string }) => {
    // RFM Analysis simulation
    const segments = [
      {
        name: 'Champions',
        count: 45,
        recency: 90,
        frequency: 95,
        monetary: 92,
        characteristics: ['High value', 'Recent orders', 'Frequent visits'],
        ltv: 485,
        recommendations: ['VIP treatment', 'Exclusive offers', 'Referral programs']
      },
      {
        name: 'Loyal Customers',
        count: 78,
        recency: 75,
        frequency: 85,
        monetary: 70,
        characteristics: ['Regular visitors', 'Good value', 'Consistent orders'],
        ltv: 320,
        recommendations: ['Loyalty rewards', 'Upselling', 'Retention campaigns']
      },
      {
        name: 'At Risk',
        count: 23,
        recency: 25,
        frequency: 70,
        monetary: 65,
        characteristics: ['Previously valuable', 'Declining visits', 'Need attention'],
        ltv: 180,
        recommendations: ['Win-back campaigns', 'Special offers', 'Personal outreach']
      },
      {
        name: 'New Customers',
        count: 52,
        recency: 95,
        frequency: 15,
        monetary: 45,
        characteristics: ['Recent first visit', 'Low frequency', 'Growth potential'],
        ltv: 125,
        recommendations: ['Welcome series', 'Onboarding offers', 'Experience optimization']
      }
    ];

    const totalCustomers = segments.reduce((sum, seg) => sum + seg.count, 0);
    const totalLTV = segments.reduce((sum, seg) => sum + (seg.count * seg.ltv), 0);

    return {
      analysis: 'customer_segments',
      segmentationType: args.segmentationType,
      segments,
      summary: {
        totalCustomers,
        averageLTV: (totalLTV / totalCustomers).toFixed(0),
        highValueSegments: segments.filter(seg => seg.ltv > 300).length,
        atRiskCustomers: segments.find(seg => seg.name === 'At Risk')?.count || 0
      },
      insight: `Customer base of ${totalCustomers} segmented into ${segments.length} groups. ${segments.filter(seg => seg.ltv > 300).length} high-value segments represent ${((segments.filter(seg => seg.ltv > 300).reduce((sum, seg) => sum + seg.count, 0) / totalCustomers) * 100).toFixed(1)}% of customers.`
    };
  },
  {
    name: "analyzeCustomerSegments",
    description: "Perform RFM (Recency, Frequency, Monetary) analysis to segment customers.",
    schema: z.object({
      segmentationType: z.string().describe("Type of segmentation: 'rfm', 'behavioral', 'demographic'"),
    }),
  }
);

// Import additional tools
import { restaurantIntelligenceTools } from "./tools/restaurant-intelligence-tools";

// Restaurant Intelligence Tools Array - MINIMAL FOR DEBUGGING
const restaurantTools = [
  analyzeCompetitorDensity,
  // identifyCustomerHotspots,
  // analyzeMenuPerformance,
  // analyzePricingStrategy,
  // analyzeCustomerSegments,
  // ...restaurantIntelligenceTools  // Temporarily disabled for debugging
];

// Chat Node - Restaurant Intelligence Specialist
async function restaurant_intelligence_node(state: AgentState, config: RunnableConfig) {
  const model = new ChatOpenAI({ 
    temperature: 0.3, // Slightly creative for insights but mostly factual
    model: "gpt-4o" 
  });

  const modelWithTools = model.bindTools([
    // ...convertActionsToDynamicStructuredTools(state.tools || []),  // Temporarily disable to fix empty tool names
    ...restaurantTools,
  ], {
    // Prevent multiple tool calls which seem to be causing empty names
    parallel_tool_calls: false,
  });

  const systemMessage = new SystemMessage({
    content: `You are BiteBase AI, an expert restaurant market research analyst specializing in the 4P framework: Place, Product, Price, and Promotion.

CURRENT RESTAURANT STATE:
- Active Module: ${state.restaurantData?.activeModule || 'place'}
- Map Center: ${state.restaurantData?.mapView?.latitude?.toFixed(4)}, ${state.restaurantData?.mapView?.longitude?.toFixed(4)}
- Restaurants: ${state.restaurantData?.restaurants?.length || 0} locations
- Customers: ${state.restaurantData?.customers?.length || 0} data points
- Layers: Heatmap ${state.restaurantData?.showHeatmap ? 'ON' : 'OFF'}, Competitors ${state.restaurantData?.showCompetitors ? 'ON' : 'OFF'}, Hotspots ${state.restaurantData?.showHotspots ? 'ON' : 'OFF'}

EXPERTISE AREAS:
📍 PLACE ANALYTICS: Geospatial analysis, competitor mapping, customer density, delivery optimization, market gaps
🍽️ PRODUCT ANALYTICS: Menu engineering, sales performance, profitability analysis, trend forecasting
💰 PRICE ANALYTICS: Competitive pricing, elasticity modeling, break-even analysis, revenue optimization
📢 PROMOTION ANALYTICS: Campaign ROI, customer segmentation, sentiment analysis, marketing effectiveness

ANALYSIS CAPABILITIES:
- Statistical hotspot analysis (Getis-Ord Gi*)
- Menu engineering matrix (BCG-style)
- RFM customer segmentation
- Price elasticity simulation
- Competitive benchmarking

COMMUNICATION STYLE:
- Provide actionable insights with specific recommendations
- Use data-driven analysis with statistical backing
- Explain complex concepts in business-friendly terms
- Always include confidence levels and limitations
- Suggest follow-up actions and monitoring strategies

When users ask for analysis, use the appropriate tools and provide comprehensive insights with clear next steps.`
  });

  // Debug: Log tool names before binding
  console.log("Tools being bound:", restaurantTools.map(t => t.name));
  
  // Debug: Log ALL messages being sent (especially tool calls)
  const messagesToSend = [systemMessage, ...state.messages];
  messagesToSend.forEach((msg, index) => {
    console.log(`Message ${index} type:`, msg.constructor.name);
    if (msg instanceof AIMessage) {
      console.log(`  - AI Message has tool_calls:`, msg.tool_calls?.length || 0);
      if (msg.tool_calls?.length) {
        msg.tool_calls.forEach((tc, tcIndex) => {
          console.log(`    Tool call ${tcIndex}: name="${tc.name}", id="${tc.id}"`);
        });
      }
    }
  });

  const response = await modelWithTools.invoke(
    [systemMessage, ...state.messages],
    config
  );

  return {
    messages: [response],
  };
}

// Routing Logic
function shouldContinue({ messages }: AgentState) {
  const lastMessage = messages[messages.length - 1] as AIMessage;

  // If the last message has tool calls, route to tool node
  if (lastMessage.tool_calls?.length) {
    return "tool_node";
  }

  return "__end__";
}

// Build the Restaurant Intelligence Workflow
const workflow = new StateGraph(AgentStateAnnotation)
  .addNode("restaurant_intelligence_node", restaurant_intelligence_node)
  .addNode("tool_node", new ToolNode(restaurantTools))
  .addEdge(START, "restaurant_intelligence_node")
  .addEdge("tool_node", "restaurant_intelligence_node")
  .addConditionalEdges("restaurant_intelligence_node", shouldContinue);

// Disable memory completely to avoid conversation state issues
// const memory = new MemorySaver();

export const graph = workflow.compile({
  // checkpointer: memory,  // Disable memory to fix tool call issues
  // Ensure no persistent state that could contain malformed tool calls
});
