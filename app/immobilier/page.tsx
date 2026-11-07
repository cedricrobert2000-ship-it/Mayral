import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactPanel } from '@/components/sections/ContactPanel';
import { Process } from '@/components/sections/Process';
import { media } from '@/lib/media';
import { t } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Immobilier d’exception off-market',
  description: t.estate.intro,
  alternates: { canonical: '/immobilier' },
};

const visuals = [media.topLight, media.rearThreeQuarter, media.tailLight];

export default function ImmobilierPage() {
  const e = t.estate;
  return (
    <>
      <PageHeader label={e.label} title={e.title}>{e.intro}</PageHeader>

      <section className="panel px-5 py-14 md:px-10 md:py-20 xl:px-14">
        <div className="grid gap-3 md:grid-cols-3">
          {e.types.map((x, i) => (
            <article key={x.title} data-reveal="fade" data-delay={i * 0.08} className="group relative aspect-[4/5] overflow-hidden rounded-[20px] bg-elevated">
              {/* TODO : remplacer par de vraies photos de biens */}
              <Image src={visuals[i].src} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" quality={70} className="grade object-cover opacity-60 transition-transform duration-[1400ms] group-hover:scale-105" />
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(2,2,2,0.95))]" />
              <span className="pill absolute left-5 top-5 tabular">0{i + 1}</span>
              <div className="absolute inset-x-5 bottom-6">
                <h2 className="text-[clamp(28px,2.6vw,40px)] font-light tracking-[-0.03em] text-ink">{x.title}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{x.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-10 border-t border-line pt-12 md:grid-cols-[1fr_1.4fr]">
          <h2 data-reveal="text" className="text-display-m text-ink">Ce que nous faisons pour vous.</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {e.services.map((s) => (
              <li key={s} data-reveal="fade" className="flex items-center gap-4 rounded-[18px] bg-elevated p-5 text-ink">
                <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(255,90,78,0.5)]" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 text-[13px] text-ink-muted">{e.soonListings}</p>
      </section>

      <Process />
      <ContactPanel image={media.topLight} title={e.formTitle} body="Ville, surface, budget, délai : quelques lignes suffisent." source="estate" interest="estate" showInterest={false} />
    </>
  );
}
