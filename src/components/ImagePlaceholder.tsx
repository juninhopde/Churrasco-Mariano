interface ImagePlaceholderProps {
  label: string;
  folder?: string;
  className?: string;
  /** Proporção via classe Tailwind, ex.: 'aspect-[4/3]' */
  aspect?: string;
}

/**
 * Espaço reservado para foto real.
 * Não usa banco de imagem de propósito: foto genérica em site de churrasqueiro
 * é reconhecida na hora pelo cliente e derruba a confiança.
 */
export const ImagePlaceholder = ({
  label,
  folder = 'src/assets/',
  className = '',
  aspect = 'aspect-[4/3]',
}: ImagePlaceholderProps) => (
  <div
    role="img"
    aria-label={`Espaço reservado para foto: ${label}`}
    className={`${aspect} ${className} flex flex-col items-center justify-center gap-2 border border-dashed border-dourado/50 bg-grafite p-4 text-center`}
  >
    <span className="font-display text-lg text-dourado">{label}</span>
    <span className="text-xs leading-snug text-creme/55">
      Coloque a foto real em <code className="text-creme/80">{folder}</code>
    </span>
  </div>
);
