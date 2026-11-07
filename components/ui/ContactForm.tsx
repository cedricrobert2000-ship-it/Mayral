'use client';

import { useActionState, useId } from 'react';
import Link from 'next/link';
import { sendContact, type ContactState } from '@/app/actions/contact';
import { Button } from '@/components/ui/Button';
import { t } from '@/lib/i18n';

export type FormSource = 'contact' | 'home' | 'car' | 'estate' | 'sell' | 'find' | 'service';
type Interest = keyof typeof t.form.interests;
type Props = { source?: FormSource; subject?: string; submitLabel?: string; interest?: Interest; showInterest?: boolean; showMessage?: boolean };

export function ContactForm({ source = 'contact', subject, submitLabel, interest, showInterest = true, showMessage = true }: Props) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: 'idle' });
  const id = useId();
  const v = state.values ?? {};
  const err = state.errors ?? {};

  if (state.status === 'success') {
    return (
      <div role="status" className="py-6">
        <span aria-hidden className="light-line mb-6 block w-16" />
        <p className="text-heading text-ink">{t.form.success}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-3">
      <input type="hidden" name="source" value={source} />
      {subject && <input type="hidden" name="subject" value={subject} />}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-website`}>Site web</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor={`${id}-name`} className="sr-only">{t.form.name}</label>
        <input id={`${id}-name`} name="name" autoComplete="name" placeholder={t.form.name} defaultValue={v.name} required aria-invalid={!!err.name} aria-describedby={err.name ? `${id}-name-e` : undefined} className="field" />
        {err.name && <p id={`${id}-name-e`} className="mt-2 pl-5 text-[13px] text-error">{err.name}</p>}
      </div>
      <div>
        <label htmlFor={`${id}-contact`} className="sr-only">{t.form.contact}</label>
        <input id={`${id}-contact`} name="contact" autoComplete="email" placeholder={t.form.contact} defaultValue={v.contact} required aria-invalid={!!err.contact} aria-describedby={err.contact ? `${id}-contact-e` : undefined} className="field" />
        {err.contact && <p id={`${id}-contact-e`} className="mt-2 pl-5 text-[13px] text-error">{err.contact}</p>}
      </div>
      {showInterest && (
        <div>
          <label htmlFor={`${id}-interest`} className="sr-only">{t.form.interest}</label>
          <select id={`${id}-interest`} name="interest" defaultValue={v.interest ?? interest ?? 'car'} className="field">
            {(Object.keys(t.form.interests) as Interest[]).map((k) => (
              <option key={k} value={k}>{t.form.interests[k]}</option>
            ))}
          </select>
        </div>
      )}
      {!showInterest && interest && <input type="hidden" name="interest" value={interest} />}
      {showMessage && (
        <div>
          <label htmlFor={`${id}-message`} className="sr-only">{t.form.message}</label>
          <textarea id={`${id}-message`} name="message" rows={3} placeholder={t.form.message} defaultValue={v.message} className="field" />
        </div>
      )}

      <fieldset className="pt-2">
        <legend className="mb-3 text-[13px] text-ink-2">{t.form.preferred}</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {(['whatsapp', 'phone', 'email'] as const).map((k, i) => (
            <label key={k} className="flex cursor-pointer items-center gap-2.5 text-[14px] text-ink">
              <input type="radio" name="preferred" value={k} defaultChecked={v.preferred ? v.preferred === k : i === 0} className="peer sr-only" />
              <span aria-hidden className="relative size-4 rounded-full border border-ink/50 transition-colors after:absolute after:inset-[3px] after:scale-0 after:rounded-full after:bg-ink after:transition-transform peer-checked:border-ink peer-checked:after:scale-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus" />
              {t.form[k]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="pt-3">
        <Button type="submit" variant="red" disabled={pending} className="w-full">
          {pending ? t.form.sending : (submitLabel ?? t.form.submit)}
        </Button>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink-2">
          <input type="checkbox" name="consent" defaultChecked={v.consent === 'on'} aria-invalid={!!err.consent} className="peer sr-only" />
          <span aria-hidden className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[3px] border border-ink/50 transition-colors peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus peer-aria-[invalid=true]:border-error [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
            <svg viewBox="0 0 12 12" className="size-2.5"><path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
          </span>
          <span>
            {t.form.consent}{' '}
            <Link href="/confidentialite" className="underline decoration-ink/30 underline-offset-4 hover:text-ink">{t.form.privacy}</Link>
          </span>
        </label>
        {err.consent && <p className="mt-2 text-[13px] text-error">{err.consent}</p>}
      </div>

      {state.status === 'error' && !state.errors && <p role="alert" className="text-[14px] text-error">{t.form.error}</p>}
    </form>
  );
}
