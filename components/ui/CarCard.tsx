import Image from 'next/image';
import Link from 'next/link';
import { Monogram } from '@/components/ui/Logo';
import { type Car } from '@/lib/cars';
import { t } from '@/lib/i18n';

/** Carte véhicule : photo pour les build slots, carte typographique « sans photo » pour l'off-market. */
export function CarCard({ car: c, sizes = '(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw', priority, badge }: { car: Car; sizes?: string; priority?: boolean; badge?: 'off-market' | 'build-slot' }) {
  const om = badge ? badge === 'off-market' : c.offMarket;
  const photo = c.image;
  return (
    <Link href={`/automobiles/${c.slug}`} data-cursor="Voir" className="group relative block overflow-hidden rounded-[20px] bg-elevated">
      <div className="relative aspect-[4/5] sm:aspect-[5/6]">
        {photo ? (
          <>
            <Image src={c.image!} alt={`${c.brand} ${c.model}`} fill sizes={sizes} quality={78} priority={priority} className="grade object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,2,0.35)_0%,rgba(2,2,2,0)_30%,rgba(2,2,2,0.2)_55%,rgba(2,2,2,0.92)_100%)]" />
          </>
        ) : (
          <>
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(143,20,28,0.45),transparent_70%)] transition-opacity duration-700 group-hover:opacity-150" />
            <Monogram className="absolute left-1/2 top-[42%] w-[46%] -translate-x-1/2 -translate-y-1/2 text-ink/[0.05] transition-colors duration-700 group-hover:text-ink/[0.09]" />
          </>
        )}
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <span className={`pill ${om ? 'pill-red' : ''}`}>{om ? t.cars.offMarketBadge : t.cars.buildSlotBadge}</span>
          <span className="flex size-9 items-center justify-center rounded-full bg-ink/10 text-ink backdrop-blur-md transition-colors duration-300 group-hover:bg-white-50 group-hover:text-black-1000">
            <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 -rotate-45"><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          </span>
        </div>
        <div className="absolute inset-x-5 bottom-5">
          <p className="text-[13px] text-ink-2">{c.brand}</p>
          <h3 className="mt-1 text-[clamp(22px,2vw,30px)] font-normal leading-[1.1] tracking-[-0.02em] text-ink">{c.model}</h3>
          <dl className="mt-4 flex gap-5 border-t border-ink/15 pt-3 text-[13px]">
            {c.specs.power && <div><dt className="sr-only">Puissance</dt><dd className="tabular text-ink">{c.specs.power}</dd></div>}
            {c.specs.accel && <div><dt className="sr-only">0–100</dt><dd className="tabular text-ink">{c.specs.accel} <span className="text-ink-muted">0–100</span></dd></div>}
            {!c.specs.power && !c.specs.accel && <div><dt className="sr-only">Prix</dt><dd className="text-ink-muted">{t.cars.onRequest}</dd></div>}
          </dl>
        </div>
      </div>
    </Link>
  );
}
