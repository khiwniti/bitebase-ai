"use client";

import { v4 as uuidv4 } from 'uuid';

export interface ParsedCommand {
  id: string;
  originalText: string;
  intent: string;
  action: string;
  parameters: Record<string, any>;
  confidence: number;
  timestamp: Date;
}

export interface CommandPattern {
  pattern: RegExp;
  intent: string;
  action: string;
  parameterExtractors: Record<string, (match: RegExpMatchArray) => any>;
  confidence: number;
}

export class AIActionParser {
  private patterns: CommandPattern[] = [
    // Marker management patterns
    {
      pattern: /add\s+(\d+)?\s*(coffee|cafe|restaurant|business|poi|location|marker)s?\s*(?:at|near|around)?\s*(?:current\s+(?:location|center|position))?/i,
      intent: "add_markers",
      action: "bulk_add_markers",
      parameterExtractors: {
        count: (match) => match[1] ? parseInt(match[1]) : 1,
        type: (match) => {
          const typeStr = match[2].toLowerCase();
          if (typeStr.includes('coffee') || typeStr.includes('cafe') || typeStr.includes('restaurant') || typeStr.includes('business')) {
            return 'business';
          } else if (typeStr.includes('poi')) {
            return 'poi';
          }
          return 'location';
        },
        useCurrentLocation: () => true,
      },
      confidence: 0.9,
    },
    {
      pattern: /(?:remove|delete|clear)\s+all\s+(?:markers?|everything)/i,
      intent: "clear_map",
      action: "clear_markers",
      parameterExtractors: {},
      confidence: 0.95,
    },
    {
      pattern: /(?:remove|delete)\s+(?:all\s+)?(\w+)\s+markers?/i,
      intent: "remove_markers_by_type",
      action: "remove_markers_by_type",
      parameterExtractors: {
        type: (match) => match[1].toLowerCase(),
      },
      confidence: 0.85,
    },
    
    // Map navigation patterns
    {
      pattern: /zoom\s+(?:to\s+)?(?:level\s+)?(\d+)/i,
      intent: "zoom_to_level",
      action: "update_zoom",
      parameterExtractors: {
        level: (match) => Math.max(1, Math.min(20, parseInt(match[1]))),
      },
      confidence: 0.9,
    },
    {
      pattern: /zoom\s+(in|out)/i,
      intent: "zoom_relative",
      action: "update_zoom_relative",
      parameterExtractors: {
        direction: (match) => match[1].toLowerCase(),
        delta: (match) => match[1].toLowerCase() === 'in' ? 2 : -2,
      },
      confidence: 0.85,
    },
    {
      pattern: /(?:center|move|go)\s+(?:map\s+)?(?:to\s+|on\s+)?(?:coordinates?\s+)?([-+]?\d*\.?\d+)[,\s]+([-+]?\d*\.?\d+)/i,
      intent: "move_to_coordinates",
      action: "update_center",
      parameterExtractors: {
        lat: (match) => parseFloat(match[1]),
        lng: (match) => parseFloat(match[2]),
      },
      confidence: 0.95,
    },
    {
      pattern: /(?:center|move|go)\s+(?:map\s+)?(?:to\s+|on\s+)?(san francisco|new york|london|paris|tokyo|sydney|berlin|madrid|rome|amsterdam)/i,
      intent: "move_to_city",
      action: "update_center",
      parameterExtractors: {
        city: (match) => match[1].toLowerCase(),
        coordinates: (match) => {
          const cityCoords: Record<string, { lat: number; lng: number }> = {
            'san francisco': { lat: 37.7749, lng: -122.4194 },
            'new york': { lat: 40.7128, lng: -74.0060 },
            'london': { lat: 51.5074, lng: -0.1278 },
            'paris': { lat: 48.8566, lng: 2.3522 },
            'tokyo': { lat: 35.6762, lng: 139.6503 },
            'sydney': { lat: -33.8688, lng: 151.2093 },
            'berlin': { lat: 52.5200, lng: 13.4050 },
            'madrid': { lat: 40.4168, lng: -3.7038 },
            'rome': { lat: 41.9028, lng: 12.4964 },
            'amsterdam': { lat: 52.3676, lng: 4.9041 },
          };
          return cityCoords[match[1].toLowerCase()] || { lat: 0, lng: 0 };
        },
      },
      confidence: 0.9,
    },
    
    // Analysis patterns
    {
      pattern: /(?:analyze|analysis|report)\s+(?:marker\s+)?(?:distribution|data|statistics|stats)/i,
      intent: "analyze_data",
      action: "generate_analysis",
      parameterExtractors: {
        type: () => "distribution",
      },
      confidence: 0.8,
    },
    {
      pattern: /(?:find|show|get)\s+(?:closest|nearest)\s+markers?\s+(?:to\s+)?(?:center|current\s+location)/i,
      intent: "find_nearest",
      action: "find_nearest_markers",
      parameterExtractors: {
        count: () => 5,
      },
      confidence: 0.85,
    },
    {
      pattern: /calculate\s+(?:total\s+)?distance\s+between\s+(?:all\s+)?markers?/i,
      intent: "calculate_distance",
      action: "calculate_total_distance",
      parameterExtractors: {},
      confidence: 0.8,
    },
    
    // Component generation patterns
    {
      pattern: /(?:create|generate|build)\s+(?:a\s+)?(?:custom\s+)?(component|widget|panel|dashboard)\s*(?:for\s+)?(.+)?/i,
      intent: "generate_component",
      action: "create_custom_component",
      parameterExtractors: {
        componentType: (match) => match[1].toLowerCase(),
        description: (match) => match[2] || "custom component",
      },
      confidence: 0.75,
    },
    {
      pattern: /(?:create|generate)\s+(?:a\s+)?(?:statistics|stats|info|marker)\s+(panel|dashboard|widget)/i,
      intent: "generate_stats_component",
      action: "create_stats_component",
      parameterExtractors: {
        type: (match) => match[1].toLowerCase(),
      },
      confidence: 0.8,
    },
    
    // Data operations patterns
    {
      pattern: /(?:export|download|save)\s+(?:all\s+)?(?:map\s+)?(?:data|state|markers?)/i,
      intent: "export_data",
      action: "export_map_state",
      parameterExtractors: {},
      confidence: 0.9,
    },
    {
      pattern: /(?:import|load|upload)\s+(?:map\s+)?(?:data|state|markers?)/i,
      intent: "import_data",
      action: "import_map_state",
      parameterExtractors: {},
      confidence: 0.9,
    },
    
    // Bulk operations patterns
    {
      pattern: /(?:batch|bulk)\s+(?:update|modify)\s+(?:all\s+)?(\w+)\s+markers?\s+(?:titles?|names?)\s+(?:to\s+)?(.+)/i,
      intent: "bulk_update",
      action: "bulk_update_markers",
      parameterExtractors: {
        type: (match) => match[1].toLowerCase(),
        newTitle: (match) => match[2],
      },
      confidence: 0.75,
    },
    
    // Help and capabilities patterns
    {
      pattern: /(?:help|what\s+can\s+you\s+do|capabilities|commands|features)/i,
      intent: "show_help",
      action: "display_capabilities",
      parameterExtractors: {},
      confidence: 0.95,
    },
  ];

  private fallbackPatterns: CommandPattern[] = [
    {
      pattern: /add|create/i,
      intent: "add_something",
      action: "suggest_add_options",
      parameterExtractors: {},
      confidence: 0.3,
    },
    {
      pattern: /remove|delete|clear/i,
      intent: "remove_something",
      action: "suggest_remove_options",
      parameterExtractors: {},
      confidence: 0.3,
    },
    {
      pattern: /zoom|level/i,
      intent: "zoom_something",
      action: "suggest_zoom_options",
      parameterExtractors: {},
      confidence: 0.3,
    },
    {
      pattern: /move|center|go/i,
      intent: "move_something",
      action: "suggest_move_options",
      parameterExtractors: {},
      confidence: 0.3,
    },
  ];

  public parseCommand(text: string): ParsedCommand | null {
    const normalizedText = text.trim().toLowerCase();
    
    // Try primary patterns first
    for (const pattern of this.patterns) {
      const match = text.match(pattern.pattern);
      if (match) {
        const parameters: Record<string, any> = {};
        
        // Extract parameters using the pattern's extractors
        for (const [key, extractor] of Object.entries(pattern.parameterExtractors)) {
          try {
            parameters[key] = extractor(match);
          } catch (error) {
            console.warn(`Failed to extract parameter ${key}:`, error);
          }
        }
        
        return {
          id: uuidv4(),
          originalText: text,
          intent: pattern.intent,
          action: pattern.action,
          parameters,
          confidence: pattern.confidence,
          timestamp: new Date(),
        };
      }
    }
    
    // Try fallback patterns for partial matches
    for (const pattern of this.fallbackPatterns) {
      const match = text.match(pattern.pattern);
      if (match) {
        return {
          id: uuidv4(),
          originalText: text,
          intent: pattern.intent,
          action: pattern.action,
          parameters: { originalText: text },
          confidence: pattern.confidence,
          timestamp: new Date(),
        };
      }
    }
    
    return null;
  }

  public getSuggestions(partialText: string): string[] {
    const suggestions: string[] = [];
    const lowerText = partialText.toLowerCase();
    
    // Common command suggestions based on partial input
    const commandSuggestions: Record<string, string[]> = {
      'add': [
        'add 3 coffee shops nearby',
        'add a POI marker at current center',
        'add business markers around location',
      ],
      'zoom': [
        'zoom to level 15',
        'zoom in',
        'zoom out',
      ],
      'center': [
        'center map on San Francisco',
        'center on coordinates 37.7749, -122.4194',
        'center map on current location',
      ],
      'remove': [
        'remove all markers',
        'remove all business markers',
        'remove selected marker',
      ],
      'analyze': [
        'analyze marker distribution',
        'analyze current map data',
        'find nearest markers to center',
      ],
      'create': [
        'create a statistics panel',
        'create custom component',
        'create marker info widget',
      ],
      'export': [
        'export map data',
        'export all markers',
        'download current state',
      ],
    };
    
    // Find matching suggestions
    for (const [key, values] of Object.entries(commandSuggestions)) {
      if (key.startsWith(lowerText) || lowerText.includes(key)) {
        suggestions.push(...values);
      }
    }
    
    // If no specific suggestions, provide general ones
    if (suggestions.length === 0) {
      suggestions.push(
        'add 3 coffee shops nearby',
        'zoom to level 15',
        'analyze marker distribution',
        'center map on San Francisco',
        'create a statistics panel',
        'help - show all capabilities'
      );
    }
    
    return suggestions.slice(0, 6); // Limit to 6 suggestions
  }

  public getCommandExamples(): Record<string, string[]> {
    return {
      'Map Navigation': [
        'zoom to level 15',
        'center map on San Francisco',
        'move to coordinates 37.7749, -122.4194',
        'zoom in',
      ],
      'Marker Management': [
        'add 5 coffee shops nearby',
        'add a POI marker at current center',
        'remove all business markers',
        'clear all markers',
      ],
      'Data Analysis': [
        'analyze marker distribution',
        'find nearest markers to center',
        'calculate total distance between markers',
        'generate analysis report',
      ],
      'Component Generation': [
        'create a statistics panel',
        'generate custom info widget',
        'build marker dashboard',
        'create route planner component',
      ],
      'Bulk Operations': [
        'batch update all POI marker titles',
        'export all map data',
        'import markers from file',
        'bulk add sample markers',
      ],
    };
  }

  public validateCommand(command: ParsedCommand): boolean {
    // Basic validation rules
    if (!command.intent || !command.action) {
      return false;
    }
    
    // Specific validation based on action type
    switch (command.action) {
      case 'update_zoom':
        return command.parameters.level >= 1 && command.parameters.level <= 20;
      
      case 'update_center':
        if (command.parameters.lat !== undefined && command.parameters.lng !== undefined) {
          return Math.abs(command.parameters.lat) <= 90 && Math.abs(command.parameters.lng) <= 180;
        }
        return true;
      
      case 'bulk_add_markers':
        return command.parameters.count > 0 && command.parameters.count <= 50;
      
      default:
        return true;
    }
  }

  public getConfidenceLevel(confidence: number): 'high' | 'medium' | 'low' {
    if (confidence >= 0.8) return 'high';
    if (confidence >= 0.5) return 'medium';
    return 'low';
  }
}

// Singleton instance
export const aiActionParser = new AIActionParser();