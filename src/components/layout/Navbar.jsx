import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';
import { ROUTES } from '../../utils/constants';

const megaMenuData = {
  columns: [
    [
      {
        title: "RICE & GRAINS",
        items: [
          { name: "Basmati Rice", badge: { text: "Hot", color: "orange" } },
          { name: "Non-Basmati Rice" },
          { name: "Sona Masoori" },
          { name: "Broken Rice" },
          { name: "Poha / Flattened Rice", badge: { text: "New", color: "green" } },
          { name: "Brown Rice" }
        ]
      },
      {
        title: "PULSES & LENTILS",
        items: [
          { name: "Toor Dal" },
          { name: "Moong Dal" },
          { name: "Chana Dal" },
          { name: "Masoor Dal" },
          { name: "Urad Dal" },
          { name: "Rajma (Kidney Beans)" },
          { name: "Chickpeas / Kabuli Chana" }
        ]
      }
    ],
    [
      {
        title: "SPICES & MASALA",
        items: [
          { name: "Whole Spices", badge: { text: "Sale", color: "orange" } },
          { name: "Powdered Spices" },
          { name: "Blended Masala" },
          { name: "Organic Spices", badge: { text: "New", color: "green" } },
          { name: "Regional Masalas" },
          { name: "Food Colouring" }
        ]
      },
      {
        title: "FLOUR & SEMOLINA",
        items: [
          { name: "Atta (Wheat Flour)", badge: { text: "Hot", color: "orange" } },
          { name: "Besan (Gram Flour)" },
          { name: "Maida (Plain Flour)" },
          { name: "Suji / Semolina" },
          { name: "Rice Flour" },
          { name: "Ragi / Millet Flour", badge: { text: "New", color: "green" } }
        ]
      }
    ],
    [
      {
        title: "COOKING OIL",
        items: [
          { name: "Sunflower Oil" },
          { name: "Mustard Oil", badge: { text: "Hot", color: "orange" } },
          { name: "Coconut Oil" },
          { name: "Groundnut Oil" },
          { name: "Pure Desi Ghee", badge: { text: "Sale", color: "orange" } },
          { name: "Sesame / Til Oil" }
        ]
      },
      {
        title: "SUGAR & SWEETENERS",
        items: [
          { name: "Cane Sugar" },
          { name: "Jaggery / Gur" },
          { name: "Brown Sugar" },
          { name: "Honey" },
          { name: "Mishri (Rock Sugar)", badge: { text: "New", color: "green" } }
        ]
      }
    ],
    [
      {
        title: "SNACKS & SWEETS",
        items: [
          { name: "Biscuits & Cookies" },
          { name: "Namkeen & Savouries" },
          { name: "Chocolates & Candies" },
          { name: "Indian Sweets", badge: { text: "Hot", color: "orange" } }
        ]
      },
      {
        title: "BEVERAGES",
        items: [
          { name: "Tea" },
          { name: "Coffee" },
          { name: "Fruit Juices", badge: { text: "New", color: "green" } },
          { name: "Health Drinks" }
        ]
      }
    ]
  ]
};

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
                Categories <FiChevronDown size={14} className="text-slate-400 group-hover:text-white transition-transform group-hover:rotate-180" />
              </div>

              {/* Mobile View Trigger */}
              <div
                className="lg:hidden flex items-center justify-between py-4 px-5 text-sm font-bold text-slate-300 hover:text-white cursor-pointer"
                onClick={() => toggleAccordion('shop')}
              >
                <span>Categories</span>
                <FiChevronDown size={18} className={`transition-transform duration-300 ${openAccordion === 'shop' ? 'rotate-180 text-white' : 'text-slate-400'}`} />
              </div>

              {/* Desktop Mega Menu Dropdown */}
              <div className="hidden lg:block absolute top-[100%] left-0 w-[950px] bg-white border border-slate-100 shadow-2xl rounded-b-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-6">

                  {/* Columns */}
                  <div className="grid grid-cols-4 gap-x-6">
                    {megaMenuData.columns.map((column, colIdx) => (
                      <div key={colIdx} className="flex flex-col gap-6">
                        {column.map((category, catIdx) => (
                          <div key={catIdx} className="flex flex-col">
                            <h3 className="font-bold text-[#379c6b] text-xs uppercase tracking-wider mb-2 pb-1.5 border-b border-slate-100">
                              {category.title}
                            </h3>
                            <ul className="flex flex-col gap-2">
                              {category.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link to={ROUTES.SHOP} className="group flex items-center gap-2 w-fit">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-slate-700 transition-colors"></span>
                                    <span className="text-[14px] text-slate-600 group-hover:text-slate-700 transition-colors">
                                      {item.name}
                                    </span>
                                    {item.badge && (
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.badge.color === 'orange' ? 'bg-slate-100 text-slate-700' : 'bg-[#e8f5ed] text-[#379c6b]'
                                        }`}>
                                        {item.badge.text}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Accordion Content */}
              <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#14181f] ${openAccordion === 'shop' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 py-4 flex flex-col gap-5">
                  {megaMenuData.columns.flat().map((category, index) => (
                    <div key={index} className="flex flex-col">
                      <Link to={ROUTES.SHOP} className="font-bold text-primary text-xs uppercase tracking-wider mb-2">
                        {category.title}
                      </Link>
                      <ul className="flex flex-col gap-2">
                        {category.items.map((item, idx) => (
                          <li key={idx}>
                            <Link to={ROUTES.SHOP} className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white cursor-pointer group">
                              <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-white transition-colors"></span>
                              {item.name}
                              {item.badge && (
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm ${item.badge.color === 'orange' ? 'bg-slate-700 text-white' : 'bg-green-500/20 text-green-400'
                                  }`}>
                                  {item.badge.text}
                                </span>
                              )}
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
