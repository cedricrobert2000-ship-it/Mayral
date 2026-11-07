import type { Metadata } from 'next';
import { ContactPanel } from '@/components/sections/ContactPanel';
import { Process } from '@/components/sections/Process';
import { getCar } from '@/lib/cars';
import { t } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Contact', description: t.contactPage.body, alternates: { canonical: '/contact' } };

export default function ContactPage() {
  const img = getCar('aston-martin-valiant')?.image;
  return (
    <div className="pt-[72px] md:pt-[84px]">
      <ContactPanel as="h1" image={img ? { src: img, width: 1800, height: 1125, alt: '' } : undefined} title={t.contactPage.title} body={t.contactPage.body} source="contact" />
      <Process />
    </div>
  );
}
