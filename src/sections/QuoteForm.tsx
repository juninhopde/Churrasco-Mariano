import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { ChevronDown, Copy, Flame, UtensilsCrossed } from 'lucide-react';
import { menuCategories } from '../data/menu';
import { Section } from '../components/Section';
import { SectionTitle } from '../components/SectionTitle';
import { Field } from '../components/Field';
import { ChipGroup } from '../components/ChipGroup';
import { MenuPicker } from '../components/MenuPicker';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import type { QuoteDraft } from '../hooks/useQuoteDraft';
import { countSelected, emptyQuote, SERVICE_LABEL, type QuoteData, type ServiceType } from '../utils/quote';
import {
  checkGuests,
  maxEventISO,
  QUOTE_FIELD_ORDER,
  sanitizeDigits,
  todayISO,
  validateQuote,
} from '../utils/validation';
import { buildQuoteMessage, buildWhatsAppUrl, DEFAULT_MESSAGE } from '../utils/whatsapp';

const EVENT_TYPES = [
  'Aniversário',
  'Casamento',
  'Evento corporativo',
  'Confraternização',
  'Churrasco em família',
  'Outro',
] as const;

const VENUES = ['Casa', 'Chácara', 'Salão', 'Empresa'] as const;

/** Atalhos para quem não quer digitar. O campo continua aceitando qualquer número. */
const GUEST_SHORTCUTS = ['20', '30', '50', '80', '100', '150'] as const;

const SERVICE_CHOICES: ReadonlyArray<{ id: ServiceType; hint: string; Icon: typeof Flame }> = [
  { id: 'churrasqueiro', hint: 'Você compra as carnes', Icon: Flame },
  { id: 'buffet', hint: 'Carnes, acompanhamentos e serviço', Icon: UtensilsCrossed },
];

const FIELD_ID = {
  service: 'q-service',
  date: 'q-date',
  city: 'q-city',
  guests: 'q-guests',
  name: 'q-name',
} as const;

type Status = 'idle' | 'opened' | 'blocked';

const hasDetails = (d: QuoteData): boolean =>
  Boolean(d.time || d.eventType || d.venue || d.needsHelper || d.wantsSuggestion || countSelected(d.menu) > 0);

const BlockTitle = ({ n, title, note }: { n: number; title: string; note?: string }) => (
  <div className="mb-4 flex items-center gap-3">
    <span
      aria-hidden="true"
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-carvao text-sm font-bold text-dourado"
    >
      {n}
    </span>
    <h3 className="font-display text-xl">
      {title}
      {note && <span className="ml-2 font-sans text-sm font-normal text-carvao/60">{note}</span>}
    </h3>
  </div>
);

const FieldLabel = ({ children }: { children: ReactNode }) => (
  <p className="mb-2 text-sm font-semibold">{children}</p>
);

interface QuoteFormProps {
  quote: QuoteDraft;
}

export const QuoteForm = ({ quote }: QuoteFormProps) => {
  const { data, update, toggleMenuItem, reset } = quote;

  // Só passa a mostrar erros depois da primeira tentativa de envio; depois disso,
  // eles somem sozinhos conforme o cliente corrige cada campo.
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(() => hasDetails(data));
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuTab, setMenuTab] = useState(menuCategories[0]?.id ?? '');

  const errors = useMemo(() => (attempted ? validateQuote(data) : {}), [attempted, data]);
  const hasErrors = Object.keys(errors).length > 0;

  const message = useMemo(() => buildQuoteMessage(data, menuCategories), [data]);
  const url = useMemo(() => buildWhatsAppUrl(message), [message]);

  // Qualquer edição invalida o aviso anterior (o link já reflete os dados novos).
  useEffect(() => {
    setStatus('idle');
    setCopied(false);
  }, [data]);

  const dirty = JSON.stringify(data) !== JSON.stringify(emptyQuote);
  const canCopy = typeof navigator !== 'undefined' && Boolean(navigator.clipboard?.writeText);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);

    const found = validateQuote(data);
    const firstInvalid = QUOTE_FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(FIELD_ID[firstInvalid])?.focus();
      return;
    }

    // Sem 'noopener' no terceiro argumento, window.open devolve a janela (ou null se o
    // navegador bloqueou) — assim dá para mostrar a alternativa quando for bloqueado.
    const win = window.open(url, '_blank');
    if (win) {
      win.opener = null;
      setStatus('opened');
    } else {
      setStatus('blocked');
    }
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const clearAll = () => {
    reset();
    setAttempted(false);
    setStatus('idle');
    setDetailsOpen(false);
    setMenuOpen(false);
  };

  const guestsN = checkGuests(data.guests) === 'ok' ? Number(data.guests) : 0;
  let guestsHint = 'Some adultos e crianças. Criança até 6 anos normalmente não conta no cálculo.';
  if (guestsN > 300) guestsHint = 'Acima de 300 convidados avaliamos a estrutura do local com você. Pode enviar mesmo assim.';
  else if (guestsN > 0 && guestsN < 10) guestsHint = 'Normalmente atendemos de 10 a 300 convidados. Pode enviar mesmo assim que confirmamos.';
  else if (guestsN > 30 && data.service === 'churrasqueiro') guestsHint = 'Acima de 30 convidados costuma ser necessário um ajudante.';

  const menuCount = countSelected(data.menu);

  return (
    <Section id="orcamento" tone="creme">
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          id="orcamento-titulo"
          title="Peça seu orçamento"
          subtitle="Preencha o essencial. A mensagem já vai pronta para o WhatsApp e você confere antes de enviar."
          align="center"
        />

        <form
          noValidate
          onSubmit={handleSubmit}
          aria-label="Pedido de orçamento"
          className="rounded-lg border border-carvao/10 bg-white p-5 shadow-sm sm:p-8"
        >
          {/* ── Bloco 1 — Sobre o evento ── */}
          <section aria-label="Sobre o evento">
            <BlockTitle n={1} title="Sobre o evento" />

            <FieldLabel>
              Tipo de serviço{' '}
              <span className="text-fogo" aria-hidden="true">
                *
              </span>
            </FieldLabel>
            <div
              id={FIELD_ID.service}
              role="radiogroup"
              aria-label="Tipo de serviço"
              aria-required="true"
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? 'q-service-erro' : undefined}
              tabIndex={-1}
              className="grid grid-cols-1 gap-3 outline-none min-[420px]:grid-cols-2"
            >
              {SERVICE_CHOICES.map(({ id, hint, Icon }) => {
                const on = data.service === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => update('service', id)}
                    className={`flex min-h-[4.5rem] items-center gap-3 rounded-md border-2 px-4 py-3 text-left transition-colors ${
                      on
                        ? 'border-fogo bg-fogo/10'
                        : errors.service
                          ? 'border-fogo/60 bg-white hover:border-dourado'
                          : 'border-carvao/20 bg-white hover:border-dourado'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        on ? 'animate-pop bg-fogo text-white' : 'bg-creme text-fogo'
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold">{SERVICE_LABEL[id]}</span>
                      <span className="block text-xs text-carvao/65">{hint}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.service && (
              <p id="q-service-erro" className="mt-1.5 text-xs font-semibold text-fogo">
                {errors.service}
              </p>
            )}

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field
                label="Data do evento"
                name={FIELD_ID.date}
                type="date"
                required
                min={todayISO()}
                max={maxEventISO()}
                value={data.date}
                onChange={(v) => update('date', v)}
                error={errors.date}
              />
              <Field
                label="Cidade"
                name={FIELD_ID.city}
                required
                autoComplete="address-level2"
                placeholder="Ex.: Bragança Paulista"
                value={data.city}
                onChange={(v) => update('city', v)}
                error={errors.city}
              />
            </div>

            <div className="mt-5">
              <Field
                label="Total de convidados"
                name={FIELD_ID.guests}
                required
                inputMode="numeric"
                maxLength={4}
                placeholder="Ex.: 50"
                inputClassName="sm:max-w-[10rem]"
                value={data.guests}
                onChange={(v) => update('guests', sanitizeDigits(v))}
                error={errors.guests}
                hint={guestsHint}
              />
              <div className="mt-3">
                <ChipGroup
                  label="Atalhos de quantidade de convidados"
                  options={GUEST_SHORTCUTS}
                  selected={[data.guests]}
                  onToggle={(option) => update('guests', data.guests === option ? '' : option)}
                />
              </div>
            </div>
          </section>

          {/* ── Bloco 2 — Detalhes (opcional, recolhido) ── */}
          <section aria-label="Detalhes do serviço" className="mt-8">
            <button
              type="button"
              aria-expanded={detailsOpen}
              aria-controls="q-detalhes"
              onClick={() => setDetailsOpen((open) => !open)}
              className="flex w-full items-center justify-between gap-3 rounded-md border border-dashed border-carvao/30 bg-creme/40 px-4 py-3.5 text-left transition-colors hover:border-dourado"
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-carvao text-sm font-bold text-dourado"
                >
                  2
                </span>
                <span>
                  <span className="block font-semibold">
                    Mais detalhes <span className="font-normal text-carvao/60">(opcional)</span>
                  </span>
                  <span className="block text-xs text-carvao/65">
                    Horário, tipo de evento, local{data.service === 'buffet' ? ' e cardápio' : ''}
                  </span>
                </span>
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-fogo transition-transform ${detailsOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {detailsOpen && (
              <div id="q-detalhes" className="mt-5 grid gap-6">
                <Field
                  label="Horário do evento"
                  name="q-time"
                  type="time"
                  value={data.time}
                  onChange={(v) => update('time', v)}
                  inputClassName="sm:max-w-[10rem]"
                />

                <div>
                  <FieldLabel>Tipo de evento</FieldLabel>
                  <ChipGroup
                    label="Tipo de evento"
                    options={EVENT_TYPES}
                    selected={data.eventType ? [data.eventType] : []}
                    onToggle={(option) => update('eventType', data.eventType === option ? '' : option)}
                  />
                </div>

                <div>
                  <FieldLabel>Local</FieldLabel>
                  <ChipGroup
                    label="Local do evento"
                    options={VENUES}
                    selected={data.venue ? [data.venue] : []}
                    onToggle={(option) => update('venue', data.venue === option ? '' : option)}
                  />
                </div>

                {data.service === 'buffet' && (
                  <div>
                    <FieldLabel>Cardápio</FieldLabel>
                    <label className="flex cursor-pointer items-start gap-3 rounded-md border border-carvao/20 bg-creme/40 p-4 text-sm">
                      <input
                        type="checkbox"
                        checked={data.wantsSuggestion}
                        onChange={(e) => update('wantsSuggestion', e.target.checked)}
                        className="mt-0.5 h-5 w-5 shrink-0 accent-[#A83220]"
                      />
                      <span className="font-semibold">Prefiro receber uma sugestão de cardápio.</span>
                    </label>

                    <button
                      type="button"
                      aria-expanded={menuOpen}
                      aria-controls="q-cardapio"
                      onClick={() => setMenuOpen((open) => !open)}
                      className="mt-3 inline-flex min-h-[2.75rem] items-center gap-2 text-sm font-semibold text-fogo underline decoration-dourado underline-offset-4"
                    >
                      {menuOpen ? 'Fechar cardápio' : 'Ou escolha os itens que você quer'}
                      {menuCount > 0 && (
                        <span className="rounded-full bg-fogo px-2 py-0.5 text-xs font-bold text-white no-underline">
                          {menuCount}
                        </span>
                      )}
                    </button>

                    {menuOpen && (
                      <div id="q-cardapio" className="mt-3 rounded-md border border-carvao/15 p-4">
                        <MenuPicker
                          idBase="menu-form"
                          tone="light"
                          selection={data.menu}
                          onToggle={toggleMenuItem}
                          activeId={menuTab}
                          onActiveChange={setMenuTab}
                        />
                      </div>
                    )}
                  </div>
                )}

                {data.service === 'churrasqueiro' && (
                  <label className="flex cursor-pointer items-start gap-3 rounded-md border border-carvao/20 bg-creme/40 p-4 text-sm">
                    <input
                      type="checkbox"
                      checked={data.needsHelper}
                      onChange={(e) => update('needsHelper', e.target.checked)}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-[#A83220]"
                    />
                    <span>
                      <strong>Preciso de ajudante.</strong>
                      <span className="mt-1 block text-carvao/65">
                        Acima de 30 convidados costuma ser necessário para a carne não parar de sair.
                      </span>
                    </span>
                  </label>
                )}
              </div>
            )}
          </section>

          {/* ── Bloco 3 — Contato ── */}
          <section aria-label="Contato" className="mt-8">
            <BlockTitle n={3} title="Seu contato" />
            <Field
              label="Seu nome"
              name={FIELD_ID.name}
              required
              autoComplete="name"
              maxLength={60}
              placeholder="Como podemos te chamar?"
              value={data.name}
              onChange={(v) => update('name', v)}
              error={errors.name}
            />

            <div className="mt-5">
              <label htmlFor="q-notes" className="mb-1.5 block text-sm font-semibold">
                Observações <span className="font-normal text-carvao/60">(opcional)</span>
              </label>
              <textarea
                id="q-notes"
                name="q-notes"
                rows={3}
                maxLength={500}
                value={data.notes}
                onChange={(e) => update('notes', e.target.value)}
                placeholder="Restrição alimentar, horário de término, estacionamento…"
                className="w-full rounded-md border border-carvao/25 bg-white px-3.5 py-3 text-base outline-none transition-colors focus:border-dourado focus:ring-2 focus:ring-dourado/30"
              />
            </div>
          </section>

          {/* ── Envio ── */}
          <div className="mt-7">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-zap px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-zap-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado"
            >
              <WhatsAppIcon />
              Pedir orçamento pelo WhatsApp
            </button>

            {hasErrors ? (
              <p role="alert" className="mt-3 text-center text-sm font-semibold text-fogo">
                Faltam alguns dados. Confira os campos em vermelho.
              </p>
            ) : (
              <p className="mt-3 text-center text-xs text-carvao/60">
                Você confere a mensagem no WhatsApp antes de enviar.
              </p>
            )}

            <div aria-live="polite">
              {status !== 'idle' && (
                <div className="mt-5 rounded-md border border-zap/40 bg-zap/10 p-4 text-sm">
                  <p className="font-semibold">
                    {status === 'opened'
                      ? 'Abrimos o WhatsApp com a sua mensagem.'
                      : 'O navegador bloqueou a abertura do WhatsApp.'}
                  </p>
                  <p className="mt-1 text-carvao/75">
                    {status === 'opened'
                      ? 'Falta só tocar em Enviar por lá. O pedido só chega até nós depois disso.'
                      : 'Use o botão abaixo para abrir a conversa. Seus dados continuam preenchidos.'}
                  </p>

                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-md bg-zap px-5 py-2.5 font-semibold text-white transition-colors hover:bg-zap-dark"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      {status === 'opened' ? 'Não abriu? Abrir o WhatsApp' : 'Abrir o WhatsApp'}
                    </a>
                    {canCopy && (
                      <button
                        type="button"
                        onClick={copyMessage}
                        className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-md border-2 border-carvao/30 px-5 py-2.5 font-semibold transition-colors hover:bg-carvao hover:text-creme"
                      >
                        <Copy className="h-4 w-4" aria-hidden="true" />
                        {copied ? 'Mensagem copiada' : 'Copiar mensagem'}
                      </button>
                    )}
                  </div>

                  <details className="mt-3">
                    <summary className="flex min-h-[2.75rem] cursor-pointer items-center text-xs font-semibold text-carvao/70">
                      Ver a mensagem
                    </summary>
                    <pre className="mt-2 max-h-52 overflow-auto whitespace-pre-wrap break-words rounded bg-white p-3 font-sans text-xs leading-relaxed text-carvao/80">
                      {message}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-carvao/65">
          Prefere conversar direto?{' '}
          <a
            href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-fogo underline decoration-dourado underline-offset-4"
          >
            Chame no WhatsApp
          </a>
          {dirty && (
            <>
              {' · '}
              <button
                type="button"
                onClick={clearAll}
                className="min-h-[2.75rem] px-1 font-semibold text-carvao/70 underline decoration-carvao/30 underline-offset-4 hover:text-fogo"
              >
                Limpar formulário
              </button>
            </>
          )}
        </p>
      </div>
    </Section>
  );
};
