import { photos } from './images';
import type { Photo } from './images';

/**
 * GALERIA
 * Para usar SUAS fotos: salve em src/assets/gallery/, importe o arquivo e troque
 * o campo `photo` por `{ id: '', alt: '...', credit: 'próprio' }` + `src`.
 * Veja o passo a passo no README.
 */
export interface GalleryImage {
  id: string;
  photo: Photo;
  span: 'big' | 'tall' | 'wide' | 'small';
}

export const galleryImages: GalleryImage[] = [
  { id: 'g1', photo: photos.carneNaGrelha, span: 'big' },
  { id: 'g2', photo: photos.carneFatiada, span: 'small' },
  { id: 'g3', photo: photos.brasaAlta, span: 'tall' },
  { id: 'g4', photo: photos.cortandoNaTabua, span: 'small' },
  { id: 'g5', photo: photos.mesaServida, span: 'wide' },
  { id: 'g6', photo: photos.bifeNoFogo, span: 'small' },
  { id: 'g7', photo: photos.picanhaNaBrasa, span: 'wide' },
];
