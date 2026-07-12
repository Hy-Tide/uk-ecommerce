import React from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiTruck, FiInfo, FiRefreshCw, FiBriefcase, FiBox, FiTool, FiHelpCircle } from 'react-icons/fi';

const QuickHelp = () => {
  const categories = [
    { icon: <FiPackage />, title: 'Order Issues', desc: 'Missing items or wrong products', color: 'text-orange-500' },
    { icon: <FiTruck />, title: 'Delivery Support', desc: 'Track your order or report delays', color: 'text-blue-500' },
    { icon: <FiInfo />, title: 'Product Enquiry', desc: 'Ask about ingredients or stock', color: 'text-emerald-500' },
    { icon: <FiRefreshCw />, title: 'Refund Request', desc: 'Returns, replacements & refunds', color: 'text-rose-500' },
    { icon: <FiBriefcase />, title: 'Business Partnership', desc: 'Become a supplier or partner', color: 'text-purple-500' },
    { icon: <FiBox />, title: 'Wholesale Orders', desc: 'Bulk buying for restaurants', color: 'text-amber-500' },
    { icon: <FiTool />, title: 'Technical Support', desc: 'Website or account issues', color: 'text-cyan-500' },
    { icon: <FiHelpCircle />, title: 'General Questions', desc: 'Anything else you need', color: 'text-slate-500' },
  ];

  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="container px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">How can we help you today?</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Choose a category below to find quick answers or to send a specific request to the right department.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, index) => (
            <motion.a
              href="#contact-form"
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-[#2E8B57]/30 transition-all duration-300 cursor-pointer flex flex-col items-start"
            >
              <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#2E8B57] transition-colors">{cat.title}</h3>
              <p className="text-sm text-slate-500 font-medium">{cat.desc}</p>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default QuickHelp;
