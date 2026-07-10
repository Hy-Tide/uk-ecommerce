import React, { useState } from 'react';
import { FiX, FiShoppingCart, FiSearch } from 'react-icons/fi';

const wishlistItems = [
  {
    id: 1,
    badge: '5% OFF',
    brand: 'AASHIRVAAD',
    name: 'Whole Wheat Atta',
    weight: '10 kg',
    price: 12.99,
    oldPrice: 15.00,
    inStock: true,
    image: '/images/prod-wheat-atta.png'
  },
  {
    id: 2,
    badge: '10% OFF',
    brand: 'INDIA GATE',
    name: 'Basmati Rice',
    weight: '5 kg',
    price: 16.99,
    oldPrice: 18.00,
    inStock: true,
    image: '/images/prod-basmati-rice.png'
  },
  {
    id: 3,
    badge: '8% OFF',
    brand: 'TATA SAMPANN',
    name: 'Toor Dal',
    weight: '1 kg',
    price: 4.99,
    oldPrice: 5.49,
    inStock: true,
    image: '/images/prod-toor-dal.png'
  },
  {
    id: 5,
    badge: '15% OFF',
    brand: 'AMUL',
    name: 'Pure Ghee',
    weight: '1 L',
    price: 11.99,
    oldPrice: 13.50,
    inStock: false,
    image: '/images/prod-amul-ghee.png'
  }
];

const Wishlist = () => {
  const [items, setItems] = useState(wishlistItems);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">My Wishlist</h1>
          <p className="text-slate-500 text-sm mt-1">{items.length} items saved in your wishlist.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search wishlist..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full sm:w-64"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors shrink-0 shadow-md shadow-primary/20">
            <FiShoppingCart className="w-4 h-4" />
            Add All to Cart
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 relative group hover:shadow-lg transition-all hover:border-primary/30 flex flex-col h-full">
            
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase">
                {item.badge}
              </span>
            </div>
            
            {/* Remove Button */}
            <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 shadow-sm transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
              <FiX className="w-4 h-4" />
            </button>

            {/* Image */}
            <div className="relative h-48 mb-4 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden">
              {!item.inStock && (
                <div className="absolute inset-0 bg-white/60 z-10 backdrop-blur-[2px]"></div>
              )}
              {!item.inStock && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark text-white text-xs font-bold px-3 py-1.5 rounded-lg z-20 shadow-lg">
                  Out of Stock
                </div>
              )}
              <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.target.src = 'https://placehold.co/200x200/f8fafc/94a3b8?text=Product' }} />
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col">
              <div className="text-primary text-[10px] font-black uppercase tracking-wider mb-1">
                {item.brand}
              </div>
              <h3 className="text-sm font-bold text-dark leading-tight mb-1 line-clamp-2">
                {item.name}
              </h3>
              <div className="text-xs text-slate-500 font-medium mb-3">
                {item.weight}
              </div>
              
              <div className="mt-auto">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-lg font-black text-primary">£{item.price.toFixed(2)}</span>
                  <span className="text-xs text-slate-400 font-bold line-through">£{item.oldPrice.toFixed(2)}</span>
                </div>

                <button 
                  className={`w-full flex items-center justify-center gap-2 font-bold text-sm h-10 rounded-xl transition-colors ${
                    item.inStock 
                      ? 'bg-primary-50 text-primary hover:bg-primary hover:text-white' 
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  <FiShoppingCart className="w-4 h-4" />
                  {item.inStock ? 'Move to Cart' : 'Notify Me'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
