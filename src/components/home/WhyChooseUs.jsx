import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { Sparkles, Clock, ShieldCheck, Gift } from 'lucide-react';

export const WhyChooseUs = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Rare Botanical Extracts',
      description: 'Hand-picked Centifolia roses, 30-year aged Cambodian oud, and Florentine iris roots aged 6 years beneath Tuscan soil.',
    },
    {
      icon: Clock,
      title: 'Cold Cellar Maceration',
      description: 'Unlike commercial fragrances rushed in weeks, every batch rests undisturbed for a minimum of six months to fuse complex notes.',
    },
    {
      icon: ShieldCheck,
      title: 'Heavy Crystal Flaconnage',
      description: 'Hand-blown crystal flacons capped with solid antique brass zamac, numbered by hand and sealed with hot beeswax.',
    },
    {
      icon: Gift,
      title: 'Bespoke Discovery Coffret',
      description: 'Every flacon arrives with a complimentary 5ml discovery vial to test before breaking the wax seal, plus insured courier delivery.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-dark text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="The Royal Standard"
          title="Why Connoisseurs Choose Us"
          description="A devotion to uncompromised perfumery that refuses synthetic shortcuts."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-white/5 border border-white/10 hover:border-beige/40 transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-olive-light/20 border border-beige/30 flex items-center justify-center mb-6 text-beige">
                    <Icon className="w-6 h-6 stroke-[1.2]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-cream font-normal mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream/70 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-[10px] uppercase tracking-[0.25em] text-beige">
                  Pillar 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
