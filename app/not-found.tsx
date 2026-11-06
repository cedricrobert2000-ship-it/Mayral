import { ButtonLink } from '@/components/ui/Button';
import { t } from '@/lib/i18n';

export default function NotFound() {
  return (
    <section className="shell flex min-h-svh flex-col items-center justify-center text-center">
      <p className="label text-accent-hover tabular">404</p>
      <h1 className="mt-6 max-w-[16ch] text-display-l text-ink">{t.notFound.title}</h1>
      <div className="mt-10"><ButtonLink href="/" variant="secondary">{t.notFound.cta}</ButtonLink></div>
    </section>
  );
}
