import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { DEMO_COUPONS } from '../data/products';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('luxury_perfume_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('luxury_perfume_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('luxury_perfume_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('luxury_perfume_coupon', JSON.stringify(appliedCoupon));
    } catch (e) {
      console.error('Error saving coupon to localStorage', e);
    }
  }, [appliedCoupon]);

  const calculateUnitPrice = (basePrice, sizeStr, sizes = []) => {
    const sizeObj = sizes.find((s) => s.size === sizeStr);
    const multiplier = sizeObj ? sizeObj.priceMultiplier : 1.0;
    return Math.round(basePrice * multiplier);
  };

  const addToCart = (product, size = '50ml', quantity = 1) => {
    const unitPrice = calculateUnitPrice(product.price, size, product.sizes);
    const itemKey = `${product.id}_${size}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.key === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            key: itemKey,
            productId: product.id,
            product,
            size,
            quantity,
            unitPrice,
          },
        ];
      }
    });

    addToast(`Added ${quantity}x "${product.name} (${size})" to your royal bag.`, 'success');
  };

  const updateQuantity = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.key === itemKey ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemKey) => {
    setCartItems((prev) => prev.filter((item) => item.key !== itemKey));
    addToast('Item removed from shopping bag.', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (codeRaw) => {
    const code = codeRaw.trim().toUpperCase();
    if (!code) {
      addToast('Please enter a promotion code.', 'error');
      return false;
    }
    const match = DEMO_COUPONS[code];
    if (match) {
      setAppliedCoupon(match);
      addToast(`Privilege code "${code}" applied: ${match.discountPercent}% discount!`, 'success');
      return true;
    } else {
      addToast(`Code "${code}" is invalid or expired. Try "LUXURY10" or "NOIR20".`, 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Promotion privilege removed.', 'info');
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const discountPercent = appliedCoupon ? appliedCoupon.discountPercent : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);

  // Free shipping over $150
  const freeShippingThreshold = 150;
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 25;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        discountAmount,
        discountPercent,
        shippingFee,
        freeShippingThreshold,
        grandTotal,
        appliedCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
