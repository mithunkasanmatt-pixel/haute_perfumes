import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { FragranceNotes } from '../components/products/FragranceNotes';
import { Rating } from '../components/common/Rating';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  Wind,
  Calendar,
} from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('50ml');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('scent');

  // Customer Reviews state
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Lord Sterling H.',
      date: '2 weeks ago',
      rating: 5,
      title: 'An absolute benchmark of modern perfumery',
      content: 'The depth of the natural resins is astounding. I wore this to an evening gala at the Royal Opera House and received compliments continuously through midnight.',
    },
    {
      id: 2,
      author: 'Victoire de Castellane',
      date: '1 month ago',
      rating: 5,
      title: 'The drydown is pure poetry',
      content: 'Starts with an invigorating, crystal-clear projection and settles into the most intoxicating cashmere warmth. Beautiful presentation flacon.',
    },
  ]);

  const [newReview, setNewReview] = useState({ author: '', rating: 5, title: '', content: '' });
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
    setSelectedSize('50ml');
    setQuantity(1);
  }, [id]);

  const isFavorited = isInWishlist(product.id);

  // Price calculations according to size
  const sizeObj = product.sizes.find((s) => s.size === selectedSize);
  const multiplier = sizeObj ? sizeObj.priceMultiplier : 1.0;
  const currentPrice = Math.round(product.price * multiplier);
  const originalPrice = Math.round(product.originalPrice * multiplier);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.title || !newReview.content) {
      addToast('Please complete all review fields.', 'error');
      return;
    }
    setReviewsList([
      {
        id: Date.now(),
        author: newReview.author,
        date: 'Just now',
        rating: Number(newReview.rating),
        title: newReview.title,
        content: newReview.content,
      },
      ...reviewsList,
    ]);
    setIsReviewSubmitted(true);
    addToast('Your critique has been submitted to the curation panel.', 'success');
    setNewReview({ author: '', rating: 5, title: '', content: '' });
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.fragranceFamily === product.fragranceFamily || p.brand === product.brand)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-cream py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Shop', href: '/shop' },
            { label: product.brand, href: `/shop?brands=${encodeURIComponent(product.brand)}` },
            { label: product.name },
          ]}
        />

        {/* Product Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white border border-beige/40 p-6 sm:p-10 mb-16 shadow-soft">
          {/* Left: Gallery (5 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Main Image with Zoom container */}
            <div className="relative aspect-[4/5] bg-sand/20 border border-beige/40 overflow-hidden group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 z-10 p-3 rounded-full shadow-md transition-colors ${
                  isFavorited
                    ? 'bg-burgundy text-white'
                    : 'bg-white text-dark hover:text-burgundy'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>

              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-beige text-dark text-xs uppercase tracking-wider px-3 py-1 font-semibold">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-[4/5] border-2 overflow-hidden transition-all duration-200 ${
                    selectedImageIndex === idx
                      ? 'border-olive shadow-sm'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Guarantees Box */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-sand text-center text-[11px] text-muted font-light">
              <div className="p-2 bg-sand/20 flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-olive" />
                <span>Complimentary Delivery</span>
              </div>
              <div className="p-2 bg-sand/20 flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-olive" />
                <span>100% Authentic Flacon</span>
              </div>
              <div className="p-2 bg-sand/20 flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-olive" />
                <span>30-Day Return Sealed</span>
              </div>
            </div>
          </div>

          {/* Right: Product Story & Purchase Config (7 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between pb-2 border-b border-sand">
                <span className="text-xs uppercase tracking-[0.25em] text-muted font-medium">
                  {product.brand}
                </span>
                <span className="text-xs uppercase tracking-wider text-olive font-semibold">
                  {product.category} • {product.gender}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-dark font-normal mt-3 mb-2 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
                <span className="text-xs text-muted/60">•</span>
                <span className="text-xs uppercase tracking-wider text-olive font-medium">
                  {product.fragranceFamily}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-sand">
                <span className="font-serif text-3xl sm:text-4xl text-dark font-medium">
                  {formatPrice(currentPrice)}
                </span>
                {originalPrice > currentPrice && (
                  <span className="text-base text-muted line-through font-light">
                    {formatPrice(originalPrice)}
                  </span>
                )}
                <span className="text-xs text-muted font-light">
                  Tax included. Monogramming and gift coffret included.
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-muted leading-relaxed font-light mb-6">
                {product.description}
              </p>

              {/* Olfactory Technical Attributes */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-sand/30 border border-beige/40 text-xs mb-8">
                <div>
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted mb-0.5">
                    <Clock className="w-3 h-3 text-olive" /> Longevity
                  </span>
                  <span className="font-medium text-dark">{product.longevity}</span>
                </div>
                <div>
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted mb-0.5">
                    <Wind className="w-3 h-3 text-olive" /> Sillage
                  </span>
                  <span className="font-medium text-dark">{product.sillage}</span>
                </div>
                <div>
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted mb-0.5">
                    <Calendar className="w-3 h-3 text-olive" /> Season
                  </span>
                  <span className="font-medium text-dark">{product.season}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider text-dark font-medium">
                    Select Flacon Volume
                  </label>
                  <span className="text-xs text-muted">
                    Selected: <strong className="text-dark">{selectedSize}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((s) => {
                    const priceForSize = Math.round(product.price * s.priceMultiplier);
                    const isSelected = selectedSize === s.size;
                    return (
                      <button
                        key={s.size}
                        onClick={() => setSelectedSize(s.size)}
                        className={`p-3 text-center border transition-all ${
                          isSelected
                            ? 'border-olive bg-olive text-cream font-medium shadow-sm'
                            : 'border-beige/60 text-dark hover:border-olive bg-white'
                        }`}
                      >
                        <span className="block text-xs uppercase tracking-wider font-semibold">
                          {s.size}
                        </span>
                        <span className="block text-[11px] opacity-80 mt-0.5">
                          {formatPrice(priceForSize)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-beige/60 bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3.5 text-dark hover:bg-sand/30 transition-colors"
                      aria-label="Decrease"
                    >
                      -
                    </button>
                    <span className="px-4 py-3.5 text-xs font-semibold text-dark min-w-[36px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3.5 text-dark hover:bg-sand/30 transition-colors"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-olive text-cream hover:bg-olive-dark py-4 px-6 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Royal Bag</span>
                  </button>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-dark text-cream hover:bg-burgundy py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-beige" />
                  <span>Instant Checkout</span>
                </button>
              </div>

              {/* Fragrance Notes Pyramid */}
              <div className="pt-6 border-t border-sand">
                <h4 className="text-xs uppercase tracking-[0.2em] text-dark font-medium mb-4">
                  The Olfactory Architecture
                </h4>
                <FragranceNotes
                  topNotes={product.topNotes}
                  heartNotes={product.heartNotes}
                  baseNotes={product.baseNotes}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="bg-white border border-beige/40 p-6 sm:p-10 mb-16 shadow-soft">
          <div className="flex flex-wrap gap-4 sm:gap-8 border-b border-sand pb-4 mb-8">
            {[
              { id: 'scent', label: 'Scent Profile & Heritage' },
              { id: 'craft', label: 'Artisanal Ingredients' },
              { id: 'application', label: 'How to Wear & Store' },
              { id: 'shipping', label: 'Delivery & Presentation' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs uppercase tracking-[0.2em] py-2 border-b-2 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'border-olive text-olive font-semibold'
                    : 'border-transparent text-muted hover:text-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs sm:text-sm text-muted leading-relaxed font-light">
            {activeTab === 'scent' && (
              <div className="space-y-4 max-w-3xl">
                <p>
                  Formulated in Grasse under the stewardship of master perfumers,{' '}
                  <strong className="text-dark font-medium">{product.name}</strong> exemplifies the
                  highest caliber of French classical distillation. Every flacon contains high concentrations
                  of pure extracts macerated for six months in temperature-controlled oak vaults.
                </p>
                <p>
                  The top accord opens with luminous clarity before yielding to the intricate heart notes,
                  finally anchored by resinous base notes that linger effortlessly on skin and textiles for up
                  to 16 hours.
                </p>
              </div>
            )}

            {activeTab === 'craft' && (
              <div className="space-y-4 max-w-3xl">
                <p>
                  We source rare raw botanicals from certified sustainable family estates across Grasse,
                  Cambodia, Calabria, and Madagascar. Our alcohol carrier is 100% organic French sugar-beet
                  spirit, triple-filtered for absolute neutrality.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-dark/80 font-normal">
                  <li>35% Pure perfume oil concentration (Extrait strength)</li>
                  <li>Free from synthetic phthalates, nitro-musks, or petroleum distillates</li>
                  <li>Individually inspected and sealed with heated beeswax</li>
                </ul>
              </div>
            )}

            {activeTab === 'application' && (
              <div className="space-y-4 max-w-3xl">
                <p>
                  Apply 1-2 spritzes directly to warm pulse points: the base of the throat, inner wrists,
                  and behind the ears. For elevated projection, mist gently onto the lapels of natural wool
                  or cashmere outerwear.
                </p>
                <p>
                  Store your flacon away from direct sunlight and temperature fluctuations in its protective
                  velvet-lined presentation coffret.
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 max-w-3xl">
                <p>
                  Dispatched in our signature bronze-embossed velvet coffret with wax-sealed authenticity
                  documentation. Every order includes a complimentary 5ml discovery atomizer of the exact
                  same fragrance to sample before breaking the official seal.
                </p>
                <p>
                  Complimentary temperature-controlled insured express courier delivery on all orders over $150.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white border border-beige/40 p-6 sm:p-10 mb-16 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand gap-4 mb-8">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-dark font-normal">
                Client Critiques & Reviews
              </h3>
              <p className="text-xs text-muted tracking-wider uppercase mt-1">
                Verified Feedback From Private Collectors
              </p>
            </div>
            <Rating rating={product.rating} reviewCount={product.reviewCount} size="lg" />
          </div>

          {/* Reviews List */}
          <div className="space-y-6 mb-12">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="p-5 bg-sand/15 border border-beige/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base text-dark font-medium">{rev.author}</span>
                  <span className="text-[11px] text-muted">{rev.date}</span>
                </div>
                <Rating rating={rev.rating} size="sm" showScore={false} />
                <h5 className="font-medium text-xs uppercase tracking-wider text-dark mt-1">
                  {rev.title}
                </h5>
                <p className="text-xs text-muted leading-relaxed font-light">{rev.content}</p>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <div className="pt-8 border-t border-sand">
            <h4 className="font-serif text-xl text-dark font-normal mb-4">
              Submit Your Connoisseur Critique
            </h4>
            {isReviewSubmitted ? (
              <div className="p-4 bg-olive/10 border border-olive/30 text-xs text-olive flex items-center gap-2 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you. Your review has been recorded.</span>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                      Your Name or Title
                    </label>
                    <input
                      type="text"
                      value={newReview.author}
                      onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                      placeholder="e.g. Lord Harrington"
                      required
                      className="w-full px-3 py-2 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                      Rating
                    </label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark cursor-pointer"
                    >
                      <option value="5">★★★★★ (5/5) Masterpiece</option>
                      <option value="4">★★★★☆ (4/5) Exceptional</option>
                      <option value="3">★★★☆☆ (3/5) Dignified</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    placeholder="e.g. Magnificent longevity and sillage"
                    required
                    className="w-full px-3 py-2 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-dark font-medium block mb-1">
                    Critique & Scent Impressions
                  </label>
                  <textarea
                    rows="3"
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    placeholder="Describe how the fragrance develops on your skin..."
                    required
                    className="w-full px-3 py-2 text-xs bg-white border border-beige/60 outline-none focus:border-olive text-dark"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-olive text-cream hover:bg-olive-dark text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                >
                  Post Critique
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-sand">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-olive font-medium block mb-1">
                  Complementary Aromas
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-dark font-normal">
                  Related Olfactory Masterpieces
                </h3>
              </div>
              <Link
                to="/shop"
                className="text-xs uppercase tracking-[0.18em] text-olive hover:text-burgundy font-medium"
              >
                Browse All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
