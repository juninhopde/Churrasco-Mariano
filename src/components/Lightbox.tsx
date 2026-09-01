import { useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '../data/gallery';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { url } from '../data/images';

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export const Lightbox = ({ images, index, onClose, onChange }: LightboxProps) => {
  const isOpen = index !== null;
  useLockBodyScroll(isOpen);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onChange]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % images.length);
  }, [index, images.length, onChange]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, goPrev, goNext]);

  if (index === null) return null;
  const image = images[index];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} de ${images.length}: ${image.photo.alt}`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar galeria"
        className="absolute right-4 top-4 rounded p-2 text-creme transition-colors hover:text-dourado focus-visible:outline focus-visible:outline-2 focus-visible:outline-dourado"
      >
        <X className="h-7 w-7" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Foto anterior"
        className="absolute left-2 rounded-full bg-black/40 p-3 text-creme transition-colors hover:bg-fogo focus-visible:outline focus-visible:outline-2 focus-visible:outline-dourado sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" aria-hidden="true" />
      </button>

      <figure className="max-h-[80vh] w-full max-w-3xl">
        <img
          src={url(image.photo, 1400)}
          alt={image.photo.alt}
          className="max-h-[75vh] w-full object-contain"
        />
        <figcaption className="mt-3 text-center text-sm text-creme/70">
          {image.photo.alt} — {index + 1}/{images.length}
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={goNext}
        aria-label="Próxima foto"
        className="absolute right-2 rounded-full bg-black/40 p-3 text-creme transition-colors hover:bg-fogo focus-visible:outline focus-visible:outline-2 focus-visible:outline-dourado sm:right-6"
      >
        <ChevronRight className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};
