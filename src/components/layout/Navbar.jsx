import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiMail
} from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';
import { getData } from '../../services/webservices';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [navData, setNavData] = useState({ categories: [], brands: [], offers: [], recipes: [], blogCategories: [], contactInfo: {} });

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const response = await getData('website/navigation');
        if (response.success) {
          setNavData(response.data);
        }
      } catch (error) {
        console.error('Error fetching navigation data:', error);
      }
    };
    fetchNavigation();
  }, []);

  const toggleAccordion = (id) => {
    if (openAccordion === id) setOpenAccordion(null);
    else setOpenAccordion(id);
  };

  // Helper to chunk categories into 4 columns for desktop
  const chunkArray = (arr, numColumns) => {
    if (!arr || arr.length === 0) return [];
    const result = Array.from({ length: numColumns }, () => []);
    arr.forEach((item, index) => {
      result[index % numColumns].push(item);
    });
    return result;
  };

  const megaMenuColumns = chunkArray(navData.categories, 4);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="bg-[#0C3823] text-white px-4 py-3 lg:hidden flex items-center justify-between shadow-sm">
        <span className="font-bold text-sm">Navigation</span>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      <nav className={`bg-white border-b border-slate-100 py-2.5 sticky top-0 z-30 ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block shadow-xs`}>
        <div className="container relative flex flex-col lg:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-700">

          {/* Left Navigation Links */}
          <ul className="flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-6 w-full lg:w-auto">

            <li>
              <NavLink
                to={ROUTES.HOME}
                className={({ isActive }) => `block py-1.5 px-2 hover:text-[#0C3823] transition-colors ${isActive ? 'text-[#FF6B00] font-bold' : ''}`}
              >
                Home
              </NavLink>
            </li>

            {/* Mega Menu Categories Dropdown */}
            <li className="group lg:border-none border-b border-slate-100">

              {/* Desktop Trigger */}
              <div className="hidden lg:flex items-center gap-1 py-1.5 px-2 hover:text-[#0C3823] cursor-pointer transition-colors font-bold text-[#0C3823]">
                <span>Categories</span>
                <FiChevronDown size={14} className="text-slate-400 group-hover:text-[#0C3823] transition-transform duration-300 group-hover:rotate-180" />
              </div>

              {/* Mobile Trigger */}
              <div
                className="lg:hidden flex items-center justify-between py-2 px-2 hover:text-[#0C3823] cursor-pointer font-bold"
                onClick={() => toggleAccordion('shop')}
              >
                <span>Categories</span>
                <FiChevronDown size={16} className={`transition-transform duration-300 ${openAccordion === 'shop' ? 'rotate-180 text-[#FF6B00]' : 'text-slate-400'}`} />
              </div>

              {/* Desktop Mega Menu Dropdown (Centered 4-Column Design) */}
              <div className="hidden lg:block absolute top-[100%] left-1/2 -translate-x-1/2 w-[1080px] xl:w-[1160px] bg-white border border-slate-100 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 mt-1 p-8">
                <div className="grid grid-cols-4 gap-x-12 gap-y-8">
                  {megaMenuColumns.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-8">
                      {col.map((section, secIdx) => (
                        <div key={secIdx} className="flex flex-col">
                          <Link to={`${ROUTES.SHOP}?category=${section.slug}`} className="font-extrabold text-[#0C3823] text-[13px] uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 hover:text-[#FF6B00] transition-colors">
                            {section.name}
                          </Link>
                          <ul className="flex flex-col gap-2.5">
                            {section.subcategories?.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link
                                  to={`${ROUTES.SHOP}?category=${section.slug}&subcategory=${item.slug}`}
                                  className="block text-[13px] text-slate-600 hover:text-[#0C3823] transition-colors font-medium"
                                >
                                  {item.name}
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

              {/* Mobile Accordion Content */}
              <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-slate-50 rounded-xl mt-2 ${openAccordion === 'shop' ? 'max-h-[2000px] opacity-100 p-4 border border-slate-200' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-5">
                  {navData.categories.map((section, index) => (
                    <div key={index} className="flex flex-col">
                      <Link to={`${ROUTES.SHOP}?category=${section.slug}`} className="font-extrabold text-[#FF6B00] text-xs uppercase tracking-wider mb-2 pb-1 border-b border-slate-200">
                        {section.name}
                      </Link>
                      <ul className="flex flex-col gap-2 pl-2">
                        {section.subcategories?.map((item, idx) => (
                          <li key={idx}>
                            <Link to={`${ROUTES.SHOP}?category=${section.slug}&subcategory=${item.slug}`} className="block text-xs font-medium text-slate-700 hover:text-[#0C3823]">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </li>

            {/* Brands Mega Menu Dropdown */}
            <li className="group lg:border-none border-b border-slate-100">

              {/* Desktop Trigger */}
              <div className="hidden lg:flex items-center gap-1 py-1.5 px-2 hover:text-[#0C3823] cursor-pointer transition-colors font-bold text-[#0C3823]">
                <span>Brands</span>
                <FiChevronDown size={14} className="text-slate-400 group-hover:text-[#0C3823] transition-transform duration-300 group-hover:rotate-180" />
              </div>

              {/* Mobile Trigger */}
              <div
                className="lg:hidden flex items-center justify-between py-2 px-2 hover:text-[#0C3823] cursor-pointer font-bold"
                onClick={() => toggleAccordion('brands')}
              >
                <span>Brands</span>
                <FiChevronDown size={16} className={`transition-transform duration-300 ${openAccordion === 'brands' ? 'rotate-180 text-[#FF6B00]' : 'text-slate-400'}`} />
              </div>

              {/* Desktop Brands Logo Grid Dropdown */}
              <div className="hidden lg:block absolute top-[100%] left-1/2 -translate-x-1/2 w-[1000px] xl:w-[1080px] bg-white border border-slate-100 shadow-2xl rounded-3xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 mt-1 p-8">
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                  {navData.brands.map((brand, idx) => (
                    <Link
                      key={idx}
                      to={`${ROUTES.SHOP}?brand=${brand.slug}`}
                      className="bg-slate-50 hover:bg-white rounded-2xl p-4 flex items-center justify-center h-24 md:h-28 border border-slate-200/60 hover:border-[#0C3823]/40 shadow-2xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group/brand"
                      title={brand.name}
                    >
                      {brand.image_url ? (
                        <img
                          src={brand.image_url}
                          alt={brand.name}
                          className="max-h-16 md:max-h-18 max-w-full object-contain group-hover/brand:scale-110 transition-transform duration-300 drop-shadow-xs"
                        />
                      ) : (
                        <span className={`font-black text-base md:text-lg tracking-tight text-slate-800 group-hover/brand:scale-110 transition-transform duration-300`}>
                          {brand.name}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Accordion Brands Grid */}
              <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-slate-50 rounded-xl mt-2 ${openAccordion === 'brands' ? 'max-h-[2000px] opacity-100 p-4 border border-slate-200' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-3 gap-2">
                  {navData.brands.map((brand, idx) => (
                    <Link
                      key={idx}
                      to={`${ROUTES.SHOP}?brand=${brand.slug}`}
                      className="bg-white rounded-lg p-2 flex items-center justify-center h-12 border border-slate-200 shadow-2xs"
                      title={brand.name}
                    >
                      {brand.image_url ? (
                        <img src={brand.image_url} alt={brand.name} className="max-h-8 max-w-full object-contain" />
                      ) : (
                        <span className={`font-black text-xs text-slate-800`}>
                          {brand.name}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

            </li>

            <li>
              <NavLink
                to="/offers"
                className="flex items-center gap-1 py-1.5 px-2 hover:text-[#0C3823] transition-colors text-[#FF6B00] font-bold"
              >
                Offers
              </NavLink>
            </li>

            <li>
              <NavLink
                to={ROUTES.RECIPES}
                className={({ isActive }) => `block py-1.5 px-2 hover:text-[#0C3823] transition-colors ${isActive ? 'text-[#FF6B00] font-bold' : ''}`}
              >
                Recipes
              </NavLink>
            </li>

            <li>
              <NavLink
                to={ROUTES.BLOG}
                className={({ isActive }) => `block py-1.5 px-2 hover:text-[#0C3823] transition-colors ${isActive ? 'text-[#FF6B00] font-bold' : ''}`}
              >
                Blog
              </NavLink>
            </li>

            <li>
              <NavLink
                to={ROUTES.CONTACT}
                className={({ isActive }) => `block py-1.5 px-2 hover:text-[#0C3823] transition-colors ${isActive ? 'text-[#FF6B00] font-bold' : ''}`}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Right Links & Email Support Button */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-3 lg:mt-0 w-full lg:w-auto justify-end">
            <Link to={ROUTES.SUPPORT || ROUTES.CONTACT} className="text-slate-600 hover:text-[#0C3823] transition-colors">
              Returns
            </Link>
            <Link to={ROUTES.SUPPORT || ROUTES.CONTACT} className="text-slate-600 hover:text-[#0C3823] transition-colors">
              FAQs
            </Link>
            <a
              href={`mailto:${navData.contactInfo?.email || 'hello@grandmasbasket.co.uk'}`}
              className="inline-flex items-center gap-1.5 bg-[#FFF3EB] text-[#FF6B00] hover:bg-[#FFE5D6] font-bold px-3.5 py-1.5 rounded-full transition-colors"
            >
              <FiMail size={14} /> Email support
            </a>
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
