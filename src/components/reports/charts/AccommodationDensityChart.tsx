"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AccommodationDensityChartProps {
  analysisType: string;
  region: string;
  data?: any;
  reportId?: string;
  className?: string;
}

export function AccommodationDensityChart({
  analysisType,
  region,
  data,
  reportId,
  className
}: AccommodationDensityChartProps) {
  // Mock data for accommodation density visualization
  const mockAccommodationData = data?.accommodationAnalysis || {
    densityMap: [
      { area: 'Sukhumvit', hotels: 85, hostels: 32, apartments: 156, density: 'High' },
      { area: 'Silom', hotels: 65, hostels: 18, apartments: 89, density: 'High' },
      { area: 'Khao San', hotels: 25, hostels: 67, apartments: 43, density: 'Medium' },
      { area: 'Chatuchak', hotels: 15, hostels: 8, apartments: 234, density: 'Medium' },
      { area: 'Thonburi', hotels: 12, hostels: 5, apartments: 178, density: 'Low' },
      { area: 'Lat Phrao', hotels: 8, hostels: 3, apartments: 267, density: 'Low' }
    ],
    accommodationTypes: [
      { type: 'Luxury Hotels', count: 45, avgPrice: 8500, occupancy: 78 },
      { type: 'Budget Hotels', count: 125, avgPrice: 1200, occupancy: 85 },
      { type: 'Hostels', count: 89, avgPrice: 450, occupancy: 92 },
      { type: 'Serviced Apartments', count: 234, avgPrice: 2800, occupancy: 73 },
      { type: 'Vacation Rentals', count: 456, avgPrice: 1800, occupancy: 68 }
    ],
    priceRanges: [
      { range: '฿300-800', properties: 178, category: 'Budget' },
      { range: '฿800-2000', properties: 289, category: 'Mid-range' },
      { range: '฿2000-5000', properties: 156, category: 'Premium' },
      { range: '฿5000+', properties: 67, category: 'Luxury' }
    ]
  };

  const getAnalysisTitle = (type: string): string => {
    switch (type) {
      case 'density_mapping':
        return 'Accommodation Density Mapping';
      case 'type_distribution':
        return 'Accommodation Type Distribution';
      case 'price_segments':
        return 'Price Segment Analysis';
      case 'occupancy_rates':
        return 'Occupancy Rate Analysis';
      case 'capacity_analysis':
        return 'Market Capacity Analysis';
      default:
        return 'Accommodation Density Analysis';
    }
  };

  const getDensityColor = (density: string): string => {
    switch (density) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const renderDensityMapping = () => (
    <div className="space-y-4">
      <div className="grid gap-4">
        {mockAccommodationData.densityMap.map((area: any, index: number) => (
          <div key={area.area} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className={cn("w-4 h-4 rounded-sm", getDensityColor(area.density))}
                />
                <span className="font-medium">{area.area}</span>
              </div>
              <Badge variant="outline">{area.density} Density</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                {area.hotels}H • {area.hostels}Ho • {area.apartments}A
              </div>
              <div className="text-sm font-medium">
                {area.hotels + area.hostels + area.apartments} total
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-4">
        <div className="flex items-center space-x-1">
          <span>H = Hotels</span>
          <span>•</span>
          <span>Ho = Hostels</span>
          <span>•</span>
          <span>A = Apartments</span>
        </div>
      </div>
    </div>
  );

  const renderTypeDistribution = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockAccommodationData.accommodationTypes.map((type: any, index: number) => (
          <div key={type.type} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{type.type}</h4>
              <Badge
                variant={type.occupancy > 80 ? "default" : "secondary"}
                className={type.occupancy > 80 ? "bg-green-500" : ""}
              >
                {type.occupancy}% occupancy
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Properties</span>
                <span className="font-medium">{type.count}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(type.count / 500) * 100}%`,
                    backgroundColor: `hsl(${index * 60}, 65%, 50%)`
                  }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg Price</span>
                <span className="font-medium">฿{type.avgPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPriceSegmentChart = () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex items-end space-x-4 h-64">
          {mockAccommodationData.priceRanges.map((range: any, index: number) => (
            <div key={range.range} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t transition-all duration-300"
                style={{
                  height: `${(range.properties / 300) * 100}%`,
                  backgroundColor: `hsl(${index * 90}, 70%, 50%)`,
                  minHeight: '30px'
                }}
              />
              <div className="mt-2 text-center">
                <div className="text-xs font-medium">{range.range}</div>
                <div className="text-xs text-muted-foreground">{range.category}</div>
                <div className="text-xs text-muted-foreground">
                  {range.properties} units
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between text-xs text-muted-foreground">
          <span>0 units</span>
          <span>Accommodation Count by Price Range</span>
          <span>300+ units</span>
        </div>
      </div>
    </div>
  );

  const renderCapacityAnalysis = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-6 border rounded-lg">
          <div className="text-2xl font-bold text-blue-600">1,247</div>
          <div className="text-sm text-muted-foreground">Total Properties</div>
          <div className="mt-2 text-xs">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
              Market Coverage
            </span>
          </div>
        </div>
        <div className="text-center p-6 border rounded-lg">
          <div className="text-2xl font-bold text-green-600">76.8%</div>
          <div className="text-sm text-muted-foreground">Avg Occupancy</div>
          <div className="mt-2 text-xs">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
              Market Health
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Market Saturation</span>
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-background rounded-full h-2">
              <div className="w-3/5 h-2 bg-yellow-500 rounded-full"></div>
            </div>
            <span className="text-sm font-medium">Medium</span>
          </div>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Growth Potential</span>
          <Badge variant="outline">Moderate</Badge>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Avg Daily Rate</span>
          <span className="text-sm font-medium">฿2,350</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Seasonal Variance</span>
          <span className="text-sm font-medium">±15% peak/low</span>
        </div>
      </div>
    </div>
  );

  const renderOccupancyHeatmap = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {mockAccommodationData.accommodationTypes.slice(0, 6).map((type: any, index: number) => (
          <div key={type.type} className="text-center">
            <div
              className="w-full h-16 rounded flex items-center justify-center text-white font-medium mb-2 transition-all duration-300"
              style={{
                backgroundColor: `hsl(${120 - (type.occupancy / 100) * 60}, 70%, 50%)`,
                opacity: 0.7 + (type.occupancy / 100) * 0.3
              }}
            >
              {type.occupancy}%
            </div>
            <div className="text-xs font-medium truncate">{type.type}</div>
            <div className="text-xs text-muted-foreground">฿{type.avgPrice}</div>
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Occupancy rates by accommodation type (current month)
      </div>
    </div>
  );

  const renderContent = () => {
    switch (analysisType) {
      case 'density_mapping':
        return renderDensityMapping();
      case 'type_distribution':
        return renderTypeDistribution();
      case 'price_segments':
        return renderPriceSegmentChart();
      case 'occupancy_rates':
        return renderOccupancyHeatmap();
      case 'capacity_analysis':
        return renderCapacityAnalysis();
      default:
        return renderDensityMapping();
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
          Accommodation market density and distribution for {region} area
        </p>
      </CardHeader>
      <CardContent>
        {renderContent()}

        {/* Market Insights Section */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium mb-2">Market Insights</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• Sukhumvit and Silom show highest accommodation density with premium mix</p>
            <p>• Budget accommodations maintain strongest occupancy rates at 85-92%</p>
            <p>• Mid-range segment (฿800-2000) represents largest market share</p>
            <p>• Seasonal variance of ±15% indicates stable year-round demand</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}