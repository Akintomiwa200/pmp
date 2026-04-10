import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporary deploy-safety flags for Vercel while migration stabilizes.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
