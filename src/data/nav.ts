export interface NavItem {
  label: string;
  href: string;
}

export const navItems: readonly NavItem[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Quem somos', href: '#experiencia' },
  { label: 'Serviço', href: '#servico' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Eventos', href: '#servicos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#orcamento' },
] as const;
