import type { Service } from '../data/services';
import { AppImage } from './AppImage';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const Icon = service.icon;

  return (
    <article className="group flex flex-col overflow-hidden rounded border border-carvao/12 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-dourado hover:shadow-lg motion-reduce:transform-none">
      <AppImage photo={service.photo} aspect="aspect-[16/10]" width={640} />

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-creme text-fogo">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </span>

        <h3 className="font-display text-xl">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-carvao/70">{service.description}</p>

        <a
          href={buildWhatsAppUrl(service.ctaMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-fogo transition-colors hover:text-carvao focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Pedir orçamento
        </a>
      </div>
    </article>
  );
};
