import React, { useState } from 'react';
import { FiHeart, FiShare2, FiShield, FiTruck, FiMinus, FiPlus, FiCheckCircle, FiPackage, FiMapPin } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';
import { FaStar, FaLeaf } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVarIdx, setSelectedVarIdx] = useState(0);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const currentVariation = product.variations && product.variations.length > selectedVarIdx 
    ? product.variations[selectedVarIdx] 
    : null;

  const displayPrice = currentVariation?.salePrice || product.discount_price || product.price || 0;
  const displayOldPrice = currentVariation?.regularPrice || product.base_price || product.oldPrice || null;
  const showOldPrice = displayOldPrice && displayOldPrice > displayPrice;
  const displaySavings = showOldPrice ? `You Save £${(displayOldPrice - displayPrice).toFixed(2)}` : null;

  const inWishlist = isInWishlist(product._id || product.id);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stockCount) setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col">
      {/* Badges, Brand, and Top Actions */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-[#379c6b] text-xs font-bold uppercase tracking-wider">{typeof product.brand === 'object' ? product.brand?.name : product.brand}</span>
          {product.discountBadge && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
              {product.discountBadge}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => toggleWishlist(product)}
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all ${inWishlist ? 'bg-red-50 border-red-100 text-red-500' : 'bg-[#fcfbf9] border-slate-200 text-slate-500 hover:text-dark hover:border-slate-300'}`}
            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <FiHeart size={18} className={inWishlist ? "fill-current" : ""} />
          </button>
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#fcfbf9] border border-slate-200 text-slate-500 hover:text-dark hover:border-slate-300 transition-all"
            title="Share Product"
          >
            <FiShare2 size={18} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-black text-dark leading-tight mb-4">{product.name}</h1>

      {/* Price Area */}
      <div className="flex items-end gap-4 mb-6">
        <span className="text-4xl font-black text-dark leading-none">£{displayPrice.toFixed(2)}</span>
        {showOldPrice && (
          <div className="flex flex-col mb-1">
            <span className="text-sm text-slate-400 line-through font-medium">£{displayOldPrice.toFixed(2)}</span>
            <span className="text-[#379c6b] text-xs font-bold">{displaySavings}</span>
          </div>
        )}
      </div>

      {/* Description Preview */}
      <div className="text-slate-500 text-sm leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: product.description }} />

      {/* Weight Options */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {product.variations && product.variations.length > 0 ? (
            product.variations.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelectedVarIdx(i)}
                className={`font-bold text-sm px-6 py-2.5 rounded-full transition-all border-2 ${selectedVarIdx === i ? 'border-[#379c6b] text-[#379c6b] bg-[#e8f5ed]' : 'border-slate-200 text-slate-500 hover:border-slate-300 bg-white'}`}
              >
                {v.displayWeight || `${v.weight}${v.weightUnit}`}
              </button>
            ))
          ) : (
            <button
              className="font-bold text-sm px-6 py-2.5 rounded-full transition-all border-2 border-[#379c6b] text-[#379c6b] bg-[#e8f5ed]"
            >
              {product.weight}
            </button>
          )}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex flex-col gap-4 mb-8 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center bg-[#fcfbf9] border border-slate-200 rounded-xl h-[52px]">
            <button onClick={decreaseQuantity} className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-dark transition-colors">
              <FiMinus size={16} />
            </button>
            <span className="w-10 text-center font-bold text-dark">{quantity}</span>
            <button onClick={increaseQuantity} className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-dark transition-colors">
              <FiPlus size={16} />
            </button>
          </div>
          <span className="text-xs font-medium text-slate-500">Only {product.stockCount} left in stock!</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 bg-[#279c66] hover:bg-[#1f7e52] text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-green-900/20 active:scale-[0.98]">
            Add to Cart
          </button>
          <button className="flex-1 bg-[#1a2522] hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-colors active:scale-[0.98]">
            Buy Now
          </button>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#fcfbf9] border border-slate-100 p-4 rounded-xl flex items-start gap-3">
          <div className="text-[#379c6b] mt-0.5"><FiShield size={20} /></div>
          <div>
            <h4 className="text-dark font-bold text-sm mb-0.5">Secure Payments</h4>
            <p className="text-slate-400 text-xs">Powered by Stripe & PayPal</p>
          </div>
        </div>
        <div className="bg-[#fcfbf9] border border-slate-100 p-4 rounded-xl flex items-start gap-3">
          <div className="text-[#379c6b] mt-0.5"><FiTruck size={20} /></div>
          <div>
            <h4 className="text-dark font-bold text-sm mb-0.5">Delivery Options</h4>
            <p className="text-slate-400 text-xs">Check delivery options below</p>
          </div>
        </div>
      </div>

      {/* Highlights */}
      {product.highlights && (
        <div>
          <h4 className="text-dark font-bold text-sm mb-4">Product highlights</h4>
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
                  <div key={idx} className="flex items-center gap-3 text-sm text-[#1b4d3e] bg-[#f4fbf6] px-4 py-3 rounded-xl font-bold">
                    <Icon size={18} className="shrink-0" /> 
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
