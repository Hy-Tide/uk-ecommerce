import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiCheck, FiMinus, FiChevronDown } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { getProductUrl, resolveProductImageUrl } from '../../utils/constants';

const ProductCard = ({ product, showStockProgress = false, removeImagePadding = false }) => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [added, setAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [selectedVarIdx, setSelectedVarIdx] = useState(0);
  const productId = product._id || product.id || product.productId;
  const currentVariation = product.variations && product.variations.length > selectedVarIdx 
    ? product.variations[selectedVarIdx] 
    : (product.variations && product.variations.length > 0 ? product.variations[0] : null);
  const variationId = currentVariation ? (currentVariation._id || currentVariation.id || currentVariation.variationId) : null;

  const cartItem = cartItems?.find(item => {
    const itemProductId = item.productId || (item.product && (item.product._id || item.product.id)) || item.id;
    const itemVariationId = item.variationId || (item.variation && (item.variation._id || item.variation.id)) || null;
    
    const sameProduct = String(itemProductId) === String(productId);
    
    // If the local product object (e.g. from bestDeals) has no variationId, we assume it's the default variation
    // and match just by productId. Otherwise, we enforce variationId matching.
    const sameVariation = !variationId || String(itemVariationId) === String(variationId);
    
    return sameProduct && sameVariation;
  });

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding || added) return;
    
    setIsAdding(true);
    const success = await addToCart(product, currentVariation);
    setIsAdding(false);
    
    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  // Sample stock info if not present
  const availableStock = product.stockLeft || '37kg';
  const imageUrl = resolveProductImageUrl(product);

  return (
    <div className={`bg-[#F3F4F6] rounded-2xl flex flex-col justify-between h-full group hover:shadow-xl transition-all duration-300 relative border border-slate-200/50 ${removeImagePadding ? 'pb-4 pt-0 px-0' : 'p-4'}`}>

      {/* Top Image & Badges Container */}
      <div className={`relative bg-white flex items-center justify-center h-48 overflow-hidden ${removeImagePadding ? 'rounded-t-2xl rounded-b-none pb-3 pt-0 px-0 mb-3' : 'rounded-xl p-3 mb-3'}`}>

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
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-600 font-bold text-[10px] px-2 py-1 rounded-lg border border-amber-200/60 shadow-sm leading-none">
            <FaStar size={10} />
            <span className="pt-[1px]">{product.rating || '4.8'}</span>
          </div>
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
        <Link to={getProductUrl(product)} className={`w-full h-full flex items-center justify-center ${removeImagePadding ? 'pb-1 pt-0 px-0' : 'p-1'}`}>
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
      <div className={`flex flex-col flex-grow ${removeImagePadding ? 'px-4' : ''}`}>
        {/* Title */}
        <Link to={getProductUrl(product)}>
          <h3 className="font-bold text-[#0C3823] text-xs md:text-sm leading-snug mb-1 line-clamp-2 hover:text-[#FF6B00] transition-colors min-h-[36px] md:min-h-[40px]">
            {product.name || product.title}
          </h3>
        </Link>

        <div className="mt-auto flex flex-col">
          {/* Variant Selector */}
        <div className="flex flex-wrap gap-1.5 mb-3 mt-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
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

          {/* Price & Add Button Row */}
          <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg md:text-xl font-extrabold text-[#0C3823]">
                €{(currentVariation?.salePrice || currentVariation?.regularPrice || product.discount_price || product.base_price || product.price || 0).toFixed(2)}
              </span>
              {(currentVariation?.regularPrice > currentVariation?.salePrice || product.oldPrice) && (
                <span className="text-xs text-slate-400 line-through font-medium">
                  €{(currentVariation?.regularPrice || product.oldPrice || 0).toFixed(2)}
                </span>
              )}
            </div>

            {!cartItem ? (
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 disabled:opacity-70 ${added
                    ? 'bg-[#008851] text-white'
                    : 'bg-[#0C3823] hover:bg-[#008851] text-white'
                  }`}
                title="Add to Cart"
              >
                {isAdding ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : added ? (
                  <FiCheck size={16} />
                ) : (
                  <FiPlus size={18} />
                )}
              </button>
            ) : (
              <div className="flex items-center border border-slate-200 rounded-full h-8 bg-white overflow-hidden shadow-xs">
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(cartItem._id || cartItem.id, cartItem.quantity - 1); }}
                  className="w-7 h-full flex items-center justify-center text-slate-500 hover:text-[#0C3823] hover:bg-slate-50 transition-colors"
                >
                  <FiMinus size={12} />
                </button>
                <span className="w-6 flex flex-col justify-center items-center text-center text-xs font-bold text-[#0C3823]">
                  {cartItem.quantity}
                </span>
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(cartItem._id || cartItem.id, cartItem.quantity + 1); }}
                  className="w-7 h-full flex items-center justify-center text-slate-500 hover:text-[#0C3823] hover:bg-slate-50 transition-colors"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            )}
          </div>
          
        </div>
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
