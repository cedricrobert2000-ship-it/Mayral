// Logo MAYRAL — Direction 1 validée (wordmark dessiné sur grille, H=100, fût=24).
// Génère brand/logo/*, app/icon.svg, app/apple-icon.png et lib/logo-paths.ts.
import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = path.join(root, 'brand/logo');
fs.mkdirSync(out, { recursive: true });
const font = opentype.parse(
  fs.readFileSync(path.join(root, 'node_modules/@fontsource/unbounded/files/unbounded-latin-400-normal.woff')).buffer,
);

const G = {
  M: { w: 140, d: 'M0 100V0H28L70 50L112 0H140V100H116V38L70 92L24 38V100Z' },
  A: { w: 120, d: 'M0 100L46 0H74L120 100H94L60 24L26 100Z' },
  Y: { w: 120, d: 'M0 0H28L60 42L92 0H120L72 60V100H48V60Z' },
  R: { w: 116, d: 'M0 100V0H84A32 32 0 0 1 116 32V34A32 32 0 0 1 84 66H24V100ZM24 22V44H84A10 10 0 0 0 94 34V32A10 10 0 0 0 84 22Z M58 72H86L116 100H88Z' },
  L: { w: 96, d: 'M0 0H24V78H96V100H0Z' },
};
const GAP = 30;
const letters = [];
let x = 0;
for (const c of 'MAYRAL') { letters.push({ c, x, d: G[c].d }); x += G[c].w + GAP; }
const W = x - GAP; // 862

function textPath(str, size, tracking, cx, y) {
  const glyphs = font.stringToGlyphs(str);
  const adv = glyphs.map((g) => (g.advanceWidth * size) / font.unitsPerEm + tracking * size);
  const w = adv.reduce((a, b) => a + b, 0) - tracking * size;
  let gx = cx - w / 2, d = '';
  glyphs.forEach((g, i) => { d += g.getPath(gx, y, size).toPathData(2); gx += adv[i]; });
  return d;
}
const SUB = textPath('PRIVATE OFFICE', 15, 0.6, W / 2, 148);
const H = 160;

const C = { light: '#F5F1EF', dark: '#050304' };
const word = letters.map((l) => `<path transform="translate(${l.x} 0)" d="${l.d}"/>`).join('');
const svg = (vb, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

fs.writeFileSync(path.join(out, 'primary.svg'), svg(`0 0 ${W} ${H}`, `<g fill="${C.light}">${word}<path d="${SUB}"/></g>`, 'MAYRAL Private Office'));
fs.writeFileSync(path.join(out, 'dark.svg'), svg(`0 0 ${W} ${H}`, `<g fill="${C.dark}">${word}<path d="${SUB}"/></g>`, 'MAYRAL Private Office'));
fs.writeFileSync(path.join(out, 'wordmark.svg'), svg(`0 0 ${W} 100`, `<g fill="${C.light}">${word}</g>`, 'MAYRAL'));

// Monogramme : le M du wordmark, centré dans un carré
const M = (fill) => `<path fill="${fill}" d="${G.M.d}"/>`;
fs.writeFileSync(path.join(out, 'monogram.svg'), svg('-30 -50 200 200', M(C.light), 'MAYRAL'));

// Favicon : M blanc sur fond noir arrondi
const fav = svg('0 0 64 64', `<rect width="64" height="64" rx="12" fill="${C.dark}"/><g transform="translate(12 18.5) scale(.2857)">${M(C.light)}</g>`, 'MAYRAL');
fs.writeFileSync(path.join(out, 'favicon.svg'), fav);
fs.writeFileSync(path.join(root, 'app/icon.svg'), fav);

// Avatar Instagram 1080 : halo cramoisi bas, M dans la zone de sécurité circulaire (Ø ~ 60 %)
const avatar = svg('0 0 1080 1080', `
<defs><radialGradient id="h" cx="50%" cy="62%" r="58%"><stop offset="0" stop-color="#6E0F16" stop-opacity=".6"/><stop offset=".55" stop-color="#2A0709" stop-opacity=".4"/><stop offset="1" stop-color="#050304" stop-opacity="0"/></radialGradient></defs>
<rect width="1080" height="1080" fill="#050304"/><rect width="1080" height="1080" fill="url(#h)"/>
<g transform="translate(540 540) scale(3.2) translate(-70 -50)">${M(C.light)}</g>`, 'MAYRAL');
await sharp(Buffer.from(avatar)).png().toFile(path.join(out, 'instagram-avatar.png'));

const touch = svg('0 0 180 180', `<rect width="180" height="180" fill="${C.dark}"/><g transform="translate(90 90) scale(.78) translate(-70 -50)">${M(C.light)}</g>`, 'MAYRAL');
await sharp(Buffer.from(touch)).png().toFile(path.join(out, 'apple-touch-icon.png'));
fs.copyFileSync(path.join(out, 'apple-touch-icon.png'), path.join(root, 'app/apple-icon.png'));

// Chemins pour le composant React <Logo/>
fs.writeFileSync(
  path.join(root, 'lib/logo-paths.ts'),
  `// Généré par scripts/build-brand.mjs. Ne pas modifier à la main.
export const LOGO_W = ${W};
export const LOGO_H = ${H};
export const LOGO_LETTERS = ${JSON.stringify(letters.map(({ x, d }) => ({ x, d })))} as const;
export const LOGO_SUB = ${JSON.stringify(SUB)};
export const MONOGRAM = ${JSON.stringify(G.M.d)};
`,
);
console.log('brand → brand/logo, app/icon.svg, app/apple-icon.png, lib/logo-paths.ts');
