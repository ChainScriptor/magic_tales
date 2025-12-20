
import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="container mx-auto max-w-7xl px-6 py-32">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-medium leading-tight">
          The way design <span className="italic">should've</span> been done in the first place
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Step 1 - Subscribe Card */}
        <div className="group">
          <div
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px] transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-3xl"
            style={{
              backgroundImage: 'url(/vid1.gif)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)'
            }}
          >
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-2">Subscribe</h3>
            <p className="text-gray-600">
              Subscribe to a plan & request as many designs as you'd like.
            </p>
          </div>
        </div>

        {/* Step 2 - Request Card */}
        <div className="group">
          <div
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px] transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-3xl"
            style={{
              backgroundImage: 'url(/vid2.gif)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)'
            }}
          >
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-2">Request</h3>
            <p className="text-gray-600">
              Request whatever you'd like, from mobile apps to logos.
            </p>
          </div>
        </div>

        {/* Step 3 - Receive Card */}
        <div className="group">
          <div
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px] transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-3xl"
            style={{
              backgroundImage: 'url(/vid3.gif)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)'
            }}
          >
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-2">Receive</h3>
            <p className="text-gray-600">
              Receive your design within two business days on average.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
