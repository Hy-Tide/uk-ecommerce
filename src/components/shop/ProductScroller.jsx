import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, resolveProductImageUrl } from '../../utils/constants';

const SmallProductCard = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const imageUrl = resolveProductImageUrl(product);

  return (
    <Link 
      to={`${ROUTES.SHOP}?category=${typeof product.category === 'object' ? product.category?.slug : product.category}&product=${product.id || product._id}`}
      className="flex items-center gap-4 bg-white border border-slate-100 p-3 rounded-2xl hover:border-[#379c6b]/50 hover:shadow-md transition-all min-w-[260px] md:min-w-[300px] snap-start"
    >
      <div className="w-16 h-16 bg-[#f9fafb] rounded-xl flex items-center justify-center p-1.5 flex-shrink-0">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={product.name || product.title}
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src="/images/logo.png"
            alt="Grandma's Basket"
            className="w-10 h-10 object-contain opacity-25 grayscale"
          />
        )}
      </div>
      <div className="flex flex-col flex-grow overflow-hidden">
        <span className="text-dark font-bold text-sm truncate mb-0.5">{product.name || product.title}</span>
        <span className="text-slate-400 text-[11px] font-medium mb-1.5">{product.weight || '1kg'} • {typeof product.brand === 'object' ? product.brand?.name : (product.brand || "Grandma's Basket")}</span>
        <span className="text-dark font-black text-sm leading-none">£{(product.price || product.base_price || 0).toFixed(2)}</span>
      </div>
    </Link>
  );
};

const ProductScroller = ({ title, products, actionText, actionLink }) => {
  return (
    <div className="mb-12 last:mb-0">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-dark">{title}</h3>
        {actionText && (
          <Link to={actionLink || '#'} className="text-xs font-bold text-slate-500 hover:text-primary transition-colors border border-slate-200 px-3 py-1.5 rounded-full hover:border-primary">
            {actionText}
          </Link>
        )}
      </div>
      
      {/* Hide scrollbar but allow horizontal scrolling */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
        {products.map(product => (
          <SmallProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductScroller;
