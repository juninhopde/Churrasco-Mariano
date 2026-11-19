import { useState } from 'react';
import { galleryImages } from '../data/gallery';
import { Section } from '../components/Section';
import { SectionTitle } from '../components/SectionTitle';
import { AppImage } from '../components/AppImage';
import { Lightbox } from '../components/Lightbox';
import { CTAButton } from '../components/CTAButton';
import { InstagramEmbed, instagramEmbedUrl } from '../components/InstagramEmbed';
import { EventMedia } from '../components/EventMedia';
import { eventMedia, eventVideo } from '../data/video';
import { goToQuote } from '../utils/scroll';

const spanClasses: Record<string, string> = {
  big: 'sm:col-span-2 sm:row-span-2',
  tall: 'sm:row-span-2',
  wide: 'sm:col-span-2',
  small: '',
};

export const Gallery = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (galleryImages.length === 0) return null;

  // Arquivo próprio (GIF/MP4 em src/assets/evento/) tem prioridade sobre a incorporação do Instagram.
  // Sem arquivo e sem link válido do Instagram, a seção mostra só as fotos.
  const hasInstagram = instagramEmbedUrl(eventVideo.instagramUrl) !== null;
  const showVideo = eventMedia !== null || hasInstagram;

  return (
    <Section id="galeria" tone="branco">
      <SectionTitle
        title="Nossos churrascos"
        subtitle={showVideo ? 'Um evento de verdade e algumas fotos. Clique nas fotos para ampliar.' : 'Clique em qualquer foto para ampliar.'}
      />

      {showVideo && (
        <div
          className={`mb-12 grid items-center gap-8 lg:gap-14 ${
            eventMedia ? 'lg:grid-cols-2' : 'lg:grid-cols-[380px_1fr]'
          }`}
        >
          {eventMedia ? (
            <EventMedia media={eventMedia} alt={eventVideo.title} />
          ) : (
            <InstagramEmbed postUrl={eventVideo.instagramUrl} title={eventVideo.title} />
          )}

          <div>
            <h3 className="font-display text-2xl sm:text-3xl">Veja um evento de verdade</h3>
            <p className="mt-3 max-w-md text-carvao/75">
              {eventMedia
                ? 'Um dos nossos churrascos. O vídeo completo está no Instagram do Mariano.'
                : 'Um dos nossos churrascos, direto do Instagram do Mariano. Toque no play para assistir no Instagram.'}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CTAButton
                href="#orcamento"
                onClick={(e) => {
                  e.preventDefault();
                  goToQuote();
                }}
                variant="fogo"
                size="lg"
              >
                Quero um assim
              </CTAButton>
              {hasInstagram && (
                <CTAButton href={eventVideo.instagramUrl} external variant="outline" size="lg">
                  {eventMedia ? 'Ver vídeo completo' : 'Abrir no Instagram'}
                </CTAButton>
              )}
            </div>
          </div>
        </div>
      )}

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
