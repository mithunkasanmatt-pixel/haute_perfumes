import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Sparkles,
  title = 'Your collection is empty',
  description = 'Explore our Haute Parfumerie reserves and select scents that speak to your essence.',
  actionText = 'Discover Fragrances',
  actionHref = '/shop',
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 max-w-lg mx-auto">
      <div className="w-20 h-20 rounded-full bg-sand/40 border border-beige/60 flex items-center justify-center mb-6 text-olive">
        <Icon className="w-9 h-9 stroke-[1.2]" />
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl text-dark mb-3 font-normal">
        {title}
      </h3>
      <p className="text-muted text-sm sm:text-base leading-relaxed mb-8 font-light">
        {description}
      </p>
      {onAction ? (
        <button
          onClick={onAction}
          className="px-8 py-3.5 bg-olive text-cream hover:bg-olive-dark transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium border border-olive"
        >
          {actionText}
        </button>
      ) : (
        <Link
          to={actionHref}
          className="px-8 py-3.5 bg-olive text-cream hover:bg-olive-dark transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium border border-olive inline-block"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};
