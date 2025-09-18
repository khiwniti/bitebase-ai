"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  MessageSquare,
  Search,
  Target,
  Zap,
  Brain,
  Building2,
  Coffee,
  Utensils,
  FileText,
} from "lucide-react";

interface LandingPageProps {
  onNavigateToResearch: () => void;
  onNavigateToChat: (message?: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToResearch,
  onNavigateToChat,
}) => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const workspaceTemplates = [
    {
      id: "market-research",
      title: "MarketMapper AI",
      subtitle: "Deep Market Research Report",
      icon: BarChart3,
      description: "Comprehensive market analysis with AI-powered insights",
      features: ["Competitor Analysis", "Market Trends", "Consumer Behavior", "Growth Projections"],
      onClick: onNavigateToResearch,
    },
    {
      id: "culinary-compass",
      title: "BiteBase Intelligence",
      subtitle: "Restaurant Intelligence Chat",
      icon: MessageSquare,
      description: "Interactive AI assistant for restaurant analytics",
      features: ["Real-time Analytics", "Menu Optimization", "Customer Insights", "Performance Tracking"],
      onClick: onNavigateToChat,
    },
    {
      id: "location-intelligence",
      title: "Location Intelligence",
      subtitle: "Site Selection Analysis",
      icon: MapPin,
      description: "AI-powered location analysis for optimal restaurant placement",
      features: ["Demographic Analysis", "Foot Traffic", "Competition Mapping", "Revenue Forecasting"],
      onClick: onNavigateToResearch,
    },
    {
      id: "customer-insights",
      title: "Customer Intelligence",
      subtitle: "Behavioral Analytics",
      icon: Users,
      description: "Deep customer behavior analysis and segmentation",
      features: ["Customer Segmentation", "Preference Analysis", "Loyalty Tracking", "Churn Prediction"],
      onClick: onNavigateToChat,
    },
  ];

  const quickActions = [
    {
      icon: Building2,
      label: "Analyze restaurant market potential",
      action: onNavigateToResearch,
    },
    {
      icon: TrendingUp,
      label: "Generate competitive analysis report",
      action: onNavigateToResearch,
    },
    {
      icon: Coffee,
      label: "Optimize menu pricing strategy",
      action: () => onNavigateToChat("Optimize menu pricing strategy for my restaurant. Analyze current market trends and provide recommendations."),
    },
    {
      icon: Utensils,
      label: "Forecast customer demand patterns",
      action: () => onNavigateToChat("Forecast customer demand patterns for my restaurant. Analyze seasonal trends and peak hours."),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src="https://www.gstatic.com/monospace/250314/icon-192.png"
                  alt="BiteBase Studio"
                  className="w-8 h-8"
                />
                <h1 className="text-xl font-semibold text-gray-900">BiteBase Studio</h1>
                <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800 border-orange-200">
                  preview
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.push('/reports')}
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Reports Dashboard</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                Documentation
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                Support
              </Button>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-xs font-medium text-white">K</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="mb-6">
            <span className="text-3xl font-light text-gray-900 mb-2 block">Hello, Khiw</span>
            <span className="text-lg text-gray-600">Welcome to your restaurant intelligence platform</span>
          </div>
        </div>

        {/* AI Chat Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Start with AI Intelligence
          </h2>
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">BiteBase AI Assistant</h3>
                  <p className="text-gray-600">Get instant insights about your restaurant business</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">
                      Try: "Analyze coffee shop market in downtown Seattle" or "Generate customer segmentation report"
                    </span>
                    <Button
                      onClick={() => onNavigateToChat()}
                      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                    >
                      Start Chat
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="justify-start h-auto p-4 text-left border border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50"
                    onClick={action.action}
                  >
                    <action.icon className="w-5 h-5 mr-3 text-orange-600" />
                    <span className="text-gray-900">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Intelligence Workspaces</h2>
            <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              View All Templates
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workspaceTemplates.map((template) => (
              <Card
                key={template.id}
                className={`bg-white border-gray-200 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:border-orange-300 ${
                  hoveredCard === template.id ? "transform scale-[1.02] shadow-lg border-orange-400" : ""
                }`}
                onMouseEnter={() => setHoveredCard(template.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => template.onClick()}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
                        <template.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-900">{template.title}</CardTitle>
                        <p className="text-sm text-gray-600">{template.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{template.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Zap className="w-3 h-3 text-orange-600" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Workspaces */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Intelligence Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Seattle Coffee Market Analysis",
                subtitle: "market-analysis-001",
                status: "Completed",
                updated: "2 hours ago",
              },
              {
                title: "Customer Behavior Study",
                subtitle: "customer-insights-002", 
                status: "In Progress",
                updated: "5 hours ago",
              },
              {
                title: "Location Intelligence Report",
                subtitle: "location-study-003",
                status: "Completed",
                updated: "1 day ago",
              },
            ].map((workspace, index) => (
              <Card
                key={index}
                className="bg-white border-gray-200 shadow-sm cursor-pointer hover:shadow-md hover:border-orange-300 transition-all"
                onClick={() => workspace.status === "Completed" ? onNavigateToResearch() : onNavigateToChat()}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-medium">{workspace.title}</h3>
                      <p className="text-gray-600 text-sm">{workspace.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={workspace.status === "Completed" ? "default" : "secondary"}
                      className={`text-xs ${workspace.status === "Completed" ? "bg-green-100 text-green-800 border-green-200" : "bg-orange-100 text-orange-800 border-orange-200"}`}
                    >
                      {workspace.status}
                    </Badge>
                    <span className="text-gray-500 text-xs">{workspace.updated}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;