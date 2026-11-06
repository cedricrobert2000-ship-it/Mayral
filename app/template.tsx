/** Rideau noir joué à chaque changement de page (pas au premier chargement). */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="curtain"><span className="light-line" /></div>
      {children}
    </>
  );
}
