# MAYRAL — Private Office

Site de MAYRAL, vente automobile off-market. Brief complet : [`BRIEF.md`](./BRIEF.md).

Stack : Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger, SplitText) · Lenis · zod · Nodemailer (SMTP Infomaniak).

## Démarrer

```bash
npm install
cp .env.example .env    # renseigner les identifiants SMTP Infomaniak
npm run dev             # http://localhost:3000
```

## Scripts

| Commande | Rôle |
|---|---|
| `npm run tokens` | `tokens/tokens.json` → `app/styles/tokens.css` (variables CSS + thème Tailwind) et `lib/tokens.ts`. Lancé automatiquement avant `dev` et `build`. |
| `npm run brand` | Régénère les logos (`brand/logo/*`), le favicon, l'icône Apple et `lib/logo-paths.ts`. |
| `npm run media` | Convertit `public/media/src/*.png` en AVIF + WebP (640 / 1080 / 1600 / 2400 px, plafonnés à la taille source). |
| `npm run build` | Build de production. |

## Ajouter un véhicule

Déposer un fichier JSON dans `content/vehicles/` (modèle : `roadster-v12-demo.json`). Le schéma est validé par zod au build (`lib/vehicles.ts`). Les visuels sont référencés par leur clé dans `lib/media.ts`. Aucune autre modification de code.

## Arborescence

- `tokens/` : source unique des design tokens (format W3C)
- `brand/logo/` : `primary.svg`, `dark.svg` (facture), `wordmark.svg`, `monogram.svg`, `instagram-avatar.png`, `favicon.svg`, `apple-touch-icon.png`
- `components/ui/` : Logo, Button, Nav, Hero, VehicleCard, Gallery, SpecTable, EditorialBlock, ContactForm, Footer…
- `components/motion/` : MotionProvider (Lenis + GSAP, chargés en différé), Loader (CSS pur)
- `content/` : véhicules (JSON) et textes (`content/i18n/fr.ts`, prêt pour l'anglais)
- Pages internes (noindex) : `/brand`, `/design-system`, `/design-system/hero-mobile`
- `docs/captures/` : captures 1440 px et 390 px

## Déploiement Vercel

1. Importer le repo `Mayral` sur vercel.com (framework détecté automatiquement).
2. Ajouter les variables de `.env.example` dans *Settings → Environment Variables*.
3. Brancher le domaine, puis mettre à jour `NEXT_PUBLIC_SITE_URL`.

## Mesures (Lighthouse mobile, accueil, première visite avec loader)

Performance 93–96 · Accessibilité 100 · Bonnes pratiques 100 · SEO 100 · CLS 0.

## À fournir (TODO)

Modèle exact, caractéristiques et prix du véhicule · vraies photos · téléphone et e-mails Infomaniak · domaine · compte Instagram · mentions légales (raison sociale, RCS…). Tous les contenus fictifs sont marqués `TODO`.
