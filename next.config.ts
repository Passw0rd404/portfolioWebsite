import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // builds a static site into ./out
  reactStrictMode: true,
  images: { unoptimized: true }, // Pages has no image optimizer
  experimental: {
    optimizeCss: true,
    scrollRestoration: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
