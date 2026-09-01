import { ClipboardList, MessageSquare, FileText, Flame } from 'lucide-react';
import { howItWorksSteps } from '../data/steps';
import { Section } from '../components/Section';
import { SectionTitle } from '../components/SectionTitle';
import { Reveal } from '../components/Reveal';

const icons = [ClipboardList, MessageSquare, FileText, Flame];

export const HowItWorks = () => (
  <Section id="como-funciona" tone="creme">
    <SectionTitle
      title="Como funciona"
      subtitle="Quatro passos entre a sua ideia e a brasa acesa na sua casa."
    />

    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {howItWorksSteps.map((step, i) => {
        const Icon = icons[i] ?? Flame;
        return (
          <Reveal key={step.number} delay={i * 90}>
            <li className="group h-full rounded border border-carvao/12 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-dourado hover:shadow-lg motion-reduce:transform-none">
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-dourado">{step.number}</span>
                <Icon className="h-6 w-6 text-fogo" strokeWidth={1.6} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-carvao/70">{step.description}</p>
            </li>
          </Reveal>
        );
      })}
    </ol>
  </Section>
);
