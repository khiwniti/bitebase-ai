'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useReports } from '@/contexts/ReportsContext';
import { AppLayout } from '@/components/ui/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Download,
  Share2,
  Eye,
  Settings,
  TrendingUp,
  MapPin,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface ChatData {
  id: string;
  message: string;
  timestamp: Date;
  analysis?: any;
}

export default function ReportGeneratePage() {
  const params = useParams();
  const router = useRouter();
  const { getReportById, updateReport } = useReports();
  const reportId = params.id as string;
  const report = getReportById(reportId);

  const [reportTitle, setReportTitle] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('comprehensive');
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [reportSections, setReportSections] = useState([
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      description: 'Key findings and recommendations overview',
      type: 'text',
      enabled: true
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis',
      description: 'Competitive landscape and market opportunities',
      type: 'chart',
      enabled: true
    },
    {
      id: 'location-insights',
      title: 'Location Insights',
      description: 'Geographic analysis and foot traffic data',
      type: 'map',
      enabled: true
    },
    {
      id: 'customer-segments',
      title: 'Customer Segmentation',
      description: 'Target audience analysis and personas',
      type: 'table',
      enabled: true
    },
    {
      id: 'financial-projections',
      title: 'Financial Projections',
      description: 'Revenue forecasts and cost analysis',
      type: 'chart',
      enabled: true
    },
    {
      id: 'recommendations',
      title: 'Strategic Recommendations',
      description: 'Actionable insights and next steps',
      type: 'text',
      enabled: true
    }
  ]);

  const templates = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Analysis',
      description: 'Full market research report with all sections'
    },
    {
      id: 'location-focused',
      name: 'Location Analysis',
      description: 'Focus on geographic and demographic insights'
    },
    {
      id: 'competitive',
      name: 'Competitive Intelligence',
      description: 'Emphasis on competitor analysis and positioning'
    },
    {
      id: 'financial',
      name: 'Financial Viability',
      description: 'Revenue projections and investment analysis'
    }
  ];

  // Load existing report data
  useEffect(() => {
    if (report) {
      setReportTitle(report.title || 'Market Research Report');
      setReportDescription(report.description || 'Comprehensive analysis based on your research conversations.');

      // Convert chat history to ChatData format
      const chatDataFromReport: ChatData[] = report.chatHistory.map(chat => ({
        id: chat.id,
        message: chat.message,
        timestamp: new Date(chat.timestamp),
        analysis: chat.analysis
      }));
      setChatData(chatDataFromReport);
    } else {
      // Use mock data if no report found
      const mockChatData: ChatData[] = [
        {
          id: '1',
          message: 'I want to open a coffee shop in downtown Seattle',
          timestamp: new Date('2024-01-15'),
          analysis: { location: 'Seattle', concept: 'coffee shop', market: 'downtown' }
        },
        {
          id: '2',
          message: 'What are the demographics of the area?',
          timestamp: new Date('2024-01-15'),
          analysis: { query_type: 'demographics', focus: 'target_area' }
        },
        {
          id: '3',
          message: 'Show me competitor analysis for similar cafes',
          timestamp: new Date('2024-01-16'),
          analysis: { query_type: 'competition', business_type: 'cafe' }
        }
      ];
      setChatData(mockChatData);
      setReportTitle('Market Research Report');
      setReportDescription('Comprehensive analysis based on your research conversations.');
    }
  }, [report]);

  const handleSectionToggle = (sectionId: string) => {
    setReportSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? { ...section, enabled: !section.enabled }
          : section
      )
    );
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);

    // Update sections based on template
    const templateConfigs = {
      'comprehensive': reportSections.map(s => ({ ...s, enabled: true })),
      'location-focused': reportSections.map(s => ({
        ...s,
        enabled: ['executive-summary', 'location-insights', 'customer-segments', 'recommendations'].includes(s.id)
      })),
      'competitive': reportSections.map(s => ({
        ...s,
        enabled: ['executive-summary', 'market-analysis', 'recommendations'].includes(s.id)
      })),
      'financial': reportSections.map(s => ({
        ...s,
        enabled: ['executive-summary', 'financial-projections', 'recommendations'].includes(s.id)
      }))
    };

    setReportSections(templateConfigs[templateId as keyof typeof templateConfigs] || reportSections);
  };

  const handleGenerateReport = async () => {
    setGenerating(true);
    setProgress(0);

    // Simulate report generation process
    const steps = [
      'Analyzing chat conversations...',
      'Processing market data...',
      'Generating insights...',
      'Creating visualizations...',
      'Compiling final report...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * 20);
    }

    // Update the report with generation details
    if (report) {
      const updatedReport = {
        ...report,
        title: reportTitle,
        description: reportDescription,
        status: 'completed' as const,
        updatedAt: new Date(),
        // Add generation metadata
        researchData: {
          template: selectedTemplate,
          enabledSections: reportSections.filter(s => s.enabled).map(s => s.id),
          generatedAt: new Date()
        }
      };
      updateReport(updatedReport);
    }

    // Navigate to the generated report
    router.push(`/reports/${reportId}`);
  };

  const enabledSectionsCount = reportSections.filter(s => s.enabled).length;

  const breadcrumbs = [
    { label: 'Reports', href: '/reports' },
    { label: report?.title || 'New Report', href: `/reports/${reportId}` },
    { label: 'Generate Report', href: `/reports/${reportId}/generate` }
  ];

  const actions = (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => router.push(`/reports/${reportId}`)}
      >
        <Eye className="h-4 w-4 mr-2" />
        Preview
      </Button>
      <Button
        onClick={handleGenerateReport}
        disabled={generating || enabledSectionsCount === 0}
      >
        {generating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </>
        )}
      </Button>
    </div>
  );

  if (generating) {
    return (
      <AppLayout
        title="Generating Report"
        breadcrumbs={breadcrumbs}
      >
        <div className="max-w-2xl mx-auto py-12">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <CardTitle>Generating Your Report</CardTitle>
              <CardDescription>
                Please wait while we analyze your data and create your custom report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={progress} className="w-full" />
                <p className="text-center text-sm text-muted-foreground">
                  {progress < 20 && 'Analyzing chat conversations...'}
                  {progress >= 20 && progress < 40 && 'Processing market data...'}
                  {progress >= 40 && progress < 60 && 'Generating insights...'}
                  {progress >= 60 && progress < 80 && 'Creating visualizations...'}
                  {progress >= 80 && 'Compiling final report...'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="Generate Report"
      description="Create a custom market research report from your chat analysis"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Report Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Report Configuration
            </CardTitle>
            <CardDescription>
              Configure your report settings and content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Title</label>
                <Textarea
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="Enter report title..."
                  className="min-h-[60px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Describe the report purpose..."
                  className="min-h-[60px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Report Template</label>
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-muted-foreground">{template.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Chat Data Source */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Data Source
            </CardTitle>
            <CardDescription>
              {chatData.length} chat conversations will be analyzed for this report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {chatData.map((chat) => (
                <div key={chat.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{chat.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {chat.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Sections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Report Sections
            </CardTitle>
            <CardDescription>
              Select which sections to include in your report ({enabledSectionsCount} selected)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportSections.map((section) => (
                <div
                  key={section.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    section.enabled ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => handleSectionToggle(section.id)}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={section.enabled}
                      onChange={() => handleSectionToggle(section.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{section.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {section.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generation Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Generation Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{chatData.length}</div>
                <div className="text-xs text-muted-foreground">Chat Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{enabledSectionsCount}</div>
                <div className="text-xs text-muted-foreground">Report Sections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">~15</div>
                <div className="text-xs text-muted-foreground">Pages Expected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">~2</div>
                <div className="text-xs text-muted-foreground">Minutes to Generate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}