
import React from 'react';

const benefits = [
  {
    title: "Design board",
    desc: "Easily manage your request queue through a dedicated workspace.",
    icon: "🗂️",
    color: "bg-orange-50"
  },
  {
    title: "Flat monthly rate",
    desc: "Fixed pricing means no surprises. Pay once per month, that's it.",
    icon: "💳",
    color: "bg-blue-50"
  },
  {
    title: "Rapid delivery",
    desc: "Average turnaround of 48 hours. We keep your brand moving fast.",
    icon: "⚡",
    color: "bg-rose-50"
  },
  {
    title: "Senior talent",
    desc: "Get top-tier creative work without the overhead of hiring full-time.",
    icon: "⭐",
    color: "bg-purple-50"
  },
  {
    title: "Scale at will",
    desc: "Upgrade, downgrade, or pause your plan as your workload changes.",
    icon: "📈",
    color: "bg-emerald-50"
  },
  {
    title: "Ownership",
    desc: "Every design is unique to you. You own the IP 100%.",
    icon: "🔒",
    color: "bg-cyan-50"
  }
];

const Benefits: React.FC = () => {
  return (
    <section className="container mx-auto max-w-7xl px-6 py-32 border-t border-gray-100">
      <div className="text-center mb-24 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 block">Membership benefits</span>
        <h2 className="text-4xl md:text-7xl font-medium leading-tight mb-8">
          It's <span className="text-italics">"game-changer"</span> level better
        </h2>
        <p className="text-xl text-gray-500">
          MagicTales replaces slow freelancers and bulky agencies with a streamlined subscription that scales with your growth.
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
