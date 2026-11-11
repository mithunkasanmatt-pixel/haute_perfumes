import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Rating } from '../common/Rating';
import { formatPrice } from '../../lib/utils';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useQuickView } from '../../context/QuickViewContext';

export const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { openQuickView } = useQuickView();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, '50ml', 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div className="group relative bg-white border border-beige/40 flex flex-col justify-between overflow-hidden luxury-card">
      {/* Top Media Container */}
      <div className="relative aspect-[4/5] bg-sand/20 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="bg-olive text-cream text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium shadow-sm">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-burgundy text-white text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium shadow-sm">
              New Arrival
            </span>
          )}
          {product.discount > 0 && !product.isBestSeller && (
            <span className="bg-beige text-dark text-[10px] uppercase tracking-wider px-2 py-0.5 font-medium">
              Save {product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 shadow-sm ${
            isFavorited
              ? 'bg-burgundy text-white'
              : 'bg-white/90 text-dark hover:bg-white hover:text-burgundy'
          }`}
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image with Hover transition */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Hover Quick Action Buttons */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickViewClick}
            className="flex-1 bg-white/95 backdrop-blur-sm text-dark hover:bg-dark hover:text-white py-2.5 px-3 text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors shadow-md border border-beige/60"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="bg-olive text-cream hover:bg-olive-dark p-2.5 transition-colors shadow-md"
            title="Quick add 50ml to cart"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-medium truncate">
              {product.brand}
            </span>
            <span className="text-[10px] text-olive font-medium tracking-wider uppercase shrink-0">
              {product.category}
            </span>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-lg sm:text-xl text-dark group-hover:text-olive transition-colors font-normal leading-snug line-clamp-1 mb-1.5">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] text-muted tracking-wide font-light mb-2.5 line-clamp-1">
            {product.fragranceFamily} • {product.gender}
          </p>

          <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>

        {/* Pricing and Add to Bag */}
        <div className="mt-4 pt-3 border-t border-sand/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-serif font-medium text-dark">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-muted/70 line-through font-light">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="text-[11px] uppercase tracking-[0.15em] text-olive hover:text-burgundy font-medium flex items-center gap-1 transition-colors"
          >
            <span>+ Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
