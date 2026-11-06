import type { ReactNode } from 'react';

export function Label({ children, className = '', index }: { children: ReactNode; className?: string; index?: string }) {
  return (
    <p className={`label flex items-center gap-3 text-ink-muted ${className}`}>
      {index && <span className="text-accent-hover tabular">{index}</span>}
      {index && <span aria-hidden className="h-px w-6 bg-line-strong" />}
      <span>{children}</span>
    </p>
  );
}
