import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-dark">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1920&q=85"
          alt="Haute Parfumerie Hero"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-dark/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-28">
        {/* Subtle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-beige/30 bg-dark/50 backdrop-blur-md mb-6 sm:mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-beige" />
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-beige font-medium">
            Haute Parfumerie • Place Vendôme, Paris
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-cream font-normal tracking-tight leading-[1.08] mb-6 sm:mb-8"
        >
          Discover Your <br className="hidden sm:block" />
          <span className="italic font-light text-beige">Signature Scent</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream/80 font-light leading-relaxed tracking-wide mb-10 sm:mb-12"
        >
          Luxury fragrances crafted to leave a lasting impression. Rare Grasse botanicals,
          aged Cambodian agarwood, and precious resins distilled for true connoisseurs.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-olive text-cream hover:bg-olive-light transition-all duration-300 text-xs uppercase tracking-[0.22em] font-medium border border-olive flex items-center justify-center gap-2 shadow-2xl"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/shop?category=Extrait de Parfum"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-white/10 hover:bg-white/20 text-cream backdrop-blur-md transition-all duration-300 text-xs uppercase tracking-[0.22em] font-medium border border-beige/40 flex items-center justify-center gap-2"
          >
            <span>Explore Collection</span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-cream/50 text-[10px] tracking-[0.25em] uppercase">
        <span>Scroll to Explore</span>
        <div className="w-[1px] h-8 bg-beige/40 animate-pulse" />
      </div>
    </section>
  );
};
