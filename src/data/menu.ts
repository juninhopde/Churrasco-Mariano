import { photos } from './images';
import type { Photo } from './images';

/** CARDÁPIO — edite livremente. O site se adapta ao que estiver aqui. */
export interface MenuCategory {
  id: string;
  title: string;
  note?: string;
  items: string[];
  photo: Photo;
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'bovinas',
    title: 'Carnes bovinas',
    note: 'Cortes temperados no dia do evento.',
    items: ['Contra filé', 'Espeto bovino', 'Ancho', 'Fraldinha', 'Alcatra'],
    photo: photos.carneNaGrelha,
  },
  {
    id: 'suinas',
    title: 'Carnes suínas',
    items: ['Pernil', 'Lombo', 'Panceta', 'Linguiças'],
    photo: photos.pegadorNaBrasa,
  },
  {
    id: 'frango',
    title: 'Frango',
    items: ['Filé de coxa', 'Meio da asa', 'Coxinha da asa'],
    photo: photos.grelhaCheia,
  },
  {
    id: 'acompanhamentos',
    title: 'Acompanhamentos',
    items: [
      'Farofa artesanal', 'Arroz', 'Arroz biro-biro', 'Pão de alho',
      'Queijo coalho', 'Vegetais na brasa', 'Maionese artesanal', 'Molhos especiais',
    ],
    photo: photos.mesaServida,
  },
  {
    id: 'saladas',
    title: 'Saladas',
    items: ['Caprese', 'Salada verde', 'Salpicão', 'Salada de batata', 'Rúcula', 'Tomate seco'],
    photo: photos.costelaEAcompanhamentos,
  },
];

export interface ServiceOption {
  id: 'churrasqueiro' | 'buffet';
  title: string;
  tagline: string;
  description: string;
  includes: string[];
  notIncludes?: string[];
  photo: Photo;
  ctaMessage: string;
}

export const serviceOptions: ServiceOption[] = [
  {
    id: 'churrasqueiro',
    title: 'Churrasqueiro',
    tagline: 'O mais pedido',
    description: 'Você compra a carne, eu asso. Levo faca, tábua, tempero e a experiência de quem faz isso todo dia.',
    includes: [
      'Churrasqueiro profissional por até 5 horas',
      'Tempero e preparo de todos os cortes',
      'Carne servida na mesa principal, sem intervalo',
      'Ajudante necessário acima de 30 convidados',
      'Área da churrasqueira deixada organizada',
    ],
    notIncludes: [
      'Carne e acompanhamentos (você compra)',
      'Churrasqueira (usa a do local)',
    ],
    photo: photos.churrasqueiroServindo,
    ctaMessage: 'Quero orçamento do serviço de churrasqueiro.',
  },
  {
    id: 'buffet',
    title: 'Buffet completo',
    tagline: 'Você só recebe',
    description: 'A gente leva carne, acompanhamentos, tempero e equipe. Você não sai da festa.',
    includes: [
      'Carnes bovinas, suínas e frango (você escolhe os cortes)',
      'Acompanhamentos e saladas',
      'Equipe uniformizada servindo na mesa principal',
      'Descartáveis de boa qualidade',
      'Área da churrasqueira deixada organizada',
    ],
    notIncludes: [
      'Churrasqueira (usa a do local)',
      'Bebidas (ficam por sua conta)',
    ],
    photo: photos.buffetMontado,
    ctaMessage: 'Quero orçamento do buffet completo.',
  },
];
