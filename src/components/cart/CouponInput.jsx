import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Tag, Check, X } from 'lucide-react';

export const CouponInput = () => {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) {
      const ok = applyCoupon(code);
      if (ok) setCode('');
    }
  };

  return (
    <div className="py-4 border-t border-b border-sand">
      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 bg-olive/10 border border-olive/30">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-olive shrink-0" />
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-dark block">
                Code Applied: {appliedCoupon.code}
              </span>
              <span className="text-[11px] text-muted">
                {appliedCoupon.description} ({appliedCoupon.discountPercent}% Off)
              </span>
            </div>
          </div>
          <button
            onClick={removeCoupon}
            className="p-1 text-muted hover:text-burgundy transition-colors"
            title="Remove coupon"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-dark font-medium block">
            Promotional Privilege Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. LUXURY10 or NOIR20"
              className="flex-1 px-3 py-2 text-xs uppercase tracking-wider bg-white border border-beige/60 outline-none focus:border-olive text-dark"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-dark text-cream hover:bg-olive transition-colors text-xs uppercase tracking-wider font-medium shrink-0"
            >
              Apply
            </button>
          </div>
          <p className="text-[10px] text-muted font-light">
            Available demo codes: <strong className="text-olive font-medium">LUXURY10</strong> (10% off), <strong className="text-olive font-medium">NOIR20</strong> (20% off)
          </p>
        </form>
      )}
    </div>
  );
};
