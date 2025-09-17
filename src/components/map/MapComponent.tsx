"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ZoomIn,
  ZoomOut,
  Trash2,
  Building2,
  Landmark,
  MapPin,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useSharedState } from "../shared/SharedStateProvider";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoia2hpd25pdGkiLCJhIjoiY205eDFwMzl0MHY1YzJscjB3bm4xcnh5ZyJ9.ANGVE0tiA9NslBn8ft_9fQ';

type MarkerType = "location" | "poi" | "business" | "route" | "custom";

const MapComponent = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showTools, setShowTools] = useState(false);

  // Get enhanced shared state from context
  const { 
    mapState, 
    updateZoom, 
    updateCenter, 
    updateBounds,
    addMarker, 
    clearMarkers,
    setActiveMarkerType,
    setMode,
  } = useSharedState();

  // Initialize Mapbox map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [mapState.center.lng, mapState.center.lat],
      zoom: mapState.zoom,
      attributionControl: false,
    });

    const map = mapRef.current;

    map.on('load', () => {
      setIsMapLoaded(true);
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
    });

    map.on('zoom', () => {
      updateZoom(map.getZoom());
    });

    map.on('move', () => {
      const center = map.getCenter();
      updateCenter({ lat: center.lat, lng: center.lng });
    });

    map.on('click', (e) => {
      if (mapState.activeMarkerType) {
        handleMapClick(e.lngLat.lat, e.lngLat.lng);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
      setIsMapLoaded(false);
    };
  }, []);

  const handleMapClick = useCallback(async (lat: number, lng: number) => {
    if (!mapState.activeMarkerType) return;

    await addMarker({
      type: mapState.activeMarkerType,
      position: { lat, lng },
      title: `New ${mapState.activeMarkerType}`,
      description: `Added at ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    });

    setActiveMarkerType(null);
    setMode("explore");
  }, [mapState.activeMarkerType, addMarker, setActiveMarkerType, setMode]);

  const handleZoomIn = () => {
    if (mapState.zoom < 20) {
      updateZoom(mapState.zoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapState.zoom > 1) {
      updateZoom(mapState.zoom - 1);
    }
  };

  const handleAddMarker = (type: MarkerType) => {
    const isActive = mapState.activeMarkerType === type;
    setActiveMarkerType(isActive ? null : type);
    setMode(isActive ? "explore" : "add");
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden relative">
      {/* Minimal Always-Visible Controls */}
      <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
        <Button 
          size="sm" 
          variant="outline" 
          className="bg-white/90 backdrop-blur-sm shadow-md"
          onClick={() => setShowTools(!showTools)}
        >
          <Settings className="h-3 w-3" />
          {showTools ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
        </Button>
        
        {/* Essential Controls - Always Visible */}
        <div className="flex flex-col gap-1">
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-white/90 backdrop-blur-sm shadow-md"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-3 w-3" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-white/90 backdrop-blur-sm shadow-md"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Expandable Tools Panel */}
      {showTools && (
        <div className="absolute top-2 left-2 z-20 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border p-2">
          <div className="flex flex-wrap gap-1 text-xs max-w-xs">
            <Badge variant="outline" className="px-1 text-[10px]">
              🔍 {mapState.zoom.toFixed(1)}
            </Badge>
            <Badge variant="outline" className="px-1 text-[10px]">
              📍 {mapState.markers.length}
            </Badge>
            
            <div className="w-full h-px bg-gray-200 my-1" />
            
            <Button
              size="sm"
              variant={mapState.activeMarkerType === "poi" ? "default" : "outline"}
              onClick={() => handleAddMarker("poi")}
              className="text-xs px-2 py-1 h-6"
            >
              <Landmark className="h-3 w-3 mr-1" />
              POI
            </Button>
            <Button
              size="sm"
              variant={mapState.activeMarkerType === "business" ? "default" : "outline"}
              onClick={() => handleAddMarker("business")}
              className="text-xs px-2 py-1 h-6"
            >
              <Building2 className="h-3 w-3 mr-1" />
              Biz
            </Button>
            <Button
              size="sm"
              variant={mapState.activeMarkerType === "location" ? "default" : "outline"}
              onClick={() => handleAddMarker("location")}
              className="text-xs px-2 py-1 h-6"
            >
              <MapPin className="h-3 w-3 mr-1" />
              Pin
            </Button>
            
            <div className="w-full h-px bg-gray-200 my-1" />
            
            <Button 
              size="sm" 
              variant="outline" 
              onClick={clearMarkers}
              className="text-xs px-2 py-1 h-6"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Map Container - Full Area */}
      <div className="flex-1 relative min-h-0">
        {/* Status Indicators - Bottom Left */}
        <div className="absolute bottom-2 left-2 z-10 flex flex-col gap-1">
          {mapState.isSyncing && (
            <div className="bg-green-500 text-white px-2 py-1 rounded text-xs animate-pulse">
              🔄 Syncing
            </div>
          )}
          
          {mapState.activeMarkerType && (
            <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
              ✚ Click to add {mapState.activeMarkerType}
            </div>
          )}
        </div>

        {/* Mapbox Container */}
        <div 
          ref={mapContainerRef} 
          className="absolute inset-0 w-full h-full"
          style={{ cursor: mapState.activeMarkerType ? "crosshair" : "default" }}
        />

        {/* Loading Overlay */}
        {!isMapLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading Mapbox...</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MapComponent;