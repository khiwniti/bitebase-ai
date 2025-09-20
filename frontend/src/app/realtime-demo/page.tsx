'use client';

import React, { useState } from 'react';
import RealTimeProgress from '../../components/realtime/RealTimeProgress';
import { AnalysisCompleted, AnalysisError } from '../../services/socketService';

export default function RealTimeDemoPage() {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Mock parameters for testing
  const parameters = {
    restaurantType: 'Thai Restaurant',
    cuisine: 'Thai',
    location: 'Bangkok, Sukhumvit',
    budget: { min: 1000000, max: 3000000 },
    radius: 2,
    targetCustomers: ['Food Enthusiasts', 'Families', 'Young Professionals'],
    businessModel: 'hybrid'
  };

  const handleAnalysisCompleted = (data: AnalysisCompleted) => {
    console.log('Analysis completed:', data);
    setAnalysisResult(data.finalReport);
    setError(null);
  };

  const handleError = (error: AnalysisError) => {
    console.error('Analysis error:', error);
    setError(error.error);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🍽️ BiteBase AI Real-Time Analysis
          </h1>
          <p className="text-gray-600">
            Watch the 4P analysis workflow in real-time
          </p>
        </div>

        {/* Parameters Display */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Parameters</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Restaurant Type:</span>
              <span className="ml-2 text-gray-600">{parameters.restaurantType}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Cuisine:</span>
              <span className="ml-2 text-gray-600">{parameters.cuisine}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Location:</span>
              <span className="ml-2 text-gray-600">{parameters.location}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Budget Range:</span>
              <span className="ml-2 text-gray-600">
                ฿{parameters.budget.min.toLocaleString()} - ฿{parameters.budget.max.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Analysis Radius:</span>
              <span className="ml-2 text-gray-600">{parameters.radius} km</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Business Model:</span>
              <span className="ml-2 text-gray-600 capitalize">{parameters.businessModel}</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="font-medium text-gray-700">Target Customers:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {parameters.targetCustomers.map((customer, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                  {customer}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Real-Time Progress Component */}
        <RealTimeProgress
          sessionId={sessionId}
          parameters={parameters}
          onAnalysisCompleted={handleAnalysisCompleted}
          onError={handleError}
        />

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-red-600 text-lg mr-2">❌</span>
              <h3 className="text-red-800 font-medium">Analysis Error</h3>
            </div>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        )}

        {/* Results Display */}
        {analysisResult && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              Analysis Results
            </h2>
            
            {/* Executive Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Executive Summary</h3>
              <p className="text-gray-600 leading-relaxed">{analysisResult.executiveSummary}</p>
            </div>

            {/* Viability Score */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Viability Score</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${analysisResult.viabilityScore}%` }}
                  />
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {analysisResult.viabilityScore}%
                </span>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Risk Assessment</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="font-medium text-gray-700">Risk Level:</span>
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                    analysisResult.riskAssessment.level === 'low' ? 'bg-green-100 text-green-800' :
                    analysisResult.riskAssessment.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {analysisResult.riskAssessment.level.toUpperCase()}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium text-gray-600 mb-2">Risk Factors:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {analysisResult.riskAssessment.factors.map((factor: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-600 mb-2">Mitigation Strategies:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {analysisResult.riskAssessment.mitigation.map((strategy: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Recommendations</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Immediate Actions</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {analysisResult.recommendations.immediate.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">Short Term (1-3 months)</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    {analysisResult.recommendations.shortTerm.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-800 mb-2">Long Term (6+ months)</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    {analysisResult.recommendations.longTerm.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Financial Summary</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    ฿{analysisResult.financialSummary.initialInvestment.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Initial Investment</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    ฿{analysisResult.financialSummary.projectedRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Annual Revenue</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {analysisResult.financialSummary.breakEvenMonths}
                  </div>
                  <div className="text-sm text-gray-600">Break-even (months)</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {analysisResult.financialSummary.roiTimeframe}
                  </div>
                  <div className="text-sm text-gray-600">ROI Timeframe</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}