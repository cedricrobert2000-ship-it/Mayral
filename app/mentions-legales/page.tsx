import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/LegalPage';

export const metadata: Metadata = { title: 'Mentions légales', alternates: { canonical: '/mentions-legales' } };

export default function Page() {
  return (
    <LegalPage title="Mentions légales">
      <section><h2>Éditeur</h2><p>TODO — Raison sociale, forme juridique, capital, adresse du siège, RCS, numéro de TVA intracommunautaire.</p><p>Directeur de la publication : TODO.</p></section>
      <section><h2>Contact</h2><p>TODO — téléphone et adresse e-mail (contact@).</p></section>
      <section><h2>Hébergement</h2><p>Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, États-Unis.</p></section>
      <section><h2>Propriété intellectuelle</h2><p>L’ensemble des contenus de ce site (textes, visuels, logo) est la propriété de MAYRAL. Toute reproduction est interdite sans autorisation. Les visuels d’ambiance sont des créations originales ; aucune marque automobile n’y est représentée.</p></section>
    </LegalPage>
  );
}
