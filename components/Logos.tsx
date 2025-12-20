
import React from 'react';

const Logos: React.FC = () => {
  return (
    <section className="container mx-auto max-w-7xl px-6 py-20 border-t border-b border-gray-100">
      <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40">
         <div className="text-2xl font-black">nectar</div>
         <div className="text-2xl font-black flex items-center gap-2">
           Buy me a coffee
           <span className="text-xl">☕</span>
         </div>
         <div className="text-2xl font-black flex items-center gap-2">
           beehiiv
           <span className="text-xl">🐝</span>
         </div>
         <div className="text-2xl font-black">Laravel</div>
         <div className="text-2xl font-black">xfinity</div>
      </div>
    </section>
  );
};

export default Logos;
