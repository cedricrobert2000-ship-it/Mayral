import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'accent' | 'red' | 'glass' | 'ghost';
const base =
  'group relative inline-flex h-12 md:h-[52px] items-center justify-center gap-3 overflow-hidden rounded-pill px-7 text-[14px] font-medium tracking-[0.01em] whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';
const variants: Record<Variant, string> = {
  primary: 'bg-white-50 text-black-1000 hover:bg-ash-200',
  secondary: 'border border-line-strong text-ink hover:border-ink/60 hover:bg-ink/5',
  accent: 'bg-accent text-white-50 hover:bg-accent-hover',
  red: 'btn-red',
  glass: 'pill !h-12 md:!h-[52px] !px-7 !text-[14px] hover:bg-ink/15',
  ghost: 'px-0 h-auto md:h-auto text-ink hover:text-ink-2',
};

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span className="relative">{children}</span>
      {arrow && (
        <svg aria-hidden viewBox="0 0 16 16" className="relative size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1">
          <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )}
    </>
  );
}

type Common = { variant?: Variant; arrow?: boolean; className?: string; children: ReactNode };

export function ButtonLink({ variant = 'primary', arrow, className = '', children, ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function Button({ variant = 'primary', arrow, className = '', children, ...rest }: Common & ComponentProps<'button'>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
