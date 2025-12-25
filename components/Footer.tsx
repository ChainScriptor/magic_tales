
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-black text-white rounded-t-[3rem] mt-24">
      <div className="container mx-auto max-w-7xl px-6 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">MagicTales Studio</span>
            </div>
            <p className="text-gray-400 text-xl max-w-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-lg">{t('footer.nav.title')}</h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.nav.latestWork')}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t('footer.nav.pricing')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.nav.benefits')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.nav.login')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">{t('footer.contact.title')}</h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li><a href="mailto:hello@magictales.studio" className="hover:text-white transition-colors">hello@magictales.studio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact.bookCall')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
