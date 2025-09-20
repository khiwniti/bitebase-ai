"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PropertyMarketChartProps {
  analysisType: string;
  region: string;
  data?: any;
  reportId?: string;
  className?: string;
}

export function PropertyMarketChart({
  analysisType,
  region,
  data,
  reportId,
  className
}: PropertyMarketChartProps) {
  // Mock data for property market visualization
  const mockPropertyData = data?.propertyAnalysis || {
    priceRanges: [
      { range: '฿10-15M', properties: 45, avgSize: 120, avgPrice: 12500000 },
      { range: '฿15-25M', properties: 28, avgSize: 160, avgPrice: 20000000 },
      { range: '฿25-40M', properties: 18, avgSize: 220, avgPrice: 32500000 },
      { range: '฿40M+', properties: 9, avgSize: 350, avgPrice: 55000000 }
    ],
    pricePerSqm: [
      { district: 'Sukhumvit', price: 180000, growth: 8.5, properties: 120 },
      { district: 'Silom', price: 165000, growth: 6.2, properties: 95 },
      { district: 'Ploenchit', price: 220000, growth: 12.1, properties: 78 },
      { district: 'Ratchada', price: 95000, growth: 15.3, properties: 156 }
    ],
    marketTrends: [
      { month: 'Jan', avgPrice: 16800000, volume: 145 },
      { month: 'Feb', avgPrice: 17200000, volume: 132 },
      { month: 'Mar', avgPrice: 17650000, volume: 168 },
      { month: 'Apr', avgPrice: 18100000, volume: 189 },
      { month: 'May', avgPrice: 18450000, volume: 201 },
      { month: 'Jun', avgPrice: 18900000, volume: 178 }
    ]
  };

  const getAnalysisTitle = (type: string): string => {
    switch (type) {
      case 'price_analysis':
        return 'Property Price Analysis';
      case 'market_trends':
        return 'Market Trend Analysis';
      case 'location_premium':
        return 'Location Premium Analysis';
      case 'investment_potential':
        return 'Investment Potential Analysis';
      case 'rental_yield':
        return 'Rental Yield Analysis';
      default:
        return 'Property Market Analysis';
    }
  };

  const renderPriceRangeDistribution = () => (
    <div className="space-y-4">
      <div className="grid gap-4">
        {mockPropertyData.priceRanges.map((range: any, index: number) => (
          <div key={range.range} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: `hsl(${index * 50}, 65%, 55%)` }}
                />
                <span className="font-medium">{range.range}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{range.properties} units</Badge>
              <Badge variant="secondary">{range.avgSize}m²</Badge>
              <span className="text-sm text-muted-foreground">
                ฿{(range.avgPrice / 1000000).toFixed(1)}M avg
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLocationPremium = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockPropertyData.pricePerSqm.map((location: any, index: number) => (
          <div key={location.district} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{location.district}</h4>
              <Badge
                variant={location.growth > 10 ? "default" : "secondary"}
                className={location.growth > 10 ? "bg-green-500" : ""}
              >
                +{location.growth}%
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price per m²</span>
                <span className="font-medium">฿{location.price.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(location.price / 250000) * 100}%`,
                    backgroundColor: `hsl(${index * 70}, 65%, 50%)`
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Available Units</span>
                <span>{location.properties}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMarketTrendChart = () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex items-end space-x-3 h-64">
          {mockPropertyData.marketTrends.map((trend: any, index: number) => (
            <div key={trend.month} className="flex-1 flex flex-col items-center">
              <div className="flex flex-col items-center space-y-1 mb-2">
                <div
                  className="w-full rounded-t transition-all duration-300"
                  style={{
                    height: `${(trend.avgPrice / 20000000) * 100}%`,
                    backgroundColor: `hsl(${200 + index * 15}, 70%, 50%)`,
                    minHeight: '30px'
                  }}
                />
                <div
                  className="w-full rounded-t transition-all duration-300 opacity-60"
                  style={{
                    height: `${(trend.volume / 250) * 80}%`,
                    backgroundColor: `hsl(${120 + index * 10}, 60%, 45%)`,
                    minHeight: '20px'
                  }}
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-medium">{trend.month}</div>
                <div className="text-xs text-muted-foreground">
                  ฿{(trend.avgPrice / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-muted-foreground">
                  {trend.volume} sales
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Average Price</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded opacity-60"></div>
            <span>Sales Volume</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvestmentMetrics = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-6 border rounded-lg">
          <div className="text-2xl font-bold text-green-600">7.8%</div>
          <div className="text-sm text-muted-foreground">Avg Rental Yield</div>
          <div className="mt-2 text-xs">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
              Above Market
            </span>
          </div>
        </div>
        <div className="text-center p-6 border rounded-lg">
          <div className="text-2xl font-bold text-blue-600">12.3%</div>
          <div className="text-sm text-muted-foreground">Price Appreciation</div>
          <div className="mt-2 text-xs">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
              12-Month Growth
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Occupancy Rate</span>
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-background rounded-full h-2">
              <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm font-medium">92%</span>
          </div>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Time to Sell</span>
          <span className="text-sm font-medium">3.2 months avg</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Price Volatility</span>
          <Badge variant="outline">Low Risk</Badge>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (analysisType) {
      case 'price_analysis':
        return renderPriceRangeDistribution();
      case 'market_trends':
        return renderMarketTrendChart();
      case 'location_premium':
        return renderLocationPremium();
      case 'investment_potential':
        return renderInvestmentMetrics();
      case 'rental_yield':
        return renderInvestmentMetrics();
      default:
        return renderLocationPremium();
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
          Property market insights for {region} area
        </p>
      </CardHeader>
      <CardContent>
        {renderContent()}

        {/* Market Insights Section */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium mb-2">Market Insights</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• Premium locations show 12.1% price growth with strong demand</p>
            <p>• Mid-range properties (฿15-25M) offer best value-to-size ratio</p>
            <p>• Rental yields average 7.8% with 92% occupancy rates</p>
            <p>• Market shows low volatility with 3.2-month average sale time</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}