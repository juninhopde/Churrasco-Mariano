import { businessConfig } from '../config/business';

/** Monta o link do WhatsApp com a mensagem já escrita. */
export const buildWhatsAppUrl = (message: string): string =>
  `https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent(message)}`;

export interface QuoteData {
  eventType: string;
  adults: string;
  children: string;
  date: string;
  time: string;
  city: string;
  neighborhood: string;
  venue: string;
  serviceModel: 'buffet' | 'churrasqueiro';
  needsHelper: boolean;
  menuCategories: string[];
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const formatDateBR = (iso: string): string => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return d && m && y ? `${d}/${m}/${y}` : iso;
};

const line = (label: string, value: string): string => (value ? `*${label}:*\n${value}\n\n` : '');

/** Transforma as respostas do formulário numa mensagem organizada de WhatsApp. */
export const buildQuoteMessage = (d: QuoteData): string => {
  const guests = [
    d.adults ? `${d.adults} adultos` : '',
    Number(d.children) > 0 ? `${d.children} crianças` : '',
  ]
    .filter(Boolean)
    .join(' e ');

  const place = [d.venue, d.neighborhood, d.city].filter(Boolean).join(' — ');

  const service =
    d.serviceModel === 'buffet'
      ? 'Buffet completo'
      : `Somente churrasqueiro${d.needsHelper ? ' + ajudante' : ''}`;

  return (
    'Olá! Gostaria de solicitar um orçamento.\n\n' +
    line('Tipo de evento', d.eventType) +
    line('Data', formatDateBR(d.date)) +
    line('Horário', d.time) +
    line('Local', place) +
    line('Convidados', guests) +
    line('Modelo de serviço', service) +
    (d.serviceModel === 'buffet' ? line('Cardápio de interesse', d.menuCategories.join(', ')) : '') +
    line('Nome', d.name) +
    line('WhatsApp', d.phone) +
    line('E-mail', d.email) +
    line('Observações', d.notes) +
    'Aguardo o retorno com os valores e cardápios disponíveis.'
  );
};
