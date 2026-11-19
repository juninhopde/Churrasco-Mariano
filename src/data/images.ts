/**
 * FOTOS DO SITE
 *
 * Todas do Unsplash, sob a Unsplash License: uso comercial liberado, sem
 * necessidade de atribuição (https://unsplash.com/license). O crédito abaixo
 * é cortesia, não obrigação.
 *
 * ⚠️ Isto é uma solução temporária. Foto de banco de imagem é reconhecida pelo
 * cliente e converte menos que foto sua. Assim que tiver fotos dos seus eventos,
 * troque: salve em src/assets/gallery/ e importe no lugar da URL. Veja o README.
 *
 * O CDN do Unsplash redimensiona pela URL, então pedimos exatamente o tamanho
 * necessário em cada lugar — nada de baixar 3000px para exibir 400px.
 */

import marianoAvatar from '../assets/hero/mariano-avatar.jpg';
import eventoBuffetImg from '../assets/gallery/evento-01-buffet.jpg';
import eventoLinguicaFacaImg from '../assets/gallery/evento-02-linguica-faca.jpg';
import eventoEquipeTabuaImg from '../assets/gallery/evento-03-equipe-tabua.jpg';
import eventoChurrasqueiraImg from '../assets/gallery/evento-04-churrasqueira.jpg';
import eventoSaladasImg from '../assets/gallery/evento-05-saladas.jpg';

export interface Photo {
  /** ID da foto no CDN do Unsplash (vazio se for arquivo local) */
  id: string;
  alt: string;
  /** Autor, para crédito opcional */
  credit: string;
  /** Caminho local importado — quando presente, ignora o CDN do Unsplash */
  localSrc?: string;
  /** Ponto de enquadramento do recorte (CSS object-position), ex.: '50% 25%' para manter o rosto. */
  position?: string;
}

export const url = (photo: Photo, width: number): string =>
  photo.localSrc ?? `https://images.unsplash.com/${photo.id}?auto=format&fit=crop&q=70&w=${width}`;

export const photos = {
  heroChurrasqueiro: {
    id: 'photo-1558030089-02acba3c214e',
    alt: 'Churrasqueiro assando carne na grelha sobre o carvão',
    credit: 'Emerson Vieira / Unsplash',
  },
  carneNaGrelha: {
    id: 'photo-1627843337825-9c1ba8d21669',
    alt: 'Carne assando na grelha sobre carvão em brasa',
    credit: 'Samuel Regan-Asante / Unsplash',
  },
  pegadorNaBrasa: {
    id: 'photo-1508615263227-c5d58c1e5821',
    alt: 'Pegador virando carne na grelha com o fogo alto',
    credit: 'Paul Hermann / Unsplash',
  },
  carneFatiada: {
    id: 'photo-1558030006-450675393462',
    alt: 'Carne assada fatiada, pronta para servir',
    credit: 'Emerson Vieira / Unsplash',
  },
  cortandoNaTabua: {
    id: 'photo-1529692236671-f1f6cf9683ba',
    alt: 'Churrasqueiro fatiando a carne na tábua de madeira',
    credit: 'José Ignacio Pompé / Unsplash',
  },
  grelhaCheia: {
    id: 'photo-1616252980327-ec70572e5df9',
    alt: 'Grelha cheia de carne assando sobre carvão',
    credit: 'Iulia Buta / Unsplash',
  },
  brasaAlta: {
    id: 'photo-1627947063935-55577ec3c2e1',
    alt: 'Churrasqueiro cuidando da carne com o fogo alto',
    credit: 'Rafael Hoyos Weht / Unsplash',
  },
  bifeNoFogo: {
    id: 'photo-1614119068601-483274e9dcb7',
    alt: 'Bife sendo levantado com pegador sobre a churrasqueira em chamas',
    credit: 'Matt Connor / Unsplash',
  },
  mesaServida: {
    id: 'photo-1555939594-58d7cb561ad1',
    alt: 'Mesa servida com carne assada e acompanhamentos',
    credit: 'Victoria Shes / Unsplash',
  },
  costelaEAcompanhamentos: {
    id: 'photo-1544025162-d76694265947',
    alt: 'Costela assada servida com tomate e batatas',
    credit: 'Alexandru-Bogdan Ghita / Unsplash',
  },
  pratoMontado: {
    id: 'photo-1633436375795-12b3b339712f',
    alt: 'Prato montado com carne e legumes',
    credit: 'Parnis Azimi / Unsplash',
  },
  grelhaDeCima: {
    id: 'photo-1708388464878-5df2d66b758e',
    alt: 'Vista de cima da grelha com carne e linguiça assando',
    credit: 'Daniel / Unsplash',
  },

  picanhaNaBrasa: {
    id: 'photo-1594041680534-e8c8cdebd659',
    alt: 'Picanha assando na grelha com brasa alta',
    credit: 'Loija Nguyen / Unsplash',
  },
  churrasqueiroServindo: {
    id: '',
    alt: 'Mariano — Churrasco do Mariano, Mestre do Fogo',
    credit: 'Próprio',
    localSrc: marianoAvatar,
    position: '50% 22%',
  },
  buffetMontado: {
    id: 'photo-1504674900247-0877df9cc836',
    alt: 'Mesa com pratos de carne e acompanhamentos servidos',
    credit: 'Lily Banse / Unsplash',
  },

  // ── Fotos PRÓPRIAS do último evento (arquivos em src/assets/gallery/) ──────────────
  eventoBuffet: {
    id: '',
    alt: 'Equipe servindo o buffet em cubas aquecidas, com arroz e farofa',
    credit: 'Próprio',
    localSrc: eventoBuffetImg,
  },
  eventoLinguicaFaca: {
    id: '',
    alt: 'Linguiça sendo fatiada na tábua, com a faca gravada com o nome Mariano',
    credit: 'Próprio',
    localSrc: eventoLinguicaFacaImg,
  },
  eventoEquipeTabua: {
    id: '',
    alt: 'Equipe de luvas fatiando linguiça na tábua, ao lado das saladas',
    credit: 'Próprio',
    localSrc: eventoEquipeTabuaImg,
  },
  eventoChurrasqueira: {
    id: '',
    alt: 'Linguiças, frango e bacon assando na churrasqueira de tijolos',
    credit: 'Próprio',
    localSrc: eventoChurrasqueiraImg,
  },
  eventoSaladas: {
    id: '',
    alt: 'Travessas de salada com alface, tomate, pepino e cebola no balcão do buffet',
    credit: 'Próprio',
    localSrc: eventoSaladasImg,
  },
} satisfies Record<string, Photo>;
