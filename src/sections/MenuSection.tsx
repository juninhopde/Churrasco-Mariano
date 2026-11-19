import { useState } from 'react';
import { menuCategories } from '../data/menu';
import { Section } from '../components/Section';
import { SectionTitle } from '../components/SectionTitle';
import { AppImage } from '../components/AppImage';
import { MenuPicker } from '../components/MenuPicker';
import type { QuoteDraft } from '../hooks/useQuoteDraft';
import { countSelected } from '../utils/quote';
import { goToQuote } from '../utils/scroll';

interface MenuSectionProps {
  quote: QuoteDraft;
}

export const MenuSection = ({ quote }: MenuSectionProps) => {
  const [active, setActive] = useState(menuCategories[0]?.id ?? '');
  const current = menuCategories.find((c) => c.id === active) ?? menuCategories[0];
  const { data } = quote;
  const total = countSelected(data.menu);

  const askBuffet = () => {
    quote.update('service', 'buffet');
    goToQuote();
  };

  return (
    <Section id="cardapio" tone="grafite">
      <SectionTitle
        title="Cardápio do buffet"
        subtitle="Consulte as opções. Se quiser, toque nos itens que mais gosta: eles vão junto no orçamento. Nada aqui é obrigatório."
        invert
      />

      {current && (
        <div className="grid overflow-hidden rounded-lg border border-creme/15 bg-carvao lg:grid-cols-[1fr_1.35fr]">
          {/* A foto preenche a coluna sem mandar na altura do card (foto em retrato esticava tudo). */}
          <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[360px]">
            <AppImage
              photo={current.photo}
              aspect=""
              width={700}
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <div className="mb-8">
              <MenuPicker
                idBase="menu-secao"
                tone="dark"
                selection={data.menu}
                onToggle={quote.toggleMenuItem}
                activeId={active}
                onActiveChange={setActive}
              />
            </div>

            <div className="mt-auto border-t border-creme/15 pt-6">
              <label className="flex cursor-pointer items-start gap-3 text-sm text-creme/90">
                <input
                  type="checkbox"
                  checked={data.wantsSuggestion}
                  onChange={(e) => quote.update('wantsSuggestion', e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[#C58B3A]"
                />
                <span>Prefiro receber uma sugestão de cardápio.</span>
              </label>

              <p className="mt-4 text-sm text-creme/65" aria-live="polite">
                {total === 0
                  ? 'Nenhum item escolhido. Está tudo bem: montamos junto com você, inclusive opção vegetariana e restrições alimentares.'
                  : `${total} ${total === 1 ? 'item escolhido' : 'itens escolhidos'}.`}
              </p>

              {data.service === 'churrasqueiro' && (
                <p className="mt-2 text-xs text-dourado">
                  Você marcou “Somente churrasqueiro”, em que as carnes são suas. O cardápio vale para o Buffet completo.
                </p>
              )}

              <button
                type="button"
                onClick={askBuffet}
                className="mt-5 w-full rounded-md bg-fogo px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#8c2818] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado sm:w-auto"
              >
                Pedir orçamento do buffet
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};
