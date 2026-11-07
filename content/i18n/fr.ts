// Dictionnaire FR. Contenu repris d'amcarsfrance.com, réécrit et condensé pour MAYRAL.
// La version EN viendra dans content/i18n/en.ts avec les mêmes clés.
const fr = {
  meta: {
    title: 'MAYRAL — Private Office',
    description:
      'Automobiles off-market, build slots et immobilier d’exception. Private office fondé par Alban Mayer, à Paris. Recherche, vérification et livraison dans le monde entier.',
  },
  brand: { name: 'MAYRAL', signature: 'Private Office', promise: 'L’exceptionnel, sans bruit.', founder: 'Alban Mayer' },
  contactInfo: {
    phone: '+33 6 00 00 00 00', // TODO numéro réel
    phoneHref: 'tel:+33600000000',
    whatsapp: 'https://wa.me/33600000000', // TODO
    email: 'contact@mayral.fr', // TODO domaine réel (ancien : amayer@amcarsfrance.com)
    address: ['Rue Eugène Caron', '92400 Courbevoie, France'],
    hours: 'Sur rendez-vous uniquement',
    instagram: 'https://instagram.com/amcarsfrance', // TODO renommer en @mayral
    instagramHandle: '@amcarsfrance',
    linkedin: 'https://www.linkedin.com/', // TODO
    legal: 'Amcarsfrance SARL — SIRET 895 297 430', // TODO nouvelle raison sociale
  },
  nav: {
    automobiles: 'Automobiles',
    offMarket: 'Off-market',
    buildSlots: 'Build slots',
    allCars: 'Tout le catalogue',
    immobilier: 'Immobilier',
    services: 'Services',
    sell: 'Vendre · Rechercher',
    about: 'À propos',
    contact: 'Contact',
    univers: 'Univers',
    menu: 'Menu',
    close: 'Fermer',
    skip: 'Aller au contenu',
    inquire: 'Nous écrire',
  },
  univers: {
    maison: { title: 'Immobilier', line: 'Appartements et maisons d’exception, hors marché.' },
    yacht: { title: 'Yacht', line: 'La mer, avec le même silence.' },
    jet: { title: 'Jet', line: 'Le temps, rendu à ceux qui le comptent.' },
    conciergerie: { title: 'Conciergerie', line: 'Ce qui doit être fait. Discrètement.' },
    soon: 'Bientôt',
    cta: 'Nous écrire',
  },

  home: {
    hero: {
      eyebrow: 'Private Office · Paris',
      available: 'Off-market',
      titleLines: ['L’exceptionnel,', 'sans bruit.'],
      sub: 'Hypercars off-market, build slots et biens immobiliers d’exception. Trouvés, vérifiés, livrés partout dans le monde.',
      ctaPrimary: 'Voir les automobiles',
      ctaSecondary: 'Nous écrire',
      scroll: 'Défiler',
    },
    figures: [
      { value: '78', label: 'modèles suivis' },
      { value: '22', label: 'marques' },
      { value: '24 h', label: 'pour vous répondre' },
      { value: 'Monde', label: 'livraison' },
    ],
    ways: {
      label: 'Trois accès',
      title: 'Ce qui ne passe pas par les vitrines.',
      items: [
        { k: 'off-market', title: 'Off-market', body: 'Des voitures jamais publiées, présentées à un cercle restreint pour préserver la discrétion des propriétaires et la valeur des modèles.', href: '/automobiles?categorie=off-market' },
        { k: 'build-slot', title: 'Build slots', body: 'Des places de production sur les modèles neufs les plus demandés. Vous évitez des années d’attente chez le constructeur.', href: '/automobiles?categorie=build-slot' },
        { k: 'immobilier', title: 'Immobilier', body: 'Appartements et maisons d’exception, vendus hors annonces, avec la même méthode que nos automobiles.', href: '/immobilier' },
      ],
    },
    selection: { label: 'Sélection', title: 'Build slots disponibles.', cta: 'Tout le catalogue' },
    registry: { label: 'Registre off-market', title: 'Ce qui ne s’affiche pas.', body: 'Une partie des modèles que nous suivons en ce moment. Le dossier complet et les photos du véhicule réel sont transmis après un premier échange et une vérification d’identité.', cta: 'Voir le registre complet' },
    estate: { label: 'Immobilier', title: 'La même discrétion, pour les murs.', body: 'Appartements parisiens, villas sur la Côte d’Azur, propriétés de caractère. Nous appliquons à l’immobilier ce qui fait notre réputation dans l’automobile : un réseau, une vérification, un accès privé.', cta: 'Découvrir l’immobilier' },
    process: { label: 'Méthode', title: 'Quatre étapes. Aucune annonce.' },
    contact: { label: 'Contact', title: 'Une question, ou une sélection à recevoir ?', body: 'Remplissez la demande. Nous vous recontactons sous 24 heures, par le moyen de votre choix.' },
  },

  process: [
    { title: 'Échange', body: 'Vous nous dites ce que vous cherchez : modèle, configuration, budget, délai.' },
    { title: 'Recherche', body: 'Nous activons notre réseau : collectionneurs, concessions, propriétaires privés.' },
    { title: 'Vérification', body: 'Historique, état, valeur de marché. Une expertise indépendante avant toute décision.' },
    { title: 'Livraison', body: 'Transport sécurisé, formalités, homologation. Livré où vous le souhaitez.' },
  ],

  cars: {
    label: 'Automobiles',
    title: 'Le catalogue.',
    intro: 'Hypercars, supercars, classiques et build slots. Pour l’off-market, les photos sont d’illustration : celles du véhicule réel sont transmises en privé.',
    filters: { all: 'Tout', 'off-market': 'Off-market', 'build-slot': 'Build slots', brand: 'Marque', allBrands: 'Toutes les marques' },
    count: (n: number) => (n > 1 ? `${n} modèles` : `${n} modèle`),
    onRequest: 'Prix sur demande',
    offMarketBadge: 'Off-market',
    buildSlotBadge: 'Build slot',
    discreet: 'Présenté en privé',
    notFound: 'Vous ne trouvez pas le modèle recherché ? Nous le cherchons pour vous.',
    find: 'Lancer une recherche',
  },
  car: {
    back: 'Automobiles',
    specs: 'Caractéristiques',
    welcomeTitle: 'Accès off-market.',
    welcome: [
      'Chaque voiture de ce registre n’est présentée qu’à un cercle restreint. C’est ce qui préserve la confidentialité de son propriétaire, l’exclusivité du modèle et sa valeur.',
      'Pour recevoir le dossier et les photos, envoyez votre demande avec vos coordonnées complètes et un justificatif (pièce d’identité, papier à en-tête ou site de votre société). Nous revenons vers vous rapidement.',
    ],
    slotTitle: 'Une place de production.',
    slot: [
      'Les modèles les plus recherchés se commandent des années à l’avance. Grâce à notre réseau, nous disposons de places de production — build slots — qui vous permettent d’être livré bien plus tôt.',
      'Configuration, personnalisation, suivi de fabrication : nous nous occupons de tout, jusqu’à la remise des clés.',
    ],
    photoNote: 'Photo d’illustration, non contractuelle.',
    cta: 'Réserver ce modèle',
    ctaFile: 'Recevoir le dossier',
    formTitle: 'Recevoir le dossier.',
    related: 'Du même constructeur',
  },

  estate: {
    label: 'Immobilier',
    title: 'Des adresses qui ne s’affichent pas.',
    intro: 'Appartements, maisons et villas d’exception, vendus hors marché. La même méthode que pour nos automobiles : un réseau, une vérification, une présentation privée.',
    types: [
      { title: 'Appartements', body: 'Paris et grandes métropoles. Étages élevés, terrasses, adresses d’exception.' },
      { title: 'Maisons & villas', body: 'Côte d’Azur, Alpes, campagne française. Propriétés de caractère et architectures contemporaines.' },
      { title: 'Off-market', body: 'Des biens jamais publiés. Présentés uniquement après un premier échange.' },
    ],
    services: ['Recherche sur cahier des charges', 'Vente discrète de votre bien', 'Visites privées et virtuelles', 'Accompagnement juridique et notarial'],
    soonListings: 'Les premiers biens sont présentés sur demande. TODO : intégrer le catalogue immobilier.',
    formTitle: 'Décrivez le bien que vous cherchez.',
  },

  services: {
    label: 'Services',
    title: 'Tout ce qui entoure la voiture.',
    intro: 'Au-delà de l’achat, nous prenons en charge ce qui demande du temps, des contacts et de la précision.',
    items: [
      { title: 'Vente de votre véhicule', body: 'Estimation, recherche de l’acheteur, transaction. Un processus simple et discret, pour un résultat optimal.' },
      { title: 'Transport & logistique', body: 'En Europe et dans le monde, avec des partenaires spécialisés. Chaque étape est planifiée, chaque arrivée à l’heure.' },
      { title: 'Import & export', body: 'Outre-mer ou l’autre bout du monde : formalités, documents et transport, nous gérons tout.' },
      { title: 'Homologation', body: 'Rendre une voiture de course légale sur route — P1 GTR, Zonda R — sans trahir son pedigree.' },
      { title: 'Protection XPEL', body: 'Film de protection auto-cicatrisant, teinte PRIME™, céramique FUSION PLUS™. Partenaire XPEL.' },
      { title: 'Carbone sur mesure', body: 'Pièces en carbone façonnées selon vos envies, avec un fabricant allemand de référence.' },
      { title: 'Gardiennage', body: 'Un stockage sécurisé, aux conditions optimales, pour préserver l’état et la valeur de votre voiture.' },
      { title: 'Expertise & conseil', body: 'Historique, état, valeur de marché : un avis indépendant avant d’acheter, ou pour bâtir une collection.' },
    ],
  },

  sell: {
    label: 'Vendre · Rechercher',
    title: 'Partout. Depuis n’importe où.',
    intro: 'Vous vendez une voiture d’exception, ou vous en cherchez une qui n’est pas sur le marché. Dans les deux cas, tout commence par un message.',
    sellTitle: 'Vendre votre voiture',
    sellBody: 'Estimation, acheteurs qualifiés de notre réseau, transaction sécurisée. Votre voiture n’est jamais exposée publiquement.',
    findTitle: 'Trouver votre voiture',
    findBody: 'Dites-nous le modèle, la configuration et le délai. Nous savons souvent tout de suite s’il est disponible, et en combien de temps.',
  },

  about: {
    label: 'À propos',
    title: 'Une idée née à Lyon, devant un café.',
    origin: [
      'Enfant, Alban Mayer ne s’intéressait pas aux voitures : il s’intéressait aux voitures rares. Celles dont beaucoup rêvent et que peu approchent.',
      'Plus tard, il a vu ce qui manquait : un lieu pour les ventes privées et off-market, pour une clientèle qui veut l’exclusivité sans l’exposition. Il a fondé sa maison sur ce principe et sur un réseau qui couvre le monde.',
      'Une Bugatti absente des showrooms, une berline de prestige livrée dans une résidence à Tokyo : chaque transaction est d’abord une histoire de confiance.',
    ],
    missionTitle: 'Au-delà de l’automobile.',
    mission:
      'Nous aimons ce qui se voit, se touche, s’entend. Après l’automobile vient l’immobilier, puis une maison qui réunira nos clients autour de ce qui les passionne. En attendant, nous restons la référence de l’automobile d’exception.',
    signature: '— Alban Mayer, fondateur',
    faqTitle: 'Questions fréquentes',
    faq: [
      { q: 'Que veut dire « off-market » ?', a: 'Une voiture vendue sans annonce publique. Elle n’est présentée qu’à des acheteurs identifiés, ce qui protège le propriétaire et la valeur du modèle.' },
      { q: 'Qu’est-ce qu’un build slot ?', a: 'Une place dans la file de production d’un constructeur. Elle permet de recevoir une voiture neuve très recherchée bien plus vite que par la voie habituelle.' },
      { q: 'Quelles marques couvrez-vous ?', a: 'Aston Martin, Bentley, Bugatti, Ferrari, Koenigsegg, Lamborghini, McLaren, Maybach, Pagani, Porsche, Rolls-Royce, et bien d’autres.' },
      { q: 'Une voiture de collection est-elle un bon investissement ?', a: 'Elle peut compléter un patrimoine avec une valeur stable, tout en restant un plaisir de conduite. Nous vous conseillons modèle par modèle.' },
      { q: 'Pouvez-vous expertiser une voiture qu’on me propose ?', a: 'Oui. Historique, état, valeur de marché : nous donnons un avis indépendant, fondé sur notre expérience et nos contacts.' },
      { q: 'Livrez-vous à l’étranger ?', a: 'Partout dans le monde. Transport, formalités d’import et d’export, homologation : nous gérons l’ensemble.' },
    ],
  },

  contactPage: { label: 'Contact', title: 'Nous vous rappelons.', body: 'Un premier échange, puis un rendez-vous. Rien de plus.' },

  form: {
    name: 'Votre nom',
    contact: 'Téléphone ou e-mail',
    message: 'Votre demande (facultatif)',
    interest: 'Votre projet',
    interests: { car: 'Acheter une voiture', sell: 'Vendre une voiture', estate: 'Immobilier', service: 'Un service', other: 'Autre' },
    preferred: 'Moyen de contact préféré',
    whatsapp: 'WhatsApp',
    phone: 'Téléphone',
    email: 'E-mail',
    consent: 'J’accepte le traitement de mes données personnelles pour être recontacté.',
    privacy: 'Confidentialité',
    submit: 'Envoyer',
    sending: 'Envoi…',
    success: 'Merci. Nous revenons vers vous sous 24 heures.',
    error: 'L’envoi n’a pas abouti. Réessayez ou écrivez-nous sur WhatsApp.',
    errors: {
      name: 'Indiquez votre nom.',
      contact: 'Indiquez un téléphone ou un e-mail valide.',
      consent: 'Votre accord est nécessaire pour vous répondre.',
    },
  },

  footer: {
    contacts: 'Contacts',
    address: 'Adresse',
    rights: 'Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    follow: 'Instagram',
    fr: 'Français / English',
  },

  // Conservés pour la galerie
  vehicle: {
    gallery: 'Galerie',
    close: 'Fermer',
    prev: 'Image précédente',
    next: 'Image suivante',
    open: 'Agrandir l’image',
  },
  notFound: { title: 'Cette route ne mène nulle part.', cta: 'Retour à l’accueil' },
} as const;

export default fr;
export type Dictionary = typeof fr;
