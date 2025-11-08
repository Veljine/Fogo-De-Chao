import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "eda.ru"
            },
            {
                protocol: "https",
                hostname: "shopkitchenkettle.com"
            },
            {
                protocol: "https",
                hostname: "images.immediate.co.uk"
            }
        ]
    }
};

export default nextConfig;
