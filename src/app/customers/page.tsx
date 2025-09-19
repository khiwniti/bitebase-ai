import { AppLayout } from '@/components/ui/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Search, Filter, Plus, Star, TrendingUp, Clock, Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function CustomersPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Customers', href: '/customers' }
  ];

  const customerSegments = [
    {
      name: "Business Professionals",
      count: 2847,
      percentage: 45,
      avgSpending: "$18.50",
      frequency: "Daily",
      peakHours: "7-9 AM, 12-2 PM",
      preferences: ["Quick service", "Healthy options", "Contactless payment"],
      growth: "+12%"
    },
    {
      name: "Students",
      count: 1923,
      percentage: 30,
      avgSpending: "$8.75",
      frequency: "3-4x/week",
      peakHours: "10 AM-12 PM, 3-5 PM",
      preferences: ["Budget-friendly", "Study spaces", "WiFi"],
      growth: "+8%"
    },
    {
      name: "Tourists",
      count: 956,
      percentage: 15,
      avgSpending: "$22.30",
      frequency: "One-time",
      peakHours: "10 AM-4 PM",
      preferences: ["Local specialties", "Instagram-worthy", "Unique experience"],
      growth: "+25%"
    },
    {
      name: "Local Residents",
      count: 637,
      percentage: 10,
      avgSpending: "$14.20",
      frequency: "2-3x/week",
      peakHours: "8-10 AM, 6-8 PM",
      preferences: ["Community feel", "Loyalty rewards", "Family-friendly"],
      growth: "+5%"
    }
  ];

  const topCustomers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      totalSpent: "$2,847",
      visits: 142,
      avgOrder: "$20.05",
      lastVisit: "2 hours ago",
      status: "VIP",
      preferences: ["Oat milk latte", "Avocado toast", "Outdoor seating"],
      avatar: "/avatars/sarah.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@company.com",
      phone: "+1 (555) 987-6543",
      totalSpent: "$1,923",
      visits: 89,
      avgOrder: "$21.60",
      lastVisit: "1 day ago",
      status: "Regular",
      preferences: ["Espresso", "Croissant", "Quick pickup"],
      avatar: "/avatars/michael.jpg"
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.davis@uni.edu",
      phone: "+1 (555) 456-7890",
      totalSpent: "$456",
      visits: 67,
      avgOrder: "$6.80",
      lastVisit: "3 hours ago",
      status: "Student",
      preferences: ["Iced coffee", "Study corner", "Student discount"],
      avatar: "/avatars/emma.jpg"
    },
    {
      id: 4,
      name: "David Rodriguez",
      email: "d.rodriguez@email.com",
      phone: "+1 (555) 234-5678",
      totalSpent: "$1,234",
      visits: 45,
      avgOrder: "$27.42",
      lastVisit: "5 days ago",
      status: "Tourist",
      preferences: ["Local specialties", "Photos", "Recommendations"],
      avatar: "/avatars/david.jpg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-purple-100 text-purple-800';
      case 'Regular': return 'bg-blue-100 text-blue-800';
      case 'Student': return 'bg-green-100 text-green-800';
      case 'Tourist': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const insights = [
    {
      title: "Peak Customer Hour",
      value: "12-1 PM",
      description: "Highest customer volume during lunch hour",
      trend: "+15% from last month"
    },
    {
      title: "Average Order Value",
      value: "$16.75",
      description: "Across all customer segments",
      trend: "+8% from last month"
    },
    {
      title: "Customer Retention",
      value: "78%",
      description: "Monthly returning customer rate",
      trend: "+5% from last month"
    },
    {
      title: "New Customers",
      value: "287",
      description: "This month",
      trend: "+22% from last month"
    }
  ];

  return (
    <AppLayout
      title="Customers"
      subtitle="Understand your customer base and build stronger relationships"
      breadcrumbs={breadcrumbs}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Customer Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {insight.value}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-2">
                  {insight.title}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {insight.description}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  {insight.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Segments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Customer Segments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {customerSegments.map((segment, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{segment.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {segment.percentage}%
                      </Badge>
                      <span className="text-sm text-green-600 font-medium">
                        {segment.growth}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm font-medium">{segment.count.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Total customers</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{segment.avgSpending}</div>
                      <div className="text-xs text-gray-500">Avg. spending</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{segment.frequency}</div>
                      <div className="text-xs text-gray-500">Visit frequency</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{segment.peakHours}</div>
                      <div className="text-xs text-gray-500">Peak hours</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-gray-700 mb-1">Preferences:</div>
                    <div className="flex flex-wrap gap-1">
                      {segment.preferences.map((pref, prefIndex) => (
                        <Badge key={prefIndex} variant="outline" className="text-xs">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Customers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Top Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer) => (
                  <div key={customer.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <Avatar className="w-10 h-10 mr-3">
                          <AvatarImage src={customer.avatar} alt={customer.name} />
                          <AvatarFallback>
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-gray-900">{customer.name}</h4>
                          <p className="text-sm text-gray-600">{customer.email}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-sm font-medium">{customer.totalSpent}</div>
                        <div className="text-xs text-gray-500">Total spent</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{customer.visits}</div>
                        <div className="text-xs text-gray-500">Visits</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{customer.avgOrder}</div>
                        <div className="text-xs text-gray-500">Avg. order</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        Last visit: {customer.lastVisit}
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-7 px-2">
                          <Mail className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 px-2">
                          <Phone className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-xs font-medium text-gray-700 mb-1">Preferences:</div>
                      <div className="flex flex-wrap gap-1">
                        {customer.preferences.map((pref, prefIndex) => (
                          <Badge key={prefIndex} variant="outline" className="text-xs">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Management */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="search">Search Customers</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search customers by name, email, phone, or preferences..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline">Advanced Search</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="text-center">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">6,363</div>
                      <div className="text-sm text-gray-600">Total Customers</div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">287</div>
                      <div className="text-sm text-gray-600">New This Month</div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-center">
                      <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">156</div>
                      <div className="text-sm text-gray-600">VIP Customers</div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Customer Lifecycle</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">New (0-30 days)</span>
                        <span className="text-sm font-medium">287 (18%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Active (31-90 days)</span>
                        <span className="text-sm font-medium">1,245 (52%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Regular (90+ days)</span>
                        <span className="text-sm font-medium">892 (23%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Inactive (180+ days)</span>
                        <span className="text-sm font-medium">234 (7%)</span>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">Visit Patterns</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Daily visitors</span>
                        <span className="text-sm font-medium">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Weekly regulars</span>
                        <span className="text-sm font-medium">892</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly visitors</span>
                        <span className="text-sm font-medium">456</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">One-time visitors</span>
                        <span className="text-sm font-medium">234</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="campaigns" className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Active Campaigns</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Student Discount Program</div>
                        <div className="text-sm text-gray-600">15% off for students</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">892 enrolled</div>
                        <div className="text-xs text-gray-500">23% conversion</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Loyalty Rewards</div>
                        <div className="text-sm text-gray-600">Buy 10, get 1 free</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">1,456 members</div>
                        <div className="text-xs text-gray-500">67% active</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Happy Hour Special</div>
                        <div className="text-sm text-gray-600">20% off 3-5 PM</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">234 participants</div>
                        <div className="text-xs text-gray-500">12% uptake</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}