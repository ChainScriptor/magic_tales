
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const services = [
  'Web Design', 'Mobile Apps', 'Social Graphics', 'Landing Pages', 
  'Pitch Decks', 'Icon Sets', 'Brand Guides', 'Marketing Emails',
  'Packaging', 'Ad Creative', 'UI Kits', 'Illustrations'
];

const Work: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto max-w-7xl px-6 py-32 bg-white rounded-[3rem] shadow-sm my-12 overflow-hidden border border-gray-100">
      <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
        {/* Left: Interactive/Visual */}
        <div className="relative h-[600px] bg-gray-50 rounded-[2.5rem] p-8 overflow-hidden">
          {/* Floating Mockup Card 1 - vid4.gif */}
          <div className="absolute top-10 left-10 w-64 h-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl rotate-[-6deg] transition-transform hover:rotate-0 duration-500 overflow-hidden">
                <img 
                  src="/vid4.gif" 
                  alt="Work showcase 1" 
                  className="w-full h-full object-cover"
                />
          </div>
          
          {/* Floating Mockup Card 2 - vid5.mp4 */}
          <div className="absolute bottom-10 right-10 w-72 h-96 rounded-3xl shadow-xl rotate-[12deg] transition-transform hover:rotate-0 duration-500 z-20 overflow-hidden">
                <video 
                  src="/vid5.mp4" 
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
          </div>
          
          {/* Background Text Decor */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.03]">
            <span className="text-[20rem] font-black rotate-[-15deg]">STORY</span>
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 block">{t('work.label')}</span>
          <h2 className="text-4xl md:text-6xl font-medium leading-tight mb-8" dangerouslySetInnerHTML={{ __html: t('work.title') }} />
          <p className="text-xl text-gray-500 mb-10 leading-relaxed">
            {t('work.subtitle')}
          </p>
          
          <div className="flex flex-wrap gap-3 mb-12">
            {services.map(s => (
              <span key={s} className="px-5 py-2.5 bg-gray-100 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-colors cursor-default">
                {s}
              </span>
            ))}
            <span className="px-5 py-2.5 bg-gray-100 rounded-full text-sm font-semibold opacity-60">+ more</span>
          </div>

          <button className="px-10 py-5 bg-black text-white rounded-2xl text-lg font-bold hover:scale-105 transition-transform active:scale-95">
            {t('work.seeWork')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Work;
