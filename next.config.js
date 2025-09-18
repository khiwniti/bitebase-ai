/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ['mapbox-gl'],
        swcMinify: true,
        esmExternals: true,
        // Development mode optimizations
        optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
    // Performance optimizations
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
    
    // Additional optimizations for faster loading
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    
    // Output optimization
    output: 'standalone',
    
    // Bundle analyzer and optimization
    webpack: (config, { dev, isServer }) => {
        // Development mode optimizations
        if (dev) {
            // Faster builds in development
            config.cache = {
                type: 'filesystem',
                cacheDirectory: require('path').resolve('.next/cache/webpack')
            };
            
            // Reduce bundle size in development
            config.optimization = {
                ...config.optimization,
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        default: false,
                        vendors: false,
                        // Framework chunk for faster reloads
                        framework: {
                            name: 'framework',
                            chunks: 'all',
                            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                            priority: 40,
                            enforce: true,
                        },
                        // Separate heavy libraries
                        maps: {
                            name: 'maps',
                            chunks: 'async',
                            test: /[\\/]node_modules[\\/](mapbox-gl|react-map-gl)[\\/]/,
                            priority: 35,
                        },
                        // UI libraries
                        ui: {
                            name: 'ui',
                            chunks: 'all',
                            test: /[\\/]node_modules[\\/](@radix-ui)[\\/]/,
                            priority: 30,
                        },
                    },
                },
            };
        }
        // Fallback configuration
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };

        // Production optimizations
        if (!dev && !isServer) {
            // Tree shaking and dead code elimination
            config.optimization = {
                ...config.optimization,
                usedExports: true,
                sideEffects: false,
                splitChunks: {
                    chunks: 'all',
                    minSize: 20000,
                    maxSize: 244000,
                    cacheGroups: {
                        default: false,
                        vendors: false,
                        // Framework chunk
                        framework: {
                            name: 'framework',
                            chunks: 'all',
                            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
                            priority: 40,
                            enforce: true,
                        },
                        // Map libraries chunk - only load when needed
                        maps: {
                            name: 'maps',
                            chunks: 'async',
                            test: /[\\/]node_modules[\\/](mapbox-gl|react-map-gl|@mapbox|deck\.gl|@deck\.gl)[\\/]/,
                            priority: 35,
                            enforce: true,
                        },
                        // UI libraries chunk
                        ui: {
                            name: 'ui',
                            chunks: 'all',
                            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|class-variance-authority)[\\/]/,
                            priority: 30,
                        },
                        // Vendor chunk for other node_modules
                        vendor: {
                            name: 'vendor',
                            chunks: 'all',
                            test: /[\\/]node_modules[\\/]/,
                            priority: 20,
                        },
                        // Common chunk for shared components
                        common: {
                            name: 'common',
                            minChunks: 2,
                            chunks: 'all',
                            priority: 10,
                            reuseExistingChunk: true,
                        },
                    },
                },
            };

            // Minimize bundle size
            config.resolve.alias = {
                ...config.resolve.alias,
                '@': require('path').join(__dirname, 'src'),
            };
        }

        return config;
    },

    // Headers for performance
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
            {
                source: '/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;