import type { MetadataRoute } from 'next';
import { getVehicles } from '@/lib/vehicles';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/collection', '/contact', '/mentions-legales', '/confidentialite'];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, lastModified: now, priority: p === '' ? 1 : 0.6 })),
    ...getVehicles().map((v) => ({ url: `${siteUrl}/collection/${v.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
