'use client';

import React, { useState, useEffect } from 'react';
import { socketService, AnalysisProgress, AgentStarted, AgentCompleted, AnalysisCompleted, AnalysisError } from '../../services/socketService';

interface ProgressBarProps {
  value: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
};

interface AgentStatus {
  name: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  data?: any;
  error?: string;
}

interface RealTimeProgressProps {
  sessionId: string;
  parameters: any;
  onAnalysisCompleted?: (data: AnalysisCompleted) => void;
  onError?: (error: AnalysisError) => void;
}

export const RealTimeProgress: React.FC<RealTimeProgressProps> = ({
  sessionId,
  parameters,
  onAnalysisCompleted,
  onError
}) => {
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('Initializing analysis...');
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [agents, setAgents] = useState<AgentStatus[]>([
    { name: 'product', label: 'Product Analysis', status: 'pending', progress: 0 },
    { name: 'place', label: 'Place Analysis', status: 'pending', progress: 0 },
    { name: 'price', label: 'Price Analysis', status: 'pending', progress: 0 },
    { name: 'promotion', label: 'Promotion Analysis', status: 'pending', progress: 0 },
    { name: 'report', label: 'Report Generation', status: 'pending', progress: 0 }
  ]);

  useEffect(() => {
    const connectSocket = async () => {
      try {
        setConnectionStatus('connecting');
        await socketService.connect();
        setConnectionStatus('connected');
      } catch (error) {
        console.error('Failed to connect to socket:', error);
        setConnectionStatus('disconnected');
      }
    };

    connectSocket();

    // Set up event listeners
    const progressId = socketService.onProgress((progress: AnalysisProgress) => {
      if (progress.sessionId !== sessionId) return;
      
      setOverallProgress(progress.overallProgress);
      setCurrentMessage(progress.message);
      
      setAgents(prev => prev.map(agent => 
        agent.name === progress.agent 
          ? { ...agent, status: 'running', progress: progress.agentProgress }
          : agent
      ));
    });

    const agentStartedId = socketService.onAgentStarted((data: AgentStarted) => {
      if (data.sessionId !== sessionId) return;
      
      setAgents(prev => prev.map(agent => 
        agent.name === data.agent 
          ? { ...agent, status: 'running', progress: 0 }
          : agent
      ));
      setCurrentMessage(`Starting ${data.label}...`);
    });

    const agentCompletedId = socketService.onAgentCompleted((data: AgentCompleted) => {
      if (data.sessionId !== sessionId) return;
      
      setAgents(prev => prev.map(agent => 
        agent.name === data.agent 
          ? { ...agent, status: 'completed', progress: 100, data: data.data }
          : agent
      ));
      setCurrentMessage(`${data.agent} analysis completed!`);
    });

    const analysisCompletedId = socketService.onAnalysisCompleted((data: AnalysisCompleted) => {
      if (data.sessionId !== sessionId) return;
      
      setOverallProgress(100);
      setCurrentMessage('Analysis completed successfully!');
      onAnalysisCompleted?.(data);
    });

    const errorId = socketService.onError((error: AnalysisError) => {
      if (error.sessionId !== sessionId) return;
      
      setCurrentMessage(`Error: ${error.error}`);
      onError?.(error);
    });

    return () => {
      socketService.removeCallback('progress', progressId);
      socketService.removeCallback('agentStarted', agentStartedId);
      socketService.removeCallback('agentCompleted', agentCompletedId);
      socketService.removeCallback('analysisCompleted', analysisCompletedId);
      socketService.removeCallback('error', errorId);
    };
  }, [sessionId, onAnalysisCompleted, onError]);

  const startAnalysis = () => {
    if (connectionStatus === 'connected') {
      socketService.startAnalysis(sessionId, parameters);
      setAnalysisStarted(true);
      setCurrentMessage('Starting analysis...');
    }
  };

  const pauseAnalysis = () => {
    socketService.pauseAnalysis(sessionId);
    setIsPaused(true);
    setCurrentMessage('Analysis paused');
  };

  const resumeAnalysis = () => {
    socketService.resumeAnalysis(sessionId);
    setIsPaused(false);
    setCurrentMessage('Analysis resumed');
  };

  const stopAnalysis = () => {
    socketService.stopAnalysis(sessionId);
    setAnalysisStarted(false);
    setIsPaused(false);
    setOverallProgress(0);
    setCurrentMessage('Analysis stopped');
    setAgents(prev => prev.map(agent => ({ 
      ...agent, 
      status: 'pending', 
      progress: 0 
    })));
  };

  const getStatusIcon = (status: AgentStatus['status']) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'running':
        return '🔄';
      case 'completed':
        return '✅';
      case 'error':
        return '❌';
    }
  };

  const getStatusColor = (status: AgentStatus['status']) => {
    switch (status) {
      case 'pending':
        return 'text-gray-500';
      case 'running':
        return 'text-blue-600';
      case 'completed':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Analysis Progress</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' : 
            connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          <span className="text-sm text-gray-600 capitalize">{connectionStatus}</span>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-600">{Math.round(overallProgress)}%</span>
        </div>
        <ProgressBar value={overallProgress} size="lg" />
        <p className="text-sm text-gray-600 min-h-[20px]">{currentMessage}</p>
      </div>

      {/* Agent Progress */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-800">Agent Status</h4>
        {agents.map((agent) => (
          <div key={agent.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getStatusIcon(agent.status)}</span>
                <span className={`text-sm font-medium ${getStatusColor(agent.status)}`}>
                  {agent.label}
                </span>
              </div>
              <span className="text-sm text-gray-600">{Math.round(agent.progress)}%</span>
            </div>
            <ProgressBar value={agent.progress} size="sm" />
          </div>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        {!analysisStarted ? (
          <button
            onClick={startAnalysis}
            disabled={connectionStatus !== 'connected'}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            🚀 Start Analysis
          </button>
        ) : (
          <>
            {!isPaused ? (
              <button
                onClick={pauseAnalysis}
                className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
              >
                ⏸️ Pause
              </button>
            ) : (
              <button
                onClick={resumeAnalysis}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                ▶️ Resume
              </button>
            )}
            <button
              onClick={stopAnalysis}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              🛑 Stop
            </button>
          </>
        )}
      </div>

      {/* Session Info */}
      <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
        Session ID: {sessionId.slice(0, 8)}...
      </div>
    </div>
  );
};

export default RealTimeProgress;