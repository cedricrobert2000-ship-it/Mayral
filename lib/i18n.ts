import fr from '@/content/i18n/fr';

// i18n prête pour la v2 : ajouter 'en' ici et un dictionnaire content/i18n/en.ts,
// puis déplacer les routes sous app/[locale]/.
export const locales = ['fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

const dictionaries = { fr } as const;
export const getDictionary = (locale: Locale = defaultLocale) => dictionaries[locale];
export const t = getDictionary();
