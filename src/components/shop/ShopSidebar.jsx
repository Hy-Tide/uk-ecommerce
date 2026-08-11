import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSliders } from 'react-icons/fi';
import { shopFilters } from '../../data/dummyData';

const CheckboxGroup = ({ title, options, initiallyOpen = true }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className="py-4 border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between text-[#124827] font-bold text-sm mb-3 hover:text-[#eb5b27] transition-colors"
      >
        {title}
        {isOpen ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
      </button>
      
      {isOpen && (
        <div className="flex flex-col gap-2.5 mt-3">
          {options.map((opt, index) => (
            <label key={index} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center group-hover:border-[#124827] transition-colors relative bg-white">
                  <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer peer" />
                  <div className="w-2.5 h-2.5 bg-[#124827] rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-[#124827] transition-colors">{opt.name}</span>
              </div>
              {opt.count && (
                <span className="text-[10px] font-bold text-slate-500 bg-[#f8fafc] px-2 py-0.5 rounded-full border border-slate-100">{opt.count}</span>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const ShopSidebar = () => {
  return (
    <aside className="bg-white rounded-2xl border border-slate-100 p-6 sticky top-[100px] shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-[#124827] font-black text-base">
          <FiSliders className="text-[#eb5b27]" /> Filter Products
        </div>
        <button className="text-xs font-bold text-[#eb5b27] hover:underline">Clear all</button>
      </div>

      {/* Price Range */}
      <div className="py-4 border-b border-slate-100">
        <div className="flex items-center justify-between text-[#124827] font-bold text-sm mb-4">
          Price Range
        </div>
        
        {/* Mock range slider styling */}
        <div className="px-2 mb-5">
          <div className="h-1.5 bg-slate-200 rounded-full relative">
            <div className="absolute top-0 left-0 h-full w-[65%] bg-[#124827] rounded-full"></div>
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 bg-white border-[3px] border-[#124827] rounded-full shadow-md cursor-pointer"></div>
            <div className="absolute top-1/2 -translate-y-1/2 left-[65%] w-4 h-4 bg-white border-[3px] border-[#eb5b27] rounded-full shadow-md cursor-pointer"></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Min Price</span>
            <div className="border border-slate-200 rounded-xl px-3 py-1.5 w-20 text-xs font-extrabold text-[#124827] text-center bg-[#fafcfb]">£10.00</div>
          </div>
          <span className="text-slate-300 font-bold mt-4">-</span>
          <div className="flex flex-col text-right items-end">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Max Price</span>
            <div className="border border-slate-200 rounded-xl px-3 py-1.5 w-20 text-xs font-extrabold text-[#124827] text-center bg-[#fafcfb]">£120.00</div>
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <CheckboxGroup title="Brand" options={shopFilters.brands} />

      {/* Weight Filter */}
      <CheckboxGroup title="Weight" options={shopFilters.weights} />

      {/* Organic Filter */}
      <CheckboxGroup 
        title="Organic" 
        options={[{ name: 'Organic Only', count: 18 }]} 
        initiallyOpen={true}
      />
      
      {/* Price & Offers */}
      <CheckboxGroup 
        title="Price & Offers" 
        options={[
          { name: '10% Discount or More', count: 15 },
          { name: '25% Discount or More', count: 8 },
          { name: 'Buy 1 Get 1 Free', count: 3 }
        ]} 
        initiallyOpen={false}
      />

    </aside>
  );
};

export default ShopSidebar;
