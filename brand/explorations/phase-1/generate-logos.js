// Génère les 3 directions de logo MAYRAL (glyphes dessinés sur grille, H=100, fût=24)
const fs = require('fs'), path = require('path'), opentype = require('opentype.js');
const OUT = process.argv[2];
const F = n => path.join(__dirname, 'node_modules/@fontsource', n);
const unb = opentype.parse(fs.readFileSync(F('unbounded/files/unbounded-latin-400-normal.woff')));

const G = {
  M: { w: 140, d: 'M0 100V0H28L70 50L112 0H140V100H116V38L70 92L24 38V100Z' },
  A: { w: 120, d: 'M0 100L46 0H74L120 100H94L60 24L26 100Z' },
  Y: { w: 120, d: 'M0 0H28L60 42L92 0H120L72 60V100H48V60Z' },
  R: { w: 116, d: 'M0 100V0H84A32 32 0 0 1 116 32V34A32 32 0 0 1 84 66H24V100ZM24 22V44H84A10 10 0 0 0 94 34V32A10 10 0 0 0 84 22Z M58 72H86L116 100H88Z' },
  L: { w: 96, d: 'M0 0H24V78H96V100H0Z' },
};
function word(gap) {
  let x = 0, out = [];
  for (const c of 'MAYRAL') { out.push(`<path transform="translate(${x} 0)" d="${G[c].d}"/>`); x += G[c].w + gap; }
  return { svg: out.join(''), w: x - gap };
}
function textPath(str, size, tracking, cx, y) {
  // centre un texte en capitales avec tracking (em), contours vectorisés
  let w = 0; const glyphs = unb.stringToGlyphs(str);
  const adv = glyphs.map(g => g.advanceWidth * size / unb.unitsPerEm + tracking * size);
  w = adv.reduce((a, b) => a + b, 0) - tracking * size;
  let x = cx - w / 2, d = '';
  glyphs.forEach((g, i) => { d += g.getPath(x, y, size).toPathData(2); x += adv[i]; });
  return d;
}
const C = { light: '#F5F1EF', dark: '#050304', red: '#C81E24', glow: '#FF5A4E' };
const svg = (vb, body, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

// D1 — Wordmark large + PRIVATE OFFICE
{
  const W = word(30), pad = 0;
  const sub = textPath('PRIVATE OFFICE', 15, 0.6, W.w / 2, 148);
  for (const [k, col] of [['light', C.light], ['dark', C.dark]])
    fs.writeFileSync(`${OUT}/d1-wordmark-${k}.svg`, svg(`0 0 ${W.w} 160`, `<g fill="${col}">${W.svg}<path d="${sub}"/></g>`, 'MAYRAL Private Office'));
}
// D2 — Monogramme M : deux lignes de fuite + horizon
{
  const m = 'M2 100L10 0H36L70 46L104 0H130L138 100H114L109 34L70 86L31 34L26 100Z';
  const body = (col) => `<g fill="${col}"><path d="${m}"/><rect x="-46" y="85" width="40" height="2"/><rect x="146" y="85" width="40" height="2"/></g>`;
  fs.writeFileSync(`${OUT}/d2-monogram-light.svg`, svg('-50 -20 240 140', body(C.light), 'MAYRAL monogramme'));
  // Avatar Instagram (aperçu) : fond noir, halo cramoisi, zone de sécurité circulaire
  fs.writeFileSync(`${OUT}/d2-instagram-preview.svg`, svg('0 0 1080 1080', `
<defs><radialGradient id="h" cx="50%" cy="58%" r="55%"><stop offset="0" stop-color="#6E0F16" stop-opacity=".55"/><stop offset=".6" stop-color="#2A0709" stop-opacity=".35"/><stop offset="1" stop-color="#050304" stop-opacity="0"/></radialGradient></defs>
<rect width="1080" height="1080" fill="#050304"/><rect width="1080" height="1080" fill="url(#h)"/>
<g transform="translate(540 540) scale(3.1) translate(-70 -50)">${body(C.light)}</g>`, 'MAYRAL avatar'));
}
// D3 — Wordmark serré + filet « feu arrière »
{
  const W = word(12);
  const line = (id) => `<defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${C.red}" stop-opacity="0"/><stop offset=".22" stop-color="${C.red}"/><stop offset=".5" stop-color="${C.glow}"/><stop offset=".78" stop-color="${C.red}"/><stop offset="1" stop-color="${C.red}" stop-opacity="0"/></linearGradient><filter id="${id}b" x="-10%" y="-400%" width="120%" height="900%"><feGaussianBlur stdDeviation="3"/></filter></defs>
<rect x="0" y="124" width="${W.w}" height="6" fill="url(#${id})" filter="url(#${id}b)" opacity=".7"/><rect x="0" y="126" width="${W.w}" height="2" fill="url(#${id})"/>`;
  const sub = textPath('PRIVATE OFFICE', 13, 0.6, W.w / 2, 166);
  for (const [k, col] of [['light', C.light], ['dark', C.dark]])
    fs.writeFileSync(`${OUT}/d3-wordmark-signe-${k}.svg`, svg(`0 0 ${W.w} 176`, `${line('t' + k)}<g fill="${col}">${W.svg}<path d="${sub}"/></g>`, 'MAYRAL Private Office'));
}
console.log('ok');
