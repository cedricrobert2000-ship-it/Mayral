import Image from 'next/image';
import type { Media } from '@/lib/media';

type Props = {
  image: Media;
  sizes: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  priority?: boolean;
  parallax?: boolean;
  delay?: number;
  position?: string;
};

/** Image révélée au défilement par clip-path, avec parallaxe très faible optionnelle. */
export function RevealImage({ image, sizes, className = '', imgClassName = '', ratio, priority, parallax, delay, position }: Props) {
  return (
    <div
      data-reveal="image"
      data-delay={delay}
      className={`relative overflow-hidden rounded-card bg-elevated ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <div className={`absolute ${parallax ? '-inset-y-[6%] inset-x-0' : 'inset-0'}`} data-parallax={parallax ? '5' : undefined}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          quality={80}
          priority={priority}
          className={`object-cover ${imgClassName}`}
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
    </div>
  );
}
