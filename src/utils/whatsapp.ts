import { businessConfig } from '../config/business';
import { SERVICE_LABEL, type QuoteData } from './quote';
import { parseISODate } from './validation';

/** Mensagem genérica, usada nos atalhos que abrem o WhatsApp sem formulário. */
export const DEFAULT_MESSAGE = 'Olá! Gostaria de um orçamento de churrasco.';

/** Único lugar que monta o link do WhatsApp. O número vem de src/config/business.ts. */
export const buildWhatsAppUrl = (message: string): string =>
  `https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent(message)}`;

/** 'AAAA-MM-DD' → 'DD/MM/AAAA'. Devolve '' se a data não existir (ex.: 2026-02-30). */
export const formatDateBR = (iso: string): string => {
  const date = parseISODate(iso);
  if (!date) return '';
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${date.getFullYear()}`;
};

const oneLine = (v: string): string => v.replace(/\s+/g, ' ').trim();

const formatGuests = (v: string): string => {
  const n = Number(v);
  if (!Number.isInteger(n) || n < 1) return '';
  return `${n} ${n === 1 ? 'pessoa' : 'pessoas'}`;
};

export interface MenuCategoryLabel {
  id: string;
  title: string;
}

/**
 * Transforma o orçamento numa mensagem de WhatsApp.
 * Só entram as informações preenchidas — nenhuma linha vazia.
 */
export const buildQuoteMessage = (d: QuoteData, categories: readonly MenuCategoryLabel[] = []): string => {
  const lines: string[] = [];
  const add = (label: string, value: string): void => {
    if (value) lines.push(`${label}: ${value}`);
  };

  if (d.service) add('Serviço', SERVICE_LABEL[d.service]);
  add('Evento', oneLine(d.eventType));
  add('Data', formatDateBR(d.date));
  add('Cidade', oneLine(d.city));
  add('Convidados', formatGuests(d.guests));
  add('Horário', /^\d{2}:\d{2}$/.test(d.time) ? d.time : '');
  add('Local', oneLine(d.venue));

  // Cardápio só faz sentido no buffet; no churrasqueiro o cliente compra a carne.
  if (d.service === 'buffet') {
    if (d.wantsSuggestion) add('Cardápio', 'prefiro receber uma sugestão');
    const chosen = categories
      .map((c) => ({ title: c.title, items: d.menu[c.id] ?? [] }))
      .filter((c) => c.items.length > 0);
    if (chosen.length > 0) {
      lines.push('Itens de interesse:');
      chosen.forEach((c) => lines.push(`- ${c.title}: ${c.items.join(', ')}`));
    }
  }
  if (d.service === 'churrasqueiro' && d.needsHelper) add('Ajudante', 'preciso');

  add('Nome', oneLine(d.name));
  add('Observações', d.notes.replace(/\r\n/g, '\n').trim());

  const parts = ['Olá! Gostaria de solicitar um orçamento.'];
  if (lines.length > 0) parts.push(lines.join('\n'));
  parts.push('Gostaria de receber uma proposta.');
  return parts.join('\n\n');
};
