import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiSettings, 
  FiShoppingBag, 
  FiMapPin, 
  FiHeart, 
  FiUser, 
  FiLock, 
  FiBell, 
  FiMessageCircle,
  FiLogOut
} from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';

const sidebarLinks = [
  { name: 'Dashboard', path: ROUTES.ACCOUNT, icon: <FiSettings className="w-5 h-5" /> },
  { name: 'My Orders', path: ROUTES.ORDERS, icon: <FiShoppingBag className="w-5 h-5" /> },
  { name: 'Track Orders', path: ROUTES.TRACK_ORDER, icon: <FiMapPin className="w-5 h-5" /> },
  { name: 'Wishlist', path: ROUTES.WISHLIST, icon: <FiHeart className="w-5 h-5" /> },
  { name: 'Saved Addresses', path: ROUTES.ADDRESSES, icon: <FiMapPin className="w-5 h-5" /> },
  { name: 'Profile Information', path: ROUTES.PROFILE, icon: <FiUser className="w-5 h-5" /> },
  { name: 'Change Password', path: ROUTES.CHANGE_PASSWORD, icon: <FiLock className="w-5 h-5" /> },
  { name: 'Notifications', path: ROUTES.NOTIFICATIONS, icon: <FiBell className="w-5 h-5" /> },
  { name: 'Support via WhatsApp', path: ROUTES.SUPPORT, icon: <FiMessageCircle className="w-5 h-5" /> },
];

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-full lg:w-[280px] flex-shrink-0 hidden lg:block">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
        <nav className="p-4 flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-bold shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-dark font-medium'
                }`}
              >
                <div className={`${isActive ? 'text-primary' : 'text-slate-400'}`}>
                  {link.icon}
                </div>
                {link.name}
              </NavLink>
            );
          })}
          <div className="my-2 border-t border-slate-100" />
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-colors text-left group">
            <FiLogOut className="w-5 h-5 text-red-400 group-hover:text-red-500" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
