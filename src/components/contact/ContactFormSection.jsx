import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiSend } from 'react-icons/fi';

const ContactFormSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after a delay for demo purposes
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact-form" className="py-20 bg-white">
      <div className="container px-4">
        <div className="bg-[#FAFAF8] rounded-[32px] overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
          
          {/* Left Side: Illustration / Info */}
          <div className="w-full lg:w-[45%] p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden bg-[#294535]">
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 leading-tight">
                Let's start a conversation
              </h2>
              <p className="text-white/80 text-lg mb-10 leading-relaxed font-medium">
                Whether you have a question about our authentic Indian groceries, your recent delivery, or anything else, our team is ready to answer all your questions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-[#294535] font-black text-xl">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Send your query</h4>
                    <p className="text-white/70 text-sm">Fill out the form with details</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-[#294535] font-black text-xl">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Fast review</h4>
                    <p className="text-white/70 text-sm">Our support team reviews it instantly</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className="w-12 h-12 bg-[#FF8A00] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#FF8A00]/30">
                    <FiCheck className="text-white text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Quick resolution</h4>
                    <p className="text-white/70 text-sm">Get a response within 2-4 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative bg elements */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#FF8A00]/10 rounded-full blur-3xl"></div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-[55%] p-10 lg:p-16 bg-white relative">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <div className="w-16 h-16 bg-[#2E8B57] rounded-full flex items-center justify-center shadow-lg shadow-[#2E8B57]/30">
                    <FiCheck className="text-white text-3xl" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-4">Message Sent!</h3>
                <p className="text-slate-500 text-lg max-w-md mx-auto">
                  Thank you for reaching out. A member of our support team will get back to you at the email provided within 2-4 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-[#2E8B57] font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                <h3 className="text-2xl font-bold text-slate-800 mb-8">Send us a message</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Full Name */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      className="w-full bg-[#f9fafb] border border-slate-200 rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-800"
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com"
                      className="w-full bg-[#f9fafb] border border-slate-200 rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Phone */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+44 7000 000000"
                      className="w-full bg-[#f9fafb] border border-slate-200 rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-800"
                    />
                  </div>
                  
                  {/* Order Number */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Order Number (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="#LIS-12345"
                      className="w-full bg-[#f9fafb] border border-slate-200 rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="relative mb-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject *</label>
                  <select 
                    required
                    className="w-full bg-[#f9fafb] border border-slate-200 rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-800 appearance-none"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 1rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em" }}
                  >
                    <option value="" disabled selected>Select a subject</option>
                    <option value="order_status">Where is my order?</option>
                    <option value="return_refund">Returns & Refunds</option>
                    <option value="product_inquiry">Product Inquiry</option>
                    <option value="wholesale">Wholesale & Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="relative mb-8">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message *</label>
                  <textarea 
                    required
                    placeholder="How can we help you today?"
                    rows="4"
                    className="w-full bg-[#f9fafb] border border-slate-200 rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-800 resize-none"
                  ></textarea>
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="relative flex items-center">
                    <input type="checkbox" required className="w-5 h-5 border-slate-300 rounded text-[#2E8B57] focus:ring-[#2E8B57] cursor-pointer" />
                  </div>
                  <label className="text-sm text-slate-500 font-medium cursor-pointer">
                    I agree to the <a href="#" className="text-[#2E8B57] hover:underline font-bold">Privacy Policy</a> and consent to my data being processed.
                  </label>
                </div>

                {/* Submit */}
                <button 
                  type="submit"
                  className="w-full md:w-auto mt-auto bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold text-lg px-10 py-4 rounded-[16px] shadow-[0_8px_20px_rgba(46,139,87,0.25)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Send Message <FiSend />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
