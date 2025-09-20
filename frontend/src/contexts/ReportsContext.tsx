"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
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
import { io, Socket } from 'socket.io-client';

// Enhanced types for LangGraph integration
export interface LangGraphState {
  sessionId: string;
  workflowId?: string;
  currentNode: string;
  agentProgress: Record<string, {
    status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
    progress: number;
    currentTask: string;
    startTime?: Date;
    endTime?: Date;
    error?: string;
  }>;
  overallProgress: number;
  mcpServerStatus: Record<string, {
    connected: boolean;
    lastHealthCheck: Date;
    errorCount: number;
  }>;
  errors: Array<{
    agentId: string;
    error: string;
    timestamp: Date;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }>;
}

export interface EnhancedRestaurantParams {
  type: string;
  cuisine: string;
  location: {
    address: string;
    district: string;
    city: string;
    coordinates?: { lat: number; lng: number; };
  };
  budget: { min: number; max: number; };
  targetCustomers: string[];
  businessModel: 'dine-in' | 'delivery' | 'takeaway' | 'hybrid';
  radius: number;
  capacity?: number;
}

export interface ChatMessage extends SharedChatMessage {
  // Extended for local context if needed
}

export interface Report extends ComprehensiveReport {
  chatHistory: ChatMessage[];
  agentStatuses: Record<string, AgentStatus>;
  langGraphState?: LangGraphState;
  analysisProgress: {
    product: number;
    place: number;
    price: number;
    promotion: number;
  };
  researchData: {
    requirements?: RestaurantRequirements;
    enhancedParams?: EnhancedRestaurantParams;
    productAnalysis?: ProductAnalysis;
    placeAnalysis?: PlaceAnalysis;
    priceAnalysis?: PriceAnalysis;
    promotionAnalysis?: PromotionAnalysis;
  };
  realTimeConnection?: {
    sessionId: string;
    connected: boolean;
    lastUpdate: Date;
  };
}

interface ReportsContextType {
  reports: Report[];
  currentReport: Report | null;
  
  // Enhanced LangGraph Integration
  startLangGraphAnalysis: (reportId: string, params: EnhancedRestaurantParams) => Promise<void>;
  streamLangGraphUpdates: (reportId: string, callback: (update: LangGraphState) => void) => () => void;
  pauseAnalysis: (reportId: string) => Promise<void>;
  resumeAnalysis: (reportId: string) => Promise<void>;
  cancelAnalysis: (reportId: string) => Promise<void>;
  
  // Enhanced State Management
  updateLangGraphState: (reportId: string, state: Partial<LangGraphState>) => void;
  getMCPServerStatus: () => Promise<Record<string, any>>;
  getAgentHealth: () => Promise<any>;
  
  // Existing methods
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
  
  // Enhanced Real-time collaboration
  subscribeToReportUpdates: (reportId: string, callback: (report: Report) => void) => () => void;
  broadcastUpdate: (reportId: string, update: Partial<Report>) => void;
  shareReport: (reportId: string, collaboratorIds: string[]) => Promise<void>;
  inviteCollaborator: (reportId: string, email: string, permissions: string[]) => Promise<void>;
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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [langGraphConnections, setLangGraphConnections] = useState<Map<string, EventSource>>(new Map());

  // Initialize WebSocket connection for real-time updates
  useEffect(() => {
    const socketConnection = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3001', {
      transports: ['websocket'],
    });

    socketConnection.on('connect', () => {
      console.log('Connected to real-time server');
    });

    socketConnection.on('report-update', (data: { reportId: string; update: Partial<Report> }) => {
      updateReport(data.reportId, data.update);
    });

    socketConnection.on('langgraph-update', (data: { reportId: string; state: LangGraphState }) => {
      updateLangGraphState(data.reportId, data.state);
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
      // Close all EventSource connections
      langGraphConnections.forEach(connection => connection.close());
    };
  }, []);

  // Enhanced LangGraph Analysis Methods
  const startLangGraphAnalysis = useCallback(async (reportId: string, params: EnhancedRestaurantParams) => {
    try {
      const response = await fetch('/api/agent/start-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId,
          restaurantParams: params,
          analysisType: 'comprehensive',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start LangGraph analysis');
      }

      const result = await response.json();
      
      // Update report with initial LangGraph state
      updateReport(reportId, {
        langGraphState: {
          sessionId: result.sessionId,
          workflowId: result.workflowId,
          currentNode: 'initialize',
          agentProgress: {},
          overallProgress: 0,
          mcpServerStatus: {},
          errors: [],
        },
        realTimeConnection: {
          sessionId: result.sessionId,
          connected: true,
          lastUpdate: new Date(),
        },
      });

      // Start streaming updates
      streamLangGraphUpdates(reportId, (update) => {
        updateLangGraphState(reportId, update);
      });

    } catch (error) {
      console.error('Error starting LangGraph analysis:', error);
      addChatMessage(reportId, {
        role: 'system',
        content: `Error starting analysis: ${error.message}`,
        messageType: 'error',
      });
    }
  }, []);

  const streamLangGraphUpdates = useCallback((reportId: string, callback: (update: LangGraphState) => void) => {
    const report = getReportById(reportId);
    if (!report?.langGraphState?.sessionId) {
      console.warn('No session ID found for streaming updates');
      return () => {};
    }

    const eventSource = new EventSource(
      `/api/agent/stream/${report.langGraphState.sessionId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        callback(update);
        
        // Update real-time connection status
        updateReport(reportId, {
          realTimeConnection: {
            ...report.realTimeConnection!,
            lastUpdate: new Date(),
          },
        });
      } catch (error) {
        console.error('Error parsing stream update:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      updateReport(reportId, {
        realTimeConnection: {
          ...report.realTimeConnection!,
          connected: false,
        },
      });
    };

    // Store connection for cleanup
    langGraphConnections.set(reportId, eventSource);

    return () => {
      eventSource.close();
      langGraphConnections.delete(reportId);
    };
  }, [langGraphConnections]);

  const pauseAnalysis = useCallback(async (reportId: string) => {
    const report = getReportById(reportId);
    if (!report?.langGraphState?.sessionId) return;

    try {
      await fetch(`/api/agent/pause/${report.langGraphState.sessionId}`, {
        method: 'POST',
      });
      
      updateLangGraphState(reportId, { currentNode: 'paused' });
    } catch (error) {
      console.error('Error pausing analysis:', error);
    }
  }, []);

  const resumeAnalysis = useCallback(async (reportId: string) => {
    const report = getReportById(reportId);
    if (!report?.langGraphState?.sessionId) return;

    try {
      await fetch(`/api/agent/resume/${report.langGraphState.sessionId}`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Error resuming analysis:', error);
    }
  }, []);

  const cancelAnalysis = useCallback(async (reportId: string) => {
    const report = getReportById(reportId);
    if (!report?.langGraphState?.sessionId) return;

    try {
      await fetch(`/api/agent/cancel/${report.langGraphState.sessionId}`, {
        method: 'POST',
      });
      
      // Close streaming connection
      const connection = langGraphConnections.get(reportId);
      if (connection) {
        connection.close();
        langGraphConnections.delete(reportId);
      }
      
      updateLangGraphState(reportId, { currentNode: 'cancelled' });
    } catch (error) {
      console.error('Error cancelling analysis:', error);
    }
  }, [langGraphConnections]);

  const updateLangGraphState = useCallback((reportId: string, state: Partial<LangGraphState>) => {
    setReports(prev => prev.map(report => 
      report.reportId === reportId 
        ? { 
            ...report, 
            langGraphState: { ...report.langGraphState, ...state },
            generatedAt: new Date()
          }
        : report
    ));

    if (currentReport?.reportId === reportId) {
      setCurrentReport(prev => prev ? {
        ...prev,
        langGraphState: { ...prev.langGraphState, ...state },
        generatedAt: new Date()
      } : null);
    }

    // Sync agent progress with analysis progress
    if (state.agentProgress) {
      const progressMapping: Record<string, keyof Report['analysisProgress']> = {
        'product-analysis': 'product',
        'place-analysis': 'place',
        'price-analysis': 'price',
        'promotion-analysis': 'promotion',
      };

      Object.entries(state.agentProgress).forEach(([agentId, progress]) => {
        const analysisType = progressMapping[agentId];
        if (analysisType) {
          updateAnalysisProgress(reportId, analysisType, progress.progress);
        }
      });
    }
  }, [currentReport]);

  const getMCPServerStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/agent/mcp-status');
      return await response.json();
    } catch (error) {
      console.error('Error fetching MCP server status:', error);
      return {};
    }
  }, []);

  const getAgentHealth = useCallback(async () => {
    try {
      const response = await fetch('/api/agent/health');
      return await response.json();
    } catch (error) {
      console.error('Error fetching agent health:', error);
      return { status: 'unknown' };
    }
  }, []);

  // Enhanced collaboration methods
  const shareReport = useCallback(async (reportId: string, collaboratorIds: string[]) => {
    if (!socket) return;

    socket.emit('share-report', { reportId, collaboratorIds });
    
    updateReport(reportId, {
      // Add collaboration metadata
      generatedAt: new Date(),
    });
  }, [socket]);

  const inviteCollaborator = useCallback(async (reportId: string, email: string, permissions: string[]) => {
    try {
      const response = await fetch('/api/collaboration/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, email, permissions }),
      });

      if (!response.ok) {
        throw new Error('Failed to invite collaborator');
      }

      return await response.json();
    } catch (error) {
      console.error('Error inviting collaborator:', error);
      throw error;
    }
  }, []);

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
    const currentAgentStatus = currentReport?.agentStatuses?.[agentId];
    const updatedStatus: AgentStatus = {
      agentId,
      agentName: status.agentName || currentAgentStatus?.agentName || 'Unknown Agent',
      status: status.status || currentAgentStatus?.status || 'idle',
      currentTask: status.currentTask || currentAgentStatus?.currentTask || '',
      progressPercentage: status.progressPercentage ?? currentAgentStatus?.progressPercentage ?? 0,
      substeps: status.substeps || currentAgentStatus?.substeps || [],
      estimatedCompletion: status.estimatedCompletion || currentAgentStatus?.estimatedCompletion,
      dataProcessed: status.dataProcessed ?? currentAgentStatus?.dataProcessed ?? 0,
      processingRate: status.processingRate ?? currentAgentStatus?.processingRate ?? 0,
      errors: status.errors || currentAgentStatus?.errors || [],
      lastUpdate: new Date(),
      userInteractionsPending: status.userInteractionsPending || currentAgentStatus?.userInteractionsPending || []
    };
    
    const update = {
      agentStatuses: {
        ...currentReport?.agentStatuses,
        [agentId]: updatedStatus
      }
    };
    updateReport(reportId, update);
  };

  const updateAnalysisProgress = (reportId: string, analysisType: keyof Report['analysisProgress'], progress: number) => {
    const currentProgress = currentReport?.analysisProgress;
    const update = {
      analysisProgress: {
        product: currentProgress?.product ?? 0,
        place: currentProgress?.place ?? 0,
        price: currentProgress?.price ?? 0,
        promotion: currentProgress?.promotion ?? 0,
        ...currentProgress,
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
    
    // Enhanced LangGraph Integration
    startLangGraphAnalysis,
    streamLangGraphUpdates,
    pauseAnalysis,
    resumeAnalysis,
    cancelAnalysis,
    
    // Enhanced State Management
    updateLangGraphState,
    getMCPServerStatus,
    getAgentHealth,
    
    // Existing methods
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
    
    // Enhanced Real-time collaboration
    subscribeToReportUpdates,
    broadcastUpdate,
    shareReport,
    inviteCollaborator,
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
};