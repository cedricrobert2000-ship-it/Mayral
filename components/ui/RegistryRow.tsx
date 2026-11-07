import Image from 'next/image';
import Link from 'next/link';
import type { Car } from '@/lib/cars';

/** Ligne du registre off-market (sans photo). */
export function RegistryRow({ car: c, index }: { car: Car; index: number }) {
  return (
    <li>
      <Link href={`/automobiles/${c.slug}`} data-cursor="Dossier" className="group grid grid-cols-[72px_1fr_auto] items-center gap-4 border-t border-line py-4 transition-colors hover:bg-ink/[0.03] md:grid-cols-[120px_1.3fr_1fr_1fr_auto] md:gap-6 md:px-2">
        <span className="relative block aspect-[4/3] overflow-hidden rounded-[10px] bg-elevated">
          {c.image ? <Image src={c.image} alt="" fill sizes="120px" quality={70} className="grade object-cover transition-transform duration-700 group-hover:scale-110" /> : <span className="absolute inset-0 flex items-center justify-center text-[11px] tabular text-ink-muted">{String(index + 1).padStart(2, '0')}</span>}
        </span>
        <span className="min-w-0">
          <span className="block text-[13px] text-ink-muted">{c.brand}</span>
          <span className="block truncate text-[clamp(20px,1.8vw,26px)] tracking-[-0.02em] text-ink transition-transform duration-500 ease-out group-hover:translate-x-1.5">{c.model}</span>
        </span>
        <span className="hidden text-[14px] text-ink-2 md:block">{c.specs.engine ?? '—'}</span>
        <span className="hidden text-[14px] tabular text-ink-2 md:block">{[c.specs.power, c.specs.accel && `${c.specs.accel} 0–100`].filter(Boolean).join(' · ') || '—'}</span>
        <span className="flex size-9 items-center justify-center rounded-full border border-line-strong text-ink transition-colors group-hover:border-transparent group-hover:bg-accent">
          <svg aria-hidden viewBox="0 0 16 16" className="size-3.5"><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        </span>
      </Link>
    </li>
  );
}
