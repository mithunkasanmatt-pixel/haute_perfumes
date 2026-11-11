import React from 'react';
import { Sparkles, Heart, Crown } from 'lucide-react';

export const FragranceNotes = ({ topNotes = [], heartNotes = [], baseNotes = [], compact = false }) => {
  return (
    <div className="w-full space-y-4">
      {/* Top Notes */}
      <div className="border-l-2 border-beige pl-3.5 py-0.5">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-olive" />
          <span>Top Notes (Head / 15-30 mins)</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {topNotes.map((note, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-xs bg-sand/40 text-dark border border-beige/40 rounded-none tracking-wide"
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Heart Notes */}
      <div className="border-l-2 border-olive pl-3.5 py-0.5">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
          <Heart className="w-3.5 h-3.5 text-burgundy" />
          <span>Heart Notes (Core / 2-6 hours)</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {heartNotes.map((note, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-xs bg-beige/25 text-dark border border-beige/60 rounded-none tracking-wide font-medium"
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Base Notes */}
      <div className="border-l-2 border-burgundy pl-3.5 py-0.5">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
          <Crown className="w-3.5 h-3.5 text-dark" />
          <span>Base Notes (Foundation / 8-24+ hours)</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {baseNotes.map((note, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-xs bg-olive/10 text-dark border border-olive/30 rounded-none tracking-wide"
            >
              {note}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
