"use client";

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useReports, Report } from '@/contexts/ReportsContext';
import { AppLayout } from '@/components/ui/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Download, 
  Share, 
  Edit, 
  FileText,
  Calendar,
  User,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { format } from 'date-fns';

export default function ReportDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { getReportById, setCurrentReport } = useReports();
  const reportId = params.id as string;
  const report = getReportById(reportId);

  if (!report) {
    return (
      <AppLayout 
        title="Report Not Found"
        subtitle="The requested report could not be found"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reports", href: "/reports" },
          { label: "Not Found" }
        ]}
      >
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Report Not Found</h3>
            <p className="text-gray-600 mb-6">The report you're looking for doesn't exist or has been deleted.</p>
            <Button 
              onClick={() => router.push('/reports')}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              Back to Reports
            </Button>
          </CardContent>
        </Card>
      </AppLayout>
    );
  }

  const handleContinueChat = () => {
    setCurrentReport(report);
    router.push(`/chat?reportId=${report.reportId}`);
  };

  const handleEditReport = () => {
    setCurrentReport(report);
    router.push(`/research?reportId=${report.reportId}`);
  };

  const getReportStatus = (report: Report): string => {
    // Derive status based on report content
    if (report.executiveSummary && report.keyFindings.length > 0 && report.recommendations.length > 0) {
      return 'completed';
    }
    if (report.chatHistory.length > 0 || report.sections.length > 0) {
      return 'in_progress';
    }
    return 'draft';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'draft': return 'Draft';
      default: return 'Draft';
    }
  };

  return (
    <AppLayout 
      title={report.title}
      subtitle="Restaurant market research report"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Reports", href: "/reports" },
        { label: report.title }
      ]}
      actions={
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleEditReport}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={handleContinueChat}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Continue Chat
          </Button>
        </div>
      }
    >
      {/* Report Header */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <Badge className={getStatusColor(getReportStatus(report))}>
                    {getStatusLabel(getReportStatus(report))}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Created</p>
                  <p className="text-sm text-gray-900">{format(report.generatedAt, 'MMM dd, yyyy')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Messages</p>
                  <p className="text-sm text-gray-900">{report.chatHistory.length}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Updated</p>
                  <p className="text-sm text-gray-900">{format(report.generatedAt, 'MMM dd, yyyy')}</p>
                </div>
              </div>
            </div>
            
            {report.description && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{report.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Report Content */}
      <div className="space-y-8">
        {/* Generated Insights */}
        {report.keyFindings && report.keyFindings.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                <span>Key Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {report.keyFindings.map((finding, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">{finding}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Report Sections */}
        {report.sections && report.sections.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Report Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.sections.map((section) => (
                  <div key={section.sectionId} className="border-l-4 border-orange-500 pl-4">
                    <h3 className="font-semibold text-lg">{section.title}</h3>
                    <p className="text-gray-700 mt-2">{section.content}</p>
                    {section.recommendations && section.recommendations.length > 0 && (
                      <div className="mt-3">
                        <h4 className="font-medium text-sm text-gray-600">Recommendations:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                          {section.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat History Summary */}
        {report.chatHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span>Conversation Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.chatHistory.slice(-5).map((message, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      message.sender === 'user' 
                        ? 'bg-gray-100 text-gray-600' 
                        : 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                    }`}>
                      {message.sender === 'user' ? 'U' : 'AI'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">
                        {message.sender === 'user' ? 'You' : 'BiteBase AI'} • {format(message.timestamp, 'MMM dd, HH:mm')}
                      </p>
                      <p className="text-gray-900">{message.content.substring(0, 200)}...</p>
                    </div>
                  </div>
                ))}
                {report.chatHistory.length > 5 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" onClick={handleContinueChat}>
                      View Full Conversation ({report.chatHistory.length} messages)
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}