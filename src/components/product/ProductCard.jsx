import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ROUTES } from '../../utils/constants';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(product.id);

  // Render Badge based on type
  const renderBadge = () => {
    if (!product.badge) return null;
    let bgClass = 'bg-orange-500'; // default discount
    if (product.badge.type === 'new') bgClass = 'bg-[#379c6b]'; // Green
    if (product.badge.type === 'hot') bgClass = 'bg-gradient-to-r from-red-500 to-orange-500'; 
    
    return (
      <div className={`absolute top-3 left-3 z-10 ${bgClass} text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-sm`}>
        {product.badge.type === 'hot' && <span className="text-xs">🔥</span>}
        {product.badge.text}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 overflow-hidden flex flex-col h-full group hover:shadow-xl transition-shadow duration-300">
      
      {/* Top Image Area */}
      <div className="relative bg-[#f5f5f5] pt-[100%] overflow-hidden">
        
        {renderBadge()}

        <button 
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 z-10 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-primary transition-colors text-slate-400"
        >
          {inWishlist ? <FaHeart className="text-orange-500" size={12} /> : <FiHeart size={12} />}
        </button>

        <Link to={ROUTES.PRODUCT_DETAILS.replace(':slug', product.slug)}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Quick View Bar */}
        <button className="absolute bottom-0 left-0 w-full bg-[#1a5d2b]/95 backdrop-blur text-white text-[10px] font-bold py-2 flex items-center justify-center gap-1.5 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <FiEye size={12} /> Quick View
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow bg-white">
        
        <span className="text-[#379c6b] text-[10px] font-bold uppercase tracking-wide mb-1 block">
          {product.brand}
        </span>
        
        <Link to={ROUTES.PRODUCT_DETAILS.replace(':slug', product.slug)}>
          <h3 className="font-bold text-dark text-sm leading-tight mb-1 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <span className="text-xs text-slate-400 mb-2 block">{product.weight}</span>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar 
              key={star} 
              size={10} 
              className={star <= product.rating ? "text-yellow-400" : "text-slate-200"} 
            />
          ))}
          <span className="text-[10px] text-slate-400 ml-1">({product.reviews})</span>
        </div>

        {/* Price Row */}
        <div className="mt-auto flex items-center gap-2 mb-4">
          <span className="text-lg font-black text-dark">£{product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-xs text-slate-400 line-through font-medium">£{product.oldPrice.toFixed(2)}</span>
          )}
          {product.discountAmount && (
            <span className="bg-[#e8f5ed] text-[#379c6b] text-[10px] font-bold px-1.5 py-0.5 rounded-sm ml-auto">
              {product.discountAmount}
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-[#279c66] hover:bg-[#1f7e52] text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
        >
          <FiShoppingCart size={14} /> Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductCard;
