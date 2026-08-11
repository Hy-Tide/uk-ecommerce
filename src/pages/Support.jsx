import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiPhoneCall, FiMail, FiChevronDown, FiExternalLink } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import AccountPageHeader from '../components/account/AccountPageHeader';

const faqs = [
  { q: 'How long does delivery take?', a: 'Standard delivery takes 2-3 working days. Next day delivery is available for orders placed before 2 PM.' },
  { q: 'Do you deliver fresh produce?', a: 'Yes, fresh vegetables and fruits are delivered across London with specialized temperature-controlled packaging.' },
  { q: 'How can I return an item?', a: 'You can initiate a return from your "My Orders" page within 14 days of delivery for eligible items.' },
  { q: 'Where is my order?', a: 'You can track your order status in real-time from the "My Orders" or "Track Order" sections in your account.' },
];

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title="Help & Support" />

      <div className="container px-4 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Support Area */}
          <div className="lg:col-span-2 space-y-8">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-8"
            >
              <h2 className="text-2xl font-black text-slate-800 mb-6">Send us a message</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                    <select className="w-full bg-[#FAFAF8] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-700">
                      <option>Order Issue</option>
                      <option>Delivery Inquiry</option>
                      <option>Product Information</option>
                      <option>Returns & Refunds</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Order ID (Optional)</label>
                    <input type="text" placeholder="e.g. ORD-2026-..." className="w-full bg-[#FAFAF8] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-700" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea rows="5" placeholder="How can we help you today?" className="w-full bg-[#FAFAF8] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-700 resize-none"></textarea>
                </div>
                <button type="button" className="bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-sm shadow-[#2E8B57]/20 flex items-center gap-2">
                  <FiMail /> Send Message
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-8"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <details key={index} className="group bg-[#FAFAF8] rounded-xl border border-slate-100 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-slate-800">
                      {faq.q}
                      <FiChevronDown className="transition-transform group-open:rotate-180 text-slate-400" />
                    </summary>
                    <div className="p-4 pt-0 text-slate-600 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Quick Contact Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-[#25D366]/10 rounded-[24px] border border-[#25D366]/20 shadow-sm p-6 flex flex-col items-center text-center hover:bg-[#25D366]/20 transition-colors cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <FaWhatsapp size={24} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">WhatsApp Support</h3>
              <p className="text-slate-600 text-sm mb-4">Fastest way to get help. We usually reply in 5 minutes.</p>
              <span className="text-[#25D366] font-bold text-sm flex items-center gap-1">Chat Now <FiExternalLink /></span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-[#FAFAF8] text-[#2E8B57] flex items-center justify-center mb-4 shadow-sm group-hover:bg-[#2E8B57] group-hover:text-white transition-all">
                <FiPhoneCall size={24} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">Call Us</h3>
              <p className="text-slate-600 text-sm mb-4">Available Mon-Sat, 9 AM - 6 PM.</p>
              <span className="text-[#2E8B57] font-bold text-lg">+44 20 1234 5678</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-[#FAFAF8] text-blue-500 flex items-center justify-center mb-4 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-all">
                <FiMessageSquare size={24} />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">Live Chat</h3>
              <p className="text-slate-600 text-sm mb-4">Speak with a customer service agent right now.</p>
              <span className="text-blue-500 font-bold text-sm">Start Chat</span>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Support;
