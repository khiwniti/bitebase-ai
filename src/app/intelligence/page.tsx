import { AppLayout } from '@/components/ui/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Users, MapPin, Clock, Target, Brain, Zap } from 'lucide-react';

export default function IntelligencePage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Intelligence', href: '/intelligence' }
  ];

  const insights = [
    {
      title: "Market Opportunity Score",
      value: "87%",
      change: "+12%",
      description: "High growth potential in your target area",
      icon: Target,
      color: "text-green-600"
    },
    {
      title: "Competition Density",
      value: "Medium",
      change: "Stable",
      description: "Balanced competitive landscape",
      icon: Users,
      color: "text-yellow-600"
    },
    {
      title: "Customer Demand",
      value: "High",
      change: "+8%",
      description: "Strong demand for cafe/restaurant services",
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      title: "Location Rating",
      value: "9.2/10",
      change: "+0.3",
      description: "Excellent foot traffic and accessibility",
      icon: MapPin,
      color: "text-purple-600"
    }
  ];

  const trends = [
    {
      category: "Menu Trends",
      items: [
        { name: "Plant-based options", growth: "+45%", confidence: 92 },
        { name: "Local sourcing", growth: "+38%", confidence: 87 },
        { name: "Artisan coffee", growth: "+29%", confidence: 94 },
        { name: "Healthy desserts", growth: "+22%", confidence: 78 }
      ]
    },
    {
      category: "Service Trends",
      items: [
        { name: "Mobile ordering", growth: "+67%", confidence: 96 },
        { name: "Contactless payment", growth: "+54%", confidence: 91 },
        { name: "Loyalty programs", growth: "+41%", confidence: 89 },
        { name: "Delivery integration", growth: "+33%", confidence: 85 }
      ]
    }
  ];

  const recommendations = [
    {
      title: "Optimize Menu Mix",
      priority: "High",
      impact: "Revenue +15-25%",
      description: "Focus on high-margin items and trending categories",
      actions: ["Add plant-based options", "Introduce premium coffee blends", "Create seasonal specials"]
    },
    {
      title: "Enhance Digital Presence",
      priority: "Medium",
      impact: "Customers +20-30%",
      description: "Improve online ordering and social media engagement",
      actions: ["Implement mobile app", "Optimize Google listings", "Launch social campaigns"]
    },
    {
      title: "Location Optimization",
      priority: "High",
      impact: "Foot traffic +10-15%",
      description: "Maximize visibility and accessibility",
      actions: ["Improve storefront design", "Add outdoor seating", "Enhance signage"]
    }
  ];

  return (
    <AppLayout
      title="Market Intelligence"
      subtitle="AI-powered insights and recommendations for your restaurant business"
      breadcrumbs={breadcrumbs}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="w-4 h-4 mr-2" />
            Schedule Analysis
          </Button>
          <Button>
            <Brain className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight, index) => {
            const IconComponent = insight.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IconComponent className={`w-5 h-5 ${insight.color}`} />
                      <span className="ml-2 text-sm font-medium text-gray-600">
                        {insight.title}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {insight.change}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-gray-900">
                      {insight.value}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {insight.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Market Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {trends.map((trend, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900 mb-3">{trend.category}</h4>
                  <div className="space-y-3">
                    {trend.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              {item.name}
                            </span>
                            <span className="text-sm text-green-600 font-medium">
                              {item.growth}
                            </span>
                          </div>
                          <Progress value={item.confidence} className="h-2" />
                          <span className="text-xs text-gray-500">
                            {item.confidence}% confidence
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={rec.priority === 'High' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {rec.priority}
                      </Badge>
                      <span className="text-sm font-medium text-green-600">
                        {rec.impact}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                  <div className="space-y-1">
                    {rec.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center text-xs text-gray-500">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">94%</div>
                <div className="text-sm text-gray-600">Market Readiness</div>
                <Progress value={94} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">87%</div>
                <div className="text-sm text-gray-600">Competitive Advantage</div>
                <Progress value={87} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">91%</div>
                <div className="text-sm text-gray-600">Growth Potential</div>
                <Progress value={91} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}