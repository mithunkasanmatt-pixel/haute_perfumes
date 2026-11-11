import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export const ProductSort = ({ sortBy, onSortChange, totalCount = 0 }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-sand">
      <div className="text-xs uppercase tracking-wider text-muted">
        Showing <span className="font-semibold text-dark">{totalCount}</span> luxury creations
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="sort-select" className="text-xs uppercase tracking-wider text-muted flex items-center gap-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-olive" />
          <span>Sort By:</span>
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white border border-beige/60 text-dark text-xs tracking-wider uppercase px-3 py-2 outline-none focus:border-olive cursor-pointer"
        >
          <option value="featured">Curated & Featured</option>
          <option value="bestseller">Best Selling</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">New Arrivals</option>
        </select>
      </div>
    </div>
  );
};
