import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/products/ProductCard';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { EmptyState } from '../components/common/EmptyState';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const Wishlist = () => {
  const { wishlistProducts, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMoveAllToBag = () => {
    wishlistProducts.forEach((p) => {
      addToCart(p, '50ml', 1);
    });
  };

  return (
    <div className="min-h-screen bg-cream py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Private Wishlist' }]} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-sand mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium block mb-1">
              Personal Vault
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-dark font-normal">
              Your Saved Scents
            </h1>
          </div>

          {wishlistCount > 0 && (
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <button
                onClick={handleMoveAllToBag}
                className="flex items-center gap-1.5 px-4 py-2 bg-olive text-cream hover:bg-olive-dark text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>
              <button
                onClick={clearWishlist}
                className="flex items-center gap-1 text-xs uppercase tracking-wider text-burgundy hover:text-burgundy-light font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Wishlist</span>
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items or Empty State */}
        {wishlistCount === 0 ? (
          <div className="bg-white border border-beige/40 p-8 sm:p-16 shadow-soft">
            <EmptyState
              icon={Heart}
              title="Your private wishlist is empty"
              description="Save your favorite extraits and eau de parfums to review them later or move them directly to your coffret."
              actionText="Discover Our Fragrances"
              actionHref="/shop"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
