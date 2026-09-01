import { buildWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp = () => (
  <a
    href={buildWhatsAppUrl('Olá! Gostaria de um orçamento de churrasco.')}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp"
    className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-zap px-4 py-3 font-semibold text-white shadow-lg shadow-black/25 transition-colors hover:bg-zap-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado motion-safe:animate-ring"
  >
    <WhatsAppIcon className="h-6 w-6" />
    <span className="hidden sm:inline">Fale conosco</span>
  </a>
);
