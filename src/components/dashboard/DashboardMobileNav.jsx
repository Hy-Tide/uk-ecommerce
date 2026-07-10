import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiGrid, FiShoppingCart, FiHeart, FiUser } from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';

const mobileNavLinks = [
  { name: 'Home', path: ROUTES.HOME, icon: <FiHome className="w-5 h-5" /> },
  { name: 'Categories', path: ROUTES.SHOP, icon: <FiGrid className="w-5 h-5" /> },
  { name: 'Cart', path: ROUTES.CART, icon: <FiShoppingCart className="w-5 h-5" /> },
  { name: 'Wishlist', path: ROUTES.WISHLIST, icon: <FiHeart className="w-5 h-5" /> },
  { name: 'Account', path: ROUTES.ACCOUNT, icon: <FiUser className="w-5 h-5" /> },
];

const DashboardMobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 z-40 lg:hidden pb-safe">
      <div className="flex items-center justify-around p-2">
        {mobileNavLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center p-2 rounded-xl transition-all w-16
              ${isActive ? 'text-primary' : 'text-slate-500 hover:text-dark'}
            `}
          >
            {link.icon}
            <span className="text-[10px] font-medium mt-1">{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default DashboardMobileNav;
