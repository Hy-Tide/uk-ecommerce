import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#0b0c10] pt-20 pb-8 text-slate-300 relative">
      <div className="container">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Column 1: Brand & Social */}
          <div className="lg:col-span-1">
            <Link to={ROUTES.HOME} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#379c6b] rounded-xl flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.5 2a9.5 9.5 0 00-7.85 14.8l-4.5 4.5a1.5 1.5 0 002.1 2.1l4.5-4.5A9.5 9.5 0 1017.5 2zm0 16A6.5 6.5 0 1124 11.5 6.51 6.51 0 0117.5 18z" />
                  <path d="M16 8a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 8z" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-black text-white tracking-tight">UK Groceries</span>
                <span className="text-[9px] text-[#379c6b] font-bold uppercase tracking-[0.2em] -mt-0.5">Fresh & Local</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed">
              The UK's most trusted online grocery store. Bringing the authentic taste of the world to your doorstep since 2015. Over 50,000 happy families served.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#379c6b] hover:border-[#379c6b] hover:text-white transition-colors">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#379c6b] hover:border-[#379c6b] hover:text-white transition-colors">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#379c6b] hover:border-[#379c6b] hover:text-white transition-colors">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#379c6b] hover:border-[#379c6b] hover:text-white transition-colors">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="text-white font-bold mb-6">Shop</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li><Link to={ROUTES.SHOP} className="hover:text-[#379c6b] transition-colors">All Products</Link></li>
              <li><Link to="/shop/spices" className="hover:text-[#379c6b] transition-colors">Spices & Masala</Link></li>
              <li><Link to="/shop/rice" className="hover:text-[#379c6b] transition-colors">Rice & Grains</Link></li>
              <li><Link to="/shop/sweets" className="hover:text-[#379c6b] transition-colors">Sweets & Mithai</Link></li>
              <li><Link to="/shop/snacks" className="hover:text-[#379c6b] transition-colors">Snacks</Link></li>
              <li><Link to={ROUTES.BRANDS} className="hover:text-[#379c6b] transition-colors">All Brands</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Help */}
          <div>
            <h4 className="text-white font-bold mb-6">Customer Help</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li><Link to={ROUTES.TRACK_ORDER} className="hover:text-[#379c6b] transition-colors">Track Order</Link></li>
              <li><Link to="/faq" className="hover:text-[#379c6b] transition-colors">FAQ</Link></li>
              <li><Link to="/delivery" className="hover:text-[#379c6b] transition-colors">Delivery Info</Link></li>
              <li><Link to="/returns" className="hover:text-[#379c6b] transition-colors">Returns Policy</Link></li>
              <li><Link to={ROUTES.CONTACT} className="hover:text-[#379c6b] transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-[#379c6b] transition-colors">WhatsApp Support</a></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li><Link to={ROUTES.ABOUT} className="hover:text-[#379c6b] transition-colors">About Us</Link></li>
              <li><Link to={ROUTES.BLOG} className="hover:text-[#379c6b] transition-colors">Blog</Link></li>
              <li><Link to={ROUTES.RECIPES} className="hover:text-[#379c6b] transition-colors">Recipes</Link></li>
              <li><Link to="/privacy" className="hover:text-[#379c6b] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#379c6b] transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie" className="hover:text-[#379c6b] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">
              Get exclusive deals, new arrivals and recipes delivered to your inbox.
            </p>
            <form className="flex flex-col gap-3 mb-6">
              <input 
                type="email" 
                placeholder="Your email address..." 
                className="w-full bg-[#1a1d24] border border-white/10 text-white placeholder:text-slate-500 px-4 py-3 rounded-lg outline-none focus:border-[#379c6b] transition-colors text-sm"
              />
              <button 
                type="submit"
                className="w-full bg-[#379c6b] hover:bg-[#2e8259] text-white font-bold px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-green-900/20"
              >
                <FiSend size={14} /> Subscribe Now
              </button>
            </form>
            <div className="flex items-center gap-2 text-[#379c6b] text-sm font-medium">
              <FaWhatsapp size={16} /> +44 7700 900000
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2025 UK Groceries Ltd. All rights reserved. Registered in England & Wales.
          </p>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">We accept:</span>
            <div className="flex items-center gap-2">
              {['VISA', 'Mastercard', 'PayPal', 'Google Pay', 'Stripe'].map(method => (
                <div key={method} className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] font-medium text-slate-400">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 group flex items-center">
        <div className="bg-white text-dark text-xs font-bold px-3 py-2 rounded-full shadow-lg border border-slate-100 mr-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
          Chat with us on WhatsApp
        </div>
        <a 
          href="#" 
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        >
          <FaWhatsapp size={28} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
