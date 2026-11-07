import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 2048, 2400],
    qualities: [70, 75, 78, 80, 85, 90],
  },
  poweredByHeader: false,
  // Reprise des anciennes URL d'amcarsfrance.com (référencement conservé)
  async redirects() {
    return [
      { source: '/collection', destination: '/automobiles', permanent: true },
      { source: '/collection/:slug', destination: '/automobiles', permanent: true },
      { source: '/off-market', destination: '/automobiles?categorie=off-market', permanent: true },
      { source: '/univers/maison', destination: '/immobilier', permanent: true },
      { source: '/cars', destination: '/automobiles', permanent: true },
      { source: '/cars/:slug*', destination: '/automobiles', permanent: true },
      { source: '/manufacture/off-market', destination: '/automobiles?categorie=off-market', permanent: true },
      { source: '/manufacture/build-slot', destination: '/automobiles?categorie=build-slot', permanent: true },
      { source: '/manufacture/:brand', destination: '/automobiles', permanent: true },
      { source: '/about', destination: '/a-propos', permanent: true },
      { source: '/sell', destination: '/vendre', permanent: true },
      { source: '/find-car', destination: '/vendre#rechercher', permanent: true },
      { source: '/lastest-sales', destination: '/automobiles', permanent: true },
      { source: '/legal-privacy', destination: '/confidentialite', permanent: true },
      { source: '/terms-and-conditions', destination: '/mentions-legales', permanent: true },
    ];
  },
};

export default config;
