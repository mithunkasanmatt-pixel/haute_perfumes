import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-cream px-4 py-16">
      <div className="max-w-md w-full text-center bg-white border border-beige/40 p-10 sm:p-14 shadow-soft">
        <span className="font-serif text-6xl sm:text-7xl text-olive font-normal block mb-2">
          404
        </span>
        <span className="text-xs uppercase tracking-[0.25em] text-muted block mb-4">
          Olfactory Path Not Found
        </span>
        <h2 className="font-serif text-2xl text-dark font-normal mb-3">
          This Scent Has Dissipated
        </h2>
        <p className="text-xs text-muted font-light leading-relaxed mb-8">
          The flacon or vintage page you are seeking is no longer in our active reserve.
          Allow us to guide you back to our catalog.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-olive text-cream hover:bg-olive-dark text-xs uppercase tracking-[0.2em] font-medium transition-colors"
        >
          <span>Return to Salon</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
