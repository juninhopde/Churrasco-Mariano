import { Flame } from 'lucide-react';

/**
 * Faixa de destaques em movimento (letreiro). Edite a lista à vontade — são os fatos que antes
 * ficavam parados no fim do topo.
 */
const ITEMS = [
  'Churrasqueiro profissional',
  'Buffet completo',
  '5 anos de experiência',
  '10 a 300 convidados',
  'Bragança Paulista e região',
  'Resposta no mesmo dia',
  'Orçamento pelo WhatsApp',
];

const Row = ({ duplicate = false }: { duplicate?: boolean }) => (
  <ul
    className={`flex shrink-0 items-center ${duplicate ? 'marquee-dup' : ''}`}
    aria-hidden={duplicate || undefined}
  >
    {ITEMS.map((item) => (
      <li
        key={item}
        className="flex items-center gap-4 whitespace-nowrap px-5 text-sm font-bold uppercase tracking-wider sm:text-base"
      >
        {item}
        <Flame className="h-4 w-4 shrink-0 text-dourado" aria-hidden="true" />
      </li>
    ))}
  </ul>
);

/**
 * O trilho tem duas cópias idênticas lado a lado e desliza exatamente metade (-50%), então o
 * recomeço é invisível. A cópia é escondida de leitores de tela. Passar o mouse pausa.
 * Com "menos movimento" no sistema, vira uma linha parada (ver index.css).
 */
export const Ticker = () => (
  <section aria-label="Destaques" className="marquee overflow-hidden bg-fogo py-3.5 text-white">
    <div className="marquee-track">
      <Row />
      <Row duplicate />
    </div>
  </section>
);
