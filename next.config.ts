import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        useCache: true,
    },
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/storage/uploads/**'
            }
        ],
    },
    // async redirects() {
    //     return [
    //         {
    //             source: '/',
    //             destination: '/home',
    //             permanent: false
    //         }
    //     ];
    // },
};

export default nextConfig;
