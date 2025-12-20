
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import ImageMasking from './ui/image-masking';

const services = [
  'Web Design', 'Mobile Apps', 'Social Graphics', 'Landing Pages',
  'Pitch Decks', 'Icon Sets', 'Brand Guides', 'Marketing Emails',
  'Packaging', 'Ad Creative', 'UI Kits', 'Illustrations'
];

const Work: React.FC = () => {
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
          <div className="absolute top-10 left-10 w-64 h-80 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl rotate-[-6deg] transition-transform hover:rotate-0 duration-500 overflow-hidden">
            <img
              src="/vid4.gif"
              alt="Animation"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-10 right-10 w-72 h-96 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-3xl shadow-xl rotate-[12deg] transition-transform hover:rotate-0 duration-500 z-20 overflow-hidden">
            <video
              src="/vid5.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          {/* Background Text Decor */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.03]">
            <span className="text-[20rem] font-black rotate-[-15deg]">STORY</span>
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 block">Our capabilities</span>
          <h2 className="text-4xl md:text-6xl font-medium leading-tight mb-8">
            Visual solutions for <br /><span className="text-italics">every platform</span>
          </h2>
          <p className="text-xl text-gray-500 mb-10 leading-relaxed">
            From early-stage startups to established enterprises, we provide the full spectrum of high-end design support.
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
            See recent work
          </button>
        </div>
      </div>

      {/* AI Playground Section */}
      <div className="pt-24 border-t border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-6 block">Magic in motion</span>
            <h3 className="text-3xl md:text-5xl font-medium mb-6">Create your own <span className="text-italics">visual story</span></h3>
            <p className="text-lg text-gray-500">
              Experience the power of our story-driven aesthetic. One click to generate a unique visual aligned with the MagicTales brand.
            </p>
          </div>
          <button
            onClick={generateVisual}
            disabled={isGenerating}
            className={`px-8 py-4 rounded-2xl font-bold text-white transition-all flex items-center gap-3 ${isGenerating
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
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Magic
              </>
            )}
          </button>
        </div>

        {generatedImages.length > 0 ? (
          <ImageMasking
            mediaItems={generatedImages.slice(0, 4).map((img, idx) => {
              const clipIds: Array<'clip-splash1' | 'clip-splash2' | 'clip-splash3' | 'clip-splash4'> = [
                'clip-splash1',
                'clip-splash2',
                'clip-splash3',
                'clip-splash4'
              ];
              return {
                src: img,
                type: 'image' as const,
                alt: `Generated Visual ${idx + 1}`,
                clipId: clipIds[idx % 4],
              };
            })}
            className="border-0 p-0 grid-cols-4"
          />
        ) : (
          <ImageMasking className="border-0 p-0 grid-cols-4" />
        )}
      </div>
    </section>
  );
};

export default Work;
