// AI Service for connecting to LangGraph agent via Copilot API
"use client";

interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface MapContext {
  center: { lat: number; lng: number };
  zoom: number;
  markers: Array<{
    id: string;
    type: string;
    position: { lat: number; lng: number };
    title: string;
    description?: string;
  }>;
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

interface AIServiceResponse {
  content: string;
  actions?: Array<{
    type: 'add_marker' | 'remove_marker' | 'update_zoom' | 'update_center' | 'clear_markers' | 'bulk_add_markers';
    payload: any;
  }>;
  metadata?: {
    confidence: number;
    reasoning?: string;
  };
}

class AIService {
  private baseUrl: string;
  private model: string;
  private conversationHistory: AIMessage[] = [];

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_LANGGRAPH_ENDPOINT || 'http://localhost:8123';
    this.model = 'starterAgent'; // LangGraph assistant ID
    
    // Initialize with system context
    this.conversationHistory = [{
      role: 'system',
      content: `You are an AI assistant specialized in map interaction and geospatial analysis. 
      You can help users with:
      - Adding markers (POI, business, location, route)
      - Map navigation (zoom, pan, center)
      - Data analysis and insights
      - Bulk operations
      - Geographic queries

      When responding, you can suggest actions by including them in your response. Available actions:
      - add_marker: Add a single marker
      - bulk_add_markers: Add multiple markers
      - remove_marker: Remove a specific marker
      - clear_markers: Remove all markers
      - update_zoom: Change zoom level
      - update_center: Change map center
      
      Always provide helpful, contextual responses about map operations and geographic data.`
    }];
  }

  async sendMessage(message: string, mapContext: MapContext): Promise<AIServiceResponse> {
    try {
      // Clear conversation history to avoid malformed tool calls from previous sessions
      // TODO: Remove this once tool call issues are resolved
      this.clearHistory();
      
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: `${message}\n\nCurrent map context: ${JSON.stringify(mapContext, null, 2)}`
      });

      // Generate a unique thread ID for this conversation
      const threadId = `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Prepare the request to the LangGraph agent using streaming
      const response = await fetch(`${this.baseUrl}/runs/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistant_id: this.model,
          input: {
            messages: this.conversationHistory.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          },
          config: {
            configurable: {
              thread_id: threadId
            }
          },
          stream_mode: "values"
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response (Server-Sent Events format)
      let aiResponse = '';
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      if (!reader) {
        throw new Error('No response body reader available');
      }

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
          
          // Process complete events
          const events = buffer.split('\n\n');
          buffer = events.pop() || ''; // Keep incomplete event in buffer

          for (const event of events) {
            if (!event.trim()) continue;
            
            try {
              const lines = event.split('\n');
              let eventType = '';
              let eventDataLines: string[] = [];
              
              for (const line of lines) {
                if (line.startsWith('event: ')) {
                  eventType = line.slice(7);
                } else if (line.startsWith('data: ')) {
                  // Collect all data lines
                  eventDataLines.push(line.slice(6));
                }
              }
              
              // Join all data lines to form complete JSON
              const eventData = eventDataLines.join('');
              
              if (eventType === 'values' && eventData) {
                const data = JSON.parse(eventData);
                
                // Look for AI/assistant messages
                if (data.messages && Array.isArray(data.messages)) {
                  // Check each message, prioritizing AI/assistant messages
                  for (let i = data.messages.length - 1; i >= 0; i--) {
                    const msg = data.messages[i];
                    if (msg && msg.content && 
                        (msg.role === 'assistant' || msg.type === 'ai' || msg.type === 'AIMessage')) {
                      aiResponse = msg.content;
                      break; // Take the most recent AI message
                    }
                  }
                }
              }
            } catch (parseError) {
              console.warn('Failed to parse SSE event:', parseError);
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      if (!aiResponse) {
        console.warn('No AI response found in stream');
        throw new Error('No valid response received from agent - stream may have been interrupted');
      }

      // Add AI response to conversation history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse
      });

      // Parse response for potential actions
      const actions = this.parseActions(aiResponse, message, mapContext);

      return {
        content: aiResponse,
        actions: actions as Array<{ type: 'add_marker' | 'remove_marker' | 'update_zoom' | 'update_center' | 'clear_markers' | 'bulk_add_markers'; payload: any }>,
        metadata: {
          confidence: 0.85,
          reasoning: 'Response generated by LangGraph restaurant intelligence agent'
        }
      };

    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Fallback to local processing for offline/error scenarios
      return this.fallbackResponse(message, mapContext);
    }
  }

  private parseActions(response: string, userMessage: string, mapContext: MapContext): Array<{ type: string; payload: any }> {
    const actions = [];
    const lowerResponse = response.toLowerCase();
    const lowerMessage = userMessage.toLowerCase();

    // Pattern matching for common map operations
    if (lowerMessage.includes('add') && (lowerMessage.includes('marker') || lowerMessage.includes('pin'))) {
      // Determine marker type
      let markerType = 'location';
      if (lowerMessage.includes('poi') || lowerMessage.includes('landmark')) markerType = 'poi';
      if (lowerMessage.includes('business') || lowerMessage.includes('restaurant') || lowerMessage.includes('coffee')) markerType = 'business';
      if (lowerMessage.includes('route')) markerType = 'route';

      // Check for bulk operations
      const numberMatch = lowerMessage.match(/(\d+)/);
      const count = numberMatch ? parseInt(numberMatch[1]) : 1;

      if (count > 1) {
        actions.push({
          type: 'bulk_add_markers',
          payload: {
            count: Math.min(count, 10),
            type: markerType,
            center: mapContext.center
          }
        });
      } else {
        actions.push({
          type: 'add_marker',
          payload: {
            type: markerType,
            position: mapContext.center,
            title: `AI Generated ${markerType}`,
            description: `Created from: "${userMessage}"`
          }
        });
      }
    }

    if (lowerMessage.includes('clear') || lowerMessage.includes('remove all')) {
      actions.push({
        type: 'clear_markers',
        payload: {}
      });
    }

    if (lowerMessage.includes('zoom')) {
      const zoomMatch = lowerMessage.match(/zoom.*?(\d+)/);
      if (zoomMatch) {
        actions.push({
          type: 'update_zoom',
          payload: { zoom: parseInt(zoomMatch[1]) }
        });
      } else if (lowerMessage.includes('in')) {
        actions.push({
          type: 'update_zoom',
          payload: { zoom: Math.min(20, mapContext.zoom + 2) }
        });
      } else if (lowerMessage.includes('out')) {
        actions.push({
          type: 'update_zoom',
          payload: { zoom: Math.max(1, mapContext.zoom - 2) }
        });
      }
    }

    // Geographic location commands
    if (lowerMessage.includes('go to') || lowerMessage.includes('center on')) {
      if (lowerMessage.includes('san francisco')) {
        actions.push({
          type: 'update_center',
          payload: { center: { lat: 37.7749, lng: -122.4194 } }
        });
      } else if (lowerMessage.includes('new york')) {
        actions.push({
          type: 'update_center',
          payload: { center: { lat: 40.7128, lng: -74.0060 } }
        });
      } else if (lowerMessage.includes('london')) {
        actions.push({
          type: 'update_center',
          payload: { center: { lat: 51.5074, lng: -0.1278 } }
        });
      }
    }

    return actions;
  }

  private fallbackResponse(message: string, mapContext: MapContext): AIServiceResponse {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('help')) {
      return {
        content: `🤖 **AI Map Assistant Help**

I can help you with:
• **Add markers**: "add 3 coffee shops near current location"
• **Map navigation**: "zoom to level 15", "center on New York"
• **Data analysis**: "analyze marker distribution"
• **Bulk operations**: "clear all markers", "add sample data"

Currently running in offline mode. Start the LangGraph agent server for enhanced capabilities.`,
        actions: []
      };
    }

    if (lowerMessage.includes('status')) {
      return {
        content: `📊 **Map Status**
• Markers: ${mapContext.markers.length}
• Center: ${mapContext.center.lat.toFixed(4)}, ${mapContext.center.lng.toFixed(4)}
• Zoom: ${mapContext.zoom.toFixed(1)}x
• API Status: Offline (using fallback mode)`,
        actions: []
      };
    }

    return {
      content: `I understand you said: "${message}". I'm currently in offline mode. Please start the LangGraph agent server and ensure it's running on port 8123.\n\nThen I'll be able to provide enhanced AI assistance!`,
      actions: []
    };
  }

  clearHistory() {
    this.conversationHistory = this.conversationHistory.slice(0, 1); // Keep system message
  }

  getConversationHistory(): AIMessage[] {
    return [...this.conversationHistory];
  }
}

// Singleton instance
export const aiService = new AIService();
export type { AIServiceResponse, MapContext };