export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  { number: '01', title: 'Escolha seu cardápio', description: 'Buffet completo com carne e acompanhamentos, ou apenas a mão de obra do churrasqueiro.' },
  { number: '02', title: 'Conte como será seu evento', description: 'Data, cidade, número de convidados e o formato que você imagina.' },
  { number: '03', title: 'Receba seu orçamento', description: 'Proposta por escrito, com deslocamento e hora extra já explicados. Sem taxa surpresa.' },
  { number: '04', title: 'Nós cuidamos de tudo', description: 'Chegamos antes para preparar, servimos até o fim e entregamos a área da brasa limpa.' },
];
