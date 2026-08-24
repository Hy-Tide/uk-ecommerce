import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiPhoneCall, FiMail, FiChevronDown, FiExternalLink, FiChevronRight, FiUser, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useToast } from '../context/ToastContext';
import { ROUTES } from '../utils/constants';

const faqs = [
  { q: 'How long does delivery take in the UK?', a: 'Standard UK delivery takes 1-2 business days. Express same-day or next-day delivery is available for orders placed before 2 PM in Greater London.' },
  { q: 'Do you deliver fresh Indian vegetables & dairy?', a: 'Yes! Fresh vegetables, paneer, and sweets are delivered across London with specialized temperature-controlled insulated packaging.' },
  { q: 'How can I return or replace an item?', a: 'You can initiate a return or replacement directly from your "My Orders" page within 14 days of delivery.' },
  { q: 'Where can I track my package live?', a: 'You can track your package status in real-time with live courier updates on our "Track Order" page.' },
];

const Support = () => {
  const { showToast } = useToast();
  const [subject, setSubject] = useState('Order Issue');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      showToast('Please enter your message', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage('');
      setOrderId('');
      showToast('Message sent! Our support team will reply shortly.', 'success');
    }, 800);
  };

  return (
    <div className="bg-[#FAFBF9] min-h-screen pb-20">

      {/* Hero Header Cover */}
      <div className="bg-gradient-to-r from-[#072414] via-[#0C3823] to-[#165636] relative pt-6 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.15),transparent_50%)]"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>

        <div className="container max-w-5xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-emerald-200/80 mb-2">
            <Link to={ROUTES.HOME} className="hover:text-white transition-colors flex items-center gap-1">
              <FiUser size={13} /> Home
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <Link to={ROUTES.PROFILE} className="hover:text-white transition-colors">
              My Account
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <span className="text-white font-bold">Help & Support</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Customer Support & FAQs</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium mt-1">We are here to help you 24/7 with your orders & inquiries</p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto -mt-12 sm:-mt-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Support Area */}
          <div className="lg:col-span-2 space-y-8">

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 sm:p-8"
            >
              <h2 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                <FiMail className="text-[#0C3823]" /> Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#FAFBF9] border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#0C3823] focus:ring-2 focus:ring-[#0C3823]/15 transition-all text-xs font-bold text-slate-800"
                    >
                      <option>Order Issue</option>
                      <option>Delivery Inquiry</option>
                      <option>Product Information</option>
                      <option>Returns & Refunds</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Order ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. ORD-2026-8924"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="w-full bg-[#FAFBF9] border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#0C3823] focus:ring-2 focus:ring-[#0C3823]/15 transition-all text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Message</label>
                  <textarea
                    rows="4"
                    placeholder="Describe your question or issue in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FAFBF9] border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#0C3823] focus:ring-2 focus:ring-[#0C3823]/15 transition-all text-xs font-medium text-slate-800 resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0C3823] hover:bg-[#FF6B00] text-white font-bold text-xs py-3 px-7 rounded-xl transition-all duration-200 shadow-md shadow-[#0C3823]/20 flex items-center gap-2 disabled:opacity-70"
                >
                  <FiSend size={14} /> {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8"
            >
              <h2 className="text-lg font-extrabold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <details key={index} className="group bg-[#FAFBF9] rounded-2xl border border-slate-100 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-extrabold text-xs sm:text-sm text-slate-900">
                      {faq.q}
                      <FiChevronDown className="transition-transform group-open:rotate-180 text-slate-400 shrink-0" />
                    </summary>
                    <div className="p-4 pt-0 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100/60 mt-1 pt-3">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Quick Contact Cards */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="bg-[#25D366]/10 rounded-3xl border border-[#25D366]/30 shadow-xs p-6 flex flex-col items-center text-center hover:bg-[#25D366]/20 transition-colors cursor-pointer group"
            >
              <div className="w-13 h-13 rounded-2xl bg-[#25D366] text-white flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform">
                <FaWhatsapp size={24} />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">WhatsApp Support</h3>
              <p className="text-slate-600 text-xs mb-3 font-medium">Fastest way to get help. Usually replies within 5 minutes.</p>
              <a
                href="https://wa.me/447700900000"
                target="_blank"
                rel="noreferrer"
                className="text-[#25D366] font-bold text-xs flex items-center gap-1 hover:underline"
              >
                Chat Now <FiExternalLink size={12} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-[#0C3823] flex items-center justify-center mb-3 shadow-xs group-hover:bg-[#0C3823] group-hover:text-white transition-all">
                <FiPhoneCall size={22} />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">Call Customer Support</h3>
              <p className="text-slate-500 text-xs mb-3 font-medium">Available Mon-Sat, 9 AM - 6 PM UK</p>
              <a href="tel:+447700900000" className="text-[#0C3823] font-black text-sm hover:underline">
                +44 7700 900000
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FiMessageSquare size={22} />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">Live Chat Agent</h3>
              <p className="text-slate-500 text-xs mb-3 font-medium">Speak with a live customer care team member</p>
              <span className="text-blue-600 font-bold text-xs hover:underline">Start Live Chat</span>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Support;

