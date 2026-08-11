import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const RecipeWidget = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div className="my-12 bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
      
      <div className="bg-[#FAFAF8] px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-lg">Shop The Recipe Ingredients</h3>
        <span className="bg-emerald-100 text-[#2E8B57] text-xs font-bold px-2 py-1 rounded-md">{ingredients.length} Items</span>
      </div>

      <div className="divide-y divide-slate-100">
        {ingredients.map((item) => (
          <div key={item.id} className="p-4 sm:p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors">
            
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white border border-slate-100 rounded-xl overflow-hidden p-1">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded-lg" />
            </div>

            <div className="flex-grow">
              <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-tight mb-1">{item.name}</h4>
              <p className="text-xs text-slate-500 font-medium mb-1">Required: <span className="font-bold text-slate-700">{item.qty}</span></p>
              <p className="text-[#2E8B57] font-black">{item.price}</p>
            </div>

            <button className="flex-shrink-0 w-10 h-10 sm:w-auto sm:h-auto sm:px-6 sm:py-2.5 rounded-full sm:rounded-xl bg-white border border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white flex items-center justify-center font-bold text-sm transition-colors shadow-sm">
              <span className="hidden sm:inline">Add</span>
              <FiShoppingCart className="sm:hidden text-lg" />
            </button>

          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <button className="w-full bg-[#FF8A00] hover:bg-[#e67a00] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_15px_rgba(255,138,0,0.25)] hover:-translate-y-0.5">
          <FiShoppingCart /> Add All Ingredients to Cart
        </button>
      </div>

    </div>
  );
};

export default RecipeWidget;
