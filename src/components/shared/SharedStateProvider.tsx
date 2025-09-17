"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

// Enhanced types for professional-grade state management
type MarkerType = "location" | "poi" | "business" | "route" | "custom";
type LayerType = "markers" | "routes" | "heatmap" | "clusters" | "custom";
type ActionType = "add_marker" | "remove_marker" | "update_marker" | "zoom" | "pan" | "select" | "clear" | "generate_component" | "update_layer";

interface Marker {
  id: string;
  type: MarkerType;
  position: { lat: number; lng: number };
  title: string;
  description?: string;
  selected: boolean;
  properties?: Record<string, any>;
  component?: React.ComponentType<any>;
  style?: Record<string, any>;
}

interface MapLayer {
  id: string;
  type: LayerType;
  visible: boolean;
  data: any[];
  style?: Record<string, any>;
  component?: React.ComponentType<any>;
}

interface ActionHistory {
  id: string;
  type: ActionType;
  timestamp: Date;
  data: any;
  description: string;
}

interface GenerativeUICommand {
  id: string;
  command: string;
  parameters: Record<string, any>;
  timestamp: Date;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  result?: any;
}

interface MapState {
  // Core map state
  zoom: number;
  center: { lat: number; lng: number };
  bounds?: { north: number; south: number; east: number; west: number };
  
  // Enhanced marker system
  markers: Marker[];
  selectedMarkerId: string | null;
  
  // Layer management
  layers: MapLayer[];
  activeLayers: string[];
  
  // Interaction modes
  mode: "explore" | "add" | "select" | "edit" | "route" | "measure";
  activeMarkerType: MarkerType | null;
  
  // State synchronization
  isSyncing: boolean;
  lastSyncTime: Date | null;
  
  // Action history for undo/redo
  history: ActionHistory[];
  historyIndex: number;
  
  // Generative UI system
  pendingCommands: GenerativeUICommand[];
  componentRegistry: Map<string, React.ComponentType<any>>;
  
  // Real-time features
  isRealTimeEnabled: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
}

interface SharedStateContextType {
  // State
  mapState: MapState;
  
  // Core map operations
  updateZoom: (zoom: number) => void;
  updateCenter: (center: { lat: number; lng: number }) => void;
  updateBounds: (bounds: { north: number; south: number; east: number; west: number }) => void;
  
  // Enhanced marker operations
  addMarker: (marker: Omit<Marker, "id" | "selected">) => Promise<string>;
  updateMarker: (id: string, updates: Partial<Marker>) => void;
  removeMarker: (id: string) => void;
  selectMarker: (id: string) => void;
  clearMarkers: () => void;
  bulkAddMarkers: (markers: Omit<Marker, "id" | "selected">[]) => Promise<string[]>;
  
  // Layer management
  addLayer: (layer: Omit<MapLayer, "id">) => string;
  updateLayer: (id: string, updates: Partial<MapLayer>) => void;
  removeLayer: (id: string) => void;
  toggleLayer: (id: string) => void;
  
  // Mode and interaction
  setMode: (mode: MapState["mode"]) => void;
  setActiveMarkerType: (type: MarkerType | null) => void;
  
  // Generative UI system
  executeCommand: (command: string, parameters?: Record<string, any>) => Promise<any>;
  registerComponent: (name: string, component: React.ComponentType<any>) => void;
  generateComponent: (description: string, props?: Record<string, any>) => Promise<React.ComponentType<any>>;
  
  // History management
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clearHistory: () => void;
  
  // Real-time synchronization
  enableRealTime: () => void;
  disableRealTime: () => void;
  forceSync: () => Promise<void>;
  
  // Utility functions
  setSyncing: (isSyncing: boolean) => void;
  getMarkersByType: (type: MarkerType) => Marker[];
  getMarkersInBounds: (bounds: { north: number; south: number; east: number; west: number }) => Marker[];
  exportState: () => string;
  importState: (state: string) => void;
}

const initialState: MapState = {
  zoom: 12,
  center: { lat: 13.7563, lng: 100.5018 }, // Bangkok coordinates
  markers: [
    {
      id: "bkk-1",
      type: "location",
      position: { lat: 13.7563, lng: 100.5018 },
      title: "Bangkok",
      description: "The vibrant capital of Thailand",
      selected: false,
    },
    {
      id: "bkk-2",
      type: "poi",
      position: { lat: 37.8059, lng: -122.4103 },
      title: "North Beach",
      description: "Historic Italian neighborhood",
      selected: false,
    },
  ],
  selectedMarkerId: null,
  layers: [],
  activeLayers: [],
  mode: "explore",
  activeMarkerType: null,
  isSyncing: false,
  lastSyncTime: null,
  history: [],
  historyIndex: -1,
  pendingCommands: [],
  componentRegistry: new Map(),
  isRealTimeEnabled: false,
  connectionStatus: 'connected',
};

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export function SharedStateProvider({ children }: { children: React.ReactNode }) {
  const [mapState, setMapState] = useState<MapState>(initialState);
  const syncTimeoutRef = useRef<NodeJS.Timeout>();
  const commandQueueRef = useRef<GenerativeUICommand[]>([]);

  // Enhanced sync mechanism with debouncing
  const triggerSync = useCallback((immediate = false) => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    const syncFn = () => {
      setMapState(prev => ({
        ...prev,
        isSyncing: true,
        lastSyncTime: new Date(),
      }));

      // Simulate sync completion
      setTimeout(() => {
        setMapState(prev => ({ ...prev, isSyncing: false }));
      }, immediate ? 300 : 1000);
    };

    if (immediate) {
      syncFn();
    } else {
      syncTimeoutRef.current = setTimeout(syncFn, 100);
    }
  }, []);

  // Action history management
  const addToHistory = useCallback((action: Omit<ActionHistory, "id" | "timestamp">) => {
    const historyItem: ActionHistory = {
      id: uuidv4(),
      timestamp: new Date(),
      ...action,
    };

    setMapState(prev => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(historyItem);
      
      // Limit history size
      if (newHistory.length > 100) {
        newHistory.shift();
      }

      return {
        ...prev,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  // Core map operations
  const updateZoom = useCallback((zoom: number) => {
    setMapState(prev => ({ ...prev, zoom }));
    addToHistory({ type: "zoom", data: { zoom }, description: `Zoomed to level ${zoom}` });
    triggerSync();
  }, [addToHistory, triggerSync]);

  const updateCenter = useCallback((center: { lat: number; lng: number }) => {
    setMapState(prev => ({ ...prev, center }));
    addToHistory({ type: "pan", data: { center }, description: `Moved to ${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}` });
    triggerSync();
  }, [addToHistory, triggerSync]);

  const updateBounds = useCallback((bounds: { north: number; south: number; east: number; west: number }) => {
    setMapState(prev => ({ ...prev, bounds }));
    triggerSync();
  }, [triggerSync]);

  // Enhanced marker operations
  const addMarker = useCallback(async (marker: Omit<Marker, "id" | "selected">): Promise<string> => {
    const id = uuidv4();
    const newMarker: Marker = { ...marker, id, selected: false };

    setMapState(prev => ({
      ...prev,
      markers: [...prev.markers, newMarker],
    }));

    addToHistory({
      type: "add_marker",
      data: { marker: newMarker },
      description: `Added ${marker.type} marker: ${marker.title}`,
    });

    triggerSync();
    return id;
  }, [addToHistory, triggerSync]);

  const updateMarker = useCallback((id: string, updates: Partial<Marker>) => {
    setMapState(prev => ({
      ...prev,
      markers: prev.markers.map(marker =>
        marker.id === id ? { ...marker, ...updates } : marker
      ),
    }));

    addToHistory({
      type: "update_marker",
      data: { id, updates },
      description: `Updated marker ${id}`,
    });

    triggerSync();
  }, [addToHistory, triggerSync]);

  const removeMarker = useCallback((id: string) => {
    setMapState(prev => {
      const marker = prev.markers.find(m => m.id === id);
      return {
        ...prev,
        markers: prev.markers.filter(m => m.id !== id),
        selectedMarkerId: prev.selectedMarkerId === id ? null : prev.selectedMarkerId,
      };
    });

    addToHistory({
      type: "remove_marker",
      data: { id },
      description: `Removed marker ${id}`,
    });

    triggerSync();
  }, [addToHistory, triggerSync]);

  const selectMarker = useCallback((id: string) => {
    setMapState(prev => ({
      ...prev,
      markers: prev.markers.map(marker => ({
        ...marker,
        selected: marker.id === id,
      })),
      selectedMarkerId: id,
    }));

    addToHistory({
      type: "select",
      data: { id },
      description: `Selected marker ${id}`,
    });

    triggerSync();
  }, [addToHistory, triggerSync]);

  const clearMarkers = useCallback(() => {
    setMapState(prev => ({
      ...prev,
      markers: [],
      selectedMarkerId: null,
    }));

    addToHistory({
      type: "clear",
      data: {},
      description: "Cleared all markers",
    });

    triggerSync();
  }, [addToHistory, triggerSync]);

  const bulkAddMarkers = useCallback(async (markers: Omit<Marker, "id" | "selected">[]): Promise<string[]> => {
    const newMarkers = markers.map(marker => ({
      ...marker,
      id: uuidv4(),
      selected: false,
    }));

    setMapState(prev => ({
      ...prev,
      markers: [...prev.markers, ...newMarkers],
    }));

    addToHistory({
      type: "add_marker",
      data: { markers: newMarkers },
      description: `Added ${markers.length} markers`,
    });

    triggerSync();
    return newMarkers.map(m => m.id);
  }, [addToHistory, triggerSync]);

  // Layer management
  const addLayer = useCallback((layer: Omit<MapLayer, "id">): string => {
    const id = uuidv4();
    const newLayer: MapLayer = { ...layer, id };

    setMapState(prev => ({
      ...prev,
      layers: [...prev.layers, newLayer],
      activeLayers: [...prev.activeLayers, id],
    }));

    triggerSync();
    return id;
  }, [triggerSync]);

  const updateLayer = useCallback((id: string, updates: Partial<MapLayer>) => {
    setMapState(prev => ({
      ...prev,
      layers: prev.layers.map(layer =>
        layer.id === id ? { ...layer, ...updates } : layer
      ),
    }));

    triggerSync();
  }, [triggerSync]);

  const removeLayer = useCallback((id: string) => {
    setMapState(prev => ({
      ...prev,
      layers: prev.layers.filter(layer => layer.id !== id),
      activeLayers: prev.activeLayers.filter(layerId => layerId !== id),
    }));

    triggerSync();
  }, [triggerSync]);

  const toggleLayer = useCallback((id: string) => {
    setMapState(prev => ({
      ...prev,
      activeLayers: prev.activeLayers.includes(id)
        ? prev.activeLayers.filter(layerId => layerId !== id)
        : [...prev.activeLayers, id],
    }));

    triggerSync();
  }, [triggerSync]);

  // Mode and interaction
  const setMode = useCallback((mode: MapState["mode"]) => {
    setMapState(prev => ({ ...prev, mode }));
    triggerSync();
  }, [triggerSync]);

  const setActiveMarkerType = useCallback((type: MarkerType | null) => {
    setMapState(prev => ({ ...prev, activeMarkerType: type }));
  }, []);

  // Generative UI system
  const executeCommand = useCallback(async (command: string, parameters: Record<string, any> = {}): Promise<any> => {
    const commandId = uuidv4();
    const generativeCommand: GenerativeUICommand = {
      id: commandId,
      command,
      parameters,
      timestamp: new Date(),
      status: 'pending',
    };

    setMapState(prev => ({
      ...prev,
      pendingCommands: [...prev.pendingCommands, generativeCommand],
    }));

    try {
      // Update status to executing
      setMapState(prev => ({
        ...prev,
        pendingCommands: prev.pendingCommands.map(cmd =>
          cmd.id === commandId ? { ...cmd, status: 'executing' } : cmd
        ),
      }));

      // Execute command based on type
      let result: any;
      const lowerCommand = command.toLowerCase();

      if (lowerCommand.includes('add') && lowerCommand.includes('marker')) {
        const { lat, lng, title, type = 'location' } = parameters;
        result = await addMarker({
          type: type as MarkerType,
          position: { lat: lat || mapState.center.lat, lng: lng || mapState.center.lng },
          title: title || 'AI Generated Marker',
          description: `Generated by AI command: ${command}`,
        });
      } else if (lowerCommand.includes('clear')) {
        clearMarkers();
        result = 'Markers cleared';
      } else if (lowerCommand.includes('zoom')) {
        const { level } = parameters;
        updateZoom(level || mapState.zoom + 1);
        result = `Zoomed to level ${level || mapState.zoom + 1}`;
      } else if (lowerCommand.includes('center') || lowerCommand.includes('move')) {
        const { lat, lng } = parameters;
        updateCenter({ lat: lat || mapState.center.lat, lng: lng || mapState.center.lng });
        result = `Moved to ${lat}, ${lng}`;
      }

      // Update status to completed
      setMapState(prev => ({
        ...prev,
        pendingCommands: prev.pendingCommands.map(cmd =>
          cmd.id === commandId ? { ...cmd, status: 'completed', result } : cmd
        ),
      }));

      return result;
    } catch (error) {
      // Update status to failed
      setMapState(prev => ({
        ...prev,
        pendingCommands: prev.pendingCommands.map(cmd =>
          cmd.id === commandId ? { ...cmd, status: 'failed', result: error } : cmd
        ),
      }));

      throw error;
    }
  }, [addMarker, clearMarkers, updateZoom, updateCenter, mapState.center, mapState.zoom]);

  const registerComponent = useCallback((name: string, component: React.ComponentType<any>) => {
    setMapState(prev => {
      const newRegistry = new Map(prev.componentRegistry);
      newRegistry.set(name, component);
      return { ...prev, componentRegistry: newRegistry };
    });
  }, []);

  const generateComponent = useCallback(async (description: string, props: Record<string, any> = {}): Promise<React.ComponentType<any>> => {
    // This would integrate with an AI service to generate components
    // For now, return a simple component
    const GeneratedComponent: React.ComponentType<any> = (componentProps) => (
      <div className="bg-blue-100 p-2 rounded border">
        <h4 className="font-semibold">AI Generated: {description}</h4>
        <pre className="text-xs">{JSON.stringify({ ...props, ...componentProps }, null, 2)}</pre>
      </div>
    );

    const componentName = `generated_${Date.now()}`;
    registerComponent(componentName, GeneratedComponent);
    
    return GeneratedComponent;
  }, [registerComponent]);

  // History management
  const undo = useCallback(() => {
    if (mapState.historyIndex > 0) {
      setMapState(prev => ({ ...prev, historyIndex: prev.historyIndex - 1 }));
      // Apply undo logic here
      triggerSync();
    }
  }, [mapState.historyIndex, triggerSync]);

  const redo = useCallback(() => {
    if (mapState.historyIndex < mapState.history.length - 1) {
      setMapState(prev => ({ ...prev, historyIndex: prev.historyIndex + 1 }));
      // Apply redo logic here
      triggerSync();
    }
  }, [mapState.historyIndex, mapState.history.length, triggerSync]);

  const canUndo = useCallback(() => mapState.historyIndex > 0, [mapState.historyIndex]);
  const canRedo = useCallback(() => mapState.historyIndex < mapState.history.length - 1, [mapState.historyIndex, mapState.history.length]);

  const clearHistory = useCallback(() => {
    setMapState(prev => ({ ...prev, history: [], historyIndex: -1 }));
  }, []);

  // Real-time synchronization
  const enableRealTime = useCallback(() => {
    setMapState(prev => ({ ...prev, isRealTimeEnabled: true, connectionStatus: 'connected' }));
  }, []);

  const disableRealTime = useCallback(() => {
    setMapState(prev => ({ ...prev, isRealTimeEnabled: false, connectionStatus: 'disconnected' }));
  }, []);

  const forceSync = useCallback(async () => {
    triggerSync(true);
  }, [triggerSync]);

  // Utility functions
  const setSyncing = useCallback((isSyncing: boolean) => {
    setMapState(prev => ({ ...prev, isSyncing }));
  }, []);

  const getMarkersByType = useCallback((type: MarkerType) => {
    return mapState.markers.filter(marker => marker.type === type);
  }, [mapState.markers]);

  const getMarkersInBounds = useCallback((bounds: { north: number; south: number; east: number; west: number }) => {
    return mapState.markers.filter(marker => 
      marker.position.lat <= bounds.north &&
      marker.position.lat >= bounds.south &&
      marker.position.lng <= bounds.east &&
      marker.position.lng >= bounds.west
    );
  }, [mapState.markers]);

  const exportState = useCallback(() => {
    return JSON.stringify({
      ...mapState,
      componentRegistry: Array.from(mapState.componentRegistry.entries()),
    });
  }, [mapState]);

  const importState = useCallback((state: string) => {
    try {
      const parsed = JSON.parse(state);
      const componentRegistry = new Map(parsed.componentRegistry || []);
      setMapState({ ...parsed, componentRegistry });
      triggerSync();
    } catch (error) {
      console.error('Failed to import state:', error);
    }
  }, [triggerSync]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, []);

  return (
    <SharedStateContext.Provider
      value={{
        mapState,
        updateZoom,
        updateCenter,
        updateBounds,
        addMarker,
        updateMarker,
        removeMarker,
        selectMarker,
        clearMarkers,
        bulkAddMarkers,
        addLayer,
        updateLayer,
        removeLayer,
        toggleLayer,
        setMode,
        setActiveMarkerType,
        executeCommand,
        registerComponent,
        generateComponent,
        undo,
        redo,
        canUndo,
        canRedo,
        clearHistory,
        enableRealTime,
        disableRealTime,
        forceSync,
        setSyncing,
        getMarkersByType,
        getMarkersInBounds,
        exportState,
        importState,
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
}

// Custom hook to use the shared state
export function useSharedState() {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
}