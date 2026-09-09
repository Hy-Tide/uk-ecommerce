import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiSend } from 'react-icons/fi';
import { postData } from '../../services/webservices';
import { useToast } from '../../context/ToastContext';

const ContactFormSection = () => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    orderNumber: '',
    subject: '',
    message: '',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await postData('website/contact', formData);
      if (response && response.success !== false) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          orderNumber: '',
          subject: '',
          message: '',
          agree: false
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        showToast(response?.error || 'Failed to submit form', 'error');
      }
    } catch (error) {
      showToast('Error submitting form', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-form" className="py-20">
      <div className="container px-4">
        <div className="bg-white rounded-[28px] overflow-hidden border border-[#E4E9E1] flex flex-col lg:flex-row shadow-[0_20px_60px_-25px_rgba(28,75,46,0.3)]">

          {/* Left Side: Info */}
          <div className="w-full lg:w-[45%] flex flex-col justify-between relative overflow-hidden bg-[#0C3823]">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(238,108,31,0.22)_0%,_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(46,139,87,0.25)_0%,_transparent_60%)]" />
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/[0.04] border border-white/[0.07]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#EE6C1F]/[0.07] border border-[#EE6C1F]/[0.09]" />
            <div className="absolute top-1/2 -right-10 w-40 h-40 rounded-full bg-white/[0.03]" />

            <div className="relative z-10 p-10 lg:p-14 flex flex-col h-full">

              {/* Top: Logo + response badge */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg p-1.5">
                    <img src="/images/logo.png" alt="Grandma's Basket" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-white font-bold text-sm tracking-tight leading-tight">Grandma's<br />Basket</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#EE6C1F]/20 border border-[#EE6C1F]/30 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EE6C1F] animate-pulse flex-shrink-0" />
                  <span className="text-[#EE6C1F] font-semibold text-xs">Replies in 2–4 hrs</span>
                </div>
              </div>

              {/* Headline */}
              <div className="mb-8">
                <p className="text-[#EE6C1F] text-xs font-bold uppercase tracking-widest mb-3">Get in touch</p>
                <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                  We'd love to<br />hear from you
                </h2>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                  Whether it's an order, a question about a product, or just a recipe tip — our team personally reads and replies to every message.
                </p>
              </div>

              {/* Contact Info Items */}
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 rounded-2xl bg-white/[0.07] border border-white/[0.08] px-5 py-4 group hover:bg-white/[0.11] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#EE6C1F]/20 border border-[#EE6C1F]/25 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#EE6C1F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/45 text-[11px] font-semibold uppercase tracking-wider mb-0.5">Email us</p>
                    <p className="text-white font-semibold text-sm">hello@grandmasbasket.co.uk</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-white/[0.07] border border-white/[0.08] px-5 py-4 group hover:bg-white/[0.11] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#EE6C1F]/20 border border-[#EE6C1F]/25 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#EE6C1F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/45 text-[11px] font-semibold uppercase tracking-wider mb-0.5">Support hours</p>
                    <p className="text-white font-semibold text-sm">Mon–Sat, 9 am – 6 pm GMT</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-white/[0.07] border border-white/[0.08] px-5 py-4 group hover:bg-white/[0.11] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#EE6C1F]/20 border border-[#EE6C1F]/25 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#EE6C1F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/45 text-[11px] font-semibold uppercase tracking-wider mb-0.5">Online ordering</p>
                    <p className="text-white font-semibold text-sm">Available 24/7 — always open</p>
                  </div>
                </div>
              </div>

              {/* Bottom quote */}
              <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-white/65 text-sm italic leading-relaxed">
                  "Every kitchen has a story. Tell us yours — we'll help make it taste even better."
                </p>
                <p className="text-[#EE6C1F] text-sm font-bold mt-2">— Nani</p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-[55%] p-10 lg:p-16 bg-white relative">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-20 h-20 bg-[#1C4B2E]/10 rounded-full flex items-center justify-center mb-6">
                  <div className="w-14 h-14 bg-[#1C4B2E] rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-2xl" />
                  </div>
                </div>
                <h3
                  className="text-3xl text-[#1C4B2E] mb-4"
                  style={{ fontFamily: "'Baloo 2', ui-rounded, sans-serif", fontWeight: 700 }}
                >
                  Message sent!
                </h3>
                <p className="text-slate-500 text-lg max-w-md mx-auto">
                  Thanks for reaching out. Someone from our team will reply
                  to the email you gave us within 2&ndash;4 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-[#EE6C1F] font-semibold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                <h3
                  className="text-2xl text-[#1C4B2E] mb-8"
                  style={{ fontFamily: "'Baloo 2', ui-rounded, sans-serif", fontWeight: 700 }}
                >
                  Send us a message
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Full Name */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Priya Sharma"
                      className="w-full bg-[#FBF6EE] border border-[#E4E9E1] rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-[#1C4B2E] focus:ring-4 focus:ring-[#1C4B2E]/10 transition-all font-medium text-slate-800"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="priya@example.co.uk"
                      className="w-full bg-[#FBF6EE] border border-[#E4E9E1] rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-[#1C4B2E] focus:ring-4 focus:ring-[#1C4B2E]/10 transition-all font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Phone */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="07700 900123"
                      className="w-full bg-[#FBF6EE] border border-[#E4E9E1] rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-[#1C4B2E] focus:ring-4 focus:ring-[#1C4B2E]/10 transition-all font-medium text-slate-800"
                    />
                  </div>

                  {/* Order Number */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Order number (optional)</label>
                    <input
                      type="text"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      placeholder="e.g. GB-10293"
                      className="w-full bg-[#FBF6EE] border border-[#E4E9E1] rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-[#1C4B2E] focus:ring-4 focus:ring-[#1C4B2E]/10 transition-all font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="relative mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#FBF6EE] border border-[#E4E9E1] rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-[#1C4B2E] focus:ring-4 focus:ring-[#1C4B2E]/10 transition-all font-medium text-slate-800 appearance-none"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 1rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em" }}
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="order_status">Where's my order?</option>
                    <option value="return_refund">Returns &amp; refunds</option>
                    <option value="product_inquiry">Spice &amp; recipe questions</option>
                    <option value="wholesale">Wholesale &amp; stockists</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                {/* Message */}
                <div className="relative mb-8">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    rows="4"
                    className="w-full bg-[#FBF6EE] border border-[#E4E9E1] rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-[#1C4B2E] focus:ring-4 focus:ring-[#1C4B2E]/10 transition-all font-medium text-slate-800 resize-none"
                  ></textarea>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3 mb-8">
                  <input
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    type="checkbox"
                    required
                    className="w-5 h-5 mt-0.5 border-slate-300 rounded text-[#1C4B2E] focus:ring-[#1C4B2E] cursor-pointer flex-shrink-0"
                  />
                  <label className="text-sm text-slate-500 font-medium cursor-pointer">
                    I agree to the <a href="#" className="text-[#1C4B2E] hover:underline font-semibold">Privacy Policy</a> and consent to my data being processed.
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto mt-auto bg-[#EE6C1F] hover:bg-[#D35814] disabled:opacity-70 text-white font-semibold text-lg px-10 py-4 rounded-2xl shadow-[0_10px_25px_-8px_rgba(238,108,31,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {loading ? 'Sending…' : 'Send message'} <FiSend />
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