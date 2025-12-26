
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="container mx-auto max-w-7xl px-6 pt-8 pb-32">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-medium leading-tight" dangerouslySetInnerHTML={{ __html: t('howItWorks.title') }} />
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Step 1 - Subscribe Card */}
        <div className="group">
          <div className="relative bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 rounded-[2.5rem] overflow-hidden shadow-lg h-[500px]">
            {/* Abstract shapes background */}
            <div className="absolute inset-0 opacity-20 z-0">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
            </div>

            {/* Video GIF */}
            <img
              src="/vid1.gif"
              alt="Subscribe"
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-2">{t('howItWorks.subscribe.title')}</h3>
            <p className="text-gray-600">
              {t('howItWorks.subscribe.desc')}
            </p>
          </div>
        </div>

        {/* Step 2 - Request Card */}
        <div className="group">
          <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-[2.5rem] overflow-hidden shadow-lg h-[500px]">
            {/* Flowing organic shapes */}
            <div className="absolute inset-0 opacity-20 z-0">
              <div className="absolute top-0 left-0 w-48 h-48 bg-purple-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-56 h-56 bg-blue-400 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-400 rounded-full blur-3xl"></div>
            </div>

            {/* Video GIF */}
            <img
              src="/vid2.gif"
              alt="Request"
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-2">{t('howItWorks.request.title')}</h3>
            <p className="text-gray-600">
              {t('howItWorks.request.desc')}
            </p>
          </div>
        </div>

        {/* Step 3 - Receive Card */}
        <div className="group">
          <div className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-[2.5rem] overflow-hidden shadow-lg h-[500px]">
            {/* Swirling abstract shapes */}
            <div className="absolute inset-0 opacity-20 z-0">
              <div className="absolute top-10 right-10 w-40 h-40 bg-red-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange-400 rounded-full blur-3xl"></div>
              <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-yellow-400 rounded-full blur-3xl"></div>
            </div>

            {/* Video GIF */}
            <img
              src="/vid3.gif"
              alt="Receive"
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-2">{t('howItWorks.receive.title')}</h3>
            <p className="text-gray-600">
              {t('howItWorks.receive.desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
