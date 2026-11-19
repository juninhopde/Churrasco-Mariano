import type { MouseEvent, ReactNode } from 'react';

type Variant = 'fogo' | 'zap' | 'outline' | 'outlineLight' | 'dourado';

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  size?: 'md' | 'lg';
  className?: string;
  ariaLabel?: string;
  /** Para links internos que precisam de comportamento extra (ex.: focar o formulário). */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const variants: Record<Variant, string> = {
  fogo: 'bg-fogo text-white hover:bg-[#8c2818] border-transparent',
  zap: 'bg-zap text-white hover:bg-zap-dark border-transparent',
  dourado: 'bg-dourado text-carvao hover:bg-[#b07a2f] border-transparent',
  outline: 'bg-transparent text-carvao border-carvao hover:bg-carvao hover:text-creme',
  outlineLight: 'bg-transparent text-creme border-creme/60 hover:bg-creme hover:text-carvao',
};

export const CTAButton = ({
  href,
  children,
  variant = 'fogo',
  external = false,
  size = 'md',
  className = '',
  ariaLabel,
  onClick,
}: CTAButtonProps) => (
  <a
    href={href}
    aria-label={ariaLabel}
    onClick={onClick}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className={`inline-flex items-center justify-center gap-2 rounded-md border-2 font-semibold tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado ${
      size === 'lg' ? 'px-7 py-4 text-base' : 'px-5 py-3 text-sm'
    } ${variants[variant]} ${className}`}
  >
    {children}
  </a>
);
