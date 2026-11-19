import { photos } from './images';
import type { Photo } from './images';

/**
 * GALERIA — fotos do último evento (próprias; definidas em src/data/images.ts).
 *
 * Para trocar uma foto: salve o novo arquivo em src/assets/gallery/ com o MESMO nome e rode o
 * build. Use JPG/WebP de pelo menos 1200 px de largura: as atuais têm só ~490 px e ficam um
 * pouco suaves quando ampliadas.
 */
export interface GalleryImage {
  id: string;
  photo: Photo;
  span: 'big' | 'tall' | 'wide' | 'small';
}

/**
 * Cinco fotos de propósito: no desktop elas preenchem uma grade de 4 colunas × 2 linhas
 * sem deixar buracos (1 grande 2×2 + 4 pequenas). Ao trocar a quantidade, refaça o encaixe:
 * a soma das áreas (grande = 4, alta = 2, larga = 2, pequena = 1) deve fechar a grade.
 */
export const galleryImages: GalleryImage[] = [
  { id: 'g1', span: 'big', photo: photos.eventoBuffet },
  { id: 'g2', span: 'small', photo: photos.eventoLinguicaFaca },
  { id: 'g3', span: 'small', photo: photos.eventoEquipeTabua },
  { id: 'g4', span: 'small', photo: photos.eventoChurrasqueira },
  { id: 'g5', span: 'small', photo: photos.eventoSaladas },
];
