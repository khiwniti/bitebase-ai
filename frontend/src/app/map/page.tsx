/**
 * Interactive Map Canvas with Shared State and Generative UI
 */

'use client';

import { useState, useEffect } from 'react';
import { useReports } from '@/contexts/ReportsContext';
import { SharedStateProvider } from '@/components/shared/SharedStateProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Map as MapIcon,
  Brain,
  Home,
  FileText,
  Settings,
  User,
  Bell,
  ChevronLeft,
  ChevronRight,
  Layers,
  Filter,
  Download,
  Share,
  Zap,
  MapPin,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MapCanvasPage() {
  const router = useRouter();
  const { allReports } = useReports();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLayers, setSelectedLayers] = useState<string[]>(['restaurants', 'competitors', 'properties']);
  const [currentView, setCurrentView] = useState('overview');

  const navigationItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Brain, label: 'Chat Analysis', href: '/chat' },
    { icon: FileText, label: 'Reports', href: '/reports' },
    { icon: MapIcon, label: 'Map Canvas', href: '/map', active: true },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const mapLayers = [
    { id: 'restaurants', label: 'Restaurants', color: 'bg-blue-500', count: 142 },
    { id: 'competitors', label: 'Competitors', color: 'bg-red-500', count: 89 },
    { id: 'properties', label: 'Properties', color: 'bg-green-500', count: 234 },
    { id: 'heatmap', label: 'Density Heatmap', color: 'bg-orange-500', count: null },
    { id: 'transport', label: 'Transportation', color: 'bg-purple-500', count: 45 },
  ];

  const toggleLayer = (layerId: string) => {
    setSelectedLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  return (
    <SharedStateProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Enhanced Sidebar */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {isSidebarOpen ? (
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                    <Brain className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    BiteBase AI
                  </span>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                  <Brain className="h-5 w-5" />
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1"
              >
                {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Map Layers Panel */}
          {isSidebarOpen && (
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Map Layers</h3>
              <div className="space-y-2">
                {mapLayers.map((layer) => (
                  <div
                    key={layer.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleLayer(layer.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${layer.color} ${
                        selectedLayers.includes(layer.id) ? 'opacity-100' : 'opacity-40'
                      }`} />
                      <span className="text-xs text-gray-700">{layer.label}</span>
                    </div>
                    {layer.count && (
                      <span className="text-xs text-gray-500">{layer.count}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className={`flex items-center ${isSidebarOpen ? 'space-x-3' : 'justify-center'}`}>
              <div className="bg-gray-300 rounded-full p-2">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              {isSidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Guest User</p>
                  <p className="text-xs text-gray-500">Free Plan</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Interactive Map Canvas</h1>
                <p className="text-gray-600">Geospatial analysis with real-time data visualization</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Real-time Data
                </Badge>
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button 
                  onClick={() => router.push('/chat')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Start Analysis
                </Button>
              </div>
            </div>
          </header>

          {/* Map Controls */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant={currentView === 'overview' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('overview')}
                >
                  <MapIcon className="h-4 w-4 mr-2" />
                  Overview
                </Button>
                <Button
                  variant={currentView === 'analysis' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('analysis')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analysis
                </Button>
                <Button
                  variant={currentView === 'heatmap' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentView('heatmap')}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Heatmap
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Layers className="h-4 w-4 mr-2" />
                  Layers
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Map Content */}
          <div className="flex-1 relative">
            {/* Placeholder Map */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-md">
                  <MapIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Interactive Map Canvas</h2>
                  <p className="text-gray-600 mb-6">
                    Advanced geospatial analysis with shared state management. 
                    This will integrate with Mapbox MCP server for professional mapping capabilities.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Active Layers:</span>
                      <span className="font-medium">{selectedLayers.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Current View:</span>
                      <span className="font-medium capitalize">{currentView}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Data Sources:</span>
                      <span className="font-medium">4 Connected</span>
                    </div>
                  </div>
                  <Button 
                    className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => router.push('/chat')}
                  >
                    Start Location Analysis
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating Controls */}
            <div className="absolute top-4 right-4 space-y-2">
              <Card className="p-3">
                <div className="text-xs text-gray-600 mb-2">Quick Actions</div>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <MapPin className="h-3 w-3 mr-2" />
                    Add Location
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-3 w-3 mr-2" />
                    Analyze Area
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Zap className="h-3 w-3 mr-2" />
                    Heat Analysis
                  </Button>
                </div>
              </Card>
            </div>

            {/* Status Panel */}
            <div className="absolute bottom-4 left-4">
              <Card className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {selectedLayers.map((layerId) => {
                      const layer = mapLayers.find(l => l.id === layerId);
                      return (
                        <div
                          key={layerId}
                          className={`w-2 h-2 rounded-full ${layer?.color}`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-xs text-gray-600">
                    {selectedLayers.length} layers active • Bangkok, Thailand
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SharedStateProvider>
  );
}