import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiCheck } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { getProductUrl, resolveProductImageUrl } from '../../utils/constants';

const ProductCard = ({ product, showStockProgress = false }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Sample stock info if not present
  const availableStock = product.stockLeft || '37kg';
  const imageUrl = resolveProductImageUrl(product);

  return (
    <div className="bg-[#F3F4F6] rounded-2xl p-4 flex flex-col justify-between h-full group hover:shadow-xl transition-all duration-300 relative border border-slate-200/50">

      {/* Top Image & Badges Container */}
      <div className="relative bg-white rounded-xl p-3 mb-3 flex items-center justify-center h-48 overflow-hidden">

        {/* Badges Left */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          {product.badge?.type === 'hot' || product.discountAmount ? (
            <span className="bg-[#8B0000] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              Best Sale
            </span>
          ) : null}
          {product.discountAmount && (
            <span className="bg-[#FF6B00] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              {product.discountAmount}
            </span>
          )}
        </div>

        {/* Badges Right */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1">
          {product.badge?.type === 'new' && (
            <span className="bg-[#00D68F] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              ORGANIC
            </span>
          )}
          {product.category === 'frozen' || product.badge?.text === 'Frozen' ? (
            <span className="bg-[#FFC107] text-[#0C3823] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              FROZEN
            </span>
          ) : null}
        </div>

        {/* Product Image */}
        <Link to={getProductUrl(product)} className="w-full h-full flex items-center justify-center p-1">
          {imageUrl && !imgError ? (
            <img
              src={imageUrl}
              alt={product.name || product.title}
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

      {/* Details Container */}
      <div className="flex flex-col flex-grow">
        {/* Title */}
        <Link to={getProductUrl(product)}>
          <h3 className="font-bold text-[#0C3823] text-xs md:text-sm leading-snug mb-1 line-clamp-2 hover:text-[#FF6B00] transition-colors">
            {product.name || product.title}
          </h3>
        </Link>

        {/* Weight & Rating */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-3">
          <span>{product.variations?.[0]?.displayWeight || `${product.variations?.[0]?.weight}${product.variations?.[0]?.weightUnit}` || product.weight || '1000gm'}</span>
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <FaStar size={11} />
            <span>(4.8/5)</span>
          </div>
        </div>

        {/* Price & Add Button Row */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg md:text-xl font-extrabold text-[#0C3823]">
              £{(product.variations?.[0]?.salePrice || product.discount_price || product.base_price || product.price || 0).toFixed(2)}
            </span>
            {(product.variations?.[0]?.regularPrice > product.variations?.[0]?.salePrice || product.oldPrice) && (
              <span className="text-xs text-slate-400 line-through font-medium">
                £{(product.variations?.[0]?.regularPrice || product.oldPrice || 0).toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 ${added
                ? 'bg-[#008851] text-white'
                : 'bg-[#0C3823] hover:bg-[#008851] text-white'
              }`}
            title="Add to Cart"
          >
            {added ? <FiCheck size={16} /> : <FiPlus size={18} />}
          </button>
        </div>

        {/* Limited Stock Progress Bar (Image 5 style) */}
        {showStockProgress && (
          <div className="mt-3 pt-3 border-t border-slate-200/80 text-[10px]">
            <span className="text-slate-400 block mb-1">A limited quantity of this product is left</span>
            {/* Segmented Bar */}
            <div className="flex items-center gap-0.5 mb-1">
              {[...Array(15)].map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-xs ${idx < 6 ? 'bg-[#00E676]' : 'bg-slate-300/60'}`}
                ></div>
              ))}
            </div>
            <span className="text-slate-500 font-medium">
              Available only: <strong className="text-[#FF6B00] font-bold">{availableStock}</strong>
            </span>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductCard;
