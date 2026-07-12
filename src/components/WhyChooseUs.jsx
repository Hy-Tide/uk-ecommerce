import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import groceryImg from '../assets/grocery-illustration.png';

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-[#FAFAF8] py-[120px] font-['Poppins',sans-serif] overflow-hidden">
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-[80px]">

        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full items-end drop-shadow-[0_12px_40px_rgba(0,0,0,0.08)]">

          {/* Left Column - 35% */}
          <div className="w-[55%] flex flex-col justify-end">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#294535] text-[44px] font-[700] leading-[1.05] mb-[40px]"
            >
              Premium UK Groceries Delivered Directly
            </motion.h2>

            {/* Left Bottom Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-[420px] rounded-l-[32px] rounded-br-none p-[40px] flex flex-col justify-center"
              style={{ background: 'linear-gradient(135deg, #C9E58A, #B5D67A)' }}
            >
              {/* Statistic 1 */}
              <div className="flex flex-col">
                <div className="flex items-center gap-6 mb-4">
                  <div className="text-[#294535] text-[82px] font-[800] leading-[0.8] tracking-tighter">
                    65K
                  </div>
                  <div className="text-[#294535]/90 text-[14px] leading-[1.4] max-w-[140px] font-[400]">
                    Thousands of families trust us for fresh grocery delivery every day.
                  </div>
                </div>
                <div className="text-[#294535] text-[13px] font-[600] uppercase tracking-[4px]">
                  Happy Customers
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-[#294535]/20 my-6"></div>

              {/* Statistic 2 */}
              <div className="flex flex-col">
                <div className="flex items-center gap-6 mb-4">
                  <div className="text-[#294535] text-[82px] font-[800] leading-[0.8] tracking-tighter">
                    250K
                  </div>
                  <div className="text-[#294535]/90 text-[14px] leading-[1.4] max-w-[140px] font-[400]">
                    Fresh groceries delivered with speed, quality, and care.
                  </div>
                </div>
                <div className="text-[#294535] text-[13px] font-[600] uppercase tracking-[4px]">
                  Orders Delivered
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - 65% */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-[65%] h-[520px] rounded-r-[32px] rounded-tl-[32px] rounded-bl-none p-[48px] relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #C9E58A, #B5D67A)' }}
          >
            {/* Background Decorations */}
            <svg className="absolute bottom-0 right-0 w-full h-[70%] pointer-events-none opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,100 C30,70 60,80 100,40 L100,100 Z" fill="#9CC562" />
              <path d="M20,100 C50,60 70,65 100,20 L100,100 Z" fill="#8BB852" />
            </svg>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-[#294535] text-[34px] font-[700] mb-10">
                Why Shop With Us?
              </h3>

              <div className="flex flex-col gap-8 max-w-[420px]">
                {/* Feature 1 */}
                <div className="flex items-start gap-5">
                  <div className="w-[28px] h-[28px] rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                    <FaCheck className="text-[#A6C96B] text-[12px]" />
                  </div>
                  <div>
                    <h4 className="text-[#294535] text-[20px] font-[600] mb-2 leading-tight">Farm Fresh Products</h4>
                    <p className="text-[#294535]/80 text-[16px] font-[400] leading-[1.6]">
                      Fresh vegetables, fruits, dairy, and groceries sourced directly from trusted farms and suppliers.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-5">
                  <div className="w-[28px] h-[28px] rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                    <FaCheck className="text-[#A6C96B] text-[12px]" />
                  </div>
                  <div>
                    <h4 className="text-[#294535] text-[20px] font-[600] mb-2 leading-tight">Quality Guaranteed</h4>
                    <p className="text-[#294535]/80 text-[16px] font-[400] leading-[1.6]">
                      Every product is carefully selected and quality checked before reaching your doorstep.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Illustration */}
            <img
              src={groceryImg}
              alt="Fresh Groceries"
              className="absolute bottom-[-10px] right-[-20px] w-[450px] object-contain mix-blend-multiply z-10"
            />
          </motion.div>
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden flex flex-col gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#294535] text-[48px] font-[700] leading-[1.1] mb-4"
          >
            Fresh Groceries<br />Delivered Directly
          </motion.h2>

          {/* Left Bottom Card (Stacked) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#A6C96B] rounded-[32px] p-[40px] flex flex-col shadow-lg"
          >
            {/* Statistic 1 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-6 mb-4">
                <div className="text-[#294535] text-[72px] font-[800] leading-[0.8] tracking-tighter">65K</div>
                <div className="text-[#294535]/90 text-[14px] leading-[1.4] max-w-[140px] font-[400]">
                  Thousands of families trust us for fresh grocery delivery every day.
                </div>
              </div>
              <div className="text-[#294535] text-[13px] font-[600] uppercase tracking-[4px]">Happy Customers</div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#294535]/10 my-8"></div>

            {/* Statistic 2 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-6 mb-4">
                <div className="text-[#294535] text-[72px] font-[800] leading-[0.8] tracking-tighter">250K</div>
                <div className="text-[#294535]/90 text-[14px] leading-[1.4] max-w-[140px] font-[400]">
                  Fresh groceries delivered with speed, quality, and care.
                </div>
              </div>
              <div className="text-[#294535] text-[13px] font-[600] uppercase tracking-[4px]">Orders Delivered</div>
            </div>
          </motion.div>

          {/* Right Card (Stacked) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[32px] p-[40px] relative overflow-hidden shadow-lg h-[520px]"
            style={{ background: 'linear-gradient(135deg, #C9E58A, #B5D67A)' }}
          >
            {/* Background Decorations */}
            <svg className="absolute bottom-0 right-0 w-full h-[70%] pointer-events-none opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,100 C30,70 60,80 100,40 L100,100 Z" fill="#9CC562" />
              <path d="M20,100 C50,60 70,65 100,20 L100,100 Z" fill="#8BB852" />
            </svg>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-[#294535] text-[28px] font-[700] mb-8">
                Why Shop With Us?
              </h3>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1">
                    <FaCheck className="text-[#A6C96B] text-[10px]" />
                  </div>
                  <div>
                    <h4 className="text-[#294535] text-[18px] font-[600] mb-1">Farm Fresh Products</h4>
                    <p className="text-[#294535]/80 text-[14px] font-[400] leading-[1.5]">
                      Fresh vegetables, fruits, dairy, and groceries sourced directly from trusted farms.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1">
                    <FaCheck className="text-[#A6C96B] text-[10px]" />
                  </div>
                  <div>
                    <h4 className="text-[#294535] text-[18px] font-[600] mb-1">Quality Guaranteed</h4>
                    <p className="text-[#294535]/80 text-[14px] font-[400] leading-[1.5]">
                      Every product is carefully selected and quality checked before reaching your doorstep.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Illustration */}
            <img
              src={groceryImg}
              alt="Fresh Groceries"
              className="absolute bottom-[-10px] right-[-10px] w-[300px] object-contain mix-blend-multiply z-10"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
