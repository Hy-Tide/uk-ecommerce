import React, { useState } from 'react';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'nutritional', label: 'Nutritional Information' },
    { id: 'storage', label: 'Storage Instructions' },
    { id: 'dietary', label: 'Dietary & Allergens' },
    { id: 'shipping', label: 'Shipping & Returns' },
  ];

  return (
    <div className="bg-white rounded-[24px] p-6 md:p-10 border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] mb-12">
      <h2 className="text-xl font-bold text-dark mb-6">Product Information</h2>
      
      {/* Tabs Row */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-slate-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-[#379c6b] text-white shadow-md' 
                : 'bg-[#fcfbf9] text-slate-500 hover:bg-slate-100 hover:text-dark border border-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="text-slate-500 text-sm leading-relaxed">
        {activeTab === 'description' && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-dark font-bold mb-3">Exactly what you expect, every time</h3>
              <p className="mb-4">
                Aashirvaad Whole Wheat Atta is made from the grains which are heavy on the palm, golden amber in colour and hard in bite. 
                It is carefully ground using modern 'chakki' grinding process which ensures that Aashirvaad Atta contains 0% Maida and is 100% Sampoorna Atta.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Grounded from premium golden amber wheat grains.</li>
                <li>Retains high dietary fiber for a healthier digestive system.</li>
                <li>Dough absorbs more water, keeping rotis soft longer.</li>
                <li>Perfect for everyday meals: rotis, phulkas, and parathas.</li>
                <li>Sourced from the finest farms to ensure premium quality.</li>
              </ul>
            </div>
            
            <div className="flex-1 bg-[#fcfbf9] border border-slate-100 p-6 rounded-xl">
              <h3 className="text-dark font-bold mb-3">Highlights</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>High in dietary fiber & essential nutrients.</li>
                <li>100% pure whole wheat. 0% maida.</li>
                <li>Premium quality grain.</li>
                <li>Vacuum sealed for maximum freshness.</li>
                <li>Edible India.</li>
                <li>Suitable for vegetarians & vegans.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab !== 'description' && (
          <div className="py-8 text-center text-slate-400">
            Content for {tabs.find(t => t.id === activeTab)?.label} is not available in the dummy data.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
