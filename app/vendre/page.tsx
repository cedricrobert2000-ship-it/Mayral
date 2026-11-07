import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactForm } from '@/components/ui/ContactForm';
import { getCar } from '@/lib/cars';
import { t } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Vendre ou trouver une voiture', description: t.sell.intro, alternates: { canonical: '/vendre' } };

function Block({ id, title, body, image, source, interest, label }: { id: string; title: string; body: string; image?: string; source: 'sell' | 'find'; interest: 'sell' | 'car'; label: string }) {
  return (
    <section id={id} className="panel min-h-[760px] scroll-mt-24">
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image src={image} alt="" fill sizes="100vw" quality={78} className="grade object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,2,2,0.2),rgba(2,2,2,0.6))]" />
        </div>
      )}
      <div className="flex min-h-[760px] items-end p-3 md:items-center md:justify-end md:p-6 xl:p-8">
        <div data-reveal="fade" className="glass w-full p-6 md:max-w-[480px] md:p-9">
          <span className="pill">{label}</span>
          <h2 className="mt-5 text-[clamp(26px,2.6vw,36px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink">{title}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{body}</p>
          <div className="mt-7"><ContactForm source={source} interest={interest} showInterest={false} /></div>
        </div>
      </div>
    </section>
  );
}

export default function VendrePage() {
  const s = t.sell;
  return (
    <>
      <PageHeader
        label={s.label}
        title={s.title}
        aside={
          <div className="flex flex-wrap gap-2">
            <a href="#vendre" className="pill hover:bg-ink/15">{s.sellTitle} ↓</a>
            <a href="#rechercher" className="pill hover:bg-ink/15">{s.findTitle} ↓</a>
          </div>
        }
      >
        {s.intro}
      </PageHeader>
      <Block id="vendre" label="01" title={s.sellTitle} body={s.sellBody} image={getCar('porsche-911-992-s-t')?.image} source="sell" interest="sell" />
      <Block id="rechercher" label="02" title={s.findTitle} body={s.findBody} image={getCar('koenigsegg-jesko')?.image} source="find" interest="car" />
    </>
  );
}
