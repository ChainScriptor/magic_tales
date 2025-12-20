
import React, { useState } from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Logos from './components/Logos';
import Work from './components/Work';
import FairyTales from './components/FairyTales';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import MagicCursor from './components/MagicCursor';
import BookCreation from './components/BookCreation';

const App: React.FC = () => {
  const [showBookCreation, setShowBookCreation] = useState(false);

  return (
    <div className="relative min-h-screen">
      <MagicCursor />
      {showBookCreation && <BookCreation onClose={() => setShowBookCreation(false)} />}
      <div className="grid-lines" />
      <header className="relative z-10">
        <Hero onPreviewBook={() => setShowBookCreation(true)} />
      </header>
      <main className="relative z-10">
        <HowItWorks />
        <Logos />
        <Work />
        <FairyTales />
        <Benefits />
        <Pricing />
      </main>
      <footer className="relative z-10">
        <Footer />
      </footer>
    </div>
  );
};

export default App;
