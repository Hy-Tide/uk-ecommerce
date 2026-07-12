import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiShoppingBag, FiShield, FiHeart, FiSmile, FiMapPin } from 'react-icons/fi';

const ContactWhyChooseUs = () => {
  const features = [
    { icon: <FiClock />, title: 'Same-Day Delivery', desc: 'Available for selected UK regions for urgent grocery needs.' },
    { icon: <FiShoppingBag />, title: 'Authentic Indian Products', desc: 'Directly sourced from trusted brands in India and local UK farms.' },
    { icon: <FiShield />, title: 'Secure Payments', desc: '100% secure checkout with SSL encryption and multiple gateways.' },
    { icon: <FiHeart />, title: 'Fresh Groceries', desc: 'Handpicked fresh produce packed with care to maintain quality.' },
    { icon: <FiSmile />, title: 'Customer Satisfaction', desc: 'Dedicated support team ensuring you have a seamless experience.' },
    { icon: <FiMapPin />, title: '24/7 Order Tracking', desc: 'Live updates on your order journey from our warehouse to your door.' },
  ];

  return (
    <section className="py-20 bg-[#294535] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2E8B57] rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF8A00] rounded-full blur-[100px] opacity-20"></div>

      <div className="container px-4 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Why Shop With Us?</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Experience the best online Indian grocery shopping in the UK with our premium services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#FF8A00] rounded-xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-[#FF8A00]/30">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70 font-medium leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ContactWhyChooseUs;
