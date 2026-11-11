import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const Navbar = ({ onOpenMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collectionMenuOpen, setCollectionMenuOpen] = useState(false);

  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinkClass = ({ isActive }) =>
    `text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 py-1 border-b ${
      isActive
        ? 'text-dark border-olive font-semibold'
        : 'text-dark/70 border-transparent hover:text-dark hover:border-beige'
    }`;

  return (
    <>
      {/* Top Banner Announcement */}
      <div className="bg-olive text-cream text-[11px] uppercase tracking-[0.2em] py-2 px-4 text-center font-medium border-b border-olive-light/20 flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-beige shrink-0" />
        <span>Complimentary Express Courier & 2 Discovery Samples On All Orders Over $150</span>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-soft border-b border-sand py-3.5'
            : 'bg-cream/90 backdrop-blur-sm border-b border-sand/60 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu Button & Desktop Main Nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-1.5 text-dark hover:text-olive transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center space-x-8">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>

              {/* Collections with Submenu */}
              <div
                className="relative"
                onMouseEnter={() => setCollectionMenuOpen(true)}
                onMouseLeave={() => setCollectionMenuOpen(false)}
              >
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 py-1 border-b ${
                      isActive || location.pathname.startsWith('/shop')
                        ? 'text-dark border-olive font-semibold'
                        : 'text-dark/70 border-transparent hover:text-dark hover:border-beige'
                    }`
                  }
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3 h-3 text-muted" />
                </NavLink>

                {collectionMenuOpen && (
                  <div className="absolute top-full left-0 pt-2 w-56 z-50 animate-fade-in">
                    <div className="bg-white border border-beige/40 shadow-xl py-2 px-1">
                      <Link
                        to="/shop"
                        className="block px-4 py-2 text-xs tracking-wider uppercase text-dark hover:bg-cream hover:text-olive transition-colors"
                        onClick={() => setCollectionMenuOpen(false)}
                      >
                        All Fragrances
                      </Link>
                      <Link
                        to="/shop?gender=Women"
                        className="block px-4 py-2 text-xs tracking-wider uppercase text-dark hover:bg-cream hover:text-olive transition-colors"
                        onClick={() => setCollectionMenuOpen(false)}
                      >
                        Women's Perfumes
                      </Link>
                      <Link
                        to="/shop?gender=Men"
                        className="block px-4 py-2 text-xs tracking-wider uppercase text-dark hover:bg-cream hover:text-olive transition-colors"
                        onClick={() => setCollectionMenuOpen(false)}
                      >
                        Men's Colognes
                      </Link>
                      <Link
                        to="/shop?gender=Unisex"
                        className="block px-4 py-2 text-xs tracking-wider uppercase text-dark hover:bg-cream hover:text-olive transition-colors"
                        onClick={() => setCollectionMenuOpen(false)}
                      >
                        Unisex Rare Essences
                      </Link>
                      <div className="my-1 border-t border-sand/60" />
                      <Link
                        to="/shop?category=Extrait de Parfum"
                        className="block px-4 py-2 text-xs tracking-wider uppercase text-olive font-medium hover:bg-cream transition-colors"
                        onClick={() => setCollectionMenuOpen(false)}
                      >
                        Extrait de Parfum
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <NavLink to="/about" className={navLinkClass}>
                Maison
              </NavLink>

              <NavLink to="/contact" className={navLinkClass}>
                Concierge
              </NavLink>
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <Link
            to="/"
            className="flex flex-col items-center text-center group cursor-pointer select-none"
          >
            <span className="font-serif text-2xl sm:text-3xl md:text-3xl tracking-[0.18em] text-dark group-hover:text-olive transition-colors font-medium">
              L'ÉLIXIR ROYAL
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-muted group-hover:text-olive-light transition-colors font-light">
              Haute Parfumerie • Paris
            </span>
          </Link>

          {/* Right: Actions (Search, Wishlist, Cart) */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 text-dark hover:text-olive transition-colors relative"
              aria-label="Search fragrances"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-1.5 text-dark hover:text-burgundy transition-colors relative"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-burgundy text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="p-1.5 text-dark hover:text-olive transition-colors relative flex items-center gap-1.5"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-olive text-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-sand bg-white/95 px-4 py-4 animate-fade-in shadow-inner">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-4 h-4 text-muted absolute left-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by perfume name, note (e.g. Oud, Rose, Vanilla), or brand..."
                  autoFocus
                  className="w-full pl-10 pr-10 py-2.5 text-xs tracking-wider bg-transparent border-b border-beige focus:border-olive outline-none text-dark placeholder-muted"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 text-muted hover:text-dark p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-2.5 flex items-center gap-2 text-[11px] text-muted overflow-x-auto py-1">
                <span className="shrink-0 text-dark/70 font-medium">Trending:</span>
                {['Oud Royal', 'Santal', 'Rouge Velours', 'Rose Damascena', 'Cognac'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      navigate(`/shop?search=${encodeURIComponent(tag)}`);
                      setIsSearchOpen(false);
                    }}
                    className="hover:text-olive hover:underline underline-offset-2 shrink-0"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
