import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiHeart, FiUser } from 'react-icons/fi';
import { FaShoppingBasket } from 'react-icons/fa';
import { ROUTES } from '../../utils/constants';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { cartItems, cartTotal } = useCart();
  const { wishlistItems } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query) navigate(`${ROUTES.SEARCH}?q=${query}`);
  };

  return (
    <header className="bg-white py-4 md:py-5 border-b border-slate-100">
      <div className="container flex items-center justify-between gap-4 md:gap-8">
        
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3 flex-shrink-0">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white p-2">
            {/* Custom Leaf/Organic Icon to replace Lakshmi logo */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M17.5 2a9.5 9.5 0 00-7.85 14.8l-4.5 4.5a1.5 1.5 0 002.1 2.1l4.5-4.5A9.5 9.5 0 1017.5 2zm0 16A6.5 6.5 0 1124 11.5 6.51 6.51 0 0117.5 18z" />
              <path d="M16 8a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 8z" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[22px] font-black text-[#1a5d2b] tracking-tight">UK Groceries</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] -mt-1">Fresh & Local</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-grow max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="flex w-full rounded-full border border-slate-200 overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            <div className="flex items-center bg-slate-50 px-4 border-r border-slate-200 text-sm font-medium text-slate-600 cursor-pointer min-w-[140px] justify-between">
              <span>All Categories</span>
              <FiChevronDown />
            </div>
            <div className="flex-grow flex items-center bg-[#fcfbf9]">
              <FiSearch className="text-slate-400 ml-4" />
              <input 
                type="text" 
                name="search"
                placeholder="Search for groceries, spices, brands..." 
                className="w-full px-3 py-3 outline-none bg-transparent text-sm"
              />
            </div>
            <button 
              type="submit" 
              className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-8 transition-colors flex items-center gap-2"
            >
              Search
            </button>
          </form>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-6 md:gap-8">
          
          <Link to={user ? ROUTES.ACCOUNT : ROUTES.LOGIN} className="hidden md:flex items-center gap-2 hover:text-primary transition-colors">
            <div className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center text-dark">
              <FiUser size={20} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] text-slate-400 font-medium">Hello, Sign in</span>
              <span className="text-sm font-bold text-dark">My Account</span>
            </div>
          </Link>

          <Link to={ROUTES.WISHLIST} className="hidden md:flex items-center gap-2 hover:text-primary transition-colors">
            <div className="relative text-dark">
              <FiHeart size={24} />
              <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white box-content">
                {wishlistItems.length}
              </span>
            </div>
            <span className="text-sm font-bold text-dark hidden xl:block">Wishlist</span>
          </Link>

          <Link to={ROUTES.CART} className="bg-[#1a5d2b] hover:bg-[#13441f] text-white px-4 py-2.5 rounded-full flex items-center gap-3 shadow-lg shadow-green-900/20 transition-transform hover:scale-105 active:scale-95">
            <FaShoppingBasket size={18} />
            <div className="bg-orange-500 text-dark font-black text-xs h-5 px-2 rounded-full flex items-center justify-center">
              {cartItems.length}
            </div>
            <span className="font-bold border-l border-white/20 pl-3">£{cartTotal.toFixed(2)}</span>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;
