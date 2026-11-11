import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Rating } from '../common/Rating';
import { FragranceNotes } from './FragranceNotes';
import { formatPrice } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useQuickView } from '../../context/QuickViewContext';

export const QuickView = () => {
  const { activeProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState('50ml');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!activeProduct) return null;

  const isFavorited = isInWishlist(activeProduct.id);

  // Calculate size adjusted price
  const sizeObj = activeProduct.sizes.find((s) => s.size === selectedSize);
  const multiplier = sizeObj ? sizeObj.priceMultiplier : 1.0;
  const currentPrice = Math.round(activeProduct.price * multiplier);
  const originalPrice = Math.round(activeProduct.originalPrice * multiplier);

  const handleAddToCart = () => {
    addToCart(activeProduct, selectedSize, quantity);
    closeQuickView();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-dark/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white w-full max-w-4xl shadow-2xl border border-beige/60 z-50 my-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 text-dark/70 hover:text-dark bg-white/80 rounded-full hover:bg-cream transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
            {/* Left: Images */}
            <div className="p-6 bg-sand/15 flex flex-col justify-between">
              <div className="aspect-square bg-white border border-beige/30 overflow-hidden mb-4 relative">
                <img
                  src={activeProduct.images[selectedImageIndex] || activeProduct.images[0]}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover object-center"
                />
                <button
                  onClick={() => toggleWishlist(activeProduct)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                    isFavorited ? 'bg-burgundy text-white' : 'bg-white text-dark hover:text-burgundy'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 justify-center">
                {activeProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-14 border transition-all ${
                      selectedImageIndex === idx ? 'border-olive shadow-sm' : 'border-beige/40 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted font-medium">
                    {activeProduct.brand}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-olive font-semibold">
                    {activeProduct.category}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-dark font-normal mb-2">
                  {activeProduct.name}
                </h2>

                <div className="mb-4">
                  <Rating rating={activeProduct.rating} reviewCount={activeProduct.reviewCount} size="sm" />
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-2xl font-serif text-dark font-medium">
                    {formatPrice(currentPrice)}
                  </span>
                  {originalPrice > currentPrice && (
                    <span className="text-sm text-muted line-through font-light">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                  {activeProduct.discount > 0 && (
                    <span className="text-[10px] uppercase tracking-wider bg-beige/40 text-dark px-2 py-0.5">
                      Save {activeProduct.discount}%
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted leading-relaxed mb-6 font-light">
                  {activeProduct.description}
                </p>

                {/* Fragrance Notes Snippet */}
                <div className="mb-6 pt-4 border-t border-sand">
                  <FragranceNotes
                    topNotes={activeProduct.topNotes}
                    heartNotes={activeProduct.heartNotes}
                    baseNotes={activeProduct.baseNotes}
                    compact
                  />
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <label className="text-xs uppercase tracking-wider text-dark font-medium block mb-2">
                    Select Bottle Size
                  </label>
                  <div className="flex gap-2.5">
                    {activeProduct.sizes.map((s) => (
                      <button
                        key={s.size}
                        onClick={() => setSelectedSize(s.size)}
                        className={`flex-1 py-2 text-xs uppercase tracking-wider border transition-all ${
                          selectedSize === s.size
                            ? 'border-olive bg-olive text-cream font-medium'
                            : 'border-beige/60 text-dark hover:border-olive'
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center border border-beige/60">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-dark hover:bg-sand/30 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-medium text-dark min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-dark hover:bg-sand/30 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-olive text-cream hover:bg-olive-dark py-3 px-4 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Royal Bag</span>
                  </button>
                </div>
              </div>

              {/* View Full Product Details Link */}
              <div className="pt-4 border-t border-sand/60 text-center">
                <Link
                  to={`/product/${activeProduct.id}`}
                  onClick={closeQuickView}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-olive hover:text-burgundy font-medium transition-colors"
                >
                  <span>View Full Product Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
