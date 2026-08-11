import React from 'react';
import { FiList, FiTag, FiShoppingBag } from 'react-icons/fi';

const BlogSidebar = ({ author }) => {
  return (
    <aside className="w-full lg:w-96 flex-shrink-0 space-y-8 lg:sticky lg:top-24">
      
      {/* Table of Contents */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <FiList className="text-[#2E8B57]" /> Table of Contents
        </h3>
        <ul className="space-y-3 text-sm font-medium text-slate-600">
          <li><a href="#" className="hover:text-[#2E8B57] transition-colors">The Foundation of Flavor</a></li>
          <li><a href="#" className="hover:text-[#2E8B57] transition-colors">Must-Have Whole Spices</a></li>
          <li><a href="#" className="hover:text-[#2E8B57] transition-colors">Ground Powders You Can't Skip</a></li>
          <li><a href="#" className="hover:text-[#2E8B57] transition-colors pl-4">Turmeric Powder (Haldi)</a></li>
          <li><a href="#" className="hover:text-[#2E8B57] transition-colors pl-4">Kashmiri Red Chilli</a></li>
          <li><a href="#" className="hover:text-[#2E8B57] transition-colors">Conclusion</a></li>
        </ul>
      </div>

      {/* Author Mini Card */}
      <div className="bg-[#FAFAF8] rounded-[24px] p-6 border border-slate-100 shadow-sm text-center">
        <img src={author?.avatar} alt={author?.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 shadow-md" />
        <h3 className="font-bold text-slate-800 text-lg mb-1">{author?.name}</h3>
        <p className="text-[#2E8B57] text-xs font-bold uppercase tracking-wider mb-4">{author?.role}</p>
        <button className="w-full bg-white border border-slate-200 hover:border-[#2E8B57] text-slate-700 hover:text-[#2E8B57] font-bold py-2 rounded-xl transition-all">
          Follow Author
        </button>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <FiTag className="text-[#2E8B57]" /> Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Spices', 'Beginner Guide', 'Indian Pantry', 'Curry', 'Masala', 'Essentials'].map((tag, i) => (
            <a href="#" key={i} className="bg-slate-50 hover:bg-[#2E8B57] text-slate-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-slate-100">
              {tag}
            </a>
          ))}
        </div>
      </div>

      {/* Related Products Ad */}
      <div className="rounded-[24px] overflow-hidden relative group">
        <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400" alt="Spice Box" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20 p-6 flex flex-col justify-end">
          <div className="bg-[#FF8A00] text-white text-[10px] font-bold uppercase px-2 py-1 rounded w-fit mb-2">Shop Now</div>
          <h3 className="text-white font-bold text-xl mb-1">Premium Spice Box (Masala Dabba)</h3>
          <p className="text-white/80 text-sm mb-4">Start your journey with our starter kit.</p>
          <button className="w-full bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <FiShoppingBag /> View Product
          </button>
        </div>
      </div>

    </aside>
  );
};

export default BlogSidebar;
