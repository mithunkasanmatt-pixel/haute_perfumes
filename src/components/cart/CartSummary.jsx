import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CouponInput } from './CouponInput';
import { formatPrice } from '../../lib/utils';
import { ShieldCheck, Truck, ArrowRight } from 'lucide-react';

export const CartSummary = ({ isCheckout = false }) => {
  const {
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    appliedCoupon,
    freeShippingThreshold,
  } = useCart();

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="bg-white border border-beige/40 p-6 sm:p-8 space-y-6 shadow-sm">
      <h3 className="font-serif text-2xl text-dark font-normal pb-3 border-b border-sand">
        Order Summary
      </h3>

      {/* Free Shipping Progress bar */}
      {!isCheckout && (
        <div className="bg-sand/30 p-3.5 border border-beige/40 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            <span className="flex items-center gap-1.5 text-dark">
              <Truck className="w-3.5 h-3.5 text-olive" />
              {amountToFreeShipping === 0 ? (
                <span className="text-olive font-semibold">Complimentary Express Shipping Unlocked!</span>
              ) : (
                <span>Add {formatPrice(amountToFreeShipping)} more for Free Courier</span>
              )}
            </span>
            <span className="text-muted">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-sand h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-olive h-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Numerical breakdown */}
      <div className="space-y-3 text-xs tracking-wider">
        <div className="flex justify-between text-muted">
          <span>Subtotal</span>
          <span className="font-medium text-dark">{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-burgundy font-medium">
            <span>Privilege Discount ({appliedCoupon?.code})</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-muted">
          <span>White Glove Courier</span>
          <span className="font-medium text-dark">
            {shippingFee === 0 ? (
              <span className="text-olive uppercase font-semibold">Complimentary</span>
            ) : (
              formatPrice(shippingFee)
            )}
          </span>
        </div>

        <div className="pt-3 border-t border-sand flex justify-between items-baseline">
          <span className="font-serif text-lg text-dark">Estimated Grand Total</span>
          <span className="font-serif text-2xl font-semibold text-dark">
            {formatPrice(grandTotal)}
          </span>
        </div>
        <p className="text-[10px] text-muted font-light">
          Sales taxes calculated at final destination. Includes insurance and signature delivery.
        </p>
      </div>

      {/* Coupon input */}
      {!isCheckout && <CouponInput />}

      {/* Actions */}
      {!isCheckout && (
        <div className="space-y-3 pt-2">
          <Link
            to="/checkout"
            className="w-full bg-olive text-cream hover:bg-olive-dark py-4 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-colors duration-300 shadow-md"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/shop"
            className="w-full block text-center py-2 text-xs uppercase tracking-[0.15em] text-muted hover:text-dark transition-colors"
          >
            Continue Scent Exploration
          </Link>
        </div>
      )}

      {/* Trust badges */}
      <div className="pt-4 border-t border-sand flex items-center gap-2 text-[11px] text-muted">
        <ShieldCheck className="w-4 h-4 text-olive shrink-0" />
        <span>100% Guaranteed Authentic Haute Parfumerie</span>
      </div>
    </div>
  );
};
