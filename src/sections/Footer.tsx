import { Mail, Phone, Instagram, Facebook, MapPin } from 'lucide-react';
import { businessConfig } from '../config/business';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

const empresaLinks = [
  { label: 'Quem somos', href: '#experiencia' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Cardápios', href: '#cardapio' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Perguntas frequentes', href: '#faq' },
];

export const Footer = () => (
  <footer className="bg-carvao pb-24 pt-16 text-creme/75 sm:pb-16">
    <div className="mx-auto w-full max-w-content px-5 sm:px-8">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-creme">{businessConfig.name}</p>
          <p className="mt-2 text-sm text-dourado">{businessConfig.slogan}</p>
          <p className="mt-4 flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-dourado" aria-hidden="true" />
            {businessConfig.city} — {businessConfig.state} e região
          </p>
        </div>

        <nav aria-label="Institucional">
          <h2 className="mb-4 font-display text-lg text-creme">Empresa</h2>
          <ul className="space-y-2.5 text-sm">
            {empresaLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-dourado">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-display text-lg text-creme">Atendimento</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href={buildWhatsAppUrl('Olá! Gostaria de um orçamento de churrasco.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-dourado"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:+${businessConfig.whatsapp}`} className="inline-flex items-center gap-2 transition-colors hover:text-dourado">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {businessConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${businessConfig.email}`} className="inline-flex items-center gap-2 break-all transition-colors hover:text-dourado">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {businessConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-display text-lg text-creme">Redes sociais</h2>
          {businessConfig.instagram || businessConfig.facebook ? (
            <ul className="flex gap-3">
              {businessConfig.instagram && (
                <li>
                  <a href={businessConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-creme/25 transition-colors hover:border-dourado hover:text-dourado">
                    <Instagram className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              )}
              {businessConfig.facebook && (
                <li>
                  <a href={businessConfig.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-creme/25 transition-colors hover:border-dourado hover:text-dourado">
                    <Facebook className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              )}
            </ul>
          ) : (
            <p className="text-sm text-creme/50">
              Preencha <code className="text-creme/70">instagram</code> em{' '}
              <code className="text-creme/70">src/config/business.ts</code> para os ícones aparecerem.
            </p>
          )}
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-2 border-t border-creme/12 pt-6 text-xs text-creme/55 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {businessConfig.name}. Todos os direitos reservados.
          {businessConfig.cnpj && ` · CNPJ ${businessConfig.cnpj}`}
        </p>
        <p>Bragança Paulista e região · 5 anos de experiência · Atendimento de segunda a domingo</p>
      </div>
    </div>
  </footer>
);
