import { useState } from 'react';
import { Menu } from 'lucide-react';
import { businessConfig } from '../config/business';
import { navItems } from '../data/nav';
import { goToQuote } from '../utils/scroll';
import { useScrolled } from '../hooks/useScrolled';
import { MobileMenu } from '../components/MobileMenu';

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
        <div className="mx-auto flex w-full max-w-content items-center justify-between gap-2 px-4 sm:gap-4 sm:px-8">
          <a href="#inicio" className="leading-tight">
            <span className="block font-display text-base text-creme sm:text-xl">{businessConfig.shortName}</span>
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
              href="#orcamento"
              onClick={(e) => {
                e.preventDefault();
                goToQuote();
              }}
              className="inline-flex min-h-[2.75rem] items-center whitespace-nowrap rounded-md bg-fogo px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8c2818] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado sm:px-4"
            >
              <span className="sm:hidden">Orçamento</span>
              <span className="hidden sm:inline">Pedir orçamento</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded text-creme transition-colors hover:text-dourado focus-visible:outline focus-visible:outline-2 focus-visible:outline-dourado lg:hidden"
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
