
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Benefits: React.FC = () => {
  const { t } = useLanguage();
  
  const benefits = [
    {
      title: t('benefits.designBoard.title'),
      desc: t('benefits.designBoard.desc'),
      icon: "🗂️",
      color: "bg-orange-50"
    },
    {
      title: t('benefits.flatRate.title'),
      desc: t('benefits.flatRate.desc'),
      icon: "💳",
      color: "bg-blue-50"
    },
    {
      title: t('benefits.rapidDelivery.title'),
      desc: t('benefits.rapidDelivery.desc'),
      icon: "⚡",
      color: "bg-rose-50"
    },
    {
      title: t('benefits.seniorTalent.title'),
      desc: t('benefits.seniorTalent.desc'),
      icon: "⭐",
      color: "bg-purple-50"
    },
    {
      title: t('benefits.scale.title'),
      desc: t('benefits.scale.desc'),
      icon: "📈",
      color: "bg-emerald-50"
    },
    {
      title: t('benefits.ownership.title'),
      desc: t('benefits.ownership.desc'),
      icon: "🔒",
      color: "bg-cyan-50"
    }
  ];
  return (
    <section className="container mx-auto max-w-7xl px-6 py-32 border-t border-gray-100">
      <div className="text-center mb-24 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 block">{t('benefits.label')}</span>
        <h2 className="text-4xl md:text-7xl font-medium leading-tight mb-8" dangerouslySetInnerHTML={{ __html: t('benefits.title') }} />
        <p className="text-xl text-gray-500">
          {t('benefits.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {benefits.map((b, idx) => (
          <div key={idx} className="flex flex-col">
            <div className={`w-16 h-16 ${b.color} rounded-2xl flex items-center justify-center text-3xl mb-8`}>
              {b.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{b.title}</h3>
            <p className="text-lg text-gray-500 leading-relaxed">
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
