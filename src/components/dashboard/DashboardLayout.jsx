import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  FiSettings, 
  FiShoppingBag, 
  FiMapPin, 
  FiHeart, 
  FiUser, 
  FiLock, 
  FiBell, 
  FiMessageCircle,
  FiLogOut,
  FiX
} from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import DashboardMobileNav from './DashboardMobileNav';
import WhatsAppFloatingBtn from '../common/WhatsAppFloatingBtn';

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

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20 lg:pb-0 flex flex-col">
      <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
      
      <div className="container mx-auto px-4 lg:px-8 flex-grow py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar />
          
          {/* Main Content Area */}
          <main className="w-full lg:flex-grow">
            {/* The Outlet renders the child routes like MyAccount, Profile, etc. */}
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <DashboardMobileNav />

      {/* WhatsApp Floating Button */}
      <WhatsAppFloatingBtn />

      {/* Mobile Drawer */}
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-dark/20 backdrop-blur-sm z-50 transition-opacity lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
              D
            </div>
            <div>
              <h3 className="font-bold text-dark text-sm">Deepika</h3>
              <p className="text-slate-500 text-xs">View Profile</p>
            </div>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-slate-400 hover:text-dark hover:bg-slate-50 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4 flex flex-col gap-1 overflow-y-auto flex-grow">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary font-bold' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-dark font-medium'
              }`}
            >
              <div className="opacity-80">{link.icon}</div>
              {link.name}
            </NavLink>
          ))}
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

export default DashboardLayout;
