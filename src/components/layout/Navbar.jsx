import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiChevronDown, FiChevronRight, FiMenu, FiX } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { ROUTES } from '../../utils/constants';
import { shopDropdownData } from '../../data/dummyData';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    if (openAccordion === id) setOpenAccordion(null);
    else setOpenAccordion(id);
  };

  return (
    <>
      {/* Mobile Toggle Button (Visible only on mobile below the header) */}
      <div className="bg-[#1a1f26] text-white p-3 lg:hidden flex items-center justify-between">
        <span className="font-bold text-sm">Browse Categories</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1">
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <nav className={`bg-[#1a1f26] border-b-[3px] border-primary sticky top-0 z-30 ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="container lg:flex items-center justify-between">
        
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
          
          {/* Shop Menu - Dropdown on Desktop, Accordion on Mobile */}
          <li className="relative group lg:border-none border-b border-slate-700/50">
            {/* Desktop View Trigger */}
            <NavLink 
              to={ROUTES.SHOP}
              className={({ isActive }) => `hidden lg:flex items-center gap-1 py-4 px-5 text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Shop <FiChevronDown size={14} className="text-slate-400 group-hover:text-white transition-transform group-hover:rotate-180" />
            </NavLink>

            {/* Mobile View Trigger */}
            <div 
              className="lg:hidden flex items-center justify-between py-4 px-5 text-sm font-bold text-slate-300 hover:text-white cursor-pointer"
              onClick={() => toggleAccordion('shop')}
            >
              <span>Shop</span>
              <FiChevronDown size={18} className={`transition-transform duration-300 ${openAccordion === 'shop' ? 'rotate-180 text-white' : 'text-slate-400'}`} />
            </div>
            
            {/* Desktop Mega Menu Dropdown */}
            <div className="hidden lg:block absolute top-full left-0 w-64 bg-white border border-slate-100 shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 mt-1">
              <div className="py-2">
                {shopDropdownData.map(cat => (
                  <div key={cat.id} className="group/cat relative">
                    <div className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 cursor-pointer transition-colors text-dark group-hover/cat:text-primary">
                      <span className="font-bold text-sm">{cat.name}</span>
                      <FiChevronRight size={16} className="text-slate-400 group-hover/cat:text-primary" />
                    </div>
                    
                    {/* Second level - Product */}
                    <div className="absolute top-0 left-full w-[320px] bg-white border border-slate-100 shadow-xl rounded-xl opacity-0 invisible group-hover/cat:opacity-100 group-hover/cat:visible transition-all duration-300 ml-1">
                      <div className="p-4">
                        <Link to={`${ROUTES.SHOP}?category=${cat.slug}&product=${cat.product.id}`} className="flex items-center gap-4 group/prod hover:bg-slate-50 p-3 rounded-xl transition-colors">
                          <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                            <img src={cat.product.image} alt={cat.product.name} className="w-full h-full object-contain drop-shadow-sm group-hover/prod:scale-110 transition-transform" />
                          </div>
                          <div className="flex flex-col flex-grow">
                            <span className="font-bold text-dark group-hover/prod:text-primary transition-colors text-sm leading-snug mb-2">{cat.product.name}</span>
                            <span className="text-sm font-black text-primary">£{cat.product.price}</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Accordion Content */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#14181f] ${openAccordion === 'shop' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-5 py-2 flex flex-col gap-2">
                {shopDropdownData.map(cat => (
                  <div key={cat.id} className="border-b border-slate-700/30 last:border-0 py-2">
                    <div 
                      className="flex items-center justify-between py-2 text-slate-300 cursor-pointer"
                      onClick={() => toggleAccordion(`cat-${cat.id}`)}
                    >
                      <span className="font-bold text-sm text-slate-200">{cat.name}</span>
                      <FiChevronDown size={16} className={`transition-transform duration-300 ${openAccordion === `cat-${cat.id}` ? 'rotate-180 text-primary' : 'text-slate-500'}`} />
                    </div>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${openAccordion === `cat-${cat.id}` ? 'max-h-[200px] mt-2 mb-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <Link 
                        to={`${ROUTES.SHOP}?category=${cat.slug}&product=${cat.product.id}`}
                        className="flex items-center gap-3 bg-[#1a1f26] p-3 rounded-lg border border-slate-700/50"
                      >
                        <img src={cat.product.image} alt={cat.product.name} className="w-12 h-12 object-contain bg-white rounded-md p-1" />
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-white line-clamp-1">{cat.product.name}</span>
                          <span className="text-xs font-bold text-primary mt-1">£{cat.product.price}</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
        <div className="hidden lg:block h-full">
          <Link to={ROUTES.TRACK_ORDER} className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm h-full flex items-center gap-2 px-8 py-4 transition-colors">
            <FaMapMarkerAlt />
            Track My Order
          </Link>
        </div>

      </div>
    </nav>
    </>
  );
};

export default Navbar;
