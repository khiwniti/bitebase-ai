"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  FileText,
  Download,
  RefreshCw,
  AlertCircle,
  Target,
  Building2,
} from "lucide-react";

interface ResearchWorkflowProps {
  onNavigateBack: () => void;
  onNavigateToChat: (message?: string) => void;
}

const ResearchWorkflow: React.FC<ResearchWorkflowProps> = ({
  onNavigateBack,
  onNavigateToChat,
}) => {
  const [activeStep, setActiveStep] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);

  const researchSteps = [
    {
      id: 1,
      title: "Setting up workspace",
      status: "completed",
      description: "Initializing research environment",
    },
    {
      id: 2,
      title: "Initializing environment",
      status: "completed", 
      description: "Loading market data sources",
    },
    {
      id: 3,
      title: "Building analysis",
      status: "active",
      description: "Analyzing market conditions and competitors",
    },
    {
      id: 4,
      title: "Finalizing report",
      status: "pending",
      description: "Generating comprehensive insights",
    },
  ];

  const researchComponents = [
    {
      title: "Market Overview",
      progress: 95,
      status: "completed",
      icon: BarChart3,
      insights: ["Market size: $2.3B", "Growth rate: 12.5%", "Key players: 24"],
    },
    {
      title: "Competitive Analysis", 
      progress: 87,
      status: "completed",
      icon: TrendingUp,
      insights: ["Direct competitors: 8", "Market share analysis", "SWOT framework"],
    },
    {
      title: "Customer Demographics",
      progress: 72,
      status: "active",
      icon: Users,
      insights: ["Target segments: 3", "Behavior patterns", "Purchasing trends"],
    },
    {
      title: "Location Intelligence",
      progress: 45,
      status: "active", 
      icon: MapPin,
      insights: ["Foot traffic analysis", "Demographics overlay", "Competition density"],
    },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveStep(4);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateBack}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Studio
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">MarketMapper AI</h1>
                  <p className="text-sm text-gray-600">Deep Market Research Report</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onNavigateToChat}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Switch to Chat
              </Button>
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                disabled={activeStep < 3}
              >
                Publish Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-600" />
                  Research Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {researchSteps.map((step) => (
                  <div key={step.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {step.status === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : step.status === "active" ? (
                        <div className="w-5 h-5 border-2 border-orange-500 rounded-full animate-pulse" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-medium text-sm">{step.title}</h3>
                      <p className="text-gray-600 text-xs">{step.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border-gray-200 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <FileText className="w-4 h-4 mr-2" />
                  )}
                  Generate Full Report
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  onClick={onNavigateToChat}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Ask AI Assistant
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Research Components */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Seattle Coffee Shop Market Analysis
              </h2>
              <p className="text-gray-600">
                Comprehensive market research report for downtown Seattle coffee market
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchComponents.map((component, index) => (
                <Card
                  key={index}
                  className="bg-white border-gray-200 shadow-sm"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                          <component.icon className="w-5 h-5 text-white" />
                        </div>
                        <CardTitle className="text-gray-900 text-lg">
                          {component.title}
                        </CardTitle>
                      </div>
                      <Badge
                        variant={component.status === "completed" ? "default" : "secondary"}
                        className={`text-xs ${component.status === "completed" ? "bg-green-100 text-green-800 border-green-200" : "bg-orange-100 text-orange-800 border-orange-200"}`}
                      >
                        {component.status === "completed" ? "Ready" : "Analyzing"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 text-sm">Progress</span>
                        <span className="text-gray-700 text-sm">{component.progress}%</span>
                      </div>
                      <Progress value={component.progress} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      {component.insights.map((insight, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Research Insights */}
            <Card className="bg-white border-gray-200 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-900 font-medium mb-3">Market Opportunities</h3>
                    <ul className="space-y-2">
                      <li className="text-gray-700 text-sm flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        High demand for specialty coffee in tech district
                      </li>
                      <li className="text-gray-700 text-sm flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        Limited competition in premium segment
                      </li>
                      <li className="text-gray-700 text-sm flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        Growing remote work culture driving demand
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-medium mb-3">Risk Factors</h3>
                    <ul className="space-y-2">
                      <li className="text-gray-700 text-sm flex items-start">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        High commercial real estate costs
                      </li>
                      <li className="text-gray-700 text-sm flex items-start">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        Seasonal demand fluctuations
                      </li>
                      <li className="text-gray-700 text-sm flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        Strong competition from established chains
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchWorkflow;