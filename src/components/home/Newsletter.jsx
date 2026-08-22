import React, { useState } from 'react';
import { FiCheckCircle, FiSend } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

const Newsletter = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast('Thank you for subscribing to Grandma\'s Basket!', 'success');
    setName('');
    setEmail('');
  };

  return (
    <section className="bg-[#3EB674] py-16 md:py-20 relative overflow-hidden font-sans">
      {/* Subtle Micro-Dotted Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(255, 255, 255, 0.4) 1.5px, transparent 0)', 
          backgroundSize: '24px 24px' 
        }}
      ></div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

          {/* Left Content */}
          <div className="flex-1 max-w-xl text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.15] mb-5 tracking-tight">
              Never miss a deal<br />or new arrival
            </h2>
            
            <p className="text-white/95 text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-lg font-normal">
              Get exclusive offers, Diwali specials, new recipes and restock alerts straight to your inbox every week.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-white flex-shrink-0" size={17} />
                <span className="text-white text-xs md:text-sm font-medium">Exclusive discounts</span>
              </div>

              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-white flex-shrink-0" size={17} />
                <span className="text-white text-xs md:text-sm font-medium">New arrivals first</span>
              </div>

              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-white flex-shrink-0" size={17} />
                <span className="text-white text-xs md:text-sm font-medium">Weekly recipes</span>
              </div>
            </div>
          </div>

          {/* Right Content: Form */}
          <div className="flex-1 w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <input
                type="text"
                placeholder="Your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#52C084]/60 border border-white/40 text-white placeholder:text-white/80 px-6 py-3.5 rounded-full outline-none focus:border-white focus:bg-[#52C084]/90 transition-all text-xs md:text-sm font-medium shadow-inner"
              />
              <input
                type="email"
                placeholder="Your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#52C084]/60 border border-white/40 text-white placeholder:text-white/80 px-6 py-3.5 rounded-full outline-none focus:border-white focus:bg-[#52C084]/90 transition-all text-xs md:text-sm font-medium shadow-inner"
                required
              />
              <button
                type="submit"
                className="w-full bg-white hover:bg-emerald-50 text-[#3EB674] font-extrabold px-6 py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-xs md:text-sm active:scale-[0.99] cursor-pointer mt-1"
              >
                <FiSend size={15} /> Subscribe for Free
              </button>
              <p className="text-white/80 text-[11px] text-center mt-1 font-medium">
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
