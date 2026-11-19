interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  invert?: boolean;
  /** Quando informado, o título pode receber foco por código (usado ao pular para o formulário). */
  id?: string;
}

export const SectionTitle = ({ title, subtitle, align = 'left', invert = false, id }: SectionTitleProps) => (
  <div className={`mb-10 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <h2
      id={id}
      tabIndex={id ? -1 : undefined}
      className="font-display text-3xl leading-tight focus:outline-none sm:text-4xl"
    >
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 text-base leading-relaxed ${invert ? 'text-creme/75' : 'text-carvao/70'}`}>
        {subtitle}
      </p>
    )}
    <span
      className={`mt-6 block h-px w-16 bg-dourado ${align === 'center' ? 'mx-auto' : ''}`}
      aria-hidden="true"
    />
  </div>
);
