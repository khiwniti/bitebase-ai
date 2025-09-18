"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useReports } from '@/contexts/ReportsContext';
import { SharedStateProvider } from '@/components/shared/SharedStateProvider';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, History } from 'lucide-react';

const ChatInterface = dynamic(() => import('@/components/chat/ChatInterface'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen">Loading chat...</div>
});

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentReport, getReportById, setCurrentReport, createReport } = useReports();
  const [isLoading, setIsLoading] = useState(true);

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
        `Research Report ${new Date().toLocaleDateString()}`,
        'New research analysis session'
      );
      router.replace(`/chat?reportId=${newReport.id}`);
      return;
    }
    
    setIsLoading(false);
  }, [searchParams, currentReport, getReportById, setCurrentReport, createReport, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentReport) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No report selected</p>
          <Button onClick={() => router.push('/reports')}>
            Go to Reports
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push('/reports')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Reports</span>
          </Button>
          <div className="border-l border-gray-300 dark:border-gray-600 pl-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <h1 className="font-semibold text-gray-900 dark:text-white">
                  {currentReport.title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentReport.chatHistory.length} messages
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push(`/research?reportId=${currentReport.id}`)}
            className="flex items-center space-x-2"
          >
            <History className="h-4 w-4" />
            <span>View Report</span>
          </Button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <SharedStateProvider>
          <ChatInterface reportId={currentReport.id} />
        </SharedStateProvider>
      </div>
    </div>
  );
}