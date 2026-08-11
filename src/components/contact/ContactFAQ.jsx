import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How can I track my order?",
      answer: "Once your order is dispatched, you will receive an email and SMS with a tracking link. You can also log into your account and view the live status under 'My Orders'."
    },
    {
      question: "How long does delivery take?",
      answer: "We offer next-day delivery across the UK mainland for orders placed before 2 PM. Standard delivery takes 2-3 business days. Deliveries within the M25 can be eligible for same-day delivery."
    },
    {
      question: "Can I return products?",
      answer: "Yes! We accept returns within 14 days of delivery for non-perishable items in their original packaging. Perishable items (fresh produce, dairy) cannot be returned due to hygiene and safety reasons unless damaged."
    },
    {
      question: "How do refunds work?",
      answer: "Once your return is received and inspected at our warehouse, we will initiate a refund to your original payment method. The credit will typically appear within 3-5 business days depending on your bank."
    },
    {
      question: "Do you deliver across the UK?",
      answer: "Yes, we proudly deliver to all regions of the UK mainland. For Northern Ireland, Scottish Highlands, and Islands, delivery may take an additional 1-2 days and incur a slight surcharge."
    },
    {
      question: "Can I modify my order?",
      answer: "You can modify or cancel your order within 1 hour of placing it. Once the order starts processing in our warehouse, we can no longer make changes."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-lg">
            Find quick answers to common questions about our services.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-[#2E8B57]/30 shadow-md shadow-[#2E8B57]/5 rounded-[24px] bg-white' 
                    : 'border-slate-100 rounded-[20px] bg-[#fcfbf9] hover:border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                >
                  <span className={`font-bold text-lg pr-8 transition-colors ${isOpen ? 'text-[#2E8B57]' : 'text-slate-800 group-hover:text-[#2E8B57]'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'bg-[#2E8B57] text-white rotate-180' : 'bg-white border border-slate-200 text-slate-400 group-hover:border-[#2E8B57]/30 group-hover:text-[#2E8B57]'
                  }`}>
                    {isOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6"
                    >
                      <div className="pb-6 text-slate-600 leading-relaxed font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ContactFAQ;
