'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/** Curseur discret (desktop) : point en différence, s'agrandit sur les liens, « Voir » sur les visuels. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (!document.documentElement.classList.contains('js-motion')) return;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      el.classList.remove('is-hidden');
      const tgt = e.target as HTMLElement;
      const view = tgt.closest<HTMLElement>('[data-cursor]');
      const link = tgt.closest('a, button, label, [role=button], input, textarea');
      el.classList.toggle('is-view', !!view);
      el.classList.toggle('is-link', !view && !!link);
      if (view && label.current) label.current.textContent = view.dataset.cursor || 'Voir';
    };
    const leave = () => el.classList.add('is-hidden');
    const enter = () => el.classList.remove('is-hidden');
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    document.documentElement.addEventListener('pointerenter', enter);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.removeEventListener('pointerenter', enter);
    };
  }, []);

  useEffect(() => { ref.current?.classList.remove('is-view', 'is-link'); }, [pathname]);

  return (
    <div ref={ref} className="cursor is-hidden" aria-hidden>
      <span ref={label}>Voir</span>
    </div>
  );
}
