import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CarsBrowser } from '@/components/sections/CarsBrowser';
import { ContactPanel } from '@/components/sections/ContactPanel';
import { ButtonLink } from '@/components/ui/Button';
import { getBrands, getCars } from '@/lib/cars';
import { t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Automobiles off-market et build slots',
  description: 'Bugatti, Ferrari, Koenigsegg, Pagani, McLaren, Porsche… Hypercars off-market et places de production, présentées en privé.',
  alternates: { canonical: '/automobiles' },
};

export default function AutomobilesPage() {
  return (
    <>
      <section className="panel px-5 pb-14 pt-32 md:px-10 md:pb-20 md:pt-40 xl:px-14">
        <span className="pill">{t.cars.label}</span>
        <h1 data-reveal="text" data-trigger="load" className="mt-6 text-display-xl text-ink">{t.cars.title}</h1>
        <p data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.3s' }} className="mt-6 max-w-[56ch] text-body-l text-ink-2">{t.cars.intro}</p>
        <div className="mt-12">
          <Suspense>
            <CarsBrowser cars={getCars()} brands={getBrands()} />
          </Suspense>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[20px] bg-elevated p-6 md:flex-row md:items-center md:p-8">
          <p className="max-w-[48ch] text-body-l text-ink">{t.cars.notFound}</p>
          <ButtonLink href="/vendre#rechercher" variant="red" arrow>{t.cars.find}</ButtonLink>
        </div>
      </section>
      <ContactPanel title={t.home.contact.title} source="find" interest="car" />
    </>
  );
}
