"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DeliveryMarketChartProps {
  analysisType: string;
  region: string;
  data?: any;
  reportId?: string;
  className?: string;
}

export function DeliveryMarketChart({
  analysisType,
  region,
  data,
  reportId,
  className
}: DeliveryMarketChartProps) {
  // Mock data for visualization - will be replaced with real data integration
  const mockPlatformData = data?.platformAnalysis || {
    platforms: [
      { name: 'FoodPanda', marketShare: 45, commission: 22, onboardingTime: '2-3 weeks' },
      { name: 'Grab Food', marketShare: 35, commission: 18, onboardingTime: '1-2 weeks' },
      { name: 'Line Man', marketShare: 15, commission: 20, onboardingTime: '2-4 weeks' },
      { name: 'Others', marketShare: 5, commission: 25, onboardingTime: '3-6 weeks' }
    ]
  };

  const getAnalysisTitle = (type: string): string => {
    switch (type) {
      case 'platform_comparison':
        return 'Platform Market Share Analysis';
      case 'market_share':
        return 'Delivery Market Share Distribution';
      case 'fee_structures':
        return 'Commission Fee Comparison';
      case 'merchant_requirements':
        return 'Merchant Onboarding Requirements';
      case 'technology_features':
        return 'Technology Feature Comparison';
      default:
        return 'Delivery Market Analysis';
    }
  };

  const renderPlatformComparison = () => (
    <div className="space-y-4">
      <div className="grid gap-4">
        {mockPlatformData.platforms.map((platform: any, index: number) => (
          <div key={platform.name} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                />
                <span className="font-medium">{platform.name}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{platform.marketShare}% market</Badge>
              <Badge variant="secondary">{platform.commission}% commission</Badge>
              <span className="text-sm text-muted-foreground">{platform.onboardingTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMarketShareVisualization = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {mockPlatformData.platforms.slice(0, 4).map((platform: any, index: number) => (
          <div key={platform.name} className="text-center p-4 border rounded-lg">
            <div className="relative w-20 h-20 mx-auto mb-2">
              <svg viewBox="0 0 42 42" className="w-full h-full">
                <circle
                  cx="21"
                  cy="21"
                  r="15.5"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted"
                />
                <circle
                  cx="21"
                  cy="21"
                  r="15.5"
                  fill="transparent"
                  stroke={`hsl(${index * 60}, 70%, 50%)`}
                  strokeWidth="2"
                  strokeDasharray={`${platform.marketShare * 0.97} ${100 - platform.marketShare * 0.97}`}
                  strokeDashoffset="25"
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold">{platform.marketShare}%</span>
              </div>
            </div>
            <h4 className="font-medium">{platform.name}</h4>
            <p className="text-xs text-muted-foreground">{platform.commission}% fee</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeeStructures = () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex items-end space-x-2 h-48">
          {mockPlatformData.platforms.map((platform: any, index: number) => (
            <div key={platform.name} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t transition-all duration-300"
                style={{
                  height: `${(platform.commission / 25) * 100}%`,
                  backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                  minHeight: '20px'
                }}
              />
              <div className="mt-2 text-center">
                <div className="text-sm font-medium">{platform.commission}%</div>
                <div className="text-xs text-muted-foreground truncate">{platform.name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>Commission Rate</span>
          <span>25%</span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (analysisType) {
      case 'platform_comparison':
        return renderPlatformComparison();
      case 'market_share':
        return renderMarketShareVisualization();
      case 'fee_structures':
        return renderFeeStructures();
      case 'merchant_requirements':
        return renderPlatformComparison(); // Reuse with different focus
      case 'technology_features':
        return renderPlatformComparison(); // Reuse with tech focus
      default:
        return renderPlatformComparison();
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{getAnalysisTitle(analysisType)}</CardTitle>
          <Badge variant="outline">{region}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Delivery platform analysis for {region} market
        </p>
      </CardHeader>
      <CardContent>
        {renderContent()}

        {/* Key Insights Section */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium mb-2">Key Insights</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• FoodPanda leads with 45% market share but highest commission rates</p>
            <p>• Grab Food offers competitive 18% commission with fastest onboarding</p>
            <p>• Line Man provides regional strength with moderate fees</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}