// Registre des visuels. Les sources sont optimisées en AVIF/WebP par next/image.
// Les déclinaisons statiques (public/media/*-{640,1080,…}.{avif,webp}) sont produites par `npm run media`.
export type Media = { src: string; width: number; height: number; alt: string };

export const media = {
  heroSilhouette: { src: '/media/src/hero-silhouette.png', width: 1344, height: 752, alt: 'Roadster rouge de profil, dans un studio plongé dans la pénombre.' },
  rearThreeQuarter: { src: '/media/src/rear-three-quarter.png', width: 1344, height: 752, alt: 'Roadster vu de trois quarts arrière, le feu dessinant une ligne rouge.' },
  tailLight: { src: '/media/src/tail-light-macro.png', width: 1168, height: 880, alt: 'Détail du bandeau lumineux du feu arrière.' },
  topLight: { src: '/media/src/top-light-painting.png', width: 896, height: 1120, alt: 'Vue de dessus du roadster, silhouette soulignée par la lumière.' },
  reference: { src: '/media/src/reference-silhouette.png', width: 1344, height: 752, alt: 'Silhouette du roadster de profil.' },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;
