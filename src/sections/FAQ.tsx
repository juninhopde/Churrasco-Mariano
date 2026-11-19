import { faqItems } from '../data/faq';
import { Section } from '../components/Section';
import { SectionTitle } from '../components/SectionTitle';
import { Accordion } from '../components/Accordion';

export const FAQ = () => (
  <Section id="faq" tone="creme">
    <div className="mx-auto max-w-3xl">
      <SectionTitle
        title="Perguntas frequentes"
        subtitle="As dúvidas que mais aparecem nos orçamentos."
      />
      <Accordion items={faqItems} />
    </div>
  </Section>
);
