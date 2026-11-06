import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/LegalPage';

export const metadata: Metadata = { title: 'Confidentialité', alternates: { canonical: '/confidentialite' } };

export default function Page() {
  return (
    <LegalPage title="Confidentialité">
      <section><h2>Données collectées</h2><p>Via nos formulaires : nom, téléphone ou e-mail, moyen de contact préféré et, si vous le souhaitez, un message. Rien d’autre.</p></section>
      <section><h2>Finalité</h2><p>Ces informations servent uniquement à vous recontacter au sujet de votre demande. Elles ne sont ni vendues, ni partagées, ni utilisées à des fins publicitaires.</p></section>
      <section><h2>Durée de conservation</h2><p>TODO — 3 ans à compter du dernier contact, puis suppression.</p></section>
      <section><h2>Vos droits</h2><p>Vous disposez d’un droit d’accès, de rectification, d’effacement et d’opposition. Écrivez à TODO (contact@). Vous pouvez aussi saisir la CNIL.</p></section>
      <section><h2>Cookies</h2><p>Ce site n’utilise aucun cookie publicitaire ni outil de suivi tiers.</p></section>
    </LegalPage>
  );
}
