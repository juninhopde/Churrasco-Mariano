import { useEffect, useState } from 'react';

/** Os tipos de evento que se alternam em destaque. Edite à vontade. */
const WORDS = ['aniversário', 'casamento', 'confraternização', 'churrasco em família', 'evento da empresa'];

const INTERVAL_MS = 2600;

/**
 * "Ideal para [aniversário]" — a palavra em destaque troca sozinha.
 * - Quem desliga animações no sistema vê só a primeira palavra, parada.
 * - Leitores de tela leem a lista completa, uma vez (a parte animada fica oculta para eles).
 * - A altura mínima evita que o botão logo abaixo "pule" quando a palavra quebra de linha.
 */
export const EventTagline = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((n) => (n + 1) % WORDS.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="mt-5 min-h-[4rem] text-2xl font-semibold sm:min-h-0 sm:text-3xl">
      <span className="sr-only">
        Ideal para aniversários, casamentos, confraternizações, churrascos em família e eventos de empresa.
      </span>
      <span aria-hidden="true">
        <span className="text-creme/85">Ideal para </span>
        <span key={WORDS[index]} className="inline-block origin-left text-festa motion-safe:animate-pop">
          {WORDS[index]}
        </span>
      </span>
    </p>
  );
};
