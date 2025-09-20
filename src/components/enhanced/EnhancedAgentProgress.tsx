/**
 * Enhanced Real-time Progress Tracker for LangGraph Agents
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import { useReports, LangGraphState } from '@/contexts/ReportsContext';

interface AgentProgressProps {
  reportId: string;
  sessionId?: string;
}

export function EnhancedAgentProgress({ reportId, sessionId }: AgentProgressProps) {
  const { currentReport, streamLangGraphUpdates } = useReports();
  const [langGraphState, setLangGraphState] = useState<LangGraphState | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    setIsStreaming(true);
    const unsubscribe = streamLangGraphUpdates(reportId, (update) => {
      setLangGraphState(update);
    });

    return () => {
      unsubscribe();
      setIsStreaming(false);
    };
  }, [sessionId, reportId, streamLangGraphUpdates]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running':
        return <Zap className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const agents = [
    { id: 'product-analysis', name: 'Product Analysis', description: 'Analyzing menu and pricing data' },
    { id: 'place-analysis', name: 'Place Analysis', description: 'Evaluating location and competition' },
    { id: 'price-analysis', name: 'Price Analysis', description: 'Forecasting revenue and profitability' },
    { id: 'promotion-analysis', name: 'Promotion Analysis', description: 'Customer sentiment and marketing insights' },
  ];

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Analysis Progress</span>
            <div className="flex items-center space-x-2">
              {isStreaming && (
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Live Updates
                </Badge>
              )}
              <span className="text-sm text-gray-600">
                {langGraphState?.overallProgress || 0}%
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress 
            value={langGraphState?.overallProgress || 0} 
            className="w-full h-3"
          />
          <p className="text-sm text-gray-600 mt-2">
            Session: {langGraphState?.sessionId || sessionId}
          </p>
        </CardContent>
      </Card>

      {/* Individual Agent Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => {
          const agentProgress = langGraphState?.agentProgress?.[agent.id];
          const progress = agentProgress?.progress || 0;
          const status = agentProgress?.status || 'pending';
          const currentTask = agentProgress?.currentTask || agent.description;

          return (
            <Card key={agent.id} className="relative">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status)}
                    <span>{agent.name}</span>
                  </div>
                  <Badge className={getStatusColor(status)}>
                    {status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={progress} className="w-full h-2" />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{progress}%</span>
                    {agentProgress?.startTime && (
                      <span>
                        Started: {new Date(agentProgress.startTime).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">
                    {currentTask}
                  </p>
                  {agentProgress?.error && (
                    <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
                      {agentProgress.error}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* MCP Server Status */}
      {langGraphState?.mcpServerStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">MCP Server Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {Object.entries(langGraphState.mcpServerStatus).map(([server, status]) => (
                <div
                  key={server}
                  className={`p-2 rounded text-xs text-center ${
                    status.connected
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  <div className="font-medium">{server}</div>
                  <div className="flex items-center justify-center mt-1">
                    {status.connected ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <AlertCircle className="h-3 w-3" />
                    )}
                  </div>
                  <div className="text-xs opacity-75">
                    Errors: {status.errorCount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Log */}
      {langGraphState?.errors && langGraphState.errors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-red-700">Recent Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {langGraphState.errors.slice(-5).map((error, index) => (
                <div
                  key={index}
                  className="p-2 bg-red-50 border border-red-200 rounded text-xs"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{error.agentId}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        error.severity === 'critical'
                          ? 'border-red-500 text-red-700'
                          : error.severity === 'high'
                          ? 'border-orange-500 text-orange-700'
                          : 'border-yellow-500 text-yellow-700'
                      }`}
                    >
                      {error.severity}
                    </Badge>
                  </div>
                  <p className="text-red-700 mt-1">{error.error}</p>
                  <p className="text-red-600 text-xs mt-1">
                    {new Date(error.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}