import Image from 'next/image';
import type { ReactNode } from 'react';
import { ContactForm, type FormSource } from '@/components/ui/ContactForm';
import { media, type Media } from '@/lib/media';
import { t } from '@/lib/i18n';

type Props = {
  id?: string;
  image?: Media | { src: string; width: number; height: number; alt: string };
  title?: string;
  body?: ReactNode;
  source?: FormSource;
  subject?: string;
  interest?: keyof typeof t.form.interests;
  showInterest?: boolean;
  submitLabel?: string;
  as?: 'h1' | 'h2';
};

/** Panneau contact : visuel plein cadre, formulaire en verre dépoli à droite (référence client). */
export function ContactPanel({ id, image = media.tailLight, title = t.home.contact.title, body = t.home.contact.body, source = 'home', subject, interest, showInterest, submitLabel, as: H = 'h2' }: Props) {
  return (
    <section id={id} className="panel min-h-[100svh] md:min-h-0">
      <div className="absolute inset-0 -z-10" data-parallax="3">
        <Image src={image.src} alt="" fill sizes="100vw" quality={80} className="grade object-cover object-[30%_50%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,2,2,0)_35%,rgba(2,2,2,0.55))]" />
      </div>
      <div className="flex min-h-[inherit] items-end p-3 md:min-h-[760px] md:items-center md:justify-end md:p-6 xl:p-8">
        <div data-reveal="fade" className="glass w-full p-6 md:max-w-[480px] md:p-9">
          <H className="text-[clamp(26px,2.6vw,36px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink">{title}</H>
          {body && <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{body}</p>}
          <div className="mt-7">
            <ContactForm source={source} subject={subject} interest={interest} showInterest={showInterest} submitLabel={submitLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
