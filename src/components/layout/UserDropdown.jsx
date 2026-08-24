import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiShoppingBag,
  FiMapPin,
  FiHeart,
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
  const location = useLocation();

  // Extract Customer Name properly from real API object fields (first_name, last_name, name, email)
  const getCustomerFullName = () => {
    if (!user) return 'Customer Name';
    if (user.first_name || user.last_name) {
      return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    }
    if (user.name) return user.name;
    if (user.email) {
      const namePart = user.email.split('@')[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    return 'Customer Name';
  };

  const fullName = getCustomerFullName();
  const userEmail = user?.email || 'customer@example.com';
  const initial = fullName && fullName !== 'Customer Name'
    ? fullName.charAt(0).toUpperCase()
    : (userEmail ? userEmail.charAt(0).toUpperCase() : 'U');

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
    // { name: 'Track Order', path: ROUTES.TRACK_ORDER, icon: <FiMapPin /> },
    { name: 'Wishlist', path: ROUTES.WISHLIST, icon: <FiHeart /> },
    { name: 'Saved Addresses', path: ROUTES.ADDRESSES, icon: <FiMapPin /> },
    { name: 'Notifications', path: ROUTES.NOTIFICATIONS, icon: <FiBell /> },
    { name: 'Help & Support', path: ROUTES.SUPPORT, icon: <FiHelpCircle /> },
    { name: 'Change Password', path: ROUTES.CHANGE_PASSWORD, icon: <FiLock /> },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Account Trigger in Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex flex-col items-center justify-center text-[#0C3823] hover:text-[#FF6B00] transition-colors focus:outline-none group cursor-pointer"
      >
        <div className="relative mb-0.5">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={fullName}
              className="w-6 h-6 rounded-full object-cover border border-[#0C3823]/20 shadow-2xs"
            />
          ) : user ? (
            <div className="w-6 h-6 rounded-full bg-[#0C3823] text-white flex items-center justify-center font-black text-xs shadow-2xs group-hover:bg-[#FF6B00] transition-colors">
              {initial}
            </div>
          ) : (
            <FiUser size={20} />
          )}
        </div>
        <span className="text-[11px] font-semibold">Account</span>
      </button>

      {/* Dropdown Menu Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-3 w-[275px] bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.14)] border border-slate-100 z-50 origin-top-right"
          >
            {/* Top Pointer Arrow pointing up to Account icon */}
            <div className="w-3 h-3 bg-[#FAFAF8] border-t border-l border-slate-200 rotate-45 absolute -top-1.5 right-4 z-10"></div>

            <div className="rounded-2xl overflow-hidden relative z-20 bg-white">
              {/* User Profile Header */}
              <div className="p-4 bg-[#FAFAF8] border-b border-slate-100 flex items-center gap-3.5">
                <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-extrabold text-[#2E8B57] text-xl">
                      {initial}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-base truncate leading-snug">{fullName}</h4>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{userEmail}</p>
                </div>
              </div>

              {/* Menu Links */}
              <div className="p-2 space-y-0.5">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group ${isActive
                        ? 'bg-[#EBF5ED] text-[#124827] font-semibold'
                        : 'text-slate-600 hover:bg-[#FAFAF8] hover:text-[#124827]'
                        }`}
                    >
                      <div
                        className={`text-lg transition-colors ${isActive
                          ? 'text-[#124827]'
                          : 'text-slate-400 group-hover:text-[#FF6B00]'
                          }`}
                      >
                        {item.icon}
                      </div>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                <div className="h-px bg-slate-100 my-1.5 mx-3"></div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-medium transition-colors group text-sm"
                >
                  <div className="text-slate-400 group-hover:text-rose-500 transition-colors text-lg">
                    <FiLogOut />
                  </div>
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
};

export default UserDropdown;
