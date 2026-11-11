import React from 'react';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../common/EmptyState';
import { Sparkles } from 'lucide-react';

export const ProductGrid = ({ products = [], columns = 4, onResetFilters }) => {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={Sparkles}
        title="No fragrances match your criteria"
        description="Try adjusting your filters, searching for a different note or brand, or clear all filters to browse our complete collection."
        actionText="Clear All Filters"
        onAction={onResetFilters}
      />
    );
  }

  const gridClass = {
    3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8',
    4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8',
  }[columns] || 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8';

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
