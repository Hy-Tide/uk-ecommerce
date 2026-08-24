import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTag, FiBookOpen, FiEdit3, FiPhoneCall, FiShield, FiStar, FiZap, FiCheckCircle } from 'react-icons/fi';
import { ROUTES } from '../utils/constants';
import Newsletter from '../components/home/Newsletter';

const Explore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const exploreItems = [
    {
      id: 'offers',
      title: 'Exclusive Offers & Discounts',
      subtitle: 'SPECIAL DEALS & SAVINGS',
      description: 'Save big on authentic Indian groceries, daily essentials, and seasonal promotional bundles.',
      buttonText: 'View All Offers',
      url: ROUTES.OFFERS || '/offers',
      bg: 'bg-gradient-to-r from-[#034C28] via-[#046B39] to-[#023E20]',
      textColor: 'text-white',
      badgeColor: 'text-[#F9E054]',
      btnStyle: 'bg-white text-[#034C28] hover:bg-slate-100',
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80',
      icon: <FiTag className="text-[#FF6B00] text-3xl" />,
      minHeight: 'min-h-[280px]',
    },
    {
      id: 'recipes',
      title: 'Authentic Indian Recipes',
      subtitle: "CHEF'S SPECIAL CORNER",
      description: 'Discover traditional curry, spice blend, and sweet dish recipes crafted by culinary experts.',
      buttonText: 'Explore Recipes',
      url: ROUTES.RECIPES || '/recipes',
      bg: 'bg-[#FF6B00]',
      textColor: 'text-white',
      badgeColor: 'text-[#FFE600]',
      btnStyle: 'bg-white text-[#FF6B00] hover:bg-slate-100',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
      icon: <FiBookOpen className="text-[#FF6B00] text-3xl" />,
      minHeight: 'min-h-[280px]',
    },
    {
      id: 'blog',
      title: 'Grocery Tips & Stories',
      subtitle: 'INSIGHTS & GUIDES',
      description: 'Read informative articles on health benefits, cooking guides, and spice origin stories.',
      buttonText: 'Read Blog',
      url: ROUTES.BLOG || '/blog',
      bg: 'bg-[#700B0B]',
      textColor: 'text-white',
      badgeColor: 'text-[#FF9E9E]',
      btnStyle: 'bg-white text-[#700B0B] hover:bg-slate-100',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
      icon: <FiEdit3 className="text-[#FF6B00] text-3xl" />,
      minHeight: 'min-h-[240px]',
    },
    {
      id: 'contact',
      title: 'Customer Care & Support',
      subtitle: 'GET IN TOUCH',
      description: 'Need help with your order or product inquiries? Our store support team is here to assist.',
      buttonText: 'Contact Support',
      url: ROUTES.CONTACT || '/contact',
      bg: 'bg-[#F9E054]',
      textColor: 'text-[#0C3823]',
      badgeColor: 'text-[#FF6B00]',
      btnStyle: 'bg-[#0C3823] text-white hover:bg-[#08291a]',
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=600&q=80',
      icon: <FiPhoneCall className="text-[#FF6B00] text-3xl" />,
      minHeight: 'min-h-[240px]',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">

      {/* 1. HERO SECTION (Identical design to Home Page HeroBanner) */}
      <section className="relative w-full min-h-[500px] md:min-h-[580px] flex flex-col justify-center overflow-hidden bg-[#1D3B2A]">
        {/* Background Image & Editorial Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000"
            alt="Explore Hero"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1D3B2A]/95 via-[#1D3B2A]/85 to-[#1D3B2A]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D3B2A]/95 via-transparent to-[#1D3B2A]/40"></div>
        </div>

        <div className="container relative z-10 px-4 pt-16 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8">

              {/* Small Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-[#FF8A00]/20 backdrop-blur-md border border-[#FF8A00]/30 text-[#FF8A00] px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse"></span>
                QUICK ACCESS DIRECTORY
              </div>

              {/* Large Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 drop-shadow-md tracking-tight">
                Explore <span className="text-[#FF8A00]">Deals, Recipes</span>, Stories & Support
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-2xl font-medium">
                Navigate directly to our latest promotions, authentic recipe collections, food articles, and store support services.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <Link
                  to={ROUTES.OFFERS || '/offers'}
                  className="bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold text-base px-8 py-4 rounded-[16px] shadow-[0_8px_20px_rgba(46,139,87,0.4)] hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
                >
                  View Offers <FiArrowRight size={18} />
                </Link>
                <Link
                  to={ROUTES.RECIPES || '/recipes'}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-base px-8 py-4 rounded-[16px] hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
                >
                  Browse Recipes <FiArrowRight size={18} />
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="flex flex-wrap items-center gap-6 md:gap-10 border-t border-white/10 pt-6 text-white/90 font-bold text-sm">
                <div className="flex items-center gap-2.5">
                  <FiShield className="text-[#FF8A00] text-lg" />
                  <span>100% Authentic Products</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiZap className="text-[#FF8A00] text-lg" />
                  <span>One-Click Navigation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiStar className="text-[#FF8A00] text-lg" />
                  <span>4.9★ Customer Choice</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. PROMO GRID SECTION (Identical design & 2x2 layout to Home Page PromoBanners) */}
      <section className="py-12 bg-[#F8F9FA]">
        <div className="container flex flex-col gap-6">

          {/* Section Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl md:text-3xl font-black text-[#0C3823] tracking-tight">
              Featured Sections & Services
            </h2>
            <span className="text-[#FF6B00] font-bold text-xs md:text-sm inline-flex items-center gap-1.5">
              4 Quick Shortcuts <FiCheckCircle size={16} />
            </span>
          </div>

          {/* Top Row: 7-col + 5-col grid cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Card 1: Offers */}
            <div className={`lg:col-span-7 ${exploreItems[0].bg} rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between ${exploreItems[0].minHeight} shadow-sm group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="relative z-10 max-w-sm">
                <span className={`${exploreItems[0].badgeColor} text-xs font-black uppercase tracking-wider block mb-3`}>
                  {exploreItems[0].subtitle}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-black leading-snug mb-4">
                  {exploreItems[0].title}
                </h3>
                <p className="text-white/80 text-xs md:text-sm font-medium mb-6 leading-relaxed">
                  {exploreItems[0].description}
                </p>
                <Link
                  to={exploreItems[0].url}
                  className={`inline-flex items-center gap-2 ${exploreItems[0].btnStyle} font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl transition-all shadow-sm group-hover:scale-105`}
                >
                  {exploreItems[0].buttonText} <FiArrowRight size={14} />
                </Link>
              </div>
              <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-end overflow-hidden pointer-events-none">
                <img
                  src={exploreItems[0].image}
                  alt={exploreItems[0].title}
                  className="w-full h-full object-cover rounded-r-3xl opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card 2: Recipes */}
            <div className={`lg:col-span-5 ${exploreItems[1].bg} rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between ${exploreItems[1].minHeight} shadow-sm ${exploreItems[1].textColor} group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="relative z-10 max-w-xs">
                <span className={`${exploreItems[1].badgeColor} text-xs font-black uppercase tracking-wider block mb-2`}>
                  {exploreItems[1].subtitle}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-black leading-snug mb-3">
                  {exploreItems[1].title}
                </h3>
                <p className="text-white/90 text-xs font-medium mb-6 leading-relaxed">
                  {exploreItems[1].description}
                </p>
                <Link
                  to={exploreItems[1].url}
                  className={`inline-flex items-center gap-2 ${exploreItems[1].btnStyle} font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl transition-all shadow-sm group-hover:scale-105`}
                >
                  {exploreItems[1].buttonText} <FiArrowRight size={14} />
                </Link>
              </div>
              <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-end overflow-hidden pointer-events-none">
                <img
                  src={exploreItems[1].image}
                  alt={exploreItems[1].title}
                  className="w-full h-full object-cover rounded-r-3xl opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>

          {/* Bottom Row: 6-col + 6-col grid cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Card 3: Blog */}
            <div className={`lg:col-span-6 ${exploreItems[2].bg} rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between ${exploreItems[2].minHeight} shadow-sm ${exploreItems[2].textColor} group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="relative z-10 max-w-xs">
                <span className={`${exploreItems[2].badgeColor} text-xs font-black uppercase tracking-wider block mb-2`}>
                  {exploreItems[2].subtitle}
                </span>
                <h3 className="text-white text-xl md:text-2xl font-black leading-snug mb-3">
                  {exploreItems[2].title}
                </h3>
                <p className="text-white/85 text-xs font-medium mb-6 leading-relaxed">
                  {exploreItems[2].description}
                </p>
                <Link
                  to={exploreItems[2].url}
                  className={`inline-flex items-center gap-2 ${exploreItems[2].btnStyle} font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl transition-all shadow-sm group-hover:scale-105`}
                >
                  {exploreItems[2].buttonText} <FiArrowRight size={14} />
                </Link>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end overflow-hidden pointer-events-none">
                <img
                  src={exploreItems[2].image}
                  alt={exploreItems[2].title}
                  className="w-full h-full object-cover rounded-r-3xl opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card 4: Contact */}
            <div className={`lg:col-span-6 ${exploreItems[3].bg} rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between ${exploreItems[3].minHeight} shadow-sm ${exploreItems[3].textColor} group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <div className="relative z-10 max-w-xs">
                <div className="inline-block bg-white/80 text-[#FF6B00] text-xs font-black px-3 py-1 rounded-xl mb-3 shadow-xs uppercase tracking-wider">
                  {exploreItems[3].subtitle}
                </div>
                <h3 className="text-[#0C3823] text-xl md:text-2xl font-black leading-snug mb-3">
                  {exploreItems[3].title}
                </h3>
                <p className="text-[#0C3823]/80 text-xs font-medium mb-6 leading-relaxed">
                  {exploreItems[3].description}
                </p>
                <Link
                  to={exploreItems[3].url}
                  className={`inline-flex items-center gap-2 ${exploreItems[3].btnStyle} font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl transition-all shadow-sm group-hover:scale-105`}
                >
                  {exploreItems[3].buttonText} <FiArrowRight size={14} />
                </Link>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end overflow-hidden pointer-events-none">
                <img
                  src={exploreItems[3].image}
                  alt={exploreItems[3].title}
                  className="w-full h-full object-cover rounded-r-3xl opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. DIRECTORY GRID SECTION (Identical design to Home Page CategorySection) */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-[#0C3823] tracking-tight">
              Explore All 4 Navigation Hubs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exploreItems.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className="bg-[#F8F9FA] rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#FF6B00]/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 border border-slate-100">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-black uppercase text-[#FF6B00] tracking-wider block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0C3823] mb-3 group-hover:text-[#FF6B00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-black text-[#0C3823] group-hover:text-[#FF6B00] transition-colors">
                  <span>Explore Now</span>
                  <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 4. NEWSLETTER (Identical to Home Page Newsletter) */}
      <div className="mt-8">
        <Newsletter />
      </div>

    </div>
  );
};

export default Explore;
