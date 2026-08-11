import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiCoffee, FiThermometer, FiArchive } from 'react-icons/fi';

const tips = [
  {
    icon: <FiArchive />,
    title: 'Spice Storage',
    desc: 'Store whole spices in airtight containers away from direct sunlight to preserve their essential oils for up to a year.',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    icon: <FiCoffee />,
    title: 'Perfect Rice',
    desc: 'Always rinse basmati rice until the water runs clear and soak for 30 minutes before cooking for distinct, fluffy grains.',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: <FiThermometer />,
    title: 'Tempering (Tadka)',
    desc: 'Ensure your oil or ghee is hot before adding mustard or cumin seeds. They should crackle instantly to release maximum flavor.',
    color: 'bg-red-100 text-red-600'
  }
];

const CookingTips = () => {
  return (
    <section className="w-full py-20 px-4 md:px-[80px] bg-[#FAFAF8]">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#294535] text-[36px] md:text-[42px] font-[700] leading-tight mb-4">
            Kitchen Hacks & Tips
          </h2>
          <p className="text-[#6B7280] text-[18px] max-w-[600px] mx-auto">
            Master the art of Indian cooking with these essential tips from our expert chefs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-[24px] p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100 relative overflow-hidden group"
            >
              {/* Decorative circle */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
              
              <div className="relative z-10">
                <div className={`w-[60px] h-[60px] rounded-2xl ${tip.color} flex items-center justify-center text-[28px] mb-6 shadow-sm`}>
                  {tip.icon}
                </div>
                
                <h3 className="text-[#294535] text-[22px] font-[700] mb-4">
                  {tip.title}
                </h3>
                <p className="text-gray-600 text-[16px] leading-[1.7]">
                  {tip.desc}
                </p>
                
                <button className="mt-8 text-[#2E8B57] font-[600] flex items-center gap-2 hover:text-[#FF8A00] transition-colors">
                  Read full guide <FiCheck />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CookingTips;
