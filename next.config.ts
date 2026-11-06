import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 2048, 2400],
    qualities: [70, 80, 90],
  },
  poweredByHeader: false,
};

export default config;
