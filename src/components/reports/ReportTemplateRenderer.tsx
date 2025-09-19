"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import {
  ReportSection,
  ReportSectionProps,
  ReportTemplate,
  ReportData,
  ReportConfiguration
} from './types';

interface ReportTemplateRendererProps {
  template: ReportTemplate;
  configuration: ReportConfiguration;
  data?: ReportData;
  sections: ReportSection[];
  editable?: boolean;
  onSectionEdit?: (sectionId: string, config: any) => void;
  onSectionToggle?: (sectionId: string, visible: boolean) => void;
  className?: string;
}

export function ReportTemplateRenderer({
  template,
  configuration,
  data,
  sections,
  editable = false,
  onSectionEdit,
  onSectionToggle,
  className
}: ReportTemplateRendererProps) {
  const visibleSections = sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  const renderSection = (section: ReportSection) => (
    <ReportSectionRenderer
      key={section.id}
      section={section}
      data={data}
      editable={editable}
      onEdit={onSectionEdit ? (config) => onSectionEdit(section.id, config) : undefined}
      onToggle={onSectionToggle ? (visible) => onSectionToggle(section.id, visible) : undefined}
    />
  );

  switch (template.layout) {
    case 'single-column':
      return (
        <div className={cn("space-y-6", className)}>
          {visibleSections.map(renderSection)}
        </div>
      );

    case 'two-column':
      const midpoint = Math.ceil(visibleSections.length / 2);
      const leftSections = visibleSections.slice(0, midpoint);
      const rightSections = visibleSections.slice(midpoint);

      return (
        <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6", className)}>
          <div className="space-y-6">
            {leftSections.map(renderSection)}
          </div>
          <div className="space-y-6">
            {rightSections.map(renderSection)}
          </div>
        </div>
      );

    case 'dashboard':
      return (
        <div className={cn("space-y-6", className)}>
          {/* KPI Cards Row */}
          {visibleSections.filter(s => s.type === 'kpi-cards').map(renderSection)}

          {/* Charts and Maps Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {visibleSections.filter(s => ['charts', 'maps'].includes(s.type)).map(renderSection)}
          </div>

          {/* Data Tables and Other Sections */}
          <div className="space-y-6">
            {visibleSections.filter(s => !['kpi-cards', 'charts', 'maps'].includes(s.type)).map(renderSection)}
          </div>
        </div>
      );

    case 'executive-summary':
      return (
        <div className={cn("space-y-8", className)}>
          {/* Executive Summary at top */}
          {visibleSections.filter(s => s.type === 'executive-summary').map(renderSection)}

          {/* Key insights in grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleSections.filter(s => ['kpi-cards', 'insights-list'].includes(s.type)).map(renderSection)}
          </div>

          {/* Recommendations */}
          {visibleSections.filter(s => s.type === 'recommendations').map(renderSection)}

          {/* Supporting charts if any */}
          {visibleSections.filter(s => s.type === 'charts').length > 0 && (
            <div className="space-y-6">
              {visibleSections.filter(s => s.type === 'charts').map(renderSection)}
            </div>
          )}
        </div>
      );

    default:
      return (
        <div className={cn("space-y-6", className)}>
          {visibleSections.map(renderSection)}
        </div>
      );
  }
}

function ReportSectionRenderer({
  section,
  data,
  editable,
  onEdit,
  onToggle
}: ReportSectionProps) {
  const getSectionContent = () => {
    switch (section.type) {
      case 'executive-summary':
        return (
          <div className="prose prose-sm max-w-none">
            <h2>Executive Summary</h2>
            {data?.aggregatedInsights && (
              <div>
                <h3>Key Insights</h3>
                <ul>
                  {data.aggregatedInsights.slice(0, 3).map((insight, index) => (
                    <li key={index}>{insight}</li>
                  ))}
                </ul>
              </div>
            )}
            {data?.aggregatedRecommendations && (
              <div>
                <h3>Strategic Recommendations</h3>
                <ul>
                  {data.aggregatedRecommendations.slice(0, 3).map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'kpi-cards':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.kpis?.map((kpi) => (
              <div key={kpi.id} className="p-4 border rounded-lg bg-card">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {kpi.label}
                  </span>
                  {kpi.trend && (
                    <span className={cn(
                      "text-xs px-2 py-1 rounded",
                      kpi.trend === 'up' && "bg-green-100 text-green-800",
                      kpi.trend === 'down' && "bg-red-100 text-red-800",
                      kpi.trend === 'stable' && "bg-yellow-100 text-yellow-800"
                    )}>
                      {kpi.trend}
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold">{kpi.value}</span>
                  {kpi.unit && <span className="text-sm text-muted-foreground ml-1">{kpi.unit}</span>}
                </div>
                {kpi.description && (
                  <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
                )}
              </div>
            )) || (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No KPI data available
              </div>
            )}
          </div>
        );

      case 'charts':
        return (
          <div className="space-y-6">
            {data?.chartData?.map((chart) => (
              <div key={chart.id} className="p-6 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{chart.title}</h3>
                {chart.description && (
                  <p className="text-sm text-muted-foreground mb-4">{chart.description}</p>
                )}
                <div className="h-64 flex items-center justify-center bg-muted rounded">
                  <span className="text-muted-foreground">
                    Chart: {chart.type} ({chart.data.length} data points)
                  </span>
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-muted-foreground">
                No chart data available
              </div>
            )}
          </div>
        );

      case 'insights-list':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Insights</h3>
            {data?.aggregatedInsights?.length ? (
              <ul className="space-y-2">
                {data.aggregatedInsights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                    <span className="text-sm">{insight}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">No insights available</p>
            )}
          </div>
        );

      case 'recommendations':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recommendations</h3>
            {data?.aggregatedRecommendations?.length ? (
              <div className="space-y-3">
                {data.aggregatedRecommendations.map((rec, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No recommendations available</p>
            )}
          </div>
        );

      case 'data-table':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Data Overview</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-3 text-left text-sm font-medium">Metric</th>
                    <th className="p-3 text-left text-sm font-medium">Value</th>
                    <th className="p-3 text-left text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.kpis?.map((kpi) => (
                    <tr key={kpi.id} className="border-t">
                      <td className="p-3 text-sm font-medium">{kpi.label}</td>
                      <td className="p-3 text-sm">{kpi.value} {kpi.unit}</td>
                      <td className="p-3 text-sm">
                        <span className={cn(
                          "px-2 py-1 rounded text-xs",
                          kpi.priority === 'high' && "bg-red-100 text-red-800",
                          kpi.priority === 'medium' && "bg-yellow-100 text-yellow-800",
                          kpi.priority === 'low' && "bg-green-100 text-green-800"
                        )}>
                          {kpi.priority}
                        </span>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={3} className="p-3 text-center text-muted-foreground text-sm">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'maps':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Geographic Analysis</h3>
            <div className="h-96 border rounded-lg flex items-center justify-center bg-muted">
              <span className="text-muted-foreground">
                Interactive map will be rendered here
                {data?.mapData && ` (${data.mapData.length} data points)`}
              </span>
            </div>
          </div>
        );

      // Analysis-specific sections
      case 'delivery-analysis':
      case 'customer-behavior':
      case 'property-analysis':
      case 'accommodation-density':
      case 'tourist-flow':
      case 'competitive-analysis':
      case 'market-overview':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                {section.type} analysis content will be rendered here based on data
              </p>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Timeline</h3>
            <div className="h-64 border rounded-lg flex items-center justify-center bg-muted">
              <span className="text-muted-foreground">Timeline visualization</span>
            </div>
          </div>
        );

      case 'custom-content':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Custom content area</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Section type "{section.type}" not implemented
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {editable && (
        <div className="absolute top-0 right-0 flex space-x-2 z-10">
          {onToggle && (
            <button
              onClick={() => onToggle(false)}
              className="text-xs bg-background border rounded px-2 py-1 hover:bg-muted"
            >
              Hide
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(section.config)}
              className="text-xs bg-background border rounded px-2 py-1 hover:bg-muted"
            >
              Edit
            </button>
          )}
        </div>
      )}
      {getSectionContent()}
    </div>
  );
}