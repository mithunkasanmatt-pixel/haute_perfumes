import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../common/SectionHeading';
import { ProductCard } from '../products/ProductCard';
import { PRODUCTS } from '../../data/products';
import { ArrowRight } from 'lucide-react';

export const NewArrivals = () => {
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            subtitle="Recent Distillations"
            title="New Seasonal Arrivals"
            description="Freshly matured extraits from our private autumn and winter harvest in Grasse."
            alignment="left"
            className="mb-0"
          />
          <Link
            to="/shop?sort=newest"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-olive hover:text-burgundy font-medium transition-colors group shrink-0"
          >
            <span>View All New Releases</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
