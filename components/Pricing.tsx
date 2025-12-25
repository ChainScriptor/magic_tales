
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Pricing: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="pricing" className="container mx-auto max-w-7xl px-6 py-32">
      <div className="text-center mb-24">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 block">{t('pricing.label')}</span>
        <h2 className="text-4xl md:text-7xl font-medium leading-tight" dangerouslySetInnerHTML={{ __html: t('pricing.title') }} />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-stretch">
        {/* Main Plan */}
        <div className="bg-white border-2 border-black rounded-[3rem] p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-6 right-6 px-4 py-1.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest">
            {t('pricing.standard.mostPopular')}
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-2">{t('pricing.standard.title')}</h3>
            <p className="text-gray-500 text-lg mb-8">{t('pricing.standard.desc')}</p>
            <div className="mb-10">
              <span className="text-6xl font-bold">€1,499</span>
              <span className="text-gray-400 font-medium">/mo</span>
            </div>
            <ul className="space-y-4 text-lg border-t border-gray-100 pt-8 mb-12">
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> {t('pricing.standard.unlimited')}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> {t('pricing.standard.delivery')}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> {t('pricing.standard.revisions')}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> {t('pricing.standard.slack')}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500">✓</span> {t('pricing.standard.pause')}
              </li>
            </ul>
          </div>
          <button className="w-full py-5 bg-black text-white rounded-2xl text-xl font-bold hover:bg-gray-800 transition-colors">
            {t('pricing.standard.getStarted')}
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white border border-gray-200 rounded-[3rem] p-12 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all">
          <div>
            <h3 className="text-3xl font-bold mb-2">{t('pricing.pro.title')}</h3>
            <p className="text-gray-500 text-lg mb-8">{t('pricing.pro.desc')}</p>
            <div className="mb-10">
              <span className="text-6xl font-bold">€2,899</span>
              <span className="text-gray-400 font-medium">/mo</span>
            </div>
            <ul className="space-y-4 text-lg border-t border-gray-100 pt-8 mb-12">
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> {t('pricing.pro.requests')}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> {t('pricing.pro.delivery')}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> {t('pricing.pro.video')}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> {t('pricing.pro.calls')}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✓</span> {t('pricing.pro.illustrations')}
              </li>
            </ul>
          </div>
          <button className="w-full py-5 bg-white border border-gray-200 text-black rounded-2xl text-xl font-bold hover:bg-gray-50 transition-colors">
            {t('pricing.pro.contact')}
          </button>
        </div>
      </div>

      <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg" dangerouslySetInnerHTML={{ __html: t('pricing.projectBasis') }} />
      </div>
    </section>
  );
};

export default Pricing;
