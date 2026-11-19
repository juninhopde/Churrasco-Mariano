export interface NavItem {
  label: string;
  href: string;
}

/** Menu simples. O botão "Pedir orçamento" já aparece ao lado, então não repete aqui. */
export const navItems: readonly NavItem[] = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Dúvidas', href: '#faq' },
] as const;
