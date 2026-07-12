import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiChevronDown } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ROUTES } from '../../utils/constants';

const ShopProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const renderBadge = () => {
    if (!product.badge) return null;
    let bgClass = 'bg-orange-500';
    if (product.badge.type === 'new') bgClass = 'bg-[#379c6b]';
    if (product.badge.type === 'hot') bgClass = 'bg-gradient-to-r from-red-500 to-orange-500';

    return (
      <div className={`absolute top-3 left-3 z-10 ${bgClass} text-white text-[10px] font-bold px-2 py-1 rounded-sm flex items-center gap-1 shadow-sm`}>
        {product.badge.type === 'hot' && <span className="text-xs">🔥</span>}
        {product.badge.text}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-full group hover:shadow-xl hover:border-[#379c6b]/30 transition-all duration-300">

      {/* Top Image Area */}
      <div className="relative bg-[#f9f9f9] pt-[95%] overflow-hidden">
        {renderBadge()}

        <Link to={ROUTES.PRODUCT_DETAILS.replace(':slug', product.slug)}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 p-4"
          />
        </Link>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow bg-white">

        <span className="text-[#379c6b] text-[10px] font-bold uppercase tracking-wider mb-1.5 block">
          {product.brand}
        </span>

        <Link to={ROUTES.PRODUCT_DETAILS.replace(':slug', product.slug)}>
          <h3 className="font-bold text-dark text-[15px] leading-tight mb-2 hover:text-[#379c6b] transition-colors line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>
        </Link>


        {/* Weight Selector */}
        <div className="relative mb-4">
          <select className="appearance-none w-full border border-slate-200 text-slate-600 text-sm font-medium py-2 px-3 rounded-lg outline-none focus:border-[#379c6b] transition-colors bg-white cursor-pointer">
            <option value={product.weight}>{product.weight}</option>
            <option value="1kg">1kg</option>
            <option value="5kg">5kg</option>
          </select>
          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Price Row */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[20px] font-black text-dark leading-none">£{product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-[13px] text-slate-400 line-through font-medium leading-none">£{product.oldPrice.toFixed(2)}</span>
          )}
          {product.discountAmount && (
            <span className="text-[#379c6b] text-[11px] font-bold ml-auto bg-[#e8f5ed] px-1.5 py-0.5 rounded-sm">
              {product.discountAmount}
            </span>
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="mt-auto flex items-center gap-2">
          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="flex-grow bg-[#279c66] hover:bg-[#1f7e52] text-white text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
          >
            <FiShoppingCart size={16} /> Add to Cart
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${inWishlist ? 'border-orange-500 bg-orange-50 text-orange-500' : 'border-slate-200 bg-white text-slate-400 hover:border-orange-500 hover:text-orange-500'}`}
          >
            {inWishlist ? <FaHeart size={16} /> : <FiHeart size={16} />}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ShopProductCard;
