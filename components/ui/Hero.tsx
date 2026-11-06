import { getImageProps } from 'next/image';
import type { ReactNode } from 'react';
import { media, type Media } from '@/lib/media';

type Props = {
  image?: Media;
  /** Hero mobile : recadrage de l'image desktop, ou visuel vertical dédié. */
  mobile?: 'crop' | 'portrait';
  mobilePosition?: string;
  eyebrow?: ReactNode;
  /** Titre, une entrée par ligne (la 2e ligne est décalée, mise en page éditoriale). */
  title: string | string[];
  sub?: ReactNode;
  actions?: ReactNode;
  scrollLabel?: string;
  meta?: ReactNode;
};

export function Hero({ image = media.heroSilhouette, mobile = 'crop', mobilePosition = '30% 72%', eyebrow, title, sub, actions, scrollLabel, meta }: Props) {
  const common = { alt: image.alt, sizes: '100vw', quality: 90, priority: true } as const;
  const desktop = getImageProps({ ...common, src: image.src, width: image.width, height: image.height }).props;
  const portrait = media.topLight;
  const mob = getImageProps({
    ...common,
    ...(mobile === 'portrait'
      ? { src: portrait.src, width: portrait.width, height: portrait.height }
      : { src: image.src, width: image.width, height: image.height }),
  }).props;
  const lines = Array.isArray(title) ? title : [title];

  return (
    <section data-hero className="relative isolate flex h-svh min-h-[640px] items-end overflow-hidden bg-canvas">
      <div className="absolute inset-0 -z-10" data-hero-media>
        <div className="hero-zoom absolute inset-0">
          <picture>
            <source media="(max-width: 767px)" srcSet={mob.srcSet} sizes="100vw" />
            <img {...desktop} alt={image.alt} className="grade h-full w-full object-cover" style={{ objectPosition: 'var(--hero-pos, 50% 70%)' }} />
          </picture>
        </div>
        <style>{`@media (max-width: 767px){:root{--hero-pos:${mobile === 'portrait' ? '50% 40%' : mobilePosition}}}`}</style>
        <div className="halo absolute inset-0 mix-blend-screen" />
        <div className="vignette absolute inset-0" />
        <div className="absolute inset-0" style={{ background: 'var(--overlay-hero)' }} />
        {mobile === 'portrait' && <div className="absolute inset-0 bg-canvas/30 md:hidden" />}
        <div data-hero-fade className="absolute inset-0 bg-canvas opacity-0" />
      </div>

      <div className="shell relative w-full pb-8 md:pb-10" data-hero-content>
        {eyebrow && (
          <div data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.05s' }} className="mb-6 md:mb-8">
            {eyebrow}
          </div>
        )}
        <h1 className="text-display-xl text-ink">
          {lines.map((l, i) => (
            <span
              key={l}
              data-reveal="text"
              data-trigger="load"
              style={{ ['--d' as string]: `${0.12 + i * 0.12}s` }}
              className={`block ${i === 1 ? 'pl-[12vw] md:pl-[22%]' : ''}`}
            >
              {l}
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 border-t border-line pt-6 md:mt-14 md:grid-cols-[1fr_auto_1fr] md:items-center">
          {sub && (
            <p data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.5s' }} className="max-w-[38ch] text-body text-ink-2">
              {sub}
            </p>
          )}
          {scrollLabel ? (
            <div data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.8s' }} className="hidden flex-col items-center gap-3 md:flex">
              <span aria-hidden className="scroll-cue block h-10 w-px bg-line-strong" />
              <span className="label text-[10px] text-ink-muted">{scrollLabel}</span>
            </div>
          ) : <span className="hidden md:block" />}
          {(actions || meta) && (
            <div data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.65s' }} className="flex flex-wrap items-center gap-3 md:justify-end">
              {meta}
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
