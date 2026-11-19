import type { ChangeEvent, ReactNode } from 'react';

interface FieldProps {
  label: string;
  /** Vira o id do campo — o formulário usa isso para focar o primeiro erro. */
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'date' | 'time' | 'number';
  error?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  maxLength?: number;
  inputMode?: 'text' | 'numeric' | 'tel' | 'email';
  autoComplete?: string;
  required?: boolean;
  hint?: ReactNode;
  className?: string;
  inputClassName?: string;
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
  max,
  maxLength,
  inputMode,
  autoComplete,
  required = false,
  hint,
  className = '',
  inputClassName = '',
}: FieldProps) => {
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
  const errorId = `${name}-erro`;
  const hintId = `${name}-dica`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">
        {label}
        {required && (
          <span className="text-fogo" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        min={min}
        max={max}
        maxLength={maxLength}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={handle}
        required={required}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`min-h-[3rem] w-full scroll-mt-28 rounded-md border bg-white px-3.5 py-3 text-base outline-none transition-colors focus:border-dourado focus:ring-2 focus:ring-dourado/30 ${
          error ? 'border-fogo' : 'border-carvao/25'
        } ${inputClassName}`}
      />
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-carvao/60">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-semibold text-fogo">
          {error}
        </p>
      )}
    </div>
  );
};
