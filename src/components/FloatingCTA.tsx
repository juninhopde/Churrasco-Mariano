import { useEffect, useState } from 'react';
import { buildWhatsAppUrl, DEFAULT_MESSAGE } from '../utils/whatsapp';
import { goToQuote } from '../utils/scroll';
import { WhatsAppIcon } from './WhatsAppIcon';

/**
 * Atalho fixo para pedir orçamento.
 * - Celular: barra baixa com "Pedir orçamento" + ícone do WhatsApp.
 * - Computador: só o botão redondo do WhatsApp, no canto.
 * Some enquanto o formulário está na tela, para não cobrir os campos.
 */
export const FloatingCTA = () => {
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById('orcamento');
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      // `invisible` (visibility:hidden) tira o atalho do clique, do teclado e do leitor de tela
      // enquanto o formulário está na tela — só opacidade deixaria um botão invisível clicável.
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center gap-2 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-300 sm:inset-x-auto sm:right-5 sm:justify-end sm:px-0 sm:pb-5 ${
        formVisible ? 'invisible translate-y-4 opacity-0' : 'visible translate-y-0 opacity-100'
      }`}
    >
      <a
        href="#orcamento"
        onClick={(e) => {
          e.preventDefault();
          goToQuote();
        }}
        className="btn-shine btn-pulse pointer-events-auto flex min-h-[3rem] max-w-[16rem] flex-1 items-center justify-center rounded-full bg-fogo px-5 text-base font-semibold text-white shadow-lg shadow-black/30 transition-colors hover:bg-[#8c2818] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado sm:hidden"
      >
        Pedir orçamento
      </a>

      <a
        href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="pointer-events-auto flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-zap font-semibold text-white shadow-lg shadow-black/30 transition-colors hover:bg-zap-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado motion-safe:animate-ring sm:h-auto sm:w-auto sm:px-4 sm:py-3"
      >
        <WhatsAppIcon className="h-6 w-6" />
        <span className="hidden sm:inline">Fale conosco</span>
      </a>
    </div>
  );
};
