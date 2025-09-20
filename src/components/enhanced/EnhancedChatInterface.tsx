/**
 * Enhanced Chat Interface with LangGraph Integration
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  User, 
  Pause, 
  Play, 
  Square, 
  BarChart3, 
  MapPin, 
  DollarSign, 
  Megaphone 
} from 'lucide-react';
import { useReports, EnhancedRestaurantParams } from '@/contexts/ReportsContext';
import { EnhancedAgentProgress } from './EnhancedAgentProgress';

interface EnhancedChatInterfaceProps {
  reportId: string;
}

export function EnhancedChatInterface({ reportId }: EnhancedChatInterfaceProps) {
  const {
    currentReport,
    addChatMessage,
    startLangGraphAnalysis,
    pauseAnalysis,
    resumeAnalysis,
    cancelAnalysis,
  } = useReports();

  const [message, setMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisSessionId, setAnalysisSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentReport?.chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim() || !currentReport) return;

    // Add user message
    addChatMessage(reportId, {
      role: 'user',
      content: message,
      messageType: 'text',
    });

    const userMessage = message;
    setMessage('');

    // Check if this is an analysis request
    if (userMessage.toLowerCase().includes('analyze') || 
        userMessage.toLowerCase().includes('start analysis')) {
      await handleStartAnalysis();
    } else {
      // Add bot response (in production, this would call the LLM)
      setTimeout(() => {
        addChatMessage(reportId, {
          role: 'assistant',
          content: generateBotResponse(userMessage),
          messageType: 'text',
        });
      }, 1000);
    }
  };

  const handleStartAnalysis = async () => {
    if (!currentReport?.researchData?.requirements) {
      addChatMessage(reportId, {
        role: 'assistant',
        content: 'Please provide restaurant details first. What type of restaurant are you planning to open, and where?',
        messageType: 'text',
      });
      return;
    }

    setIsAnalyzing(true);

    // Convert requirements to enhanced params
    const enhancedParams: EnhancedRestaurantParams = {
      type: currentReport.researchData.requirements.restaurantType,
      cuisine: currentReport.researchData.requirements.cuisineType,
      location: {
        address: currentReport.researchData.requirements.location,
        district: extractDistrict(currentReport.researchData.requirements.location),
        city: 'Bangkok',
      },
      budget: {
        min: currentReport.researchData.requirements.budgetRange[0],
        max: currentReport.researchData.requirements.budgetRange[1],
      },
      targetCustomers: currentReport.researchData.requirements.targetCustomers.split(',').map(c => c.trim()),
      businessModel: currentReport.researchData.requirements.businessModel,
      radius: 2,
    };

    try {
      await startLangGraphAnalysis(reportId, enhancedParams);
      setAnalysisSessionId(currentReport.langGraphState?.sessionId || null);
      
      addChatMessage(reportId, {
        role: 'assistant',
        content: '🚀 Starting comprehensive market analysis using advanced AI agents...',
        messageType: 'system',
      });
    } catch (error) {
      console.error('Failed to start analysis:', error);
      addChatMessage(reportId, {
        role: 'assistant',
        content: '❌ Failed to start analysis. Please try again.',
        messageType: 'error',
      });
      setIsAnalyzing(false);
    }
  };

  const handlePauseAnalysis = async () => {
    if (analysisSessionId) {
      await pauseAnalysis(reportId);
      addChatMessage(reportId, {
        role: 'assistant',
        content: '⏸️ Analysis paused. You can resume it anytime.',
        messageType: 'system',
      });
    }
  };

  const handleResumeAnalysis = async () => {
    if (analysisSessionId) {
      await resumeAnalysis(reportId);
      addChatMessage(reportId, {
        role: 'assistant',
        content: '▶️ Analysis resumed.',
        messageType: 'system',
      });
    }
  };

  const handleCancelAnalysis = async () => {
    if (analysisSessionId) {
      await cancelAnalysis(reportId);
      setIsAnalyzing(false);
      setAnalysisSessionId(null);
      addChatMessage(reportId, {
        role: 'assistant',
        content: '🛑 Analysis cancelled.',
        messageType: 'system',
      });
    }
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('restaurant') || lowerMessage.includes('business')) {
      return 'I can help you analyze your restaurant business idea! Please provide details about your restaurant type, cuisine, location, and target budget.';
    }
    
    if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
      return 'Location is crucial for restaurant success. I can analyze foot traffic, competition density, rental costs, and accessibility for any area in Bangkok.';
    }
    
    if (lowerMessage.includes('menu') || lowerMessage.includes('food')) {
      return 'Menu analysis is one of my specialties! I can scrape data from Wongnai and Food Panda to identify popular dishes, optimal pricing, and seasonal trends.';
    }
    
    return 'I\'m here to help with your restaurant market research. I can analyze products, places, prices, and promotions using real Thai market data. What would you like to know?';
  };

  const extractDistrict = (location: string): string => {
    // Simple extraction - in production, this would use more sophisticated location parsing
    const districts = ['Sukhumvit', 'Silom', 'Siam', 'Thonglor', 'Ekkamai', 'Asoke', 'Phrom Phong'];
    const found = districts.find(district => 
      location.toLowerCase().includes(district.toLowerCase())
    );
    return found || 'Bangkok';
  };

  const getMessageIcon = (role: string, messageType?: string) => {
    if (messageType === 'system') return <Bot className="h-4 w-4 text-blue-500" />;
    if (messageType === 'error') return <Bot className="h-4 w-4 text-red-500" />;
    return role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-green-500" />;
  };

  const getAnalysisTypeIcon = (type: string) => {
    switch (type) {
      case 'product': return <BarChart3 className="h-4 w-4" />;
      case 'place': return <MapPin className="h-4 w-4" />;
      case 'price': return <DollarSign className="h-4 w-4" />;
      case 'promotion': return <Megaphone className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Analysis Controls */}
      {isAnalyzing && (
        <div className="p-4 bg-blue-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                Analysis Running
              </Badge>
              <span className="text-sm text-gray-600">
                Session: {analysisSessionId?.slice(-8)}
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePauseAnalysis}
              >
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResumeAnalysis}
              >
                <Play className="h-4 w-4 mr-1" />
                Resume
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleCancelAnalysis}
              >
                <Square className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Display */}
      {isAnalyzing && analysisSessionId && (
        <div className="p-4 border-b bg-gray-50">
          <EnhancedAgentProgress reportId={reportId} sessionId={analysisSessionId} />
        </div>
      )}

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {currentReport?.chatHistory?.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card
                className={`max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : msg.messageType === 'error'
                    ? 'bg-red-50 border-red-200'
                    : msg.messageType === 'system'
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white'
                }`}
              >
                <CardContent className="p-3">
                  <div className="flex items-start space-x-2">
                    {getMessageIcon(msg.role, msg.messageType)}
                    <div className="flex-1">
                      <p className="text-sm">{msg.content}</p>
                      {msg.timestamp && (
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about your restaurant analysis or type 'analyze' to start..."
            disabled={isAnalyzing}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isAnalyzing}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMessage('Analyze my restaurant concept')}
            disabled={isAnalyzing}
          >
            Start Analysis
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMessage('Show me product analysis details')}
            disabled={isAnalyzing}
          >
            Product Analysis
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMessage('Analyze location factors')}
            disabled={isAnalyzing}
          >
            Location Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}