import React from 'react';
import { Star } from 'lucide-react';

export const Rating = ({ rating = 5, reviewCount, size = 'sm', showScore = true }) => {
  const sizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted">
      <div className="flex items-center text-amber-700/80">
        {stars.map((star) => (
          <Star
            key={star}
            className={`${sizeMap[size]} ${
              star <= Math.round(rating)
                ? 'fill-[#c5a059] text-[#c5a059]'
                : 'fill-transparent text-[#cab79f]'
            }`}
          />
        ))}
      </div>
      {showScore && <span className="font-medium text-dark/80 ml-0.5">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="text-muted/80 text-[11px]">({reviewCount})</span>
      )}
    </div>
  );
};
