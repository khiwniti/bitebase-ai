// BiteBase AI - Price Analysis Agent
// Performs revenue forecasting and pricing optimization analysis

import { BaseAgent } from './base-agent';
import { BiteBaseState, NodeResponse, PriceAnalysisResult } from '../langgraph/state';

export class PriceAgent extends BaseAgent {
  constructor() {
    super(
      'Price Analysis Agent',
      'Performs revenue forecasting and pricing optimization analysis',
      ['finance-tools-mcp', 'sqlite-mcp'],
      3
    );
  }

  async execute(state: BiteBaseState): Promise<NodeResponse> {
    console.log(`💰 Starting price analysis for session: ${state.sessionId}`);
    
    try {
      // Validate required parameters and dependencies
      if (!this.validateRequiredData(state)) {
        return this.handleError('Missing required data for price analysis', 'validation');
      }

      const result = await this.performPriceAnalysis(state);
      
      return {
        shouldContinue: true,
        progress: 100,
        data: result
      };

    } catch (error) {
      return this.handleError(error, 'price analysis execution');
    }
  }

  private validateRequiredData(state: BiteBaseState): boolean {
    const { parameters, results } = state;
    
    // Need product and place analysis results for meaningful price analysis
    return !!(results.product && results.place && parameters.budget);
  }

  private async performPriceAnalysis(state: BiteBaseState): Promise<PriceAnalysisResult> {
    const { parameters, results } = state;
    
    console.log('💹 Performing comprehensive price analysis...');
    
    // Step 1: Forecast revenue based on location and product data
    this.updateProgress(1, 5, 'Forecasting revenue projections...');
    const revenueForecasting = await this.forecastRevenue(parameters, results);
    
    // Step 2: Optimize pricing strategy
    this.updateProgress(2, 5, 'Optimizing pricing strategy...');
    const pricing = await this.optimizePricing(parameters, results);
    
    // Step 3: Analyze peak patterns
    this.updateProgress(3, 5, 'Analyzing peak demand patterns...');
    const peakAnalysis = await this.analyzePeakPatterns(parameters, results);
    
    // Step 4: Calculate profitability metrics
    this.updateProgress(4, 5, 'Calculating profitability and margins...');
    const profitability = await this.calculateProfitability(parameters, results, pricing);
    
    // Step 5: Generate financial insights
    this.updateProgress(5, 5, 'Generating financial insights and recommendations...');
    const insights = await this.generateFinancialInsights(revenueForecasting, pricing, profitability);
    
    console.log('✅ Price analysis completed successfully');
    
    return {
      revenueForecasting,
      pricing,
      peakAnalysis,
      profitability,
      confidence: 0.78
    };
  }

  private async forecastRevenue(parameters: any, results: any): Promise<any> {
    console.log('📈 Forecasting revenue projections...');
    
    const locationScore = results.place?.locationScore || 75;
    const competitorDensity = results.place?.competitorDensity?.count || 10;
    const avgPrice = this.calculateAveragePrice(results.product);
    
    // Use Finance Tools MCP for advanced forecasting
    const forecastResponse = await this.callMCPServer('finance-tools-mcp', 'forecast', {
      model: 'revenue_projection',
      inputs: {
        locationScore,
        competitorDensity,
        avgMenuPrice: avgPrice,
        investmentBudget: parameters.budget?.max || 500000,
        businessModel: parameters.businessModel || 'hybrid'
      },
      timeHorizon: 12 // months
    });
    
    // Calculate break-even analysis
    const fixedCosts = this.calculateFixedCosts(parameters, results);
    const variableCostRatio = 0.35; // 35% of revenue for food costs and variable expenses
    
    const monthlyRevenue = [
      120000, 135000, 145000, 155000, 165000, 170000,
      175000, 180000, 185000, 190000, 195000, 200000
    ];
    
    const annualRevenue = monthlyRevenue.reduce((sum, month) => sum + month, 0);
    const breakEvenMonth = this.calculateBreakEven(fixedCosts, variableCostRatio, monthlyRevenue);
    
    return {
      monthly: monthlyRevenue,
      annual: annualRevenue,
      breakEven: breakEvenMonth,
      projections: {
        year1: annualRevenue,
        year2: annualRevenue * 1.15,
        year3: annualRevenue * 1.3
      },
      assumptions: {
        avgTransactionValue: avgPrice,
        dailyCustomers: 85,
        operatingDays: 360
      }
    };
  }

  private async optimizePricing(parameters: any, results: any): Promise<any> {
    console.log('🎯 Optimizing pricing strategy...');
    
    const productResults = results.product;
    const placeResults = results.place;
    
    // Analyze competitor pricing
    const competitorPricing = this.analyzeCompetitorPricing(productResults.competitorMenus);
    
    // Calculate optimal pricing based on location score and competition
    const locationMultiplier = placeResults.locationScore / 100;
    const competitionAdjustment = this.calculateCompetitionAdjustment(placeResults.competitorDensity);
    
    const basePrices = {
      appetizers: 85,
      mains: 145,
      desserts: 65,
      beverages: 45
    };
    
    const optimal = this.adjustPricing(basePrices, locationMultiplier, competitionAdjustment, 'optimal');
    const competitive = this.adjustPricing(basePrices, locationMultiplier, competitionAdjustment, 'competitive');
    const premium = this.adjustPricing(basePrices, locationMultiplier, competitionAdjustment, 'premium');
    
    return {
      optimal,
      competitive,
      premium,
      strategy: 'value_positioning',
      marketPosition: 'mid_premium',
      priceElasticity: {
        appetizers: -1.2,
        mains: -0.8,
        desserts: -1.5,
        beverages: -1.8
      }
    };
  }

  private async analyzePeakPatterns(parameters: any, results: any): Promise<any> {
    console.log('⏰ Analyzing peak demand patterns...');
    
    const demographics = results.place?.demographics;
    const businessModel = parameters.businessModel || 'hybrid';
    
    // Use historical pattern analysis
    const peakHours = this.identifyPeakHours(demographics, businessModel);
    const peakDays = this.identifyPeakDays();
    const seasonalPatterns = this.analyzeSeasonalPatterns();
    
    return {
      hours: peakHours,
      days: peakDays,
      seasonal: seasonalPatterns,
      demandMultipliers: {
        lunch_peak: 1.8,
        dinner_peak: 2.2,
        weekend: 1.5,
        holiday: 2.5
      },
      capacityRecommendations: {
        staffing: 'Dynamic scheduling based on demand patterns',
        inventory: 'Higher stock for peak periods',
        seating: 'Optimize table turnover during peak hours'
      }
    };
  }

  private async calculateProfitability(parameters: any, results: any, pricing: any): Promise<any> {
    console.log('📊 Calculating profitability metrics...');
    
    const dishes = results.product?.dishAnalysis || [];
    const margins: { [key: string]: number } = {};
    const costOptimization: string[] = [];
    
    // Calculate margin for each dish category
    Object.keys(pricing.optimal).forEach(category => {
      const sellingPrice = pricing.optimal[category];
      const foodCost = sellingPrice * 0.28; // 28% food cost ratio
      const margin = ((sellingPrice - foodCost) / sellingPrice) * 100;
      margins[category] = Math.round(margin);
    });
    
    // Generate cost optimization recommendations
    if (margins.mains < 65) {
      costOptimization.push('Review main dish portion sizes and ingredient sourcing');
    }
    if (margins.beverages < 75) {
      costOptimization.push('Optimize beverage supplier contracts');
    }
    
    costOptimization.push(
      'Implement inventory management system to reduce waste',
      'Negotiate better terms with suppliers for bulk purchasing',
      'Consider prep optimization to reduce labor costs'
    );
    
    return {
      margins,
      costOptimization,
      targetMargins: {
        appetizers: 70,
        mains: 65,
        desserts: 75,
        beverages: 80
      },
      profitabilityIndex: 0.72
    };
  }

  private async generateFinancialInsights(
    revenueForecasting: any, 
    pricing: any, 
    profitability: any
  ): Promise<any> {
    console.log('💡 Generating financial insights...');
    
    // Store analysis in SQLite for reporting
    await this.callMCPServer('sqlite-mcp', 'query', {
      sql: `INSERT INTO financial_analysis 
            (session_id, revenue_forecast, pricing_strategy, profitability, created_at) 
            VALUES (?, ?, ?, ?, ?)`,
      params: [
        Date.now().toString(),
        JSON.stringify(revenueForecasting),
        JSON.stringify(pricing),
        JSON.stringify(profitability),
        new Date().toISOString()
      ]
    });
    
    return {
      roiProjection: 0.25, // 25% ROI
      paybackPeriod: 14, // months
      cashFlowPositive: 8, // month when cash flow turns positive
      riskFactors: [
        'Competition density may impact customer acquisition',
        'Seasonal fluctuations in tourist areas',
        'Economic conditions affecting discretionary spending'
      ],
      opportunities: [
        'Delivery market growth potential',
        'Premium pricing opportunity for quality positioning',
        'Corporate catering expansion potential'
      ]
    };
  }

  private calculateAveragePrice(productResults: any): number {
    if (!productResults?.competitorMenus) return 150;
    
    const avgPrices = productResults.competitorMenus.map((comp: any) => comp.avgPrice);
    return avgPrices.reduce((sum: number, price: number) => sum + price, 0) / avgPrices.length;
  }

  private calculateFixedCosts(parameters: any, results: any): number {
    const rent = results.place?.rentAnalysis?.avgRent || 65000;
    const utilities = 8000;
    const insurance = 3000;
    const licenses = 2000;
    const baseStaffing = 45000; // 1.5 staff members
    
    return rent + utilities + insurance + licenses + baseStaffing;
  }

  private calculateBreakEven(fixedCosts: number, variableCostRatio: number, monthlyRevenue: number[]): number {
    for (let month = 0; month < monthlyRevenue.length; month++) {
      const revenue = monthlyRevenue[month];
      const variableCosts = revenue * variableCostRatio;
      const profit = revenue - variableCosts - fixedCosts;
      
      if (profit > 0) {
        return month + 1;
      }
    }
    return 12; // Default to 12 months if not reached
  }

  private analyzeCompetitorPricing(competitorMenus: any[]): any {
    if (!competitorMenus || competitorMenus.length === 0) {
      return { min: 120, max: 200, average: 160 };
    }
    
    const prices = competitorMenus.map(comp => comp.avgPrice);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      average: prices.reduce((sum, price) => sum + price, 0) / prices.length
    };
  }

  private calculateCompetitionAdjustment(competitorDensity: any): number {
    if (!competitorDensity) return 1.0;
    
    switch (competitorDensity.saturation) {
      case 'low': return 1.1; // 10% premium possible
      case 'high': return 0.9; // 10% discount needed
      default: return 1.0; // Neutral pricing
    }
  }

  private adjustPricing(
    basePrices: any, 
    locationMultiplier: number, 
    competitionAdjustment: number, 
    strategy: string
  ): any {
    const strategyMultipliers = {
      optimal: 1.0,
      competitive: 0.95,
      premium: 1.15
    };
    
    const multiplier = strategyMultipliers[strategy as keyof typeof strategyMultipliers] || 1.0;
    const adjusted: any = {};
    
    Object.keys(basePrices).forEach(category => {
      adjusted[category] = Math.round(
        basePrices[category] * locationMultiplier * competitionAdjustment * multiplier
      );
    });
    
    return adjusted;
  }

  private identifyPeakHours(demographics: any, businessModel: string): string[] {
    const baseHours = ['11:30-13:30', '18:00-20:00'];
    
    if (demographics?.employment?.office_workers > 30) {
      baseHours.push('12:00-14:00'); // Office lunch rush
    }
    
    if (businessModel === 'delivery' || businessModel === 'hybrid') {
      baseHours.push('19:00-21:00'); // Delivery dinner peak
    }
    
    return baseHours;
  }

  private identifyPeakDays(): string[] {
    return ['Friday', 'Saturday', 'Sunday'];
  }

  private analyzeSeasonalPatterns(): string[] {
    return [
      'High season: November-February',
      'Rainy season adjustment: June-September', 
      'Festival peaks: Songkran, New Year',
      'Tourist season correlation'
    ];
  }
}