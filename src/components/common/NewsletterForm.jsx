import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { ArrowRight, Check } from 'lucide-react';

export const NewsletterForm = ({ light = false, compact = false }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please provide a valid email address.', 'error');
      return;
    }
    setIsSubmitted(true);
    addToast('Welcome to L’Élixir Royal Private Circle. Check your inbox for your 15% privilege grant.', 'success');
    setEmail('');
  };

  if (isSubmitted) {
    return (
      <div className={`flex items-center gap-2 p-3 ${light ? 'text-cream bg-white/10' : 'text-olive bg-sand/30'} border border-beige/40 text-xs tracking-wider uppercase`}>
        <Check className="w-4 h-4 text-gold shrink-0" />
        <span>You are enrolled in our private salon releases.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your VIP email address..."
            required
            className={`w-full px-4 py-3.5 text-xs tracking-wider outline-none transition-all duration-300 ${
              light
                ? 'bg-white/10 border-beige/40 text-white placeholder-cream/50 focus:border-beige focus:bg-white/15'
                : 'bg-white border-beige/60 text-dark placeholder-muted/60 focus:border-olive focus:ring-1 focus:ring-olive'
            } border rounded-none`}
          />
        </div>
        <button
          type="submit"
          className={`px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
            light
              ? 'bg-beige text-dark hover:bg-white'
              : 'bg-olive text-cream hover:bg-olive-dark'
          }`}
        >
          <span>Subscribe</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className={`mt-2 text-[11px] font-light ${light ? 'text-cream/60' : 'text-muted'}`}>
        By subscribing, you agree to receive exclusive invitations and rare bottling releases. Unsubscribe anytime.
      </p>
    </form>
  );
};
