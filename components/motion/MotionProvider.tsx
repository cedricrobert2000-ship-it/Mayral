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
      gsap.fromTo(el, { color: '#8E8888' }, { color: '#FAF8F7', ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'top 52%', scrub: true } });
    });

    // Hero : au défilement, l'image s'enfonce dans le noir et le titre remonte
    scope.querySelectorAll<HTMLElement>('[data-hero]').forEach((hero) => {
      const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
      const m = hero.querySelector('[data-hero-media]');
      const c = hero.querySelector('[data-hero-content]');
      const f = hero.querySelector('[data-hero-fade]');
      if (m) gsap.to(m, { scale: 1.12, yPercent: 8, ease: 'none', scrollTrigger: st });
      if (c) gsap.to(c, { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '60% top' } });
      if (f) gsap.to(f, { opacity: 0.9, ease: 'none', scrollTrigger: st });
    });

    // Manifeste : les mots s'allument un à un
    scope.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
      gsap.to(el.querySelectorAll('.word'), {
        color: '#FAF8F7',
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
    });

    // Chiffres clés qui défilent (« 612 ch », « 3,4 s », « 2 800 km »)
    scope.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      const raw = el.textContent ?? '';
      const m = raw.match(/\d[\d\s\u202f\u00a0]*(?:,\d+)?/);
      if (!m) return;
      const num = parseFloat(m[0].replace(/[\s\u202f\u00a0]/g, '').replace(',', '.'));
      const dec = (m[0].split(',')[1] ?? '').length;
      const [pre, post] = [raw.slice(0, m.index), raw.slice((m.index ?? 0) + m[0].length)];
      const o = { v: 0 };
      gsap.to(o, {
        v: num,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: () => { el.textContent = pre + o.v.toLocaleString('fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + post; },
      });
    });

    // Grand logo du pied de page : les lettres montent une à une
    scope.querySelectorAll<HTMLElement>('[data-letters]').forEach((el) => {
      gsap.from(el.querySelectorAll('path'), {
        yPercent: 105,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: 'top 95%', once: true },
      });
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

  // Barre de progression (feu arrière) + boutons magnétiques
  useEffect(() => {
    if (!motionOn()) return;
    let dead = false;
    let off = () => {};
    libs().then(({ gsap, ScrollTrigger }) => {
      if (dead) return;
      const bar = document.querySelector<HTMLElement>('.progress');
      const st = bar
        ? ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }) })
        : null;
      const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
      const move = (e: PointerEvent) => {
        const el = (e.target as HTMLElement).closest<HTMLElement>('[data-magnetic]');
        document.querySelectorAll<HTMLElement>('[data-magnetic].is-mag').forEach((m) => {
          if (m !== el) { m.classList.remove('is-mag'); gsap.to(m, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' }); }
        });
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.classList.add('is-mag');
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.5, ease: 'power3.out' });
      };
      if (fine) window.addEventListener('pointermove', move, { passive: true });
      off = () => { st?.kill(); window.removeEventListener('pointermove', move); };
    });
    return () => { dead = true; off(); };
  }, []);

  // Rideau entre les pages : activé après le premier affichage
  useEffect(() => {
    if (!motionOn()) return;
    document.querySelectorAll('.curtain').forEach((c) => c.classList.add('done'));
    const id = requestAnimationFrame(() => document.documentElement.classList.add('navigated'));
    return () => cancelAnimationFrame(id);
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
