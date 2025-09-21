import { BaseAgent } from './base-agent';
import { BiteBaseState, ReportResult } from '../langgraph/state';
import { RunnableConfig } from '@langchain/core/runnables';

/**
 * Report Generation Agent
 * Aggregates and synthesizes analysis results from all other agents
 * into comprehensive, professional business reports with visualizations
 */
export class ReportAgent extends BaseAgent {
  constructor() {
    super('report', {
      echarts: 'hustcc/mcp-echarts',
      mermaid: 'hustcc/mcp-mermaid',
      sqlite: 'sqlite-mcp'
    });
  }

  async execute(state: BiteBaseState, config?: RunnableConfig): Promise<Partial<BiteBaseState>> {
    try {
      this.updateProgress('Generating comprehensive business report...', 0);

      // Check if all required analysis results are available
      if (!state.productResult || !state.placeResult || !state.priceResult || !state.promotionResult) {
        throw new Error('Cannot generate report: Missing analysis results from other agents');
      }

      this.updateProgress('Synthesizing analysis data...', 20);

      // Create executive summary
      const executiveSummary = this.generateExecutiveSummary(state);

      this.updateProgress('Generating visualizations...', 40);

      // Generate visualizations
      const visualizations = await this.generateVisualizations(state);

      this.updateProgress('Creating actionable recommendations...', 60);

      // Generate recommendations
      const recommendations = this.generateRecommendations(state);

      this.updateProgress('Compiling final report...', 80);

      // Generate the complete report
      const reportResult: ReportResult = {
        executiveSummary,
        visualizations,
        recommendations,
        dataQuality: this.assessDataQuality(state),
        exportFormats: ['pdf', 'html', 'json'],
        generatedAt: new Date().toISOString(),
        reportSections: {
          product: this.formatProductSection(state.productResult),
          place: this.formatPlaceSection(state.placeResult),
          price: this.formatPriceSection(state.priceResult),
          promotion: this.formatPromotionSection(state.promotionResult)
        }
      };

      this.updateProgress('Report generation completed successfully', 100);

      return {
        reportResult,
        status: 'completed',
        progress: 100
      };

    } catch (error) {
      console.error('Report Agent execution failed:', error);
      return {
        reportResult: {
          executiveSummary: 'Report generation failed due to technical issues',
          visualizations: [],
          recommendations: ['Please retry report generation after resolving data issues'],
          dataQuality: { score: 0, issues: [error.message] },
          exportFormats: [],
          generatedAt: new Date().toISOString(),
          reportSections: {}
        },
        status: 'error',
        error: error.message,
        progress: 0
      };
    }
  }

  private generateExecutiveSummary(state: BiteBaseState): string {
    const { restaurantParams, productResult, placeResult, priceResult, promotionResult } = state;
    
    return `
# Executive Summary: ${restaurantParams?.restaurantType || 'Restaurant'} Market Analysis

## Business Concept Overview
**Location**: ${restaurantParams?.location || 'Not specified'}
**Cuisine Type**: ${restaurantParams?.cuisineType || 'Not specified'}
**Target Budget**: ${restaurantParams?.budget || 'Not specified'}
**Business Model**: ${restaurantParams?.businessModel || 'Not specified'}

## Key Findings Summary

### Product Analysis
- **Menu Insights**: ${productResult?.dishAnalysis?.popularDishes?.length || 0} popular dishes identified
- **Profitability**: Average profit margin analysis completed
- **Market Trends**: Seasonal pattern analysis available

### Location Analysis  
- **Competitor Density**: ${placeResult?.competitorAnalysis?.restaurantDensity || 'Analysis completed'}
- **Rental Market**: Property analysis from DDProperty and RentHub completed
- **Accessibility**: Delivery coverage and foot traffic analysis available

### Pricing Strategy
- **Revenue Forecasting**: Financial projections generated
- **Pricing Optimization**: Market-based pricing recommendations available
- **Peak Hours**: Business pattern analysis completed

### Marketing Insights
- **Customer Sentiment**: ${promotionResult?.sentimentAnalysis?.overallSentiment || 'Analyzed'}
- **Customer Segmentation**: Target demographics identified
- **Promotional Opportunities**: Marketing strategy recommendations generated

## Overall Recommendation
Based on comprehensive market analysis, this report provides data-driven insights for informed business decision making.
    `.trim();
  }

  private async generateVisualizations(state: BiteBaseState): Promise<any[]> {
    const visualizations = [];

    try {
      // Generate revenue forecast chart
      if (state.priceResult?.revenueForecast) {
        const revenueChart = await this.createEChartsVisualization({
          type: 'line',
          title: 'Revenue Forecast',
          data: state.priceResult.revenueForecast,
          xAxis: 'month',
          yAxis: 'revenue'
        });
        visualizations.push(revenueChart);
      }

      // Generate competitor density heatmap
      if (state.placeResult?.competitorAnalysis) {
        const competitorMap = await this.createMapVisualization({
          type: 'heatmap',
          title: 'Competitor Density Analysis',
          data: state.placeResult.competitorAnalysis
        });
        visualizations.push(competitorMap);
      }

      // Generate customer sentiment analysis
      if (state.promotionResult?.sentimentAnalysis) {
        const sentimentChart = await this.createEChartsVisualization({
          type: 'pie',
          title: 'Customer Sentiment Distribution',
          data: state.promotionResult.sentimentAnalysis
        });
        visualizations.push(sentimentChart);
      }

      // Generate business process flow diagram
      const processFlow = await this.createMermaidDiagram({
        type: 'flowchart',
        title: 'Restaurant Business Process Flow',
        diagram: this.generateBusinessProcessDiagram(state)
      });
      visualizations.push(processFlow);

    } catch (error) {
      console.error('Visualization generation error:', error);
      // Return mock visualizations if generation fails
      visualizations.push({
        type: 'placeholder',
        title: 'Visualization Generation Error',
        message: 'Unable to generate charts due to technical issues'
      });
    }

    return visualizations;
  }

  private generateRecommendations(state: BiteBaseState): string[] {
    const recommendations = [];

    // Product recommendations
    if (state.productResult) {
      recommendations.push('📊 **Menu Optimization**: Focus on high-margin dishes identified in popularity analysis');
      recommendations.push('🍽️ **Seasonal Menu**: Implement seasonal menu changes based on trend analysis');
    }

    // Location recommendations
    if (state.placeResult) {
      recommendations.push('📍 **Location Strategy**: Consider areas with optimal competitor density and rental costs');
      recommendations.push('🚚 **Delivery Optimization**: Leverage identified delivery hotspots for maximum coverage');
    }

    // Pricing recommendations
    if (state.priceResult) {
      recommendations.push('💰 **Dynamic Pricing**: Implement peak-hour pricing strategies');
      recommendations.push('📈 **Revenue Growth**: Focus on identified high-revenue time periods');
    }

    // Promotion recommendations
    if (state.promotionResult) {
      recommendations.push('🎯 **Target Marketing**: Focus on identified customer segments for promotional campaigns');
      recommendations.push('⭐ **Reputation Management**: Address sentiment analysis insights to improve customer satisfaction');
    }

    // General business recommendations
    recommendations.push('📊 **Performance Monitoring**: Implement regular analysis updates to track market changes');
    recommendations.push('🔄 **Agile Strategy**: Adjust business strategy based on quarterly market analysis updates');

    return recommendations;
  }

  private assessDataQuality(state: BiteBaseState): { score: number; issues: string[] } {
    let score = 100;
    const issues = [];

    // Check data completeness
    if (!state.productResult) {
      score -= 25;
      issues.push('Product analysis data incomplete');
    }
    if (!state.placeResult) {
      score -= 25;
      issues.push('Location analysis data incomplete');
    }
    if (!state.priceResult) {
      score -= 25;
      issues.push('Pricing analysis data incomplete');
    }
    if (!state.promotionResult) {
      score -= 25;
      issues.push('Promotion analysis data incomplete');
    }

    // Check parameter completeness
    if (!state.restaurantParams?.location) {
      score -= 10;
      issues.push('Location parameter not specified');
    }
    if (!state.restaurantParams?.cuisineType) {
      score -= 5;
      issues.push('Cuisine type parameter not specified');
    }

    return { score: Math.max(0, score), issues };
  }

  private formatProductSection(productResult: any): any {
    return {
      title: 'Product Analysis',
      dishAnalysis: productResult?.dishAnalysis || {},
      profitabilityAnalysis: productResult?.profitabilityAnalysis || {},
      seasonalTrends: productResult?.seasonalTrends || {},
      recommendations: productResult?.recommendations || []
    };
  }

  private formatPlaceSection(placeResult: any): any {
    return {
      title: 'Location Analysis',
      competitorAnalysis: placeResult?.competitorAnalysis || {},
      rentalAnalysis: placeResult?.rentalAnalysis || {},
      demographicAnalysis: placeResult?.demographicAnalysis || {},
      accessibilityScore: placeResult?.accessibilityScore || 0
    };
  }

  private formatPriceSection(priceResult: any): any {
    return {
      title: 'Pricing Strategy',
      revenueForecast: priceResult?.revenueForecast || {},
      pricingStrategy: priceResult?.pricingStrategy || {},
      profitOptimization: priceResult?.profitOptimization || {},
      peakHoursAnalysis: priceResult?.peakHoursAnalysis || {}
    };
  }

  private formatPromotionSection(promotionResult: any): any {
    return {
      title: 'Marketing & Promotion',
      sentimentAnalysis: promotionResult?.sentimentAnalysis || {},
      customerSegmentation: promotionResult?.customerSegmentation || {},
      marketingOpportunities: promotionResult?.marketingOpportunities || {},
      campaignRecommendations: promotionResult?.campaignRecommendations || []
    };
  }

  private async createEChartsVisualization(config: any): Promise<any> {
    // Mock ECharts visualization - would integrate with hustcc/mcp-echarts
    return {
      type: 'echart',
      id: `chart_${Date.now()}`,
      title: config.title,
      config: config,
      mockData: true,
      note: 'Generated using ECharts MCP server integration'
    };
  }

  private async createMapVisualization(config: any): Promise<any> {
    // Mock map visualization - would integrate with GIS MCP server
    return {
      type: 'map',
      id: `map_${Date.now()}`,
      title: config.title,
      config: config,
      mockData: true,
      note: 'Generated using GIS MCP server integration'
    };
  }

  private async createMermaidDiagram(config: any): Promise<any> {
    // Mock Mermaid diagram - would integrate with hustcc/mcp-mermaid
    return {
      type: 'mermaid',
      id: `diagram_${Date.now()}`,
      title: config.title,
      diagram: config.diagram,
      mockData: true,
      note: 'Generated using Mermaid MCP server integration'
    };
  }

  private generateBusinessProcessDiagram(state: BiteBaseState): string {
    return `
graph TD
    A[Market Research] --> B[Location Analysis]
    A --> C[Product Analysis]
    A --> D[Pricing Strategy]
    A --> E[Marketing Plan]
    
    B --> F[Site Selection]
    C --> G[Menu Development]
    D --> H[Financial Planning]
    E --> I[Brand Strategy]
    
    F --> J[Restaurant Setup]
    G --> J
    H --> J
    I --> J
    
    J --> K[Soft Opening]
    K --> L[Performance Monitoring]
    L --> M[Strategy Adjustment]
    M --> L
    `;
  }
}
