'use client';

import { useActionState, useId } from 'react';
import Link from 'next/link';
import { sendContact, type ContactState } from '@/app/actions/contact';
import { Button } from '@/components/ui/Button';
import { t } from '@/lib/i18n';

type Props = { source?: 'contact' | 'off-market' | 'vehicle' | 'home'; vehicle?: string; submitLabel?: string };

const field =
  'peer w-full rounded-card border border-line-strong bg-canvas/40 px-4 pt-6 pb-2.5 text-ink outline-none backdrop-blur-md transition-colors duration-200 placeholder:text-transparent hover:border-ink/40 focus:border-ink/70 focus-visible:outline-none aria-[invalid=true]:border-error';
const floating =
  'pointer-events-none absolute left-4 top-4 origin-left text-ink-muted transition-transform duration-200 ease-out peer-focus:-translate-y-2.5 peer-focus:scale-[0.78] peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.78]';

export function ContactForm({ source = 'contact', vehicle, submitLabel }: Props) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: 'idle' });
  const id = useId();
  const v = state.values ?? {};
  const err = state.errors ?? {};

  if (state.status === 'success') {
    return (
      <div role="status" className="rounded-card border border-line bg-canvas/50 p-8 backdrop-blur-md">
        <span aria-hidden className="light-line mb-6 block w-16" />
        <p className="text-heading text-ink">{t.form.success}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-4">
      <input type="hidden" name="source" value={source} />
      {vehicle && <input type="hidden" name="vehicle" value={vehicle} />}
      {/* Honeypot anti-spam : invisible pour les humains */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-website`}>Site web</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="relative">
        <input id={`${id}-name`} name="name" autoComplete="name" placeholder=" " defaultValue={v.name} required aria-invalid={!!err.name} aria-describedby={err.name ? `${id}-name-e` : undefined} className={field} />
        <label htmlFor={`${id}-name`} className={floating}>{t.form.name}</label>
        {err.name && <p id={`${id}-name-e`} className="mt-2 text-[13px] text-error">{err.name}</p>}
      </div>

      <div className="relative">
        <input id={`${id}-contact`} name="contact" autoComplete="email" inputMode="email" placeholder=" " defaultValue={v.contact} required aria-invalid={!!err.contact} aria-describedby={err.contact ? `${id}-contact-e` : undefined} className={field} />
        <label htmlFor={`${id}-contact`} className={floating}>{t.form.contact}</label>
        {err.contact && <p id={`${id}-contact-e`} className="mt-2 text-[13px] text-error">{err.contact}</p>}
      </div>

      <div className="relative">
        <textarea id={`${id}-message`} name="message" rows={3} placeholder=" " defaultValue={v.message} className={`${field} resize-none`} />
        <label htmlFor={`${id}-message`} className={floating}>{t.form.message}</label>
      </div>

      <fieldset className="pt-2">
        <legend className="label mb-3 text-ink-muted">{t.form.preferred}</legend>
        <div className="flex flex-wrap gap-2">
          {(['whatsapp', 'phone', 'email'] as const).map((k, i) => (
            <label key={k} className="relative cursor-pointer">
              <input type="radio" name="preferred" value={k} defaultChecked={v.preferred ? v.preferred === k : i === 0} className="peer sr-only" />
              <span className="inline-flex h-10 items-center rounded-pill border border-line-strong px-5 text-[14px] text-ink-2 transition-colors duration-200 hover:border-ink/40 peer-checked:border-white-50 peer-checked:bg-white-50 peer-checked:text-black-1000 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus">
                {t.form[k]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="pt-2">
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink-2">
          <input type="checkbox" name="consent" defaultChecked={v.consent === 'on'} aria-invalid={!!err.consent} className="peer sr-only" />
          <span aria-hidden className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-[4px] border border-line-strong transition-colors peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus peer-aria-[invalid=true]:border-error [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
            <svg viewBox="0 0 12 12" className="size-2.5"><path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
          </span>
          <span>
            {t.form.consent}{' '}
            <Link href="/confidentialite" className="underline decoration-line-strong underline-offset-4 hover:text-ink">{t.form.privacy}</Link>
          </span>
        </label>
        {err.consent && <p className="mt-2 text-[13px] text-error">{err.consent}</p>}
      </div>

      {state.status === 'error' && !state.errors && <p role="alert" className="text-[14px] text-error">{t.form.error}</p>}

      <div className="pt-4">
        <Button type="submit" variant="accent" arrow disabled={pending} className="w-full md:w-auto">
          {pending ? t.form.sending : (submitLabel ?? t.form.submit)}
        </Button>
      </div>
    </form>
  );
}
