/**
 * Enhanced Chat Page with Agent Status and Report Generation
 */

"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useReports } from '@/contexts/ReportsContext';
import { SharedStateProvider } from '@/components/shared/SharedStateProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  FileText, 
  History, 
  Plus, 
  MessageSquare, 
  Brain,
  Home,
  Map,
  Settings,
  User,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { AppLayout } from '@/components/ui/app-layout';
import Link from 'next/link';

// Enhanced Chat Interface with agent status
const EnhancedChatInterface = dynamic(() => 
  import('@/components/enhanced/EnhancedChatInterface').then(mod => ({ default: mod.EnhancedChatInterface })), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
        <p className="text-gray-600">Loading Enhanced AI Analysis...</p>
      </div>
    </div>
  )
});

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentReport, getReportById, setCurrentReport, createReport } = useReports();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const reportId = searchParams.get('reportId');
    
    if (reportId) {
      // Load specific report
      const report = getReportById(reportId);
      if (report) {
        setCurrentReport(report);
      } else {
        // Report not found, redirect to reports
        router.push('/reports');
        return;
      }
    } else if (!currentReport) {
      // No report specified and no current report, create a new one
      const newReport = createReport(
        `Market Analysis ${new Date().toLocaleDateString()}`,
        'AI-powered restaurant market research session'
      );
      router.replace(`/chat?reportId=${newReport.reportId}`);
      return;
    }
    
    setIsLoading(false);
  }, [searchParams, currentReport, getReportById, setCurrentReport, createReport, router]);

  const handleNewChat = () => {
    const newReport = createReport(
      `Market Analysis ${new Date().toLocaleDateString()}`,
      'AI-powered restaurant market research session'
    );
    router.push(`/chat?reportId=${newReport.reportId}`);
  };

  const navigationItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Brain, label: 'Chat Analysis', href: '/chat', active: true },
    { icon: FileText, label: 'Reports', href: '/reports' },
    { icon: Map, label: 'Map Canvas', href: '/map' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading Enhanced AI Analysis...</p>
        </div>
      </div>
    );
  }

  if (!currentReport) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Market Analysis</h2>
            <p className="text-gray-600 mb-6">Create a new session to begin restaurant market research</p>
            <Button 
              onClick={handleNewChat}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Start New Analysis
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SharedStateProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Enhanced Sidebar */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {isSidebarOpen ? (
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                    <Brain className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    BiteBase AI
                  </span>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                  <Brain className="h-5 w-5" />
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1"
              >
                {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className={`flex items-center ${isSidebarOpen ? 'space-x-3' : 'justify-center'}`}>
              <div className="bg-gray-300 rounded-full p-2">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              {isSidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Guest User</p>
                  <p className="text-xs text-gray-500">Free Plan</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentReport.title}</h1>
                <p className="text-gray-600">
                  AI-powered market research • {currentReport.chatHistory.length} messages • 
                  Session: {currentReport.reportId.slice(-8)}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Live Analysis
                </Badge>
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => router.push(`/reports/${currentReport.reportId}`)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Report
                </Button>
                <Button 
                  onClick={handleNewChat}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Analysis
                </Button>
              </div>
            </div>
          </header>

          {/* Enhanced Chat Interface */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full max-w-7xl mx-auto p-6">
              <Card className="h-full flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <span>AI Market Research Assistant</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Enhanced Agent Framework
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <EnhancedChatInterface reportId={currentReport.reportId} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SharedStateProvider>
  );
}
