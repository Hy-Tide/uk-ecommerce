import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const StickyBottomBar = ({ product }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the sticky bar when the user scrolls past a certain point (e.g., the main Add to Cart button)
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)] z-50 transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        
        {/* Left Side: Product Info */}
        <div className="flex items-center gap-3 hidden md:flex">
          <div className="w-12 h-12 bg-[#f9fafb] rounded-lg p-1.5 flex-shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <div>
            <h4 className="font-bold text-dark text-sm truncate max-w-[300px]">{product.name}</h4>
            <span className="text-xs text-slate-400 font-medium">{product.weight}</span>
          </div>
        </div>
        
        {/* Right Side: Price & Action */}
        <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-6 ml-auto">
          <div className="flex flex-col items-start md:items-end">
            <span className="text-xl font-black text-dark leading-none">£{product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-[10px] text-slate-400 line-through font-medium leading-none mt-1">£{product.oldPrice.toFixed(2)}</span>
            )}
          </div>
          <button className="bg-[#279c66] hover:bg-[#1f7e52] text-white text-sm font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors active:scale-95 shadow-md shadow-green-900/10">
            <FiShoppingCart size={16} /> <span className="hidden sm:inline">Add to Cart</span><span className="sm:hidden">Add</span>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default StickyBottomBar;
