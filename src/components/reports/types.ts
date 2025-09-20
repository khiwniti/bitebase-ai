// Report Generation Types and Interfaces
import type {
  MarketReport,
  DeliveryMarketAnalysis,
  CustomerBehaviorAnalysis,
  PropertyMarketAnalysis,
  AccommodationDensityAnalysis,
  TouristFlowAnalysis,
  AnalysisType,
  ReportStatus
} from '../../generated/prisma';

// Core report generation interfaces
export interface ReportConfiguration {
  id?: string;
  title: string;
  description?: string;
  region: string;
  analysisType: AnalysisType;
  template: ReportTemplate;
  sections: ReportSection[];
  styling: ReportStyling;
  metadata?: Record<string, any>;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description?: string;
  layout: 'single-column' | 'two-column' | 'dashboard' | 'executive-summary';
  sections: string[]; // Array of section IDs
  defaultStyling: ReportStyling;
}

export interface ReportSection {
  id: string;
  type: ReportSectionType;
  title: string;
  order: number;
  visible: boolean;
  config: ReportSectionConfig;
  data?: any;
}

export type ReportSectionType =
  | 'executive-summary'
  | 'market-overview'
  | 'competitive-analysis'
  | 'delivery-analysis'
  | 'customer-behavior'
  | 'property-analysis'
  | 'accommodation-density'
  | 'tourist-flow'
  | 'insights-list'
  | 'recommendations'
  | 'charts'
  | 'maps'
  | 'data-table'
  | 'kpi-cards'
  | 'timeline'
  | 'custom-content';

export interface ReportSectionConfig {
  chartType?: 'bar' | 'line' | 'pie' | 'scatter' | 'map' | 'heatmap';
  showLegend?: boolean;
  showGrid?: boolean;
  interactive?: boolean;
  exportable?: boolean;
  collapsible?: boolean;
  fullWidth?: boolean;
  height?: number;
  customProps?: Record<string, any>;
}

export interface ReportStyling {
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'relaxed';
  showBranding: boolean;
  customCSS?: string;
}

// Data aggregation interfaces
export interface ReportData {
  marketReport: MarketReport;
  analysisData: AnalysisData;
  aggregatedInsights: string[];
  aggregatedRecommendations: string[];
  kpis: KPIMetric[];
  chartData: ChartDataSet[];
  mapData?: MapDataPoint[];
}

export interface AnalysisData {
  deliveryMarket?: DeliveryMarketAnalysis[];
  customerBehavior?: CustomerBehaviorAnalysis[];
  propertyMarket?: PropertyMarketAnalysis[];
  accommodationDensity?: AccommodationDensityAnalysis[];
  touristFlow?: TouristFlowAnalysis[];
}

export interface KPIMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  description?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ChartDataSet {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'radar';
  title: string;
  description?: string;
  data: ChartDataPoint[];
  xAxis?: string;
  yAxis?: string;
  categories?: string[];
  colors?: string[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
  category?: string;
  metadata?: Record<string, any>;
}

export interface MapDataPoint {
  id: string;
  lat: number;
  lng: number;
  type: 'competitor' | 'opportunity' | 'hotspot' | 'property' | 'accommodation';
  data: Record<string, any>;
  popup?: string;
}

// Report generation pipeline interfaces
export interface ReportGenerationRequest {
  reportId?: string;
  userId: string;
  configuration: ReportConfiguration;
  dataFilters?: ReportDataFilters;
  exportFormat?: 'html' | 'pdf' | 'json' | 'csv';
  scheduling?: ReportScheduling;
}

export interface ReportDataFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  regions?: string[];
  analysisTypes?: AnalysisType[];
  minConfidence?: number;
  customFilters?: Record<string, any>;
}

export interface ReportScheduling {
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate?: Date;
  timezone: string;
  recipients: string[];
}

export interface ReportGenerationResult {
  success: boolean;
  reportId?: string;
  htmlContent?: string;
  pdfUrl?: string;
  jsonData?: any;
  csvData?: string;
  error?: string;
  generatedAt: Date;
  expiresAt?: Date;
}

// Component props interfaces
export interface ReportGeneratorProps {
  reportId?: string;
  initialConfiguration?: Partial<ReportConfiguration>;
  onSave?: (config: ReportConfiguration) => void;
  onGenerate?: (request: ReportGenerationRequest) => void;
  onExport?: (format: string, reportId: string) => void;
  readonly?: boolean;
  className?: string;
}

export interface ReportViewerProps {
  reportData: ReportData;
  configuration: ReportConfiguration;
  editable?: boolean;
  onEdit?: (sectionId: string, newConfig: ReportSectionConfig) => void;
  onSectionToggle?: (sectionId: string, visible: boolean) => void;
  onExport?: (format: string) => void;
  className?: string;
}

export interface ReportSectionProps {
  section: ReportSection;
  data?: any;
  editable?: boolean;
  onEdit?: (config: ReportSectionConfig) => void;
  onToggle?: (visible: boolean) => void;
  className?: string;
}

// Template definitions
export const DEFAULT_REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: 'comprehensive-analysis',
    name: 'Comprehensive Market Analysis',
    description: 'Full market research report with all analysis types',
    layout: 'two-column',
    sections: [
      'executive-summary',
      'market-overview',
      'competitive-analysis',
      'delivery-analysis',
      'customer-behavior',
      'property-analysis',
      'accommodation-density',
      'tourist-flow',
      'insights-list',
      'recommendations'
    ],
    defaultStyling: {
      theme: 'light',
      primaryColor: '#2563eb',
      secondaryColor: '#64748b',
      fontFamily: 'Inter',
      fontSize: 'medium',
      spacing: 'normal',
      showBranding: true
    }
  },
  {
    id: 'executive-brief',
    name: 'Executive Brief',
    description: 'Concise summary for executive decision making',
    layout: 'single-column',
    sections: [
      'executive-summary',
      'kpi-cards',
      'insights-list',
      'recommendations'
    ],
    defaultStyling: {
      theme: 'light',
      primaryColor: '#059669',
      secondaryColor: '#6b7280',
      fontFamily: 'Inter',
      fontSize: 'medium',
      spacing: 'compact',
      showBranding: false
    }
  },
  {
    id: 'dashboard-view',
    name: 'Interactive Dashboard',
    description: 'Data-rich dashboard with charts and maps',
    layout: 'dashboard',
    sections: [
      'kpi-cards',
      'charts',
      'maps',
      'data-table'
    ],
    defaultStyling: {
      theme: 'dark',
      primaryColor: '#8b5cf6',
      secondaryColor: '#a1a1aa',
      fontFamily: 'Inter',
      fontSize: 'medium',
      spacing: 'normal',
      showBranding: true
    }
  }
];

// Default section configurations
export const DEFAULT_SECTION_CONFIGS: Record<ReportSectionType, ReportSectionConfig> = {
  'executive-summary': {
    collapsible: false,
    fullWidth: true,
    exportable: true
  },
  'market-overview': {
    collapsible: true,
    fullWidth: true,
    exportable: true
  },
  'competitive-analysis': {
    chartType: 'bar',
    showLegend: true,
    interactive: true,
    collapsible: true,
    exportable: true
  },
  'delivery-analysis': {
    chartType: 'line',
    showLegend: true,
    interactive: true,
    collapsible: true,
    exportable: true
  },
  'customer-behavior': {
    chartType: 'pie',
    showLegend: true,
    interactive: true,
    collapsible: true,
    exportable: true
  },
  'property-analysis': {
    chartType: 'scatter',
    showLegend: true,
    interactive: true,
    collapsible: true,
    exportable: true
  },
  'accommodation-density': {
    chartType: 'heatmap',
    showLegend: true,
    interactive: true,
    collapsible: true,
    exportable: true
  },
  'tourist-flow': {
    chartType: 'line',
    showLegend: true,
    interactive: true,
    collapsible: true,
    exportable: true
  },
  'insights-list': {
    collapsible: true,
    fullWidth: true,
    exportable: true
  },
  'recommendations': {
    collapsible: true,
    fullWidth: true,
    exportable: true
  },
  'charts': {
    chartType: 'bar',
    showLegend: true,
    showGrid: true,
    interactive: true,
    collapsible: false,
    exportable: true,
    height: 400
  },
  'maps': {
    interactive: true,
    collapsible: false,
    exportable: true,
    height: 500
  },
  'data-table': {
    interactive: true,
    collapsible: true,
    exportable: true
  },
  'kpi-cards': {
    collapsible: false,
    fullWidth: true,
    exportable: true
  },
  'timeline': {
    interactive: true,
    collapsible: true,
    exportable: true,
    height: 300
  },
  'custom-content': {
    collapsible: true,
    exportable: true
  }
};