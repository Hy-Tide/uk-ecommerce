import React, { useState } from 'react';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'nutritional', label: 'Nutritional Information' }
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
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === tab.id
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
            <div className="flex-1" dangerouslySetInnerHTML={{ __html: product.description }} />

            {product.highlights && (
              <div className="flex-1 bg-[#fcfbf9] border border-slate-100 p-6 rounded-xl">
                <h3 className="text-dark font-bold mb-3">Highlights</h3>
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: product.highlights }} />
              </div>
            )}
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="flex-1" dangerouslySetInnerHTML={{ __html: product.ingredients || 'Ingredients information is not available.' }} />
        )}

        {activeTab === 'nutritional' && (
          <div className="flex-1" dangerouslySetInnerHTML={{ __html: product.nutritionalInfo || 'Nutritional information is not available.' }} />
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
