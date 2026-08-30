import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiHeart, FiUser, FiShoppingCart, FiMapPin } from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { usePostcode } from '../../context/PostcodeContext';
import UserDropdown from './UserDropdown';

const Header = () => {
  const { cartItems, cartTotal } = useCart();
  const { wishlistItems } = useWishlist();
  const { user } = useAuth();
  const { postcode, postcodeData, changePostcode } = usePostcode();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query) navigate(`${ROUTES.SEARCH}?q=${query}`);
  };

  return (
    <header className="bg-white py-3.5 border-b border-slate-100">
      <div className="container flex items-center justify-between gap-4 md:gap-8">

        {/* Original Logo & Delivery Location */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="Grandma's Basket Logo"
              className="h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl md:text-2xl font-black text-[#0C3823] tracking-tight">Grandma's Basket</span>
              <span className="text-[10px] text-[#FF6B00] font-bold uppercase tracking-[0.2em] -mt-1">Fresh & Local</span>
            </div>
          </Link>

          {/* Delivery Location Indicator (from mockup) */}
          <div
            onClick={changePostcode}
            className="hidden xl:flex items-center gap-2.5 pl-4 border-l border-slate-200 cursor-pointer hover:opacity-80 transition-opacity"
            title="Change Delivery Postcode"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <FiMapPin size={16} />
            </div>
            <div className="flex flex-col text-xs leading-tight">
              <span className="text-slate-400 font-medium">
                Delivery to {postcodeData?.admin_district || ''}
              </span>
              <span className="font-bold text-[#0C3823]">{postcode || 'Set Postcode'}</span>
            </div>
          </div>
        </div>

        {/* Modern Search Bar */}
        <div className="flex-grow max-w-xl mx-2 md:mx-6">
          <form onSubmit={handleSearch} className="relative w-full">
            <div className="flex items-center bg-[#F3F4F6] rounded-full px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#0C3823]/20 transition-all">
              <FiSearch className="text-slate-400 text-lg mr-3 flex-shrink-0" />
              <input
                type="text"
                name="search"
                placeholder="Search your products, Categories or Brands"
                className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400 text-xs md:text-sm font-medium"
              />
            </div>
          </form>
        </div>

        {/* All Action Icons (Wishlist, Cart, Account) */}
        <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">

          {/* Wishlist */}
          <Link to={ROUTES.WISHLIST} className="hidden md:flex flex-col items-center justify-center text-[#0C3823] hover:text-[#FF6B00] transition-colors">
            <div className="relative mb-0.5">
              <FiHeart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#FF6B00] text-white text-[9px] font-bold h-4 min-w-[16px] rounded-full flex items-center justify-center border-2 border-white px-1">
                  {wishlistItems.length}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link to={ROUTES.CART} className="flex flex-col items-center justify-center text-[#0C3823] hover:text-[#FF6B00] transition-colors">
            <div className="relative mb-0.5">
              <FiShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#FF6B00] text-white text-[9px] font-bold h-4 min-w-[16px] rounded-full flex items-center justify-center border-2 border-white px-1">
                  {cartItems.length}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium">Cart</span>
          </Link>

          {/* Account */}
          {user ? (
            <UserDropdown />
          ) : (
            <Link to={ROUTES.LOGIN} className="hidden md:flex flex-col items-center justify-center text-[#0C3823] hover:text-[#FF6B00] transition-colors">
              <div className="relative mb-0.5">
                <FiUser size={20} />
              </div>
              <span className="text-[11px] font-medium">Account</span>
            </Link>
          )}

        </div>

      </div>
    </header>
  );
};

export default Header;
