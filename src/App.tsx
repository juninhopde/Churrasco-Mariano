import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { TrustBar } from './sections/TrustBar';
import { ServiceSelector } from './sections/ServiceSelector';
import { HowItWorks } from './sections/HowItWorks';
import { Experience } from './sections/Experience';
import { Services } from './sections/Services';
import { MenuSection } from './sections/MenuSection';
import { CTABand } from './sections/CTABand';
import { Gallery } from './sections/Gallery';
import { QuoteForm } from './sections/QuoteForm';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const App = () => (
  <>
    <a
      href="#inicio"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-carvao focus:px-4 focus:py-3 focus:text-creme"
    >
      Ir para o conteúdo
    </a>

    <Header />

    <main>
      <Hero />
      <TrustBar />
      <ServiceSelector />
      <HowItWorks />
      <MenuSection />
      <CTABand />
      <Experience />
      <Services />
      <Gallery />
      <QuoteForm />
      <FAQ />
    </main>

    <Footer />
    <FloatingWhatsApp />
  </>
);

export default App;
