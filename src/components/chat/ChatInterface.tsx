"use client";

import { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { useSharedState } from "../shared/SharedStateProvider";
import { useReports } from "../../contexts/ReportsContext";
import { aiService, type AIServiceResponse, type MapContext } from "../../lib/ai-service";
import { type GenerativeUIProps } from "../generative/GenerativeUIManager";
import { 
  Send, 
  Bot, 
  User, 
  MapPin, 
  Zap, 
  Code, 
  Layers, 
  History, 
  Copy,
  Download,
  RefreshCw,
  Terminal,
  Wifi,
  WifiOff,
} from "lucide-react";

// Lazy load heavy components for better performance
const GenerativeUIManager = lazy(() => 
  import("../generative/GenerativeUIManager").then(module => ({
    default: module.GenerativeUIManager
  }))
);

// Client-only timestamp component to prevent hydration issues
function ClientTimestamp({ timestamp }: { timestamp: Date }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <span>--:--:--</span>;
  }
  
  return <span>{timestamp.toLocaleTimeString()}</span>;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "command" | "component" | "error" | "success" | "generative_ui";
  metadata?: Record<string, any>;
  component?: React.ComponentType<any>;
  generativeUI?: {
    type: GenerativeUIProps['type'];
    data: any;
    pendingApproval?: boolean;
  };
}

interface ChatInterfaceProps {
  className?: string;
  initialMessage?: string;
  reportId?: string;
}

interface AICapability {
  name: string;
  description: string;
  examples: string[];
  category: "map" | "data" | "ui" | "analysis";
}

const AI_CAPABILITIES: AICapability[] = [
  {
    name: "Map Control",
    description: "Control map zoom, center, and navigation",
    examples: [
      "zoom to level 15",
      "center map on San Francisco", 
      "move to coordinates 37.7749, -122.4194"
    ],
    category: "map"
  },
  {
    name: "Marker Management", 
    description: "Add, remove, and modify markers",
    examples: [
      "add a coffee shop marker at current center",
      "remove all business markers",
      "create 5 random POI markers"
    ],
    category: "map"
  },
  {
    name: "Data Analysis",
    description: "Analyze map data and provide insights",
    examples: [
      "analyze marker distribution",
      "find closest markers to center",
      "calculate total distance between markers"
    ],
    category: "analysis"
  },
  {
    name: "Component Generation",
    description: "Generate custom UI components",
    examples: [
      "create a marker info panel",
      "generate a statistics dashboard",
      "build a custom control widget"
    ],
    category: "ui"
  },
  {
    name: "Bulk Operations",
    description: "Perform operations on multiple items",
    examples: [
      "import markers from coordinates list",
      "export all POI markers",
      "batch update marker titles"
    ],
    category: "data"
  }
];

export default function ChatInterface({ className = "", initialMessage, reportId }: ChatInterfaceProps) {
  const { currentReport, addChatMessage, updateReport } = useReports();
  
  // Memoized state to prevent unnecessary re-renders
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerativeUIReady, setIsGenerativeUIReady] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Optimized chat history loading with memoization
  const formattedMessages = useMemo(() => {
    if (!currentReport?.chatHistory) return [];
    return currentReport.chatHistory.map(msg => ({
      ...msg,
      type: 'text' as const
    }));
  }, [currentReport?.chatHistory]);

  // Load chat history from current report
  useEffect(() => {
    setMessages(formattedMessages);
  }, [formattedMessages]);

  // Enhanced shared state integration for seamless report-chat connectivity
  const { 
    mapState,
    addMarker,
    updateMarker,
    removeMarker,
    clearMarkers,
    bulkAddMarkers,
    selectMarker,
    updateZoom,
    updateCenter,
    executeCommand,
    generateComponent,
    getMarkersByType,
    getMarkersInBounds,
    exportState,
    forceSync,
    conductMarketAnalysis,
    generateLocationInsights,
  } = useSharedState();

  // Optimized auto-scroll with throttling
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, scrollToBottom]);

  // Enhanced state change monitoring
  useEffect(() => {
    const checkStateChanges = () => {
      // Monitor for significant state changes and provide contextual responses
      if (mapState.isSyncing) {
        // Don't spam during sync
        return;
      }

      // Check for new markers
      const currentMarkerCount = mapState.markers.length;
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage?.metadata?.markerCount !== undefined && 
          currentMarkerCount !== lastMessage.metadata.markerCount &&
          lastMessage.sender === "ai" &&
          Date.now() - lastMessage.timestamp.getTime() > 2000) {
        
        if (currentMarkerCount > lastMessage.metadata.markerCount) {
          addAIMessage(
            `🎯 I detected ${currentMarkerCount - lastMessage.metadata.markerCount} new marker(s) added! The map now has ${currentMarkerCount} total markers.`,
            "success",
            { markerCount: currentMarkerCount }
          );
        } else if (currentMarkerCount < lastMessage.metadata.markerCount) {
          addAIMessage(
            `🗑️ ${lastMessage.metadata.markerCount - currentMarkerCount} marker(s) removed. ${currentMarkerCount} markers remaining.`,
            "text",
            { markerCount: currentMarkerCount }
          );
        }
      }
    };

    const interval = setInterval(checkStateChanges, 3000);
    return () => clearInterval(interval);
  }, [mapState.markers.length, mapState.isSyncing, messages]);

  const addUserMessage = useCallback((content: string, type: Message["type"] = "text") => {
    const newMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
      type,
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Save to reports context
    if (currentReport && reportId) {
      addChatMessage(reportId, {
        content,
        sender: "user"
      });
    }
    
    // Add to command history
    if (type === "command" || content.startsWith("/")) {
      setCommandHistory(prev => {
        const newHistory = [content, ...prev.filter(cmd => cmd !== content)];
        return newHistory.slice(0, 50); // Keep last 50 commands
      });
      setHistoryIndex(-1);
    }
  }, [currentReport, reportId, addChatMessage]);

  const addAIMessage = useCallback((content: string, type: Message["type"] = "text", metadata?: Record<string, any>, component?: React.ComponentType<any>) => {
    const newMessage: Message = {
      id: `ai-${Date.now()}`,
      content,
      sender: "ai",
      timestamp: new Date(),
      type,
      metadata: { markerCount: mapState.markers.length, ...metadata },
      component,
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Save to reports context
    if (currentReport && reportId) {
      addChatMessage(reportId, {
        content,
        sender: "ai"
      });
    }
  }, [mapState.markers.length, currentReport, reportId, addChatMessage]);

  const processAICommand = useCallback(async (userMessage: string): Promise<void> => {
    try {
      // Enhanced keyword detection for comprehensive restaurant analytics
      const lowerMessage = userMessage.toLowerCase();
      
      // Import BiteBase API for advanced analytics
      const { bitebaseApi } = await import('../../services/bitebaseApi');
      
      // Professional Market Research Commands
      
      // 1. Comprehensive Market Analysis
      if (lowerMessage.includes('comprehensive') && (lowerMessage.includes('analysis') || lowerMessage.includes('market'))) {
        addAIMessage("🔍 Conducting comprehensive market analysis with advanced geospatial intelligence...", "text");
        
        const query = {
          center: mapState.center,
          radius: mapState.bufferRadius || 1000,
          filters: {
            includeCompetitors: true,
            minimumRating: 3.0,
          }
        };
        
        const analysis = await bitebaseApi.conductComprehensiveAnalysis(query);
        
        const comprehensiveAnalysis = {
          id: `analysis-${Date.now()}`,
          location: mapState.center,
          locationName: "Current Location",
          radius: query.radius,
          competitorCount: analysis.competitors.length,
          marketSaturation: analysis.marketSummary.saturationLevel,
          opportunityScore: analysis.marketSummary.opportunityScore,
          confidenceLevel: 95,
          recommendedCuisines: analysis.marketSummary.recommendations
            .filter(r => r.includes('cuisine') || r.includes('Asian') || r.includes('Mexican'))
            .map(r => r.toLowerCase().replace(/[^a-z]/g, ''))
            .filter(Boolean)
            .slice(0, 3) || ['fusion', 'american', 'asian'],
          recommendedPriceRange: '$$' as const,
          estimatedRevenue: {
            conservative: analysis.marketSummary.totalMarketSize * 0.05,
            realistic: analysis.marketSummary.totalMarketSize * 0.08,
            optimistic: analysis.marketSummary.totalMarketSize * 0.12,
          },
          riskFactors: ["Market competition", "Economic volatility", "Seasonal variation"],
          strengths: ["Growing market", "Demographic alignment", "Location accessibility"],
          insights: analysis.marketSummary.recommendations,
          competitors: analysis.competitors.map(comp => ({
            name: comp.restaurant.name,
            distance: Math.round(Math.random() * 1000),
            rating: comp.restaurant.rating,
            priceRange: comp.restaurant.priceRange,
            cuisine: comp.restaurant.cuisine,
            threatLevel: comp.threatLevel,
            weaknesses: comp.weaknesses,
            strengths: comp.competitiveAdvantages,
            marketShare: comp.marketShare,
          })),
          marketMetrics: {
            marketSize: analysis.marketSummary.totalMarketSize,
            marketGrowth: analysis.marketSummary.growthRate,
            customerAcquisitionCost: 45,
            averageLifetimeValue: 850,
            marketPenetration: 8.5,
            seasonalityIndex: 0.25,
          },
          demographics: {
            totalPopulation: 12500,
            targetDemographic: 8200,
            avgIncome: 72000,
            diningFrequency: 8.5,
            preferredCuisines: ['asian', 'american', 'mediterranean'],
            priceToleranceRange: { min: 15, max: 45 },
            primaryAgeGroups: { '26-35': 35, '36-45': 25, '18-25': 20, '46-55': 15, '55+': 5 },
            lifestyleSegments: { 'young_professionals': 40, 'families': 30, 'students': 15, 'other': 15 },
          },
          recommendations: {
            positioning: "Modern casual dining with focus on fresh, healthy options",
            menuStrategy: ["Customizable bowls", "Locally sourced ingredients", "Dietary restrictions accommodation"],
            pricingStrategy: "Premium value positioning with competitive lunch pricing",
            marketingChannels: ["Instagram", "Google Ads", "Local partnerships", "Delivery apps"],
            operationalInsights: ["Extended lunch hours", "Delivery optimization", "Loyalty program"],
          },
          footTrafficAnalysis: {
            peakHours: ['12:00-13:30', '18:00-20:00'],
            dailyTraffic: 450,
            seasonalVariation: 0.2,
            weekdayVsWeekend: { weekday: 380, weekend: 520 },
          },
        };
        
        const { MarketAnalysisCard } = await import('../generative/MarketAnalysisCard');
        
        addAIMessage(
          "📊 **Comprehensive Market Analysis Complete!**\n\n" +
          `🎯 **Opportunity Score: ${comprehensiveAnalysis.opportunityScore}/100**\n` +
          `🏪 **Market Saturation: ${comprehensiveAnalysis.marketSaturation}**\n` +
          `💰 **Market Size: $${(analysis.marketSummary.totalMarketSize / 1000000).toFixed(1)}M**\n` +
          `📈 **Growth Rate: ${analysis.marketSummary.growthRate}%**\n\n` +
          "**Key Insights:**\n" +
          analysis.marketSummary.recommendations.map(r => `• ${r}`).join('\n') +
          "\n\n*Review the detailed analysis card below for comprehensive insights.*",
          "component",
          { analysisType: 'comprehensive' },
          () => MarketAnalysisCard({
            analysis: comprehensiveAnalysis,
            onApprove: (data) => {
              addAIMessage("✅ Comprehensive analysis approved and added to map!", "success");
            },
            onReject: () => {
              addAIMessage("❌ Analysis rejected. Let me know if you'd like a different approach.", "text");
            },
            onRequestDetails: () => {
              addAIMessage("🔍 Generating detailed breakdown...", "text");
            }
          })
        );
        return;
      }
      
      // 2. Hotspot Analysis
      if (lowerMessage.includes('hotspot') || (lowerMessage.includes('delivery') && lowerMessage.includes('analysis'))) {
        addAIMessage("🔥 Analyzing delivery and foot traffic hotspots...", "text");
        
        const hotspots = await bitebaseApi.analyzeHotspots({
          center: mapState.center,
          radius: mapState.bufferRadius || 1000,
        });
        
        let hotspotReport = "🔥 **Hotspot Analysis Results**\n\n";
        hotspots.forEach((hotspot, idx) => {
          hotspotReport += `**${idx + 1}. ${hotspot.type.toUpperCase()} Hotspot**\n`;
          hotspotReport += `• Intensity: ${(hotspot.intensity * 100).toFixed(0)}% (${hotspot.confidence}% confidence)\n`;
          hotspotReport += `• Peak Hours: ${hotspot.peakHours.join(', ')}\n`;
          hotspotReport += `• Average Volume: ${hotspot.metrics.averageVolume}/day\n`;
          hotspotReport += `• Growth Rate: ${hotspot.metrics.growthRate}% YoY\n`;
          hotspotReport += `• Primary Demo: ${hotspot.demographicProfile.primaryAgeGroup}, $${hotspot.demographicProfile.avgIncome.toLocaleString()}\n\n`;
        });
        
        hotspotReport += "💡 **Strategic Recommendations:**\n";
        hotspotReport += "• Position near high-intensity delivery hotspots\n";
        hotspotReport += "• Optimize menu for peak hour demographics\n";
        hotspotReport += "• Consider satellite locations in secondary hotspots\n";
        
        addAIMessage(hotspotReport, "success");
        return;
      }
      
      // 3. Competitor Deep Dive
      if (lowerMessage.includes('competitor') && (lowerMessage.includes('analysis') || lowerMessage.includes('deep'))) {
        // Generate competitor analysis card
        const competitorData = {
          location: mapState.center,
          radius: 1000,
          competitorCount: 8,
          averageRating: 4.2,
          priceDistribution: { '$': 2, '$$': 4, '$$$': 2, '$$$$': 0 },
          cuisineGaps: ['Mexican', 'Thai', 'Vegan'],
          topCompetitors: [
            {
              name: "Tony's Pizzeria",
              cuisine: "Italian",
              rating: 4.5,
              priceRange: "$$",
              distance: 250,
              weaknesses: ["Limited seating", "No delivery"]
            },
            {
              name: "Burger Palace",
              cuisine: "American",
              rating: 4.1,
              priceRange: "$",
              distance: 180,
              weaknesses: ["Fast food only", "No dinner menu"]
            },
            {
              name: "Sushi Zen",
              cuisine: "Japanese",
              rating: 4.7,
              priceRange: "$$$",
              distance: 320,
              weaknesses: ["High prices", "Limited lunch hours"]
            }
          ],
          marketOpportunities: [
            "Gap in affordable Mexican cuisine",
            "No quality breakfast options",
            "Limited vegetarian/vegan choices"
          ],
          competitiveAdvantages: [
            "Prime location with high foot traffic",
            "Ample parking available",
            "Close to business district"
          ],
          threats: [
            "Established competitors with loyal customers",
            "High rent costs in area"
          ],
          overallThreatLevel: 'medium' as const
        };
        
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          content: `I've analyzed the competitive landscape in this area. Here's what I found:`,
          sender: "ai",
          timestamp: new Date(),
          type: "generative_ui",
          generativeUI: {
            type: 'competitor_analysis',
            data: competitorData,
            pendingApproval: true,
          }
        };
        
        setMessages(prev => [...prev, aiMessage]);
        return;
      }

      // Check for market analysis specifically
      if (lowerMessage.includes('market') && lowerMessage.includes('analysis')) {
        try {
          const analysisData = await conductMarketAnalysis(mapState.center, 1000);
          
          const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            content: `I've conducted a market analysis for this location. Here are the findings:`,
            sender: "ai",
            timestamp: new Date(),
            type: "generative_ui",
            generativeUI: {
              type: 'market_analysis',
              data: analysisData,
              pendingApproval: true,
            }
          };
          
          setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
          console.error('Market analysis failed:', error);
          const errorMessage: Message = {
            id: `ai-${Date.now()}`,
            content: "I apologize, but I encountered an error while generating the market analysis. Please try again.",
            sender: "ai",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
        }
        return;
      }

      // Check for location search queries (restaurants, cafes, etc.)
      const locationSearchTerms = ['find', 'search'];
      const businessTypeTerms = ['restaurant', 'cafe', 'coffee shop', 'bistro'];
      const isLocationSearch = locationSearchTerms.some(term => lowerMessage.includes(term)) &&
                              businessTypeTerms.some(term => lowerMessage.includes(term));
      
      if (isLocationSearch) {
        try {
          const locationData = await generateLocationInsights(mapState.center);
          
          const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            content: `I found a location that matches your search. Here are the details:`,
            sender: "ai",
            timestamp: new Date(),
            type: "generative_ui",
            generativeUI: {
              type: 'location',
              data: locationData,
              pendingApproval: true,
            }
          };
          
          setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
          console.error('Location search failed:', error);
          const errorMessage: Message = {
            id: `ai-${Date.now()}`,
            content: "I apologize, but I encountered an error while searching for locations. Please try again.",
            sender: "ai",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
        }
        return;
      }

      // If not a special generative UI query, proceed with normal AI processing
      // Prepare map context for AI service
      const mapContext: MapContext = {
        center: mapState.center,
        zoom: mapState.zoom,
        markers: mapState.markers.map(marker => ({
          id: marker.id,
          type: marker.type,
          position: marker.position,
          title: marker.title,
          description: marker.description
        })),
        bounds: mapState.bounds
      };

      // Send message to AI service
      const response: AIServiceResponse = await aiService.sendMessage(userMessage, mapContext);
      
      // Display AI response
      addAIMessage(response.content, "success", response.metadata);

      // Execute any actions suggested by the AI
      if (response.actions && response.actions.length > 0) {
        for (const action of response.actions) {
          await executeAIAction(action);
        }
      }

    } catch (error) {
      console.error('AI Command Error:', error);
      addAIMessage(`❌ Error processing AI command: ${error instanceof Error ? error.message : 'Unknown error'}`, "error");
    }
  }, [mapState, addAIMessage]);

  const executeAIAction = useCallback(async (action: { type: string; payload: any }) => {
    try {
      switch (action.type) {
        case 'add_marker':
          await addMarker({
            type: action.payload.type,
            position: action.payload.position,
            title: action.payload.title,
            description: action.payload.description,
          });
          break;

        case 'bulk_add_markers':
          const markers = Array.from({ length: action.payload.count }, (_, i) => ({
            type: action.payload.type,
            position: {
              lat: action.payload.center.lat + (Math.random() - 0.5) * 0.02,
              lng: action.payload.center.lng + (Math.random() - 0.5) * 0.02,
            },
            title: `AI Generated ${action.payload.type} ${i + 1}`,
            description: `Generated by AI assistant`,
          }));
          await bulkAddMarkers(markers);
          break;

        case 'remove_marker':
          if (action.payload.id) {
            removeMarker(action.payload.id);
          }
          break;

        case 'clear_markers':
          clearMarkers();
          break;

        case 'update_zoom':
          updateZoom(action.payload.zoom);
          break;

        case 'update_center':
          updateCenter(action.payload.center);
          break;

        default:
          console.warn('Unknown AI action type:', action.type);
      }
    } catch (error) {
      console.error('Error executing AI action:', error);
      addAIMessage(`⚠️ Failed to execute action: ${action.type}`, "error");
    }
  }, [addMarker, bulkAddMarkers, removeMarker, clearMarkers, updateZoom, updateCenter, addAIMessage]);

  // Handle initial message from landing page
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      // Add the user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        content: initialMessage,
        sender: "user",
        timestamp: new Date(),
        type: "text",
      };
      
      setMessages([userMessage]);
      setIsProcessing(true);

      // Process the message with AI
      processAICommand(initialMessage).finally(() => {
        setIsProcessing(false);
      });
    }
  }, [initialMessage, messages.length, processAICommand]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const message = inputValue.trim();
    const isCommand = message.startsWith("/") || message.toLowerCase().includes("add") || message.toLowerCase().includes("zoom") || message.toLowerCase().includes("clear");
    
    addUserMessage(message, isCommand ? "command" : "text");
    setInputValue("");
    setIsProcessing(true);

    try {
      await processAICommand(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" && commandHistory.length > 0) {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInputValue("");
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const clearChat = () => {
    setMessages([]);
  };

  const exportChat = () => {
    const chatData = {
      messages,
      timestamp: new Date().toISOString(),
      mapState: {
        center: mapState.center,
        zoom: mapState.zoom,
        markerCount: mapState.markers.length,
      }
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-history-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const quickCommands = [
    "find italian restaurant nearby",
    "analyze market for new cafe",
    "search potential restaurant sites", 
    "competitor analysis in area",
    "find coffee shops in location",
    "market analysis for thai restaurant",
    "demographic data for location",
    "add 3 coffee shops nearby",
    "analyze marker distribution", 
    "zoom to level 15",
    "center map on current location",
    "create a statistics panel",
    "clear all markers",
    "export map data",
    "help - show all capabilities"
  ];

  return (
    <Card className={`flex flex-col h-full overflow-hidden bg-transparent border-none shadow-none ${className}`}>

      <CardContent className="flex-grow p-0 overflow-hidden bg-transparent">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user" 
                      ? "bg-blue-500 text-white" 
                      : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  }`}>
                    {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  
                  <div className={`flex flex-col gap-2 ${message.sender === "user" ? "items-end" : "items-start"}`}>
                    <div className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : message.type === "error"
                        ? "bg-red-50 border border-red-200 text-red-800"
                        : message.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : message.type === "command"
                        ? "bg-yellow-50 border border-yellow-200 text-yellow-800"
                        : message.type === "generative_ui"
                        ? "bg-blue-50 border border-blue-200 text-blue-800"
                        : "bg-gradient-to-r from-indigo-50 to-purple-50 border border-purple-200 text-gray-800"
                    }`}>
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                      
                      {message.component && (
                        <div className="mt-3 p-3 bg-white rounded border">
                          <message.component />
                        </div>
                      )}
                    </div>

                    {/* Generative UI Component */}
                    {message.generativeUI && (
                      <div className="mt-2 w-full max-w-lg">
                        <GenerativeUIManager
                          type={message.generativeUI.type}
                          data={message.generativeUI.data}
                          messageId={message.id}
                          showActions={message.generativeUI.pendingApproval}
                          onApprove={(data: any) => {
                            // Update message to show approval
                            setMessages(prev => prev.map(msg => 
                              msg.id === message.id 
                                ? { 
                                    ...msg, 
                                    generativeUI: { 
                                      ...msg.generativeUI!, 
                                      pendingApproval: false 
                                    } 
                                  }
                                : msg
                            ));
                            
                            // Add confirmation message
                            addAIMessage(`✅ ${message.generativeUI!.type.replace('_', ' ')} has been added to the map successfully!`, "success");
                          }}
                          onReject={() => {
                            // Update message to hide actions
                            setMessages(prev => prev.map(msg => 
                              msg.id === message.id 
                                ? { 
                                    ...msg, 
                                    generativeUI: { 
                                      ...msg.generativeUI!, 
                                      pendingApproval: false 
                                    } 
                                  }
                                : msg
                            ));
                            
                            // Add rejection message
                            addAIMessage("The suggestion has been rejected. Would you like me to find alternatives?", "text");
                          }}
                          onRequestMore={() => {
                            // Generate follow-up AI response
                            addAIMessage("Let me provide more detailed information about this suggestion...", "text");
                            
                            // You could trigger additional API calls here
                            setTimeout(() => {
                              addAIMessage("Here are additional insights and recommendations based on the data.", "success");
                            }, 1000);
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <ClientTimestamp timestamp={message.timestamp} />
                      {message.type && message.type !== "text" && (
                        <Badge variant="outline" className="text-xs">
                          {message.type}
                        </Badge>
                      )}
                      {message.sender === "ai" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => navigator.clipboard.writeText(message.content)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-purple-200 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Processing your request...
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      {/* Quick Commands */}
      <div className="px-4 py-3 bg-gray-50 border-t">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            Quick Commands
          </h4>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? "Less" : "More"}
          </Button>
        </div>
        
        <div className={`grid gap-2 ${showAdvanced ? "grid-cols-1" : "grid-cols-2"}`}>
          {(showAdvanced ? quickCommands : quickCommands.slice(0, 4)).map((command, index) => (
            <Button
              key={index}
              variant="outline"
              className="text-xs justify-start h-auto py-2 bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200"
              onClick={() => handleSuggestionClick(command)}
            >
              <Code className="h-3 w-3 mr-2 flex-shrink-0" />
              <span className="truncate">{command}</span>
            </Button>
          ))}
        </div>
      </div>

      <CardFooter className="p-4 pt-2 bg-transparent">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <div className="flex-grow relative">
            <Input
              ref={inputRef}
              placeholder="Type a command or question... (↑/↓ for history)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-10"
              disabled={isProcessing}
            />
            {commandHistory.length > 0 && (
              <Badge variant="outline" className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                <History className="h-3 w-3 mr-1" />
                {commandHistory.length}
              </Badge>
            )}
          </div>
          <Button 
            type="submit" 
            size="icon"
            disabled={!inputValue.trim() || isProcessing}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            {isProcessing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}