import { useEffect } from 'react';
import { X } from 'lucide-react';
import { businessConfig } from '../config/business';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { WhatsAppIcon } from './WhatsAppIcon';
import type { NavItem } from '../data/nav';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: readonly NavItem[];
}

export const MobileMenu = ({ open, onClose, items }: MobileMenuProps) => {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-carvao/98 backdrop-blur-sm lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-display text-lg text-creme">{businessConfig.shortName}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="rounded p-2 text-creme transition-colors hover:text-dourado focus-visible:outline focus-visible:outline-2 focus-visible:outline-dourado"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <nav className="px-5 pt-6">
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onClose}
                className="block border-b border-creme/10 py-4 font-display text-2xl text-creme transition-colors hover:text-dourado"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={buildWhatsAppUrl('Olá! Gostaria de um orçamento de churrasco.')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center justify-center gap-2 rounded bg-zap px-5 py-4 font-semibold text-white transition-colors hover:bg-zap-dark"
        >
          <WhatsAppIcon />
          Pedir orçamento
        </a>
        <p className="mt-4 text-center text-sm text-creme/60">{businessConfig.phoneDisplay}</p>
      </nav>
    </div>
  );
};
