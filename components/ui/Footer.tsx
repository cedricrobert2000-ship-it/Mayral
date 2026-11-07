import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { t } from '@/lib/i18n';

const Social = ({ href, label, d }: { href: string; label: string; d: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex size-10 items-center justify-center rounded-full bg-ink/10 text-ink transition-colors hover:bg-ink/20">
    <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]" fill="currentColor"><path d={d} /></svg>
  </a>
);
const IG = 'M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM16.7 2H7.3A5.3 5.3 0 0 0 2 7.3v9.4A5.3 5.3 0 0 0 7.3 22h9.4a5.3 5.3 0 0 0 5.3-5.3V7.3A5.3 5.3 0 0 0 16.7 2Zm3.6 14.7a3.6 3.6 0 0 1-3.6 3.6H7.3a3.6 3.6 0 0 1-3.6-3.6V7.3a3.6 3.6 0 0 1 3.6-3.6h9.4a3.6 3.6 0 0 1 3.6 3.6Z';
const WA = 'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z';
const IN = 'M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2ZM8 19H5V9.5h3Zm-1.5-10.8a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5ZM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5S12.8 13 12.8 14.3V19h-3V9.5h2.8v1.3a3.1 3.1 0 0 1 2.8-1.5c3 0 3.6 2 3.6 4.6Z';

export function Footer() {
  const c = t.contactInfo;
  const year = new Date().getFullYear();
  return (
    <footer className="panel footer-red mb-2 md:mb-3">
      <div className="relative px-6 pt-10 pb-6 md:px-10 md:pt-14 xl:px-14">
        <Logo className="h-auto w-[180px] text-ink md:w-[220px]" />

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-2">
          <div>
            <span className="pill">{t.footer.contacts}</span>
            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <div>
                <a href={c.phoneHref} className="block text-[clamp(22px,2vw,28px)] font-medium tabular text-ink hover:opacity-80">{c.phone}</a>
                <p className="mt-1 text-[13px] text-ink/70">Français / English</p>
              </div>
              <div>
                <a href={`mailto:${c.email}`} className="block text-[clamp(22px,2vw,28px)] font-medium text-ink hover:opacity-80">{c.email}</a>
                <p className="mt-1 text-[13px] text-ink/70">{c.hours}</p>
              </div>
            </div>
            <div className="mt-7 flex gap-2">
              <Social href={c.instagram} label="Instagram" d={IG} />
              <Social href={c.whatsapp} label="WhatsApp" d={WA} />
              <Social href={c.linkedin} label="LinkedIn" d={IN} />
            </div>
          </div>
          <div>
            <span className="pill">{t.footer.address}</span>
            <p className="mt-7 text-[clamp(22px,2vw,28px)] font-medium leading-snug text-ink">{c.address[0]},<br />{c.address[1]}</p>
            <nav aria-label="Pied de page" className="mt-8 grid grid-cols-2 gap-y-2 text-[13px] text-ink/75 md:max-w-sm">
              <Link className="hover:text-ink" href="/automobiles">{t.nav.automobiles}</Link>
              <Link className="hover:text-ink" href="/immobilier">{t.nav.immobilier}</Link>
              <Link className="hover:text-ink" href="/services">{t.nav.services}</Link>
              <Link className="hover:text-ink" href="/vendre">{t.nav.sell}</Link>
              <Link className="hover:text-ink" href="/a-propos">{t.nav.about}</Link>
              <Link className="hover:text-ink" href="/contact">{t.nav.contact}</Link>
            </nav>
            <div className="mt-8 space-y-1 text-[12px] text-ink/55">
              <p>{year} © MAYRAL — {t.brand.signature}. {t.footer.rights}</p>
              <p><Link className="hover:text-ink" href="/mentions-legales">{t.footer.legal}</Link> · <Link className="hover:text-ink" href="/confidentialite">{t.footer.privacy}</Link></p>
              <p>{c.legal}</p>
            </div>
          </div>
        </div>

        <div aria-hidden data-letters className="watermark mt-14 -mb-3 overflow-hidden text-[clamp(34px,7.6vw,150px)] md:mt-20">
          MAYRAL PRIVATE OFFICE
        </div>
      </div>
    </footer>
  );
}
