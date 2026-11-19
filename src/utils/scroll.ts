/**
 * Leva o cliente ao formulário de orçamento e move o foco para o título dele
 * (quem navega por teclado ou leitor de tela chega no lugar certo).
 * Sem `behavior`, o navegador segue o `scroll-behavior` do CSS, que já respeita
 * prefers-reduced-motion.
 */
export const goToQuote = (): void => {
  const section = document.getElementById('orcamento');
  if (!section) return;
  section.scrollIntoView();
  document.getElementById('orcamento-titulo')?.focus({ preventScroll: true });
};
