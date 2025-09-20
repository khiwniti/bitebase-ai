"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  RestaurantRequirements, 
  ProductAnalysis, 
  PlaceAnalysis, 
  PriceAnalysis, 
  PromotionAnalysis,
  ComprehensiveReport,
  AgentStatus,
  ChatMessage as SharedChatMessage
} from '@/shared/types';

export interface ChatMessage extends SharedChatMessage {
  // Extended for local context if needed
}

export interface Report extends ComprehensiveReport {
  chatHistory: ChatMessage[];
  agentStatuses: Record<string, AgentStatus>;
  analysisProgress: {
    product: number;
    place: number;
    price: number;
    promotion: number;
  };
  researchData: {
    requirements?: RestaurantRequirements;
    productAnalysis?: ProductAnalysis;
    placeAnalysis?: PlaceAnalysis;
    priceAnalysis?: PriceAnalysis;
    promotionAnalysis?: PromotionAnalysis;
  };
}

interface ReportsContextType {
  reports: Report[];
  currentReport: Report | null;
  createReport: (title: string, description: string, requirements?: RestaurantRequirements) => Report;
  updateReport: (reportId: string, updates: Partial<Report>) => void;
  deleteReport: (reportId: string) => void;
  setCurrentReport: (report: Report | null) => void;
  addChatMessage: (reportId: string, message: Omit<ChatMessage, 'messageId' | 'timestamp'>) => void;
  updateAgentStatus: (reportId: string, agentId: string, status: Partial<AgentStatus>) => void;
  updateAnalysisProgress: (reportId: string, analysisType: keyof Report['analysisProgress'], progress: number) => void;
  setAnalysisData: (reportId: string, analysisType: keyof Report['researchData'], data: any) => void;
  generateFinalReport: (reportId: string) => Promise<void>;
  getReportById: (reportId: string) => Report | undefined;
  // Real-time collaboration
  subscribeToReportUpdates: (reportId: string, callback: (report: Report) => void) => () => void;
  broadcastUpdate: (reportId: string, update: Partial<Report>) => void;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
};

interface ReportsProviderProps {
  children: ReactNode;
}

export const ReportsProvider: React.FC<ReportsProviderProps> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);

  // Load reports from localStorage on mount
  useEffect(() => {
    const savedReports = localStorage.getItem('bitebase-reports');
    if (savedReports) {
      try {
        const parsedReports = JSON.parse(savedReports).map((report: any) => ({
          ...report,
          createdAt: new Date(report.createdAt),
          updatedAt: new Date(report.updatedAt),
          chatHistory: report.chatHistory.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setReports(parsedReports);
      } catch (error) {
        console.error('Error loading reports from localStorage:', error);
      }
    }

    // Load current report from localStorage
    const savedCurrentReport = localStorage.getItem('bitebase-current-report');
    if (savedCurrentReport) {
      try {
        const parsedCurrentReport = JSON.parse(savedCurrentReport);
        parsedCurrentReport.createdAt = new Date(parsedCurrentReport.createdAt);
        parsedCurrentReport.updatedAt = new Date(parsedCurrentReport.updatedAt);
        parsedCurrentReport.chatHistory = parsedCurrentReport.chatHistory.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setCurrentReport(parsedCurrentReport);
      } catch (error) {
        console.error('Error loading current report from localStorage:', error);
      }
    }
  }, []);

  // Save reports to localStorage whenever reports change
  useEffect(() => {
    localStorage.setItem('bitebase-reports', JSON.stringify(reports));
  }, [reports]);

  // Save current report to localStorage whenever it changes
  useEffect(() => {
    if (currentReport) {
      localStorage.setItem('bitebase-current-report', JSON.stringify(currentReport));
    } else {
      localStorage.removeItem('bitebase-current-report');
    }
  }, [currentReport]);

  const createReport = (title: string, description: string, requirements?: RestaurantRequirements): Report => {
    const newReport: Report = {
      reportId: Date.now().toString(),
      title,
      description,
      requirements: requirements || {
        restaurantType: 'cafe',
        cuisineType: 'other',
        location: '',
        budgetRange: [0, 100000],
        targetCustomers: '',
        businessModel: 'hybrid'
      },
      sections: [],
      executiveSummary: '',
      keyFindings: [],
      recommendations: [],
      riskAssessment: [],
      nextSteps: [],
      generatedAt: new Date(),
      confidence: 0,
      dataSources: [],
      chatHistory: [],
      agentStatuses: {},
      analysisProgress: {
        product: 0,
        place: 0,
        price: 0,
        promotion: 0
      },
      researchData: {}
    };

    setReports(prev => [...prev, newReport]);
    setCurrentReport(newReport);
    return newReport;
  };

  const updateReport = (reportId: string, updates: Partial<Report>) => {
    setReports(prev => prev.map(report => 
      report.reportId === reportId 
        ? { ...report, ...updates, generatedAt: new Date() }
        : report
    ));

    // Update current report if it's the one being updated
    if (currentReport?.reportId === reportId) {
      setCurrentReport(prev => prev ? { ...prev, ...updates, generatedAt: new Date() } : null);
    }
  };

  const deleteReport = (reportId: string) => {
    setReports(prev => prev.filter(report => report.reportId !== reportId));
    
    // Clear current report if it's the one being deleted
    if (currentReport?.reportId === reportId) {
      setCurrentReport(null);
    }
  };

  const addChatMessage = (reportId: string, message: Omit<ChatMessage, 'messageId' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      messageId: Date.now().toString(),
      timestamp: new Date()
    };

    setReports(prev => prev.map(report => 
      report.reportId === reportId 
        ? { 
            ...report, 
            chatHistory: [...report.chatHistory, newMessage],
            generatedAt: new Date()
          }
        : report
    ));

    // Update current report if it's the one being updated
    if (currentReport?.reportId === reportId) {
      setCurrentReport(prev => prev ? {
        ...prev,
        chatHistory: [...prev.chatHistory, newMessage],
        generatedAt: new Date()
      } : null);
    }
  };

  const updateAgentStatus = (reportId: string, agentId: string, status: Partial<AgentStatus>) => {
    const update = {
      agentStatuses: {
        ...currentReport?.agentStatuses,
        [agentId]: { ...currentReport?.agentStatuses[agentId], ...status }
      }
    };
    updateReport(reportId, update);
  };

  const updateAnalysisProgress = (reportId: string, analysisType: keyof Report['analysisProgress'], progress: number) => {
    const update = {
      analysisProgress: {
        ...currentReport?.analysisProgress,
        [analysisType]: progress
      }
    };
    updateReport(reportId, update);
  };

  const setAnalysisData = (reportId: string, analysisType: keyof Report['researchData'], data: any) => {
    const update = {
      researchData: {
        ...currentReport?.researchData,
        [analysisType]: data
      }
    };
    updateReport(reportId, update);
  };

  const generateFinalReport = async (reportId: string) => {
    const report = getReportById(reportId);
    if (!report) return;

    // Generate executive summary and recommendations based on analysis data
    const { productAnalysis, placeAnalysis, priceAnalysis, promotionAnalysis } = report.researchData;
    
    let executiveSummary = 'Comprehensive market research analysis completed for restaurant venture.';
    let keyFindings: string[] = [];
    let recommendations: string[] = [];
    let riskAssessment: string[] = [];

    if (productAnalysis) {
      keyFindings.push(...productAnalysis.recommendations);
    }
    if (placeAnalysis) {
      keyFindings.push(`Location score: ${placeAnalysis.locationScore}/100`);
    }
    if (priceAnalysis) {
      recommendations.push(...Object.values(priceAnalysis.pricingRecommendations).map(p => `Optimal pricing: $${p}`));
    }
    if (promotionAnalysis) {
      recommendations.push(...promotionAnalysis.marketingOpportunities);
    }

    updateReport(reportId, {
      executiveSummary,
      keyFindings,
      recommendations,
      riskAssessment,
      nextSteps: ['Finalize business plan', 'Secure funding', 'Begin location setup'],
      confidence: Math.round((Object.values(report.analysisProgress).reduce((a, b) => a + b, 0) / 4)),
    });
  };

  const getReportById = (reportId: string): Report | undefined => {
    return reports.find(report => report.reportId === reportId);
  };

  const subscribeToReportUpdates = (reportId: string, callback: (report: Report) => void) => {
    // Simple implementation - in production this would use WebSocket or real-time database
    const interval = setInterval(() => {
      const report = getReportById(reportId);
      if (report) {
        callback(report);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const broadcastUpdate = (reportId: string, update: Partial<Report>) => {
    // In production, this would broadcast to other connected clients
    console.log('Broadcasting update for report', reportId, update);
    updateReport(reportId, update);
  };

  const handleSetCurrentReport = (report: Report | null) => {
    setCurrentReport(report);
  };

  const value: ReportsContextType = {
    reports,
    currentReport,
    createReport,
    updateReport,
    deleteReport,
    setCurrentReport: handleSetCurrentReport,
    addChatMessage,
    updateAgentStatus,
    updateAnalysisProgress,
    setAnalysisData,
    generateFinalReport,
    getReportById,
    subscribeToReportUpdates,
    broadcastUpdate
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
};