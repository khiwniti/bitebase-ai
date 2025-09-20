"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AppLayout } from '@/components/ui/app-layout';
import { useReports, Report } from '@/contexts/ReportsContext';
import {
  FileText,
  Plus,
  MessageCircle,
  Calendar,
  MoreVertical,
  Trash2,
  Edit,
  Eye,
  TrendingUp,
  BarChart3,
  Wand2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

export default function ReportsPage() {
  const router = useRouter();
  const { reports, createReport, deleteReport, setCurrentReport } = useReports();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newReportTitle, setNewReportTitle] = useState('');
  const [newReportDescription, setNewReportDescription] = useState('');

  const handleCreateReport = () => {
    if (newReportTitle.trim()) {
      const report = createReport(newReportTitle.trim(), newReportDescription.trim());
      setNewReportTitle('');
      setNewReportDescription('');
      setIsCreateDialogOpen(false);

      // Navigate to chat with the new report
      router.push(`/chat?reportId=${report.reportId}`);
    }
  };

  const handleGenerateFromChat = () => {
    // Create a new report and navigate to generate it from existing chat data
    const report = createReport(
      "AI-Generated Market Analysis",
      "Generated from existing chat conversations and insights"
    );
    setCurrentReport(report);
    router.push(`/reports/${report.reportId}/generate`);
  };

  const handleOpenReport = (report: Report) => {
    setCurrentReport(report);
    router.push(`/chat?reportId=${report.reportId}`);
  };

  const handleViewReport = (report: Report) => {
    setCurrentReport(report);
    router.push(`/reports/${report.reportId}`);
  };

  const handleDeleteReport = (reportId: string) => {
    deleteReport(reportId);
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

  // Statistics for dashboard header
  const completedReports = reports.filter(r => getReportStatus(r) === 'completed').length;
  const inProgressReports = reports.filter(r => getReportStatus(r) === 'in_progress').length;
  const totalMessages = reports.reduce((acc, r) => acc + r.chatHistory.length, 0);

  return (
    <AppLayout
      title="Reports Dashboard"
      subtitle="Manage your research reports and chat history"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Reports" }
      ]}
      actions={
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleGenerateFromChat}
            className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 hover:from-purple-600 hover:to-blue-700"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            Generate from Chat
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                <Plus className="h-4 w-4 mr-2" />
                New Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Report Title</label>
                  <Input
                    placeholder="Enter report title..."
                    value={newReportTitle}
                    onChange={(e) => setNewReportTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe what this report will analyze..."
                    value={newReportDescription}
                    onChange={(e) => setNewReportDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateReport}
                    disabled={!newReportTitle.trim()}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  >
                    Create Report
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      {/* Dashboard Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{inProgressReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold text-gray-900">{totalMessages}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Grid */}
      {reports.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports yet</h3>
            <p className="text-gray-600 mb-6">Create your first report to get started with AI-powered market research.</p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Report
              </Button>
              <Button
                variant="outline"
                onClick={handleGenerateFromChat}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 hover:from-purple-600 hover:to-blue-700"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generate from Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Card key={report.reportId} className="hover:shadow-lg transition-all hover:border-orange-300 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{report.title}</CardTitle>
                    <Badge className={getStatusColor(getReportStatus(report))}>
                      {getStatusLabel(getReportStatus(report))}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenReport(report)}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Open Chat
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewReport(report)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Report
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteReport(report.reportId)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {report.description || 'No description provided'}
                </p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{report.chatHistory.length} messages</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{format(report.generatedAt, 'MMM dd')}</span>
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button
                    size="sm"
                    onClick={() => handleOpenReport(report)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  >
                    Continue Chat
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewReport(report)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppLayout>
  );
}