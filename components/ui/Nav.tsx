'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { t } from '@/lib/i18n';
import { getLenis } from '@/components/motion/MotionProvider';

const autoLinks = [
  ['/automobiles?categorie=off-market', t.nav.offMarket, 'Registre privé, sans photo'],
  ['/automobiles?categorie=build-slot', t.nav.buildSlots, 'Places de production'],
  ['/automobiles', t.nav.allCars, 'Toutes les marques'],
] as const;
const mainLinks = [
  ['/immobilier', t.nav.immobilier],
  ['/services', t.nav.services],
  ['/vendre', t.nav.sell],
  ['/a-propos', t.nav.about],
] as const;

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const subRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); setSub(false); }, [pathname]);
  useEffect(() => {
    const l = getLenis();
    if (open) { l?.stop(); document.body.style.overflow = 'hidden'; } else { l?.start(); document.body.style.overflow = ''; }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setSub(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  useEffect(() => {
    if (!sub) return;
    const onDown = (e: PointerEvent) => { if (!subRef.current?.contains(e.target as Node)) setSub(false); };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [sub]);

  const active = (href: string) => pathname.startsWith(href.split('?')[0]);
  const linkCls = (href: string) => `relative rounded-full px-3.5 py-2 transition-colors duration-200 hover:bg-ink/10 hover:text-ink ${active(href) ? 'text-ink' : 'text-ink-2'}`;

  return (
    <>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-pill focus:bg-white-50 focus:px-4 focus:py-2 focus:text-black-1000">{t.nav.skip}</a>
      <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 md:px-3 md:pt-3">
        <nav
          aria-label="Principale"
          className={`mx-auto grid h-16 grid-cols-[1fr_auto] items-center rounded-[18px] px-4 transition-[background-color,backdrop-filter,border-color] duration-500 lg:h-[68px] lg:grid-cols-[auto_1fr_auto] lg:px-6 border ${
            scrolled && !open ? 'border-ink/10 bg-canvas/55 backdrop-blur-2xl' : 'border-transparent bg-transparent'
          }`}
        >
          <Link href="/" aria-label="MAYRAL, accueil" className="relative z-10 w-fit">
            <Logo withSignature={false} className="h-[14px] w-auto text-ink lg:h-[16px]" />
          </Link>

          <ul className="hidden items-center justify-center gap-1 text-[13px] font-medium lg:flex">
            <li ref={subRef} className="relative" onMouseEnter={() => setSub(true)} onMouseLeave={() => setSub(false)}>
              <button type="button" aria-expanded={sub} aria-controls="sous-menu-auto" onClick={() => setSub((s) => !s)} className={`${linkCls('/automobiles')} inline-flex items-center gap-1.5`}>
                {t.nav.automobiles}
                <svg aria-hidden viewBox="0 0 10 6" className={`w-2 transition-transform duration-200 ${sub ? 'rotate-180' : ''}`}><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
              </button>
              <div id="sous-menu-auto" className={`absolute left-0 top-full pt-3 transition-[opacity,transform] duration-300 ease-out ${sub ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}>
                <ul className="glass min-w-72 p-2">
                  {autoLinks.map(([href, label, hint]) => (
                    <li key={href}>
                      <Link href={href} className="block rounded-[14px] px-4 py-3 transition-colors hover:bg-ink/8">
                        <span className="block text-[14px] text-ink">{label}</span>
                        <span className="block text-[12px] text-ink-muted">{hint}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {mainLinks.map(([href, label]) => (
              <li key={href}><Link href={href} className={linkCls(href)}>{label}</Link></li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-2">
            <a href={t.contactInfo.phoneHref} className="hidden px-3 text-[13px] font-medium text-ink-2 tabular transition-colors hover:text-ink xl:block">{t.contactInfo.phone}</a>
            <Link href="/contact" className="btn-red hidden h-10 items-center rounded-full px-5 text-[13px] font-medium lg:inline-flex">{t.nav.inquire}</Link>
            <button type="button" className="relative z-10 -mr-1 flex h-11 items-center gap-3 px-2 lg:hidden" aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen((o) => !o)}>
              <span className="label text-ink">{open ? t.nav.close : t.nav.menu}</span>
              <span aria-hidden className="relative block h-2.5 w-6">
                <span className={`absolute left-0 h-px w-full bg-ink transition-transform duration-300 ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px w-full bg-ink transition-transform duration-300 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="menu-mobile"
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-canvas transition-[clip-path] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] lg:hidden ${open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(143,20,28,0.4),transparent_70%)]" />
        <ul className="relative mt-24 flex flex-col px-5">
          {[['/automobiles', t.nav.automobiles], ...mainLinks, ['/contact', t.nav.contact]].map(([href, label], i) => (
            <li key={href} className="overflow-hidden border-b border-line">
              <Link href={href} className={`block py-3.5 text-[32px] font-light tracking-[-0.03em] text-ink transition-transform duration-700 ease-out ${open ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: open ? `${120 + i * 50}ms` : '0ms' }}>{label}</Link>
            </li>
          ))}
        </ul>
        <div className="relative mt-6 flex flex-wrap gap-2 px-5">
          <Link href="/automobiles?categorie=off-market" className="pill">{t.nav.offMarket}</Link>
          <Link href="/automobiles?categorie=build-slot" className="pill">{t.nav.buildSlots}</Link>
        </div>
        <div className="relative mt-auto flex items-end justify-between gap-4 px-5 pb-8 pt-10">
          <a href={t.contactInfo.phoneHref} className="text-ink tabular">{t.contactInfo.phone}</a>
          <a href={t.contactInfo.whatsapp} className="pill" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
    </>
  );
}
