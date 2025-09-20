"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Layout, 
  Grid3x3, 
  Columns, 
  Rows, 
  Eye, 
  EyeOff, 
  Settings, 
  Palette,
  Download,
  Share,
  Maximize,
  Minimize,
  RotateCcw,
  Save
} from 'lucide-react';

// Report Layout Types
export type LayoutType = 'grid' | 'masonry' | 'single-column' | 'two-column' | 'dashboard' | 'magazine' | 'card-deck';
export type ThemeVariant = 'professional' | 'modern' | 'minimalist' | 'vibrant' | 'dark' | 'high-contrast';
export type ColorScheme = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal' | 'indigo' | 'custom';

export interface ReportSection {
  id: string;
  title: string;
  type: 'chart' | 'table' | 'text' | 'image' | 'map' | 'metric' | 'comparison' | 'timeline';
  content: any;
  position: { row: number; col: number; width: number; height: number };
  isVisible: boolean;
  style?: {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    fontSize?: string;
    padding?: string;
    borderRadius?: string;
    shadow?: boolean;
  };
}

export interface ReportLayout {
  id: string;
  name: string;
  type: LayoutType;
  theme: ThemeVariant;
  colorScheme: ColorScheme;
  sections: ReportSection[];
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    version: string;
    description?: string;
  };
}

interface CustomReportLayoutManagerProps {
  reportId: string;
  initialLayout?: ReportLayout;
  onLayoutChange?: (layout: ReportLayout) => void;
  onSave?: (layout: ReportLayout) => void;
  className?: string;
}

// Default layout templates
const DEFAULT_LAYOUTS: Record<LayoutType, Partial<ReportLayout>> = {
  'grid': {
    name: 'Grid Layout',
    type: 'grid',
    sections: []
  },
  'masonry': {
    name: 'Masonry Layout',
    type: 'masonry',
    sections: []
  },
  'single-column': {
    name: 'Single Column',
    type: 'single-column',
    sections: []
  },
  'two-column': {
    name: 'Two Column',
    type: 'two-column',
    sections: []
  },
  'dashboard': {
    name: 'Dashboard',
    type: 'dashboard',
    sections: []
  },
  'magazine': {
    name: 'Magazine Style',
    type: 'magazine',
    sections: []
  },
  'card-deck': {
    name: 'Card Deck',
    type: 'card-deck',
    sections: []
  }
};

const THEME_COLORS: Record<ThemeVariant, { primary: string; secondary: string; accent: string; background: string }> = {
  'professional': {
    primary: '#1e40af',
    secondary: '#64748b',
    accent: '#f59e0b',
    background: '#ffffff'
  },
  'modern': {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#ec4899',
    background: '#fafafa'
  },
  'minimalist': {
    primary: '#374151',
    secondary: '#9ca3af',
    accent: '#f3f4f6',
    background: '#ffffff'
  },
  'vibrant': {
    primary: '#dc2626',
    secondary: '#ea580c',
    accent: '#ca8a04',
    background: '#fef7ff'
  },
  'dark': {
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#f59e0b',
    background: '#0f172a'
  },
  'high-contrast': {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#ff0000',
    background: '#ffffff'
  }
};

export default function CustomReportLayoutManager({
  reportId,
  initialLayout,
  onLayoutChange,
  onSave,
  className = ''
}: CustomReportLayoutManagerProps) {
  const [currentLayout, setCurrentLayout] = useState<ReportLayout>(() => {
    if (initialLayout) return initialLayout;
    
    return {
      id: `layout-${reportId}`,
      name: 'My Report Layout',
      type: 'dashboard',
      theme: 'professional',
      colorScheme: 'blue',
      sections: [],
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0.0'
      }
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showStylePanel, setShowStylePanel] = useState(false);

  // Computed styles based on theme and color scheme
  const themeStyles = useMemo(() => {
    const baseColors = THEME_COLORS[currentLayout.theme];
    return {
      '--primary-color': baseColors.primary,
      '--secondary-color': baseColors.secondary,
      '--accent-color': baseColors.accent,
      '--background-color': baseColors.background,
    } as React.CSSProperties;
  }, [currentLayout.theme]);

  const handleLayoutTypeChange = useCallback((newType: LayoutType) => {
    const updatedLayout = {
      ...currentLayout,
      type: newType,
      metadata: {
        ...currentLayout.metadata,
        updatedAt: new Date()
      }
    };
    setCurrentLayout(updatedLayout);
    onLayoutChange?.(updatedLayout);
  }, [currentLayout, onLayoutChange]);

  const handleThemeChange = useCallback((newTheme: ThemeVariant) => {
    const updatedLayout = {
      ...currentLayout,
      theme: newTheme,
      metadata: {
        ...currentLayout.metadata,
        updatedAt: new Date()
      }
    };
    setCurrentLayout(updatedLayout);
    onLayoutChange?.(updatedLayout);
  }, [currentLayout, onLayoutChange]);

  const handleSectionToggle = useCallback((sectionId: string) => {
    const updatedSections = currentLayout.sections.map(section =>
      section.id === sectionId
        ? { ...section, isVisible: !section.isVisible }
        : section
    );
    
    const updatedLayout = {
      ...currentLayout,
      sections: updatedSections,
      metadata: {
        ...currentLayout.metadata,
        updatedAt: new Date()
      }
    };
    
    setCurrentLayout(updatedLayout);
    onLayoutChange?.(updatedLayout);
  }, [currentLayout, onLayoutChange]);

  const handleSave = useCallback(() => {
    onSave?.(currentLayout);
  }, [currentLayout, onSave]);

  const renderLayoutPreview = () => {
    const layoutClass = `layout-${currentLayout.type}`;
    const themeClass = `theme-${currentLayout.theme}`;
    
    return (
      <div 
        className={`report-preview ${layoutClass} ${themeClass} p-4 bg-white rounded-lg border-2 border-gray-200 min-h-96`}
        style={themeStyles}
      >
        {currentLayout.sections.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Grid3x3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No sections added yet</p>
              <p className="text-sm">Add sections to see your layout preview</p>
            </div>
          </div>
        ) : (
          <div className={`grid gap-4 ${getGridClasses(currentLayout.type)}`}>
            {currentLayout.sections
              .filter(section => section.isVisible)
              .map(section => (
                <div
                  key={section.id}
                  className={`section-${section.type} p-4 bg-gray-50 rounded border ${
                    selectedSection === section.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={section.style}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <h3 className="font-medium text-sm mb-2">{section.title}</h3>
                  <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded opacity-50" />
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  const getGridClasses = (type: LayoutType) => {
    switch (type) {
      case 'grid': return 'grid-cols-3';
      case 'two-column': return 'grid-cols-2';
      case 'single-column': return 'grid-cols-1';
      case 'dashboard': return 'grid-cols-4';
      case 'masonry': return 'columns-3';
      case 'magazine': return 'grid-cols-12';
      case 'card-deck': return 'flex flex-wrap';
      default: return 'grid-cols-3';
    }
  };

  return (
    <div className={`custom-report-layout-manager ${className}`}>
      {/* Layout Controls */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layout className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Report Layout Customization</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowStylePanel(!showStylePanel)}
              >
                <Palette className="h-4 w-4 mr-2" />
                Style
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Settings className="h-4 w-4 mr-2" />
                {isEditing ? 'Preview' : 'Edit'}
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Layout
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Layout Type Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Layout Type</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.keys(DEFAULT_LAYOUTS).map((type) => (
                <Button
                  key={type}
                  variant={currentLayout.type === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleLayoutTypeChange(type as LayoutType)}
                  className="text-xs"
                >
                  {DEFAULT_LAYOUTS[type as LayoutType].name}
                </Button>
              ))}
            </div>
          </div>

          {/* Theme Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(THEME_COLORS).map((theme) => (
                <Button
                  key={theme}
                  variant={currentLayout.theme === theme ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleThemeChange(theme as ThemeVariant)}
                  className="text-xs capitalize"
                >
                  {theme.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>

          {/* Section Visibility Controls */}
          {currentLayout.sections.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Section Visibility</label>
              <div className="space-y-2">
                {currentLayout.sections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{section.title}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSectionToggle(section.id)}
                    >
                      {section.isVisible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Layout Preview */}
      <Card>
        <CardHeader>
          <h4 className="text-md font-medium">Layout Preview</h4>
        </CardHeader>
        <CardContent>
          {renderLayoutPreview()}
        </CardContent>
      </Card>

      {/* Style Panel (if open) */}
      {showStylePanel && (
        <Card className="mt-6">
          <CardHeader>
            <h4 className="text-md font-medium">Advanced Styling</h4>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              Advanced styling options for colors, typography, spacing, and more coming soon...
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
