import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const SmallProductCard = ({ product }) => {
  return (
    <Link 
      to={`${ROUTES.SHOP}?category=${product.category}&product=${product.id}`}
      className="flex items-center gap-4 bg-white border border-slate-100 p-3 rounded-2xl hover:border-[#379c6b]/50 hover:shadow-md transition-all min-w-[260px] md:min-w-[300px] snap-start"
    >
      <div className="w-16 h-16 bg-[#f9fafb] rounded-xl flex items-center justify-center p-2 flex-shrink-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col flex-grow overflow-hidden">
        <span className="text-dark font-bold text-sm truncate mb-0.5">{product.name}</span>
        <span className="text-slate-400 text-[11px] font-medium mb-1.5">{product.weight} • {product.brand}</span>
        <span className="text-dark font-black text-sm leading-none">£{product.price.toFixed(2)}</span>
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
