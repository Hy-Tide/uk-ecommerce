import React from 'react';
import { FiCheckCircle, FiSend } from 'react-icons/fi';

const Newsletter = () => {
  return (
    <section className="bg-[#48bb78] py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              Never miss a deal<br/>or new arrival
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Get exclusive offers, Diwali specials, new recipes and restock alerts straight to your inbox every week.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-white font-medium text-sm">
                <FiCheckCircle size={18} /> Exclusive discounts
              </div>
              <div className="flex items-center gap-2 text-white font-medium text-sm">
                <FiCheckCircle size={18} /> New arrivals first
              </div>
              <div className="flex items-center gap-2 text-white font-medium text-sm">
                <FiCheckCircle size={18} /> Weekly recipes
              </div>
            </div>
          </div>
          
          {/* Right Content: Form */}
          <div className="flex-1 w-full max-w-lg">
            <form className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Your name..." 
                className="w-full bg-white/10 border border-white/30 text-white placeholder:text-white/60 px-6 py-4 rounded-full outline-none focus:bg-white/20 focus:border-white transition-all backdrop-blur-sm"
              />
              <input 
                type="email" 
                placeholder="Your email address..." 
                className="w-full bg-white/10 border border-white/30 text-white placeholder:text-white/60 px-6 py-4 rounded-full outline-none focus:bg-white/20 focus:border-white transition-all backdrop-blur-sm"
                required
              />
              <button 
                type="submit"
                className="w-full bg-white text-[#48bb78] font-black px-6 py-4 rounded-full hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-black/10 mt-2"
              >
                <FiSend /> Subscribe for Free
              </button>
              <p className="text-white/70 text-xs text-center mt-2">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
