import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Users, DollarSign, Clock, CheckCircle, XCircle, Info } from 'lucide-react';
import { useSharedState } from '@/components/shared/SharedStateProvider';

interface LocationCardProps {
  location: {
    id?: string;
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
    type: 'restaurant' | 'competitor' | 'potential_site' | 'demographic_area';
    cuisine?: string;
    priceRange?: '$' | '$$' | '$$$' | '$$$$';
    rating?: number;
    reviewCount?: number;
    capacity?: number;
    averageSpend?: number;
    footTraffic?: {
      level: 'low' | 'medium' | 'high';
      peakHours: string[];
    };
    demographics?: {
      population: number;
      avgIncome: string;
      ageGroup: string;
    };
    insights?: string[];
    opportunityScore?: number;
  };
  onApprove: (location: any) => void;
  onReject: () => void;
  onRequestMoreInfo: () => void;
  showActions?: boolean;
}

export function LocationCard({ 
  location, 
  onApprove, 
  onReject, 
  onRequestMoreInfo,
  showActions = true 
}: LocationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addMarker, addRestaurant } = useSharedState();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'restaurant': return 'bg-green-100 text-green-800';
      case 'competitor': return 'bg-red-100 text-red-800';
      case 'potential_site': return 'bg-blue-100 text-blue-800';
      case 'demographic_area': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOpportunityColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleApprove = async () => {
    try {
      // Add to map as marker
      await addMarker({
        type: location.type === 'restaurant' ? 'restaurant' : 
              location.type === 'competitor' ? 'competitor' : 'business',
        position: location.coordinates,
        title: location.name,
        description: location.address,
        properties: {
          ...location,
          addedFromChat: true,
          timestamp: new Date().toISOString(),
        }
      });

      // If it's restaurant data, also add to restaurants collection
      if (location.type === 'restaurant' && location.cuisine) {
        await addRestaurant({
          name: location.name,
          type: 'casual_dining',
          cuisine: location.cuisine as any,
          priceRange: location.priceRange || '$$',
          averageSpend: location.averageSpend || 25,
          capacity: location.capacity || 50,
          operatingHours: {
            monday: { open: "11:00", close: "22:00" },
            tuesday: { open: "11:00", close: "22:00" },
            wednesday: { open: "11:00", close: "22:00" },
            thursday: { open: "11:00", close: "22:00" },
            friday: { open: "11:00", close: "23:00" },
            saturday: { open: "11:00", close: "23:00" },
            sunday: { open: "12:00", close: "21:00" },
          },
          coordinates: location.coordinates,
          rating: location.rating || 0,
          reviewCount: location.reviewCount || 0,
          isCompetitor: location.type === 'competitor',
        });
      }

      onApprove(location);
    } catch (error) {
      console.error('Failed to add location:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-900 truncate">
              {location.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              <MapPin className="inline w-4 h-4 mr-1" />
              {location.address}
            </CardDescription>
          </div>
          <Badge className={`ml-2 ${getTypeColor(location.type)} flex-shrink-0`}>
            {location.type.replace('_', ' ')}
          </Badge>
        </div>

        {location.opportunityScore !== undefined && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Opportunity Score</span>
              <span className={`font-semibold ${getOpportunityColor(location.opportunityScore)}`}>
                {location.opportunityScore}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full ${
                  location.opportunityScore >= 80 ? 'bg-green-500' :
                  location.opportunityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${location.opportunityScore}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Basic Info Row */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {location.cuisine && (
            <div className="flex items-center text-gray-600">
              <span className="font-medium">Cuisine:</span>
              <span className="ml-1 capitalize">{location.cuisine}</span>
            </div>
          )}
          
          {location.priceRange && (
            <div className="flex items-center text-gray-600">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>{location.priceRange}</span>
            </div>
          )}
        </div>

        {/* Rating & Capacity Row */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {location.rating !== undefined && (
            <div className="flex items-center text-gray-600">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              <span>{location.rating.toFixed(1)}</span>
              {location.reviewCount && (
                <span className="text-gray-400 ml-1">({location.reviewCount})</span>
              )}
            </div>
          )}
          
          {location.capacity && (
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-1" />
              <span>{location.capacity} seats</span>
            </div>
          )}
        </div>

        {/* Foot Traffic */}
        {location.footTraffic && (
          <div className="text-sm">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span className="font-medium">Foot Traffic:</span>
              <Badge variant="outline" className="ml-2 text-xs">
                {location.footTraffic.level}
              </Badge>
            </div>
            {location.footTraffic.peakHours.length > 0 && (
              <div className="text-gray-500 mt-1">
                Peak: {location.footTraffic.peakHours.join(', ')}
              </div>
            )}
          </div>
        )}

        {/* Demographics */}
        {location.demographics && (
          <div className="text-sm text-gray-600">
            <div className="font-medium">Demographics:</div>
            <div className="text-xs text-gray-500 mt-1">
              {location.demographics.population.toLocaleString()} people • 
              {location.demographics.avgIncome} avg income • 
              {location.demographics.ageGroup}
            </div>
          </div>
        )}

        {/* Insights */}
        {location.insights && location.insights.length > 0 && (
          <div className="text-sm">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <Info className="w-4 h-4 mr-1" />
              AI Insights ({location.insights.length})
            </button>
            
            {isExpanded && (
              <div className="mt-2 space-y-1">
                {location.insights.map((insight, idx) => (
                  <div key={idx} className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                    • {insight}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>

      {showActions && (
        <CardFooter className="flex gap-2 pt-4">
          <Button 
            onClick={handleApprove}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            size="sm"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Add to Map
          </Button>
          
          <Button 
            onClick={onRequestMoreInfo}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Info className="w-4 h-4 mr-1" />
            More Info
          </Button>
          
          <Button 
            onClick={onReject}
            variant="outline"
            size="sm"
            className="px-3 border-red-200 text-red-600 hover:bg-red-50"
          >
            <XCircle className="w-4 h-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}