import { useCallback, useEffect, useState } from 'react';
import { emptyQuote, type MenuSelection, type QuoteData } from '../utils/quote';

/**
 * Estado ÚNICO do orçamento. Os cartões de serviço, o cardápio e o formulário
 * leem e escrevem aqui — por isso o cliente nunca precisa escolher a mesma coisa duas vezes.
 *
 * O rascunho fica no sessionStorage: se o navegador do celular recarregar a página
 * quando o cliente volta do WhatsApp, o que foi preenchido continua lá.
 * Some ao fechar a aba (não fica gravado no aparelho).
 */
const STORAGE_KEY = 'mariano-churrasco:orcamento:v1';

const asString = (v: unknown): string => (typeof v === 'string' ? v : '');
const asBool = (v: unknown): boolean => v === true;

const asMenu = (v: unknown): MenuSelection => {
  if (!v || typeof v !== 'object') return {};
  const out: MenuSelection = {};
  for (const [key, value] of Object.entries(v as Record<string, unknown>)) {
    if (Array.isArray(value)) out[key] = value.filter((x): x is string => typeof x === 'string');
  }
  return out;
};

/** Aceita só campos conhecidos e do tipo certo — um rascunho antigo ou corrompido não quebra a página. */
const fromStorage = (raw: unknown): QuoteData => {
  if (!raw || typeof raw !== 'object') return emptyQuote;
  const r = raw as Record<string, unknown>;
  return {
    service: r.service === 'churrasqueiro' || r.service === 'buffet' ? r.service : '',
    date: asString(r.date),
    city: asString(r.city),
    guests: asString(r.guests),
    time: asString(r.time),
    eventType: asString(r.eventType),
    venue: asString(r.venue),
    menu: asMenu(r.menu),
    wantsSuggestion: asBool(r.wantsSuggestion),
    needsHelper: asBool(r.needsHelper),
    name: asString(r.name),
    notes: asString(r.notes),
  };
};

const loadDraft = (): QuoteData => {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? fromStorage(JSON.parse(raw)) : emptyQuote;
  } catch {
    return emptyQuote; // storage bloqueado ou JSON inválido
  }
};

const saveDraft = (data: QuoteData): void => {
  try {
    if (JSON.stringify(data) === JSON.stringify(emptyQuote)) window.sessionStorage.removeItem(STORAGE_KEY);
    else window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* sem storage: o formulário continua funcionando, só não guarda o rascunho */
  }
};

export interface QuoteDraft {
  data: QuoteData;
  update: <K extends keyof QuoteData>(key: K, value: QuoteData[K]) => void;
  toggleMenuItem: (categoryId: string, item: string) => void;
  reset: () => void;
}

export const useQuoteDraft = (): QuoteDraft => {
  const [data, setData] = useState<QuoteData>(loadDraft);

  useEffect(() => {
    saveDraft(data);
  }, [data]);

  const update = useCallback(<K extends keyof QuoteData>(key: K, value: QuoteData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleMenuItem = useCallback((categoryId: string, item: string) => {
    setData((prev) => {
      const current = prev.menu[categoryId] ?? [];
      const next = current.includes(item) ? current.filter((i) => i !== item) : [...current, item];
      return { ...prev, menu: { ...prev.menu, [categoryId]: next } };
    });
  }, []);

  const reset = useCallback(() => setData(emptyQuote), []);

  return { data, update, toggleMenuItem, reset };
};
