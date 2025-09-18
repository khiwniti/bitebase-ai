"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  chatHistory: ChatMessage[];
  researchData?: {
    marketOverview?: any;
    competitiveAnalysis?: any;
    customerDemographics?: any;
    locationIntelligence?: any;
  };
}

interface ReportsContextType {
  reports: Report[];
  currentReport: Report | null;
  createReport: (title: string, description: string) => Report;
  updateReport: (reportId: string, updates: Partial<Report>) => void;
  deleteReport: (reportId: string) => void;
  setCurrentReport: (report: Report | null) => void;
  addChatMessage: (reportId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  getReportById: (reportId: string) => Report | undefined;
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

  const createReport = (title: string, description: string): Report => {
    const newReport: Report = {
      id: Date.now().toString(),
      title,
      description,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      chatHistory: []
    };

    setReports(prev => [...prev, newReport]);
    setCurrentReport(newReport);
    return newReport;
  };

  const updateReport = (reportId: string, updates: Partial<Report>) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, ...updates, updatedAt: new Date() }
        : report
    ));

    // Update current report if it's the one being updated
    if (currentReport?.id === reportId) {
      setCurrentReport(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    }
  };

  const deleteReport = (reportId: string) => {
    setReports(prev => prev.filter(report => report.id !== reportId));
    
    // Clear current report if it's the one being deleted
    if (currentReport?.id === reportId) {
      setCurrentReport(null);
    }
  };

  const addChatMessage = (reportId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            chatHistory: [...report.chatHistory, newMessage],
            updatedAt: new Date()
          }
        : report
    ));

    // Update current report if it's the one being updated
    if (currentReport?.id === reportId) {
      setCurrentReport(prev => prev ? {
        ...prev,
        chatHistory: [...prev.chatHistory, newMessage],
        updatedAt: new Date()
      } : null);
    }
  };

  const getReportById = (reportId: string): Report | undefined => {
    return reports.find(report => report.id === reportId);
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
    getReportById
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
};