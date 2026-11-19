import { Mail, Phone, Instagram, Facebook, MapPin } from 'lucide-react';
import { businessConfig } from '../config/business';
import { buildWhatsAppUrl, DEFAULT_MESSAGE } from '../utils/whatsapp';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

const siteLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Pedir orçamento', href: '#orcamento' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Perguntas frequentes', href: '#faq' },
];

const linkClass = 'inline-flex min-h-[2.75rem] items-center gap-2 transition-colors hover:text-dourado';

export const Footer = () => (
  <footer className="bg-carvao pb-28 pt-14 text-creme/75 sm:pb-14">
    <div className="mx-auto w-full max-w-content px-5 sm:px-8">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-xl text-creme">{businessConfig.name}</p>
          <p className="mt-2 text-sm text-dourado">{businessConfig.slogan}</p>
          <p className="mt-4 flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-dourado" aria-hidden="true" />
            {businessConfig.city} — {businessConfig.state} e região
          </p>
        </div>

        <nav aria-label="Atalhos do site">
          <h2 className="mb-3 font-display text-lg text-creme">Navegue</h2>
          <ul className="space-y-0.5 text-sm">
            {siteLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 font-display text-lg text-creme">Contato</h2>
          <ul className="space-y-0.5 text-sm">
            <li>
              <a
                href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chamar no WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:+${businessConfig.whatsapp}`} className={linkClass}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Ligar {businessConfig.phoneDisplay}
              </a>
            </li>
            {businessConfig.email && (
              <li>
                <a href={`mailto:${businessConfig.email}`} className={`${linkClass} break-all`}>
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {businessConfig.email}
                </a>
              </li>
            )}
            {businessConfig.instagram && (
              <li>
                <a
                  href={businessConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  Instagram
                </a>
              </li>
            )}
            {businessConfig.facebook && (
              <li>
                <a
                  href={businessConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                  Facebook
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <p className="mt-12 border-t border-creme/10 pt-6 text-xs text-creme/55">
        © {new Date().getFullYear()} {businessConfig.name}. Todos os direitos reservados.
        {businessConfig.cnpj && ` · CNPJ ${businessConfig.cnpj}`}
      </p>
    </div>
  </footer>
);
