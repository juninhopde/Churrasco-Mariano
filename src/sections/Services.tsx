import { Check } from 'lucide-react';
import { serviceOptions, type ServiceOption } from '../data/menu';
import { Section } from '../components/Section';
import { SectionTitle } from '../components/SectionTitle';
import { AppImage } from '../components/AppImage';
import { Reveal } from '../components/Reveal';
import type { QuoteDraft } from '../hooks/useQuoteDraft';
import { goToQuote } from '../utils/scroll';

interface ServicesProps {
  quote: QuoteDraft;
}

interface ServiceCardProps {
  option: ServiceOption;
  selected: boolean;
  onChoose: () => void;
}

const ServiceCard = ({ option, selected, onChoose }: ServiceCardProps) => (
  <article
    className={`flex h-full flex-col overflow-hidden rounded-lg border bg-white transition-all duration-300 ${
      selected ? 'border-fogo shadow-md ring-2 ring-fogo/30' : 'border-carvao/10 shadow-sm hover:border-dourado hover:shadow-md'
    }`}
  >
    <div className="relative">
      <AppImage photo={option.photo} aspect="aspect-[4/3]" width={720} />
      <span className="absolute left-3 top-3 rounded-full bg-carvao/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-dourado">
        {option.tagline}
      </span>
      {selected && (
        <span className="absolute right-3 top-3 inline-flex animate-pop items-center gap-1 rounded-full bg-fogo px-3 py-1 text-xs font-semibold text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
          Selecionado
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col p-6">
      <h3 className="font-display text-2xl">{option.title}</h3>
      <p className="mt-2 text-carvao/75">{option.description}</p>

      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-fogo">Inclui</p>
      <ul className="mt-3 space-y-2.5">
        {option.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-carvao/85">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-fogo" strokeWidth={2.5} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-carvao/60">
        <span className="font-semibold">Fica por sua conta:</span> {option.notIncludes.join(' · ')}
      </p>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={onChoose}
          aria-label={`Pedir orçamento: ${option.title}`}
          className="w-full rounded-md bg-fogo px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#8c2818] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado"
        >
          Pedir orçamento
        </button>
      </div>
    </div>
  </article>
);

export const Services = ({ quote }: ServicesProps) => {
  const choose = (id: ServiceOption['id']) => {
    quote.update('service', id);
    goToQuote();
  };

  return (
    <Section id="servicos" tone="branco">
      <SectionTitle
        title="Como você quer contratar?"
        subtitle="Escolha uma opção e peça o orçamento. A escolha já vai preenchida no formulário."
        align="center"
      />

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {serviceOptions.map((option, i) => (
          <Reveal key={option.id} delay={i * 90} className="h-full">
            <ServiceCard option={option} selected={quote.data.service === option.id} onChoose={() => choose(option.id)} />
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-carvao/60">
        Aniversários, casamentos, confraternizações, eventos de empresa e churrascos em família.
      </p>
    </Section>
  );
};
