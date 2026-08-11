import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiPlus, FiChevronDown, FiCheck } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
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

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const currentVariation = product.variations && product.variations.length > selectedVarIdx 
    ? product.variations[selectedVarIdx] 
    : null;

  const imageUrl = resolveProductImageUrl(product);

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

        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-[#FF6B00] transition-colors"
        >
          {inWishlist ? <FaHeart className="text-[#FF6B00]" size={13} /> : <FiHeart size={13} />}
        </button>

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
          <h3 className="font-bold text-[#0C3823] text-xs md:text-sm leading-snug mb-2 hover:text-[#FF6B00] transition-colors line-clamp-2 min-h-[36px]">
            {product.title || product.name}
          </h3>
        </Link>

        {/* Weight Selector */}
        <div className="relative mb-3">
          <select 
            className="appearance-none w-full border border-slate-200 text-slate-700 text-xs font-semibold py-1.5 px-3 pr-8 rounded-xl outline-none bg-white cursor-pointer"
            value={selectedVarIdx}
            onChange={(e) => setSelectedVarIdx(Number(e.target.value))}
          >
            {product.variations && product.variations.length > 0 ? (
              product.variations.map((v, i) => (
                <option key={i} value={i}>{v.displayWeight || `${v.weight}${v.weightUnit}`}</option>
              ))
            ) : (
              <option value={0}>{product.weight || 'Standard Pack'}</option>
            )}
          </select>
          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Price & Cart Row */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-[#0C3823]">
              £{(currentVariation?.salePrice || product.discount_price || product.base_price || product.price || 0).toFixed(2)}
            </span>
            {((currentVariation?.regularPrice > currentVariation?.salePrice) || (product.base_price && product.discount_price && product.base_price > product.discount_price) || product.oldPrice) && (
              <span className="text-xs text-slate-400 line-through font-medium">
                £{(currentVariation?.regularPrice || product.base_price || product.oldPrice).toFixed(2)}
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
  );
};

export default ShopProductCard;
