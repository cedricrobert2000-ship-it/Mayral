import { z } from 'zod';
import data from '@/content/cars.json';

// Catalogue automobile. Repris du site amcarsfrance.com, traduit et dédoublonné.
// Ajouter / retirer un véhicule = éditer content/cars.json (aucun code à toucher).
const CarSchema = z.object({
  slug: z.string(),
  brand: z.string(),
  model: z.string(),
  offMarket: z.boolean(),
  buildSlot: z.boolean(),
  image: z.string().nullish().transform((v) => v ?? undefined),
  imageW: z.number().optional(),
  imageH: z.number().optional(),
  specs: z.object({
    power: z.string().optional(),
    accel: z.string().optional(),
    engine: z.string().optional(),
    seats: z.string().optional(),
    topSpeed: z.string().optional(),
    gearbox: z.string().optional(),
  }),
});
export type Car = z.infer<typeof CarSchema>;

const cars: Car[] = z.array(CarSchema).parse(data);

export type Category = 'off-market' | 'build-slot';
export const getCars = (cat?: Category) =>
  cat ? cars.filter((c) => (cat === 'off-market' ? c.offMarket : c.buildSlot)) : cars;
export const getCar = (slug: string) => cars.find((c) => c.slug === slug);
export const getBrands = () => [...new Set(cars.map((c) => c.brand))].sort();
export const carName = (c: Car) => `${c.brand} ${c.model}`;

/** Sélection mise en avant sur l'accueil (build slots avec photo). */
export const getFeaturedCars = () =>
  ['bugatti-tourbillon', 'ferrari-812-competizione-aperta', 'koenigsegg-jesko', 'aston-martin-valiant', 'rolls-royce-spectre', 'porsche-911-992-s-t']
    .map(getCar)
    .filter((c): c is Car => !!c);

/** Modèles off-market emblématiques (registre de l'accueil). */
export const getIconicOffMarket = () =>
  ['ferrari-f40', 'ferrari-laferrari-aperta', 'mclaren-f1', 'pagani-zonda-r', 'bugatti-chiron-super-sport-300', 'porsche-918-spyder', 'koenigsegg-cc850', 'ferrari-monza-sp2']
    .map(getCar)
    .filter((c): c is Car => !!c);

export const specList = (c: Car) =>
  [
    ['Puissance', c.specs.power],
    ['0–100 km/h', c.specs.accel],
    ['Moteur', c.specs.engine],
    ['Vitesse max.', c.specs.topSpeed],
    ['Transmission', c.specs.gearbox],
    ['Places', c.specs.seats],
  ].filter((x): x is [string, string] => !!x[1]);
