import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { EmptyState } from '../components/common/EmptyState';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';

export const Cart = () => {
  const { cartItems, clearCart, totalItems } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Royal Shopping Bag' }]} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-sand mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium block mb-1">
              Curated Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-dark font-normal">
              Your Fragrance Bag
            </h1>
          </div>
          {cartItems.length > 0 && (
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <span className="text-xs text-muted uppercase tracking-wider">
                {totalItems} {totalItems === 1 ? 'Flacon' : 'Flacons'} Selected
              </span>
              <button
                onClick={clearCart}
                className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-burgundy hover:text-burgundy-light font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Empty Bag</span>
              </button>
            </div>
          )}
        </div>

        {/* Cart Contents or Empty State */}
        {cartItems.length === 0 ? (
          <div className="bg-white border border-beige/40 p-8 sm:p-16 shadow-soft">
            <EmptyState
              icon={ShoppingBag}
              title="Your royal bag is currently vacant"
              description="No fragrances have been placed in your private coffret yet. Explore our bespoke olfactory collection and discover your signature aroma."
              actionText="Explore Haute Parfumerie"
              actionHref="/shop"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Items List (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-beige/40 p-6 sm:p-8 shadow-soft">
              <div className="divide-y divide-sand">
                {cartItems.map((item) => (
                  <CartItem key={item.key} item={item} />
                ))}
              </div>

              <div className="pt-6 mt-6 border-t border-sand flex items-center justify-between">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-olive hover:text-burgundy font-medium transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Exploring Perfumes</span>
                </Link>
              </div>
            </div>

            {/* Cart Summary & Checkout (5 cols) */}
            <div className="lg:col-span-5 sticky top-28">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
