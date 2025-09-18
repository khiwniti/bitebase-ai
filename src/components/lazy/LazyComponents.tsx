"use client";

import { lazy } from 'react';

// Lazy load heavy components to improve initial bundle size
export const LazyGenerativeUIManager = lazy(() => 
  import('../generative/GenerativeUIManager').then(module => ({
    default: module.GenerativeUIManager
  }))
);

export const LazyMarketAnalysisCard = lazy(() =>
  import('../generative/MarketAnalysisCard').then(module => ({
    default: module.MarketAnalysisCard
  }))
);

export const LazyLocationCard = lazy(() =>
  import('../generative/LocationCard').then(module => ({
    default: module.LocationCard
  }))
);

export const LazyCompetitorAnalysisCard = lazy(() =>
  import('../generative/CompetitorAnalysisCard').then(module => ({
    default: module.CompetitorAnalysisCard
  }))
);

export const LazyCustomReportLayoutManager = lazy(() =>
  import('../generative/CustomReportLayoutManager')
);