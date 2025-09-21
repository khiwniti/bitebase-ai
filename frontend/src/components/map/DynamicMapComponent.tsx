"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '../ui/loading-spinner';

// Dynamically import MapComponent to avoid SSR issues with mapbox-gl
const MapComponent = dynamic(
  () => import('./MapComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-2 text-sm text-gray-600">Loading interactive map...</p>
        </div>
      </div>
    ),
  }
);

const DynamicMapComponent = (props: any) => {
  return (
    <Suspense fallback={
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-2 text-sm text-gray-600">Initializing map...</p>
        </div>
      </div>
    }>
      <MapComponent {...props} />
    </Suspense>
  );
};

export default DynamicMapComponent;