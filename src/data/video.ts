/**
 * VÍDEO / GIF DO EVENTO (seção Galeria).
 *
 * Há duas formas, nesta ordem de prioridade:
 *
 * 1) ARQUIVO PRÓPRIO (melhor): coloque UM arquivo .gif, .webp, .mp4 ou .webm na pasta
 *    src/assets/evento/ e rode o build. Ele aparece direto no site, em loop e sem som.
 *    - .mp4/.webm: toca sozinho, em loop, e é 5 a 20 vezes mais leve que um GIF do mesmo clipe.
 *    - .gif: funciona, mas pesa. Mantenha abaixo de uns 5 MB (5 a 8 segundos, largura até 720 px).
 *
 * 2) LINK DO INSTAGRAM (usado só se NÃO houver arquivo na pasta): cole o link de um post/reel
 *    PÚBLICO. O site mostra a capa e, ao tocar no play, o Instagram abre em outra aba.
 *    Deixe vazio ('') para esconder o vídeo.
 *
 * Havendo arquivo próprio, o link do Instagram vira o botão "Ver vídeo completo".
 */
export const eventVideo = {
  instagramUrl: 'https://www.instagram.com/p/DfyJZHDR7uD/',
  title: 'Vídeo de um evento real do Mariano Churrasco',
} as const;

// O Vite resolve isto na hora do build: pasta vazia = nenhum arquivo = sem requisição quebrada.
const files = import.meta.glob('../assets/evento/*.{gif,webp,mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const first = Object.entries(files).sort(([a], [b]) => a.localeCompare(b))[0];

export interface EventMediaFile {
  src: string;
  kind: 'image' | 'video';
}

export const eventMedia: EventMediaFile | null = first
  ? { src: first[1], kind: /\.(mp4|webm)$/i.test(first[0]) ? 'video' : 'image' }
  : null;
