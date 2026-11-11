import React from 'react';
import { CATEGORIES, BRANDS, GENDERS, FRAGRANCE_FAMILIES } from '../../data/products';
import { X, RotateCcw } from 'lucide-react';

export const ProductFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults = 0,
}) => {
  const handleGenderToggle = (gender) => {
    onFilterChange('gender', filters.gender === gender ? 'all' : gender);
  };

  const handleCategoryToggle = (category) => {
    onFilterChange('category', filters.category === category ? 'all' : category);
  };

  const handleBrandToggle = (brand) => {
    const current = filters.brands || [];
    const updated = current.includes(brand)
      ? current.filter((b) => b !== brand)
      : [...current, brand];
    onFilterChange('brands', updated);
  };

  const handleFamilyToggle = (family) => {
    const current = filters.families || [];
    const updated = current.includes(family)
      ? current.filter((f) => f !== family)
      : [...current, family];
    onFilterChange('families', updated);
  };

  const hasActiveFilters =
    filters.gender !== 'all' ||
    filters.category !== 'all' ||
    (filters.brands && filters.brands.length > 0) ||
    (filters.families && filters.families.length > 0) ||
    filters.maxPrice < 600 ||
    filters.minRating > 0 ||
    Boolean(filters.search);

  return (
    <div className="space-y-8 bg-white/70 p-6 border border-beige/40">
      {/* Header and Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-sand">
        <div>
          <h3 className="font-serif text-xl text-dark font-normal">Filters</h3>
          <span className="text-[11px] text-muted tracking-wider">
            {totalResults} {totalResults === 1 ? 'Fragrance' : 'Fragrances'} Found
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-burgundy hover:text-burgundy-light font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1.5 pb-4 border-b border-sand">
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] bg-sand/60 text-dark border border-beige/60">
              Keyword: "{filters.search}"
              <button onClick={() => onFilterChange('search', '')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {filters.gender !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] bg-sand/60 text-dark border border-beige/60">
              {filters.gender}
              <button onClick={() => onFilterChange('gender', 'all')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] bg-sand/60 text-dark border border-beige/60">
              {filters.category}
              <button onClick={() => onFilterChange('category', 'all')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {filters.brands && filters.brands.map((b) => (
            <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] bg-sand/60 text-dark border border-beige/60">
              {b}
              <button onClick={() => handleBrandToggle(b)}><X className="w-3 h-3" /></button>
            </span>
          ))}
          {filters.families && filters.families.map((f) => (
            <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] bg-sand/60 text-dark border border-beige/60">
              {f}
              <button onClick={() => handleFamilyToggle(f)}><X className="w-3 h-3" /></button>
            </span>
          ))}
          {filters.maxPrice < 600 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] bg-sand/60 text-dark border border-beige/60">
              Under ${filters.maxPrice}
              <button onClick={() => onFilterChange('maxPrice', 600)}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

      {/* Gender Filter */}
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] text-dark font-medium mb-3">
          Gender & Essence
        </h4>
        <div className="flex flex-wrap gap-2">
          {['all', ...GENDERS].map((g) => (
            <button
              key={g}
              onClick={() => onFilterChange('gender', g)}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase border transition-all ${
                filters.gender === g
                  ? 'bg-olive text-cream border-olive font-medium'
                  : 'bg-white border-beige/60 text-dark hover:border-olive'
              }`}
            >
              {g === 'all' ? 'All Genders' : g}
            </button>
          ))}
        </div>
      </div>

      {/* Fragrance Concentration / Category */}
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] text-dark font-medium mb-3">
          Concentration
        </h4>
        <div className="space-y-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategoryToggle(c.id)}
              className={`w-full flex items-center justify-between text-left text-xs py-1.5 px-2 transition-colors ${
                filters.category === c.id
                  ? 'bg-cream text-olive font-medium border-l-2 border-olive'
                  : 'text-dark/80 hover:text-olive'
              }`}
            >
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs uppercase tracking-[0.2em] text-dark font-medium">
            Maximum Price
          </h4>
          <span className="font-serif text-sm font-medium text-olive">
            ${filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="200"
          max="600"
          step="25"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
          className="w-full accent-olive cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-muted mt-1 font-light">
          <span>$200</span>
          <span>$600</span>
        </div>
      </div>

      {/* Brands Accordion / List */}
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] text-dark font-medium mb-3">
          Perfumery Houses
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {BRANDS.map((brand) => {
            const isChecked = filters.brands?.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-2.5 text-xs text-dark/80 hover:text-dark cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleBrandToggle(brand)}
                  className="rounded-none border-beige/80 text-olive focus:ring-0 accent-olive w-3.5 h-3.5"
                />
                <span className={isChecked ? 'font-medium text-dark' : 'font-light'}>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Fragrance Families */}
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] text-dark font-medium mb-3">
          Fragrance Family
        </h4>
        <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
          {FRAGRANCE_FAMILIES.map((fam) => {
            const isChecked = filters.families?.includes(fam);
            return (
              <label
                key={fam}
                className="flex items-center gap-2.5 text-xs text-dark/80 hover:text-dark cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleFamilyToggle(fam)}
                  className="rounded-none border-beige/80 text-olive focus:ring-0 accent-olive w-3.5 h-3.5"
                />
                <span className={isChecked ? 'font-medium text-dark' : 'font-light'}>{fam}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
