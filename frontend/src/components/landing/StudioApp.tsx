"use client";

import React, { useState } from "react";
import LandingPage from "./LandingPage";
import ResearchWorkflow from "./ResearchWorkflow";
import ChatInterface from "../chat/ChatInterface";
import MapComponent from "../map/MapComponent";

type ViewType = "landing" | "research" | "chat";

const StudioApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("landing");
  const [initialChatMessage, setInitialChatMessage] = useState<string>("");

  const navigateToResearch = () => {
    setInitialChatMessage(""); // Clear any initial message
    setCurrentView("research");
  };

  const navigateToChat = (message?: string) => {
    if (message) {
      setInitialChatMessage(message);
    }
    setCurrentView("chat");
  };

  const navigateToLanding = () => {
    setInitialChatMessage(""); // Clear any initial message
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
          <div className="min-h-screen bg-white">
            {/* Header for Chat */}
            <div className="border-b border-gray-200 bg-white">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={navigateToLanding}
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded flex items-center text-sm"
                    >
                      ← Back to Studio
                    </button>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">💬</span>
                      </div>
                      <div>
                        <h1 className="text-lg font-semibold text-gray-900">BiteBase Intelligence</h1>
                        <p className="text-sm text-gray-600">Restaurant Intelligence Chat with Map</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={navigateToResearch}
                      className="text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-orange-300 hover:bg-orange-50 px-3 py-1 rounded text-sm"
                    >
                      Switch to Research
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map and Chat Layout */}
            <div className="h-[calc(100vh-80px)] flex flex-col max-w-full mx-auto px-2 sm:px-3 overflow-hidden bg-gray-50">
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 min-h-0 overflow-hidden p-4">
                {/* Map Component - Takes up 2/3 of the space */}
                <div className="lg:col-span-2 min-h-0 overflow-hidden">
                  <MapComponent />
                </div>
                
                {/* Chat Interface - Takes up 1/3 of the space */}
                <div className="lg:col-span-1 min-h-0 overflow-hidden">
                  <ChatInterface initialMessage={initialChatMessage} />
                </div>
              </div>
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