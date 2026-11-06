'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { t } from '@/lib/i18n';

const phoneOrEmail = z
  .string()
  .trim()
  .refine((v) => z.email().safeParse(v).success || /^\+?[0-9 ().-]{8,20}$/.test(v), t.form.errors.contact);

const Schema = z.object({
  name: z.string().trim().min(2, t.form.errors.name).max(120),
  contact: phoneOrEmail,
  preferred: z.enum(['whatsapp', 'phone', 'email']),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal('on', { error: t.form.errors.consent }),
  source: z.enum(['contact', 'off-market', 'vehicle', 'home']).default('contact'),
  vehicle: z.string().max(120).optional(),
  website: z.string().max(0).optional(), // honeypot : doit rester vide
});

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  errors?: Partial<Record<'name' | 'contact' | 'consent', string>>;
  values?: Record<string, string>;
};

export async function sendContact(_: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;

  // Honeypot rempli : on répond « succès » sans rien envoyer
  if (raw.website) return { status: 'success' };

  const parsed = Schema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactState['errors'] = {};
    for (const issue of parsed.error.issues) {
      const k = issue.path[0] as 'name' | 'contact' | 'consent';
      if (!errors[k]) errors[k] = issue.message;
    }
    return { status: 'error', errors, values: raw };
  }

  const d = parsed.data;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // TODO : renseigner les identifiants Infomaniak dans .env (voir .env.example)
    console.warn('[contact] SMTP non configuré, demande non envoyée :', { ...d, contact: '***' });
    return process.env.NODE_ENV === 'production' ? { status: 'error', values: raw } : { status: 'success' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 465),
      secure: Number(SMTP_PORT ?? 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    const pref = { whatsapp: 'WhatsApp', phone: 'Téléphone', email: 'E-mail' }[d.preferred];
    const subject = `[MAYRAL] ${d.source === 'off-market' ? 'Demande d’accès off-market' : 'Nouvelle demande'}${d.vehicle ? ` — ${d.vehicle}` : ''}`;
    const text = [
      `Nom : ${d.name}`,
      `Contact : ${d.contact}`,
      `Moyen préféré : ${pref}`,
      `Origine : ${d.source}${d.vehicle ? ` (${d.vehicle})` : ''}`,
      d.message ? `\nMessage :\n${d.message}` : '',
      `\nConsentement RGPD : oui (${new Date().toISOString()})`,
    ].join('\n');
    await transporter.sendMail({
      from: `"MAYRAL — Site" <${SMTP_USER}>`,
      to: CONTACT_TO ?? SMTP_USER,
      replyTo: z.email().safeParse(d.contact).success ? d.contact : undefined,
      subject,
      text,
    });
    return { status: 'success' };
  } catch (e) {
    console.error('[contact] échec SMTP', e);
    return { status: 'error', values: raw };
  }
}
