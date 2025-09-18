// Production configuration for BiteBase Intelligence
export const ProductionConfig = {
  // Data Services Configuration
  dataServices: {
    // External restaurant data API configuration
    restaurantAPI: {
      baseUrl: 'https://www.wongnai.com/_api',
      endpoints: {
        businesses: '/businesses',
        restaurantMenu: '/restaurants/{publicId}/delivery-menu'
      },
      cacheTimeout: 5 * 60 * 1000, // 5 minutes
      fallbackEnabled: true,
      rateLimiting: {
        requestsPerMinute: 60,
        burstLimit: 10
      }
    },
    
    // Geospatial services
    geospatial: {
      defaultLocation: {
        lat: 13.7563,
        lng: 100.5018 // Bangkok, Thailand
      },
      searchRadius: {
        default: 1000, // 1km
        max: 5000,     // 5km
        min: 100       // 100m
      }
    }
  },

  // Feature flags for production readiness
  features: {
    realDataIntegration: true,
    mockDataFallback: true,
    advancedAnalytics: true,
    realTimeUpdates: true,
    cacheOptimization: true
  },

  // Analytics and monitoring
  analytics: {
    trackUserInteractions: true,
    performanceMonitoring: true,
    errorReporting: true,
    dataUsageMetrics: true
  },

  // UI/UX Configuration
  ui: {
    brandingMode: 'generic', // Don't expose external API sources
    loadingStates: {
      showDetailedProgress: true,
      timeoutMs: 30000
    },
    errorHandling: {
      gracefulDegradation: true,
      userFriendlyMessages: true
    }
  },

  // Performance optimizations
  performance: {
    dataPreloading: true,
    lazyLoading: true,
    imageOptimization: true,
    cacheStrategies: {
      restaurants: 'stale-while-revalidate',
      menus: 'cache-first',
      analytics: 'network-first'
    }
  },

  // Security settings
  security: {
    dataSanitization: true,
    apiKeyObfuscation: true,
    corsSettings: {
      allowedOrigins: ['https://bitebase.ai'],
      credentials: false
    }
  }
};

// Environment-specific configurations
export const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env) {
    case 'production':
      return {
        ...ProductionConfig,
        features: {
          ...ProductionConfig.features,
          // Enable all production features
        }
      };
    
    case 'development':
      return {
        ...ProductionConfig,
        features: {
          ...ProductionConfig.features,
          mockDataFallback: true,
          realDataIntegration: false // Use mock data in development
        },
        analytics: {
          ...ProductionConfig.analytics,
          trackUserInteractions: false
        }
      };
    
    default:
      return ProductionConfig;
  }
};

// Data source attribution (without exposing brand names)
export const DataAttribution = {
  restaurantData: "Restaurant information provided by external data partners",
  menuData: "Menu data sourced from restaurant management systems",
  geospatialData: "Location analysis powered by geospatial intelligence",
  marketData: "Market insights generated from aggregated industry data"
};

// Error messages for user-facing display
export const UserMessages = {
  dataLoading: "Loading restaurant data...",
  dataUnavailable: "Restaurant data temporarily unavailable. Please try again later.",
  networkError: "Unable to connect to data services. Check your internet connection.",
  analysisInProgress: "Analyzing market data and generating insights...",
  analysisComplete: "Analysis complete! Review the insights below.",
  noResultsFound: "No restaurants found matching your criteria. Try adjusting your search.",
  locationRequired: "Please provide a location for accurate restaurant analysis."
};

// Production-ready constants
export const Constants = {
  APP_NAME: "BiteBase Intelligence",
  VERSION: "1.0.0",
  SUPPORTED_REGIONS: ["Thailand", "Southeast Asia"],
  DEFAULT_CURRENCY: "THB",
  SUPPORTED_LANGUAGES: ["en", "th"],
  MAX_SEARCH_RESULTS: 50,
  MAX_ANALYSIS_RADIUS_KM: 5
};