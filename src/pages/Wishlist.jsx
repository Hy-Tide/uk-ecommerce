import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiEye } from 'react-icons/fi';
import { ROUTES } from '../utils/constants';

const wishlistItems = [
  {
    id: 1,
    badge: '5% OFF',
    brand: 'AASHIRVAAD',
    name: 'Whole Wheat Atta',
    weight: '10 kg',
    rating: 4.8,
    reviews: 250,
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
    rating: 4.9,
    reviews: 512,
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
    rating: 4.5,
    reviews: 180,
    price: 4.99,
    oldPrice: 5.49,
    inStock: true,
    image: '/images/prod-toor-dal.png'
  },
  {
    id: 4,
    badge: '20% OFF',
    brand: 'MDH',
    name: 'Garam Masala',
    weight: '100 g',
    rating: 4.7,
    reviews: 430,
    price: 2.49,
    oldPrice: 3.12,
    inStock: true,
    image: '/images/prod-garam-masala.png'
  },
  {
    id: 5,
    badge: '15% OFF',
    brand: 'AMUL',
    name: 'Pure Ghee',
    weight: '1 L',
    rating: 4.8,
    reviews: 850,
    price: 11.99,
    oldPrice: 13.50,
    inStock: false,
    image: '/images/prod-amul-ghee.png'
  },
  {
    id: 6,
    badge: '12% OFF',
    brand: 'FORTUNE',
    name: 'Sunflower Oil',
    weight: '5 L',
    rating: 4.6,
    reviews: 675,
    price: 9.49,
    oldPrice: 10.79,
    inStock: true,
    image: '/images/prod-fortune-oil.png'
  }
];

const recentlyViewed = [
  { id: 1, name: 'MDH Garam Masala', weight: '200g, Tin', price: 3.49, oldPrice: 4.29, image: '/images/prod-garam-masala.png' },
  { id: 2, name: "Haldiram's Bhujia", weight: '400g', price: 6.49, oldPrice: 7.29, image: '/images/prod-aloo-bhujia.png' },
  { id: 3, name: 'Tata Masala Chai', weight: '250g Box', price: 4.49, oldPrice: 4.99, image: '/images/prod-chai.png' },
  { id: 4, name: 'Dabur Honey', weight: '600g', price: 7.99, oldPrice: 8.99, image: '/images/prod-honey.png' },
  { id: 5, name: 'Everest Turmeric', weight: '200g', price: 2.79, oldPrice: 3.99, image: '/images/prod-turmeric.png' },
  { id: 6, name: 'Patanjali Ghee', weight: '1 L Jar', price: 10.99, oldPrice: 12.99, image: '/images/prod-patanjali-ghee.png' },
];

const StarRating = ({ rating, count }) => {
  return (
    <div className="flex items-center gap-1 mb-2">
      <div className="flex text-[#fbbf24]">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className={`w-3 h-3 ${star <= rating ? 'text-[#fbbf24]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-gray-400 text-[10px] font-medium ml-1">{rating} ({count})</span>
    </div>
  );
};

const Wishlist = () => {
  const [items, setItems] = useState(wishlistItems);

  return (
    <div className="bg-white">
      {/* Breadcrumb Area */}
      <div className="bg-[#f8f9fa] border-b border-gray-100 py-3">
        <div className="container px-4 mx-auto">
          <div className="text-sm text-gray-500 font-medium">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900">Wishlist</span>
          </div>
        </div>
      </div>

      {/* Main Wishlist Section */}
      <div className="container px-4 mx-auto py-10">
        
        {/* Title Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[#ffe4e6] flex-shrink-0 mt-1"></div>
            <div>
              <h1 className="text-[32px] font-black text-gray-900 leading-tight mb-2">My Wishlist</h1>
              <div className="inline-flex items-center bg-[#dcfce7] text-[#166534] text-xs font-bold px-3 py-1.5 rounded-full">
                6 items saved in your wishlist
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-md pl-4 pr-10 py-2.5 focus:outline-none focus:border-green-500">
                <option>Sort by: Newest</option>
                <option>Sort by: Price (Low to High)</option>
                <option>Sort by: Price (High to Low)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-sm px-6 py-2.5 rounded-md transition-colors">
              Clear All
            </button>
            <button className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold text-sm px-6 py-2.5 rounded-md transition-colors">
              Add All to Cart
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="bg-[#f8f9fa] rounded-2xl p-6 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 relative group hover:shadow-lg transition-shadow">
                
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <span className="bg-[#f97316] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm uppercase">
                    {item.badge}
                  </span>
                </div>
                
                {/* Remove Button */}
                <button className="absolute top-3 right-3 z-10 w-7 h-7 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 shadow-sm transition-all">
                  <FiX size={14} />
                </button>

                {/* Image */}
                <div className="relative h-48 mb-4 flex items-center justify-center bg-white">
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-white/40 z-10"></div>
                  )}
                  {!item.inStock && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1f2937] text-white text-xs font-bold px-3 py-1 rounded z-20">
                      Out of Stock
                    </div>
                  )}
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain p-2" />
                  
                  {/* Quick View */}
                  <button className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center gap-1.5 whitespace-nowrap">
                    <FiEye size={12} /> Quick View
                  </button>
                </div>

                {/* Content */}
                <div>
                  <div className="text-[#2e7d32] text-[10px] font-black uppercase tracking-wider mb-1">
                    {item.brand}
                  </div>
                  <h3 className="text-[14px] font-bold text-gray-900 leading-tight mb-1 line-clamp-2 h-10">
                    {item.name}
                  </h3>
                  <div className="text-xs text-gray-500 font-medium mb-2">
                    {item.weight}
                  </div>
                  
                  <StarRating rating={item.rating} count={item.reviews} />

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-black text-[#2e7d32]">£{item.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-400 font-bold line-through">£{item.oldPrice.toFixed(2)}</span>
                  </div>

                  {item.inStock ? (
                    <div className="flex items-center gap-1.5 mb-3 text-xs font-bold text-[#16a34a]">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      In Stock
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 mb-3 text-xs font-bold text-red-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                      Out of Stock
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <div className={`flex items-center border border-gray-200 rounded-md h-9 overflow-hidden ${!item.inStock ? 'opacity-50 pointer-events-none' : 'bg-gray-50'}`}>
                      <button className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black font-bold text-lg bg-gray-50 hover:bg-gray-100 transition-colors" disabled={!item.inStock}>-</button>
                      <input type="text" value="1" readOnly className="w-8 text-center text-sm font-bold bg-transparent text-gray-900 outline-none border-none" />
                      <button className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black font-bold text-lg bg-gray-50 hover:bg-gray-100 transition-colors" disabled={!item.inStock}>+</button>
                    </div>
                    {item.inStock ? (
                      <button className="flex-1 bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold text-sm h-9 rounded-md transition-colors">
                        Add to Cart
                      </button>
                    ) : (
                      <button className="flex-1 bg-gray-200 text-gray-600 font-bold text-sm h-9 rounded-md flex items-center justify-center gap-1.5 hover:bg-gray-300 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        Notify Me
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Viewed Section */}
        <div className="mb-20">
          <h4 className="text-[#2e7d32] text-xs font-black uppercase tracking-wider mb-1">Your History</h4>
          <h2 className="text-2xl font-black text-gray-900 mb-1 flex items-center justify-between">
            Recently Viewed
            <Link to="/" className="text-[#2e7d32] text-sm font-bold flex items-center gap-1 hover:underline">
              View All <span className="text-lg leading-none">|</span>
            </Link>
          </h2>
          <p className="text-gray-500 text-sm mb-6 font-medium">Products you've browsed recently</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentlyViewed.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-3 flex flex-col hover:shadow-md transition-shadow">
                <div className="relative h-28 mb-3 bg-white flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 leading-tight mb-1 line-clamp-2 min-h-[32px]">
                  {item.name}
                </h3>
                <div className="text-[10px] text-gray-500 font-medium mb-2">
                  {item.weight}
                </div>
                <div className="flex items-baseline gap-1.5 mb-3 mt-auto">
                  <span className="text-sm font-black text-[#2e7d32]">£{item.price.toFixed(2)}</span>
                  <span className="text-[10px] text-gray-400 font-bold line-through">£{item.oldPrice.toFixed(2)}</span>
                </div>
                <button className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold text-xs py-2 rounded-md transition-colors flex items-center justify-center gap-1">
                  + Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#388e3c]">
        <div className="container px-4 mx-auto py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 text-white">
              <h2 className="text-[28px] font-black leading-tight mb-3">
                Get Exclusive Deals &<br/>New Arrivals in Your Inbox
              </h2>
              <p className="text-white/90 text-sm leading-relaxed max-w-md font-medium">
                Subscribe to our newsletter and save 10% on your next order. Be the first to know about seasonal offers, festival hampers and new products.
              </p>
            </div>
            
            <div className="md:w-[45%] w-full">
              <div className="text-white/90 text-sm font-bold mb-3">
                Newsletter Sign Up
              </div>
              <form className="flex w-full bg-transparent rounded-md overflow-hidden border border-white/20 p-1 bg-black/10 backdrop-blur-sm mb-3">
                <input 
                  type="email" 
                  placeholder="Enter your email address..." 
                  className="flex-1 bg-transparent text-white placeholder-white/70 px-4 py-2 outline-none text-sm font-medium"
                />
                <button type="submit" className="bg-white text-gray-900 font-bold text-sm px-6 py-2.5 rounded hover:bg-gray-50 transition-colors">
                  Subscribe Now
                </button>
              </form>
              <p className="text-white/70 text-[11px] font-medium">
                By subscribing you consent to our Privacy Policy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Wishlist;
