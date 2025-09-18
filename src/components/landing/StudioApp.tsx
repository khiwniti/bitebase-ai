"use client";

import React, { useState } from "react";
import LandingPage from "./LandingPage";
import ResearchWorkflow from "./ResearchWorkflow";
import ChatInterface from "../chat/ChatInterface";

type ViewType = "landing" | "research" | "chat";

const StudioApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("landing");

  const navigateToResearch = () => {
    setCurrentView("research");
  };

  const navigateToChat = () => {
    setCurrentView("chat");
  };

  const navigateToLanding = () => {
    setCurrentView("landing");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "landing":
        return (
          <LandingPage
            onNavigateToResearch={navigateToResearch}
            onNavigateToChat={navigateToChat}
          />
        );
      case "research":
        return (
          <ResearchWorkflow
            onNavigateBack={navigateToLanding}
            onNavigateToChat={navigateToChat}
          />
        );
      case "chat":
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            {/* Header for Chat */}
            <div className="border-b border-gray-800 bg-black/20 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={navigateToLanding}
                      className="text-gray-300 hover:text-white flex items-center text-sm"
                    >
                      ← Back to Studio
                    </button>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">💬</span>
                      </div>
                      <div>
                        <h1 className="text-lg font-semibold text-white">Culinary Compass AI</h1>
                        <p className="text-sm text-gray-400">Restaurant Intelligence Chat</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={navigateToResearch}
                      className="text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 px-3 py-1 rounded text-sm"
                    >
                      Switch to Research
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat Interface */}
            <div className="h-[calc(100vh-80px)]">
              <ChatInterface />
            </div>
          </div>
        );
      default:
        return (
          <LandingPage
            onNavigateToResearch={navigateToResearch}
            onNavigateToChat={navigateToChat}
          />
        );
    }
  };

  return <div className="min-h-screen">{renderCurrentView()}</div>;
};

export default StudioApp;