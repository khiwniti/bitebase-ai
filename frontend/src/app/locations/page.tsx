import { AppLayout } from '@/components/ui/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Search, Filter, Plus, Star, Clock, Users, DollarSign, Navigation } from 'lucide-react';

export default function LocationsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' }
  ];

  const locations = [
    {
      id: 1,
      name: "Downtown Business District",
      address: "123 Main Street, Downtown",
      score: 9.2,
      status: "Available",
      rent: "$4,500/month",
      footTraffic: "High",
      competition: "Medium",
      demographics: "Business professionals, tourists",
      pros: ["High foot traffic", "Business district", "Good public transport"],
      cons: ["Higher rent", "Limited parking", "Weekend traffic drops"]
    },
    {
      id: 2,
      name: "University Quarter",
      address: "456 College Avenue, University District",
      score: 8.7,
      status: "Under Review",
      rent: "$3,200/month",
      footTraffic: "Very High",
      competition: "High",
      demographics: "Students, faculty, young professionals",
      pros: ["Student population", "Consistent traffic", "Growing area"],
      cons: ["High competition", "Seasonal fluctuations", "Noise restrictions"]
    },
    {
      id: 3,
      name: "Suburban Shopping Center",
      address: "789 Oak Street, Westside",
      score: 7.8,
      status: "Available",
      rent: "$2,800/month",
      footTraffic: "Medium",
      competition: "Low",
      demographics: "Families, suburban residents",
      pros: ["Family-friendly", "Parking available", "Lower competition"],
      cons: ["Lower foot traffic", "Car-dependent", "Limited evening activity"]
    },
    {
      id: 4,
      name: "Arts & Culture District",
      address: "321 Gallery Row, Arts Quarter",
      score: 8.4,
      status: "Negotiating",
      rent: "$3,800/month",
      footTraffic: "Medium-High",
      competition: "Medium",
      demographics: "Artists, creatives, tourists",
      pros: ["Unique atmosphere", "Cultural events", "Instagram-worthy"],
      cons: ["Inconsistent traffic", "Higher rent", "Limited business hours"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Negotiating': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'Very High': return 'text-green-600';
      case 'High': return 'text-green-500';
      case 'Medium-High': return 'text-yellow-600';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const nearbyAmenities = [
    { name: "Metro Station", distance: "2 min walk", type: "transport" },
    { name: "Parking Garage", distance: "1 min walk", type: "parking" },
    { name: "Bank ATM", distance: "30 sec walk", type: "finance" },
    { name: "Coffee Shop", distance: "1 min walk", type: "competitor" },
    { name: "Restaurant", distance: "2 min walk", type: "competitor" },
    { name: "Office Building", distance: "1 min walk", type: "customer" }
  ];

  return (
    <AppLayout
      title="Locations"
      subtitle="Analyze and compare potential locations for your restaurant"
      breadcrumbs={breadcrumbs}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Location
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search locations by address, neighborhood, or criteria..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Map View
                </Button>
                <Button variant="outline" size="sm">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {locations.map((location) => (
            <Card key={location.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{location.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{location.score}</span>
                    </div>
                    <Badge className={getStatusColor(location.status)}>
                      {location.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm font-medium">{location.rent}</div>
                      <div className="text-xs text-gray-500">Monthly rent</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className={`w-4 h-4 mr-2 ${getTrafficColor(location.footTraffic)}`} />
                    <div>
                      <div className="text-sm font-medium">{location.footTraffic}</div>
                      <div className="text-xs text-gray-500">Foot traffic</div>
                    </div>
                  </div>
                </div>

                {/* Demographics */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Target Demographics</h4>
                  <p className="text-sm text-gray-600">{location.demographics}</p>
                </div>

                {/* Pros and Cons */}
                <Tabs defaultValue="pros" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pros">Pros</TabsTrigger>
                    <TabsTrigger value="cons">Cons</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pros" className="mt-3">
                    <ul className="space-y-1">
                      {location.pros.map((pro, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="cons" className="mt-3">
                    <ul className="space-y-1">
                      {location.cons.map((con, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Location Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Nearby Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Nearby Amenities</CardTitle>
              <p className="text-sm text-gray-600">For Downtown Business District</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nearbyAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium">{amenity.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{amenity.distance}</div>
                      <Badge variant="outline" className="text-xs">
                        {amenity.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Location Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="font-medium text-sm">Peak Hours</span>
                </div>
                <p className="text-sm text-gray-600">
                  Highest traffic: 12PM-2PM and 5PM-7PM on weekdays
                </p>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Users className="w-4 h-4 text-green-600 mr-2" />
                  <span className="font-medium text-sm">Customer Base</span>
                </div>
                <p className="text-sm text-gray-600">
                  85% office workers, 15% tourists. Average spending: $12-18
                </p>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <DollarSign className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="font-medium text-sm">Revenue Potential</span>
                </div>
                <p className="text-sm text-gray-600">
                  Estimated monthly revenue: $45,000-65,000
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}