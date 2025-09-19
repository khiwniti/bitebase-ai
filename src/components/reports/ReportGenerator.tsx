"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  ReportGeneratorProps,
  ReportConfiguration,
  ReportTemplate,
  ReportSection,
  ReportSectionType,
  ReportGenerationRequest,
  DEFAULT_REPORT_TEMPLATES,
  DEFAULT_SECTION_CONFIGS
} from './types';
import { AnalysisType } from '@/generated/prisma';

export function ReportGenerator({
  reportId,
  initialConfiguration,
  onSave,
  onGenerate,
  onExport,
  readonly = false,
  className
}: ReportGeneratorProps) {
  const [configuration, setConfiguration] = useState<ReportConfiguration>(() => ({
    title: '',
    region: '',
    analysisType: 'DELIVERY_MARKET' as AnalysisType,
    template: DEFAULT_REPORT_TEMPLATES[0],
    sections: [],
    styling: DEFAULT_REPORT_TEMPLATES[0].defaultStyling,
    ...initialConfiguration
  }));

  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate>(
    initialConfiguration?.template || DEFAULT_REPORT_TEMPLATES[0]
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Initialize sections when template changes
  useEffect(() => {
    const templateSections = selectedTemplate.sections.map((sectionId, index) => ({
      id: sectionId,
      type: sectionId as ReportSectionType,
      title: formatSectionTitle(sectionId),
      order: index,
      visible: true,
      config: DEFAULT_SECTION_CONFIGS[sectionId as ReportSectionType] || {}
    }));

    setConfiguration(prev => ({
      ...prev,
      template: selectedTemplate,
      sections: templateSections,
      styling: selectedTemplate.defaultStyling
    }));
  }, [selectedTemplate]);

  const formatSectionTitle = (sectionId: string): string => {
    return sectionId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const validateConfiguration = (): string[] => {
    const errors: string[] = [];

    if (!configuration.title.trim()) {
      errors.push('Report title is required');
    }

    if (!configuration.region.trim()) {
      errors.push('Region is required');
    }

    if (configuration.sections.length === 0) {
      errors.push('At least one section must be included');
    }

    return errors;
  };

  const handleFieldChange = (field: keyof ReportConfiguration, value: any) => {
    setConfiguration(prev => ({ ...prev, [field]: value }));
    setValidationErrors([]);
  };

  const handleSectionToggle = (sectionId: string, visible: boolean) => {
    setConfiguration(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, visible } : section
      )
    }));
  };

  const handleSectionReorder = (sectionId: string, newOrder: number) => {
    setConfiguration(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, order: newOrder } : section
      ).sort((a, b) => a.order - b.order)
    }));
  };

  const handleStylingChange = (field: string, value: any) => {
    setConfiguration(prev => ({
      ...prev,
      styling: { ...prev.styling, [field]: value }
    }));
  };

  const handleSave = () => {
    const errors = validateConfiguration();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    onSave?.(configuration);
  };

  const handleGenerate = async () => {
    const errors = validateConfiguration();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsGenerating(true);
    try {
      const request: ReportGenerationRequest = {
        reportId,
        userId: 'current-user', // TODO: Get from auth context
        configuration,
        exportFormat: 'html'
      };

      await onGenerate?.(request);
    } finally {
      setIsGenerating(false);
    }
  };

  const analysisTypeOptions = [
    { value: 'DELIVERY_MARKET', label: 'Delivery Market Analysis' },
    { value: 'CUSTOMER_BEHAVIOR', label: 'Customer Behavior Analysis' },
    { value: 'PROPERTY_MARKET', label: 'Property Market Analysis' },
    { value: 'ACCOMMODATION_DENSITY', label: 'Accommodation Density Analysis' },
    { value: 'TOURIST_FLOW', label: 'Tourist Flow Analysis' }
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          {validationErrors.length > 0 && (
            <div className="text-sm text-red-600 space-y-1">
              {validationErrors.map((error, index) => (
                <div key={index}>• {error}</div>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Report Title</Label>
              <Input
                id="title"
                value={configuration.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder="Enter report title"
                disabled={readonly}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                value={configuration.region}
                onChange={(e) => handleFieldChange('region', e.target.value)}
                placeholder="e.g., Bangkok, Thailand"
                disabled={readonly}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={configuration.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Brief description of the report purpose"
              disabled={readonly}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="analysisType">Primary Analysis Type</Label>
            <Select
              value={configuration.analysisType}
              onValueChange={(value) => handleFieldChange('analysisType', value as AnalysisType)}
              disabled={readonly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select analysis type" />
              </SelectTrigger>
              <SelectContent>
                {analysisTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Template and Sections Configuration */}
      <Tabs defaultValue="template" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="template">Template</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="styling">Styling</TabsTrigger>
        </TabsList>

        {/* Template Selection */}
        <TabsContent value="template">
          <Card>
            <CardHeader>
              <CardTitle>Report Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DEFAULT_REPORT_TEMPLATES.map((template) => (
                  <Card
                    key={template.id}
                    className={cn(
                      "cursor-pointer transition-colors border-2",
                      selectedTemplate.id === template.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50",
                      readonly && "cursor-not-allowed opacity-60"
                    )}
                    onClick={() => !readonly && setSelectedTemplate(template)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{template.name}</CardTitle>
                      <Badge variant="outline" className="w-fit">
                        {template.layout}
                      </Badge>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-2">
                        {template.description}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {template.sections.length} sections
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sections Configuration */}
        <TabsContent value="sections">
          <Card>
            <CardHeader>
              <CardTitle>Report Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {configuration.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <div
                      key={section.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Switch
                          checked={section.visible}
                          onCheckedChange={(checked) =>
                            handleSectionToggle(section.id, checked)
                          }
                          disabled={readonly}
                        />
                        <div>
                          <div className="font-medium">{section.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {section.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={section.visible ? "default" : "secondary"}>
                          {section.visible ? "Included" : "Excluded"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Order: {section.order + 1}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Styling Configuration */}
        <TabsContent value="styling">
          <Card>
            <CardHeader>
              <CardTitle>Report Styling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={configuration.styling.theme}
                    onValueChange={(value) => handleStylingChange('theme', value)}
                    disabled={readonly}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select
                    value={configuration.styling.fontSize}
                    onValueChange={(value) => handleStylingChange('fontSize', value)}
                    disabled={readonly}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={configuration.styling.primaryColor}
                    onChange={(e) => handleStylingChange('primaryColor', e.target.value)}
                    disabled={readonly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={configuration.styling.secondaryColor}
                    onChange={(e) => handleStylingChange('secondaryColor', e.target.value)}
                    disabled={readonly}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showBranding"
                  checked={configuration.styling.showBranding}
                  onCheckedChange={(checked) => handleStylingChange('showBranding', checked)}
                  disabled={readonly}
                />
                <Label htmlFor="showBranding">Show BiteBase branding</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      {!readonly && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSave}
                variant="outline"
                className="flex-1"
              >
                Save Configuration
              </Button>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? "Generating..." : "Generate Report"}
              </Button>

              {onExport && (
                <Button
                  onClick={() => onExport('pdf', reportId || '')}
                  variant="outline"
                >
                  Export
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}