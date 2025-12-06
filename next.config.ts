import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    productionBrowserSourceMaps: true,
    images: {
        formats: ['image/webp', 'image/avif'],
        unoptimized: false,
    },
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'skyboundstudio.fr',
                    },
                ],
                destination: 'https://www.skyboundstudio.fr/:path*',
                permanent: true,
            },
        ];
    },
    headers: async () => {
        return [
            {
                source: "/(.*)",
                headers: [
                { key: "X-Frame-Options", value: "DENY" },
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "origin-when-cross-origin" },
                { key: "X-DNS-Prefetch-Control", value: "on" },
                { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
                {
                key: "Content-Security-Policy",
                value: process.env.NODE_ENV === 'development'
                    ? `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://vitals.vercel-analytics.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://vitals.vercel-analytics.com;`
                    : `default-src 'self'; script-src 'self' 'unsafe-inline' https://vercel.live https://vitals.vercel-analytics.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://vitals.vercel-analytics.com;`,
                },
                ],
            },
        ];
    },
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
};

export default nextConfig;