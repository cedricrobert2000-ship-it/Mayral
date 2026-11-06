import type { Metadata } from 'next';
import { PageIntro } from '@/components/sections/PageIntro';
import { VehicleCard } from '@/components/ui/VehicleCard';
import { ButtonLink } from '@/components/ui/Button';
import { getVehicles } from '@/lib/vehicles';
import { t } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Collection', description: t.collection.intro, alternates: { canonical: '/collection' } };

export default function CollectionPage() {
  const vehicles = getVehicles();
  return (
    <>
      <PageIntro label={t.collection.label} title={t.collection.title} aside={<p className="label text-ink-muted tabular">{t.collection.count(vehicles.length)}</p>}>
        {t.collection.intro}
      </PageIntro>

      <section className="shell pb-[var(--section-y)]">
        {/* Prévu pour 1 à 20+ véhicules ; les filtres pourront s'insérer ici. */}
        <ul className="grid gap-x-[var(--gutter)] gap-y-20 md:gap-y-24 xl:grid-cols-2">
          {vehicles.map((v, i) => (
            <li key={v.slug} className={vehicles.length === 1 || (i === 0 && vehicles.length % 2 === 1) ? 'xl:col-span-2' : ''}>
              <VehicleCard
                vehicle={v}
                priority={i === 0}
                sizes={vehicles.length === 1 || i === 0 ? '(min-width: 1600px) 1472px, 100vw' : '(min-width: 1280px) 50vw, 100vw'}
              />
            </li>
          ))}
        </ul>

        <div className="mt-24 flex flex-col items-start gap-6 border-t border-line pt-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[48ch] text-body-l text-ink-2">{t.collection.empty}</p>
          <ButtonLink href="/off-market" variant="secondary" arrow>{t.home.offMarket.cta}</ButtonLink>
        </div>
      </section>
    </>
  );
}
