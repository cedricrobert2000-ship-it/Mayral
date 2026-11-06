# MAYRAL — Private Office
## Brief Claude Code · v2 · Focus « Automobile »

> Place ce fichier à la racine du repo sous le nom `BRIEF.md`, puis dis à Claude Code : « Lis BRIEF.md et commence par la Phase 0. »

---

## 0. Ton rôle et ta façon de travailler

Tu es à la fois directeur artistique, responsable du design system et développeur front senior. Tu crées de zéro le site de **MAYRAL — Private Office**, un vendeur de voitures de luxe.

**Périmètre de cette version : uniquement la partie automobile.** Les univers Maison, Yacht, Jet et Conciergerie viendront plus tard, chacun sur sa page. Pour l'instant, ils apparaissent seulement dans le menu, avec une page « Bientôt » minimaliste (voir §7).

Tu travailles **par phases**. À la fin de chaque phase, tu fais des captures en desktop (1440 px) et en mobile (390 px), tu me les montres, puis **tu t'arrêtes** jusqu'à ma validation.

---

## 1. Le brief client

- **Nom** : MAYRAL. La signature *Private Office* figure sur le site, les factures et la papeterie.
- **Activité** : vente de voitures de luxe. Le catalogue démarre avec **1 voiture**, mais il doit pouvoir accueillir 20 véhicules ou plus sans refonte.
- **Vente off-market** : des véhicules non publiés, accessibles uniquement sur demande.
- **Ton** : jeune, moderne, sombre, très inspirationnel. On évite le luxe « doré et vieillot » ; on cherche l'atmosphère d'un studio photo automobile de nuit.
- **Hero** : plein écran (100svh), construit sur une **image fixe** (il n'y a pas de vidéo dans cette version).
- **Visuels** : générés par IA (Higgsfield), tous déjà produits (voir §8). **Aucun logo de constructeur** ne doit apparaître.
- **Logos à livrer** : le logo principal (site et facture) et une version pour l'avatar Instagram.

---

## 2. Plateforme de marque

**Promesse** : *L'exceptionnel, sans bruit.*

**Les trois piliers**
- **Discrétion** : off-market, private office, relation directe avec le client.
- **Désir** : la voiture est présentée comme un objet de studio, jamais comme une petite annonce.
- **Précision** : peu d'éléments à l'écran, mais chacun parfaitement placé.

**Voix**
- Des phrases courtes, peu d'adjectifs. On vouvoie. Le site est en français ; l'anglais viendra en v2, donc prévois l'i18n dès maintenant.
- Exemples de titres : « La route commence ici. » / « Certaines voitures ne s'affichent pas. » / « Sur rendez-vous uniquement. »
- Mots interdits en accroche : « luxe », « prestige », « haut de gamme », « exceptionnel ».

---

## 3. Logo

Propose **3 directions en SVG**. Je choisis, puis tu déclines celle que j'ai retenue.

1. **Wordmark** : `MAYRAL` en capitales avec un tracking large (environ 0.3em), dans une grotesque géométrique ou étendue. Sous le wordmark, `PRIVATE OFFICE` en tout petit.
2. **Monogramme M** : un M formé de deux lignes de fuite qui évoquent la route et l'horizon. C'est lui qui sert d'avatar Instagram.
3. **Wordmark + signe** : la direction 1, avec un détail en plus, par exemple une fine ligne qui reprend le bandeau lumineux d'un feu arrière.

**Fichiers à livrer** dans `/brand/logo/` :
- `primary.svg` : version claire sur fond sombre
- `dark.svg` : version sombre sur fond clair, pour la facture
- `monogram.svg`
- `instagram-avatar.png` : 1080×1080, avec une zone de sécurité circulaire
- `favicon.svg` et `apple-touch-icon.png`

---

## 4. Direction artistique

Elle s'appuie directement sur les visuels validés (§8).

- **Uniquement en mode sombre**, sans bouton pour basculer en clair.
- **Palette** : noir profond, rouge cramoisi sourd, quelques touches de rouge vif réservées aux « lumières », c'est-à-dire aux feux et aux accents.
- **Lumière** : tamisée, en low-key, avec un contraste doux. Rien n'est éclairé violemment ; on a toujours l'impression qu'une seule source de lumière se trouve dans la pièce.
- **Composition** : beaucoup de vide. La voiture occupe le tiers bas ou un côté de l'image, et le texte prend place dans le noir ou le rouge restant.
- **Texture** : un léger grain film en overlay (SVG/CSS, 3 à 4 % d'opacité).
- **Ce qu'il faut éviter** : les dégradés flashy, le glassmorphism partout, les ombres portées, les images très saturées.

---

## 5. Design tokens

Mets les tokens au format **W3C Design Tokens (JSON)** dans `/tokens/`. Génère ensuite, à partir de ce fichier, les variables CSS et la configuration Tailwind. Il ne doit y avoir **qu'une seule source de vérité**.

### 5.1 Couleurs

```json
{
  "color": {
    "base": {
      "black-1000": { "value": "#050304" },
      "black-950":  { "value": "#0A0607" },
      "black-900":  { "value": "#120A0B" },
      "black-800":  { "value": "#1B1011" },
      "black-700":  { "value": "#261618" },
      "crimson-900": { "value": "#2A0709" },
      "crimson-800": { "value": "#4A0B10" },
      "crimson-700": { "value": "#6E0F16" },
      "crimson-600": { "value": "#8F141C" },
      "red-500":     { "value": "#C81E24" },
      "red-400":     { "value": "#E2353A" },
      "glow-300":    { "value": "#FF5A4E" },
      "ash-400":     { "value": "#8C8283" },
      "ash-200":     { "value": "#CFC6C6" },
      "white-50":    { "value": "#F5F1EF" }
    },
    "semantic": {
      "bg.canvas":      { "value": "{color.base.black-1000}" },
      "bg.surface":     { "value": "{color.base.black-950}" },
      "bg.elevated":    { "value": "{color.base.black-900}" },
      "bg.tint":        { "value": "{color.base.crimson-900}" },
      "border.subtle":  { "value": "rgba(245,241,239,0.08)" },
      "border.strong":  { "value": "rgba(245,241,239,0.18)" },
      "text.primary":   { "value": "{color.base.white-50}" },
      "text.secondary": { "value": "{color.base.ash-200}" },
      "text.muted":     { "value": "{color.base.ash-400}" },
      "accent.default": { "value": "{color.base.red-500}" },
      "accent.hover":   { "value": "{color.base.red-400}" },
      "accent.glow":    { "value": "{color.base.glow-300}" },
      "overlay.hero":   { "value": "linear-gradient(180deg, rgba(5,3,4,0.35) 0%, rgba(5,3,4,0) 35%, rgba(5,3,4,0) 60%, rgba(5,3,4,0.9) 100%)" },
      "overlay.side":   { "value": "linear-gradient(90deg, rgba(5,3,4,0) 30%, rgba(5,3,4,0.85) 75%)" },
      "state.focus":    { "value": "{color.base.glow-300}" },
      "state.success":  { "value": "#7FA88A" },
      "state.error":    { "value": "#E2353A" }
    }
  }
}
```

Règles d'usage :
- Le rouge vif (`red-500` et au-delà) ne doit jamais couvrir plus de 5 % environ d'un écran. Il sert pour les boutons primaires, le focus, un filet ou un chiffre clé.
- Les fonds rouges proviennent des images ; en CSS, on reste sur des teintes `crimson` sombres.
- Tout texte doit respecter le contraste WCAG AA.

### 5.2 Typographie

Les références utilisent une **grotesque géométrique moderne**, sans serif, et c'est la direction à suivre.

- **Display et UI** : propose 2 options parmi *Manrope*, *Onest*, *Inter Tight* ou *Unbounded* (pour le logo et les labels uniquement). Indique en commentaire une option payante, par exemple *Neue Montreal* ou *Gilroy*.
- **Graisses** : 300/400 pour les grands titres (c'est la finesse qui donne l'élégance), 500 pour l'UI.
- **Labels** : en capitales, avec un tracking de 0.22em, en petit corps.

L'échelle est fluide grâce à `clamp()`, de 375 px à 1440 px :

| Token | Mobile | Desktop | Usage |
|---|---|---|---|
| `type.display.xl` | 40px / 1.05 | 88px / 1.0 | Titre du hero |
| `type.display.l` | 32px / 1.1 | 64px / 1.05 | Titres de section |
| `type.display.m` | 28px / 1.15 | 48px / 1.1 | Nom du véhicule |
| `type.heading` | 20px / 1.3 | 28px / 1.25 | Sous-titres |
| `type.body.l` | 16px / 1.6 | 19px / 1.6 | Chapô |
| `type.body` | 15px / 1.6 | 16px / 1.65 | Texte courant |
| `type.label` | 11px / 1.2 | 12px / 1.2 | Capitales, tracking 0.22em |
| `type.spec` | 13px / 1.4 | 14px / 1.4 | Fiches techniques, chiffres tabulaires |

### 5.3 Espacement, grille, rayons

- **Unité de base : 4 px.** L'échelle est la suivante : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192.
- **Desktop (1280 px et plus)** : 12 colonnes, gouttière de 24 px, marges de 64 px, largeur maximale de 1600 px.
- **Tablette (768 à 1279 px)** : 8 colonnes, gouttière de 20 px, marges de 40 px.
- **Mobile (moins de 768 px)** : 4 colonnes, gouttière de 16 px, marges de 20 px.
- **Espace vertical entre les sections** : 160 px en desktop, 96 px en mobile.
- **Rayons** : 8 px pour les champs et les cartes ; `999px` pour les boutons, en forme de pilule comme sur les références.
- **Breakpoints** : `sm 375`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1600`.

### 5.4 Motion (discret, sans vidéo)

| Token | Valeur | Usage |
|---|---|---|
| `motion.ease.out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrées |
| `motion.ease.inout` | `cubic-bezier(0.65, 0, 0.35, 1)` | Transitions |
| `motion.duration.fast` | 200ms | Hover, focus |
| `motion.duration.base` | 700ms | Apparition des textes et des images |
| `motion.duration.slow` | 1400ms | Hero |

Principes :
- **Hero** : l'image fait un zoom très lent, de 1.04 à 1.0 en 2,5 s, au chargement. Ensuite, le halo rouge du fond « respire » légèrement grâce à un dégradé radial CSS animé en opacité (6 à 8 %, sur un cycle de 8 s). **Le mouvement doit rester presque imperceptible.**
- Les textes apparaissent ligne par ligne, avec un masque. Les images se révèlent avec un `clip-path`.
- Le défilement est fluide (Lenis). La parallaxe reste très faible, 5 % au maximum.
- Si `prefers-reduced-motion` est activé, on supprime tout le mouvement.

---

## 6. Composants

Range-les dans `/components/ui/` et documente-les sur une page interne `/design-system`. Chaque composant doit être présenté en desktop et en mobile, avec tous ses états.

- **Navigation** : le logo à gauche ; au centre, en petit corps, `Collection · Off-market · Univers ▾ · Contact` ; le téléphone à droite. Elle est transparente au-dessus du hero, puis devient floutée au défilement. Le sous-menu **Univers** contient Maison, Yacht, Jet et Conciergerie. En mobile, le menu s'ouvre en plein écran.
- **Boutons** en pilule :
  - `primary` : fond `white-50`, texte noir ;
  - `secondary` : filet `border.strong` et texte blanc ;
  - `accent` : fond `red-500`, réservé aux formulaires.
  - Hauteur : 52 px en desktop, 48 px en mobile.
- **Hero** : une image de fond plein écran, les overlays, le titre centré, un sous-titre, deux CTA et un indicateur de défilement.
- **Carte véhicule** : un grand visuel au format 4:5 ou 16:10, le nom, l'année, 3 caractéristiques clés et le prix, ou la mention « Sur demande ».
- **Galerie** : plein écran, avec swipe en mobile et une lightbox.
- **Fiche technique** : tableau en `type.spec`, avec des chiffres tabulaires.
- **Bloc éditorial** : une image macro et un texte, décalés sur la grille.
- **Formulaire** sur image : l'image occupe la gauche, le formulaire la droite, sur l'`overlay.side` (comme sur la référence). Champs : nom et contact (téléphone ou e-mail), moyen préféré (radio WhatsApp / Téléphone / E-mail), consentement RGPD. Bouton `accent`.
- **Footer** : le logo, les coordonnées, le lien Instagram et les mentions légales.
- **Grain overlay** et **loader** d'entrée : le logo se dessine en moins de 1,5 s, une seule fois par session.

---

## 7. Arborescence (v1 : automobile uniquement)

1. **Accueil**
   - **Hero** : titre « La route commence ici. », un sous-titre court, les CTA « Voir la collection » et « Réserver un essai ».
   - **Manifeste** : 3 lignes sur un fond noir, accompagnées de la macro du feu arrière.
   - **Véhicule à la une** : la voiture actuellement en vente.
   - **Off-market** : un teaser avec un visuel assombri et le bouton « Demander l'accès ».
   - **Contact** : le formulaire sur l'image du 3/4 arrière.
2. **Collection** (`/collection`) : la liste des véhicules, prévue pour 1 à plus de 20 voitures. Les filtres pourront être activés plus tard.
3. **Fiche véhicule** (`/collection/[slug]`) : un hero image, la galerie, l'histoire du véhicule, la fiche technique, puis les CTA « Organiser un essai » et « Recevoir le dossier ».
4. **Off-market** (`/off-market`) : une page sobre avec le formulaire de demande d'accès. Aucun véhicule n'y est affiché publiquement.
5. **Contact** (`/contact`).
6. **Univers** (`/univers/maison`, `/univers/yacht`, `/univers/jet`, `/univers/conciergerie`) : **de simples placeholders** pour l'instant. Chaque page affiche un titre, une phrase et la mention « Bientôt », plus un lien de contact. L'architecture doit déjà être prête pour les développer plus tard.
7. **Mentions légales** et **Confidentialité**.
8. Pages internes `/brand` et `/design-system`, en `noindex`.

**Contenu** : les véhicules sont stockés dans `/content/vehicles/*.json` (ou en MDX), pour qu'on puisse en ajouter sans toucher au code. Crée un véhicule de démonstration avec des données factices clairement marquées `TODO`.

---

## 8. Visuels validés (Higgsfield)

Télécharge ces fichiers dans `/public/media/src/`. Convertis-les ensuite en **AVIF et WebP**, en plusieurs tailles (640, 1080, 1600 et 2400 px), dans `/public/media/`. Garde les noms indiqués ci-dessous.

| Fichier | Usage | Format | URL source |
|---|---|---|---|
| `hero-silhouette.png` | Hero de l'accueil (desktop) | 16:9 | https://d8j0ntlcm91z4.cloudfront.net/user_3Cj3zSgemTHkiVKaqFxMEa2pe5p/hf_20261106_144647_e65cdfb5-0488-4f70-9b0c-ed542384e575.png |
| `rear-three-quarter.png` | Fond du formulaire de contact / off-market | 16:9 | https://d8j0ntlcm91z4.cloudfront.net/user_3Cj3zSgemTHkiVKaqFxMEa2pe5p/hf_20261106_144648_fc15ad43-0a90-4ac5-9513-5c6167074ec5.png |
| `tail-light-macro.png` | Bloc manifeste / transitions | 4:3 | https://d8j0ntlcm91z4.cloudfront.net/user_3Cj3zSgemTHkiVKaqFxMEa2pe5p/hf_20261106_144647_9bfb8e36-b2d2-4720-abc7-e9acca34cc18.png |
| `top-light-painting.png` | Hero mobile, loader, Instagram | 4:5 | https://d8j0ntlcm91z4.cloudfront.net/user_3Cj3zSgemTHkiVKaqFxMEa2pe5p/hf_20261106_144648_f9728030-3b11-4fce-9f83-13d368a107a9.png |
| `reference-silhouette.png` | Image de référence de la voiture (cohérence) | 16:9 | https://d8j0ntlcm91z4.cloudfront.net/user_3Cj3zSgemTHkiVKaqFxMEa2pe5p/hf_20261106_142252_7bc88370-d62b-4a39-a6f5-6f94d16c1669.png |

**Hero mobile** : commence par tester un recadrage de `hero-silhouette` avec `object-position`. Si la voiture devient trop petite, utilise `top-light-painting` à la place, et montre-moi les deux options.

**Si tu as besoin d'un nouveau visuel** (MCP Higgsfield) :
- **Toujours me demander avant de générer.** Annonce le nombre d'images et le coût total.
- Le modèle à utiliser est `gpt_image_2_6`, à 0,25 crédit par image. **Pas de vidéo.**
- Passe toujours `reference-silhouette` en `image_references` (job ID `7bc88370-d62b-4a39-a6f5-6f94d16c1669`) pour que ce soit bien la même voiture.
- Ajoute systématiquement au prompt : *real photograph, medium format, low-key, dim, slightly underexposed, low contrast, muted deep crimson and charcoal, soft falloff, subtle grain, not CGI, not oversaturated, no smoke, no haze, no text, no logo, no badge, no emblem, no license plate*.

---

## 9. Stack technique

- **Next.js** (App Router) et **TypeScript**.
- **Tailwind CSS**, branché sur les tokens.
- **GSAP** (ScrollTrigger) et **Lenis**.
- `next/image` avec AVIF/WebP. Le hero est préchargé, tout le reste est chargé en lazy-load.
- **Formulaires** : Server Actions, envoi par SMTP **Infomaniak** (les identifiants vont dans `.env`, jamais dans le code), un honeypot contre le spam et une validation avec zod.
- **SEO** : métadonnées, Open Graph généré avec le logo, sitemap. `/off-market`, `/brand` et `/design-system` sont en `noindex`.
- **Objectifs** : Lighthouse mobile ≥ 90, LCP < 2,5 s, accessibilité AA, navigation au clavier et focus visibles.
- **Déploiement** : Vercel.

---

## 10. Ordre de travail

- **Phase 0** : reformule le brief en 10 lignes et liste tes questions bloquantes.
- **Phase 1** : propose 3 directions de logo en SVG et 2 options de typographie, présentées sur un des visuels.
- **Phase 2** : tokens JSON, puis variables CSS, puis Tailwind. Page `/brand`.
- **Phase 3** : composants et page `/design-system`.
- **Phase 4** : page d'accueil complète, avec les vrais visuels.
- **Phase 5** : Collection, fiche véhicule, Off-market, Contact, placeholders Univers.
- **Phase 6** : motion, performance, accessibilité, SEO, déploiement.

Après chaque phase : captures en 1440 px et en 390 px, puis **stop**.

---

## 11. Points à confirmer avec le client

- Le modèle exact de la voiture en vente, ses caractéristiques, et s'il faut afficher le prix ou la mention « sur demande ».
- Ses vraies photos du véhicule pour la fiche, l'IA servant à l'ambiance.
- Le numéro de téléphone et les adresses e-mail : `contact@` et `alban@`, plus 3 autres à définir chez Infomaniak.
- Le nom de domaine choisi.
- Le compte Instagram : existe-t-il déjà, ou faut-il le créer ?
