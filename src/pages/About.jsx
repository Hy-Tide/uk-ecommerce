import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingBasket, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import mainGrocery from '../assets/main-grocery.png';
import floatingVeg from '../assets/floating-veg.png';
import floatingFruit from '../assets/floating-fruit.png';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';

const About = () => {
  return (
    <>
    <section className="w-full bg-[#FAFAF8] py-[40px] px-4 md:px-[80px] font-['Poppins',sans-serif] overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[minmax(0,48%)_minmax(0,52%)] items-center gap-y-16 lg:gap-y-0"
        style={{ columnGap: '80px' }}
      >
        {/* Left Column - 48% */}
        <div className="w-full flex justify-center lg:justify-center">
          <div className="relative w-full max-w-[450px] h-auto lg:w-[450px] lg:h-[700px] aspect-[4/5] lg:aspect-auto">

            {/* Main Rounded Image */}
            <div className="w-full h-full rounded-[220px] overflow-hidden relative shadow-xl">
              <img src={mainGrocery} alt="Fresh Groceries" className="w-full h-full object-cover" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-[42px] font-[700] text-center leading-tight drop-shadow-md px-6">
                  Premium<br />UK<br />Groceries
                </h3>
              </div>
            </div>

            {/* Top Floating Image */}
            <motion.img
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              src={floatingVeg}
              alt="Fresh vegetable farm"
              className="absolute top-[90px] -left-[90px] w-[180px] h-[260px] object-cover rounded-[90px] border-[8px] border-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-10 hidden md:block"
            />

            {/* Bottom Floating Image */}
            <motion.img
              animate={{ y: [15, -15, 15] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              src={floatingFruit}
              alt="Fresh fruits"
              className="absolute bottom-[60px] -left-[40px] w-[180px] h-[260px] object-cover rounded-[90px] border-[8px] border-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-10 hidden md:block"
            />
          </div>
        </div>

        {/* Right Column - 52% */}
        <div className="w-full flex flex-col justify-center">
          {/* Main Heading */}
          <h2 className="text-[#1D3B2A] text-[25px] lg:text-[41px] font-[700] leading-[1.05] max-w-[620px] mb-[24px]">
            Welcome to UK Groceries – Delivering Quality to Your Doorstep
          </h2>

          {/* Description */}
          <p className="text-[#6B7280] text-[16px] lg:text-[20px] leading-[1.8] max-w-[620px] mb-[40px]">
            We are your premier destination for authentic UK groceries. From premium flours and pure rice to traditional spices, vibrant sweets, and farm-fresh produce, we deliver quality food directly to your doorstep anywhere in the UK.
          </p>

          {/* Feature Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="w-full h-auto md:h-[100px] bg-gradient-to-br from-[#EAF8D7] to-[#DFF3C4] rounded-[28px] p-6 md:p-0 flex flex-col md:flex-row items-center mb-[36px] cursor-default"
          >
            {/* Feature 1 */}
            <div className="flex-1 flex items-center gap-5 px-4 md:pl-8 py-4 md:py-0 w-full group">
              <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <FaShoppingBasket className="text-[#2E7D32] text-[24px] group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <h4 className="text-[#1D3B2A] font-[600] text-[18px] leading-tight mb-1">Authentic Ingredients</h4>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[1px] h-[60%] bg-[#2E7D32]/20"></div>
            <div className="md:hidden h-[1px] w-full bg-[#2E7D32]/20 my-2"></div>

            {/* Feature 2 */}
            <div className="flex-1 flex items-center gap-5 px-4 md:pl-8 py-4 md:py-0 w-full group">
              <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <FaShieldAlt className="text-[#2E7D32] text-[24px] group-hover:-rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <h4 className="text-[#1D3B2A] font-[600] text-[18px] leading-tight mb-1">UK-Wide Delivery</h4>
              </div>
            </div>
          </motion.div>

          {/* Benefits List */}
          <div className="flex flex-col gap-[22px]">
            <div className="flex items-center gap-4">
              <FaCheckCircle className="text-[#2E7D32] text-[24px] flex-shrink-0" />
              <span className="text-[#5F6368] text-[18px]">Sourced directly from trusted Indian & UK farms and brands.</span>
            </div>
            <div className="flex items-center gap-4">
              <FaCheckCircle className="text-[#2E7D32] text-[24px] flex-shrink-0" />
              <span className="text-[#5F6368] text-[18px]">Next-day delivery available across the UK mainland.</span>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="mt-[36px] w-[190px] h-[62px] bg-[#234B35] hover:bg-[#2E7D32] text-white font-[600] rounded-[14px] shadow-[0_12px_30px_rgba(46,125,50,0.25)] flex items-center justify-center text-[18px] transition-colors duration-300"
          >
            Shop Now
          </motion.button>

        </div>
      </motion.div>
    </section>

    <HowItWorks />
    <WhyChooseUs />
    </>
  );
};

export default About;
