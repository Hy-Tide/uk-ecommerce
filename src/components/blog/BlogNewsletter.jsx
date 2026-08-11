import React from 'react';
import { FiMail } from 'react-icons/fi';

const BlogNewsletter = () => {
  return (
    <section className="py-20 bg-[#1D3B2A] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2E8B57] rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF8A00] rounded-full blur-[100px] opacity-20"></div>

      <div className="container px-4 relative z-10 text-center max-w-3xl mx-auto">
        
        <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#FF8A00] text-3xl mb-8 shadow-xl border border-white/10">
          <FiMail />
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
          Never Miss a New Recipe or Grocery Guide
        </h2>
        
        <p className="text-lg text-white/80 font-medium mb-10 max-w-xl mx-auto">
          Subscribe to receive weekly recipes, grocery tips, seasonal offers, and exclusive cooking inspiration delivered straight to your inbox.
        </p>

        <form className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto bg-white/5 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
          <input 
            type="email" 
            placeholder="Enter your email address..." 
            required
            className="w-full bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-white/40 font-medium"
          />
          <button 
            type="submit"
            className="w-full sm:w-auto flex-shrink-0 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-bold px-8 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(255,138,0,0.3)] hover:-translate-y-1 transition-all"
          >
            Subscribe
          </button>
        </form>

        <p className="text-white/40 text-sm mt-6 font-medium">
          We care about your data in our <a href="#" className="text-white hover:underline">privacy policy</a>.
        </p>

      </div>
    </section>
  );
};

export default BlogNewsletter;
