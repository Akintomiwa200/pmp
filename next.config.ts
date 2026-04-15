import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporary deploy-safety flags for Vercel while migration stabilizes.
experimental: {
  esmExternals: "loose",
},
};

export default nextConfig;
