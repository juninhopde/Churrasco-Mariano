/** FAQ — confira se cada resposta bate com a sua prática antes de publicar. */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'Vocês atendem em quais cidades?',
    answer:
      'Atendemos Bragança Paulista e região. Para saber se a sua cidade está no raio de atendimento, chame no WhatsApp — se houver custo de deslocamento, ele entra no orçamento antes de você decidir.',
  },
  {
    question: 'Quantas pessoas vocês atendem?',
    answer: 'De 10 a 300 convidados. Acima disso, avaliamos a estrutura do local junto com você antes de fechar.',
  },
  {
    question: 'Vocês levam churrasqueira?',
    answer:
      'Não. O churrasco é preparado na churrasqueira do local. Antes de fechar, envie uma foto da área (casa, chácara, salão) para confirmarmos que o espaço atende o número de convidados.',
  },
  {
    question: 'Vocês levam equipe?',
    answer:
      'Sim. O churrasqueiro vai acompanhado de auxiliares, em número definido pelo tamanho do evento. A equipe serve à mesa e entrega a área da brasa limpa no final.',
  },
  {
    question: 'Vocês fornecem bebidas?',
    answer: 'Não. As bebidas ficam por conta do cliente. Assim você escolhe exatamente o que os convidados preferem e no volume certo.',
  },
  {
    question: 'Vocês fornecem pratos e talheres?',
    answer: 'Sim, com descartáveis de boa qualidade inclusos. Louça e taças sob consulta.',
  },
  {
    question: 'Com quanto tempo devo reservar?',
    answer:
      'Churrasco de fim de semana: 15 a 30 dias. Casamento e confraternização de dezembro: 2 a 4 meses — dezembro fecha cedo.',
  },
  {
    question: 'Vocês atendem empresas?',
    answer: 'Sim, com cardápio e horários definidos em contrato e emissão de nota fiscal.',
  },
  {
    question: 'É possível personalizar o cardápio?',
    answer:
      'Sim. O cardápio é montado junto com você, incluindo opção vegetariana e restrições alimentares, preparadas em grelha separada.',
  },
  {
    question: 'Como funciona o orçamento?',
    answer:
      'Você manda data, cidade e número de convidados pelo WhatsApp ou preenche o formulário. Devolvemos por escrito, com deslocamento e hora extra já explicados. A data é reservada com sinal e contrato.',
  },
];
