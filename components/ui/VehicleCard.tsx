import Link from 'next/link';
import Image from 'next/image';
import { media } from '@/lib/media';
import { formatPrice, type Vehicle } from '@/lib/vehicles';
import { t } from '@/lib/i18n';

type Props = { vehicle: Vehicle; format?: '4/5' | '16/10'; priority?: boolean; sizes?: string };

export function VehicleCard({ vehicle: v, format = '16/10', priority, sizes = '(min-width: 1280px) 50vw, 100vw' }: Props) {
  const img = media[v.cover];
  const status = v.status !== 'available' ? (v.status === 'reserved' ? 'Réservé' : 'Vendu') : null;
  return (
    <article className="group relative">
      <Link href={`/collection/${v.slug}`} className="block rounded-card focus-visible:outline-offset-8">
        <div data-reveal="image" className="relative overflow-hidden rounded-card bg-elevated" style={{ aspectRatio: format }}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={sizes}
            quality={80}
            priority={priority}
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
          />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(5,3,4,0.7))]" />
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between md:inset-x-7 md:bottom-7">
            <span className="label text-ink-2">{v.year}</span>
            <span className="flex size-11 items-center justify-center rounded-pill border border-line-strong text-ink backdrop-blur-md transition-colors duration-200 group-hover:bg-white-50 group-hover:text-black-1000">
              <svg aria-hidden viewBox="0 0 16 16" className="size-3.5"><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
            </span>
          </div>
          {status && <span className="label absolute left-5 top-5 rounded-pill bg-canvas/70 px-3 py-2 text-ink backdrop-blur-md">{status}</span>}
        </div>
        <div className="mt-6 flex items-baseline justify-between gap-6 border-b border-line pb-6">
          <h3 className="text-display-m text-ink">{v.name}</h3>
          <p className="shrink-0 text-ink-2 tabular">{formatPrice(v, t.collection.onRequest)}</p>
        </div>
      </Link>
      <dl className="mt-5 grid grid-cols-3 gap-4">
        {v.highlights.map((h) => (
          <div key={h.label}>
            <dt className="label text-[10px] text-ink-muted md:text-label">{h.label}</dt>
            <dd className="mt-2 text-spec text-ink tabular">{h.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
