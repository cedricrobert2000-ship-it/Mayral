// Convertit public/media/src/*.png en AVIF + WebP (640, 1080, 1600, 2400 px, plafonnés à la largeur source).
// Les sources actuelles font 1344 px : les tailles 1600/2400 seront produites après l'upscale 4K.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const src = path.join(root, 'public/media/src');
const out = path.join(root, 'public/media');
const SIZES = [640, 1080, 1600, 2400];

for (const file of fs.readdirSync(src).filter((f) => f.endsWith('.png'))) {
  const name = file.replace(/\.png$/, '');
  const img = sharp(path.join(src, file));
  const { width } = await img.metadata();
  const sizes = [...new Set([...SIZES.filter((s) => s < width), Math.min(width, 2400)])];
  for (const s of sizes) {
    const r = img.clone().resize({ width: s });
    await r.clone().avif({ quality: 55, effort: 6 }).toFile(path.join(out, `${name}-${s}.avif`));
    await r.clone().webp({ quality: 78 }).toFile(path.join(out, `${name}-${s}.webp`));
  }
  console.log(name, sizes.join(', '));
}
