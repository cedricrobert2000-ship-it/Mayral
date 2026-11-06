import type { ReactNode } from 'react';
import { PageIntro } from '@/components/sections/PageIntro';

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageIntro label="Informations" title={title} />
      <article className="shell pb-[var(--section-y)]">
        <div className="max-w-[68ch] space-y-10 text-ink-2 [&_h2]:mb-3 [&_h2]:text-heading [&_h2]:text-ink [&_p]:mb-3">{children}</div>
      </article>
    </>
  );
}
