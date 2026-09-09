import React, { useState } from 'react';
import { FiMail, FiArrowRight, FiCheck } from 'react-icons/fi';

const BlogNewsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-16 bg-[#FBF6EE] border-t border-[#ede8e0]">
      <div className="container px-4">
        <div className="bg-[#0C3823] rounded-[28px] overflow-hidden relative">

          {/* Background decorations */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(238,108,31,0.2)_0%,_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(46,139,87,0.2)_0%,_transparent_55%)]" />
          <div className="absolute -bottom-14 -right-14 w-56 h-56 rounded-full bg-white/[0.04] border border-white/[0.06]" />

          <div className="relative z-10 px-8 py-12 md:px-16 flex flex-col md:flex-row items-center gap-10">

            {/* Left */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-[#FF8A00]/20 border border-[#FF8A00]/30 rounded-full px-4 py-1.5 mb-5">
                <FiMail className="text-[#FF8A00] text-sm" />
                <span className="text-[#FF8A00] font-bold text-xs uppercase tracking-widest">Weekly Newsletter</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                Get weekly recipes & tips<br className="hidden md:block" /> <span className="text-[#FF8A00]">from Nani</span>
              </h2>
              <p className="text-white/60 text-sm font-medium max-w-sm mx-auto md:mx-0">
                Authentic recipes, grocery guides, and seasonal offers — delivered to your inbox every Thursday.
              </p>
            </div>

            {/* Right: Form */}
            <div className="w-full md:w-auto md:min-w-[380px] flex-shrink-0">
              {submitted ? (
                <div className="flex items-center gap-3 bg-[#2E8B57]/20 border border-[#2E8B57]/30 rounded-2xl px-6 py-5 text-white">
                  <div className="w-10 h-10 rounded-full bg-[#2E8B57] flex items-center justify-center flex-shrink-0">
                    <FiCheck size={20} />
                  </div>
                  <div>
                    <p className="font-bold">You're subscribed!</p>
                    <p className="text-white/60 text-sm">Your first newsletter arrives Thursday.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/15 transition-all font-medium text-slate-700 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex-shrink-0 flex items-center justify-center gap-2 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-bold px-6 py-3.5 rounded-xl shadow-md shadow-[#FF8A00]/25 hover:-translate-y-0.5 transition-all text-sm"
                  >
                    Subscribe <FiArrowRight size={16} />
                  </button>
                </form>
              )}
              <p className="text-white/35 text-xs mt-3 text-center sm:text-left">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogNewsletter;
