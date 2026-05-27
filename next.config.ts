import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
