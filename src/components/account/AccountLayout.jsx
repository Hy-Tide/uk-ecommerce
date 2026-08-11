import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiUser, FiMapPin, FiShoppingBag, FiLogOut, FiHeart, FiSettings } from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';
import Breadcrumbs from '../common/Breadcrumbs';

const sidebarLinks = [
  { name: 'Dashboard', path: ROUTES.ACCOUNT, icon: <FiSettings className="w-5 h-5" /> },
  { name: 'My Profile', path: ROUTES.PROFILE, icon: <FiUser className="w-5 h-5" /> },
  { name: 'My Orders', path: ROUTES.ORDERS, icon: <FiShoppingBag className="w-5 h-5" /> },
  { name: 'Address Book', path: ROUTES.ADDRESSES, icon: <FiMapPin className="w-5 h-5" /> },
  { name: 'Wishlist', path: ROUTES.WISHLIST, icon: <FiHeart className="w-5 h-5" /> },
];

const AccountLayout = ({ children, title, breadcrumbs }) => {
  const location = useLocation();

  return (
    <div className="bg-[#fcfbf9] min-h-screen py-8">
      <div className="container">
        <Breadcrumbs paths={[{ name: 'Home', url: '/' }, ...breadcrumbs]} />
        
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-100 text-primary flex items-center justify-center text-xl font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-bold text-dark text-lg">John Doe</h3>
                  <p className="text-slate-500 text-sm">john.doe@example.com</p>
                </div>
              </div>
              <nav className="p-4 flex flex-col gap-1">
                {sidebarLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive 
                          ? 'bg-primary-100 text-primary font-bold' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-dark font-medium'
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </NavLink>
                  );
                })}
                <div className="my-2 border-t border-slate-100" />
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-colors text-left">
                  <FiLogOut className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:flex-grow">
            <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-dark mb-6">{title}</h1>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
