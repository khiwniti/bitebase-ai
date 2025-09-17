/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
    },
    experimental: {
        serverComponentsExternalPackages: ['mapbox-gl']
    },
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };
        return config;
    }
};

module.exports = nextConfig;