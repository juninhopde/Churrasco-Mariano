import { buildWhatsAppUrl } from '../utils/whatsapp';
import { CTAButton } from '../components/CTAButton';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

export const CTABand = () => (
  <section className="bg-fogo py-14 text-white">
    <div className="mx-auto grid w-full max-w-content items-center gap-6 px-5 sm:px-8 lg:grid-cols-[1fr_auto]">
      <div>
        <h2 className="font-display text-2xl leading-tight sm:text-3xl">
          Seu evento merece um churrasco à altura.
        </h2>
        <p className="mt-3 max-w-xl text-white/90">
          Conte para nós como será seu evento e receba uma proposta personalizada.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <CTAButton href="#orcamento" variant="dourado" size="lg">
          Quero meu orçamento
        </CTAButton>
        <CTAButton
          href={buildWhatsAppUrl('Olá! Gostaria de um orçamento de churrasco.')}
          external
          variant="outlineLight"
          size="lg"
          className="border-white/70 text-white hover:bg-white hover:text-fogo"
        >
          <WhatsAppIcon />
          WhatsApp
        </CTAButton>
      </div>
    </div>
  </section>
);
