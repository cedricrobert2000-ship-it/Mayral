import { Logo } from '@/components/ui/Logo';

/**
 * Loader d'entrée : le logo se dessine (≈ 1,45 s), une seule fois par session.
 * Animation 100 % CSS (voir globals.css) pilotée par le script de démarrage du layout :
 * aucun JavaScript à attendre, le hero reste rapide.
 */
export function Loader() {
  return (
    <div className="loader fixed inset-0 z-[70] items-center justify-center bg-canvas" aria-hidden>
      <div className="flex w-[min(62vw,360px)] flex-col items-center gap-6">
        <Logo draw className="w-full text-ink" />
        <span className="light-line loader-line w-full origin-center" />
      </div>
    </div>
  );
}
