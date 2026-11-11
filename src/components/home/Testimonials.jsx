import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { TESTIMONIALS } from '../../data/testimonials';
import { Rating } from '../common/Rating';
import { Quote } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Client Acclaim"
          title="Words From Our Collectors"
          description="Read reflections from our private salon clientele across Paris, London, and Tokyo."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 sm:p-10 border border-beige/40 flex flex-col justify-between luxury-card relative"
            >
              <Quote className="w-10 h-10 text-sand absolute top-6 right-6 -z-0" />
              <div className="relative z-10">
                <Rating rating={t.rating} size="sm" showScore={false} />
                <p className="font-serif italic text-base sm:text-lg text-dark/90 leading-relaxed my-6 font-normal">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-sand/60">
                <div className="font-serif text-lg text-dark font-medium">{t.client}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted font-light">
                  {t.city} • <span className="text-olive font-medium">{t.verified}</span>
                </div>
                <div className="text-[11px] text-muted/70 italic mt-1">
                  Collector of: {t.scent}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
