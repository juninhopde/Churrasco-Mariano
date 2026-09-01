import { Check } from 'lucide-react';
import { Section } from '../components/Section';
import { AppImage } from '../components/AppImage';
import { photos } from '../data/images';
import { CTAButton } from '../components/CTAButton';
import { Reveal } from '../components/Reveal';

const pillars = [
  'Carnes selecionadas e temperadas no dia do evento',
  'Preparo no local, servido na hora e até o último convidado',
  'Equipe uniformizada cuidando da brasa e do atendimento',
  'Organização do início ao fim: preparo, serviço à mesa e limpeza da área da brasa',
];

export const Experience = () => (
  <Section id="experiencia" tone="branco">
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className="order-2 lg:order-1">
        <h2 className="font-display text-3xl leading-tight sm:text-4xl">
          Mais do que churrasco. Uma experiência completa.
        </h2>
        <span className="mt-6 block h-px w-16 bg-dourado" aria-hidden="true" />

        <p className="mt-6 text-base leading-relaxed text-carvao/75">
          Um churrasco bom não é só a carne no ponto. É a mesa montada quando o primeiro convidado chega, é
          alguém cuidando da brasa enquanto você conversa, é a carne chegando na mesa sem intervalo e a área
          limpa no fim da festa.
        </p>
        <p className="mt-4 text-base leading-relaxed text-carvao/75">
          É isso que a gente entrega: você recebe os convidados e não precisa entrar na cozinha nenhuma vez.
        </p>

        <ul className="mt-8 space-y-3">
          {pillars.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-fogo" strokeWidth={2} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <CTAButton href="#orcamento" variant="outline" className="mt-9">
          Montar meu orçamento
        </CTAButton>
      </Reveal>

      <Reveal className="order-1 lg:order-2" delay={120}>
        <AppImage photo={photos.grelhaCheia} aspect="aspect-[4/5]" width={720} className="rounded" />
      </Reveal>
    </div>
  </Section>
);
