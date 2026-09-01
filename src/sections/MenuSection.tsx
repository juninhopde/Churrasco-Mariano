import { useState } from 'react';
import { menuCategories } from '../data/menu';
import { Section } from '../components/Section';
import { SectionTitle } from '../components/SectionTitle';
import { AppImage } from '../components/AppImage';

export const MenuSection = () => {
  const [active, setActive] = useState(menuCategories[0]?.id ?? '');
  const current = menuCategories.find((c) => c.id === active) ?? menuCategories[0];

  return (
    <Section id="cardapio" tone="grafite">
      <SectionTitle
        title="Nosso cardápio"
        subtitle="Escolha os cortes e acompanhamentos — o cardápio final é fechado junto com você, incluindo opção vegetariana e restrições alimentares."
        invert
      />

      {/* Navegação por categoria */}
      <div className="-mx-5 mb-8 overflow-x-auto px-5 no-scrollbar sm:mx-0 sm:px-0">
        <div className="flex gap-2 sm:flex-wrap" role="tablist" aria-label="Categorias do cardápio">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={active === category.id}
              onClick={() => setActive(category.id)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado ${
                active === category.id
                  ? 'border-dourado bg-dourado text-carvao'
                  : 'border-creme/25 text-creme/80 hover:border-dourado hover:text-dourado'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div className="grid overflow-hidden rounded-lg border border-creme/15 bg-carvao lg:grid-cols-[1fr_1.2fr]">
          {/* Foto da categoria */}
          <AppImage
            photo={current.photo}
            aspect="aspect-[16/10] lg:aspect-auto lg:min-h-[320px]"
            width={700}
            className="h-full"
          />

          {/* Itens */}
          <div className="p-6 sm:p-8">
            <h3 className="font-display text-2xl text-creme">{current.title}</h3>
            {current.note && <p className="mt-2 text-sm text-dourado">{current.note}</p>}
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {current.items.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-creme/10 pb-3 text-creme/90">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-fogo" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Section>
  );
};
