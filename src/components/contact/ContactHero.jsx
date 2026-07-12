import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiStar, FiMessageCircle } from 'react-icons/fi';

const ContactHero = () => {
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] flex flex-col justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=2000" 
          alt="Customer Support & Grocery Delivery" 
          className="w-full h-full object-cover"
        />
        {/* Premium Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
      </div>

      <div className="container relative z-10 px-4 pt-20 pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              <div className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse"></div>
              We're Here to Help
            </div>

            {/* Large Heading */}
            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
              Contact UK Groceries
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10 max-w-xl font-medium">
              Have questions about your order, delivery, products, or account? Our friendly support team is available to help you every step of the way.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#contact-form"
                className="bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold text-base px-8 py-4 rounded-[16px] shadow-[0_8px_20px_rgba(46,139,87,0.3)] hover:-translate-y-1 transition-all duration-300"
              >
                Contact Support
              </a>
              <a 
                href="/track-order"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-base px-8 py-4 rounded-[16px] hover:-translate-y-1 transition-all duration-300"
              >
                Track Your Order
              </a>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-wrap items-center gap-6 md:gap-10 border-t border-white/20 pt-8"
        >
          <div className="flex items-center gap-3 text-white/90">
            <FiClock className="text-[#FF8A00] text-xl" />
            <span className="font-bold text-sm">Same Day Delivery</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <FiCheckCircle className="text-[#FF8A00] text-xl" />
            <span className="font-bold text-sm">UK Customer Support</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <FiStar className="text-[#FF8A00] text-xl" />
            <span className="font-bold text-sm">4.9★ Customer Rating</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <FiMessageCircle className="text-[#FF8A00] text-xl" />
            <span className="font-bold text-sm">WhatsApp Support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
