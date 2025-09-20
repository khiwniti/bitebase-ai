"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useReports } from '@/contexts/ReportsContext';
import ResearchWorkflow from '@/components/landing/ResearchWorkflow';
import { SharedStateProvider } from '@/components/shared/SharedStateProvider';

export default function ResearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentReport, getReportById, setCurrentReport } = useReports();

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
    }
  }, [searchParams, getReportById, setCurrentReport, router]);

  const handleNavigateBack = () => {
    router.push('/reports');
  };

  const handleNavigateToChat = (message?: string) => {
    if (currentReport) {
      if (message) {
        router.push(`/chat?reportId=${currentReport.reportId}&message=${encodeURIComponent(message)}`);
      } else {
        router.push(`/chat?reportId=${currentReport.reportId}`);
      }
    } else {
      router.push('/chat');
    }
  };

  return (
    <SharedStateProvider>
      <ResearchWorkflow 
        onNavigateBack={handleNavigateBack}
        onNavigateToChat={handleNavigateToChat}
      />
    </SharedStateProvider>
  );
}