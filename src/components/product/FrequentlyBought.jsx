import React from 'react';
import { FiPlus } from 'react-icons/fi';

const FrequentlyBought = ({ items }) => {
  if (!items || items.length === 0) return null;

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-[#fcfbf9] rounded-[24px] p-6 md:p-8 mb-12 border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)]">
      <h2 className="text-xl font-bold text-dark mb-1">Frequently bought together</h2>
      <p className="text-slate-400 text-sm mb-6">Select all items to add to cart.</p>
      
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        
        {/* Items List */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              {/* Item Card */}
              <div className="flex items-center gap-4 bg-white border border-slate-100 p-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow min-w-[240px]">
                <div className="w-16 h-16 bg-[#f9fafb] rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <h4 className="text-dark font-bold text-sm truncate mb-1">{item.name}</h4>
                  <span className="text-slate-400 text-xs font-medium mb-1">10kg</span>
                  <span className="text-dark font-black text-sm">£{item.price.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Plus Sign */}
              {index < items.length - 1 && (
                <div className="text-slate-300">
                  <FiPlus size={20} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Total Price & Button */}
        <div className="flex flex-col items-center lg:items-start lg:ml-auto bg-white p-5 rounded-2xl shadow-sm border border-slate-100 min-w-[200px]">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total price:</span>
          <span className="text-3xl font-black text-dark mb-4">£{totalPrice.toFixed(2)}</span>
          <button className="w-full bg-[#279c66] hover:bg-[#1f7e52] text-white text-sm font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-green-900/20 active:scale-95">
            Add all to cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default FrequentlyBought;
