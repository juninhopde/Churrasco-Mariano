import { useState } from 'react';
import { Check, X as XIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { serviceOptions, menuCategories } from '../data/menu';
import { Section } from '../components/Section';
import { SectionTitle } from '../components/SectionTitle';
import { AppImage } from '../components/AppImage';
import { CTAButton } from '../components/CTAButton';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { Reveal } from '../components/Reveal';

/** Monta a mensagem do buffet com os itens selecionados. */
const buildBuffetMessage = (selectedItems: Record<string, string[]>): string => {
  const lines: string[] = ['Olá! Quero orçamento do *Buffet completo*.\n'];
  for (const cat of menuCategories) {
    const chosen = selectedItems[cat.id];
    if (chosen && chosen.length > 0) {
      lines.push(`*${cat.title}:* ${chosen.join(', ')}`);
    }
  }
  lines.push('\nGostaria de receber os valores e condições.');
  return lines.join('\n');
};

export const ServiceSelector = () => {
  const [active, setActive] = useState<'churrasqueiro' | 'buffet'>('churrasqueiro');
  const selected = serviceOptions.find((o) => o.id === active) ?? serviceOptions[0];

  // Buffet: itens selecionados por categoria
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});
  const [expandedCat, setExpandedCat] = useState<string | null>(menuCategories[0]?.id ?? null);

  const toggleItem = (catId: string, item: string) => {
    setSelectedItems((prev) => {
      const current = prev[catId] ?? [];
      return {
        ...prev,
        [catId]: current.includes(item)
          ? current.filter((i) => i !== item)
          : [...current, item],
      };
    });
  };

  const totalSelected = Object.values(selectedItems).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <Section id="servico" tone="carvao">
      <SectionTitle
        title="Escolha o serviço ideal"
        subtitle="Duas formas de contratar. Clique e veja o que está incluso em cada uma."
        invert
        align="center"
      />

      {/* Toggle de escolha */}
      <div className="mx-auto mb-10 flex max-w-lg overflow-hidden rounded-lg border border-creme/20">
        {serviceOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setActive(option.id)}
            className={`flex-1 py-4 text-center font-display text-lg transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado sm:text-xl ${
              active === option.id
                ? 'bg-fogo text-white'
                : 'bg-transparent text-creme/70 hover:text-creme'
            }`}
          >
            {option.title}
            {option.tagline && (
              <span className={`mt-0.5 block text-xs font-sans font-semibold uppercase tracking-wider ${
                active === option.id ? 'text-white/80' : 'text-dourado'
              }`}>
                {option.tagline}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Card do serviço selecionado */}
      <Reveal key={selected.id}>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-creme/15 bg-grafite">
          <div className="grid lg:grid-cols-2">
            <AppImage
              photo={selected.photo}
              aspect="aspect-[4/3] lg:aspect-auto lg:min-h-[420px]"
              width={800}
              className="h-full"
            />

            <div className="flex flex-col justify-center p-7 sm:p-10">
              <h3 className="font-display text-3xl text-creme">{selected.title}</h3>
              <p className="mt-3 text-creme/75">{selected.description}</p>

              <div className="mt-7">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-dourado">O que está incluso</p>
                <ul className="space-y-2.5">
                  {selected.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-creme/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-zap" strokeWidth={2.5} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {selected.notIncludes && selected.notIncludes.length > 0 && (
                <div className="mt-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-creme/50">Fica por sua conta</p>
                  <ul className="space-y-2">
                    {selected.notIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-creme/55">
                        <XIcon className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Churrasqueiro: CTA direto */}
              {active === 'churrasqueiro' && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <CTAButton href={buildWhatsAppUrl(selected.ctaMessage)} external variant="zap" size="lg">
                    <WhatsAppIcon />
                    Pedir orçamento
                  </CTAButton>
                  <CTAButton href="#orcamento" variant="outlineLight">
                    Montar pelo formulário
                  </CTAButton>
                </div>
              )}
            </div>
          </div>

          {/* Buffet: seletor de itens */}
          {active === 'buffet' && (
            <div className="border-t border-creme/15 p-7 sm:p-10">
              <h4 className="font-display text-2xl text-creme">Monte seu buffet</h4>
              <p className="mt-2 mb-6 text-sm text-creme/65">
                Selecione os itens que te interessam. No final, tudo vira uma mensagem organizada no WhatsApp.
              </p>

              <div className="space-y-3">
                {menuCategories.map((cat) => {
                  const isOpen = expandedCat === cat.id;
                  const chosen = selectedItems[cat.id] ?? [];

                  return (
                    <div key={cat.id} className="overflow-hidden rounded border border-creme/15 bg-carvao">
                      <button
                        type="button"
                        onClick={() => setExpandedCat(isOpen ? null : cat.id)}
                        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-creme/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dourado"
                      >
                        <div>
                          <span className="font-display text-lg text-creme">{cat.title}</span>
                          {chosen.length > 0 && (
                            <span className="ml-3 rounded-full bg-fogo/90 px-2.5 py-0.5 text-xs font-bold text-white">
                              {chosen.length} {chosen.length === 1 ? 'item' : 'itens'}
                            </span>
                          )}
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 shrink-0 text-dourado" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="h-5 w-5 shrink-0 text-creme/50" aria-hidden="true" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="border-t border-creme/10 px-5 py-4">
                          {cat.note && <p className="mb-3 text-xs text-dourado">{cat.note}</p>}
                          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {cat.items.map((item) => {
                              const isSelected = chosen.includes(item);
                              return (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() => toggleItem(cat.id, item)}
                                  className={`flex items-center gap-2.5 rounded border-2 px-4 py-3 text-left text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-dourado ${
                                    isSelected
                                      ? 'border-fogo bg-fogo/15 text-creme'
                                      : 'border-creme/15 text-creme/70 hover:border-dourado/50 hover:text-creme'
                                  }`}
                                >
                                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                                    isSelected ? 'bg-fogo text-white' : 'border border-creme/30'
                                  }`}>
                                    {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                                  </span>
                                  {item}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Resumo e CTA */}
              <div className="mt-8 rounded-lg border border-dourado/30 bg-carvao p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-creme">
                      {totalSelected === 0
                        ? 'Nenhum item selecionado'
                        : `${totalSelected} ${totalSelected === 1 ? 'item selecionado' : 'itens selecionados'}`}
                    </p>
                    {totalSelected > 0 && (
                      <p className="mt-1 text-xs text-creme/55">
                        {Object.entries(selectedItems)
                          .filter(([, items]) => items.length > 0)
                          .map(([catId, items]) => {
                            const cat = menuCategories.find((c) => c.id === catId);
                            return `${cat?.title}: ${items.join(', ')}`;
                          })
                          .join(' · ')}
                      </p>
                    )}
                  </div>

                  <CTAButton
                    href={buildWhatsAppUrl(buildBuffetMessage(selectedItems))}
                    external
                    variant="zap"
                    size="lg"
                    className="shrink-0"
                  >
                    <WhatsAppIcon />
                    {totalSelected === 0 ? 'Pedir orçamento geral' : 'Enviar seleção no WhatsApp'}
                  </CTAButton>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-creme/45">
                Não sabe ainda o que escolher? Sem problema — peça o orçamento geral e a gente monta junto.
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
};
