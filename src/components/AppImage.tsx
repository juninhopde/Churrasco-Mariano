import type { Photo } from '../data/images';
import { url } from '../data/images';
import { ImagePlaceholder } from './ImagePlaceholder';

interface AppImageProps {
  /** Sem foto, cai no placeholder identificado. */
  photo?: Photo;
  /** Proporção via classe Tailwind, ex.: 'aspect-[4/3]' */
  aspect?: string;
  className?: string;
  /** Largura de referência para pedir o tamanho certo ao CDN. */
  width?: number;
  /** true na foto acima da dobra: carrega imediatamente, sem lazy. */
  priority?: boolean;
  /** Texto do placeholder quando não há foto. */
  placeholderLabel?: string;
  placeholderFolder?: string;
}

export const AppImage = ({
  photo,
  aspect = 'aspect-[4/3]',
  className = '',
  width = 900,
  priority = false,
  placeholderLabel = 'Foto',
  placeholderFolder = 'src/assets/',
}: AppImageProps) => {
  if (!photo) {
    return <ImagePlaceholder label={placeholderLabel} folder={placeholderFolder} aspect={aspect} className={className} />;
  }

  const imgSrc = photo.localSrc ?? url(photo, width);

  return (
    <img
      src={imgSrc}
      {...(photo.localSrc ? {} : {
        srcSet: `${url(photo, Math.round(width / 2))} ${Math.round(width / 2)}w, ${url(photo, width)} ${width}w, ${url(photo, width * 2)} ${width * 2}w`,
        sizes: '(max-width: 640px) 100vw, 50vw',
      })}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={`${aspect} w-full object-cover ${className}`}
    />
  );
};
