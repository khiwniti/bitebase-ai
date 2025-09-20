import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  MapPin,
  Users,
  Store,
  Target,
  TrendingUp,
  Layers,
  Filter,
  Zap,
  Circle,
  Square,
  Triangle,
} from 'lucide-react';
import { GeoPoint, GeoFeature, HotspotAnalysis, CompetitorInfo } from '@/lib/geospatial-analysis';

// Map layer types
export interface MapLayer {
  id: string;
  name: string;
  type: 'competitors' | 'demographics' | 'hotspots' | 'delivery' | 'traffic' | 'customer';
  visible: boolean;
  opacity: number;
  color: string;
  icon: React.ReactNode;
  features: GeoFeature[];
}

// Props for map layers component
interface MapLayersProps {
  center: GeoPoint;
  zoom: number;
  layers: MapLayer[];
  onLayerToggle: (layerId: string, visible: boolean) => void;
  onLayerOpacityChange: (layerId: string, opacity: number) => void;
  onFeatureClick: (feature: GeoFeature) => void;
  onMapClick: (location: GeoPoint) => void;
}

// Enhanced map layers component
export const MapLayers: React.FC<MapLayersProps> = ({
  center,
  zoom,
  layers,
  onLayerToggle,
  onLayerOpacityChange,
  onFeatureClick,
  onMapClick,
}) => {
  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);
  const [filterRadius, setFilterRadius] = useState(1000); // meters

  const handleLayerToggle = useCallback((layerId: string) => {
    const layer = layers.find(l => l.id === layerId);
    if (layer) {
      onLayerToggle(layerId, !layer.visible);
    }
  }, [layers, onLayerToggle]);

  const handleOpacityChange = useCallback((layerId: string, value: number[]) => {
    onLayerOpacityChange(layerId, value[0]);
  }, [onLayerOpacityChange]);

  return (
    <div className="space-y-4">
      {/* Layer Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-sm">
            <Layers className="w-4 h-4 mr-2" />
            Map Layers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {layers.map((layer) => (
            <LayerControl
              key={layer.id}
              layer={layer}
              onToggle={() => handleLayerToggle(layer.id)}
              onOpacityChange={(opacity) => handleOpacityChange(layer.id, [opacity])}
            />
          ))}
        </CardContent>
      </Card>

      {/* Filter Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-600">
              Analysis Radius: {filterRadius}m
            </label>
            <Slider
              value={[filterRadius]}
              onValueChange={(value) => setFilterRadius(value[0])}
              min={500}
              max={5000}
              step={100}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Layer Legend */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <LayerLegend layers={layers.filter(l => l.visible)} />
        </CardContent>
      </Card>
    </div>
  );
};

// Individual layer control component
interface LayerControlProps {
  layer: MapLayer;
  onToggle: () => void;
  onOpacityChange: (opacity: number) => void;
}

const LayerControl: React.FC<LayerControlProps> = ({
  layer,
  onToggle,
  onOpacityChange,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-gray-400">{layer.icon}</div>
          <span className="text-sm font-medium">{layer.name}</span>
          <Badge variant="outline" className="text-xs">
            {layer.features.length}
          </Badge>
        </div>
        <Switch
          checked={layer.visible}
          onCheckedChange={onToggle}
        />
      </div>
      
      {layer.visible && (
        <div className="ml-6">
          <label className="text-xs text-gray-600">
            Opacity: {Math.round(layer.opacity * 100)}%
          </label>
          <Slider
            value={[layer.opacity]}
            onValueChange={(value) => onOpacityChange(value[0])}
            min={0.1}
            max={1}
            step={0.1}
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
};

// Layer legend component
interface LayerLegendProps {
  layers: MapLayer[];
}

const LayerLegend: React.FC<LayerLegendProps> = ({ layers }) => {
  const getLayerSymbol = (type: string) => {
    switch (type) {
      case 'competitors':
        return <Store className="w-3 h-3 text-red-500" />;
      case 'demographics':
        return <Users className="w-3 h-3 text-blue-500" />;
      case 'hotspots':
        return <Zap className="w-3 h-3 text-yellow-500" />;
      case 'delivery':
        return <Circle className="w-3 h-3 text-green-500" />;
      case 'traffic':
        return <TrendingUp className="w-3 h-3 text-purple-500" />;
      case 'customer':
        return <Target className="w-3 h-3 text-orange-500" />;
      default:
        return <MapPin className="w-3 h-3 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-2">
      {layers.map((layer) => (
        <div key={layer.id} className="flex items-center space-x-2">
          {getLayerSymbol(layer.type)}
          <span className="text-xs">{layer.name}</span>
        </div>
      ))}
    </div>
  );
};

// Competitor layer component
export const CompetitorLayer: React.FC<{
  competitors: CompetitorInfo[];
  onCompetitorClick: (competitor: CompetitorInfo) => void;
}> = ({ competitors, onCompetitorClick }) => {
  return (
    <>
      {competitors.map((competitor) => (
        <div
          key={competitor.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{
            left: `${competitor.location.lng}%`,
            top: `${competitor.location.lat}%`,
          }}
          onClick={() => onCompetitorClick(competitor)}
        >
          <div className="relative">
            <Store className="w-6 h-6 text-red-500" />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded px-2 py-1 text-xs shadow-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
              {competitor.name}
              <div className="text-gray-500">
                {competitor.rating}★ • {competitor.priceRange}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// Hotspot layer component
export const HotspotLayer: React.FC<{
  hotspots: HotspotAnalysis[];
  onHotspotClick: (hotspot: HotspotAnalysis) => void;
}> = ({ hotspots, onHotspotClick }) => {
  const getHotspotColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <>
      {hotspots.map((hotspot, index) => (
        <div
          key={index}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{
            left: `${hotspot.center.lng}%`,
            top: `${hotspot.center.lat}%`,
          }}
          onClick={() => onHotspotClick(hotspot)}
        >
          <div className="relative">
            <Zap className={`w-5 h-5 ${getHotspotColor(hotspot.score)}`} />
            <div className="absolute -top-2 -right-1 bg-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow">
              {hotspot.score}
            </div>
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded px-2 py-1 text-xs shadow-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
              Score: {hotspot.score}/100
              <div className="text-gray-500">
                Click for details
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// Delivery zone layer component
export const DeliveryZoneLayer: React.FC<{
  center: GeoPoint;
  zones: GeoFeature[];
}> = ({ center, zones }) => {
  return (
    <div className="relative">
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="absolute border-2 border-green-400 rounded-full opacity-30"
          style={{
            left: `${center.lng}%`,
            top: `${center.lat}%`,
            width: `${zone.properties.radius * 2}px`,
            height: `${zone.properties.radius * 2}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-1 rounded">
            {zone.properties.description}
          </div>
        </div>
      ))}
    </div>
  );
};

// Traffic pattern layer component
export const TrafficLayer: React.FC<{
  trafficData: Array<{ location: GeoPoint; intensity: number; type: 'foot' | 'vehicle' }>;
}> = ({ trafficData }) => {
  const getTrafficColor = (intensity: number, type: string) => {
    const baseColor = type === 'foot' ? 'blue' : 'purple';
    const opacity = Math.min(intensity / 100, 1);
    return `${baseColor}-${intensity > 50 ? '600' : '400'}`;
  };

  return (
    <>
      {trafficData.map((traffic, index) => (
        <div
          key={index}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${traffic.location.lng}%`,
            top: `${traffic.location.lat}%`,
          }}
        >
          <div 
            className={`w-3 h-3 rounded-full ${getTrafficColor(traffic.intensity, traffic.type)}`}
            style={{ opacity: traffic.intensity / 100 }}
          />
        </div>
      ))}
    </>
  );
};

// Default layer configurations
export const createDefaultLayers = (): MapLayer[] => [
  {
    id: 'competitors',
    name: 'Competitors',
    type: 'competitors',
    visible: true,
    opacity: 1,
    color: '#ef4444',
    icon: <Store className="w-4 h-4" />,
    features: [],
  },
  {
    id: 'demographics',
    name: 'Demographics',
    type: 'demographics',
    visible: false,
    opacity: 0.7,
    color: '#3b82f6',
    icon: <Users className="w-4 h-4" />,
    features: [],
  },
  {
    id: 'hotspots',
    name: 'Location Hotspots',
    type: 'hotspots',
    visible: true,
    opacity: 0.8,
    color: '#eab308',
    icon: <Zap className="w-4 h-4" />,
    features: [],
  },
  {
    id: 'delivery',
    name: 'Delivery Zones',
    type: 'delivery',
    visible: false,
    opacity: 0.4,
    color: '#22c55e',
    icon: <Circle className="w-4 h-4" />,
    features: [],
  },
  {
    id: 'traffic',
    name: 'Traffic Patterns',
    type: 'traffic',
    visible: false,
    opacity: 0.6,
    color: '#8b5cf6',
    icon: <TrendingUp className="w-4 h-4" />,
    features: [],
  },
  {
    id: 'customer',
    name: 'Customer Density',
    type: 'customer',
    visible: false,
    opacity: 0.7,
    color: '#f97316',
    icon: <Target className="w-4 h-4" />,
    features: [],
  },
];