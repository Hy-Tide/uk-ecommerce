import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiHeart, FiUser, FiShoppingCart } from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

import UserDropdown from './UserDropdown';

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
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M17.5 2a9.5 9.5 0 00-7.85 14.8l-4.5 4.5a1.5 1.5 0 002.1 2.1l4.5-4.5A9.5 9.5 0 1017.5 2zm0 16A6.5 6.5 0 1124 11.5 6.51 6.51 0 0117.5 18z" />
              <path d="M16 8a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 8z" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[22px] font-black text-[#1a5d2b] tracking-tight">Grandma's Basket</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] -mt-1">Fresh & Local</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-grow max-w-md mx-8">
          <form onSubmit={handleSearch} className="flex w-full rounded-full border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all bg-white relative">

            {/* Search Input Container */}
            <div className="flex-grow flex items-center bg-[#fcfbf9] rounded-l-full">
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
              className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-8 transition-colors flex items-center gap-2 rounded-r-full"
            >
              Search
            </button>
          </form>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-6 md:gap-8">

          <Link to={ROUTES.WISHLIST} className="hidden md:flex flex-col items-center justify-center text-[#1a5d2b] hover:text-primary transition-colors">
            <div className="relative mb-1">
              <FiHeart size={22} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-[#f97316] text-white text-[10px] font-bold h-[18px] min-w-[18px] rounded-full flex items-center justify-center border-[2px] border-white px-1">
                  {wishlistItems.length}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Wishlist</span>
          </Link>

          <Link to={ROUTES.CART} className="flex flex-col items-center justify-center text-[#1a5d2b] hover:text-primary transition-colors">
            <div className="relative mb-1">
              <FiShoppingCart size={22} />
              <span className="absolute -top-2 -right-2.5 bg-[#f97316] text-white text-[10px] font-bold h-[18px] min-w-[18px] rounded-full flex items-center justify-center border-[2px] border-white px-1">
                {cartItems.length}
              </span>
            </div>
            <span className="text-xs font-medium">£{cartTotal.toFixed(2)}</span>
          </Link>

          {user ? (
            <UserDropdown />
          ) : (
            <Link to={ROUTES.LOGIN} className="hidden md:flex flex-col items-center justify-center text-[#1a5d2b] hover:text-primary transition-colors">
              <div className="relative mb-1">
                <FiUser size={22} />
              </div>
              <span className="text-xs font-medium">Account</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
