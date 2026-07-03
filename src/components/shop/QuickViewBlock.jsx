import React from 'react';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import aashirvaadImg from '../../assets/images/Ashirvaad.jpg';

const QuickViewBlock = () => {
  return (
    <div className="mt-16 mb-16">
      <h2 className="text-xl font-bold text-dark mb-6">Quick View</h2>
      <p className="text-xs text-slate-400 mb-4 uppercase tracking-wider">AASHIRVAAD MULTIGRAIN ATTA 5KG (SELECTED)</p>
      
      <div className="bg-[#f9fafb] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16 items-center">
        
        {/* Left Image Area */}
        <div className="w-full md:w-1/3 flex justify-center bg-white p-8 rounded-[24px] shadow-sm">
          <img 
            src={aashirvaadImg} 
            alt="Aashirvaad Whole Wheat Atta 10kg" 
            className="w-full max-w-[200px] object-contain drop-shadow-md"
          />
        </div>
        
        {/* Right Details Area */}
        <div className="w-full md:w-2/3">
          <span className="text-[#379c6b] text-xs font-bold uppercase tracking-wider mb-2 block">AASHIRVAAD</span>
          <h3 className="text-3xl font-black text-dark leading-tight mb-4">
            Aashirvaad Whole Wheat Atta 10kg
          </h3>
          <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed max-w-xl">
            Bringing pure goodness and nutrition to your family. Aashirvaad Whole Wheat Atta is 
            carefully crafted using a 4-step advantage process to retain its natural dietary fiber.
          </p>

          {/* Weight Selection Pills */}
          <div className="flex gap-3 mb-8">
            <button className="border-2 border-[#379c6b] text-[#379c6b] bg-[#e8f5ed] font-bold text-sm px-5 py-2 rounded-xl">10kg</button>
            <button className="border border-slate-200 text-slate-500 font-bold text-sm px-5 py-2 rounded-xl hover:border-slate-300 transition-colors bg-white">5kg</button>
            <button className="border border-slate-200 text-slate-500 font-bold text-sm px-5 py-2 rounded-xl hover:border-slate-300 transition-colors bg-white">1kg</button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-dark leading-none mb-1">£12.00</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400 line-through font-medium">£13.50</span>
                <span className="text-[#379c6b] text-xs font-bold bg-[#e8f5ed] px-2 py-0.5 rounded-sm">Save 11%</span>
              </div>
            </div>

            <button className="bg-[#279c66] hover:bg-[#1f7e52] text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-900/20 active:scale-95 ml-auto md:ml-0">
              <FiShoppingCart size={18} /> Add to Cart
            </button>
            <button className="border border-slate-200 text-slate-400 hover:text-orange-500 hover:border-orange-500 bg-white font-bold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
              <FiHeart size={18} /> Add to Wishlist
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuickViewBlock;
