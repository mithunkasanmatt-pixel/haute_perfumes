import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Heart, ShoppingBag, ChevronRight, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const MobileNavigation = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
      setSearchTerm('');
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'All Fragrances', href: '/shop' },
    { label: "Women's Collection", href: '/shop?gender=Women' },
    { label: "Men's Collection", href: '/shop?gender=Men' },
    { label: 'Unisex Rare Extracts', href: '/shop?gender=Unisex' },
    { label: 'Extrait de Parfum', href: '/shop?category=Extrait de Parfum' },
    { label: 'The Maison Heritage', href: '/about' },
    { label: 'VIP Concierge', href: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-cream z-50 flex flex-col shadow-2xl border-r border-sand overflow-y-auto"
          >
            {/* Header */}
            <div className="p-5 border-b border-sand flex items-center justify-between">
              <div>
                <span className="font-serif text-xl tracking-[0.15em] text-dark font-medium block">
                  L'ÉLIXIR ROYAL
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-muted">
                  Haute Parfumerie
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-dark hover:text-olive transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-5 border-b border-sand bg-white/50">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search perfumes, notes, brands..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-beige/60 text-xs tracking-wider outline-none text-dark placeholder-muted focus:border-olive"
                />
                <Search className="w-4 h-4 text-muted absolute left-3 top-3" />
              </form>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-4 px-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-medium block mb-3">
                Navigation
              </span>
              <ul className="space-y-1">
                {navLinks.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-2.5 text-xs uppercase tracking-[0.18em] text-dark hover:text-olive font-medium border-b border-sand/40 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-beige" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions at bottom */}
            <div className="p-5 border-t border-sand bg-white/60 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-3 border border-beige/60 text-xs uppercase tracking-wider text-dark hover:border-burgundy hover:text-burgundy transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist ({wishlistCount})</span>
                </Link>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-3 bg-olive text-cream text-xs uppercase tracking-wider hover:bg-olive-dark transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Bag ({totalItems})</span>
                </Link>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[10px] text-muted tracking-widest uppercase block">
                  Place Vendôme • Mayfair • Ginza
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
