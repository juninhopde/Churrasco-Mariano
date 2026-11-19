import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Ticker } from './components/Ticker';
import { Services } from './sections/Services';
import { QuoteForm } from './sections/QuoteForm';
import { MenuSection } from './sections/MenuSection';
import { Gallery } from './sections/Gallery';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { useQuoteDraft } from './hooks/useQuoteDraft';

const App = () => {
  // Um único estado de orçamento: os cartões de serviço, o cardápio e o formulário
  // leem e escrevem o mesmo lugar, então nada precisa ser escolhido duas vezes.
  const quote = useQuoteDraft();

  return (
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
        <Ticker />
        <Services quote={quote} />
        <QuoteForm quote={quote} />
        <MenuSection quote={quote} />
        <Gallery />
        <FAQ />
      </main>

      <Footer />
      <FloatingCTA />
    </>
  );
};

export default App;
