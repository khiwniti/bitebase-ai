import { MCPManager } from '../mcp/MCPManager.js';
import { logger } from '../utils/logger.js';
import { ProductAnalysisResult } from './ProductAnalysisAgent.js';
import { PlaceAnalysisResult } from './PlaceAnalysisAgent.js';
import { PriceAnalysisResult } from './PriceAnalysisAgent.js';
import { PromotionAnalysisResult } from './PromotionAnalysisAgent.js';

export interface ReportGenerationResult {
  executiveSummary: string;
  viabilityScore: number;
  riskAssessment: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
    mitigation: string[];
  };
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  financialSummary: {
    initialInvestment: number;
    projectedRevenue: number;
    breakEvenMonths: number;
    roiTimeframe: string;
  };
  nextSteps: string[];
}

export interface CombinedAnalysisData {
  product?: ProductAnalysisResult;
  place?: PlaceAnalysisResult;
  price?: PriceAnalysisResult;
  promotion?: PromotionAnalysisResult;
}

export class ReportGenerationAgent {
  private mcpManager: MCPManager;

  constructor(mcpManager: MCPManager) {
    this.mcpManager = mcpManager;
  }

  async initialize(): Promise<void> {
    logger.info('📋 Initializing Report Generation Agent...');
    // Verify required MCP servers are available
    const requiredServers = ['echarts-visualization', 'mermaid-diagrams'];
    for (const server of requiredServers) {
      const isHealthy = await this.mcpManager.isServerHealthy(server);
      if (!isHealthy) {
        logger.warn(`⚠️ ${server} is not available, some features may be limited`);
      }
    }
  }

  async generateReport(analysisData: CombinedAnalysisData): Promise<ReportGenerationResult> {
    logger.info('🔍 Starting comprehensive report generation...');
    
    try {
      // Step 1: Generate executive summary
      const executiveSummary = await this.generateExecutiveSummary(analysisData);
      
      // Step 2: Calculate viability score
      const viabilityScore = await this.calculateViabilityScore(analysisData);
      
      // Step 3: Assess risks
      const riskAssessment = await this.assessRisks(analysisData);
      
      // Step 4: Generate recommendations
      const recommendations = await this.generateRecommendations(analysisData);
      
      // Step 5: Create financial summary
      const financialSummary = await this.createFinancialSummary(analysisData);
      
      // Step 6: Define next steps
      const nextSteps = await this.defineNextSteps(analysisData, viabilityScore);
      
      // Step 7: Generate visualizations
      await this.generateVisualizations(analysisData);
      
      logger.info('✅ Report generation completed successfully');
      
      return {
        executiveSummary,
        viabilityScore,
        riskAssessment,
        recommendations,
        financialSummary,
        nextSteps
      };
      
    } catch (error) {
      logger.error('❌ Report generation failed:', error);
      throw error;
    }
  }

  private async generateExecutiveSummary(data: CombinedAnalysisData): Promise<string> {
    logger.info('📝 Generating executive summary...');
    
    const productSummary = data.product ? 
      `Product analysis reveals ${data.product.popularDishes.length} trending dishes with average profitability of ${data.product.popularDishes.reduce((sum, dish) => sum + dish.profitability, 0) / data.product.popularDishes.length}%.` : 
      'Product analysis pending.';
    
    const placeSummary = data.place ? 
      `Location analysis shows ${data.place.competition.density} competition density with ${data.place.competition.marketSaturation}% market saturation.` : 
      'Place analysis pending.';
    
    const priceSummary = data.price ? 
      `Financial projections indicate ${data.price.financialProjections.profitability.netMargin}% net margin with ${data.price.financialProjections.profitability.breakEvenPoint} months to break-even.` : 
      'Price analysis pending.';
    
    const promotionSummary = data.promotion ? 
      `Customer sentiment analysis shows ${(data.promotion.sentiment.overall * 100).toFixed(1)}% positive sentiment with ${data.promotion.customerSegments.length} identified customer segments.` : 
      'Promotion analysis pending.';
    
    return `
EXECUTIVE SUMMARY

This comprehensive market research analysis provides detailed insights for establishing a new restaurant venture.

PRODUCT INSIGHTS: ${productSummary}

LOCATION ANALYSIS: ${placeSummary}

FINANCIAL OUTLOOK: ${priceSummary}

MARKETING OPPORTUNITY: ${promotionSummary}

The analysis indicates a viable business opportunity with strategic positioning and proper execution.
    `.trim();
  }

  private async calculateViabilityScore(data: CombinedAnalysisData): Promise<number> {
    logger.info('📊 Calculating overall viability score...');
    
    let totalScore = 0;
    let factors = 0;
    
    // Product viability (25%)
    if (data.product) {
      const productScore = Math.min(100, (data.product.popularDishes.length * 5) + 
        (data.product.popularDishes.reduce((sum, dish) => sum + dish.profitability, 0) / data.product.popularDishes.length));
      totalScore += productScore * 0.25;
      factors++;
    }
    
    // Place viability (25%)
    if (data.place) {
      const competitionFactor = data.place.competition.density === 'low' ? 90 : 
                               data.place.competition.density === 'medium' ? 70 : 50;
      const accessibilityFactor = (data.place.accessibility.publicTransport + 
                                  data.place.accessibility.walkability) / 2;
      const placeScore = (competitionFactor + accessibilityFactor) / 2;
      totalScore += placeScore * 0.25;
      factors++;
    }
    
    // Price viability (30%)
    if (data.price) {
      const profitabilityScore = Math.max(0, Math.min(100, data.price.financialProjections.profitability.netMargin * 10));
      const roiScore = Math.max(0, Math.min(100, data.price.financialProjections.profitability.roi * 2));
      const priceScore = (profitabilityScore + roiScore) / 2;
      totalScore += priceScore * 0.30;
      factors++;
    }
    
    // Promotion viability (20%)
    if (data.promotion) {
      const sentimentScore = Math.max(0, (data.promotion.sentiment.overall + 1) * 50); // Convert -1,1 to 0,100
      const segmentScore = Math.min(100, data.promotion.customerSegments.length * 20);
      const promotionScore = (sentimentScore + segmentScore) / 2;
      totalScore += promotionScore * 0.20;
      factors++;
    }
    
    return factors > 0 ? Math.round(totalScore / (factors * 0.25)) : 0;
  }

  private async assessRisks(data: CombinedAnalysisData): Promise<ReportGenerationResult['riskAssessment']> {
    logger.info('⚠️ Assessing business risks...');
    
    const risks: string[] = [];
    const mitigation: string[] = [];
    
    // Competition risks
    if (data.place?.competition.density === 'high') {
      risks.push('High competition density in target area');
      mitigation.push('Differentiate through unique menu items and superior service');
    }
    
    // Financial risks
    if (data.price?.financialProjections.profitability.netMargin < 5) {
      risks.push('Low profit margins may impact sustainability');
      mitigation.push('Optimize costs and implement revenue enhancement strategies');
    }
    
    // Market risks
    if (data.promotion?.sentiment.overall < 0.5) {
      risks.push('Market sentiment challenges for cuisine type');
      mitigation.push('Focus on quality improvement and customer experience');
    }
    
    // Determine overall risk level
    const riskCount = risks.length;
    const level: 'low' | 'medium' | 'high' = riskCount <= 2 ? 'low' : riskCount <= 4 ? 'medium' : 'high';
    
    // Add default mitigations if no specific risks identified
    if (risks.length === 0) {
      risks.push('Standard market entry risks');
      mitigation.push('Comprehensive market research and gradual market entry');
    }
    
    return { level, factors: risks, mitigation };
  }

  private async generateRecommendations(data: CombinedAnalysisData): Promise<ReportGenerationResult['recommendations']> {
    logger.info('💡 Generating strategic recommendations...');
    
    const immediate: string[] = [
      'Secure optimal location based on place analysis findings',
      'Finalize menu based on popular dish trends',
      'Set up supplier relationships for key ingredients',
      'Design restaurant layout for efficient operations'
    ];
    
    const shortTerm: string[] = [
      'Launch soft opening with limited menu',
      'Implement customer feedback collection system',
      'Establish social media presence and marketing campaigns',
      'Train staff on service standards and procedures'
    ];
    
    const longTerm: string[] = [
      'Evaluate expansion opportunities based on performance',
      'Develop customer loyalty program',
      'Consider additional revenue streams (catering, delivery)',
      'Build brand recognition and market positioning'
    ];
    
    // Add specific recommendations based on analysis data
    if (data.product) {
      immediate.push(`Focus on top 3 dishes: ${data.product.popularDishes.slice(0, 3).map(d => d.name).join(', ')}`);
    }
    
    if (data.price) {
      shortTerm.push('Monitor financial performance against projections monthly');
    }
    
    if (data.promotion) {
      shortTerm.push('Target primary customer segments identified in analysis');
    }
    
    return { immediate, shortTerm, longTerm };
  }

  private async createFinancialSummary(data: CombinedAnalysisData): Promise<ReportGenerationResult['financialSummary']> {
    logger.info('💰 Creating financial summary...');
    
    // Default values
    let initialInvestment = 2000000; // 2M THB default
    let projectedRevenue = 6000000; // 6M THB annually
    let breakEvenMonths = 18;
    let roiTimeframe = '2-3 years';
    
    // Use price analysis data if available
    if (data.price) {
      projectedRevenue = data.price.financialProjections.revenue.annually;
      breakEvenMonths = data.price.financialProjections.profitability.breakEvenPoint;
      
      // Estimate initial investment based on location and concept
      const totalCosts = Object.values(data.price.financialProjections.costs).reduce((sum, cost) => sum + cost, 0);
      initialInvestment = totalCosts * 0.4; // Rough estimate
      
      // Calculate ROI timeframe
      const roi = data.price.financialProjections.profitability.roi;
      roiTimeframe = roi > 15 ? '1-2 years' : roi > 8 ? '2-3 years' : '3-4 years';
    }
    
    return {
      initialInvestment: Math.round(initialInvestment),
      projectedRevenue: Math.round(projectedRevenue),
      breakEvenMonths,
      roiTimeframe
    };
  }

  private async defineNextSteps(data: CombinedAnalysisData, viabilityScore: number): Promise<string[]> {
    logger.info('🎯 Defining next steps...');
    
    const nextSteps: string[] = [];
    
    if (viabilityScore >= 70) {
      nextSteps.push('✅ HIGH VIABILITY: Proceed with business plan development');
      nextSteps.push('Secure financing and location as priority');
      nextSteps.push('Begin permit and licensing process');
    } else if (viabilityScore >= 50) {
      nextSteps.push('⚠️ MODERATE VIABILITY: Address identified risks before proceeding');
      nextSteps.push('Conduct additional market validation');
      nextSteps.push('Refine business model based on analysis');
    } else {
      nextSteps.push('❌ LOW VIABILITY: Reconsider or modify concept significantly');
      nextSteps.push('Explore alternative locations or cuisine types');
      nextSteps.push('Conduct deeper market research');
    }
    
    // Add specific next steps based on analysis
    nextSteps.push('Schedule meetings with potential suppliers and contractors');
    nextSteps.push('Develop detailed financial projections with accountant');
    nextSteps.push('Create marketing timeline and budget');
    nextSteps.push('Establish legal entity and business registration');
    
    return nextSteps;
  }

  private async generateVisualizations(data: CombinedAnalysisData): Promise<void> {
    logger.info('📊 Generating report visualizations...');
    
    try {
      // Generate charts using ECharts MCP
      if (data.price?.financialProjections) {
        await this.mcpManager.invokeServer(
          'echarts-visualization',
          'create_chart',
          {
            type: 'line',
            title: 'Monthly Revenue Projection',
            data: data.price.financialProjections.revenue.monthly,
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          }
        );
      }
      
      // Generate process flow diagram using Mermaid
      await this.mcpManager.invokeServer(
        'mermaid-diagrams',
        'create_diagram',
        {
          type: 'flowchart',
          title: 'Restaurant Launch Process',
          content: `
            graph TD
            A[Market Research] --> B[Location Selection]
            B --> C[Menu Development]
            C --> D[Financial Planning]
            D --> E[Permits & Licensing]
            E --> F[Restaurant Setup]
            F --> G[Staff Hiring]
            G --> H[Soft Opening]
            H --> I[Grand Opening]
          `
        }
      );
      
      logger.info('✅ Visualizations generated successfully');
    } catch (error) {
      logger.warn('⚠️ Visualization generation failed, continuing without charts:', error);
    }
  }
}
