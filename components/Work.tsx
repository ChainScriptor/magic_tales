
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';

const services = [
  'Web Design', 'Mobile Apps', 'Social Graphics', 'Landing Pages', 
  'Pitch Decks', 'Icon Sets', 'Brand Guides', 'Marketing Emails',
  'Packaging', 'Ad Creative', 'UI Kits', 'Illustrations'
];

const Work: React.FC = () => {
  const { t } = useLanguage();
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateVisual = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = "A stunning, premium 3D abstract artwork for 'MagicTales Studio'. The theme is 'The Magic of Storytelling'. Use vivid neon gradients (soft pink, deep orange, electric blue, lush green). The composition should be minimal, modern, and high-end, with soft cinematic lighting, elegant curves, and a sense of depth. Professional design portfolio aesthetic, 4k resolution.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            const imageUrl = `data:image/png;base64,${base64Data}`;
            setGeneratedImages(prev => [imageUrl, ...prev].slice(0, 4));
            break;
          }
        }
      }
    } catch (error) {
      console.error("Magic generation failed:", error);
      alert("The magic is recharging. Please try again in a moment.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="container mx-auto max-w-7xl px-6 py-32 bg-white rounded-[3rem] shadow-sm my-12 overflow-hidden border border-gray-100">
      <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
        {/* Left: Interactive/Visual */}
        <div className="relative h-[600px] bg-gray-50 rounded-[2.5rem] p-8 overflow-hidden">
          {/* Floating Mockup Cards */}
          <div className="absolute top-10 left-10 w-64 h-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl rotate-[-6deg] transition-transform hover:rotate-0 duration-500 flex items-center justify-center p-4">
             <div className="w-full h-full border border-white/20 rounded-xl bg-white/10 flex flex-col gap-2 p-3">
                <div className="h-4 w-1/2 bg-white/20 rounded"></div>
                <div className="flex-1 bg-white/5 rounded-lg"></div>
             </div>
          </div>
          <div className="absolute bottom-10 right-10 w-72 h-96 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-3xl shadow-xl rotate-[12deg] transition-transform hover:rotate-0 duration-500 z-20 p-4">
             <div className="w-full h-full border border-white/20 rounded-xl bg-white/10 flex flex-col gap-3 p-4">
                <div className="h-6 w-3/4 bg-white/30 rounded"></div>
                <div className="h-4 w-1/2 bg-white/20 rounded"></div>
                <div className="flex-1 bg-white/5 rounded-lg"></div>
             </div>
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

      {/* AI Playground Section */}
      <div className="pt-24 border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-6 block">{t('work.magic.label')}</span>
            <h3 className="text-3xl md:text-5xl font-medium mb-6" dangerouslySetInnerHTML={{ __html: t('work.magic.title') }} />
            <p className="text-lg text-gray-500">
              {t('work.magic.subtitle')}
            </p>
          </div>
          <button 
            onClick={generateVisual}
            disabled={isGenerating}
            className={`px-8 py-4 rounded-2xl font-bold text-white transition-all flex items-center gap-3 ${
              isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-orange-500 to-rose-500 hover:shadow-lg hover:scale-105 active:scale-95'
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('work.magic.generating')}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t('work.magic.generate')}
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {generatedImages.length > 0 ? (
            generatedImages.map((img, idx) => (
              <div key={idx} className="group relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl transition-all border border-gray-100">
                <img src={img} alt={`Generated Visual ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                   </button>
                </div>
              </div>
            ))
          ) : (
            [...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-[2rem] bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Work;
