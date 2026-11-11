import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../common/SectionHeading';
import { ArrowUpRight } from 'lucide-react';

export const FeaturedCollections = () => {
  const collections = [
    {
      title: "Women's Fragrances",
      subtitle: 'Sensual & Radiant',
      description: 'Luminous Damask roses, Turkish lychee, powdery Tuscan iris, and crystalline aldehydes.',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
      href: '/shop?gender=Women',
    },
    {
      title: "Men's Fragrances",
      subtitle: 'Commanding & Noble',
      description: 'French birch smoke, royal oakmoss, aged bourbon spices, and supple Tuscan black leather.',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
      href: '/shop?gender=Men',
    },
    {
      title: 'Unisex Fragrances',
      subtitle: 'Harmonious Alchemy',
      description: 'Australian sandalwood, golden ambergris, dark tea leaves, and wild Sicilian honey.',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
      href: '/shop?gender=Unisex',
    },
    {
      title: 'Luxury Extrait Collection',
      subtitle: 'Highest Concentration',
      description: 'Pure 35% oil extraits with Cambodian agarwood, rare saffron, and 16-hour projection.',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80',
      href: '/shop?category=Extrait de Parfum',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Curated Selections"
          title="Featured Collections"
          description="Immerse yourself in four distinct olfactory landscapes, tailored for discerning tastes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, idx) => (
            <Link
              key={idx}
              to={col.href}
              className="group relative h-[420px] overflow-hidden border border-beige/50 flex flex-col justify-end p-6 luxury-card"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-cream transition-transform duration-300">
                <span className="text-[10px] uppercase tracking-[0.25em] text-beige font-medium block mb-1">
                  {col.subtitle}
                </span>
                <h3 className="font-serif text-2xl font-normal text-cream group-hover:text-beige transition-colors mb-2 flex items-center justify-between">
                  <span>{col.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-cream/70 font-light line-clamp-2 leading-relaxed mb-4">
                  {col.description}
                </p>
                <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-beige">
                  <span>Explore Vault</span>
                  <span className="font-serif italic font-light">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
