import type { ChangeEvent, ReactNode } from 'react';

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'date' | 'time' | 'number';
  error?: string;
  placeholder?: string;
  min?: string;
  hint?: ReactNode;
}

export const Field = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  error,
  placeholder,
  min,
  hint,
}: FieldProps) => {
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
  const errorId = `${name}-erro`;

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        min={min}
        placeholder={placeholder}
        onChange={handle}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded border bg-white px-3.5 py-3 text-base outline-none transition-colors focus:border-dourado focus:ring-2 focus:ring-dourado/30 ${
          error ? 'border-fogo' : 'border-carvao/25'
        }`}
      />
      {hint && !error && <p className="mt-1.5 text-xs text-carvao/55">{hint}</p>}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-semibold text-fogo">
          {error}
        </p>
      )}
    </div>
  );
};
