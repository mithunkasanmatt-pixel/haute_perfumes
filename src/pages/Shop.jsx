import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductSort } from '../components/products/ProductSort';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SlidersHorizontal, X } from 'lucide-react';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Mobile filter drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination state: number of visible products
  const [visibleCount, setVisibleCount] = useState(8);

  // Initialize filters from searchParams
  const [filters, setFilters] = useState(() => {
    const gender = searchParams.get('gender') || 'all';
    const category = searchParams.get('category') || 'all';
    const brandParam = searchParams.get('brands');
    const brands = brandParam ? [brandParam] : [];
    const search = searchParams.get('search') || '';

    return {
      search,
      gender,
      category,
      brands,
      families: [],
      maxPrice: 600,
      minRating: 0,
    };
  });

  const [sortBy, setSortBy] = useState(() => searchParams.get('sort') || 'featured');

  // Synchronize state if URL query params change (e.g. clicked from navbar)
  useEffect(() => {
    const gender = searchParams.get('gender') || 'all';
    const category = searchParams.get('category') || 'all';
    const brandParam = searchParams.get('brands');
    const brands = brandParam ? [brandParam] : [];
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'featured';

    setFilters((prev) => ({
      ...prev,
      gender,
      category,
      brands,
      search,
    }));
    setSortBy(sort);
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setVisibleCount(8); // Reset pagination on filter change
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      gender: 'all',
      category: 'all',
      brands: [],
      families: [],
      maxPrice: 600,
      minRating: 0,
    });
    setSearchParams({});
    setVisibleCount(8);
  };

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query
    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter((p) => {
        const inName = p.name.toLowerCase().includes(q);
        const inBrand = p.brand.toLowerCase().includes(q);
        const inFamily = p.fragranceFamily.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inNotes = [...p.topNotes, ...p.heartNotes, ...p.baseNotes].some((n) =>
          n.toLowerCase().includes(q)
        );
        return inName || inBrand || inFamily || inDesc || inNotes;
      });
    }

    // Gender
    if (filters.gender !== 'all') {
      result = result.filter((p) => p.gender === filters.gender);
    }

    // Category
    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Brands
    if (filters.brands && filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Fragrance Families
    if (filters.families && filters.families.length > 0) {
      result = result.filter((p) => filters.families.includes(p.fragranceFamily));
    }

    // Price
    if (filters.maxPrice < 600) {
      result = result.filter((p) => p.price <= filters.maxPrice);
    }

    // Sorting
    switch (sortBy) {
      case 'bestseller':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.rating - a.rating);
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [filters, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedProducts.length;

  return (
    <div className="min-h-screen bg-cream py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Haute Parfumerie Catalog' }]} />

        {/* Page Banner / Header */}
        <div className="mb-10 text-center sm:text-left border-b border-sand pb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium block mb-2">
            The Royal Reserve
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark font-normal">
            All Fragrance Collections
          </h1>
          <p className="text-xs sm:text-sm text-muted max-w-2xl mt-2 font-light leading-relaxed">
            Explore cold-macerated extraits, timeless eau de parfums, and limited-edition private
            reserves formulated with rare botanicals.
          </p>
        </div>

        {/* Mobile Filter Button Bar */}
        <div className="lg:hidden flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-beige/60 text-xs uppercase tracking-wider text-dark font-medium shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-olive" />
            <span>Filter Fragrances</span>
          </button>
          <span className="text-xs text-muted">
            {filteredAndSortedProducts.length} Results
          </span>
        </div>

        {/* Layout Grid: Sidebar Filters + Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalResults={filteredAndSortedProducts.length}
              />
            </div>
          </div>

          {/* Product Listing Main Area */}
          <div className="lg:col-span-3 space-y-6">
            <ProductSort
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalCount={filteredAndSortedProducts.length}
            />

            <ProductGrid
              products={displayedProducts}
              columns={3}
              onResetFilters={handleResetFilters}
            />

            {/* Load More Button */}
            {hasMore && (
              <div className="pt-10 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-10 py-3.5 bg-white border border-olive text-olive hover:bg-olive hover:text-cream transition-all duration-300 text-xs uppercase tracking-[0.22em] font-medium shadow-sm"
                >
                  Load More Fragrances ({filteredAndSortedProducts.length - visibleCount} Remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-dark/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-cream h-full overflow-y-auto shadow-2xl p-6 flex flex-col z-50">
            <div className="flex items-center justify-between pb-4 border-b border-sand mb-4">
              <span className="font-serif text-xl text-dark">Filter Collection</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-muted hover:text-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResults={filteredAndSortedProducts.length}
            />

            <div className="mt-6 pt-4 border-t border-sand">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-olive text-cream text-xs uppercase tracking-wider font-medium"
              >
                Apply Filters ({filteredAndSortedProducts.length} Fragrances)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
