import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { formatPrice } from '../lib/utils';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Truck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, discountAmount, shippingFee, grandTotal, clearCart } = useCart();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    email: 'client.vip@palais.fr',
    phone: '+33 6 12 34 56 78',
    firstName: 'Éléonore',
    lastName: 'de Saint-Germain',
    address: '24 Rue de la Paix',
    apartment: 'Appartement 4B',
    city: 'Paris',
    state: 'Île-de-France',
    postalCode: '75002',
    country: 'France',
    shippingMethod: 'white-glove',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
    cardName: 'Éléonore de Saint-Germain',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.firstName || !formData.address || !formData.city) {
      addToast('Please complete all mandatory delivery fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Create completed order object
      const orderNumber = `ROYAL-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder = {
        orderNumber,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        customer: formData,
        items: cartItems,
        subtotal,
        discountAmount,
        shippingFee,
        grandTotal,
      };

      try {
        localStorage.setItem('luxury_last_order', JSON.stringify(completedOrder));
      } catch (err) {
        console.error(err);
      }

      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#443d23', '#521418', '#cab79f', '#c5a059'],
      });

      clearCart();
      setIsSubmitting(false);
      navigate('/order-success');
    }, 1200);
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="min-h-screen bg-cream py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Royal Bag', href: '/cart' },
            { label: 'Secure Checkout' },
          ]}
        />

        <div className="pb-6 border-b border-sand mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium block mb-1">
            Private Transaction
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-dark font-normal">
            Bespoke Order Finalization
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Customer & Shipping Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-white border border-beige/40 p-6 sm:p-8 shadow-soft space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl text-dark font-normal pb-3 border-b border-sand flex items-center justify-between">
                <span>1. VIP Client Information</span>
                <span className="text-xs text-muted font-sans font-light">Discreet & Encrypted</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                    Phone (Courier Alerts) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-white border border-beige/40 p-6 sm:p-8 shadow-soft space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl text-dark font-normal pb-3 border-b border-sand">
                2. White-Glove Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                  Street Address & Number *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                  Apartment, Suite, Private Residence
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark cursor-pointer"
                >
                  <option value="France">France</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Japan">Japan</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                </select>
              </div>
            </div>

            {/* 3. Shipping Method */}
            <div className="bg-white border border-beige/40 p-6 sm:p-8 shadow-soft space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl text-dark font-normal pb-3 border-b border-sand">
                3. Dispatch Privilege
              </h3>

              <div className="space-y-3">
                <label
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                    formData.shippingMethod === 'white-glove'
                      ? 'border-olive bg-sand/20'
                      : 'border-beige/40 hover:border-beige'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="white-glove"
                      checked={formData.shippingMethod === 'white-glove'}
                      onChange={handleInputChange}
                      className="accent-olive"
                    />
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-dark block">
                        White-Glove Insured Express Courier
                      </span>
                      <span className="text-[11px] text-muted">
                        Dispatched in temperature-controlled casing with signature requirement (2-3 business days)
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-olive uppercase">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                    formData.shippingMethod === 'overnight'
                      ? 'border-olive bg-sand/20'
                      : 'border-beige/40 hover:border-beige'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="overnight"
                      checked={formData.shippingMethod === 'overnight'}
                      onChange={handleInputChange}
                      className="accent-olive"
                    />
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-dark block">
                        VIP Midnight Priority Flight
                      </span>
                      <span className="text-[11px] text-muted">
                        Guaranteed next-morning salon courier delivery
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-dark">+$45.00</span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method Simulation */}
            <div className="bg-white border border-beige/40 p-6 sm:p-8 shadow-soft space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl text-dark font-normal pb-3 border-b border-sand flex items-center justify-between">
                <span>4. Payment Privilege (Frontend Simulation)</span>
                <Lock className="w-4 h-4 text-olive" />
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'applepay', label: 'Apple Pay', icon: Sparkles },
                  { id: 'cod', label: 'Concierge COD', icon: Truck },
                ].map((pm) => (
                  <button
                    type="button"
                    key={pm.id}
                    onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                    className={`py-3 px-2 border text-center transition-all ${
                      formData.paymentMethod === pm.id
                        ? 'border-olive bg-sand/30 font-medium'
                        : 'border-beige/40 hover:border-beige'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wider block text-dark">
                      {pm.label}
                    </span>
                  </button>
                ))}
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                        Security CVC
                      </label>
                      <input
                        type="password"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        maxLength={4}
                        className="w-full px-3 py-2 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'applepay' && (
                <div className="p-4 bg-sand/20 border border-beige/40 text-xs text-dark/80 text-center">
                  Apple Pay biometric authentication will be requested upon clicking "Authorize Order".
                </div>
              )}

              {formData.paymentMethod === 'cod' && (
                <div className="p-4 bg-sand/20 border border-beige/40 text-xs text-dark/80 text-center">
                  Payment will be accepted in cash or card by the white-glove chauffeur at your doorstep.
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-beige/40 p-6 sm:p-8 shadow-soft space-y-6 sticky top-28">
              <h3 className="font-serif text-2xl text-dark font-normal pb-3 border-b border-sand">
                Your Order Manifest
              </h3>

              {/* Items List Preview */}
              <div className="divide-y divide-sand max-h-72 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.key} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-12 h-14 object-cover border border-beige/40"
                      />
                      <div>
                        <span className="font-medium text-dark block">{item.product.name}</span>
                        <span className="text-[11px] text-muted">
                          {item.size} • Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-serif text-sm font-medium text-dark">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Numerical Breakdown */}
              <div className="pt-4 border-t border-sand space-y-2.5 text-xs tracking-wider">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="font-medium text-dark">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-burgundy font-medium">
                    <span>Privilege Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-muted">
                  <span>Delivery Method</span>
                  <span className="font-medium text-dark">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="pt-3 border-t border-sand flex justify-between items-baseline">
                  <span className="font-serif text-lg text-dark">Total Due</span>
                  <span className="font-serif text-2xl font-bold text-dark">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-olive text-cream hover:bg-olive-dark py-4 text-xs uppercase tracking-[0.22em] font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-md disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Authorizing Order With Maison...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-beige" />
                    <span>Authorize & Place Order</span>
                  </>
                )}
              </button>

              <div className="pt-3 text-center">
                <span className="text-[10px] text-muted tracking-wider uppercase block">
                  Encrypted 256-Bit SSL • Place Vendôme Assurance
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
