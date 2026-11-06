'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Media } from '@/lib/media';
import { t } from '@/lib/i18n';
import { getLenis } from '@/components/motion/MotionProvider';

/** Galerie plein écran : défilement horizontal (swipe natif en mobile) + lightbox clavier. */
export function Gallery({ images, title }: { images: Media[]; title: string }) {
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  // Index courant d'après la position du rail
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { root: el, threshold: 0.6 },
    );
    el.querySelectorAll('[data-i]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const i = Math.max(0, Math.min(images.length - 1, active + dir));
    (el.children[i] as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  const show = (i: number) => { setOpen(i); dialog.current?.showModal(); getLenis()?.stop(); };
  const hide = useCallback(() => { dialog.current?.close(); }, []);
  const step = useCallback((d: 1 | -1) => setOpen((o) => (o === null ? o : (o + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => { setOpen(null); getLenis()?.start(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    d.addEventListener('close', onClose);
    d.addEventListener('keydown', onKey);
    return () => { d.removeEventListener('close', onClose); d.removeEventListener('keydown', onKey); };
  }, [step]);

  // Swipe dans la lightbox
  const touchX = useRef(0);

  return (
    <div>
      <div className="shell mb-8 flex items-end justify-between">
        <p className="label text-ink-muted">
          {t.vehicle.gallery} <span className="ml-3 text-ink tabular">{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        </p>
        <div className="hidden gap-2 md:flex">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(d)}
              disabled={d === -1 ? active === 0 : active === images.length - 1}
              aria-label={d === -1 ? t.vehicle.prev : t.vehicle.next}
              className="flex size-12 items-center justify-center rounded-pill border border-line-strong text-ink transition-colors hover:bg-ink/5 disabled:opacity-30"
            >
              <svg aria-hidden viewBox="0 0 16 16" className={`size-3.5 ${d === -1 ? 'rotate-180' : ''}`}><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </button>
          ))}
        </div>
      </div>

      <div
        ref={track}
        data-lenis-prevent-wheel
        className="flex snap-x snap-mandatory gap-[var(--gutter)] overflow-x-auto overscroll-x-contain px-[var(--page-margin)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollPaddingInline: 'var(--page-margin)' }}
      >
        {images.map((img, i) => (
          <figure key={i} data-i={i} className="w-[86vw] shrink-0 snap-start md:w-[72vw] xl:w-[64vw]">
            <button
              type="button"
              onClick={() => show(i)}
              className="group relative block w-full overflow-hidden rounded-card bg-elevated"
              style={{ aspectRatio: '16/10' }}
              aria-label={`${t.vehicle.open} ${i + 1}`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1280px) 64vw, (min-width: 768px) 72vw, 86vw" quality={80} className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]" />
            </button>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialog}
        aria-label={`${t.vehicle.gallery} — ${title}`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-canvas/95 p-0 text-ink backdrop:bg-canvas/80 backdrop:backdrop-blur-sm open:flex open:flex-col"
        onClick={(e) => { if (e.target === e.currentTarget) hide(); }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); }}
      >
        <div className="shell flex h-[72px] shrink-0 items-center justify-between">
          <p className="label text-ink-muted tabular">{open !== null && `${String(open + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`}</p>
          <button type="button" onClick={hide} className="label flex h-11 items-center gap-3 text-ink" autoFocus>
            {t.vehicle.close}
            <span aria-hidden className="relative block size-4"><span className="absolute top-1/2 h-px w-full rotate-45 bg-ink" /><span className="absolute top-1/2 h-px w-full -rotate-45 bg-ink" /></span>
          </button>
        </div>
        <div className="relative min-h-0 flex-1" onClick={(e) => { if (e.target === e.currentTarget) hide(); }}>
          {open !== null && (
            <Image key={open} src={images[open].src} alt={images[open].alt} fill sizes="100vw" quality={90} className="animate-[fade_.5s_ease-out] object-contain p-4 md:p-10" />
          )}
        </div>
        <div className="shell flex h-20 shrink-0 items-center justify-center gap-2">
          <button type="button" onClick={() => step(-1)} aria-label={t.vehicle.prev} className="flex size-12 items-center justify-center rounded-pill border border-line-strong hover:bg-ink/5">
            <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 rotate-180"><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
          <button type="button" onClick={() => step(1)} aria-label={t.vehicle.next} className="flex size-12 items-center justify-center rounded-pill border border-line-strong hover:bg-ink/5">
            <svg aria-hidden viewBox="0 0 16 16" className="size-3.5"><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
        </div>
      </dialog>
    </div>
  );
}
