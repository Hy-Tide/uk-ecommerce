import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiSend,
  FiTruck,
  FiShield,
  FiCheckCircle,
  FiClock,
  FiGlobe
} from 'react-icons/fi';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-slate-300 relative pt-0 border-t border-primary-dark">

      {/* Top Value Banner */}
      {/* <div className="bg-white border-b border-slate-200/80 py-6 shadow-xs">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3EB] text-[#FF6B00] flex items-center justify-center text-xl flex-shrink-0 border border-[#FF6B00]/10">
              <FiTruck />
            </div>
            <div>
              <h5 className="font-bold text-[#0C3823] text-xs md:text-sm">Free UK Express Shipping</h5>
              <p className="text-[11px] text-slate-500">On all orders over €45</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5ED] text-[#0C3823] flex items-center justify-center text-xl flex-shrink-0 border border-[#0C3823]/10">
              <FiCheckCircle />
            </div>
            <div>
              <h5 className="font-bold text-[#0C3823] text-xs md:text-sm">100% Authentic Indian</h5>
              <p className="text-[11px] text-slate-500">Sourced directly from India</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl flex-shrink-0 border border-amber-200">
              <FiShield />
            </div>
            <div>
              <h5 className="font-bold text-[#0C3823] text-xs md:text-sm">Encrypted & Safe Checkout</h5>
              <p className="text-[11px] text-slate-500">Card, Apple Pay, PayPal</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3EB] text-[#FF6B00] flex items-center justify-center text-xl flex-shrink-0 border border-[#FF6B00]/10">
              <FiClock />
            </div>
            <div>
              <h5 className="font-bold text-[#0C3823] text-xs md:text-sm">24/7 Dedicated Support</h5>
              <p className="text-[11px] text-slate-500">Fast WhatsApp & Email help</p>
            </div>
          </div>

        </div>
      </div> */}

      {/* Main Footer Section */}
      <div className="pt-14 pb-10">
        <div className="container">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

            {/* Column 1: Brand Info & Socials */}
            <div className="lg:col-span-1">
              <Link to={ROUTES.HOME} className="flex items-center gap-3 mb-4 group">
                <div className="bg-white p-1.5 rounded-2xl flex items-center justify-center shadow-xs border border-slate-200">
                  <img
                    src="/images/logo.png"
                    alt="Grandma's Basket"
                    className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-black text-white tracking-tight">Grandma's Basket</span>
                  <span className="text-[9px] text-secondary-light font-bold uppercase tracking-[0.2em] -mt-0.5">Fresh & Local</span>
                </div>
              </Link>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Bringing authentic Indian groceries, regional spices, aromatic basmati rice, organic dals, and traditional mithai directly to your doorstep across the UK.
              </p>

              <div className="flex items-center gap-2.5">
                <a href="#" className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-xs">
                  <FaInstagram size={15} />
                </a>
                <a href="#" className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-xs">
                  <FaFacebookF size={15} />
                </a>
                <a href="#" className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-xs">
                  <FaTwitter size={15} />
                </a>
                <a href="#" className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-xs">
                  <FaYoutube size={15} />
                </a>
              </div>
            </div>

            {/* Column 2: Department / Shop */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 border-l-2 border-secondary pl-3">
                Categories
              </h4>
              <ul className="flex flex-col gap-3 text-xs font-medium text-slate-300">
                <li><Link to={ROUTES.SHOP} className="hover:text-secondary-light transition-colors">Rice & Atta Flours</Link></li>
                <li><Link to="/shop" className="hover:text-secondary-light transition-colors">Authentic Spices & Masalas</Link></li>
                <li><Link to="/shop" className="hover:text-secondary-light transition-colors">Sweets & Mithai</Link></li>
                <li><Link to="/shop" className="hover:text-secondary-light transition-colors">Crispy Snacks & Namkeen</Link></li>
                <li><Link to="/shop" className="hover:text-secondary-light transition-colors">Frozen Indian Delicacies</Link></li>
                <li><Link to={ROUTES.BRANDS} className="hover:text-secondary-light transition-colors">All Popular Brands</Link></li>
              </ul>
            </div>

            {/* Column 3: Customer Care */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 border-l-2 border-secondary pl-3">
                Customer Care
              </h4>
              <ul className="flex flex-col gap-3 text-xs font-medium text-slate-300">
                <li><Link to={ROUTES.TRACK_ORDER} className="hover:text-secondary-light transition-colors">Track Order Status</Link></li>
                <li><Link to="/delivery" className="hover:text-secondary-light transition-colors">Delivery & Shipping Info</Link></li>
                <li><Link to="/returns" className="hover:text-secondary-light transition-colors">Returns & Refunds</Link></li>
                <li><Link to={ROUTES.SUPPORT} className="hover:text-secondary-light transition-colors">FAQ & Help Center</Link></li>
                <li><Link to={ROUTES.CONTACT} className="hover:text-secondary-light transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            {/* Column 4: Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 border-l-2 border-secondary pl-3">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3 text-xs font-medium text-slate-300">
                <li><Link to={ROUTES.ABOUT} className="hover:text-secondary-light transition-colors">About Grandma's Basket</Link></li>
                <li><Link to={ROUTES.RECIPES} className="hover:text-secondary-light transition-colors">Indian Recipe Corner</Link></li>
                <li><Link to={ROUTES.BLOG} className="hover:text-secondary-light transition-colors">Kitchen & Cooking Blog</Link></li>
                <li><Link to="/privacy" className="hover:text-secondary-light transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-secondary-light transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Column 5: Newsletter & Contact Box */}
            <div className="lg:col-span-1">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 border-l-2 border-secondary pl-3">
                Join Newsletter
              </h4>
              <p className="text-xs text-slate-300 mb-4">
                Subscribe for secret offers, discounts & fresh recipes.
              </p>

              <form className="flex flex-col gap-2.5 mb-6">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 px-4 py-2.5 rounded-xl outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all text-xs shadow-xs"
                />
                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary-light text-white font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-sm active:scale-95"
                >
                  <FiSend size={13} /> Subscribe Now
                </button>
              </form>

              <div className="flex flex-col gap-2 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2.5 text-white font-bold">
                  <FiPhone size={14} className="text-secondary" />
                  <span>+44 7700 900000</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <FiMail size={14} className="text-slate-400" />
                  <span>support@grandmasbasket.co.uk</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <FiMapPin size={14} className="text-slate-400" />
                  <span>London, United Kingdom</span>
                </div>
              </div>
            </div>

          </div>
          {/* Bottom Copyright */}
          <div className="border-t border-white/10 pt-6 mt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-center sm:text-left">
              <p>
                &copy; 2025 Grandma's Basket Ltd. All rights reserved.
              </p>
              <span className="hidden sm:inline text-slate-500">|</span>
              <div className="flex items-center gap-1 flex-wrap justify-center sm:justify-start">
                <span className="font-medium text-slate-400">Designed & Developed by</span>
                <a
                  href="https://www.hytide.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white hover:text-secondary-light transition-colors"
                  title="HYTIDE Technology - www.hytide.in"
                >
                  hytide.in
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/cookie" className="hover:text-white transition-colors">Cookie Preferences</Link>
            </div>
          </div>

        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 group flex items-center">
        <div className="bg-white text-[#0C3823] text-xs font-bold px-3.5 py-2 rounded-full shadow-xl border border-slate-100 mr-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
          Chat with us on WhatsApp
        </div>
        <a
          href="https://wa.me/447700900000"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        >
          <FaWhatsapp size={28} />
        </a>
      </div>

    </footer>
  );
};

export default Footer;
