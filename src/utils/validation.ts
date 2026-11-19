import type { QuoteData } from './quote';

export const isFilled = (v: string): boolean => v.trim().length > 0;

/** Limites de bom senso — evitam erro de digitação, não são regra comercial. */
export const MAX_GUESTS = 2000;
export const MAX_YEARS_AHEAD = 3;

const pad = (n: number): string => String(n).padStart(2, '0');

/** Converte 'AAAA-MM-DD' em Date local. Devolve null se não existir (ex.: 2026-02-30). */
export const parseISODate = (iso: string): Date | null => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const date = new Date(y, mo - 1, d);
  const ok = date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d;
  return ok ? date : null;
};

/** Data local em AAAA-MM-DD. Não usa toISOString() (UTC), que vira o dia à noite no Brasil. */
export const toISODate = (d: Date): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const todayISO = (now: Date = new Date()): string => toISODate(now);

export const maxEventISO = (now: Date = new Date()): string =>
  toISODate(new Date(now.getFullYear() + MAX_YEARS_AHEAD, now.getMonth(), now.getDate()));

export type DateCheck = 'ok' | 'empty' | 'invalid' | 'past' | 'too-far';

export const checkEventDate = (iso: string, now: Date = new Date()): DateCheck => {
  if (!isFilled(iso)) return 'empty';
  const date = parseISODate(iso);
  if (!date) return 'invalid';
  if (iso < todayISO(now)) return 'past';
  if (iso > maxEventISO(now)) return 'too-far';
  return 'ok';
};

/** Mantém só dígitos (até `maxLen`) — usado no campo de convidados. */
export const sanitizeDigits = (v: string, maxLen = 4): string => v.replace(/\D/g, '').slice(0, maxLen);

export type GuestsCheck = 'ok' | 'empty' | 'zero' | 'too-many';

export const checkGuests = (v: string): GuestsCheck => {
  if (!isFilled(v)) return 'empty';
  if (!/^\d+$/.test(v.trim())) return 'zero';
  const n = Number(v);
  if (n < 1) return 'zero';
  if (n > MAX_GUESTS) return 'too-many';
  return 'ok';
};

export type QuoteField = 'service' | 'date' | 'city' | 'guests' | 'name';
export type QuoteErrors = Partial<Record<QuoteField, string>>;

/** Ordem em que os campos aparecem na tela — o primeiro com erro recebe o foco. */
export const QUOTE_FIELD_ORDER: readonly QuoteField[] = ['service', 'date', 'city', 'guests', 'name'];

/** Só os campos obrigatórios bloqueiam o envio. Todo o resto é opcional. */
export const validateQuote = (d: QuoteData, now: Date = new Date()): QuoteErrors => {
  const e: QuoteErrors = {};

  if (!d.service) e.service = 'Escolha o tipo de serviço.';

  switch (checkEventDate(d.date, now)) {
    case 'empty':
      e.date = 'Informe a data do evento.';
      break;
    case 'invalid':
      e.date = 'Data inválida. Confira dia, mês e ano.';
      break;
    case 'past':
      e.date = 'A data não pode estar no passado.';
      break;
    case 'too-far':
      e.date = `Confira o ano — só aceitamos datas até ${MAX_YEARS_AHEAD} anos à frente.`;
      break;
    default:
      break;
  }

  if (!isFilled(d.city)) e.city = 'Informe a cidade do evento.';

  switch (checkGuests(d.guests)) {
    case 'empty':
      e.guests = 'Informe quantos convidados.';
      break;
    case 'zero':
      e.guests = 'Use um número inteiro, de 1 em diante.';
      break;
    case 'too-many':
      e.guests = `Confira a quantidade — o máximo aceito aqui é ${MAX_GUESTS}.`;
      break;
    default:
      break;
  }

  if (!isFilled(d.name)) e.name = 'Informe seu nome.';

  return e;
};
