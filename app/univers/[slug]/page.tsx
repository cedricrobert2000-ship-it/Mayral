import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ButtonLink } from '@/components/ui/Button';
import { Monogram } from '@/components/ui/Logo';
import { t } from '@/lib/i18n';

// Placeholders v1. Chaque univers aura sa propre page (contenu dans content/univers/ à venir).
const slugs = ['maison', 'yacht', 'jet', 'conciergerie'] as const;
type Slug = (typeof slugs)[number];

export const dynamicParams = false;
export const generateStaticParams = () => slugs.map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: Slug }> }): Promise<Metadata> {
  const u = t.univers[(await params).slug];
  return { title: u.title, description: u.line, robots: { index: false } };
}

export default async function UniversPage({ params }: { params: Promise<{ slug: Slug }> }) {
  const slug = (await params).slug;
  if (!slugs.includes(slug)) notFound();
  const u = t.univers[slug];
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      <div aria-hidden className="halo absolute inset-0 !opacity-100 [background:radial-gradient(45%_45%_at_50%_70%,rgba(74,11,16,0.45),transparent_75%)]" />
      <Monogram className="pointer-events-none absolute left-1/2 top-1/2 w-[70vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 text-ink/[0.025]" />
      <div className="shell relative py-40 text-center">
        <p className="label text-ink-muted" data-reveal="fade" data-trigger="load">MAYRAL · {t.nav.univers}</p>
        <h1 data-reveal="text" data-trigger="load" style={{ ['--d' as string]: '0.1s' }} className="mt-6 text-display-xl text-ink">{u.title}</h1>
        <p data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.4s' }} className="mx-auto mt-6 max-w-[36ch] text-body-l text-ink-2">{u.line}</p>
        <div data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.6s' }} className="mt-12 flex flex-col items-center gap-8">
          <span className="label inline-flex items-center gap-3 text-ink">
            <span aria-hidden className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(255,90,78,0.5)]" />
            {t.univers.soon}
          </span>
          <ButtonLink href="/contact" variant="secondary" arrow>{t.univers.cta}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
