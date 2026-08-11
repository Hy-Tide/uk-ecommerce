import React from 'react';
import { FiTruck, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-[#111827] text-slate-300 text-[11px] font-medium py-2 hidden lg:block border-b border-white/10">
      <div className="container flex justify-between items-center">
        
        {/* Left */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <FiTruck className="text-[#eb5b27]" size={14} />
            <span><span className="font-bold">Free delivery</span> on orders over £40</span>
          </div>
          <div className="w-[1px] h-3 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <span className="bg-[#eb5b27] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Diwali Sale</span>
            <span className="text-white font-bold">Up to 30% OFF</span>
            <span className="text-slate-400">— Limited time</span>
          </div>
        </div>

        {/* Center/Right */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FiClock className="text-slate-400" size={13} />
            <span>Mon-Sat: 9am-8pm  -  Sun: 10am-6pm</span>
          </div>
          <a href="https://wa.me/447700900000" className="flex items-center gap-1.5 bg-[#124827]/80 text-green-300 hover:text-white transition-colors px-3 py-1 rounded-full border border-green-700/50">
            <div className="w-1.5 h-1.5 rounded-full bg-[#eb5b27] animate-pulse"></div>
            <FaWhatsapp size={12} />
            <span>WhatsApp: +44 7700 900000</span>
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default TopBar;
