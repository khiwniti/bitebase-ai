"use client";

import { useState, useEffect } from 'react';

// Lightweight map placeholder for faster development loading
const DevMapPlaceholder = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate faster loading in development
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isMapLoaded) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
          <p className="text-sm text-gray-600 mb-4">Restaurant location analytics and market intelligence</p>
          <div className="animate-pulse">
            <div className="text-xs text-blue-600">Loading map components...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border border-gray-200 relative overflow-hidden">
      {/* Mock map interface */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-green-200/30">
        {/* Mock map markers */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-3/4 left-2/3 w-3 h-3 bg-green-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Mock info panel */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h4 className="font-medium text-gray-900 mb-2">Market Analysis Ready</h4>
          <p className="text-sm text-gray-600 mb-3">Interactive map with restaurant intelligence</p>
          <div className="space-y-2">
            <div className="flex items-center text-xs text-gray-500">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              Competitor Locations
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Opportunity Zones
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              High Traffic Areas
            </div>
          </div>
        </div>

        {/* Mock controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <button className="w-8 h-8 bg-white rounded shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50">
            <span className="text-lg">+</span>
          </button>
          <button className="w-8 h-8 bg-white rounded shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50">
            <span className="text-lg">−</span>
          </button>
        </div>
      </div>
      
      {/* Development mode indicator */}
      <div className="absolute bottom-4 left-4 bg-yellow-100 border border-yellow-300 rounded-md px-2 py-1">
        <span className="text-xs text-yellow-800">Dev Mode - Fast Loading</span>
      </div>
    </div>
  );
};

export default DevMapPlaceholder;