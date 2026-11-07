import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink } from '@/components/ui/Button';
import { CarCard } from '@/components/ui/CarCard';
import { ContactPanel } from '@/components/sections/ContactPanel';
import { media } from '@/lib/media';
import { carName, getCar, getCars, specList } from '@/lib/cars';
import credits from '@/content/photo-credits.json';
import { t } from '@/lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => getCars().map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCar((await params).slug);
  if (!c) return {};
  return {
    title: `${carName(c)} — ${c.offMarket ? 'off-market' : 'build slot'}`,
    description: `${carName(c)}${c.specs.power ? `, ${c.specs.power}` : ''}. ${c.offMarket ? 'Présentée en privé, dossier sur demande.' : 'Place de production disponible.'} MAYRAL Private Office.`,
    alternates: { canonical: `/automobiles/${c.slug}` },
    openGraph: c.image ? { images: [{ url: c.image }] } : undefined,
  };
}

export default async function CarPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCar((await params).slug);
  if (!c) notFound();
  const specs = specList(c);
  const related = getCars().filter((x) => x.brand === c.brand && x.slug !== c.slug).slice(0, 3);
  const credit = (credits as Record<string, { author: string; license: string; page: string }>)[c.slug];
  const copy = c.offMarket ? { title: t.car.welcomeTitle, body: t.car.welcome } : { title: t.car.slotTitle, body: t.car.slot };

  return (
    <>
      {/* En-tête */}
      <section data-hero className="panel flex min-h-[calc(100svh-16px)] items-end md:min-h-[calc(100svh-24px)]">
        <div className="absolute inset-0 -z-10" data-hero-media>
          <div className="hero-zoom absolute inset-0">
            <Image src={c.image ?? media.heroSilhouette.src} alt={carName(c)} fill priority sizes="100vw" quality={85} className="grade object-cover" />
          </div>
          <div className="absolute inset-0" style={{ background: 'var(--overlay-hero)' }} />
          <div className="vignette absolute inset-0" />
          <div data-hero-fade className="absolute inset-0 bg-canvas opacity-0" />
        </div>
        <div className="w-full px-5 pb-6 md:px-10 md:pb-9 xl:px-14" data-hero-content>
          <nav aria-label="Fil d’Ariane" data-reveal="fade" data-trigger="load" className="flex flex-wrap items-center gap-2">
            <Link href="/automobiles" className="pill hover:bg-ink/15">← {t.car.back}</Link>
            <span className={`pill ${c.offMarket ? 'pill-red' : ''}`}>{c.offMarket ? t.cars.offMarketBadge : t.cars.buildSlotBadge}</span>
          </nav>
          <p data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.1s' }} className="mt-6 text-body-l text-ink-2">{c.brand}</p>
          <h1 data-reveal="text" data-trigger="load" style={{ ['--d' as string]: '0.15s' }} className="text-display-xl text-ink">{c.model}</h1>
          <div className="mt-8 flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
            <p data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.4s' }} className="text-ink">{t.cars.onRequest}</p>
            <div data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.5s' }} className="flex flex-wrap gap-2">
              <ButtonLink href="#demande" variant="red" data-magnetic>{t.car.cta}</ButtonLink>
              <ButtonLink href="#demande" variant="glass">{t.car.ctaFile}</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Caractéristiques + texte */}
      <section className="panel px-5 py-14 md:px-10 md:py-20 xl:px-14">
        <div className="grid gap-12 xl:grid-cols-[1.2fr_1fr] xl:gap-20">
          <div>
            <span className="pill">{t.car.specs}</span>
            {specs.length > 0 ? (
              <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
                {specs.map(([k, v]) => (
                  <div key={k} data-reveal="fade" className="rounded-[18px] bg-elevated p-5">
                    <dt className="text-[12px] text-ink-muted">{k}</dt>
                    <dd className="mt-2 text-[clamp(18px,1.6vw,24px)] leading-tight tracking-[-0.01em] text-ink tabular">{v}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-8 text-ink-2">Fiche détaillée transmise sur demande.</p>
            )}
          </div>
          <div>
            <h2 data-reveal="text" className="text-display-m text-ink">{copy.title}</h2>
            <div data-reveal="fade" className="mt-6 space-y-4 text-body text-ink-2">
              {copy.body.map((p) => <p key={p}>{p}</p>)}
            </div>
            <p className="mt-8 text-[12px] text-ink-muted">
              {t.car.photoNote}
              {credit && <> Photo : {credit.author || 'Wikimedia Commons'}, <a className="underline underline-offset-2 hover:text-ink" href={credit.page} target="_blank" rel="noopener noreferrer">{credit.license}</a>, via Wikimedia Commons.</>}
            </p>
          </div>
        </div>
      </section>

      <ContactPanel id="demande" image={c.image ? { src: c.image, width: 1800, height: 1125, alt: '' } : undefined} title={t.car.formTitle} body={carName(c)} source="car" subject={carName(c)} interest="car" showInterest={false} submitLabel={t.car.cta} />

      {related.length > 0 && (
        <section className="panel px-5 py-14 md:px-10 md:py-20 xl:px-14">
          <span className="pill">{t.car.related}</span>
          <h2 className="mt-6 text-display-m text-ink">{c.brand}</h2>
          <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {related.map((r) => <CarCard key={r.slug} car={r} />)}
          </div>
        </section>
      )}
    </>
  );
}
