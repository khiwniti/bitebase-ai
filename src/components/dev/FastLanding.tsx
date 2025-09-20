"use client";

import React, { useState } from "react";

// Ultra-lightweight development landing page for faster loading
const FastLanding: React.FC = () => {
  const [currentView, setCurrentView] = useState<"landing" | "chat" | "research">("landing");

  if (currentView === "chat") {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentView("landing")}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ← Back to Landing
          </button>
          <h1 className="text-2xl font-bold mb-4">Chat Interface</h1>
          <div className="bg-gray-100 p-4 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-600">Development Mode - Fast Chat Placeholder</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "research") {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => setCurrentView("landing")}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ← Back to Landing
          </button>
          <h1 className="text-2xl font-bold mb-4">Research Workspace</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-6 rounded-lg h-80 flex items-center justify-center">
              <p className="text-blue-600">Map Component (Fast Loading)</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg h-80 flex items-center justify-center">
              <p className="text-green-600">Research Tools (Fast Loading)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">BiteBase AI</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-md">DEV MODE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Restaurant Intelligence Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered insights for restaurant success - Development Mode (Fast Loading)
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentView("research")}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Start Research
            </button>
            <button
              onClick={() => setCurrentView("chat")}
              className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
            >
              Open Chat
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Analysis</h3>
            <p className="text-gray-600">Fast development placeholder for market insights</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">🗺️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Location Intelligence</h3>
            <p className="text-gray-600">Lightweight map component for development</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-orange-600 text-xl">🤖</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Chat</h3>
            <p className="text-gray-600">Fast loading chat interface</p>
          </div>
        </div>

        {/* Performance Notice */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-yellow-400 text-xl">⚡</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Development Mode Active</h3>
              <p className="mt-1 text-sm text-yellow-700">
                This is a fast-loading development version. Heavy components (maps, analytics) 
                are replaced with lightweight placeholders for faster development cycles.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FastLanding;