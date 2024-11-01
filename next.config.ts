import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // remove appDir if present here
  experimental: {
    // Only include supported experimental options here if needed
  },
};

export default nextConfig;
