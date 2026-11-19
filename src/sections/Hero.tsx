import { ChevronDown } from 'lucide-react';
import { businessConfig } from '../config/business';
import { CTAButton } from '../components/CTAButton';
import { Embers } from '../components/Embers';
import { EventTagline } from '../components/EventTagline';
import { photos, url } from '../data/images';
import { goToQuote } from '../utils/scroll';

/**
 * Para usar a SUA foto de fundo:
 * 1. salve em src/assets/hero/hero.jpg
 * 2. import heroImg from '../assets/hero/hero.jpg';
 * 3. troque `fundo` e `fundoSrcSet` abaixo por `heroImg`
 */
const fundo = url(photos.heroChurrasqueiro, 1280);
// Três tamanhos: o celular baixa a menor, não a de 1920px.
const fundoSrcSet = [800, 1280, 1920].map((w) => `${url(photos.heroChurrasqueiro, w)} ${w}w`).join(', ');

export const Hero = () => (
  <section
    id="inicio"
    className="relative flex min-h-[85svh] items-center overflow-hidden bg-carvao"
  >
    {/* Foto de fundo + camadas escuras: sem elas o texto branco não tem contraste */}
    <img
      src={fundo}
      srcSet={fundoSrcSet}
      sizes="100vw"
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover motion-safe:animate-hero-zoom"
    />
    {/* Celular: sombra uniforme (o texto ocupa a largura toda). Desktop: sombra leve no geral e mais
        forte só do lado do texto, para a chama da direita ficar viva e alegre sem perder leitura. */}
    <div aria-hidden="true" className="absolute inset-0 bg-carvao/72 motion-safe:animate-fire-flicker sm:bg-carvao/25" />
    <div
      aria-hidden="true"
      className="absolute inset-0 hidden bg-gradient-to-r from-carvao/80 via-carvao/45 to-transparent sm:block"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(120%_85%_at_78%_12%,rgba(197,139,58,0.28)_0%,rgba(168,50,32,0.18)_38%,transparent_72%)] motion-safe:animate-fire-glow"
    />
    {/* Brilho de brasa na base, "respirando": liga o topo à faixa vermelha logo abaixo */}
    <div
      aria-hidden="true"
      className="glow-breathe absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-fogo/80 via-brasa/25 to-transparent"
    />
    {/* Faíscas de brasa subindo — por cima das camadas escuras, por baixo do texto */}
    <Embers />

    <div className="relative mx-auto w-full max-w-content px-5 pb-20 pt-32 sm:px-8 sm:pt-36">
      <p className="mb-5 text-sm tracking-[0.22em] text-dourado">{businessConfig.slogan}</p>

      <h1 className="max-w-4xl font-display text-4xl leading-[1.08] text-creme motion-safe:animate-fade-up sm:text-5xl lg:text-6xl">
        Churrasqueiro profissional para o seu evento
      </h1>

      <EventTagline />

      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-creme/80 motion-safe:animate-fade-up">
        Churrasco preparado na hora, no seu espaço. Escolha só o churrasqueiro ou o buffet completo, e ninguém fica preso na churrasqueira.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <CTAButton
          href="#orcamento"
          onClick={(e) => {
            e.preventDefault();
            goToQuote();
          }}
          variant="fogo"
          size="lg"
          className="btn-shine btn-pulse"
        >
          Pedir orçamento
        </CTAButton>
        <CTAButton href="#servicos" variant="outlineLight" size="lg">
          Ver os serviços
        </CTAButton>
      </div>
    </div>

    <a
      href="#servicos"
      aria-label="Ver os serviços"
      className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-creme/50 transition-colors hover:text-dourado sm:block"
    >
      <ChevronDown className="h-7 w-7" aria-hidden="true" />
    </a>
  </section>
);
