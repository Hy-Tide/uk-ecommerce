import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { ROUTES } from '../../utils/constants';

const Navbar = () => {
  return (
    <nav className="bg-[#1a1f26] border-b-[3px] border-primary sticky top-0 z-30 hidden lg:block">
      <div className="container flex items-center justify-between">
        
        {/* Navigation Links */}
        <ul className="flex items-center">
          <li>
            <NavLink 
              to={ROUTES.HOME}
              className={({ isActive }) => `block py-4 px-5 text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Home
            </NavLink>
          </li>
          
          <li className="relative group">
            <NavLink 
              to={ROUTES.SHOP}
              className={({ isActive }) => `flex items-center gap-1 py-4 px-5 text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Shop <FiChevronDown size={14} className="text-slate-400 group-hover:text-white transition-colors" />
            </NavLink>
          </li>

          <li>
            <NavLink 
              to={ROUTES.BRANDS}
              className={({ isActive }) => `block py-4 px-5 text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Brands
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/offers"
              className={({ isActive }) => `flex items-center gap-1.5 py-4 px-5 text-sm font-bold transition-colors ${isActive ? 'text-orange-500' : 'text-orange-400 hover:text-orange-300'}`}
            >
              <BsStars /> Offers
            </NavLink>
          </li>

          <li>
            <NavLink 
              to={ROUTES.RECIPES}
              className={({ isActive }) => `block py-4 px-5 text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Recipes
            </NavLink>
          </li>

          <li>
            <NavLink 
              to={ROUTES.BLOG}
              className={({ isActive }) => `block py-4 px-5 text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Blog
            </NavLink>
          </li>

          <li>
            <NavLink 
              to={ROUTES.ABOUT}
              className={({ isActive }) => `block py-4 px-5 text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink 
              to={ROUTES.CONTACT}
              className={({ isActive }) => `block py-4 px-5 text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Right Action */}
        <Link to={ROUTES.TRACK_ORDER} className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm h-full flex items-center gap-2 px-8 py-4 transition-colors">
          <FaMapMarkerAlt />
          Track My Order
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
