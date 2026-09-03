import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiPlus, FiChevronDown, FiCheck } from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { getProductUrl, resolveProductImageUrl } from '../../utils/constants';

const ShopProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const inWishlist = isInWishlist(product.id || product._id);
  const [selectedVarIdx, setSelectedVarIdx] = useState(0);

  const handleAddToCart = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addToCart(product, currentVariation);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const currentVariation = product.variations && product.variations.length > selectedVarIdx 
    ? product.variations[selectedVarIdx] 
    : null;

  const imageUrl = resolveProductImageUrl(product);

  const displayPrice = currentVariation?.salePrice || currentVariation?.discount_price || currentVariation?.price || currentVariation?.regularPrice || product.discount_price || product.base_price || product.price || 0;
  const displayOldPrice = currentVariation?.regularPrice || currentVariation?.oldPrice || currentVariation?.base_price || (currentVariation?.discount_price ? currentVariation?.price : null) || product.oldPrice || product.base_price || null;
  const showOldPrice = displayOldPrice && displayOldPrice > displayPrice;

  return (
    <div className="bg-[#F3F4F6] rounded-2xl p-4 flex flex-col justify-between h-full group hover:shadow-xl transition-all duration-300 relative border border-slate-200/50">

      {/* Top Image Area */}
      <div className="relative bg-white rounded-xl p-3 mb-3 flex items-center justify-center h-48 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          {product.badge?.type === 'hot' || product.discountAmount || product.discount_price ? (
            <span className="bg-[#8B0000] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              Best Sale
            </span>
          ) : null}
          {(product.discountAmount || product.badge?.type === 'discount') && (
            <span className="bg-[#FF6B00] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              {product.badge?.text || product.discountAmount}
            </span>
          )}
        </div>

        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-600 font-bold text-[10px] px-2 py-1 rounded-lg border border-amber-200/60 shadow-sm leading-none">
            <FaStar size={10} />
            <span className="pt-[1px]">{product.rating || '4.8'}</span>
          </div>
          <button
            onClick={() => toggleWishlist(product)}
            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-[#FF6B00] transition-colors shadow-xs"
          >
            {inWishlist ? <FaHeart className="text-[#FF6B00]" size={13} /> : <FiHeart size={13} />}
          </button>
        </div>

        <Link to={getProductUrl(product)} className="w-full h-full flex items-center justify-center p-1">
          {imageUrl && !imgError ? (
            <img
              src={imageUrl}
              alt={product.title || product.name}
              className="w-full h-full max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50/80 rounded-xl p-3 select-none text-center">
              <img
                src="/images/logo.png"
                alt="Grandma's Basket Logo"
                className="w-14 h-14 object-contain opacity-25 grayscale hover:grayscale-0 hover:opacity-40 transition-all duration-300"
              />
              <span className="text-[10px] text-slate-400 font-bold mt-1.5 line-clamp-1 opacity-70">
                Grandma's Basket
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow">

        <span className="text-[#008851] text-[10px] font-bold uppercase tracking-wider mb-1 block">
          {typeof product.brand === 'object' ? product.brand?.name : (product.brand || product.brand_id || 'Grandma\'s Basket')}
        </span>

        <Link to={getProductUrl(product)}>
          <h3 className="font-bold text-[#0C3823] text-xs md:text-sm leading-snug mb-2 hover:text-[#FF6B00] transition-colors line-clamp-2 min-h-[36px] md:min-h-[40px]">
            {product.title || product.name}
          </h3>
        </Link>

        <div className="mt-auto flex flex-col">
          {/* Weight Selector */}
        <div className="flex flex-wrap gap-1.5 mb-3" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          {product.variations && product.variations.length > 0 ? (
            product.variations.map((v, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedVarIdx(i); }}
                className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1.5 rounded-lg border transition-all ${
                  selectedVarIdx === i 
                    ? 'border-[#0C3823] text-[#0C3823] bg-[#0C3823]/5' 
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 bg-white'
                }`}
              >
                <span>{v.displayWeight || `${v.weight}${v.weightUnit || 'kg'}`}</span>
                {v.stock !== undefined && <span className="opacity-70 font-medium text-[9px]">({v.stock})</span>}
              </button>
            ))
          ) : (
            <button
              className="flex items-center gap-1 text-[10px] font-bold px-2 py-1.5 rounded-lg border border-[#0C3823] text-[#0C3823] bg-[#0C3823]/5 transition-all"
            >
              <span>{product.weight || 'Standard Pack'}</span>
              {(product.currentStock !== undefined || product.availableQuantity !== undefined) && (
                <span className="opacity-70 font-medium text-[9px]">({product.currentStock ?? product.availableQuantity})</span>
              )}
            </button>
          )}
        </div>

          {/* Price & Cart Row */}
          <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-[#0C3823]">
              €{displayPrice.toFixed(2)}
            </span>
            {showOldPrice && (
              <span className="text-xs text-slate-400 line-through font-medium">
                €{displayOldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 ${
              added 
                ? 'bg-[#008851] text-white' 
                : 'bg-[#0C3823] hover:bg-[#008851] text-white'
            }`}
            title="Add to Cart"
          >
            {added ? <FiCheck size={16} /> : <FiPlus size={18} />}
          </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopProductCard;
