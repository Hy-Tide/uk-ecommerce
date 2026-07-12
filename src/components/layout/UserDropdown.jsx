import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiShoppingBag,
  FiMapPin,
  FiHeart,
  FiGift,
  FiBell,
  FiHelpCircle,
  FiLock,
  FiLogOut
} from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      setIsOpen(false);
      navigate(ROUTES.HOME);
    }
  };

  const menuItems = [
    { name: 'My Profile', path: ROUTES.PROFILE, icon: <FiUser /> },
    { name: 'My Orders', path: ROUTES.ORDERS, icon: <FiShoppingBag /> },
    { name: 'Track Order', path: ROUTES.TRACK_ORDER, icon: <FiMapPin /> },
    { name: 'Wishlist', path: ROUTES.WISHLIST, icon: <FiHeart /> },
    { name: 'Saved Addresses', path: ROUTES.ADDRESSES, icon: <FiMapPin /> },
    // { name: 'Rewards & Points', path: ROUTES.REWARDS, icon: <FiGift /> },
    { name: 'Notifications', path: ROUTES.NOTIFICATIONS, icon: <FiBell /> },
    { name: 'Help & Support', path: ROUTES.SUPPORT, icon: <FiHelpCircle /> },
    { name: 'Change Password', path: ROUTES.CHANGE_PASSWORD, icon: <FiLock /> },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pr-3 rounded-full border border-slate-200 hover:border-[#2E8B57] bg-white transition-colors group focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200 group-hover:border-[#2E8B57]">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-bold text-[#2E8B57] text-lg">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
          )}
        </div>
        <div className="hidden lg:flex flex-col text-left">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">Hello,</span>
          <span className="text-sm font-bold text-slate-800 leading-tight group-hover:text-[#2E8B57] transition-colors">
            {user?.name?.split(' ')[0] || 'User'}
          </span>
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-[300px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-50 origin-top-right"
          >
            {/* Header */}
            <div className="p-5 bg-[#FAFAF8] border-b border-slate-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm overflow-hidden border border-slate-200 flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-black text-[#2E8B57] text-xl">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-lg truncate">{user?.name || 'Customer Name'}</h4>
                <p className="text-sm text-slate-500 font-medium truncate">{user?.email || 'customer@example.com'}</p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <div className="flex flex-col">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FAFAF8] hover:text-[#2E8B57] text-slate-600 font-medium transition-colors group"
                  >
                    <div className="text-slate-400 group-hover:text-[#FF8A00] transition-colors text-lg">
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-slate-100 my-2 mx-4"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-medium transition-colors group"
              >
                <div className="text-slate-400 group-hover:text-rose-500 transition-colors text-lg">
                  <FiLogOut />
                </div>
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
