import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { PRODUCTS } from '../data/products';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('luxury_perfume_wishlist');
      return saved ? JSON.parse(saved) : ['l-elixir-oud-royal', 'rouge-velours-florentin'];
    } catch {
      return ['l-elixir-oud-royal', 'rouge-velours-florentin'];
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('luxury_perfume_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  const toggleWishlist = (product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast(`Removed "${product.name}" from your private wishlist.`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        addToast(`Added "${product.name}" to your private wishlist.`, 'success');
        return [...prev, product.id];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
    addToast('Fragrance removed from wishlist.', 'info');
  };

  const clearWishlist = () => {
    setWishlistIds([]);
    addToast('Wishlist cleared.', 'info');
  };

  // Hydrate full products for wishlist
  const wishlistProducts = wishlistIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount: wishlistIds.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
