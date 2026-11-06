'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Calque masqué par un projecteur qui suit le pointeur (dérive lente sur mobile). */
export function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const section = el.closest('section') ?? el;
    let raf = 0, tx = 50, ty = 55, cx = 50, cy = 55, active = false;
    const loop = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      el.style.setProperty('--mx', `${cx}%`);
      el.style.setProperty('--my', `${cy}%`);
      raf = active ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      if (!active) { active = true; el.classList.add('is-tracking'); raf = requestAnimationFrame(loop); }
    };
    const leave = () => { active = false; el.classList.remove('is-tracking'); };
    section.addEventListener('pointermove', move as EventListener);
    section.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); section.removeEventListener('pointermove', move as EventListener); section.removeEventListener('pointerleave', leave); };
  }, []);
  return <div ref={ref} className={`spotlight ${className}`}>{children}</div>;
}
