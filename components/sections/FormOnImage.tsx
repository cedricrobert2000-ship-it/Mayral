import Image from 'next/image';
import type { ReactNode } from 'react';
import { ContactForm } from '@/components/ui/ContactForm';
import { media, type Media } from '@/lib/media';

type Props = {
  id?: string;
  image?: Media;
  label?: ReactNode;
  title: string;
  body?: ReactNode;
  source?: 'contact' | 'off-market' | 'vehicle' | 'home';
  vehicle?: string;
  submitLabel?: string;
  as?: 'h1' | 'h2';
};

/** Formulaire sur image : l'image à gauche, le formulaire à droite sur overlay.side. */
export function FormOnImage({ id, image = media.rearThreeQuarter, label, title, body, source, vehicle, submitLabel, as: H = 'h2' }: Props) {
  return (
    <section id={id} className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 xl:-inset-y-[5%]" data-parallax="4">
          <Image src={image.src} alt="" fill sizes="100vw" quality={80} className="object-cover object-[20%_50%] opacity-70 xl:opacity-100" />
        </div>
        <div className="absolute inset-0 hidden xl:block" style={{ background: 'var(--overlay-side)' }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,3,4,0.55),rgba(5,3,4,0.92)_55%)] xl:hidden" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />
      </div>
      <div className="shell grid-page section-y min-h-[100svh] items-center">
        <div className="col-span-4 md:col-span-6 md:col-start-2 xl:col-span-4 xl:col-start-9">
          {label}
          <H data-reveal="text" className="mt-6 text-display-l text-ink">{title}</H>
          {body && <p data-reveal="fade" className="mt-5 text-body-l text-ink-2">{body}</p>}
          <div data-reveal="fade" className="mt-10">
            <ContactForm source={source} vehicle={vehicle} submitLabel={submitLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
