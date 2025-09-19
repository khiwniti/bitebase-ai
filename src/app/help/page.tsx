import { AppLayout } from '@/components/ui/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  HelpCircle, Search, BookOpen, MessageCircle, Video,
  FileText, Phone, Mail, ExternalLink, ChevronRight,
  Clock, CheckCircle, AlertCircle, Star
} from 'lucide-react';

export default function HelpPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Help', href: '/help' }
  ];

  const quickActions = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of using BiteBase AI",
      icon: BookOpen,
      link: "#getting-started",
      time: "5 min read"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step tutorials",
      icon: Video,
      link: "#tutorials",
      time: "20+ videos"
    },
    {
      title: "Contact Support",
      description: "Get help from our team",
      icon: MessageCircle,
      link: "#contact",
      time: "24/7 available"
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      icon: FileText,
      link: "#api-docs",
      time: "Full reference"
    }
  ];

  const faqItems = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I set up my first restaurant analysis?",
          answer: "Navigate to the Chat page and describe your restaurant concept. Our AI will guide you through location analysis, menu planning, and market research. You can also start with our templates for common restaurant types."
        },
        {
          question: "What data do I need to provide?",
          answer: "Basic information like location, target audience, and restaurant type is enough to start. Our AI will ask follow-up questions to gather more specific details as needed."
        },
        {
          question: "How accurate are the market insights?",
          answer: "Our AI uses real-time data from multiple sources including local demographics, competitor analysis, and market trends. Accuracy varies by location but typically ranges from 85-95% for major markets."
        }
      ]
    },
    {
      category: "Reports & Analytics",
      questions: [
        {
          question: "How do I generate a market research report?",
          answer: "After conducting analysis in the Chat page, navigate to Reports and click 'Generate Report'. Select your analysis data and customize the report template. Reports include market insights, competitor analysis, and recommendations."
        },
        {
          question: "Can I customize report templates?",
          answer: "Yes! You can edit report components inline, modify sections, add your own content, and save custom templates for future use. Each report is fully customizable to match your business needs."
        },
        {
          question: "How do I export reports?",
          answer: "Reports can be exported as PDF, PowerPoint, or shared via link. Premium users can also export raw data as CSV or Excel files for further analysis."
        }
      ]
    },
    {
      category: "AI Features",
      questions: [
        {
          question: "What can the AI chat analyze?",
          answer: "Our AI can analyze location viability, menu optimization, pricing strategies, competitor landscape, target demographics, marketing opportunities, and growth potential for restaurants and cafes."
        },
        {
          question: "How does location analysis work?",
          answer: "We analyze foot traffic, demographics, competitor density, rent costs, and local regulations. The AI considers factors like accessibility, parking, visibility, and nearby businesses to provide location scores."
        },
        {
          question: "Can I upload my own data?",
          answer: "Yes, you can upload existing business data, financial reports, or market research. Our AI will incorporate this information to provide more personalized insights and recommendations."
        }
      ]
    },
    {
      category: "Account & Billing",
      questions: [
        {
          question: "What's included in the free plan?",
          answer: "The free plan includes 5 AI chat sessions per month, basic market insights, and access to one report template. Upgrade to unlock unlimited sessions and advanced features."
        },
        {
          question: "How do I upgrade my plan?",
          answer: "Go to Settings > Billing to view available plans. Choose the plan that fits your needs and follow the checkout process. Upgrades take effect immediately."
        },
        {
          question: "Can I cancel anytime?",
          answer: "Yes, you can cancel your subscription at any time from the billing settings. Your access will continue until the end of your current billing period."
        }
      ]
    }
  ];

  const supportChannels = [
    {
      name: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      responseTime: "< 5 minutes",
      icon: MessageCircle,
      action: "Start Chat"
    },
    {
      name: "Email Support",
      description: "Send detailed questions to our team",
      availability: "Business hours",
      responseTime: "< 2 hours",
      icon: Mail,
      action: "Send Email"
    },
    {
      name: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 9AM-6PM",
      responseTime: "Immediate",
      icon: Phone,
      action: "Call Now"
    }
  ];

  const tutorials = [
    {
      title: "Setting Up Your First Analysis",
      duration: "3:45",
      difficulty: "Beginner",
      views: "12.3k",
      rating: 4.8
    },
    {
      title: "Advanced Market Research Techniques",
      duration: "8:12",
      difficulty: "Intermediate",
      views: "8.7k",
      rating: 4.9
    },
    {
      title: "Creating Custom Reports",
      duration: "5:23",
      difficulty: "Beginner",
      views: "15.1k",
      rating: 4.7
    },
    {
      title: "Location Analysis Deep Dive",
      duration: "12:45",
      difficulty: "Advanced",
      views: "5.2k",
      rating: 4.8
    },
    {
      title: "Competitive Intelligence Features",
      duration: "6:34",
      difficulty: "Intermediate",
      views: "9.4k",
      rating: 4.6
    }
  ];

  const systemStatus = [
    { service: "AI Chat Service", status: "operational", uptime: "99.9%" },
    { service: "Report Generation", status: "operational", uptime: "99.8%" },
    { service: "Data Analytics", status: "operational", uptime: "99.7%" },
    { service: "API Services", status: "maintenance", uptime: "99.5%" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'maintenance': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default: return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <AppLayout
      title="Help Center"
      subtitle="Find answers, tutorials, and get support for BiteBase AI"
      breadcrumbs={breadcrumbs}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Knowledge Base
          </Button>
          <Button>
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for help articles, tutorials, or common questions..."
                  className="pl-12 py-3 text-lg"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline">Getting Started</Badge>
                <Badge variant="outline">Market Analysis</Badge>
                <Badge variant="outline">Reports</Badge>
                <Badge variant="outline">Billing</Badge>
                <Badge variant="outline">API</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <IconComponent className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{action.time}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={faqItems[0].category.toLowerCase().replace(' ', '-')} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    {faqItems.map((category, index) => (
                      <TabsTrigger
                        key={index}
                        value={category.category.toLowerCase().replace(' ', '-')}
                        className="text-xs"
                      >
                        {category.category}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {faqItems.map((category, categoryIndex) => (
                    <TabsContent
                      key={categoryIndex}
                      value={category.category.toLowerCase().replace(' ', '-')}
                      className="mt-4"
                    >
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Support Channels */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportChannels.map((channel, index) => {
                  const IconComponent = channel.icon;
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <IconComponent className="w-5 h-5 text-blue-600 mr-2" />
                        <h4 className="font-medium">{channel.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
                      <div className="space-y-1 mb-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Availability:</span>
                          <span>{channel.availability}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Response time:</span>
                          <span>{channel.responseTime}</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        {channel.action}
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemStatus.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getStatusIcon(service.status)}
                      <span className="ml-2 text-sm">{service.service}</span>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(service.status)} variant="secondary">
                        {service.status}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">
                        {service.uptime} uptime
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <Button variant="link" size="sm" className="p-0">
                    View detailed status →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video Tutorials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="w-5 h-5 mr-2" />
              Video Tutorials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tutorials.map((tutorial, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <Video className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">{tutorial.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{tutorial.duration}</span>
                    <Badge variant="outline" className="text-xs">
                      {tutorial.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{tutorial.views} views</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      {tutorial.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}