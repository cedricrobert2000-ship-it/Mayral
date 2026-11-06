import type { ReactNode } from 'react';
import { RevealImage } from '@/components/ui/RevealImage';
import type { Media } from '@/lib/media';

type Props = { image: Media; label?: ReactNode; title: string; children?: ReactNode; reverse?: boolean; ratio?: string };

/** Image macro + texte, décalés sur la grille. */
export function EditorialBlock({ image, label, title, children, reverse, ratio = '4/3' }: Props) {
  return (
    <div className="grid-page items-center gap-y-12">
      <div className={`col-span-4 md:col-span-8 xl:col-span-7 ${reverse ? 'xl:col-start-6 xl:row-start-1' : ''}`}>
        <RevealImage image={image} ratio={ratio} sizes="(min-width: 1280px) 58vw, (min-width: 768px) 62vw, 100vw" parallax />
      </div>
      <div className={`col-span-4 md:col-span-6 xl:col-span-4 ${reverse ? 'xl:col-start-1 xl:row-start-1' : 'xl:col-start-9'}`}>
        {label}
        <h2 data-reveal="text" className="mt-6 text-display-l text-ink">{title}</h2>
        {children && <div data-reveal="fade" className="mt-6 space-y-4 text-body-l text-ink-2">{children}</div>}
      </div>
    </div>
  );
}
