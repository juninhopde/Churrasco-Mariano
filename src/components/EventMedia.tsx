import type { EventMediaFile } from '../data/video';

interface EventMediaProps {
  media: EventMediaFile;
  /** Descrição para leitores de tela. */
  alt: string;
}

const frame = 'mx-auto block h-auto max-h-[75svh] w-auto max-w-full rounded-lg shadow-sm';

/**
 * GIF/WebP (imagem animada) ou MP4/WebM (vídeo em loop, sem som, que toca sozinho).
 * O tamanho segue a proporção do arquivo; retrato nunca passa de 75% da altura da tela.
 */
export const EventMedia = ({ media, alt }: EventMediaProps) => {
  if (media.kind === 'image') {
    return <img src={media.src} alt={alt} loading="lazy" decoding="async" className={frame} />;
  }

  // Quem pediu menos movimento no sistema recebe o vídeo parado, com controles.
  const reduceMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <video
      src={media.src}
      aria-label={alt}
      className={frame}
      muted
      loop
      playsInline
      preload="metadata"
      autoPlay={!reduceMotion}
      controls={reduceMotion}
    />
  );
};
