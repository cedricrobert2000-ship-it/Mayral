import { t } from '@/lib/i18n';

/** Méthode en 4 étapes (reprise de la page contact d'origine, condensée). */
export function Process() {
  return (
    <section className="panel px-5 py-14 md:px-10 md:py-20 xl:px-14">
      <span className="pill">{t.home.process.label}</span>
      <h2 data-reveal="text" className="mt-6 max-w-[18ch] text-display-l text-ink">{t.home.process.title}</h2>
      <ol className="mt-12 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {t.process.map((s, i) => (
          <li key={s.title} data-reveal="fade" data-delay={i * 0.08} className="relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-[20px] bg-elevated p-6">
            <span aria-hidden className="absolute -right-3 -top-6 text-[140px] font-light leading-none tracking-[-0.06em] text-ink/[0.04] tabular">{i + 1}</span>
            <span className="pill w-fit tabular">Étape {i + 1}</span>
            <div>
              <h3 className="text-heading text-ink">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{s.body}</p>
            </div>
            {i === 3 && <span aria-hidden className="light-line absolute inset-x-6 bottom-0" />}
          </li>
        ))}
      </ol>
    </section>
  );
}
