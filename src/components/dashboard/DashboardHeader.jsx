import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiBell, FiHeart, FiShoppingCart, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';
import DashboardSidebar from './DashboardSidebar'; // We'll render a mobile version of sidebar here

const DashboardHeader = ({ onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-3 lg:hidden">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-dark hover:bg-slate-50 rounded-lg transition-colors"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <Link to={ROUTES.HOME} className="text-xl font-serif font-bold text-dark">
            Fresh<span className="text-primary">Cart</span>
          </Link>
        </div>

        {/* Profile & Welcome (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
            <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-dark">Hello, Deepika 👋</h2>
            <p className="text-xs text-slate-500">Manage your orders, addresses and account.</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-6 flex-grow lg:flex-grow-0 justify-end">
          
          {/* Search Orders */}
          <div className="hidden md:flex relative max-w-xs w-full">
            <input 
              type="text" 
              placeholder="Search Orders..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link to={ROUTES.NOTIFICATIONS} className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </Link>
            <Link to={ROUTES.WISHLIST} className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors hidden sm:block">
              <FiHeart className="w-5 h-5" />
            </Link>
            <Link to={ROUTES.CART} className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
              <FiShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </Link>
          </div>

          {/* User Dropdown */}
          <div className="relative hidden lg:block">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-2 pr-3 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=47" alt="User" className="w-full h-full object-cover" />
              </div>
              <FiChevronDown className="w-4 h-4 text-slate-600" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-soft border border-slate-100 py-2 z-50">
                <Link to={ROUTES.PROFILE} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-dark">My Profile</Link>
                <Link to={ROUTES.ORDERS} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-dark">Orders</Link>
                <Link to={ROUTES.WISHLIST} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-dark">Wishlist</Link>
                <div className="my-1 border-t border-slate-100" />
                <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
