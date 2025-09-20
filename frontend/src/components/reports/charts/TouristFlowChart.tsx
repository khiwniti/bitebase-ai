"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TouristFlowChartProps {
  analysisType: string;
  region: string;
  data?: any;
  reportId?: string;
  className?: string;
}

export function TouristFlowChart({
  analysisType,
  region,
  data,
  reportId,
  className
}: TouristFlowChartProps) {
  // Mock data for tourist flow visualization
  const mockTouristData = data?.touristAnalysis || {
    hourlyFlow: [
      { hour: '6-8 AM', domestic: 12, international: 8, total: 20 },
      { hour: '8-10 AM', domestic: 45, international: 28, total: 73 },
      { hour: '10-12 PM', domestic: 78, international: 52, total: 130 },
      { hour: '12-2 PM', domestic: 95, international: 68, total: 163 },
      { hour: '2-4 PM', domestic: 112, international: 85, total: 197 },
      { hour: '4-6 PM', domestic: 134, international: 98, total: 232 },
      { hour: '6-8 PM', domestic: 156, international: 142, total: 298 },
      { hour: '8-10 PM', domestic: 89, international: 76, total: 165 }
    ],
    demographics: [
      { type: 'Business Travelers', percentage: 35, avgStay: 2.5, spending: 4200 },
      { type: 'Leisure Tourists', percentage: 40, avgStay: 5.2, spending: 3800 },
      { type: 'Digital Nomads', percentage: 15, avgStay: 14.8, spending: 2100 },
      { type: 'Backpackers', percentage: 10, avgStay: 8.3, spending: 950 }
    ],
    seasonalTrends: [
      { month: 'Jan', visitors: 285000, occupancy: 78, avgPrice: 3200 },
      { month: 'Feb', visitors: 320000, occupancy: 85, avgPrice: 3600 },
      { month: 'Mar', visitors: 298000, occupancy: 82, avgPrice: 3400 },
      { month: 'Apr', visitors: 195000, occupancy: 65, avgPrice: 2800 },
      { month: 'May', visitors: 178000, occupancy: 58, avgPrice: 2400 },
      { month: 'Jun', visitors: 165000, occupancy: 55, avgPrice: 2200 }
    ],
    hotspots: [
      { location: 'Sukhumvit BTS', intensity: 92, category: 'Transport Hub' },
      { location: 'Chatuchak Market', intensity: 88, category: 'Shopping' },
      { location: 'Khao San Road', intensity: 76, category: 'Entertainment' },
      { location: 'Wat Pho Temple', intensity: 71, category: 'Cultural' },
      { location: 'MBK Center', intensity: 65, category: 'Shopping' },
      { location: 'Lumpini Park', intensity: 58, category: 'Recreation' }
    ]
  };

  const getAnalysisTitle = (type: string): string => {
    switch (type) {
      case 'hourly_patterns':
        return 'Tourist Flow Patterns';
      case 'demographic_analysis':
        return 'Tourist Demographics';
      case 'seasonal_trends':
        return 'Seasonal Tourism Trends';
      case 'hotspot_analysis':
        return 'Tourist Hotspot Analysis';
      case 'flow_density':
        return 'Tourist Density Mapping';
      default:
        return 'Tourist Flow Analysis';
    }
  };

  const getIntensityColor = (intensity: number): string => {
    if (intensity >= 80) return 'bg-red-500';
    if (intensity >= 60) return 'bg-orange-500';
    if (intensity >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const renderHourlyFlow = () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex items-end space-x-2 h-64">
          {mockTouristData.hourlyFlow.map((flow: any, index: number) => (
            <div key={flow.hour} className="flex-1 flex flex-col items-center">
              <div className="flex flex-col w-full space-y-1">
                <div
                  className="w-full rounded-t transition-all duration-300"
                  style={{
                    height: `${(flow.international / 300) * 100}%`,
                    backgroundColor: `hsl(${200}, 70%, 60%)`,
                    minHeight: '10px'
                  }}
                />
                <div
                  className="w-full transition-all duration-300"
                  style={{
                    height: `${(flow.domestic / 300) * 100}%`,
                    backgroundColor: `hsl(${120}, 70%, 50%)`,
                    minHeight: '15px'
                  }}
                />
              </div>
              <div className="mt-2 text-center">
                <div className="text-xs font-medium">{flow.hour}</div>
                <div className="text-xs text-muted-foreground">{flow.total}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Domestic Tourists</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>International Tourists</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDemographics = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTouristData.demographics.map((demo: any, index: number) => (
          <div key={demo.type} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{demo.type}</h4>
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
                    backgroundColor: `hsl(${index * 80}, 65%, 50%)`
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Stay</span>
                  <span className="font-medium">{demo.avgStay} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spending</span>
                  <span className="font-medium">฿{demo.spending.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSeasonalTrends = () => (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex items-end space-x-3 h-64">
          {mockTouristData.seasonalTrends.map((trend: any, index: number) => (
            <div key={trend.month} className="flex-1 flex flex-col items-center">
              <div className="flex flex-col items-center space-y-1 mb-2">
                <div
                  className="w-full rounded-t transition-all duration-300"
                  style={{
                    height: `${(trend.visitors / 350000) * 100}%`,
                    backgroundColor: `hsl(${220 + index * 20}, 70%, 55%)`,
                    minHeight: '30px'
                  }}
                />
                <div
                  className="w-3/4 rounded transition-all duration-300 opacity-70"
                  style={{
                    height: `${(trend.occupancy / 100) * 60}%`,
                    backgroundColor: `hsl(${30 + index * 15}, 65%, 60%)`,
                    minHeight: '15px'
                  }}
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-medium">{trend.month}</div>
                <div className="text-xs text-muted-foreground">
                  {(trend.visitors / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-muted-foreground">
                  {trend.occupancy}%
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Visitor Volume</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded opacity-70"></div>
            <span>Occupancy Rate</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHotspotAnalysis = () => (
    <div className="space-y-4">
      <div className="grid gap-3">
        {mockTouristData.hotspots.map((hotspot: any, index: number) => (
          <div key={hotspot.location} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className={cn("w-4 h-4 rounded-sm", getIntensityColor(hotspot.intensity))}
                />
                <span className="font-medium">{hotspot.location}</span>
              </div>
              <Badge variant="secondary">{hotspot.category}</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium">{hotspot.intensity}%</div>
                <div className="text-xs text-muted-foreground">intensity</div>
              </div>
              <div className="w-20 bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${hotspot.intensity}%`,
                    backgroundColor: getIntensityColor(hotspot.intensity).replace('bg-', '').split('-')[0] === 'red' ? '#ef4444' :
                      getIntensityColor(hotspot.intensity).replace('bg-', '').split('-')[0] === 'orange' ? '#f97316' :
                      getIntensityColor(hotspot.intensity).replace('bg-', '').split('-')[0] === 'yellow' ? '#eab308' : '#22c55e'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-4">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
          <span>High (80%+)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
          <span>Medium (60-79%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
          <span>Moderate (40-59%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <span>Low (0-39%)</span>
        </div>
      </div>
    </div>
  );

  const renderFlowDensityHeatmap = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {mockTouristData.hourlyFlow.slice(0, 8).map((flow: any, index: number) => (
          <div key={flow.hour} className="text-center">
            <div
              className="w-full h-16 rounded flex items-center justify-center text-white font-medium mb-2 transition-all duration-300"
              style={{
                backgroundColor: `hsl(${index * 30}, 70%, ${50 + (flow.total / 300) * 30}%)`,
                opacity: 0.6 + (flow.total / 300) * 0.4
              }}
            >
              {flow.total}
            </div>
            <div className="text-xs font-medium">{flow.hour}</div>
            <div className="text-xs text-muted-foreground">
              D:{flow.domestic} | I:{flow.international}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Tourist density by time period (D = Domestic, I = International)
      </div>
    </div>
  );

  const renderContent = () => {
    switch (analysisType) {
      case 'hourly_patterns':
        return renderHourlyFlow();
      case 'demographic_analysis':
        return renderDemographics();
      case 'seasonal_trends':
        return renderSeasonalTrends();
      case 'hotspot_analysis':
        return renderHotspotAnalysis();
      case 'flow_density':
        return renderFlowDensityHeatmap();
      default:
        return renderHourlyFlow();
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
          Tourist flow and behavior analysis for {region} area
        </p>
      </CardHeader>
      <CardContent>
        {renderContent()}

        {/* Tourism Insights Section */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium mb-2">Tourism Insights</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• Peak tourist activity occurs during evening hours (6-8 PM) with 298 visitors</p>
            <p>• Leisure tourists dominate at 40% market share with ฿3,800 average spending</p>
            <p>• Sukhumvit BTS and Chatuchak Market show highest tourist intensity (88-92%)</p>
            <p>• February peaks with 320K visitors and 85% accommodation occupancy</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}