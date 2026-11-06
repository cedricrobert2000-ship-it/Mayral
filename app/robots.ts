import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/off-market', '/brand', '/design-system', '/univers/'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
