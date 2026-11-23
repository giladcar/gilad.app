import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/gilad.app",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;