import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { t } from '@/lib/i18n';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(60%_100%_at_50%_100%,rgba(74,11,16,0.35),transparent_70%)]" />
      <div className="shell relative pt-20 pb-10 md:pt-28">
        <div className="grid-page gap-y-12">
          <div className="col-span-4 md:col-span-4 xl:col-span-5">
            <p className="text-display-m font-light text-ink">{t.brand.promise}</p>
          </div>
          <div className="col-span-2 md:col-span-2 xl:col-span-2 xl:col-start-7">
            <p className="label mb-5 text-ink-muted">{t.nav.contact}</p>
            <ul className="space-y-2 text-ink-2">
              <li><a className="tabular hover:text-ink" href={t.contactInfo.phoneHref}>{t.contactInfo.phone}</a></li>
              <li><a className="hover:text-ink" href={`mailto:${t.contactInfo.email}`}>{t.contactInfo.email}</a></li>
              <li className="text-ink-muted">{t.contactInfo.address}</li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2 xl:col-span-2">
            <p className="label mb-5 text-ink-muted">Navigation</p>
            <ul className="space-y-2 text-ink-2">
              <li><Link className="hover:text-ink" href="/collection">{t.nav.collection}</Link></li>
              <li><Link className="hover:text-ink" href="/off-market">{t.nav.offMarket}</Link></li>
              <li><a className="hover:text-ink" href={t.contactInfo.instagram} target="_blank" rel="noopener noreferrer">{t.footer.follow}</a></li>
            </ul>
          </div>
        </div>

        <div data-letters className="mt-24 md:mt-32"><Logo className="w-full text-ink" /></div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-[13px] text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>© {year} MAYRAL — {t.brand.signature}. {t.footer.rights}</p>
          <ul className="flex gap-6">
            <li><Link className="hover:text-ink" href="/mentions-legales">{t.footer.legal}</Link></li>
            <li><Link className="hover:text-ink" href="/confidentialite">{t.footer.privacy}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
