import { menuCategories } from '../data/menu';
import type { MenuSelection } from '../utils/quote';
import { ChipGroup } from './ChipGroup';

interface MenuPickerProps {
  /** Prefixo dos ids — a página tem dois seletores (seção Cardápio e formulário). */
  idBase: string;
  selection: MenuSelection;
  onToggle: (categoryId: string, item: string) => void;
  activeId: string;
  onActiveChange: (categoryId: string) => void;
  tone?: 'light' | 'dark';
}

/**
 * Cardápio compacto: uma linha de categorias e, embaixo, os itens da categoria escolhida.
 * Tocar num item liga/desliga. A seleção é opcional e compartilhada (ver useQuoteDraft).
 */
export const MenuPicker = ({ idBase, selection, onToggle, activeId, onActiveChange, tone = 'dark' }: MenuPickerProps) => {
  const current = menuCategories.find((c) => c.id === activeId) ?? menuCategories[0];
  if (!current) return null;

  const dark = tone === 'dark';
  const tabOn = dark ? 'border-dourado bg-dourado text-carvao' : 'border-carvao bg-carvao text-creme';
  const tabOff = dark
    ? 'border-creme/25 text-creme/80 hover:border-dourado hover:text-dourado'
    : 'border-carvao/25 text-carvao/75 hover:border-dourado hover:text-carvao';

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Categorias do cardápio">
        {menuCategories.map((category) => {
          const count = selection[category.id]?.length ?? 0;
          const isActive = category.id === current.id;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isActive}
              aria-controls={`${idBase}-itens`}
              onClick={() => onActiveChange(category.id)}
              className={`min-h-[2.75rem] rounded-md border px-3.5 py-2 text-sm font-semibold transition-colors ${
                isActive ? tabOn : tabOff
              }`}
            >
              {category.title}
              {count > 0 && (
                <span
                  className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-fogo px-1.5 text-xs font-bold text-white"
                  aria-label={`${count} ${count === 1 ? 'item escolhido' : 'itens escolhidos'}`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div id={`${idBase}-itens`} className="mt-5">
        {current.note && <p className={`mb-3 text-sm ${dark ? 'text-dourado' : 'text-carvao/65'}`}>{current.note}</p>}
        <ChipGroup
          label={`Itens de ${current.title}`}
          tone={tone}
          options={current.items}
          selected={selection[current.id] ?? []}
          onToggle={(item) => onToggle(current.id, item)}
        />
      </div>
    </div>
  );
};
