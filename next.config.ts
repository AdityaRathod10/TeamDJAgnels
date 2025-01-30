import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores ESLint during build
  },
  images: {
    domains: ['maps.googleapis.com'],
  },
};

export default nextConfig;
