import React, { useState } from 'react';
import { FiHeart, FiShare2, FiShield, FiTruck, FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState('10kg');

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stockCount) setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col">
      {/* Badges & Brand */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[#379c6b] text-xs font-bold uppercase tracking-wider">{product.brand}</span>
        {product.discountBadge && (
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
            {product.discountBadge}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-black text-dark leading-tight mb-4">{product.name}</h1>

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-sm text-slate-500 bg-[#fcfbf9] px-2 py-1 rounded-md border border-slate-100">
          {product.soldCount}
        </span>
      </div>

      {/* Price Area */}
      <div className="flex items-end gap-4 mb-6">
        <span className="text-4xl font-black text-dark leading-none">£{product.price.toFixed(2)}</span>
        {product.oldPrice && (
          <div className="flex flex-col mb-1">
            <span className="text-sm text-slate-400 line-through font-medium">£{product.oldPrice.toFixed(2)}</span>
            <span className="text-[#379c6b] text-xs font-bold">{product.savings}</span>
          </div>
        )}
      </div>

      {/* Description Preview */}
      <p className="text-slate-500 text-sm leading-relaxed mb-8">
        {product.description}
      </p>

      {/* Weight Options */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {['1kg', '5kg', '10kg'].map((weight) => (
            <button 
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`font-bold text-sm px-6 py-2.5 rounded-full transition-all border-2 ${selectedWeight === weight ? 'border-[#379c6b] text-[#379c6b] bg-[#e8f5ed]' : 'border-slate-200 text-slate-500 hover:border-slate-300 bg-white'}`}
            >
              {weight}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex flex-col gap-4 mb-8 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center bg-[#fcfbf9] border border-slate-200 rounded-xl h-[52px]">
            <button onClick={decreaseQuantity} className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-dark transition-colors">
              <FiMinus size={16} />
            </button>
            <span className="w-10 text-center font-bold text-dark">{quantity}</span>
            <button onClick={increaseQuantity} className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-dark transition-colors">
              <FiPlus size={16} />
            </button>
          </div>
          <span className="text-xs font-medium text-slate-500">Only {product.stockCount} left in stock!</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 bg-[#279c66] hover:bg-[#1f7e52] text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-green-900/20 active:scale-[0.98]">
            Add to Cart
          </button>
          <button className="flex-1 bg-[#1a2522] hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-colors active:scale-[0.98]">
            Buy Now
          </button>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-dark transition-colors">
            <FiHeart size={16} /> Add to Wishlist
          </button>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-dark transition-colors">
            <FiShare2 size={16} /> Share Product
          </button>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#fcfbf9] border border-slate-100 p-4 rounded-xl flex items-start gap-3">
          <div className="text-[#379c6b] mt-0.5"><FiShield size={20} /></div>
          <div>
            <h4 className="text-dark font-bold text-sm mb-0.5">Secure Payments</h4>
            <p className="text-slate-400 text-xs">Powered by Stripe & PayPal</p>
          </div>
        </div>
        <div className="bg-[#fcfbf9] border border-slate-100 p-4 rounded-xl flex items-start gap-3">
          <div className="text-[#379c6b] mt-0.5"><FiTruck size={20} /></div>
          <div>
            <h4 className="text-dark font-bold text-sm mb-0.5">Delivery Options</h4>
            <p className="text-slate-400 text-xs">Check delivery options below</p>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div>
        <h4 className="text-dark font-bold text-sm mb-4">Product Highlights</h4>
        <div className="grid grid-cols-2 gap-3">
          {product.highlights?.map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-[#279c66] bg-[#e8f5ed] px-3 py-2 rounded-lg font-medium">
              <FiCheck size={16} /> {highlight}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductInfo;
