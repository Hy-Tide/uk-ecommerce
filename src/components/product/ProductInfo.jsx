import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShare2, FiShield, FiTruck, FiMinus, FiPlus, FiCheckCircle, FiPackage, FiMapPin, FiCheck } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import { FaStar, FaLeaf } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVarIdx, setSelectedVarIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart, cartItems, updateQuantity } = useCart();

  const currentVariation = product.variations && product.variations.length > selectedVarIdx 
    ? product.variations[selectedVarIdx] 
    : null;

  const productId = product._id || product.id || product.productId;
  const variationId = currentVariation ? (currentVariation._id || currentVariation.id || currentVariation.variationId) : null;
  
  const cartItem = cartItems?.find(item => {
    const itemProductId = item.productId || (item.product && (item.product._id || item.product.id)) || item.id;
    const itemVariationId = item.variationId || (item.variation && (item.variation._id || item.variation.id)) || null;
    
    const sameProduct = String(itemProductId) === String(productId);
    const sameVariation = (!itemVariationId && !variationId) || String(itemVariationId) === String(variationId);
    
    return sameProduct && sameVariation;
  });

  const displayPrice = currentVariation?.salePrice || product.discount_price || product.price || 0;
  const displayOldPrice = currentVariation?.regularPrice || product.base_price || product.oldPrice || null;
  const showOldPrice = displayOldPrice && displayOldPrice > displayPrice;
  const displaySavings = showOldPrice ? `You Save £${(displayOldPrice - displayPrice).toFixed(2)}` : null;

  const inWishlist = isInWishlist(product._id || product.id);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < (product.stockCount || 99)) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, currentVariation, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col">
      {/* Badges, Brand, and Top Actions */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-[#1c6b3b] text-xs font-bold uppercase tracking-wider">
            {typeof product.brand === 'object' ? product.brand?.name : product.brand}
          </span>
          {product.discountBadge && (
            <span className="bg-[#eb5b27] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {product.discountBadge}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => toggleWishlist(product)}
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all ${inWishlist ? 'bg-[#feeee8] border-[#eb5b27] text-[#eb5b27]' : 'bg-[#fafcfb] border-slate-200 text-slate-500 hover:text-[#124827] hover:border-slate-300'}`}
            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <FiHeart size={18} className={inWishlist ? "fill-current" : ""} />
          </button>
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#fafcfb] border border-slate-200 text-slate-500 hover:text-[#124827] hover:border-slate-300 transition-all"
            title="Share Product"
          >
            <FiShare2 size={18} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#124827] leading-tight mb-4">{product.name}</h1>

      {/* Price Area */}
      <div className="flex items-end gap-4 mb-6">
        <span className="text-4xl font-black text-[#124827] leading-none">£{displayPrice.toFixed(2)}</span>
        {showOldPrice && (
          <div className="flex flex-col mb-1">
            <span className="text-sm text-slate-400 line-through font-medium">£{displayOldPrice.toFixed(2)}</span>
            <span className="text-[#eb5b27] text-xs font-bold">{displaySavings}</span>
          </div>
        )}
      </div>

      {/* Description Preview */}
      <div className="text-slate-600 text-sm leading-relaxed mb-6 font-normal" dangerouslySetInnerHTML={{ __html: product.description }} />

      {/* Weight Options */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Select Weight / Pack:</label>
        <div className="flex flex-wrap gap-3">
          {product.variations && product.variations.length > 0 ? (
            product.variations.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelectedVarIdx(i)}
                className={`font-bold text-xs px-5 py-2.5 rounded-xl transition-all border-2 ${selectedVarIdx === i ? 'border-[#124827] text-[#124827] bg-[#e8f5ed]' : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'}`}
              >
                {v.displayWeight || `${v.weight}${v.weightUnit}`}
              </button>
            ))
          ) : (
            <button
              className="font-bold text-xs px-5 py-2.5 rounded-xl transition-all border-2 border-[#124827] text-[#124827] bg-[#e8f5ed]"
            >
              {product.weight || 'Standard Pack'}
            </button>
          )}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex flex-col gap-4 mb-8 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center bg-[#fafcfb] border border-slate-200 rounded-xl h-[48px]">
            <button onClick={cartItem ? (e) => { e.preventDefault(); updateQuantity(cartItem._id || cartItem.id, cartItem.quantity - 1) } : decreaseQuantity} className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-[#124827] transition-colors">
              <FiMinus size={16} />
            </button>
            <span className="w-10 text-center font-extrabold text-[#124827] text-sm">{cartItem ? cartItem.quantity : quantity}</span>
            <button onClick={cartItem ? (e) => { e.preventDefault(); updateQuantity(cartItem._id || cartItem.id, cartItem.quantity + 1) } : increaseQuantity} className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-[#124827] transition-colors">
              <FiPlus size={16} />
            </button>
          </div>
          <span className="text-xs font-semibold text-slate-500">Only {product.stockCount || 12} left in stock!</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {!cartItem ? (
            <button 
              onClick={handleAddToCart} 
              className={`flex-1 font-bold py-4 px-6 rounded-2xl transition-all shadow-lg active:scale-[0.98] text-sm flex items-center justify-center gap-2 ${
                added ? 'bg-[#124827] text-white shadow-emerald-900/20' : 'bg-[#124827] hover:bg-[#1c6b3b] text-white shadow-[#124827]/20'
              }`}
            >
              {added ? (
                <>
                  <FiCheck size={18} className="text-emerald-300" /> Added to Cart!
                </>
              ) : (
                <>
                  <FiPackage size={18} /> Add to Basket
                </>
              )}
            </button>
          ) : (
             <Link 
               to="/cart" 
               className="flex-1 font-bold py-4 px-6 rounded-2xl transition-all shadow-lg active:scale-[0.98] text-sm flex items-center justify-center gap-2 bg-[#124827] hover:bg-[#1c6b3b] text-white shadow-[#124827]/20"
             >
               View Cart
             </Link>
          )}
          <button className="flex-1 bg-[#feeee8] hover:bg-[#fcdbc9] text-[#eb5b27] font-bold py-4 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-2">
            Buy Now
          </button>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#fafcfb] border border-slate-100 p-4 rounded-2xl flex items-start gap-3">
          <div className="text-[#124827] mt-0.5"><FiShield size={20} /></div>
          <div>
            <h4 className="text-[#124827] font-bold text-xs uppercase tracking-wider mb-0.5">Secure Payments</h4>
            <p className="text-slate-500 text-xs">Stripe, VISA, Mastercard & PayPal</p>
          </div>
        </div>
        <div className="bg-[#fafcfb] border border-slate-100 p-4 rounded-2xl flex items-start gap-3">
          <div className="text-[#eb5b27] mt-0.5"><FiTruck size={20} /></div>
          <div>
            <h4 className="text-[#124827] font-bold text-xs uppercase tracking-wider mb-0.5">Same-Day UK Delivery</h4>
            <p className="text-slate-500 text-xs">Orders dispatched within 24 hours</p>
          </div>
        </div>
      </div>

      {/* Highlights */}
      {product.highlights && (
        <div>
          <h4 className="text-[#124827] font-bold text-sm mb-3">Product Highlights</h4>
          {Array.isArray(product.highlights) ? (
            <div className="grid grid-cols-2 gap-3">
              {product.highlights.map((highlight, idx) => {
                const lower = highlight.toLowerCase();
                let Icon = FiCheckCircle;
                if (lower.includes('wheat') || lower.includes('fibre')) Icon = GiWheat;
                else if (lower.includes('ground') || lower.includes('organic') || lower.includes('natural')) Icon = FaLeaf;
                else if (lower.includes('stock') || lower.includes('pack')) Icon = FiPackage;
                else if (lower.includes('india') || lower.includes('origin') || lower.includes('made')) Icon = FiMapPin;

                return (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#124827] bg-[#e8f5ed] px-3.5 py-2.5 rounded-xl font-bold border border-[#124827]/10">
                    <Icon size={16} className="shrink-0 text-[#124827]" /> 
                    <span>{highlight}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.highlights }} />
          )}
        </div>
      )}

    </div>
  );
};

export default ProductInfo;
