'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type Lenis from 'lenis';
import { motion } from '@/lib/tokens';

// GSAP, ScrollTrigger, SplitText et Lenis sont chargés en différé : le hero et le loader
// s'animent en CSS pur, sans attendre le JavaScript (meilleur LCP).
let lenis: Lenis | null = null;
export const getLenis = () => lenis;

const EASE = 'expo.out'; // proche de motion.ease.out (cubic-bezier(0.16, 1, 0.3, 1))

const loadLibs = () =>
  Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/SplitText'), import('lenis')]).then(
    ([g, st, sp, l]) => {
      g.gsap.registerPlugin(st.ScrollTrigger, sp.SplitText);
      return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger, SplitText: sp.SplitText, Lenis: l.default };
    },
  );
type Libs = Awaited<ReturnType<typeof loadLibs>>;
let libsP: Promise<Libs> | null = null;
const libs = () => (libsP ??= loadLibs());

const motionOn = () => document.documentElement.classList.contains('js-motion');
const SCROLLED = ':not([data-trigger="load"])';

function animate({ gsap, SplitText }: Libs, scope: HTMLElement) {
  return gsap.context(() => {
    // Textes : apparition ligne par ligne derrière un masque
    scope.querySelectorAll<HTMLElement>(`[data-reveal="text"]${SCROLLED}`).forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: 'visible' });
          return gsap.from(self.lines, {
            yPercent: 115,
            duration: motion.slow * 0.8,
            ease: EASE,
            stagger: 0.09,
            delay: parseFloat(el.dataset.delay ?? '0'),
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        },
      });
    });

    // Images : révélation par clip-path, léger dézoom de l'image intérieure
    scope.querySelectorAll<HTMLElement>('[data-reveal="image"]').forEach((el) => {
      const inner = el.querySelector('img');
      const tl = gsap.timeline({ delay: parseFloat(el.dataset.delay ?? '0'), scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      tl.to(el, { clipPath: 'inset(0% 0 0 0)', duration: motion.slow, ease: 'expo.inOut' });
      if (inner) tl.from(inner, { scale: 1.18, duration: motion.slow * 1.4, ease: EASE }, 0);
    });

    // Éléments simples : fondu montant
    scope.querySelectorAll<HTMLElement>(`[data-reveal="fade"]${SCROLLED}`).forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: motion.base * 1.4,
        ease: EASE,
        delay: parseFloat(el.dataset.delay ?? '0'),
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    });

    // Parallaxe très faible (≤ 5 %)
    scope.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
      const amt = Math.min(parseFloat(el.dataset.parallax || '5'), 5);
      gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // Image qui s'ouvre au défilement (cadre → plein écran)
    scope.querySelectorAll<HTMLElement>('[data-expand]').forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(8% 7% 8% 7% round 8px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'center 55%', scrub: true } },
      );
    });

    // Lignes qui s'allument au défilement (ash-400 → white-50, contraste AA à tout instant)
    scope.querySelectorAll<HTMLElement>('[data-light]').forEach((el) => {
      gsap.fromTo(el, { color: '#8C8283' }, { color: '#F5F1EF', ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'top 52%', scrub: true } });
    });

    // Filets qui se tracent
    scope.querySelectorAll<HTMLElement>('[data-line]').forEach((el) => {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: motion.slow, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
  }, scope);
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Défilement fluide (Lenis), synchronisé avec le ticker GSAP
  useEffect(() => {
    if (!motionOn()) return;
    let cleanup = () => {};
    let dead = false;
    libs().then(({ gsap, ScrollTrigger, Lenis }) => {
      if (dead) return;
      lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), autoRaf: false });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a || a.getAttribute('href') === '#') return;
        const target = document.querySelector(a.getAttribute('href')!);
        if (target) { e.preventDefault(); lenis?.scrollTo(target as HTMLElement, { offset: -80 }); }
      };
      document.addEventListener('click', onClick);
      cleanup = () => { document.removeEventListener('click', onClick); gsap.ticker.remove(raf); lenis?.destroy(); lenis = null; };
    });
    return () => { dead = true; cleanup(); };
  }, []);

  // Animations au défilement, relancées à chaque changement de page
  useEffect(() => {
    if (!motionOn()) return;
    lenis?.scrollTo(0, { immediate: true });
    let ctx: { revert: () => void } | undefined;
    let dead = false;
    Promise.all([libs(), document.fonts.ready]).then(([l]) => {
      if (dead) return;
      ctx = animate(l, document.body);
      l.ScrollTrigger.refresh();
    });
    return () => { dead = true; ctx?.revert(); };
  }, [pathname]);

  return <>{children}</>;
}
