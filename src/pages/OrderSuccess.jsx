import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, PackageCheck, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../lib/utils';

export const OrderSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const saved = localStorage.getItem('luxury_last_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-beige/40 p-8 sm:p-12 shadow-soft text-center space-y-8">
          {/* Top Emblem */}
          <div className="w-16 h-16 rounded-full bg-olive/10 border border-olive/30 text-olive flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium block mb-2">
              Order Confirmed & Maceration Recorded
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark font-normal">
              Thank You, Connoisseur
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-3 font-light max-w-lg mx-auto leading-relaxed">
              Your bespoke fragrance order has been accepted into our Grasse packaging salon.
              A wax-sealed manifest and shipment tracking code will be dispatched to your email.
            </p>
          </div>

          {/* Order Details Card */}
          {order && (
            <div className="bg-sand/20 border border-beige/40 p-6 text-left space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-sand gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted block">
                    Royal Order Reference
                  </span>
                  <span className="font-serif text-lg font-medium text-dark">
                    {order.orderNumber}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted block">
                    Estimated Delivery
                  </span>
                  <span className="text-xs font-semibold text-olive uppercase">
                    3-4 Business Days (Express Insured)
                  </span>
                </div>
              </div>

              {/* Items summary */}
              <div className="divide-y divide-sand max-h-48 overflow-y-auto pr-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-dark">{item.product.name}</span>
                      <span className="text-muted">({item.size} × {item.quantity})</span>
                    </div>
                    <span className="font-serif font-medium text-dark">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total & Delivery Address */}
              <div className="pt-4 border-t border-sand flex flex-col sm:flex-row justify-between text-xs gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted block mb-0.5">
                    Destination
                  </span>
                  <span className="text-dark font-light block">
                    {order.customer.firstName} {order.customer.lastName}
                  </span>
                  <span className="text-dark/80 font-light block">
                    {order.customer.address}, {order.customer.city}, {order.customer.country}
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-muted block mb-0.5">
                    Paid Amount
                  </span>
                  <span className="font-serif text-xl font-bold text-dark">
                    {formatPrice(order.grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Complimentary Discovery Notice */}
          <div className="p-4 bg-olive/5 border border-beige/60 text-xs text-dark/80 flex items-center justify-center gap-2">
            <PackageCheck className="w-4 h-4 text-olive shrink-0" />
            <span>
              Your parcel includes 2 complimentary 5ml discovery extracts and personalized wax seal.
            </span>
          </div>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-3.5 bg-olive text-cream hover:bg-olive-dark text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore More Creations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-3.5 border border-beige/60 text-dark hover:border-olive text-xs uppercase tracking-[0.2em] font-medium transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
