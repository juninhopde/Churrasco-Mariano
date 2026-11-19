import { useEffect, useRef, useState } from 'react';

interface InstagramEmbedProps {
  /** Link de um post ou reel público, ex.: https://www.instagram.com/p/XXXX/ */
  postUrl: string;
  title: string;
}

const POST_RE = /instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/;

/** Link do post → link da versão incorporável. Devolve null se não parecer um post do Instagram. */
export const instagramEmbedUrl = (postUrl: string): string | null => {
  const m = POST_RE.exec(postUrl);
  return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed/` : null;
};

/** Altura inicial, até o Instagram informar a altura real do post. */
const INITIAL_HEIGHT = 640;

/**
 * Incorpora um post do Instagram (versão oficial /embed/).
 * - Carrega só quando chega perto da tela (loading="lazy").
 * - O iframe roda isolado (sandbox), sem acesso à página do site.
 * - O Instagram informa por mensagem a altura real do conteúdo; usamos isso para o quadro
 *   não ficar com barra de rolagem nem com espaço sobrando.
 */
export const InstagramEmbed = ({ postUrl, title }: InstagramEmbedProps) => {
  const src = instagramEmbedUrl(postUrl);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(INITIAL_HEIGHT);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.instagram.com') return;
      if (event.source !== frameRef.current?.contentWindow) return;
      try {
        const data: unknown = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        const h = (data as { type?: string; details?: { height?: unknown } } | null)?.details?.height;
        if ((data as { type?: string } | null)?.type === 'MEASURE' && typeof h === 'number' && h > 0) {
          setHeight(Math.round(h));
        }
      } catch {
        /* mensagem que não é JSON: ignora */
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  if (!src) return null;

  return (
    <div className="mx-auto w-full max-w-[380px] overflow-hidden rounded-lg border border-carvao/10 bg-white shadow-sm">
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        loading="lazy"
        scrolling="no"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
        style={{ height }}
        className="block w-full border-0"
      />
    </div>
  );
};
