import { useState } from 'react';
import { galleryImages } from '../data/gallery';
import { Section } from '../components/Section';
import { SectionTitle } from '../components/SectionTitle';
import { AppImage } from '../components/AppImage';
import { Lightbox } from '../components/Lightbox';

const spanClasses: Record<string, string> = {
  big: 'sm:col-span-2 sm:row-span-2',
  tall: 'sm:row-span-2',
  wide: 'sm:col-span-2',
  small: '',
};

export const Gallery = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (galleryImages.length === 0) return null;

  return (
    <Section id="galeria" tone="branco">
      <SectionTitle
        title="Nossos churrascos"
        subtitle="Clique em qualquer foto para ampliar."
      />

      {/* Mobile: rolagem horizontal. Desktop: grid assimétrico. */}
      <div className="-mx-5 no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:auto-rows-[170px] sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0">
        {galleryImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Ampliar foto: ${image.photo.alt}`}
            className={`group relative w-[78vw] shrink-0 snap-center overflow-hidden rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado sm:w-auto ${spanClasses[image.span]}`}
          >
            <AppImage
              photo={image.photo}
              width={image.span === 'big' ? 900 : 500}
              aspect="h-full min-h-[170px]"
              className="transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
            />
          </button>
        ))}
      </div>

      <Lightbox images={galleryImages} index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
    </Section>
  );
};
