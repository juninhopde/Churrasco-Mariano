import type { CSSProperties } from 'react';

/**
 * Faíscas de brasa subindo (só visual, só CSS). Valores fixos e determinísticos — nada de
 * Math.random — para a página ser sempre igual. Para mudar a quantidade: COUNT.
 * Os ímpares somem no celular (metade das faíscas, menos distração e menos trabalho).
 */
const COUNT = 40;

const embers = Array.from({ length: COUNT }, (_, i) => ({
  x: (i * 53 + 11) % 97, //                       posição horizontal, em %
  size: 5 + ((i * 7) % 10), //                     5 a 14 px
  duration: 4.5 + ((i * 13) % 45) / 10, //         4,5 a 8,9 s
  delay: -(((i * 37) % 80) / 10), //               negativo: já começam no meio do caminho
  drift: (i % 2 === 0 ? 1 : -1) * (14 + ((i * 11) % 40)), // deriva lateral, em px
}));

export const Embers = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    {embers.map((e, i) => (
      <span
        key={i}
        className={`ember ${i % 2 === 1 ? 'hidden sm:block' : ''}`}
        style={
          {
            '--x': `${e.x}%`,
            '--s': `${e.size}px`,
            '--d': `${e.duration}s`,
            '--delay': `${e.delay}s`,
            '--drift': `${e.drift}px`,
          } as CSSProperties
        }
      />
    ))}
  </div>
);
