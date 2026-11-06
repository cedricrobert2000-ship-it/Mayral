import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Hero } from '@/components/ui/Hero';
import { ButtonLink } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Gallery } from '@/components/ui/Gallery';
import { SpecTable } from '@/components/ui/SpecTable';
import { EditorialBlock } from '@/components/ui/EditorialBlock';
import { FormOnImage } from '@/components/sections/FormOnImage';
import { media } from '@/lib/media';
import { formatPrice, getVehicle, getVehicles } from '@/lib/vehicles';
import { t } from '@/lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => getVehicles().map((v) => ({ slug: v.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const v = getVehicle((await params).slug);
  if (!v) return {};
  return {
    title: `${v.name} ${v.year}`,
    description: v.story[0]?.replace(/^TODO — /, ''),
    alternates: { canonical: `/collection/${v.slug}` },
    openGraph: { images: [{ url: media[v.hero].src, width: media[v.hero].width, height: media[v.hero].height }] },
  };
}

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const v = getVehicle((await params).slug);
  if (!v) notFound();
  const price = formatPrice(v, t.collection.onRequest);

  return (
    <>
      <Hero
        image={media[v.hero]}
        eyebrow={
          <nav aria-label="Fil d'Ariane" className="label flex items-center gap-3 text-ink-2">
            <Link href="/collection" className="hover:text-ink">{t.vehicle.back}</Link>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <span className="tabular">{v.year}</span>
          </nav>
        }
        title={v.name}
        sub={v.subtitle}
        actions={
          <>
            <ButtonLink href="#essai">{t.vehicle.ctaTrial}</ButtonLink>
            <ButtonLink href="#essai" variant="secondary">{t.vehicle.ctaFile}</ButtonLink>
          </>
        }
      />

      {/* Chiffres clés */}
      <section className="shell border-b border-line py-12 md:py-16">
        <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {v.highlights.map((h) => (
            <div key={h.label}>
              <dt className="label text-ink-muted">{h.label}</dt>
              <dd className="mt-3 text-display-m text-ink tabular">{h.value}</dd>
            </div>
          ))}
          <div>
            <dt className="label text-ink-muted">{t.vehicle.price}</dt>
            <dd className="mt-3 text-display-m text-ink tabular">{price}</dd>
          </div>
        </dl>
      </section>

      <section className="section-y">
        <Gallery images={v.gallery.map((k) => media[k])} title={v.name} />
      </section>

      <section className="shell pb-[var(--section-y)]">
        <EditorialBlock image={media.tailLight} label={<Label index="01">{t.vehicle.story}</Label>} title="Une voiture, une histoire.">
          {v.story.map((p) => <p key={p}>{p}</p>)}
        </EditorialBlock>
      </section>

      <section className="shell pb-[var(--section-y)]">
        <Label index="02">{t.vehicle.specs}</Label>
        <h2 data-reveal="text" className="mt-6 mb-14 text-display-l text-ink">{v.name}</h2>
        <SpecTable specs={v.specs} />
      </section>

      <FormOnImage
        id="essai"
        label={<Label index="03">{t.vehicle.ctaTrial}</Label>}
        title={t.vehicle.nextTitle}
        body={`${v.name} · ${v.year} · ${price}`}
        source="vehicle"
        vehicle={`${v.name} ${v.year}`}
      />
    </>
  );
}
