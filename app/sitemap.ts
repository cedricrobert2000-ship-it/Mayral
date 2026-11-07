import type { MetadataRoute } from 'next';
import { getCars } from '@/lib/cars';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/automobiles', '/immobilier', '/services', '/vendre', '/a-propos', '/contact', '/mentions-legales', '/confidentialite'];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, lastModified: now, priority: p === '' ? 1 : 0.7 })),
    ...getCars().map((c) => ({ url: `${siteUrl}/automobiles/${c.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
