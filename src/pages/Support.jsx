import React from 'react';
import { FiMessageCircle, FiPhoneCall, FiMail, FiHelpCircle } from 'react-icons/fi';

const Support = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pt-4 lg:pt-10">
      
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-primary-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-primary-100">
          <FiHelpCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-dark mb-3">Need Help?</h1>
        <p className="text-slate-500 text-lg max-w-md mx-auto">
          Contact our support instantly. We are available 24/7 to resolve your queries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* WhatsApp Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center hover:shadow-md hover:border-[#25D366]/30 transition-all group">
          <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <FiMessageCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-dark mb-2">WhatsApp</h3>
          <p className="text-sm text-slate-500 mb-6">Fastest way to get answers. Chat with our virtual assistant or live agent.</p>
          <a 
            href="https://wa.me/440000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1fae54] transition-colors shadow-md shadow-[#25D366]/20"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Call Support */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center hover:shadow-md hover:border-primary/30 transition-all group">
          <div className="w-16 h-16 bg-primary-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <FiPhoneCall className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-dark mb-2">Call Support</h3>
          <p className="text-sm text-slate-500 mb-6">Prefer talking? Call us directly. Available Mon-Sun, 8am to 10pm.</p>
          <a 
            href="tel:+442079460958"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
          >
            Call +44 20 7946
          </a>
        </div>

        {/* Email Support */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center hover:shadow-md hover:border-blue-500/30 transition-all group">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <FiMail className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-dark mb-2">Email Support</h3>
          <p className="text-sm text-slate-500 mb-6">Send us an email and we'll get back to you within 24 hours.</p>
          <a 
            href="mailto:support@freshcart.co.uk"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            Email Us
          </a>
        </div>

      </div>

      <div className="mt-12 bg-slate-50 rounded-2xl border border-slate-100 p-8 text-center">
        <h3 className="text-lg font-bold text-dark mb-2">Frequently Asked Questions</h3>
        <p className="text-sm text-slate-500 mb-4">Find quick answers to common questions about delivery, returns, and refunds.</p>
        <button className="text-primary font-bold hover:underline">Visit Help Center →</button>
      </div>

    </div>
  );
};

export default Support;
