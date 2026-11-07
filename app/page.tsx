import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/ui/Hero';
import { ButtonLink } from '@/components/ui/Button';
import { CarCard } from '@/components/ui/CarCard';
import { RegistryRow } from '@/components/ui/RegistryRow';
import { Marquee } from '@/components/ui/Marquee';
import { ContactPanel } from '@/components/sections/ContactPanel';
import { Process } from '@/components/sections/Process';
import { media } from '@/lib/media';
import { getBrands, getCar, getFeaturedCars, getIconicOffMarket } from '@/lib/cars';
import { t } from '@/lib/i18n';

const Arrow = () => (
  <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 -rotate-45"><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
);

export default function Home() {
  const h = t.home;
  const featured = getFeaturedCars();
  const iconic = getIconicOffMarket();
  const wayImages = { 'off-market': getCar('ferrari-f40')?.image, 'build-slot': getCar('bugatti-tourbillon')?.image, immobilier: undefined };

  return (
    <>
      <Hero
        mobile="portrait"
        eyebrow={<span className="pill">{h.hero.eyebrow}</span>}
        title={[...h.hero.titleLines]}
        sub={h.hero.sub}
        scrollLabel={h.hero.scroll}
        actions={
          <>
            <ButtonLink href="/automobiles" data-magnetic>{h.hero.ctaPrimary}</ButtonLink>
            <ButtonLink href="#contact" variant="glass" data-magnetic>{h.hero.ctaSecondary}</ButtonLink>
          </>
        }
      />

      {/* Chiffres + trois accès */}
      <section className="panel px-5 py-14 md:px-10 md:py-20 xl:px-14">
        <dl className="grid grid-cols-2 gap-y-8 border-b border-line pb-12 md:grid-cols-4 md:pb-16">
          {h.figures.map((f) => (
            <div key={f.label}>
              <dd className="text-[clamp(36px,4.4vw,64px)] font-light leading-none tracking-[-0.04em] text-ink tabular" data-count>{f.value}</dd>
              <dt className="mt-3 text-[13px] text-ink-muted">{f.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-12 flex flex-col justify-between gap-6 md:mt-16 md:flex-row md:items-end">
          <div>
            <span className="pill">{h.ways.label}</span>
            <h2 data-reveal="text" className="mt-6 max-w-[16ch] text-display-l text-ink">{h.ways.title}</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {h.ways.items.map((w, i) => {
            const img = wayImages[w.k as keyof typeof wayImages];
            return (
              <Link key={w.k} href={w.href} data-cursor="Voir" className="group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-elevated md:aspect-[3/4]">
                {img ? (
                  <Image src={img} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" quality={75} className="grade object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                ) : (
                  <Image src={media.topLight.src} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" quality={75} className="grade object-cover opacity-80 transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                )}
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,2,0.25),rgba(2,2,2,0.1)_35%,rgba(2,2,2,0.92))]" />
                <span className="absolute left-5 top-5 text-[13px] tabular text-ink-2">0{i + 1}</span>
                <span className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-ink/10 text-ink backdrop-blur-md transition-colors group-hover:bg-white-50 group-hover:text-black-1000"><Arrow /></span>
                <div className="absolute inset-x-5 bottom-6">
                  <h3 className="text-[clamp(28px,2.6vw,40px)] font-light tracking-[-0.03em] text-ink">{w.title}</h3>
                  <p className="mt-3 max-w-[36ch] text-[14px] leading-relaxed text-ink-2">{w.body}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Sélection build slots */}
      <section className="panel px-5 py-14 md:px-10 md:py-20 xl:px-14">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="pill">{h.selection.label}</span>
            <h2 data-reveal="text" className="mt-6 text-display-l text-ink">{h.selection.title}</h2>
          </div>
          <ButtonLink href="/automobiles?categorie=build-slot" variant="glass" arrow>{h.selection.cta}</ButtonLink>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((c) => (
            <div key={c.slug} data-reveal="fade"><CarCard car={c} badge="build-slot" /></div>
          ))}
        </div>
      </section>

      {/* Marques */}
      <section className="panel py-6 md:py-8" aria-label="Marques">
        <Marquee words={getBrands()} />
      </section>

      {/* Registre off-market */}
      <section className="panel px-5 py-14 md:px-10 md:py-20 xl:px-14">
        <div className="grid gap-10 xl:grid-cols-[1fr_2fr] xl:gap-16">
          <div>
            <span className="pill pill-red">{h.registry.label}</span>
            <h2 data-reveal="text" className="mt-6 max-w-[12ch] text-display-l text-ink">{h.registry.title}</h2>
            <p data-reveal="fade" className="mt-6 max-w-[40ch] text-body-l text-ink-2">{h.registry.body}</p>
            <div className="mt-8"><ButtonLink href="/automobiles?categorie=off-market" variant="red" arrow data-magnetic>{h.registry.cta}</ButtonLink></div>
          </div>
          <ul className="border-b border-line">
            {iconic.map((c, i) => <RegistryRow key={c.slug} car={c} index={i} />)}
          </ul>
        </div>
      </section>

      {/* Immobilier */}
      <section className="panel min-h-[78svh]">
        <div className="absolute inset-0 -z-10" data-parallax="4">
          <Image src={media.rearThreeQuarter.src} alt="" fill sizes="100vw" quality={75} className="grade object-cover object-right" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,2,2,0.92)_25%,rgba(2,2,2,0.2))]" />
        </div>
        <div className="flex min-h-[78svh] items-end px-5 py-14 md:px-10 md:py-20 xl:px-14">
          <div className="max-w-[560px]">
            <span className="pill">{h.estate.label}</span>
            <h2 data-reveal="text" className="mt-6 text-display-l text-ink">{h.estate.title}</h2>
            <p data-reveal="fade" className="mt-6 text-body-l text-ink-2">{h.estate.body}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {t.estate.types.map((x) => <span key={x.title} className="pill">{x.title}</span>)}
            </div>
            <div className="mt-8"><ButtonLink href="/immobilier" arrow data-magnetic>{h.estate.cta}</ButtonLink></div>
          </div>
        </div>
      </section>

      <Process />

      <ContactPanel id="contact" />
    </>
  );
}
