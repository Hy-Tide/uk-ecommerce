import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';
import { BsLightningChargeFill } from 'react-icons/bs';

const OfferBanner = () => {
  // Timer Logic
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 24, seconds: 39 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  const flashDeals = [
    { id: 1, name: 'Everest Turmeric', price: 1.89, oldPrice: 2.79, image: 'https://images.unsplash.com/photo-1615486171448-4fbaf0121b87?q=80&w=400&auto=format&fit=crop' },
    { id: 2, name: 'Patanjali Ghee', price: 6.49, oldPrice: 8.99, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=400&auto=format&fit=crop' },
    { id: 3, name: 'Dabur Honey', price: 4.29, oldPrice: 5.99, image: 'https://images.unsplash.com/photo-1587049352847-4d4b1ed7355e?q=80&w=400&auto=format&fit=crop' },
  ];

  return (
    <section className="bg-[#111827] py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 justify-between">
          
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 text-orange-500 text-[10px] font-bold tracking-widest uppercase mb-4">
              <BsLightningChargeFill />
              <span>Flash Sale - Limited Time</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-2 tracking-tight">
              Today's <span className="text-orange-500">Hot Deals</span><br/>
              Don't Miss Out!
            </h2>
            
            <p className="text-slate-400 mt-2 mb-8">
              Handpicked deals refreshed every 24 hours. Grab them before they're gone!
            </p>

            {/* Timer */}
            <div className="flex items-start gap-4 mb-10">
              <div className="flex flex-col items-center">
                <div className="bg-[#2a2d32] text-white text-3xl font-black rounded-xl w-16 h-16 flex items-center justify-center shadow-lg">
                  {formatNumber(timeLeft.hours)}
                </div>
                <span className="text-[10px] text-slate-500 font-bold mt-2 uppercase">HRS</span>
              </div>
              <div className="text-orange-500 text-3xl font-black mt-2">:</div>
              <div className="flex flex-col items-center">
                <div className="bg-[#2a2d32] text-white text-3xl font-black rounded-xl w-16 h-16 flex items-center justify-center shadow-lg">
                  {formatNumber(timeLeft.minutes)}
                </div>
                <span className="text-[10px] text-slate-500 font-bold mt-2 uppercase">MIN</span>
              </div>
              <div className="text-orange-500 text-3xl font-black mt-2">:</div>
              <div className="flex flex-col items-center">
                <div className="bg-[#2a2d32] text-white text-3xl font-black rounded-xl w-16 h-16 flex items-center justify-center shadow-lg">
                  {formatNumber(timeLeft.seconds)}
                </div>
                <span className="text-[10px] text-slate-500 font-bold mt-2 uppercase">SEC</span>
              </div>
            </div>

            <Link to={ROUTES.SHOP} className="inline-flex items-center gap-2 bg-[#279c66] hover:bg-[#1f7e52] text-white font-bold px-8 py-3.5 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-green-900/40">
              Shop All Deals <FiArrowRight size={16} />
            </Link>
          </div>

          {/* Right Content: Products */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="grid grid-cols-3 gap-4">
              {flashDeals.map((deal) => (
                <div key={deal.id} className="bg-[#1f2937] rounded-xl overflow-hidden shadow-2xl flex flex-col group cursor-pointer border border-white/5 hover:border-white/20 transition-colors">
                  <div className="h-[140px] w-full overflow-hidden bg-white">
                    <img 
                      src={deal.image} 
                      alt={deal.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-xs font-bold mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">{deal.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 font-black text-sm">£{deal.price.toFixed(2)}</span>
                      <span className="text-slate-500 text-[10px] line-through">£{deal.oldPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OfferBanner;
