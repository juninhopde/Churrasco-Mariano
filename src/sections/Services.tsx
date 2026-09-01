import { services } from '../data/services';
import { Section } from '../components/Section';
import { SectionTitle } from '../components/SectionTitle';
import { ServiceCard } from '../components/ServiceCard';
import { Reveal } from '../components/Reveal';

export const Services = () => (
  <Section id="servicos" tone="creme">
    <SectionTitle
      title="Para cada tipo de evento"
      subtitle="Do churrasco de domingo em família à confraternização de fim de ano da empresa."
    />

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <Reveal key={service.id} delay={i * 80}>
          <ServiceCard service={service} />
        </Reveal>
      ))}
    </div>
  </Section>
);
