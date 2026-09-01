import { useState } from 'react';
import { Menu } from 'lucide-react';
import { businessConfig } from '../config/business';
import { navItems } from '../data/nav';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { useScrolled } from '../hooks/useScrolled';
import { MobileMenu } from '../components/MobileMenu';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

export const Header = () => {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-carvao/95 py-2 shadow-lg shadow-black/25 backdrop-blur' : 'bg-gradient-to-b from-black/70 to-transparent py-4'
        }`}
      >
        <div className="mx-auto flex w-full max-w-content items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#inicio" className="leading-tight">
            <span className="block font-display text-lg text-creme sm:text-xl">{businessConfig.shortName}</span>
            <span className="hidden text-[11px] uppercase tracking-[0.18em] text-dourado sm:block">
              Buffet de churrasco
            </span>
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-creme/85 transition-colors hover:text-dourado focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dourado"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={buildWhatsAppUrl('Olá! Gostaria de um orçamento de churrasco.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-zap px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zap-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Pedir orçamento</span>
              <span className="sm:hidden">Orçamento</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="rounded p-2 text-creme transition-colors hover:text-dourado focus-visible:outline focus-visible:outline-2 focus-visible:outline-dourado lg:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} items={navItems} />
    </>
  );
};
