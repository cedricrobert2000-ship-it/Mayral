import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/ui/Hero';
import { ButtonLink } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { RevealImage } from '@/components/ui/RevealImage';
import { Marquee } from '@/components/ui/Marquee';
import { Spotlight } from '@/components/motion/Spotlight';
import { FormOnImage } from '@/components/sections/FormOnImage';
import { media } from '@/lib/media';
import { formatPrice, getFeatured } from '@/lib/vehicles';
import { t } from '@/lib/i18n';

export default function Home() {
  const h = t.home;
  const v = getFeatured();

  return (
    <>
      <Hero
        mobile="portrait"
        eyebrow={
          <p className="label flex items-center gap-4 text-ink-2">
            <span>{h.hero.eyebrow}</span>
            {v && (
              <>
                <span aria-hidden className="hidden h-px w-8 bg-line-strong md:block" />
                <span className="hidden items-center gap-2.5 text-ink-muted md:flex">
                  <span aria-hidden className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(255,90,78,0.55)]" />
                  {h.hero.available} · {v.name}
                </span>
              </>
            )}
          </p>
        }
        title={[...h.hero.titleLines]}
        sub={h.hero.sub}
        scrollLabel={h.hero.scroll}
        actions={
          <>
            <ButtonLink href="/collection" data-magnetic>{h.hero.ctaPrimary}</ButtonLink>
            <ButtonLink href="#contact" variant="secondary" data-magnetic>{h.hero.ctaSecondary}</ButtonLink>
          </>
        }
      />

      {/* Manifeste : les mots s'allument au défilement */}
      <section className="section-y relative">
        <div className="shell">
          <Label index="01">{h.manifesto.label}</Label>
          <p data-words className="mt-12 max-w-[20ch] text-display-l text-ink md:mt-16">
            {h.manifesto.statement.split(' ').map((w, i) => (
              <span key={i} className="word">{w}&nbsp;</span>
            ))}
          </p>

          <div className="grid-page mt-20 items-end gap-y-12 md:mt-28">
            <div className="col-span-4 md:col-span-4 xl:col-span-4">
              <RevealImage image={media.tailLight} ratio="4/5" position="62% 50%" imgClassName="grade" className="sheen" sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" parallax />
            </div>
            <div className="col-span-4 md:col-span-4 xl:col-span-5 xl:col-start-7">
              <span data-line aria-hidden className="light-line mb-10 block w-24 origin-left" />
              <p data-reveal="fade" className="text-body-l text-ink-2">{h.manifesto.body}</p>
              <dl className="mt-12 grid grid-cols-3 border-t border-line">
                {h.pillars.map((p, i) => (
                  <div key={p} data-reveal="fade" data-delay={i * 0.1} className="border-r border-line pt-5 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4">
                    <dt className="label text-accent-hover tabular">0{i + 1}</dt>
                    <dd className="mt-3 text-heading font-light text-ink">{p}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <Marquee words={h.pillars} />

      {/* Véhicule à la une */}
      {v && (
        <section className="section-y relative">
          <div className="shell mb-12 flex items-end justify-between gap-6 md:mb-16">
            <div>
              <Label index="02">{h.featured.label}</Label>
              <h2 data-reveal="text" className="mt-6 text-display-l text-ink">{h.featured.title}</h2>
            </div>
            <Link href="/collection" className="label hidden shrink-0 text-ink-2 transition-colors hover:text-ink md:block">
              {t.nav.collection} →
            </Link>
          </div>

          <Link href={`/collection/${v.slug}`} className="group block" data-cursor="Voir">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/9] md:max-h-[94svh] md:w-full">
              <div data-expand className="absolute inset-0 overflow-hidden bg-elevated">
                <div className="absolute -inset-y-[6%] inset-x-0" data-parallax="5">
                  <Image src={media[v.hero].src} alt={media[v.hero].alt} fill sizes="100vw" quality={85} className="grade object-cover object-[30%_80%] transition-transform duration-[1800ms] ease-out group-hover:scale-[1.03] md:object-center" />
                </div>
                <div aria-hidden className="vignette absolute inset-0" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-canvas to-transparent" />
              </div>
            </div>
            <div className="shell mt-8 grid-page items-end gap-y-8 md:mt-12">
              <div className="col-span-4 md:col-span-4 xl:col-span-6">
                <p className="label text-ink-muted tabular">{v.year} · {formatPrice(v, t.collection.onRequest)}</p>
                <h3 data-reveal="text" className="mt-4 text-display-xl text-ink">{v.name}</h3>
              </div>
              <dl className="col-span-4 grid grid-cols-3 gap-6 border-t border-line-strong pt-5 md:col-span-4 xl:col-span-5 xl:col-start-8">
                {v.highlights.map((x) => (
                  <div key={x.label}>
                    <dt className="label text-[10px] text-ink-muted">{x.label}</dt>
                    <dd data-count className="mt-2 text-heading font-light text-ink tabular">{x.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Link>
        </section>
      )}

      {/* Off-market : la voiture n'apparaît que sous le projecteur */}
      <section className="relative isolate overflow-hidden border-y border-line">
        <div className="absolute inset-0 -z-10 bg-canvas">
          <Spotlight className="absolute inset-0">
            <Image src={media.heroSilhouette.src} alt="" fill sizes="100vw" quality={75} className="grade-deep object-cover object-[50%_70%]" />
          </Spotlight>
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(2,2,2,0.1),rgba(2,2,2,0.6))]" />
        </div>
        <div className="shell flex min-h-[100svh] flex-col items-center justify-center py-[var(--section-y)] text-center">
          <Label index="03">{h.offMarket.label}</Label>
          <h2 data-reveal="text" className="mt-8 max-w-[13ch] text-display-l text-ink md:text-display-xl">{h.offMarket.title}</h2>
          <p data-reveal="fade" className="mt-8 max-w-[40ch] text-body-l text-ink-2">{h.offMarket.body}</p>
          <div data-reveal="fade" className="mt-12">
            <ButtonLink href="/off-market" variant="secondary" arrow data-magnetic>{h.offMarket.cta}</ButtonLink>
          </div>
        </div>
      </section>

      <FormOnImage id="contact" label={<Label index="04">{h.contact.label}</Label>} title={h.contact.title} body={h.contact.body} source="home" />
    </>
  );
}
