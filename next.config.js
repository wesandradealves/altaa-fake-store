/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('node:path');
const withPWA = require('@ducanh2912/next-pwa').default;

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const apiBaseUrl = (process.env.NEXT_PUBLIC_FAKE_STORE_API_URL || 'https://fakestoreapi.com').replace(/\/$/, '');
const apiPattern = new RegExp(`^${escapeRegExp(apiBaseUrl)}/.*$`, 'i');

const pwaRuntimeCaching = [
    {
        urlPattern: apiPattern,
        handler: 'NetworkFirst',
        options: {
            cacheName: 'api-cache',
            networkTimeoutSeconds: 10,
            expiration: {
                maxEntries: 200,
                maxAgeSeconds: 24 * 60 * 60,
            },
            cacheableResponse: {
                statuses: [0, 200],
            },
        },
    },
    {
        urlPattern: ({ request }) => request.mode === 'navigate',
        handler: 'NetworkFirst',
        options: {
            cacheName: 'page-cache',
            networkTimeoutSeconds: 10,
            expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60,
            },
        },
    },
    {
        urlPattern: /\/_next\/static\/.+/i,
        handler: 'CacheFirst',
        options: {
            cacheName: 'next-static',
            expiration: {
                maxEntries: 200,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            },
        },
    },
    {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
        handler: 'CacheFirst',
        options: {
            cacheName: 'image-cache',
            expiration: {
                maxEntries: 200,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            },
            cacheableResponse: {
                statuses: [0, 200],
            },
        },
    },
    {
        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.+/i,
        handler: 'StaleWhileRevalidate',
        options: {
            cacheName: 'font-cache',
            expiration: {
                maxEntries: 50,
                maxAgeSeconds: 365 * 24 * 60 * 60,
            },
        },
    },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
    sassOptions: {
        includePaths: [path.join('/', 'app'), 'src/assets'],
    },
    reactStrictMode: true,
    images: {
        remotePatterns: [{
            hostname: '**',
        }, ],
    },
    compiler: {
        styledComponents: true,
        removeConsole: true,
    },
    async headers() {
        return [{
                source: '/_next/image', // imagens otimizadas
                headers: [{
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable',
                }, ],
            },
            {
                source: '/(.*)',
                headers: [{
                    key: 'Referrer-Policy',
                    value: 'origin-when-cross-origin',
                }, ],
            },
        ];
    },
    async rewrites() {
        return [];
    },
};

module.exports = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching: pwaRuntimeCaching,
})(nextConfig);
