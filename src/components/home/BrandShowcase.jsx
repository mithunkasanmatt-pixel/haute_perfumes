import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../common/SectionHeading';
import { BRANDS } from '../../data/products';

export const BrandShowcase = () => {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Partners in Prestige"
          title="The Haute Parfumerie Houses"
          description="Curated formulations from world-renowned master perfumers and historic fragrance houses."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {BRANDS.slice(0, 6).map((brand) => (
            <Link
              key={brand}
              to={`/shop?brands=${encodeURIComponent(brand)}`}
              className="p-6 bg-cream/50 border border-beige/40 hover:border-olive hover:bg-white transition-all duration-300 flex flex-col items-center justify-center text-center group h-32"
            >
              <span className="font-serif text-base sm:text-lg text-dark group-hover:text-olive transition-colors font-medium">
                {brand}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted group-hover:text-olive-light transition-colors mt-1 font-light">
                Private Reserve
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
