import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactPanel } from '@/components/sections/ContactPanel';
import { getCar } from '@/lib/cars';
import { t } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Services', description: t.services.intro, alternates: { canonical: '/services' } };

export default function ServicesPage() {
  const s = t.services;
  const img = getCar('ferrari-812-competizione')?.image;
  return (
    <>
      <PageHeader label={s.label} title={s.title}>{s.intro}</PageHeader>
      <section className="panel px-5 py-14 md:px-10 md:py-20 xl:px-14">
        <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {s.items.map((x, i) => (
            <li key={x.title} data-reveal="fade" data-delay={(i % 4) * 0.06} className={`group flex min-h-[260px] flex-col justify-between rounded-[20px] p-6 transition-colors duration-500 ${i === 0 ? 'footer-red' : 'bg-elevated hover:bg-black-800'}`}>
              <span className="pill w-fit tabular">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="text-heading text-ink">{x.title}</h2>
                <p className={`mt-3 text-[14px] leading-relaxed ${i === 0 ? 'text-ink/85' : 'text-ink-2'}`}>{x.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <ContactPanel image={img ? { src: img, width: 1800, height: 1125, alt: '' } : undefined} title="Quel service vous intéresse ?" source="service" interest="service" />
    </>
  );
}
