import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/ui/Hero';
import { ButtonLink } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { RevealImage } from '@/components/ui/RevealImage';
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
        eyebrow={<Label className="text-ink-2">{h.hero.eyebrow}</Label>}
        title={h.hero.title}
        sub={h.hero.sub}
        scrollLabel={h.hero.scroll}
        actions={
          <>
            <ButtonLink href="/collection">{h.hero.ctaPrimary}</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">{h.hero.ctaSecondary}</ButtonLink>
          </>
        }
      />

      {/* Manifeste */}
      <section className="section-y relative">
        <div className="shell grid-page items-end gap-y-16">
          <div className="col-span-4 md:col-span-8 xl:col-span-7">
            <Label index="01">{h.manifesto.label}</Label>
            <p className="mt-10 text-display-l text-ink">
              {h.manifesto.lines.map((l) => (
                <span key={l} data-light className="block">{l}</span>
              ))}
            </p>
            <span data-line aria-hidden className="light-line mt-14 block w-full max-w-[420px] origin-left" />
            <p data-reveal="fade" className="mt-10 max-w-[48ch] text-body-l text-ink-2">{h.manifesto.body}</p>
          </div>
          <div className="col-span-4 md:col-span-5 md:col-start-4 xl:col-span-4 xl:col-start-9">
            <RevealImage image={media.tailLight} ratio="4/5" position="62% 50%" sizes="(min-width: 1280px) 33vw, (min-width: 768px) 62vw, 100vw" parallax />
          </div>
        </div>
      </section>

      {/* Véhicule à la une */}
      {v && (
        <section className="relative pb-[var(--section-y)]">
          <div className="shell mb-10 flex items-end justify-between gap-6 md:mb-14">
            <div>
              <Label index="02">{h.featured.label}</Label>
              <h2 data-reveal="text" className="mt-6 text-display-l text-ink">{h.featured.title}</h2>
            </div>
            <Link href="/collection" className="label hidden shrink-0 text-ink-2 transition-colors hover:text-ink md:block">
              {t.nav.collection} →
            </Link>
          </div>

          <Link href={`/collection/${v.slug}`} className="group block">
            <div className="relative h-[64svh] min-h-[460px] overflow-hidden md:h-[88svh]">
              <div data-expand className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-y-[6%] inset-x-0" data-parallax="5">
                  <Image src={media[v.hero].src} alt={media[v.hero].alt} fill sizes="100vw" quality={85} className="object-cover object-[22%_70%] md:object-[35%_60%] transition-transform duration-[1600ms] ease-out group-hover:scale-[1.02]" />
                </div>
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,3,4,0.1)_40%,rgba(5,3,4,0.85))]" />
              </div>
              <div className="shell absolute inset-x-0 bottom-0 pb-8 md:pb-14">
                <div className="grid-page items-end gap-y-8">
                  <div className="col-span-4 md:col-span-5 xl:col-span-6">
                    <p className="label text-ink-2 tabular">{v.year}</p>
                    <h3 className="mt-3 text-display-xl text-ink">{v.name}</h3>
                  </div>
                  <dl className="col-span-4 grid grid-cols-3 gap-4 md:col-span-3 md:grid-cols-1 xl:col-span-4 xl:col-start-8 xl:grid-cols-3">
                    {v.highlights.map((x) => (
                      <div key={x.label} className="border-t border-line-strong pt-3">
                        <dt className="label text-[10px] text-ink-muted">{x.label}</dt>
                        <dd className="mt-2 text-spec text-ink tabular">{x.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="col-span-4 flex items-center justify-between gap-6 md:col-span-8 xl:col-span-2 xl:col-start-12 xl:flex-col xl:items-end">
                    <p className="text-ink tabular">{formatPrice(v, t.collection.onRequest)}</p>
                    <span className="flex size-14 items-center justify-center rounded-pill bg-white-50 text-black-1000 transition-transform duration-500 ease-out group-hover:scale-110">
                      <svg aria-hidden viewBox="0 0 16 16" className="size-4"><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Off-market */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -inset-y-[8%] inset-x-0" data-parallax="5">
            <Image src={media.topLight.src} alt="" fill sizes="100vw" quality={75} className="object-cover object-center opacity-40 blur-[2px] md:opacity-50" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(5,3,4,0.35),rgba(5,3,4,0.95))]" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-canvas to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-canvas to-transparent" />
        </div>
        <div className="shell flex min-h-[100svh] flex-col items-center justify-center py-[var(--section-y)] text-center">
          <Label index="03">{h.offMarket.label}</Label>
          <h2 data-reveal="text" className="mt-8 max-w-[14ch] text-display-l text-ink md:text-display-xl">{h.offMarket.title}</h2>
          <p data-reveal="fade" className="mt-6 max-w-[42ch] text-body-l text-ink-2">{h.offMarket.body}</p>
          <div data-reveal="fade" className="mt-10">
            <ButtonLink href="/off-market" variant="secondary" arrow>{h.offMarket.cta}</ButtonLink>
          </div>
        </div>
      </section>

      <FormOnImage
        id="contact"
        label={<Label index="04">{h.contact.label}</Label>}
        title={h.contact.title}
        body={h.contact.body}
        source="home"
      />
    </>
  );
}
