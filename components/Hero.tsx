
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface HeroProps {
  onPreviewBook?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onPreviewBook }) => {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto max-w-7xl px-6 pt-10 pb-8">
      {/* Navigation Row */}
      <nav className="flex items-center justify-between mb-20 md:mb-32">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo/2.png"
            alt="MagicTales Logo"
            className="w-20 h-20 object-contain"
          />
          <span className="text-2xl font-bold tracking-tight text-[#0e0e0e]">MagicTales</span>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <LanguageSelector />
          <button className="px-6 py-2.5 rounded-lg btn-outline-soft text-sm font-medium hover:bg-white transition-all">
            {t('nav.login')}
          </button>
          <button className="px-5 py-2.5 rounded-lg btn-outline-soft text-sm font-medium flex items-center gap-2 hover:bg-white transition-all">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            {t('nav.bookCall')}
          </button>
          <button
            onClick={onPreviewBook}
            className="px-6 py-2.5 rounded-lg btn-glossy text-white text-sm font-semibold"
          >
            {t('nav.previewBook')}
          </button>
        </div>
      </nav>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
        {/* Headline Section */}
        <div className="pt-4">
          <h1 className="text-[72px] md:text-[110px] font-bold leading-[0.95] tracking-[-0.03em] mb-10 text-[#0e0e0e]">
            {t('hero.title.line1')}<br />
            <span className="inline-flex items-center gap-4">
              {t('hero.title.line2')}

            </span>
            <br />
            {t('hero.title.line3')} <span className="text-everyone">{t('hero.title.everyone')}</span>
          </h1>
          <p className="text-2xl text-[#9a9a9a] font-medium opacity-80 mb-6">
            {t('hero.subtitle')}
          </p>

          <div className="relative w-40 max-w-md">
            <img
              src="/leaves.png"
              alt="Decorative leaves"
              className="w-full h-auto"
            />

          </div>
        </div>

        {/* Membership Card Section */}
        <div className="relative pt-4">
          <div
            className="rounded-[2.5rem] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden h-[600px] flex flex-col justify-between"
            style={{
              backgroundImage: 'url(/803989.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Top Badge */}
            <div className="flex justify-start">
              <div className="bg-black rounded-full px-5 py-2 flex items-center gap-3 text-sm font-bold tracking-tight">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                {t('hero.badge')}
              </div>
            </div>

            {/* Middle Content */}
            <div className="relative z-10 -mt-10">
              <h2 className="text-[64px] font-bold leading-[1] mb-4" dangerouslySetInnerHTML={{ __html: t('hero.card.title') }} />

              <p className="text-lg text-white/70 font-medium mb-10">
                {t('hero.card.subtitle')}
              </p>

              <div className="flex gap-3">
                {/* Instagram Button */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="hidden sm:inline">Instagram</span>
                </a>

                {/* TikTok Button */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-900 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span className="hidden sm:inline">TikTok</span>
                </a>

                {/* YouTube Button */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-semibold hover:bg-red-700 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="hidden sm:inline">YouTube</span>
                </a>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-3xl overflow-hidden border-2 border-white/20">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=magic&backgroundColor=ffdf00" alt="Avatar" />
                </div>
                <div>
                  <p className="text-sm font-bold">{t('hero.card.call')}</p>
                  <p className="text-sm text-white/50">{t('hero.card.schedule')}</p>
                </div>
              </div>
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7M3 12h18" />
                </svg>
              </button>
            </div>



            {/* Dark Overlay for text readability */}
            <div className="absolute top-0 right-0 w-full h-full bg-black/30 pointer-events-none"></div>

            {/* Soft Ambient Glows */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
