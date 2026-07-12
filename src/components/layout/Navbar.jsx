import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { ROUTES } from '../../utils/constants';

const megaMenuData = [
  {
    title: "Multi Stores",
    items: ["Ceylon Stores", "Keralam Stores", "Mango Stores", "Millet Stores", "Kitchenware Stores"]
  },
  {
    title: "Vegetables & Fruits",
    items: ["Vegetables", "Leafy Vegetables", "Root Vegetables", "Fresh Fruits", "Dosa Batter", "Paneer"]
  },
  {
    title: "Fresh Sea-Foods & Halal Meat",
    items: ["Fresh Sea-Foods", "Fresh Halal Meat", "Dry Fish"]
  },
  {
    title: "Frozen Products",
    items: ["Frozen Chappati", "Frozen Parotta", "Frozen Coconuts", "Frozen Vegetables", "Frozen Foods", "Frozen Sea-Foods", "Frozen Sweets & Snacks"]
  },
  {
    title: "Health & Beauty",
    items: ["Medicines", "Herbal Care & Oils", "Soaps & Shampoo", "Toothpaste", "Fancy Accessories", "Juices"]
  },
  {
    title: "Pooja Essentials",
    items: ["Poojawares", "Pooja Items"]
  },
  {
    title: "Sweets, Snacks & Biscuits",
    items: ["Biscuits & Rusks", "Cakes & Chutneys"]
  },
  {
    title: "Kitchenwares",
    items: ["Stainless Steel Cookwares", "Wet Grinder & Mixer"]
  },
  {
    title: "Spices & Masalas",
    items: ["Masala Powders", "Spices"]
  },
  {
    title: "Bio Plates & Cups",
    items: ["Palm Leaf Plates", "Palm Leaf Bowls & Cups"]
  }
];

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
        <ul className="flex flex-col lg:flex-row lg:items-center w-full lg:w-auto">
          <li>
            <NavLink 
              to={ROUTES.HOME}
              className={({ isActive }) => `block py-4 px-5 text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Home
            </NavLink>
          </li>
          
          {/* Shop Mega Menu */}
          <li className="relative group lg:border-none border-b border-slate-700/50">
            {/* Desktop View Trigger */}
            <div className="hidden lg:flex items-center gap-1 py-4 px-5 text-sm font-bold transition-colors text-slate-300 hover:text-white cursor-pointer">
              Shop <FiChevronDown size={14} className="text-slate-400 group-hover:text-white transition-transform group-hover:rotate-180" />
            </div>

            {/* Mobile View Trigger */}
            <div 
              className="lg:hidden flex items-center justify-between py-4 px-5 text-sm font-bold text-slate-300 hover:text-white cursor-pointer"
              onClick={() => toggleAccordion('shop')}
            >
              <span>Shop</span>
              <FiChevronDown size={18} className={`transition-transform duration-300 ${openAccordion === 'shop' ? 'rotate-180 text-white' : 'text-slate-400'}`} />
            </div>
            
            {/* Desktop Mega Menu Dropdown */}
            <div className="hidden lg:block absolute top-[100%] left-0 w-[950px] bg-white border border-slate-100 shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="p-8">
                <div className="grid grid-cols-5 gap-y-10 gap-x-6">
                  {megaMenuData.map((category, index) => (
                    <div key={index} className="flex flex-col">
                      <Link to={ROUTES.SHOP} className="font-bold text-[#1a5d2b] text-[15px] mb-4 hover:text-primary transition-colors">
                        {category.title}
                      </Link>
                      <ul className="flex flex-col gap-2.5">
                        {category.items.map((item, idx) => (
                          <li key={idx}>
                            <Link to={ROUTES.SHOP} className="block text-[13px] font-medium text-slate-600 hover:text-primary transition-colors cursor-pointer">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Accordion Content */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#14181f] ${openAccordion === 'shop' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-5 py-4 flex flex-col gap-6">
                {megaMenuData.map((category, index) => (
                  <div key={index} className="flex flex-col">
                    <Link to={ROUTES.SHOP} className="font-bold text-primary mb-3">
                      {category.title}
                    </Link>
                    <ul className="flex flex-col gap-2">
                      {category.items.map((item, idx) => (
                        <li key={idx}>
                          <Link to={ROUTES.SHOP} className="block text-sm text-slate-300 hover:text-white cursor-pointer">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
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
              to={ROUTES.CONTACT}
              className={({ isActive }) => `block py-4 px-5 text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
