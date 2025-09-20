"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CustomerBehaviorChartProps {
  analysisType: string;
  region: string;
  data?: any;
  className?: string;
}

export function CustomerBehaviorChart({
  analysisType,
  region,
  data,
  className
}: CustomerBehaviorChartProps) {
  // Mock data for customer behavior visualization
  const mockBehaviorData = data?.behaviorProfile || {
    orderingPatterns: [
      { time: '6-9 AM', orders: 15, avgValue: 180 },
      { time: '11-2 PM', orders: 35, avgValue: 320 },
      { time: '5-8 PM', orders: 45, avgValue: 450 },
      { time: '8-11 PM', orders: 25, avgValue: 380 }
    ],
    demographics: [
      { segment: 'Young Professionals', percentage: 40, avgSpend: 420 },
      { segment: 'Families', percentage: 30, avgSpend: 650 },
      { segment: 'Students', percentage: 20, avgSpend: 280 },
      { segment: 'Seniors', percentage: 10, avgSpend: 320 }
    ],
    preferences: [
      { cuisine: 'Thai Traditional', preference: 85, growth: 12 },
      { cuisine: 'International', preference: 70, growth: 25 },
      { cuisine: 'Asian Fusion', preference: 60, growth: 18 },
      { cuisine: 'Western', preference: 45, growth: 8 }
    ]
  };

  const getAnalysisTitle = (type: string): string => {
    switch (type) {
      case 'ordering_patterns':
        return 'Customer Ordering Patterns';
      case 'price_sensitivity':
        return 'Price Sensitivity Analysis';
      case 'loyalty_factors':
        return 'Customer Loyalty Factors';
      case 'seasonal_trends':
        return 'Seasonal Behavior Trends';
      case 'demographic_preferences':
        return 'Demographic Preferences';
      default:
        return 'Customer Behavior Analysis';
    }
  };

  const renderOrderingPatterns = () => (
    <div className="space-y-4">
      <div className="grid gap-4">
        {mockBehaviorData.orderingPatterns.map((pattern: any, index: number) => (
          <div key={pattern.time} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: `hsl(${index * 45}, 70%, 60%)` }}
                />
                <span className="font-medium">{pattern.time}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{pattern.orders}% of orders</Badge>
              <Badge variant="secondary">฿{pattern.avgValue} avg</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDemographicPreferences = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {mockBehaviorData.demographics.map((demo: any, index: number) => (
          <div key={demo.segment} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{demo.segment}</h4>
              <Badge variant="outline">{demo.percentage}%</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Market Share</span>
                <span>{demo.percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${demo.percentage}%`,
                    backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg Spend</span>
                <span className="font-medium">฿{demo.avgSpend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCuisinePreferences = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        {mockBehaviorData.preferences.map((pref: any, index: number) => (
          <div key={pref.cuisine} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{pref.cuisine}</span>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{pref.preference}% preference</Badge>
                <Badge
                  variant={pref.growth > 15 ? "default" : "secondary"}
                  className={pref.growth > 15 ? "bg-green-500" : ""}
                >
                  +{pref.growth}% growth
                </Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${pref.preference}%`,
                      backgroundColor: `hsl(${index * 45}, 70%, 50%)`
                    }}
                  />
                </div>
              </div>
              <div className="w-16 text-right text-sm text-muted-foreground">
                {pref.preference}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHourlyHeatmap = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {mockBehaviorData.orderingPatterns.map((pattern: any, index: number) => (
          <div key={pattern.time} className="text-center">
            <div
              className="w-full h-16 rounded flex items-center justify-center text-white font-medium mb-2 transition-all duration-300"
              style={{
                backgroundColor: `hsl(${index * 45}, 70%, ${60 - (pattern.orders / 50) * 20}%)`,
                opacity: 0.7 + (pattern.orders / 50) * 0.3
              }}
            >
              {pattern.orders}%
            </div>
            <div className="text-xs font-medium">{pattern.time}</div>
            <div className="text-xs text-muted-foreground">฿{pattern.avgValue}</div>
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Order frequency by time period (% of daily orders)
      </div>
    </div>
  );

  const renderContent = () => {
    switch (analysisType) {
      case 'ordering_patterns':
        return renderHourlyHeatmap();
      case 'demographic_preferences':
        return renderDemographicPreferences();
      case 'price_sensitivity':
        return renderOrderingPatterns();
      case 'loyalty_factors':
        return renderCuisinePreferences();
      case 'seasonal_trends':
        return renderOrderingPatterns();
      default:
        return renderDemographicPreferences();
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
          Customer behavior insights for {region} market
        </p>
      </CardHeader>
      <CardContent>
        {renderContent()}

        {/* Behavior Insights */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium mb-2">Behavioral Insights</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• Peak ordering occurs during dinner hours (5-8 PM) with highest spend</p>
            <p>• Young professionals represent 40% of customer base with medium-high spend</p>
            <p>• Thai traditional cuisine maintains 85% preference with steady growth</p>
            <p>• International cuisine shows highest growth potential at 25%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}