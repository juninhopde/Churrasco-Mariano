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
    photo: photos.eventoLinguicaFaca,
  },
  {
    id: 'frango',
    title: 'Frango',
    items: ['Filé de coxa', 'Meio da asa', 'Coxinha da asa'],
    photo: photos.eventoChurrasqueira,
  },
  {
    id: 'acompanhamentos',
    title: 'Acompanhamentos',
    items: [
      'Farofa artesanal', 'Arroz', 'Arroz com Bacon e Cenoura', 'Pão de alho',
      'Queijo coalho', 'Vegetais na brasa', 'Maionese artesanal',
    ],
    photo: photos.eventoBuffet,
  },
  {
    id: 'saladas',
    title: 'Saladas',
    items: ['Caprese', 'Salada verde', 'Salpicão', 'Salada de batata', 'Rúcula', 'Tomate seco'],
    photo: photos.eventoSaladas,
  },
];

/**
 * Os dois serviços, exibidos nos cards da seção "Serviços".
 * `id` é o mesmo valor usado no formulário — escolher o card já preenche o serviço lá.
 */
export interface ServiceOption {
  id: 'churrasqueiro' | 'buffet';
  title: string;
  tagline: string;
  description: string;
  /** Principais itens inclusos (mantenha curto — são só os destaques). */
  includes: string[];
  /** O que fica por conta do cliente. */
  notIncludes: string[];
  photo: Photo;
}

export const serviceOptions: ServiceOption[] = [
  {
    id: 'churrasqueiro',
    title: 'Churrasqueiro',
    tagline: 'O mais pedido',
    description: 'Você compra as carnes e eu cuido do preparo e do churrasco.',
    includes: [
      'Churrasqueiro profissional por até 5 horas',
      'Tempero e preparo de todos os cortes',
      'Carne servida na mesa principal, sem intervalo',
      'Ajudante necessário acima de 30 convidados',
    ],
    notIncludes: ['Carnes e acompanhamentos', 'Churrasqueira (usa a do local)'],
    photo: photos.churrasqueiroServindo,
  },
  {
    id: 'buffet',
    title: 'Buffet completo',
    tagline: 'Você só recebe',
    description: 'A equipe cuida das carnes, acompanhamentos e serviço do buffet.',
    includes: [
      'Carnes bovinas, suínas e frango (você escolhe os cortes)',
      'Acompanhamentos e saladas',
      'Equipe uniformizada servindo na mesa principal',
      'Descartáveis de boa qualidade',
    ],
    notIncludes: ['Churrasqueira (usa a do local)', 'Bebidas'],
    photo: photos.eventoEquipeTabua,
  },
];
