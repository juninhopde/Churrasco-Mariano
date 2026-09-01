import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { FaqItem } from '../data/faq';

interface AccordionProps {
  items: FaqItem[];
}

export const Accordion = ({ items }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-carvao/12 border-y border-carvao/12">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="flex w-full items-start justify-between gap-4 py-5 text-left font-semibold transition-colors hover:text-fogo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado"
              >
                <span>{item.question}</span>
                {isOpen ? (
                  <Minus className="mt-0.5 h-5 w-5 shrink-0 text-fogo" aria-hidden="true" />
                ) : (
                  <Plus className="mt-0.5 h-5 w-5 shrink-0 text-dourado" aria-hidden="true" />
                )}
              </button>
            </h3>
            <div id={`faq-panel-${index}`} hidden={!isOpen} className="pb-5 pr-8 text-sm leading-relaxed text-carvao/75">
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
};
