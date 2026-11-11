import React from 'react';
import { Link } from 'react-router-dom';
import { NewsletterForm } from '../common/NewsletterForm';
import { ShieldCheck, Truck, Sparkles, RefreshCw, Instagram, Compass } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-olive text-cream border-t border-olive-light/30 pt-16 pb-10">
      {/* Upper Features Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-olive-light/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-olive-dark border border-beige/20 text-beige">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-cream font-normal mb-1">Grasse Haute Parfumerie</h4>
              <p className="text-xs text-cream/70 font-light leading-relaxed">
                Cold-macerated pure botanical extracts and certified 100% natural absolutes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-olive-dark border border-beige/20 text-beige">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-cream font-normal mb-1">White Glove Courier</h4>
              <p className="text-xs text-cream/70 font-light leading-relaxed">
                Complimentary temperature-controlled insured dispatch on all orders over $150.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-olive-dark border border-beige/20 text-beige">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-cream font-normal mb-1">Numbered Authenticity</h4>
              <p className="text-xs text-cream/70 font-light leading-relaxed">
                Each flacon comes etched with an individual batch certificate and wax seal.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-olive-dark border border-beige/20 text-beige">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-cream font-normal mb-1">Discovery Guarantee</h4>
              <p className="text-xs text-cream/70 font-light leading-relaxed">
                Every bottle arrives with a matching 5ml discovery vial to test before opening.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Info & Newsletter */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-cream font-medium block">
                L'ÉLIXIR ROYAL
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-beige font-light block mt-1">
                Haute Parfumerie Privée • Founded 1894
              </span>
            </div>
            <p className="text-xs text-cream/80 font-light leading-relaxed max-w-md">
              Devoted to the elusive art of rare fragrance distillation. We hand-bottle limited-batch
              perfume extracts formulated by master noses in Grasse and Paris for discerning collectors worldwide.
            </p>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-beige block mb-3 font-medium">
                Join the Private Salon Circle
              </span>
              <NewsletterForm light />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="text-xs uppercase tracking-[0.2em] text-beige font-semibold">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-cream/80 font-light">
              <li>
                <Link to="/shop" className="hover:text-cream hover:underline underline-offset-4 transition-colors">
                  All Fragrances
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=Women" className="hover:text-cream hover:underline underline-offset-4 transition-colors">
                  Femme Collection
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=Men" className="hover:text-cream hover:underline underline-offset-4 transition-colors">
                  Homme Collection
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=Unisex" className="hover:text-cream hover:underline underline-offset-4 transition-colors">
                  Unisex Blends
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Extrait de Parfum" className="hover:text-cream hover:underline underline-offset-4 transition-colors">
                  Extraits de Parfum
                </Link>
              </li>
              <li>
                <Link to="/shop?sort=bestseller" className="hover:text-cream hover:underline underline-offset-4 transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="text-xs uppercase tracking-[0.2em] text-beige font-semibold">
              Concierge
            </h5>
            <ul className="space-y-2.5 text-xs text-cream/80 font-light">
              <li>
                <Link to="/contact" className="hover:text-cream hover:underline underline-offset-4 transition-colors">
                  Bespoke Scent Consultation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cream hover:underline underline-offset-4 transition-colors">
                  Flacon Monogramming
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cream hover:underline underline-offset-4 transition-colors">
                  Shipping & Customs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cream hover:underline underline-offset-4 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cream hover:underline underline-offset-4 transition-colors">
                  Authenticity Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Flagship Salons */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-xs uppercase tracking-[0.2em] text-beige font-semibold">
              Salons & Boutiques
            </h5>
            <div className="space-y-3 text-xs text-cream/80 font-light">
              <div>
                <strong className="block text-cream font-medium">Paris Flagship</strong>
                <span>18 Place Vendôme, 75001 Paris, France</span>
              </div>
              <div>
                <strong className="block text-cream font-medium">London Mayfair</strong>
                <span>44 New Bond Street, London W1S 2RR, UK</span>
              </div>
              <div>
                <strong className="block text-cream font-medium">New York Madison</strong>
                <span>720 Madison Avenue, New York, NY 10065</span>
              </div>
              <div className="pt-2">
                <span className="block text-beige text-[11px] uppercase tracking-wider">VIP Appointment Line</span>
                <span className="text-cream font-serif text-sm">+33 (0)1 42 68 00 90</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-olive-light/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream/60 font-light">
        <p>© {new Date().getFullYear()} L'ÉLIXIR ROYAL HAUTE PARFUMERIE. All rights reserved.</p>
        <div className="flex items-center space-x-6">
          <Link to="/about" className="hover:text-cream transition-colors">Privacy Policy</Link>
          <Link to="/about" className="hover:text-cream transition-colors">Terms of Luxury Service</Link>
          <Link to="/contact" className="hover:text-cream transition-colors">Security & Ethics</Link>
        </div>
      </div>
    </footer>
  );
};
