import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['rickandmortyapi.com'], // Harici URL için domain eklendi
  },
};

export default nextConfig;
