interface ChipGroupProps {
  options: readonly string[];
  selected: readonly string[];
  onToggle: (option: string) => void;
  /** Nome do grupo para leitores de tela. */
  label: string;
  /** 'light' em fundo claro (formulário), 'dark' em fundo escuro (cardápio). */
  tone?: 'light' | 'dark';
}

const tones = {
  light: {
    on: 'border-fogo bg-fogo text-white animate-pop',
    off: 'border-carvao/25 bg-white text-carvao/80 hover:border-dourado hover:text-carvao',
  },
  dark: {
    on: 'border-dourado bg-dourado text-carvao animate-pop',
    off: 'border-creme/25 text-creme/80 hover:border-dourado hover:text-creme',
  },
} as const;

/** Botões em formato de pílula que ligam e desligam (selecionar de novo desmarca). */
export const ChipGroup = ({ options, selected, onToggle, label, tone = 'light' }: ChipGroupProps) => (
  <div role="group" aria-label={label} className="flex flex-wrap gap-2">
    {options.map((option) => {
      const on = selected.includes(option);
      return (
        <button
          key={option}
          type="button"
          aria-pressed={on}
          onClick={() => onToggle(option)}
          className={`min-h-[2.75rem] rounded-full border px-4 py-2 text-sm font-semibold transition-[color,background-color,border-color,transform] motion-safe:active:scale-95 ${
            on ? tones[tone].on : tones[tone].off
          }`}
        >
          {option}
        </button>
      );
    })}
  </div>
);
