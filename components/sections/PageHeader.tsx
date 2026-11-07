import type { ReactNode } from 'react';

/** En-tête de page en panneau, sans image. */
export function PageHeader({ label, title, children, aside }: { label: string; title: string; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="panel px-5 pb-14 pt-32 md:px-10 md:pb-20 md:pt-40 xl:px-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_85%_0%,rgba(143,20,28,0.35),transparent_70%)]" />
      <div className="flex flex-col justify-between gap-10 xl:flex-row xl:items-end">
        <div>
          <span className="pill">{label}</span>
          <h1 data-reveal="text" data-trigger="load" className="mt-6 max-w-[16ch] text-display-xl text-ink">{title}</h1>
          {children && <div data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.3s' }} className="mt-6 max-w-[56ch] text-body-l text-ink-2">{children}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}
