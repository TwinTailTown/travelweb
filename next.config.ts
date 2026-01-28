import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'p3-doubao-search-sign.byteimg.com',
      'p11-doubao-search-sign.byteimg.com',
      'p26-doubao-search-sign.byteimg.com',
    ],
    unoptimized: true,
  },
}

export default nextConfig
