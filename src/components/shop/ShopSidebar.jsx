import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { shopFilters } from '../../data/dummyData';

const CheckboxGroup = ({ title, options, initiallyOpen = true }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className="py-5 border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between text-dark font-bold text-[15px] mb-3 hover:text-[#379c6b] transition-colors"
      >
        {title}
        {isOpen ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
      </button>
      
      {isOpen && (
        <div className="flex flex-col gap-3 mt-4">
          {options.map((opt, index) => (
            <label key={index} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center group-hover:border-[#379c6b] transition-colors relative">
                  <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer peer" />
                  <div className="w-3 h-3 bg-[#379c6b] rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-medium text-slate-600 group-hover:text-dark transition-colors">{opt.name}</span>
              </div>
              {opt.count && (
                <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{opt.count}</span>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const ShopSidebar = () => {
  const [price, setPrice] = useState(60);

  return (
    <aside className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100 p-6 sticky top-[100px]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
        <h2 className="font-bold text-dark text-lg">Filters</h2>
        <button className="text-xs font-bold text-[#379c6b] hover:underline">Clear all</button>
      </div>

      {/* Price Range */}
      <div className="py-5 border-b border-slate-100">
        <div className="flex items-center justify-between text-dark font-bold text-[15px] mb-5">
          Price
        </div>
        
        {/* Simple mock range slider styling */}
        <div className="px-2 mb-6">
          <div className="h-1.5 bg-slate-200 rounded-full relative">
            <div className="absolute top-0 left-0 h-full w-[60%] bg-[#379c6b] rounded-full"></div>
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 bg-white border-[3px] border-[#379c6b] rounded-full shadow-md cursor-pointer"></div>
            <div className="absolute top-1/2 -translate-y-1/2 left-[60%] w-4 h-4 bg-white border-[3px] border-[#379c6b] rounded-full shadow-md cursor-pointer"></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium mb-1">Min Price</span>
            <div className="border border-slate-200 rounded-lg px-3 py-1.5 w-20 text-sm font-bold text-dark">£10.00</div>
          </div>
          <span className="text-slate-300 font-bold">-</span>
          <div className="flex flex-col text-right items-end">
            <span className="text-xs text-slate-400 font-medium mb-1">Max Price</span>
            <div className="border border-slate-200 rounded-lg px-3 py-1.5 w-20 text-sm font-bold text-dark text-center">£120.00</div>
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
