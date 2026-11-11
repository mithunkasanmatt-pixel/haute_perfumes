import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { useCart } from '../../context/CartContext';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, size, quantity, unitPrice, key } = item;

  const itemTotal = unitPrice * quantity;

  return (
    <div className="py-6 border-b border-sand flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Product Image and Details */}
      <div className="flex items-center gap-4 flex-1">
        <Link
          to={`/product/${product.id}`}
          className="w-20 h-24 sm:w-24 sm:h-28 bg-sand/30 shrink-0 border border-beige/40 overflow-hidden"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-medium block">
            {product.brand}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="font-serif text-base sm:text-lg text-dark hover:text-olive transition-colors font-medium block leading-snug"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="bg-sand/50 px-2 py-0.5 text-[11px] font-medium text-dark">
              Size: {size}
            </span>
            <span>•</span>
            <span>{formatPrice(unitPrice)} each</span>
          </div>
        </div>
      </div>

      {/* Quantity & Item Subtotal */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        {/* Quantity Controls */}
        <div className="flex items-center border border-beige/60">
          <button
            onClick={() => updateQuantity(key, quantity - 1)}
            className="px-3 py-1 text-dark hover:bg-sand/30 transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-3 py-1 text-xs font-medium text-dark min-w-[28px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => updateQuantity(key, quantity + 1)}
            className="px-3 py-1 text-dark hover:bg-sand/30 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Total Price */}
        <div className="text-right min-w-[90px]">
          <span className="font-serif text-base sm:text-lg text-dark font-medium block">
            {formatPrice(itemTotal)}
          </span>
        </div>

        {/* Delete */}
        <button
          onClick={() => removeFromCart(key)}
          className="text-muted hover:text-burgundy transition-colors p-1"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
