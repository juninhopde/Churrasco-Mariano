import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { menuCategories } from '../data/menu';
import { Section } from '../components/Section';
import { SectionTitle } from '../components/SectionTitle';
import { Field } from '../components/Field';
import { ChoiceGrid } from '../components/ChoiceGrid';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { buildQuoteMessage, buildWhatsAppUrl, type QuoteData } from '../utils/whatsapp';
import {
  isFilled,
  isFutureOrToday,
  isPositiveNumber,
  isValidEmail,
  isValidPhone,
  maskPhone,
} from '../utils/validation';

const EVENT_TYPES = [
  'Aniversário',
  'Casamento',
  'Evento corporativo',
  'Confraternização',
  'Churrasco em família',
  'Outro',
] as const;

const SERVICE_MODELS = ['Buffet completo', 'Somente churrasqueiro'] as const;

const STEP_TITLES = [
  'Qual tipo de evento?',
  'Quantas pessoas?',
  'Quando será?',
  'Onde será?',
  'Como você quer o serviço?',
  'Seus dados',
  'Observações',
] as const;

const TOTAL_STEPS = STEP_TITLES.length;

const emptyData: QuoteData = {
  eventType: '',
  adults: '',
  children: '0',
  date: '',
  time: '',
  city: '',
  neighborhood: '',
  venue: '',
  serviceModel: 'buffet',
  needsHelper: false,
  menuCategories: [],
  name: '',
  phone: '',
  email: '',
  notes: '',
};

type Errors = Partial<Record<keyof QuoteData, string>>;

export const QuoteForm = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>(emptyData);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = <K extends keyof QuoteData>(key: K, value: QuoteData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  /** Valida só a etapa atual. Voltar nunca apaga o que já foi preenchido. */
  const validateStep = (index: number): Errors => {
    const e: Errors = {};
    if (index === 0 && !isFilled(data.eventType)) e.eventType = 'Escolha o tipo de evento.';
    if (index === 1) {
      if (!isPositiveNumber(data.adults)) e.adults = 'Informe quantos adultos (mínimo 1).';
      if (data.children !== '' && Number(data.children) < 0) e.children = 'Número inválido.';
    }
    if (index === 2) {
      if (!isFilled(data.date)) e.date = 'Informe a data do evento.';
      else if (!isFutureOrToday(data.date)) e.date = 'A data não pode estar no passado.';
      if (!isFilled(data.time)) e.time = 'Informe o horário de início.';
    }
    if (index === 3 && !isFilled(data.city)) e.city = 'Informe a cidade.';
    if (index === 4 && data.serviceModel === 'buffet' && data.menuCategories.length === 0) {
      e.menuCategories = 'Escolha ao menos uma categoria de interesse.';
    }
    if (index === 5) {
      if (!isFilled(data.name)) e.name = 'Informe seu nome.';
      if (!isValidPhone(data.phone)) e.phone = 'WhatsApp com DDD, ex.: (11) 97382-9765.';
      if (!isValidEmail(data.email)) e.email = 'E-mail inválido.';
    }
    return e;
  };

  const next = () => {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  /** Revalida tudo antes de liberar o envio. */
  const allErrors = useMemo(() => {
    const e: Errors = {};
    for (let i = 0; i < TOTAL_STEPS; i += 1) Object.assign(e, validateStep(i));
    return e;
  }, [data]);

  const canSend = Object.keys(allErrors).length === 0;

  const handleSend = () => {
    if (!canSend) {
      setErrors(allErrors);
      const firstBad = [0, 1, 2, 3, 4, 5].find((i) => Object.keys(validateStep(i)).length > 0);
      if (firstBad !== undefined) setStep(firstBad);
      return;
    }
    window.open(buildWhatsAppUrl(buildQuoteMessage(data)), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  return (
    <Section id="orcamento" tone="creme">
      <div className="mx-auto max-w-2xl">
        <SectionTitle
          title="Monte seu orçamento"
          subtitle="Sete perguntas rápidas. No final, tudo vira uma mensagem organizada no WhatsApp — você confere antes de enviar."
          align="center"
        />

        {sent ? (
          <div className="rounded border border-zap/40 bg-white p-8 text-center">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zap/12 text-zap">
              <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <h3 className="font-display text-2xl">Pedido montado</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-carvao/75">
              O WhatsApp abriu em outra aba com o seu resumo. Se não abriu, o navegador pode ter bloqueado a
              janela — use o botão abaixo.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={buildWhatsAppUrl(buildQuoteMessage(data))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded bg-zap px-6 py-3.5 font-semibold text-white transition-colors hover:bg-zap-dark"
              >
                <WhatsAppIcon />
                Abrir WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setStep(0);
                  setData(emptyData);
                }}
                className="rounded border-2 border-carvao px-6 py-3.5 font-semibold transition-colors hover:bg-carvao hover:text-creme"
              >
                Fazer outro orçamento
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded border border-carvao/12 bg-white p-6 sm:p-8">
            {/* Progresso */}
            <div className="mb-7">
              <div className="mb-2 flex items-baseline justify-between text-sm">
                <span className="font-semibold">
                  Etapa {step + 1} de {TOTAL_STEPS}
                </span>
                <span className="text-carvao/55">{progress}%</span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full bg-carvao/10"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progresso do orçamento"
              >
                <div className="h-full bg-fogo transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <h3 className="mb-6 font-display text-2xl">{STEP_TITLES[step]}</h3>

            {step === 0 && (
              <>
                <ChoiceGrid
                  options={EVENT_TYPES}
                  selected={data.eventType ? [data.eventType] : []}
                  onToggle={(option) => update('eventType', option)}
                />
                {errors.eventType && <p className="mt-3 text-xs font-semibold text-fogo">{errors.eventType}</p>}
              </>
            )}

            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Adultos" name="adults" type="number" min="1" value={data.adults} onChange={(v) => update('adults', v)} error={errors.adults} placeholder="Ex.: 50" />
                <Field label="Crianças" name="children" type="number" min="0" value={data.children} onChange={(v) => update('children', v)} error={errors.children} placeholder="Ex.: 10" hint="Criança até 6 anos normalmente não conta no cálculo." />
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Data do evento" name="date" type="date" value={data.date} onChange={(v) => update('date', v)} error={errors.date} />
                <Field label="Horário de início" name="time" type="time" value={data.time} onChange={(v) => update('time', v)} error={errors.time} />
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-5">
                <Field label="Cidade" name="city" value={data.city} onChange={(v) => update('city', v)} error={errors.city} placeholder="Ex.: Bragança Paulista" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Bairro" name="neighborhood" value={data.neighborhood} onChange={(v) => update('neighborhood', v)} placeholder="Opcional" />
                  <Field label="Local" name="venue" value={data.venue} onChange={(v) => update('venue', v)} placeholder="Casa, chácara, salão, empresa…" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="grid gap-6">
                <ChoiceGrid
                  options={SERVICE_MODELS}
                  selected={[data.serviceModel === 'buffet' ? 'Buffet completo' : 'Somente churrasqueiro']}
                  onToggle={(option) =>
                    update('serviceModel', option === 'Buffet completo' ? 'buffet' : 'churrasqueiro')
                  }
                />

                {data.serviceModel === 'buffet' ? (
                  <div>
                    <p className="mb-3 text-sm font-semibold">O que te interessa no cardápio?</p>
                    <ChoiceGrid
                      multi
                      columns={3}
                      options={menuCategories.map((c) => c.title)}
                      selected={data.menuCategories}
                      onToggle={(option) =>
                        update(
                          'menuCategories',
                          data.menuCategories.includes(option)
                            ? data.menuCategories.filter((c) => c !== option)
                            : [...data.menuCategories, option],
                        )
                      }
                    />
                    {errors.menuCategories && (
                      <p className="mt-3 text-xs font-semibold text-fogo">{errors.menuCategories}</p>
                    )}
                  </div>
                ) : (
                  <label className="flex cursor-pointer items-start gap-3 rounded border border-carvao/20 bg-creme/40 p-4 text-sm">
                    <input
                      type="checkbox"
                      checked={data.needsHelper}
                      onChange={(e) => update('needsHelper', e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-[#A83220]"
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

            {step === 5 && (
              <div className="grid gap-5">
                <Field label="Nome" name="name" value={data.name} onChange={(v) => update('name', v)} error={errors.name} placeholder="Seu nome" />
                <Field label="WhatsApp" name="phone" type="tel" value={data.phone} onChange={(v) => update('phone', maskPhone(v))} error={errors.phone} placeholder="(11) 90000-0000" />
                <Field label="E-mail" name="email" type="email" value={data.email} onChange={(v) => update('email', v)} error={errors.email} placeholder="Opcional" hint="Opcional — só se quiser receber a proposta por e-mail também." />
              </div>
            )}

            {step === 6 && (
              <div>
                <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold">
                  Algo mais que a gente precisa saber?
                </label>
                <textarea
                  id="notes"
                  rows={5}
                  value={data.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  placeholder="Restrição alimentar, enviar foto da churrasqueira do local, horário de término, estacionamento…"
                  className="w-full rounded border border-carvao/25 bg-white px-3.5 py-3 text-base outline-none transition-colors focus:border-dourado focus:ring-2 focus:ring-dourado/30"
                />

                <div className="mt-6 rounded border border-carvao/15 bg-creme/50 p-4">
                  <p className="mb-2 text-sm font-semibold">Resumo que será enviado</p>
                  <pre className="max-h-52 overflow-auto whitespace-pre-wrap break-words text-xs leading-relaxed text-carvao/75">
                    {buildQuoteMessage(data).replace(/\*/g, '')}
                  </pre>
                </div>
              </div>
            )}

            {/* Navegação */}
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-carvao/10 pt-6">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded px-3 py-2.5 text-sm font-semibold transition-colors hover:text-fogo disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Voltar
              </button>

              {step < TOTAL_STEPS - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded bg-fogo px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#8c2818] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSend}
                  className="inline-flex items-center gap-2 rounded bg-zap px-6 py-3.5 font-semibold text-white transition-colors hover:bg-zap-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado"
                >
                  <WhatsAppIcon />
                  Enviar orçamento pelo WhatsApp
                </button>
              )}
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-carvao/60">
          Prefere não preencher nada?{' '}
          <a
            href={buildWhatsAppUrl('Olá! Gostaria de um orçamento de churrasco.')}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-fogo underline decoration-dourado underline-offset-4"
          >
            Chame direto no WhatsApp
          </a>
          .
        </p>
      </div>
    </Section>
  );
};
