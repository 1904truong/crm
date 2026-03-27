import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    return [
      { source: '/api', destination: 'http://localhost:3002/' },
      { source: '/api/', destination: 'http://localhost:3002/' },
      { source: '/api/:path*', destination: 'http://localhost:3002/:path*' },
    ];
  },
};

export default nextConfig;