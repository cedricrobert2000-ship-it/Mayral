import type { Metadata } from 'next';
import { PageIntro } from '@/components/sections/PageIntro';
import { ContactForm } from '@/components/ui/ContactForm';
import { RevealImage } from '@/components/ui/RevealImage';
import { media } from '@/lib/media';
import { t } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Contact', description: t.contactPage.body, alternates: { canonical: '/contact' } };

export default function ContactPage() {
  const c = t.contactInfo;
  return (
    <>
      <PageIntro label={t.contactPage.label} title={t.contactPage.title}>{t.contactPage.body}</PageIntro>
      <section className="shell grid-page gap-y-16 pb-[var(--section-y)]">
        <div className="col-span-4 md:col-span-8 xl:col-span-5">
          <RevealImage image={media.topLight} ratio="4/5" sizes="(min-width: 1280px) 40vw, 100vw" parallax />
        </div>
        <div className="col-span-4 md:col-span-6 xl:col-span-5 xl:col-start-8">
          <dl className="mb-14 grid grid-cols-2 gap-8 border-b border-line pb-12">
            <div><dt className="label text-ink-muted">{t.form.phone}</dt><dd className="mt-3"><a className="tabular text-ink hover:text-ink-2" href={c.phoneHref}>{c.phone}</a></dd></div>
            <div><dt className="label text-ink-muted">{t.form.email}</dt><dd className="mt-3"><a className="text-ink hover:text-ink-2" href={`mailto:${c.email}`}>{c.email}</a></dd></div>
            <div><dt className="label text-ink-muted">{t.footer.follow}</dt><dd className="mt-3"><a className="text-ink hover:text-ink-2" href={c.instagram} target="_blank" rel="noopener noreferrer">{c.instagramHandle}</a></dd></div>
            <div><dt className="label text-ink-muted">Rendez-vous</dt><dd className="mt-3 text-ink-2">{c.address}</dd></div>
          </dl>
          <ContactForm source="contact" />
        </div>
      </section>
    </>
  );
}
