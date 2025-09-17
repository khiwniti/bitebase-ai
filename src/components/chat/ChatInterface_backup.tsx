"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { useSharedState } from "../shared/SharedStateProvider";
import { aiService, type AIServiceResponse, type MapContext } from "../../lib/ai-service";
import { 
  Send, 
  Bot, 
  User, 
  MapPin, 
  Zap, 
  Code, 
  Layers, 
  History, 
  Trash2,
  Copy,
  Download,
  RefreshCw,
  Sparkles,
  Terminal,
  Eye,
  EyeOff,
  Wifi,
  WifiOff,
} from "lucide-react";

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
  type?: "text" | "command" | "component" | "error" | "success";
  metadata?: Record<string, any>;
  component?: React.ComponentType<any>;
}

interface ChatInterfaceProps {
  className?: string;
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

export default function ChatInterface({ className = "" }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      content: "🚀 **Enhanced AI Map Assistant** is now online! I have full control over your map with advanced capabilities:",
      sender: "ai",
      timestamp: new Date(),
      type: "success",
    },
    {
      id: "welcome-2", 
      content: "✨ **New Features:**\n• Real Mapbox integration with live updates\n• Generative UI component creation\n• Advanced command execution\n• Bulk operations & data analysis\n• History management with undo/redo\n• Real-time state synchronization",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
    {
      id: "welcome-3",
      content: "🎯 Try commands like: *'add 3 coffee shops near current location'*, *'analyze marker distribution'*, or *'create a custom info panel'*",
      sender: "ai", 
      timestamp: new Date(),
      type: "text",
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced shared state integration
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
  } = useSharedState();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    
    // Add to command history
    if (type === "command" || content.startsWith("/")) {
      setCommandHistory(prev => {
        const newHistory = [content, ...prev.filter(cmd => cmd !== content)];
        return newHistory.slice(0, 50); // Keep last 50 commands
      });
      setHistoryIndex(-1);
    }
  }, []);

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
  }, [mapState.markers.length]);

  const processAICommand = useCallback(async (userMessage: string): Promise<void> => {
    try {
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
    <Card className={`flex flex-col h-full bg-white overflow-hidden ${className}`}>
      <CardHeader className="flex-shrink-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white py-2 px-3 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold flex items-center gap-2 truncate">
              <Bot className="h-4 w-4 flex-shrink-0" />
              AI Assistant
            </h2>
            <p className="text-xs opacity-90 flex items-center gap-2 mt-1 truncate">
              {mapState.isSyncing ? (
                <>
                  <RefreshCw className="h-3 w-3 animate-spin flex-shrink-0" />
                  Syncing...
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3 flex-shrink-0" />
                  {mapState.markers.length} markers • {mapState.zoom.toFixed(1)}x
                </>
              )}
            </p>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 p-1 h-6 w-6"
              onClick={() => setShowCapabilities(!showCapabilities)}
            >
              {showCapabilities ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 p-1 h-6 w-6"
              onClick={clearChat}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Capabilities Panel */}
      {showCapabilities && (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            AI Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {AI_CAPABILITIES.map((capability, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border">
                <h4 className="font-medium text-xs text-gray-800 mb-1">{capability.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{capability.description}</p>
                <div className="space-y-1">
                  {capability.examples.slice(0, 2).map((example, i) => (
                    <button
                      key={i}
                      className="block text-xs text-blue-600 hover:text-blue-800 hover:underline text-left"
                      onClick={() => handleSuggestionClick(example)}
                    >
                      "{example}"
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CardContent className="flex-grow p-0 overflow-hidden">
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

      <CardFooter className="p-4 pt-2 border-t">
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