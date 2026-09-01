import type { LucideIcon } from 'lucide-react';
import { Home, Building2, HeartHandshake, PartyPopper, Sparkles } from 'lucide-react';
import { photos } from './images';
import type { Photo } from './images';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  photo: Photo;
  ctaMessage: string;
}

export const services: Service[] = [
  {
    id: 'domicilio',
    title: 'Churrasco em domicílio',
    description: 'Levamos toda a experiência do churrasco até você: carne, tempero, brasa e equipe.',
    icon: Home,
    photo: photos.heroChurrasqueiro,
    ctaMessage: 'Quero orçamento de churrasco em domicílio.',
  },
  {
    id: 'corporativo',
    title: 'Eventos corporativos',
    description: 'Solução completa para confraternizações, com horário fechado e nota fiscal.',
    icon: Building2,
    photo: photos.grelhaCheia,
    ctaMessage: 'Quero orçamento para evento corporativo.',
  },
  {
    id: 'casamento',
    title: 'Casamentos',
    description: 'Buffet sofisticado, cortes nobres e serviço à mesa para o dia mais importante.',
    icon: HeartHandshake,
    photo: photos.carneFatiada,
    ctaMessage: 'Quero orçamento de churrasco para casamento.',
  },
  {
    id: 'aniversario',
    title: 'Aniversários',
    description: 'Churrasco completo para comemorar com família e amigos, sem ninguém preso na churrasqueira.',
    icon: PartyPopper,
    photo: photos.pegadorNaBrasa,
    ctaMessage: 'Quero orçamento de churrasco para aniversário.',
  },
  {
    id: 'personalizado',
    title: 'Eventos personalizados',
    description: 'Só mão de obra, buffet completo ou algo no meio: montamos no formato do seu evento.',
    icon: Sparkles,
    photo: photos.grelhaDeCima,
    ctaMessage: 'Quero um orçamento personalizado.',
  },
];
