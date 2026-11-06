// Dictionnaire FR. La version EN viendra dans content/i18n/en.ts avec les mêmes clés.
const fr = {
  meta: {
    title: 'MAYRAL — Private Office',
    description: 'Automobiles d’exception, présentées sur rendez-vous. Sélection courte, accès off-market.',
  },
  brand: { name: 'MAYRAL', signature: 'Private Office', promise: 'L’exceptionnel, sans bruit.' },
  contactInfo: {
    phone: '+33 6 00 00 00 00', // TODO numéro réel
    phoneHref: 'tel:+33600000000',
    email: 'contact@mayral.fr', // TODO domaine réel
    instagram: 'https://instagram.com/mayral.privateoffice', // TODO compte réel
    instagramHandle: '@mayral.privateoffice',
    address: 'Sur rendez-vous uniquement',
  },
  nav: {
    collection: 'Collection',
    offMarket: 'Off-market',
    univers: 'Univers',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Fermer',
    skip: 'Aller au contenu',
  },
  univers: {
    maison: { title: 'Maison', line: 'Des adresses qui ne passent pas par les vitrines.' },
    yacht: { title: 'Yacht', line: 'La mer, avec le même silence.' },
    jet: { title: 'Jet', line: 'Le temps, rendu à ceux qui le comptent.' },
    conciergerie: { title: 'Conciergerie', line: 'Ce qui doit être fait. Discrètement.' },
    soon: 'Bientôt',
    cta: 'Nous écrire',
  },
  home: {
    hero: {
      eyebrow: 'Private Office',
      title: 'La route commence ici.',
      sub: 'Une sélection courte. Chaque voiture, présentée en personne.',
      ctaPrimary: 'Voir la collection',
      ctaSecondary: 'Réserver un essai',
      scroll: 'Défiler',
    },
    manifesto: {
      label: 'Manifeste',
      lines: ['Peu de voitures.', 'Choisies une à une.', 'Montrées à ceux qui les cherchent.'],
      body: 'MAYRAL est un private office automobile. Nous trouvons, vérifions et présentons des voitures rares, sans annonce et sans intermédiaire inutile.',
    },
    featured: { label: 'À la une', title: 'Disponible maintenant.', cta: 'Découvrir' },
    offMarket: {
      label: 'Off-market',
      title: 'Certaines voitures ne s’affichent pas.',
      body: 'Une partie de nos véhicules n’est jamais publiée. Elle est présentée en privé, sur demande.',
      cta: 'Demander l’accès',
    },
    contact: { label: 'Contact', title: 'Sur rendez-vous uniquement.', body: 'Dites-nous ce que vous cherchez. Nous revenons vers vous sous 24 heures.' },
  },
  collection: {
    label: 'Collection',
    title: 'La collection.',
    intro: 'Chaque voiture est inspectée, documentée et présentée en personne.',
    count: (n: number) => (n > 1 ? `${n} véhicules` : `${n} véhicule`),
    onRequest: 'Sur demande',
    empty: 'La collection se renouvelle. Écrivez-nous pour connaître les prochaines arrivées.',
  },
  vehicle: {
    back: 'Collection',
    story: 'L’histoire',
    gallery: 'Galerie',
    specs: 'Fiche technique',
    price: 'Prix',
    ctaTrial: 'Organiser un essai',
    ctaFile: 'Recevoir le dossier',
    close: 'Fermer',
    prev: 'Image précédente',
    next: 'Image suivante',
    open: 'Agrandir l’image',
    nextTitle: 'Une question sur ce véhicule\u00a0?',
  },
  offMarketPage: {
    label: 'Off-market',
    title: 'Ce qui n’est pas montré.',
    body: [
      'Certains propriétaires préfèrent vendre sans publicité. Leurs voitures ne figurent nulle part.',
      'Nous les présentons à un cercle restreint, après un premier échange.',
    ],
    formTitle: 'Demander l’accès',
  },
  contactPage: { label: 'Contact', title: 'Parlons de votre prochaine voiture.', body: 'Un échange, puis un rendez-vous. Rien de plus.' },
  form: {
    name: 'Nom',
    contact: 'Téléphone ou e-mail',
    message: 'Votre recherche (facultatif)',
    preferred: 'Moyen préféré',
    whatsapp: 'WhatsApp',
    phone: 'Téléphone',
    email: 'E-mail',
    consent: 'J’accepte que MAYRAL utilise ces informations pour me recontacter. Elles ne sont jamais partagées.',
    privacy: 'Confidentialité',
    submit: 'Envoyer la demande',
    sending: 'Envoi…',
    success: 'Merci. Nous revenons vers vous très vite.',
    error: 'L’envoi n’a pas abouti. Réessayez ou appelez-nous.',
    errors: {
      name: 'Indiquez votre nom.',
      contact: 'Indiquez un téléphone ou un e-mail valide.',
      consent: 'Votre accord est nécessaire pour vous répondre.',
    },
  },
  footer: {
    rights: 'Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    follow: 'Instagram',
  },
  notFound: { title: 'Cette route ne mène nulle part.', cta: 'Retour à l’accueil' },
} as const;

export default fr;
export type Dictionary = typeof fr;
