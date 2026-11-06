'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { t } from '@/lib/i18n';
import { getLenis } from '@/components/motion/MotionProvider';

const univers = ['maison', 'yacht', 'jet', 'conciergerie'] as const;

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

  // Menu mobile : bloque le défilement, Échap pour fermer
  useEffect(() => {
    const l = getLenis();
    if (open) { l?.stop(); document.body.style.overflow = 'hidden'; } else { l?.start(); document.body.style.overflow = ''; }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setSub(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Sous-menu Univers : fermeture au clic extérieur
  useEffect(() => {
    if (!sub) return;
    const onDown = (e: PointerEvent) => { if (!subRef.current?.contains(e.target as Node)) setSub(false); };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [sub]);

  const linkCls = (href: string) =>
    `relative py-2 transition-colors duration-200 hover:text-ink ${pathname.startsWith(href) ? 'text-ink' : 'text-ink-2'}`;

  return (
    <>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-pill focus:bg-white-50 focus:px-4 focus:py-2 focus:text-black-1000">
        {t.nav.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out border-b ${
          scrolled && !open ? 'bg-canvas/65 backdrop-blur-xl border-line' : 'bg-transparent border-transparent'
        }`}
      >
        <nav aria-label="Principale" className="shell grid h-[72px] grid-cols-[1fr_auto] items-center lg:h-20 lg:grid-cols-[1fr_auto_1fr]">
          <Link href="/" aria-label="MAYRAL, accueil" className="relative z-10 w-fit">
            <Logo withSignature={false} className="h-[15px] w-auto text-ink lg:h-[17px]" />
          </Link>

          <ul className="hidden items-center gap-9 text-[13px] font-medium tracking-[0.01em] lg:flex">
            <li><Link href="/collection" className={linkCls('/collection')}>{t.nav.collection}</Link></li>
            <li><Link href="/off-market" className={linkCls('/off-market')}>{t.nav.offMarket}</Link></li>
            <li ref={subRef} className="relative" onMouseEnter={() => setSub(true)} onMouseLeave={() => setSub(false)}>
              <button
                type="button"
                aria-expanded={sub}
                aria-controls="sous-menu-univers"
                onClick={() => setSub((s) => !s)}
                className={`${linkCls('/univers')} inline-flex items-center gap-1.5`}
              >
                {t.nav.univers}
                <svg aria-hidden viewBox="0 0 10 6" className={`w-2 transition-transform duration-200 ${sub ? 'rotate-180' : ''}`}>
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
              <div
                id="sous-menu-univers"
                className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-[opacity,transform] duration-300 ease-out ${
                  sub ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                }`}
              >
                <ul className="min-w-56 rounded-card border border-line bg-elevated/90 p-2 backdrop-blur-xl">
                  {univers.map((u) => (
                    <li key={u}>
                      <Link href={`/univers/${u}`} className="flex items-center justify-between rounded-[6px] px-4 py-3 text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink">
                        {t.univers[u].title}
                        <span className="label text-[10px] text-ink-muted">{t.univers.soon}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li><Link href="/contact" className={linkCls('/contact')}>{t.nav.contact}</Link></li>
          </ul>

          <div className="flex items-center justify-end gap-6">
            <a href={t.contactInfo.phoneHref} className="hidden text-[13px] font-medium text-ink-2 tabular transition-colors hover:text-ink lg:block">
              {t.contactInfo.phone}
            </a>
            <button
              type="button"
              className="relative z-10 -mr-2 flex h-11 items-center gap-3 px-2 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="label text-ink">{open ? t.nav.close : t.nav.menu}</span>
              <span aria-hidden className="relative block h-2.5 w-6">
                <span className={`absolute left-0 h-px w-full bg-ink transition-transform duration-300 ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px w-full bg-ink transition-transform duration-300 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Menu mobile plein écran */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-40 flex flex-col bg-canvas transition-[clip-path] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] lg:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(110,15,22,0.35),transparent_70%)]" />
        <ul className="shell relative mt-28 flex flex-col gap-1">
          {[
            ['/collection', t.nav.collection],
            ['/off-market', t.nav.offMarket],
            ['/contact', t.nav.contact],
          ].map(([href, label], i) => (
            <li key={href} className="overflow-hidden">
              <Link
                href={href}
                className={`block py-2 text-display-l font-light text-ink transition-transform duration-700 ease-out ${open ? 'translate-y-0' : 'translate-y-full'}`}
                style={{ transitionDelay: open ? `${150 + i * 60}ms` : '0ms' }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="shell relative mt-10">
          <p className="label mb-4 text-ink-muted">{t.nav.univers}</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
            {univers.map((u) => (
              <li key={u}>
                <Link href={`/univers/${u}`} className="text-heading font-light text-ink-2">{t.univers[u].title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="shell relative mt-auto flex items-end justify-between pb-10">
          <a href={t.contactInfo.phoneHref} className="text-ink tabular">{t.contactInfo.phone}</a>
          <a href={t.contactInfo.instagram} className="label text-ink-muted" target="_blank" rel="noopener noreferrer">{t.footer.follow}</a>
        </div>
      </div>
    </>
  );
}
