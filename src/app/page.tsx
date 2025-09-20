/**
 * Professional Landing Page for BiteBase AI SaaS
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowRight, 
  Brain, 
  BarChart3, 
  MapPin, 
  DollarSign, 
  Megaphone,
  Zap,
  Users,
  Shield,
  Sparkles,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                <Brain className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BiteBase AI
              </span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Beta
              </Badge>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/chat">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Start Analysis
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
            🚀 Powered by Advanced AI Agents
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Market Research for
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Restaurant Success
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get comprehensive market analysis for your cafe or restaurant using AI-powered research agents. 
            Analyze products, places, prices, and promotions with real Thai market data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/chat">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Start Free Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>4.9/5 accuracy rate</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>500+ restaurants analyzed</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>95% success rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              4P Market Analysis Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI agents analyze the four pillars of restaurant success using real market data from Thai platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Product Analysis',
                description: 'Menu optimization, dish popularity, and pricing strategy using Wongnai and Food Panda data',
                features: ['Menu Analysis', 'Dish Popularity', 'Pricing Strategy', 'Seasonal Trends']
              },
              {
                icon: MapPin,
                title: 'Place Analysis',
                description: 'Location intelligence, competitor mapping, and foot traffic analysis',
                features: ['Location Scoring', 'Competitor Density', 'Foot Traffic', 'Accessibility']
              },
              {
                icon: DollarSign,
                title: 'Price Analysis',
                description: 'Revenue forecasting, profitability modeling, and financial projections',
                features: ['Revenue Forecast', 'ROI Calculation', 'Break-even Analysis', 'Profit Optimization']
              },
              {
                icon: Megaphone,
                title: 'Promotion Analysis',
                description: 'Customer sentiment, marketing insights, and promotional strategies',
                features: ['Sentiment Analysis', 'Customer Segmentation', 'Marketing Insights', 'Campaign Planning']
              }
            ].map((feature, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg w-fit">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform leverages cutting-edge AI agents and real-time data processing for accurate insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'LangGraph AI Agents',
                description: 'Multi-agent workflows with intelligent coordination and real-time progress tracking'
              },
              {
                icon: Zap,
                title: 'Real-time Data Processing',
                description: 'Live web scraping from Wongnai, Food Panda, DDProperty, and RentHub with advanced automation'
              },
              {
                icon: Shield,
                title: 'Professional MCP Servers',
                description: 'Open-source Model Context Protocol servers for reliable data collection and analysis'
              }
            ].map((tech, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-fit">
                    <tech.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{tech.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Launch Your Restaurant?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get professional market research in minutes, not weeks. 
            Start your analysis today and make data-driven decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Sparkles className="mr-2 h-4 w-4" />
                Start Free Analysis
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                  <Brain className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold">BiteBase AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered market research for restaurant success in Thailand.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/api-docs" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 BiteBase AI. All rights reserved. Built with ❤️ for Thai restaurant entrepreneurs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}