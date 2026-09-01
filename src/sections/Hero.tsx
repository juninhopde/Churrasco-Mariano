import { ChevronDown } from 'lucide-react';
import { businessConfig } from '../config/business';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { CTAButton } from '../components/CTAButton';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { photos, url } from '../data/images';

/**
 * Para usar a SUA foto de fundo:
 * 1. salve em src/assets/hero/hero.jpg
 * 2. import heroImg from '../assets/hero/hero.jpg';
 * 3. troque `fundo` abaixo por `heroImg`
 */
const fundo = url(photos.heroChurrasqueiro, 1920);

const trustPills = [
  '5 anos de experiência',
  'Churrasqueiro ou buffet completo',
  'Ingredientes selecionados no dia',
  'Bragança Paulista e região',
];

export const Hero = () => (
  <section
    id="inicio"
    className="relative flex min-h-[92svh] items-center overflow-hidden bg-carvao"
  >
    {/* Foto de fundo + camadas escuras: sem elas o texto branco não tem contraste */}
    <img
      src={fundo}
      alt=""
      aria-hidden="true"
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-cover motion-safe:animate-hero-zoom"
    />
    <div aria-hidden="true" className="absolute inset-0 bg-carvao/72 motion-safe:animate-fire-flicker" />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(120%_85%_at_78%_12%,rgba(197,139,58,0.28)_0%,rgba(168,50,32,0.18)_38%,transparent_72%)] motion-safe:animate-fire-glow"
    />
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-carvao to-transparent" />

    <div className="relative mx-auto w-full max-w-content px-5 pb-20 pt-32 sm:px-8 sm:pt-36">
      <p className="mb-5 text-sm tracking-[0.22em] text-dourado">{businessConfig.slogan}</p>

      <h1 className="max-w-4xl font-display text-4xl leading-[1.08] text-creme motion-safe:animate-fade-up sm:text-5xl lg:text-6xl">
        Churrasqueiro profissional para o seu evento
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-creme/80 motion-safe:animate-fade-up">
        Churrasco preparado na hora, no seu espaço. Só o churrasqueiro ou o buffet completo — você escolhe e ninguém fica preso na churrasqueira.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <CTAButton
          href={buildWhatsAppUrl('Olá! Gostaria de um orçamento de churrasco.')}
          external
          variant="zap"
          size="lg"
        >
          <WhatsAppIcon />
          Pedir orçamento
        </CTAButton>
        <CTAButton href="#servico" variant="outlineLight" size="lg">
          Qual serviço escolher?
        </CTAButton>
      </div>

      <p className="mt-4 text-sm text-creme/70">
        Bragança Paulista e região · Resposta no mesmo dia · {businessConfig.phoneDisplay}
      </p>

      <ul className="mt-12 grid gap-x-8 gap-y-3 border-t border-creme/15 pt-7 sm:grid-cols-2 lg:grid-cols-4">
        {trustPills.map((pill) => (
          <li key={pill} className="flex items-start gap-2 text-sm text-creme/80">
            <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-dourado" />
            {pill}
          </li>
        ))}
      </ul>
    </div>

    <a
      href="#como-funciona"
      aria-label="Ver como funciona"
      className="absolute bottom-5 left-1/2 -translate-x-1/2 text-creme/50 transition-colors hover:text-dourado"
    >
      <ChevronDown className="h-7 w-7" aria-hidden="true" />
    </a>
  </section>
);
