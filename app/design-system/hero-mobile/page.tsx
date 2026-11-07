import type { Metadata } from 'next';
import { Hero } from '@/components/ui/Hero';
import { ButtonLink } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { t } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Hero mobile — option recadrage', robots: { index: false, follow: false } };

/** Option A du hero mobile : recadrage de hero-silhouette (l'accueil utilise l'option B, top-light-painting). */
export default function HeroMobileOption() {
  const h = t.home.hero;
  return (
    <Hero
      mobile="crop"
      eyebrow={<Label className="text-ink-2">{h.eyebrow}</Label>}
      title={[...h.titleLines]}
      sub={h.sub}
      scrollLabel={h.scroll}
      actions={<><ButtonLink href="/collection">{h.ctaPrimary}</ButtonLink><ButtonLink href="/#contact" variant="secondary">{h.ctaSecondary}</ButtonLink></>}
    />
  );
}
