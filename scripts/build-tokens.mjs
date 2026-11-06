// Génère, depuis tokens/tokens.json (source unique) :
//  - app/styles/tokens.css : variables CSS + thème Tailwind v4 (@theme)
//  - lib/tokens.ts         : valeurs de motion pour GSAP
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const tokens = JSON.parse(fs.readFileSync(path.join(root, 'tokens/tokens.json'), 'utf8'));

const get = (p) => p.split('.').reduce((o, k) => o?.[k], tokens);
const resolve = (v) =>
  typeof v === 'string' ? v.replace(/\{([^}]+)\}/g, (_, ref) => resolve(get(ref).$value)) : v;
const entries = (group) => Object.entries(group).filter(([k]) => !k.startsWith('$'));
const px = (n) => `${+n.toFixed(3)}px`;
// clamp() fluide entre 375 et 1440 px de viewport
const fluid = (min, max, a = 375, b = 1440) => {
  const slope = (max - min) / (b - a);
  return `clamp(${px(min)}, ${px(min - a * slope)} + ${+(slope * 100).toFixed(4)}vw, ${px(max)})`;
};

const L = [];
const theme = [];
const desktop = [];
const tablet = [];

// Couleurs
for (const [k, t] of entries(tokens.color.base)) {
  L.push(`--color-base-${k}: ${t.$value};`);
  theme.push(`--color-${k}: var(--color-base-${k});`);
}
const semanticAlias = {
  'bg-canvas': 'canvas', 'bg-surface': 'surface', 'bg-elevated': 'elevated', 'bg-tint': 'tint',
  'border-subtle': 'line', 'border-strong': 'line-strong',
  'text-primary': 'ink', 'text-secondary': 'ink-2', 'text-muted': 'ink-muted',
  'accent-default': 'accent', 'accent-hover': 'accent-hover', 'accent-glow': 'glow',
  'state-focus': 'focus', 'state-success': 'success', 'state-error': 'error',
};
for (const [k, t] of entries(tokens.color.semantic)) {
  L.push(`--${k}: ${resolve(t.$value)};`);
  theme.push(`--color-${semanticAlias[k]}: var(--${k});`);
}
for (const [k, t] of entries(tokens.gradient)) L.push(`--${k}: ${t.$value};`);

// Typo
for (const [k, t] of entries(tokens.font)) theme.push(`--font-${k}: ${t.$value};`);
for (const [k, t] of entries(tokens.type)) {
  const v = t.$value;
  theme.push(`--text-${k}: ${fluid(v.min, v.max)};`);
  theme.push(`--text-${k}--line-height: ${v.lhMin};`);
  theme.push(`--text-${k}--letter-spacing: ${v.tracking};`);
  theme.push(`--text-${k}--font-weight: ${v.weight};`);
  if (v.lhMin !== v.lhMax) desktop.push(`--text-${k}--line-height: ${v.lhMax};`);
}

// Rayons, breakpoints, easing
for (const [k, t] of entries(tokens.radius)) theme.push(`--radius-${k}: ${t.$value};`);
theme.push('--breakpoint-*: initial;');
for (const [k, t] of entries(tokens.breakpoint)) theme.push(`--breakpoint-${k}: ${t.$value};`);
const cb = (a) => `cubic-bezier(${a.join(', ')})`;
theme.push(`--ease-out: ${cb(tokens.motion['ease-out'].$value)};`);
theme.push(`--ease-inout: ${cb(tokens.motion['ease-inout'].$value)};`);
for (const k of ['fast', 'base', 'slow']) L.push(`--duration-${k}: ${tokens.motion['duration-' + k].$value};`);

// Espacement (référence ; Tailwind utilise --spacing: 4px)
theme.push('--spacing: 4px;');
for (const [k, t] of entries(tokens.space)) L.push(`--space-${k}: ${t.$value};`);

// Grille responsive
const lay = Object.fromEntries(entries(tokens.layout).map(([k, t]) => [k, t.$value]));
L.push(`--page-max: ${lay['max-width']};`, `--page-margin: ${lay['margin-mobile']};`, `--gutter: ${lay['gutter-mobile']};`, `--cols: 4;`, `--section-y: ${lay['section-mobile']};`);
tablet.push(`--page-margin: ${lay['margin-tablet']};`, `--gutter: ${lay['gutter-tablet']};`, `--cols: 8;`);
desktop.push(`--page-margin: ${lay['margin-desktop']};`, `--gutter: ${lay['gutter-desktop']};`, `--cols: 12;`, `--section-y: ${lay['section-desktop']};`);

const bp = (k) => tokens.breakpoint[k].$value;
const css = `/* Généré par scripts/build-tokens.mjs depuis tokens/tokens.json. Ne pas modifier à la main. */
:root {
  ${L.join('\n  ')}
}
@media (min-width: ${bp('md')}) {
  :root { ${tablet.join(' ')} }
}
@media (min-width: ${bp('xl')}) {
  :root { ${desktop.join(' ')} }
}
@theme {
  ${theme.join('\n  ')}
}
`;
fs.mkdirSync(path.join(root, 'app/styles'), { recursive: true });
fs.writeFileSync(path.join(root, 'app/styles/tokens.css'), css);

const ts = `// Généré par scripts/build-tokens.mjs. Ne pas modifier à la main.
export const motion = {
  easeOut: '${cb(tokens.motion['ease-out'].$value)}',
  easeInOut: '${cb(tokens.motion['ease-inout'].$value)}',
  fast: ${parseInt(tokens.motion['duration-fast'].$value) / 1000},
  base: ${parseInt(tokens.motion['duration-base'].$value) / 1000},
  slow: ${parseInt(tokens.motion['duration-slow'].$value) / 1000},
} as const;
export const breakpoints = ${JSON.stringify(Object.fromEntries(entries(tokens.breakpoint).map(([k, t]) => [k, parseInt(t.$value)])))} as const;
`;
fs.writeFileSync(path.join(root, 'lib/tokens.ts'), ts);
console.log('tokens → app/styles/tokens.css, lib/tokens.ts');
