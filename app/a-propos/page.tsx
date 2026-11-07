import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactPanel } from '@/components/sections/ContactPanel';
import { media } from '@/lib/media';
import { t } from '@/lib/i18n';

export const metadata: Metadata = { title: 'À propos', description: t.about.origin[1], alternates: { canonical: '/a-propos' } };

export default function AboutPage() {
  const a = t.about;
  return (
    <>
      <PageHeader label={a.label} title={a.title} />
      <section className="panel px-5 py-14 md:px-10 md:py-20 xl:px-14">
        <div className="grid gap-12 xl:grid-cols-[1fr_1.2fr] xl:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]" data-reveal="image">
            <Image src={media.topLight.src} alt="" fill sizes="(min-width: 1280px) 45vw, 100vw" quality={78} className="grade object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="space-y-5 text-body-l text-ink-2">
              {a.origin.map((p, i) => <p key={i} data-reveal="fade" className={i === 0 ? 'text-ink' : ''}>{p}</p>)}
            </div>
            <div className="mt-12 rounded-[20px] footer-red p-7 md:p-9">
              <h2 className="text-display-m text-ink">{a.missionTitle}</h2>
              <p className="mt-4 text-ink/85">{a.mission}</p>
              <p className="mt-6 text-[14px] text-ink">{a.signature}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel px-5 py-14 md:px-10 md:py-20 xl:px-14">
        <div className="grid gap-10 xl:grid-cols-[1fr_1.6fr]">
          <div>
            <span className="pill">FAQ</span>
            <h2 data-reveal="text" className="mt-6 text-display-l text-ink">{a.faqTitle}</h2>
          </div>
          <div className="space-y-2">
            {a.faq.map((f) => (
              <details key={f.q} className="group rounded-[18px] bg-elevated px-6 open:bg-black-800">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink/10 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 pr-10 text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <ContactPanel />
    </>
  );
}
