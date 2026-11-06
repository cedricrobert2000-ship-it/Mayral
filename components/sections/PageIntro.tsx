import type { ReactNode } from 'react';
import { Label } from '@/components/ui/Label';

/** En-tête de page sobre (pages sans hero image). */
export function PageIntro({ label, title, children, aside }: { label: string; title: string; children?: ReactNode; aside?: ReactNode }) {
  return (
    <header className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24">
      <div aria-hidden className="halo pointer-events-none absolute inset-0 !opacity-100 [background:radial-gradient(50%_70%_at_80%_0%,rgba(74,11,16,0.4),transparent_70%)]" />
      <div className="shell grid-page relative items-end gap-y-8">
        <div className="col-span-4 md:col-span-6 xl:col-span-8">
          <Label>{label}</Label>
          <h1 data-reveal="text" data-trigger="load" style={{ ['--d' as string]: '0.1s' }} className="mt-6 text-display-xl text-ink">{title}</h1>
          {children && <div data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.4s' }} className="mt-6 max-w-[48ch] text-body-l text-ink-2">{children}</div>}
        </div>
        {aside && <div data-reveal="fade" data-trigger="load" style={{ ['--d' as string]: '0.5s' }} className="col-span-4 md:col-span-2 xl:col-span-4 md:text-right">{aside}</div>}
      </div>
    </header>
  );
}
