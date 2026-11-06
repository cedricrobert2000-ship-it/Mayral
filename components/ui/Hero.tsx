import { getImageProps } from 'next/image';
import type { ReactNode } from 'react';
import { media, type Media } from '@/lib/media';

type Props = {
  image?: Media;
  /** Hero mobile : recadrage de l'image desktop, ou visuel vertical dédié. */
  mobile?: 'crop' | 'portrait';
  mobilePosition?: string;
  eyebrow?: ReactNode;
  title: string;
  sub?: ReactNode;
  actions?: ReactNode;
  scrollLabel?: string;
  align?: 'center' | 'bottom';
  height?: 'full' | 'tall';
};

export function Hero({
  image = media.heroSilhouette,
  mobile = 'crop',
  mobilePosition = '30% 72%',
  eyebrow,
  title,
  sub,
  actions,
  scrollLabel,
  align = 'center',
  height = 'full',
}: Props) {
  const common = { alt: image.alt, sizes: '100vw', quality: 90, priority: true } as const;
  const desktop = getImageProps({ ...common, src: image.src, width: image.width, height: image.height }).props;
  const portrait = media.topLight;
  const mob = getImageProps({
    ...common,
    ...(mobile === 'portrait'
      ? { src: portrait.src, width: portrait.width, height: portrait.height }
      : { src: image.src, width: image.width, height: image.height }),
  }).props;

  return (
    <section
      className={`relative isolate flex overflow-hidden ${height === 'full' ? 'h-svh min-h-[600px]' : 'h-[78svh] min-h-[520px]'} ${
        align === 'center' ? 'items-center' : 'items-end pb-24 md:pb-28'
      }`}
    >
      <div className="absolute inset-0 -z-10">
        <div className="hero-zoom absolute inset-0">
          <picture>
            <source media="(max-width: 767px)" srcSet={mob.srcSet} sizes="100vw" />
            <img
              {...desktop}
              alt={image.alt}
              className="h-full w-full object-cover"
              style={{ objectPosition: `var(--hero-pos, 50% 70%)` }}
            />
          </picture>
        </div>
        <style>{`@media (max-width: 767px){:root{--hero-pos:${mobile === 'portrait' ? '50% 50%' : mobilePosition}}}`}</style>
        <div className="halo absolute inset-0 mix-blend-screen" />
        <div className="absolute inset-0" style={{ background: 'var(--overlay-hero)' }} />
        {mobile === 'portrait' && <div className="absolute inset-0 bg-canvas/35 md:hidden" />}
      </div>

      <div className={`shell relative w-full ${align === 'center' ? 'text-center -mt-[12svh] md:-mt-[16svh]' : ''}`}>
        {eyebrow && (
          <div data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.1s' }} className={align === 'center' ? 'flex justify-center' : ''}>
            {eyebrow}
          </div>
        )}
        <h1
          data-reveal="text"
          data-trigger="load"
          data-delay="0.15"
          className={`mt-5 text-display-xl text-ink ${align === 'center' ? 'mx-auto max-w-[14ch]' : 'max-w-[16ch]'}`}
        >
          {title}
        </h1>
        {sub && (
          <p data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.55s' }} className={`mt-5 text-body-l text-ink-2 ${align === 'center' ? 'mx-auto max-w-[44ch]' : 'max-w-[44ch]'}`}>
            {sub}
          </p>
        )}
        {actions && (
          <div data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.75s' }} className={`mt-9 flex flex-wrap gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
            {actions}
          </div>
        )}
      </div>

      {scrollLabel && (
        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3" data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '1.1s' }}>
          <span className="label text-[10px] text-ink-muted">{scrollLabel}</span>
          <span aria-hidden className="scroll-cue block h-12 w-px bg-line-strong" />
        </div>
      )}
    </section>
  );
}
