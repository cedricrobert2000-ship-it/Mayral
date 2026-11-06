import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { PageIntro } from '@/components/sections/PageIntro';
import { Label } from '@/components/ui/Label';
import { Logo, Monogram } from '@/components/ui/Logo';
import { t } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Brand', robots: { index: false, follow: false } };

type Tok = { $value: unknown; $description?: string };
const tokens = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tokens/tokens.json'), 'utf8'));
const entries = (o: Record<string, Tok>) => Object.entries(o).filter(([k]) => !k.startsWith('$')) as [string, Tok][];

function Section({ index, label, title, children }: { index: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="shell border-t border-line py-20 md:py-28">
      <Label index={index}>{label}</Label>
      <h2 className="mt-6 mb-12 text-display-m text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function BrandPage() {
  const base = entries(tokens.color.base);
  const semantic = entries(tokens.color.semantic);
  const types = entries(tokens.type) as [string, { $value: { min: number; max: number; weight: number; tracking: string } }][];
  return (
    <>
      <PageIntro label="Interne · noindex" title="Plateforme de marque.">{t.brand.promise} Discrétion, désir, précision.</PageIntro>

      <Section index="01" label="Logo" title="Wordmark dessiné, direction 1.">
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
          <div className="flex min-h-72 items-center justify-center bg-surface p-12"><Logo className="w-full max-w-[340px] text-ink" /></div>
          <div className="flex min-h-72 items-center justify-center bg-[#EDE8E5] p-12"><Logo className="w-full max-w-[340px] text-black-1000" /></div>
          <div className="flex min-h-72 items-center justify-center bg-surface p-12"><Monogram className="w-28 text-ink" /></div>
        </div>
        <ul className="mt-6 grid gap-2 text-spec text-ink-muted md:grid-cols-3">
          <li>primary.svg — clair sur fond sombre</li><li>dark.svg — facture, papeterie</li><li>monogram.svg · instagram-avatar.png · favicon.svg</li>
        </ul>
        <p className="mt-6 max-w-[64ch] text-ink-2">Zone de protection : la hauteur du M tout autour. Taille minimale : 72 px de large à l’écran, 18 mm à l’impression. Ne pas déformer, recolorer en rouge ni ajouter d’effet.</p>
      </Section>

      <Section index="02" label="Couleur" title="Noir profond, cramoisi sourd, une seule lumière.">
        <ul className="grid grid-cols-2 gap-[var(--gutter)] md:grid-cols-5">
          {base.map(([k, v]) => (
            <li key={k}>
              <div className="aspect-[4/3] rounded-card border border-line" style={{ background: v.$value as string }} />
              <p className="mt-3 text-spec text-ink">{k}</p>
              <p className="text-spec text-ink-muted tabular">{v.$value as string}</p>
            </li>
          ))}
        </ul>
        <h3 className="label mt-16 mb-6 text-ink-muted">Sémantique</h3>
        <ul className="grid gap-x-[var(--gutter)] md:grid-cols-3">
          {semantic.map(([k, v]) => (
            <li key={k} className="flex items-center gap-4 border-t border-line py-3 text-spec">
              <span className="size-5 shrink-0 rounded-full border border-line-strong" style={{ background: `var(--${k})` }} />
              <span className="text-ink">{k}</span>
              <span className="ml-auto truncate text-ink-muted">{String(v.$value)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[64ch] text-ink-2">Le rouge vif (red-500 et au-delà) ne couvre jamais plus d’environ 5 % d’un écran : bouton de formulaire, focus, un filet, un chiffre clé. Les fonds rouges viennent des images.</p>
      </Section>

      <Section index="03" label="Typographie" title="Manrope pour la voix, Unbounded pour la signature.">
        <div className="divide-y divide-line border-y border-line">
          {types.map(([k, v]) => (
            <div key={k} className="grid items-baseline gap-4 py-6 md:grid-cols-[220px_1fr]">
              <p className="text-spec text-ink-muted tabular">type.{k}<br />{v.$value.min}→{v.$value.max}px · {v.$value.weight}</p>
              <p className={`text-${k} ${k === 'label' ? 'label' : ''} text-ink`}>{k === 'spec' ? '612 ch · 3,4 s · 330 km/h' : 'La route commence ici.'}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section index="04" label="Motion" title="Presque imperceptible.">
        <ul className="grid gap-x-[var(--gutter)] text-spec md:grid-cols-2">
          {Object.entries(tokens.motion).map(([k, v]) => (
            <li key={k} className="flex justify-between border-t border-line py-3"><span className="text-ink">motion.{k}</span><span className="text-ink-muted tabular">{JSON.stringify((v as Tok).$value)}</span></li>
          ))}
        </ul>
        <p className="mt-8 max-w-[64ch] text-ink-2">Hero : zoom 1,04 → 1 en 2,5 s, puis halo qui respire (6–8 %, cycle de 8 s). Textes ligne par ligne sous masque, images par clip-path, Lenis, parallaxe ≤ 5 %. Tout est coupé avec prefers-reduced-motion.</p>
      </Section>
    </>
  );
}
