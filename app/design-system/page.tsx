import type { Metadata } from 'next';
import { PageIntro } from '@/components/sections/PageIntro';
import { Label } from '@/components/ui/Label';
import { Button, ButtonLink } from '@/components/ui/Button';
import { VehicleCard } from '@/components/ui/VehicleCard';
import { SpecTable } from '@/components/ui/SpecTable';
import { EditorialBlock } from '@/components/ui/EditorialBlock';
import { Gallery } from '@/components/ui/Gallery';
import { ContactForm } from '@/components/ui/ContactForm';
import { Logo } from '@/components/ui/Logo';
import { ReplayIntro } from '@/components/motion/ReplayIntro';
import { media } from '@/lib/media';
import { getVehicles } from '@/lib/vehicles';

export const metadata: Metadata = { title: 'Design system', robots: { index: false, follow: false } };

function Block({ id, index, title, note, children }: { id: string; index: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-line py-20 md:py-24">
      <div className="shell mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div><Label index={index}>Composant</Label><h2 className="mt-5 text-display-m text-ink">{title}</h2></div>
        {note && <p className="max-w-[52ch] text-spec text-ink-muted">{note}</p>}
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const v = getVehicles()[0];
  return (
    <>
      <PageIntro label="Interne · noindex" title="Design system.">
        Tous les composants de /components/ui, avec leurs états. Les captures 1440 px et 390 px servent de référence desktop et mobile.
      </PageIntro>

      <Block id="boutons" index="01" title="Boutons" note="Pilule 52 px (desktop) / 48 px (mobile). primary : white-50 · secondary : filet border.strong · accent : red-500, réservé aux formulaires.">
        <div className="shell grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-4">
          {(['Défaut', 'Survol', 'Focus', 'Désactivé'] as const).map((s) => (
            <div key={s} className="flex flex-col items-start gap-4 bg-surface p-8">
              <p className="label mb-2 text-ink-muted">{s}</p>
              {(['primary', 'secondary', 'accent'] as const).map((variant) => (
                <Button
                  key={variant}
                  variant={variant}
                  disabled={s === 'Désactivé'}
                  className={
                    s === 'Survol'
                      ? { primary: '!bg-ash-200', secondary: '!border-ink/60 !bg-ink/5', accent: '!bg-accent-hover' }[variant]
                      : s === 'Focus' ? 'outline-2 outline-offset-3 outline-focus' : ''
                  }
                >
                  {variant}
                </Button>
              ))}
              <ButtonLink href="#boutons" variant="ghost" arrow>Lien fléché</ButtonLink>
            </div>
          ))}
        </div>
      </Block>

      <Block id="navigation" index="02" title="Navigation" note="Transparente sur le hero, floutée au défilement (voir en haut de cette page). Sous-menu Univers au survol ou au clic. Menu plein écran sous 1024 px, Échap pour fermer.">
        <div className="shell"><div className="flex h-20 items-center justify-between rounded-card border border-line bg-canvas/65 px-8 backdrop-blur-xl"><Logo withSignature={false} className="h-4 w-auto" /><span className="label text-ink-muted">État « défilé »</span></div></div>
      </Block>

      {v && (
        <Block id="carte" index="03" title="Carte véhicule" note="Visuel 16:10 ou 4:5, nom, année, 3 caractéristiques, prix ou « Sur demande ». Survol : zoom lent + flèche inversée.">
          <div className="shell grid gap-[var(--gutter)] gap-y-16 xl:grid-cols-[2fr_1fr]">
            <VehicleCard vehicle={v} />
            <VehicleCard vehicle={{ ...v, status: 'reserved', cover: 'topLight' }} format="4/5" sizes="(min-width: 1280px) 33vw, 100vw" />
          </div>
        </Block>
      )}

      <Block id="galerie" index="04" title="Galerie" note="Rail horizontal à accrochage (swipe natif en mobile), flèches en desktop, lightbox plein écran : flèches clavier, Échap, swipe.">
        <Gallery images={[media.heroSilhouette, media.rearThreeQuarter, media.tailLight, media.topLight]} title="Démo" />
      </Block>

      {v && (
        <Block id="fiche" index="05" title="Fiche technique" note="type.spec, chiffres tabulaires.">
          <div className="shell"><SpecTable specs={v.specs} /></div>
        </Block>
      )}

      <Block id="editorial" index="06" title="Bloc éditorial" note="Image macro + texte, décalés sur la grille (12 / 8 / 4 colonnes).">
        <div className="shell">
          <EditorialBlock image={media.tailLight} label={<Label>Exemple</Label>} title="Une seule source de lumière.">
            <p>Le texte prend place dans le noir laissé par l’image. Jamais l’inverse.</p>
          </EditorialBlock>
        </div>
      </Block>

      <Block id="formulaire" index="07" title="Formulaire" note="Libellés flottants, radio en pilules, consentement RGPD, honeypot, validation zod côté serveur. Envoyer vide pour voir les états d’erreur.">
        <div className="shell grid gap-[var(--gutter)] xl:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-6 md:p-10"><ContactForm source="contact" /></div>
          <div className="rounded-card border border-line p-6 md:p-10" style={{ background: 'var(--overlay-side), url(/media/rear-three-quarter-1080.webp) center/cover' }}>
            <p className="label text-ink-muted">overlay.side</p>
          </div>
        </div>
      </Block>

      <Block id="loader" index="08" title="Loader & grain" note="Le logo se dessine en moins de 1,5 s, une fois par session. Grain SVG animé à 3,5 % d’opacité.">
        <div className="shell"><ReplayIntro /></div>
      </Block>
    </>
  );
}
