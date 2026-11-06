import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { media, type MediaKey } from '@/lib/media';

// Ajouter un véhicule = déposer un fichier JSON dans content/vehicles/. Aucun code à toucher.
const mediaKey = z.enum(Object.keys(media) as [MediaKey, ...MediaKey[]]);

const VehicleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  status: z.enum(['available', 'reserved', 'sold']).default('available'),
  featured: z.boolean().default(false),
  order: z.number().default(100),
  name: z.string(),
  subtitle: z.string().optional(),
  year: z.number(),
  price: z.number().nullable(),
  priceOnRequest: z.boolean().default(true),
  highlights: z.array(z.object({ label: z.string(), value: z.string() })).max(3),
  cover: mediaKey,
  hero: mediaKey,
  gallery: z.array(mediaKey),
  story: z.array(z.string()),
  specs: z.array(z.object({ group: z.string(), rows: z.array(z.object({ label: z.string(), value: z.string() })) })),
});
export type Vehicle = z.infer<typeof VehicleSchema>;

const dir = path.join(process.cwd(), 'content/vehicles');

let cache: Vehicle[] | null = null;
export function getVehicles(): Vehicle[] {
  if (cache && process.env.NODE_ENV === 'production') return cache;
  cache = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => VehicleSchema.parse(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))))
    .sort((a, b) => a.order - b.order);
  return cache;
}

export const getVehicle = (slug: string) => getVehicles().find((v) => v.slug === slug);
export const getFeatured = () => getVehicles().find((v) => v.featured) ?? getVehicles()[0];

export function formatPrice(v: Vehicle, onRequest: string) {
  if (v.priceOnRequest || v.price == null) return onRequest;
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v.price);
}
