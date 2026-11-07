'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CarCard } from '@/components/ui/CarCard';
import type { Car, Category } from '@/lib/cars';
import { t } from '@/lib/i18n';

type Filter = 'all' | Category;

export function CarsBrowser({ cars, brands }: { cars: Car[]; brands: string[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const initial = (params.get('categorie') as Filter) || 'all';
  const [cat, setCat] = useState<Filter>(['off-market', 'build-slot'].includes(initial) ? initial : 'all');
  const [brand, setBrand] = useState(params.get('marque') ?? '');

  useEffect(() => {
    const c = params.get('categorie') as Filter;
    setCat(c === 'off-market' || c === 'build-slot' ? c : 'all');
  }, [params]);

  const list = useMemo(
    () => cars.filter((c) => (cat === 'all' || (cat === 'off-market' ? c.offMarket : c.buildSlot)) && (!brand || c.brand === brand)),
    [cars, cat, brand],
  );

  const update = (next: Filter, b = brand) => {
    setCat(next);
    const q = new URLSearchParams();
    if (next !== 'all') q.set('categorie', next);
    if (b) q.set('marque', b);
    router.replace(`/automobiles${q.size ? `?${q}` : ''}`, { scroll: false });
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Catégorie" className="flex flex-wrap gap-2">
          {(['all', 'off-market', 'build-slot'] as const).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={cat === k}
              onClick={() => update(k)}
              className={`h-10 rounded-full px-5 text-[13px] font-medium transition-colors ${cat === k ? 'bg-white-50 text-black-1000' : 'bg-ink/8 text-ink hover:bg-ink/15'}`}
            >
              {t.cars.filters[k]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <label className="sr-only" htmlFor="marque">{t.cars.filters.brand}</label>
          <select id="marque" value={brand} onChange={(e) => { setBrand(e.target.value); update(cat, e.target.value); }} className="field !h-10 min-w-56 !text-[13px]">
            <option value="">{t.cars.filters.allBrands}</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <p aria-live="polite" className="shrink-0 text-[13px] text-ink-muted tabular">{t.cars.count(list.length)}</p>
        </div>
      </div>

      <ul className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {list.map((c, i) => (
          <li key={c.slug}><CarCard car={c} badge={cat === 'all' ? undefined : cat} priority={i < 3} sizes="(min-width: 1600px) 25vw, (min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" /></li>
        ))}
      </ul>
    </>
  );
}
