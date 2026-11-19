/** Tipos e rótulos do orçamento. Fonte única usada pelo formulário e pela mensagem do WhatsApp. */

export type ServiceType = 'churrasqueiro' | 'buffet';

export const SERVICE_LABEL: Record<ServiceType, string> = {
  churrasqueiro: 'Somente churrasqueiro',
  buffet: 'Buffet completo',
};

/** Itens do cardápio escolhidos, por id de categoria (ver src/data/menu.ts). */
export type MenuSelection = Record<string, string[]>;

export interface QuoteData {
  service: ServiceType | '';
  /** AAAA-MM-DD, como vem do <input type="date">. */
  date: string;
  city: string;
  /** Total de convidados, só dígitos. */
  guests: string;
  /** HH:MM — opcional. */
  time: string;
  eventType: string;
  venue: string;
  menu: MenuSelection;
  wantsSuggestion: boolean;
  needsHelper: boolean;
  name: string;
  notes: string;
}

export const emptyQuote: QuoteData = {
  service: '',
  date: '',
  city: '',
  guests: '',
  time: '',
  eventType: '',
  venue: '',
  menu: {},
  wantsSuggestion: false,
  needsHelper: false,
  name: '',
  notes: '',
};

export const countSelected = (menu: MenuSelection): number =>
  Object.values(menu).reduce((sum, items) => sum + items.length, 0);
