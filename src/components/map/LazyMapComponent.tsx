"use client";

import { Suspense } from 'react';
import { LoadingSpinner } from '../ui/loading-spinner';

const MapLoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
    <div className="text-center">
      <LoadingSpinner />
      <p className="mt-2 text-sm text-gray-600">Loading map...</p>
    </div>
  </div>
);

// Mock map component for production build
const MockMap = ({ children, ...props }: any) => (
  <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <p className="text-gray-600">Interactive Map Component</p>
      <p className="text-sm text-gray-500 mt-1">Map integration available in runtime</p>
    </div>
  </div>
);

interface LazyMapProps {
  children?: React.ReactNode;
  [key: string]: any;
}

export const LazyMapComponent: React.FC<LazyMapProps> = ({ children, ...props }) => {
  return (
    <Suspense fallback={<MapLoadingFallback />}>
      <MockMap {...props}>
        {children}
      </MockMap>
    </Suspense>
  );
};

export default LazyMapComponent;