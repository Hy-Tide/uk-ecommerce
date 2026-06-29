import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const PromoBanners = () => {
  return (
    <section className="bg-slate-50 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Festival Special */}
          <div className="relative rounded-2xl overflow-hidden min-h-[220px] group flex flex-col justify-end p-6">
            <img 
              src="https://images.unsplash.com/photo-1605658823194-e354924b1049?q=80&w=600&auto=format&fit=crop" 
              alt="Diwali Sweets" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#82210b] via-[#82210b]/60 to-transparent mix-blend-multiply"></div>
            <div className="relative z-10 w-full">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-2 block">Festival Special</span>
              <h3 className="text-2xl font-black text-white leading-tight mb-2">Diwali Sweet<br/>Hampers</h3>
              <p className="text-white/80 text-xs mb-4">Starting from £14.99 — perfect gifts</p>
              <Link to={ROUTES.SHOP} className="inline-flex items-center gap-2 bg-white text-dark text-xs font-bold px-4 py-2 rounded-full hover:bg-slate-100 transition-colors">
                Shop Now <FiArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Card 2: Best Deal */}
          <div className="relative rounded-2xl overflow-hidden min-h-[220px] group flex flex-col justify-end p-6">
            <img 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop" 
              alt="Spices" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#9a3a10] via-[#9a3a10]/60 to-transparent mix-blend-multiply"></div>
            <div className="relative z-10 w-full">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-2 block">Best Deal</span>
              <h3 className="text-2xl font-black text-white leading-tight mb-2">Spice Blends<br/>20% OFF</h3>
              <p className="text-white/80 text-xs mb-4">Use code: SPICE20</p>
              <Link to={ROUTES.SHOP} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
                Grab Deal <FiArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Card 3: New Arrivals */}
          <div className="relative rounded-2xl overflow-hidden min-h-[220px] group flex flex-col justify-end p-6">
            <img 
              src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=600&auto=format&fit=crop" 
              alt="Organic Greens" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#155325] via-[#155325]/60 to-transparent mix-blend-multiply"></div>
            <div className="relative z-10 w-full">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80 mb-2 block">New Arrivals</span>
              <h3 className="text-2xl font-black text-white leading-tight mb-2">Organic &<br/>Fresh Range</h3>
              <p className="text-white/80 text-xs mb-4">100% certified organic</p>
              <Link to={ROUTES.SHOP} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
                Explore <FiArrowRight size={12} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
