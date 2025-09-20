import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sword, Star, DollarSign, Users, Clock, CheckCircle, XCircle, Eye, TrendingUp } from 'lucide-react';
import { useSharedState } from '@/components/shared/SharedStateProvider';

interface CompetitorAnalysisCardProps {
  analysis: {
    id?: string;
    location: { lat: number; lng: number };
    radius: number;
    competitorCount: number;
    averageRating: number;
    priceDistribution: Record<string, number>;
    cuisineGaps: string[];
    topCompetitors: Array<{
      name: string;
      cuisine: string;
      rating: number;
      priceRange: string;
      distance: number;
      weaknesses: string[];
    }>;
    marketOpportunities: string[];
    competitiveAdvantages: string[];
    threats: string[];
    overallThreatLevel: 'low' | 'medium' | 'high';
  };
  onApprove: (analysis: any) => void;
  onReject: () => void;
  onViewDetails: () => void;
  showActions?: boolean;
}

export function CompetitorAnalysisCard({ 
  analysis, 
  onApprove, 
  onReject, 
  onViewDetails,
  showActions = true 
}: CompetitorAnalysisCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addMarker, addLayer } = useSharedState();

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getThreatIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'high': return <Sword className="w-4 h-4 text-red-600" />;
      default: return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleApprove = async () => {
    try {
      // Add competitor analysis as a layer with all competitor locations
      const layerId = await addLayer({
        type: 'competitors',
        visible: true,
        data: analysis.topCompetitors.map(comp => ({
          ...comp,
          coordinates: analysis.location, // This would normally be each competitor's actual location
        })),
        style: {
          color: 'red',
          opacity: 0.7,
        }
      });

      // Add central analysis point
      await addMarker({
        type: 'business',
        position: analysis.location,
        title: 'Competitor Analysis',
        description: `${analysis.competitorCount} competitors • ${analysis.overallThreatLevel} threat`,
        properties: {
          analysisData: analysis,
          type: 'competitor_analysis',
          layerId,
          addedFromChat: true,
          timestamp: new Date().toISOString(),
        }
      });

      onApprove(analysis);
    } catch (error) {
      console.error('Failed to add competitor analysis:', error);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto border-l-4 border-l-red-500 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Sword className="w-5 h-5 mr-2 text-red-600" />
              Competitor Analysis
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              {analysis.radius}m radius • {analysis.competitorCount} competitors found
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {getThreatIcon(analysis.overallThreatLevel)}
            <Badge className={`${getThreatColor(analysis.overallThreatLevel)} flex-shrink-0`}>
              {analysis.overallThreatLevel} threat
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Competition Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{analysis.competitorCount}</div>
            <div className="text-xs text-gray-600">Total Competitors</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-500 mr-1" />
              {analysis.averageRating.toFixed(1)}
            </div>
            <div className="text-xs text-gray-600">Avg Rating</div>
          </div>
        </div>

        {/* Price Distribution */}
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">Price Range Distribution</div>
          <div className="space-y-2">
            {Object.entries(analysis.priceDistribution).map(([range, count]) => (
              <div key={range} className="flex items-center">
                <span className="text-sm text-gray-600 w-8">{range}</span>
                <div className="flex-1 mx-2">
                  <Progress 
                    value={(count / analysis.competitorCount) * 100} 
                    className="h-2"
                  />
                </div>
                <span className="text-xs text-gray-500 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Competitors */}
        {analysis.topCompetitors.length > 0 && (
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Top Competitors</div>
            <div className="space-y-2">
              {analysis.topCompetitors.slice(0, 3).map((competitor, idx) => (
                <div key={idx} className="bg-red-50 p-3 rounded-lg border-l-2 border-red-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 text-sm">{competitor.name}</span>
                    <div className="flex items-center text-xs text-gray-600">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      {competitor.rating}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="capitalize">{competitor.cuisine} • {competitor.priceRange}</span>
                    <span>{competitor.distance}m away</span>
                  </div>
                  {competitor.weaknesses.length > 0 && (
                    <div className="mt-1 text-xs text-green-700">
                      Weakness: {competitor.weaknesses[0]}
                    </div>
                  )}
                </div>
              ))}
              {analysis.topCompetitors.length > 3 && (
                <div className="text-center">
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    {isExpanded ? 'Show Less' : `+${analysis.topCompetitors.length - 3} more competitors`}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cuisine Gaps */}
        {analysis.cuisineGaps.length > 0 && (
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
              Market Opportunities
            </div>
            <div className="flex flex-wrap gap-1">
              {analysis.cuisineGaps.map((cuisine, idx) => (
                <Badge key={idx} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Competitive Advantages */}
        {analysis.competitiveAdvantages.length > 0 && (
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-blue-600" />
              Your Advantages
            </div>
            <div className="space-y-1">
              {analysis.competitiveAdvantages.slice(0, 2).map((advantage, idx) => (
                <div key={idx} className="text-xs text-blue-700 bg-blue-50 p-2 rounded">
                  • {advantage}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Threats */}
        {analysis.threats.length > 0 && (
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Sword className="w-4 h-4 mr-1 text-red-600" />
              Key Threats
            </div>
            <div className="space-y-1">
              {analysis.threats.slice(0, 2).map((threat, idx) => (
                <div key={idx} className="text-xs text-red-700 bg-red-50 p-2 rounded">
                  • {threat}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Market Opportunities */}
        {analysis.marketOpportunities.length > 0 && isExpanded && (
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Market Opportunities</div>
            <div className="space-y-1">
              {analysis.marketOpportunities.map((opportunity, idx) => (
                <div key={idx} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  • {opportunity}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {showActions && (
        <CardFooter className="flex gap-2 pt-4">
          <Button 
            onClick={handleApprove}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            size="sm"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Add Analysis
          </Button>
          
          <Button 
            onClick={onViewDetails}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            Details
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