/** Bandeau défilant lent, en lettres détourées. */
export function Marquee({ words }: { words: readonly string[] }) {
  const row = (
    <span className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="marquee-outline px-8 text-[clamp(56px,11vw,180px)] font-light leading-none tracking-[-0.04em] md:px-14">{w}</span>
          <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent shadow-[0_0_14px_3px_rgba(255,90,78,0.45)]" />
        </span>
      ))}
    </span>
  );
  return (
    <div className="overflow-hidden py-6" aria-label={words.join(', ')} role="img">
      <div className="marquee" aria-hidden>{row}{row}</div>
    </div>
  );
}
