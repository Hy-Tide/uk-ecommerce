import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ROUTES } from '../../utils/constants';

const SimpleProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const renderBadge = () => {
    if (!product.badge) return null;
    let bgClass = 'bg-orange-500';
    if (product.badge.type === 'new') bgClass = 'bg-[#379c6b]';
    if (product.badge.type === 'hot') bgClass = 'bg-gradient-to-r from-red-500 to-orange-500';

    return (
      <div className={`absolute top-2 left-2 z-10 ${bgClass} text-white text-[9px] font-bold px-2 py-0.5 rounded-sm`}>
        {product.badge.text}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full group hover:shadow-md hover:border-[#379c6b]/30 transition-all duration-300 p-3">

      {/* Top Image Area */}
      <div className="relative bg-[#f9f9f9] rounded-lg pt-[100%] overflow-hidden mb-3">
        {renderBadge()}

        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 z-10 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-orange-500 transition-colors text-slate-400"
        >
          <FiHeart className={inWishlist ? "text-orange-500 fill-orange-500" : ""} size={12} />
        </button>

        <Link to={ROUTES.PRODUCT_DETAILS.replace(':slug', product.slug || 'product')}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-2"
          />
        </Link>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow">
        <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-1 block">
          {product.brand}
        </span>

        <Link to={ROUTES.PRODUCT_DETAILS.replace(':slug', product.slug || 'product')}>
          <h3 className="font-bold text-dark text-[13px] leading-tight mb-2 hover:text-[#379c6b] transition-colors line-clamp-2 min-h-[36px]">
            {product.name}
          </h3>
        </Link>

        {/* Simple text weight instead of select for related items to save space */}
        <div className="text-xs text-slate-500 mb-2 font-medium">{product.weight}</div>

        <div className="flex items-center gap-1.5 mb-3 mt-auto">
          <span className="text-[16px] font-black text-dark">£{product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-[11px] text-slate-400 line-through font-medium">£{product.oldPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => addToCart(product)}
            className="flex-grow bg-[#279c66] hover:bg-[#1f7e52] text-white text-xs font-bold py-2 rounded-lg transition-colors active:scale-95"
          >
            Add
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 bg-white text-slate-400 hover:text-orange-500 hover:border-orange-500 transition-all flex-shrink-0">
            <FiHeart size={14} className={inWishlist ? "text-orange-500 fill-orange-500" : ""} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SimpleProductCard;
