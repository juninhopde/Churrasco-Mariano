import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** 'creme' | 'carvao' | 'grafite' | 'branco' */
  tone?: 'creme' | 'carvao' | 'grafite' | 'branco';
}

const tones: Record<NonNullable<SectionProps['tone']>, string> = {
  creme: 'bg-creme text-carvao',
  carvao: 'bg-carvao text-creme',
  grafite: 'bg-grafite text-creme',
  branco: 'bg-white text-carvao',
};

export const Section = ({ id, children, className = '', tone = 'branco' }: SectionProps) => (
  <section id={id} className={`${tones[tone]} scroll-mt-20 py-16 sm:py-24 ${className}`}>
    <div className="mx-auto w-full max-w-content px-5 sm:px-8">{children}</div>
  </section>
);
