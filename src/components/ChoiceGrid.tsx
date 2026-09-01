interface ChoiceGridProps {
  options: readonly string[];
  selected: string[];
  onToggle: (option: string) => void;
  multi?: boolean;
  columns?: 1 | 2 | 3;
}

export const ChoiceGrid = ({ options, selected, onToggle, multi = false, columns = 2 }: ChoiceGridProps) => {
  const cols = { 1: 'grid-cols-1', 2 : 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-2 sm:grid-cols-3' }[columns];

  return (
    <div className={`grid gap-3 ${cols}`} role={multi ? 'group' : 'radiogroup'}>
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            role={multi ? 'checkbox' : 'radio'}
            aria-checked={active}
            onClick={() => onToggle(option)}
            className={`rounded border-2 px-4 py-3.5 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado ${
              active
                ? 'border-fogo bg-fogo/10 text-carvao'
                : 'border-carvao/20 bg-white text-carvao/80 hover:border-dourado'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
