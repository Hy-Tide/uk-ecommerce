import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

const ProductFAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="mb-16">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-dark mb-1">FAQ</h2>
        <p className="text-sm text-slate-400">Some common questions about this product and our service.</p>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'border-[#379c6b]/30 shadow-md rounded-[20px] bg-white' 
                  : 'border-slate-100 rounded-2xl bg-[#fcfbf9] hover:border-slate-200'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-bold text-sm md:text-base pr-8 ${isOpen ? 'text-[#379c6b]' : 'text-dark'}`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isOpen ? 'bg-[#e8f5ed] text-[#379c6b]' : 'bg-white border border-slate-200 text-slate-400'
                }`}>
                  {isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
                </div>
              </button>
              
              <div 
                className={`px-6 transition-all duration-300 ease-in-out origin-top ${
                  isOpen ? 'max-h-[500px] pb-6 opacity-100 scale-y-100' : 'max-h-0 py-0 opacity-0 scale-y-0 hidden'
                }`}
              >
                <p className="text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFAQ;
