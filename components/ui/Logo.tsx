import { LOGO_H, LOGO_LETTERS, LOGO_SUB, LOGO_W, MONOGRAM } from '@/lib/logo-paths';

type Props = { withSignature?: boolean; className?: string; title?: string; draw?: boolean };

/** Wordmark MAYRAL (direction 1). `draw` prépare les tracés pour l'animation du loader. */
export function Logo({ withSignature = true, className, title = 'MAYRAL Private Office', draw }: Props) {
  const h = withSignature ? LOGO_H : 100;
  return (
    <svg viewBox={`0 0 ${LOGO_W} ${h}`} className={className} role="img" aria-label={title} fill="currentColor">
      {LOGO_LETTERS.map((l, i) => (
        <path
          key={i}
          transform={`translate(${l.x} 0)`}
          d={l.d}
          {...(draw && { pathLength: 1, className: 'logo-stroke', style: { ['--i' as string]: i } })}
        />
      ))}
      {withSignature && <path d={LOGO_SUB} className={draw ? 'logo-sub' : undefined} />}
    </svg>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 100" className={className} aria-hidden fill="currentColor">
      <path d={MONOGRAM} />
    </svg>
  );
}
