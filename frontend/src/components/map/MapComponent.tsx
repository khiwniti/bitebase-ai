"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
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
  Circle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useSharedState } from "../shared/SharedStateProvider";
// Dynamic import for mapbox-gl to avoid SSR issues
const loadMapbox = async () => {
  if (typeof window === 'undefined') return null;
  
  const mapboxgl = await import('mapbox-gl');
  await import('mapbox-gl/dist/mapbox-gl.css');
  
  // Set Mapbox access token
  mapboxgl.default.accessToken = 'pk.eyJ1Ijoia2hpd25pdGkiLCJhIjoiY205eDFwMzl0MHY1YzJscjB3bm4xcnh5ZyJ9.ANGVE0tiA9NslBn8ft_9fQ';
  
  return mapboxgl.default;
};

type MarkerType = "location" | "poi" | "business" | "route" | "custom";

const MapComponent = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const bufferCircleRef = useRef<string | null>(null); // Store circle layer ID
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
    setBufferRadius,
    setBufferCenter,
    toggleBufferRadius,
    setBufferOpacity,
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

  // Synchronize markers from shared state with Mapbox map
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded) return;

    const map = mapRef.current;
    const currentMarkers = markersRef.current;

    // Get current marker IDs
    const currentMarkerIds = new Set(currentMarkers.keys());
    const stateMarkerIds = new Set(mapState.markers.map(m => m.id));

    // Remove markers that are no longer in state
    for (const markerId of Array.from(currentMarkerIds)) {
      if (!stateMarkerIds.has(markerId)) {
        const marker = currentMarkers.get(markerId);
        if (marker) {
          marker.remove();
          currentMarkers.delete(markerId);
        }
      }
    }

    // Add or update markers from state
    for (const stateMarker of mapState.markers) {
      if (!currentMarkers.has(stateMarker.id)) {
        // Create new marker
        const markerElement = document.createElement('div');
        markerElement.className = 'marker';
        markerElement.style.cssText = `
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;

        // Set marker color and icon based on type
        switch (stateMarker.type) {
          case 'restaurant':
            markerElement.style.backgroundColor = '#dc2626'; // red
            markerElement.innerHTML = '🍽️';
            break;
          case 'competitor':
            markerElement.style.backgroundColor = '#ea580c'; // orange
            markerElement.innerHTML = '⚔️';
            break;
          case 'business':
            markerElement.style.backgroundColor = '#7c3aed'; // purple
            markerElement.innerHTML = '🏢';
            break;
          case 'poi':
            markerElement.style.backgroundColor = '#059669'; // green
            markerElement.innerHTML = '📍';
            break;
          case 'location':
            markerElement.style.backgroundColor = '#0ea5e9'; // blue
            markerElement.innerHTML = '📍';
            break;
          default:
            markerElement.style.backgroundColor = '#6b7280'; // gray
            markerElement.innerHTML = '📍';
        }

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([stateMarker.position.lng, stateMarker.position.lat])
          .addTo(map);

        // Add popup if there's title or description
        if (stateMarker.title || stateMarker.description) {
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">
                  ${stateMarker.title || 'Untitled'}
                </h3>
                ${stateMarker.description ? `
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">
                    ${stateMarker.description}
                  </p>
                ` : ''}
                <div style="margin-top: 8px; font-size: 12px; color: #9ca3af;">
                  Type: ${stateMarker.type}
                  <br>
                  Coordinates: ${stateMarker.position.lat.toFixed(4)}, ${stateMarker.position.lng.toFixed(4)}
                </div>
              </div>
            `);
          marker.setPopup(popup);
        }

        currentMarkers.set(stateMarker.id, marker);
      }
    }
  }, [mapState.markers, isMapLoaded]);

  // Synchronize map view with shared state
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded) return;

    const map = mapRef.current;
    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();

    // Update center if different
    if (Math.abs(currentCenter.lat - mapState.center.lat) > 0.001 || 
        Math.abs(currentCenter.lng - mapState.center.lng) > 0.001) {
      map.setCenter([mapState.center.lng, mapState.center.lat]);
    }

    // Update zoom if different
    if (Math.abs(currentZoom - mapState.zoom) > 0.1) {
      map.setZoom(mapState.zoom);
    }
  }, [mapState.center, mapState.zoom, isMapLoaded]);

  // Buffer circle visualization effect
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded) return;

    const map = mapRef.current;
    const circleLayerId = 'buffer-circle';
    const circleSourceId = 'buffer-circle-source';

    // Remove existing circle if it exists
    if (map.getLayer(circleLayerId)) {
      map.removeLayer(circleLayerId);
    }
    if (map.getSource(circleSourceId)) {
      map.removeSource(circleSourceId);
    }

    // Add circle if buffer radius should be shown
    if (mapState.showBufferRadius && mapState.bufferCenter) {
      // Create a circle using turf.js-like approach
      const center = [mapState.bufferCenter.lng, mapState.bufferCenter.lat];
      const radiusInKm = mapState.bufferRadius / 1000; // Convert meters to km
      
      // Simple circle approximation (64 points)
      const points = [];
      const steps = 64;
      for (let i = 0; i < steps; i++) {
        const angle = (i * 360) / steps;
        const dx = radiusInKm * Math.cos((angle * Math.PI) / 180);
        const dy = radiusInKm * Math.sin((angle * Math.PI) / 180);
        
        // Approximate conversion from km to degrees (rough approximation)
        const lat = mapState.bufferCenter.lat + (dy / 111.0);
        const lng = mapState.bufferCenter.lng + (dx / (111.0 * Math.cos((mapState.bufferCenter.lat * Math.PI) / 180)));
        
        points.push([lng, lat]);
      }
      // Close the circle
      points.push(points[0]);

      const circleGeoJSON = {
        type: 'geojson' as const,
        data: {
          type: 'Feature' as const,
          geometry: {
            type: 'Polygon' as const,
            coordinates: [points]
          },
          properties: {}
        }
      };

      // Add source and layer (check if they don't already exist)
      if (!map.getSource(circleSourceId)) {
        map.addSource(circleSourceId, circleGeoJSON);
      } else {
        // Update existing source
        (map.getSource(circleSourceId) as mapboxgl.GeoJSONSource).setData(circleGeoJSON.data);
      }
      
      if (!map.getLayer(circleLayerId)) {
        map.addLayer({
          id: circleLayerId,
          type: 'fill',
          source: circleSourceId,
          paint: {
            'fill-color': '#3b82f6', // Blue color
            'fill-opacity': mapState.bufferOpacity,
            'fill-outline-color': '#1d4ed8'
          }
        });
      } else {
        // Update opacity if layer exists
        map.setPaintProperty(circleLayerId, 'fill-opacity', mapState.bufferOpacity);
      }

      // Add border
      if (!map.getLayer(`${circleLayerId}-border`)) {
        map.addLayer({
          id: `${circleLayerId}-border`,
          type: 'line',
          source: circleSourceId,
          paint: {
            'line-color': '#1d4ed8',
            'line-width': 2,
            'line-opacity': 0.8
          }
        });
      }

      bufferCircleRef.current = circleLayerId;
    }
  }, [mapState.showBufferRadius, mapState.bufferCenter, mapState.bufferRadius, mapState.bufferOpacity, isMapLoaded]);

  const handleMapClick = useCallback(async (lat: number, lng: number) => {
    // If buffer radius is shown, allow clicking to reposition it
    if (mapState.showBufferRadius && !mapState.activeMarkerType) {
      setBufferCenter({ lat, lng });
      return;
    }
    
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
            
            <div className="w-full h-px bg-gray-200 my-1" />
            
            {/* Buffer Radius Controls */}
            <div className="w-full space-y-2">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={mapState.showBufferRadius ? "default" : "outline"}
                  onClick={toggleBufferRadius}
                  className="text-xs px-2 py-1 h-6"
                >
                  <Circle className="h-3 w-3 mr-1" />
                  Buffer
                </Button>
                <Badge variant="outline" className="px-1 text-[10px]">
                  {mapState.bufferRadius}m
                </Badge>
              </div>
              
              {mapState.showBufferRadius && (
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-gray-600 block mb-1">Radius (m)</label>
                    <Slider
                      value={[mapState.bufferRadius]}
                      onValueChange={(value) => setBufferRadius(value[0])}
                      min={50}
                      max={5000}
                      step={50}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-600 block mb-1">Opacity</label>
                    <Slider
                      value={[mapState.bufferOpacity * 100]}
                      onValueChange={(value) => setBufferOpacity(value[0] / 100)}
                      min={10}
                      max={80}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setBufferCenter({ lat: mapState.center.lat, lng: mapState.center.lng })}
                    className="text-xs px-2 py-1 h-6 w-full"
                  >
                    Center on Map
                  </Button>
                </div>
              )}
            </div>
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
          
          {mapState.showBufferRadius && !mapState.activeMarkerType && (
            <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
              ⭕ Click to position buffer center
            </div>
          )}
        </div>

        {/* Mapbox Container */}
        <div 
          ref={mapContainerRef} 
          className="absolute inset-0 w-full h-full"
          style={{ 
            cursor: mapState.activeMarkerType 
              ? "crosshair" 
              : mapState.showBufferRadius && !mapState.activeMarkerType 
                ? "pointer" 
                : "default" 
          }}
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