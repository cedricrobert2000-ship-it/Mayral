import type { Metadata, Viewport } from 'next';
import { manrope, unbounded } from './fonts';
import './globals.css';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { Loader } from '@/components/motion/Loader';
import { Nav } from '@/components/ui/Nav';
import { Footer } from '@/components/ui/Footer';
import { t } from '@/lib/i18n';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: t.meta.title, template: '%s — MAYRAL' },
  description: t.meta.description,
  openGraph: { type: 'website', locale: 'fr_FR', siteName: 'MAYRAL — Private Office' },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = { themeColor: '#050304', colorScheme: 'dark' };

// Avant le rendu : active les animations (sauf prefers-reduced-motion) et saute le loader s'il a déjà été vu.
const boot = `(function(){var d=document.documentElement;var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(r)return;d.classList.add('js-motion');var seen=true;try{seen=!!sessionStorage.getItem('mayral-intro')}catch(e){}if(seen){d.classList.add('intro-seen');return}d.classList.add('intro-play');setTimeout(function(){try{sessionStorage.setItem('mayral-intro','1')}catch(e){}d.classList.add('intro-seen')},3600)})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <MotionProvider>
          <Loader />
          <Nav />
          <main id="contenu">{children}</main>
          <Footer />
        </MotionProvider>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
