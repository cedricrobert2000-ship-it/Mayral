import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/LegalPage';
import credits from '@/content/photo-credits.json';
import { getCar, carName } from '@/lib/cars';

export const metadata: Metadata = { title: 'Mentions légales', alternates: { canonical: '/mentions-legales' } };

export default function Page() {
  return (
    <LegalPage title="Mentions légales">
      <section><h2>Éditeur</h2><p>TODO — Raison sociale, forme juridique, capital, adresse du siège, RCS, numéro de TVA intracommunautaire.</p><p>Directeur de la publication : TODO.</p></section>
      <section><h2>Contact</h2><p>TODO — téléphone et adresse e-mail (contact@).</p></section>
      <section><h2>Hébergement</h2><p>Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, États-Unis.</p></section>
      <section><h2>Propriété intellectuelle</h2><p>L’ensemble des contenus de ce site (textes, visuels, logo) est la propriété de MAYRAL. Toute reproduction est interdite sans autorisation. Les marques, logos et modèles cités appartiennent à leurs propriétaires respectifs ; leur mention n’implique aucune affiliation.</p></section>
      <section>
        <h2>Crédits photos</h2>
        <p>Visuels d’ambiance : créations originales MAYRAL. Visuels des build slots : photos constructeur. Photos des modèles off-market : Wikimedia Commons, sous licence libre, recadrées et étalonnées :</p>
        <ul className="mt-4 space-y-1 text-[13px]">
          {Object.entries(credits as Record<string, { author: string; license: string; page: string }>).map(([slug, c]) => {
            const car = getCar(slug);
            return (
              <li key={slug}>
                {car ? carName(car) : slug} — {c.author || 'auteur inconnu'}, <a className="underline underline-offset-2" href={c.page} target="_blank" rel="noopener noreferrer">{c.license}</a>
              </li>
            );
          })}
        </ul>
      </section>
    </LegalPage>
  );
}
