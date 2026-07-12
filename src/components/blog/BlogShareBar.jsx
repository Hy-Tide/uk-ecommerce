import React from 'react';
import { FiFacebook, FiTwitter, FiLinkedin, FiLink2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const BlogShareBar = () => {
  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:flex flex-col gap-4 fixed left-8 top-1/3 z-40">
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <FiFacebook className="text-xl group-hover:scale-110 transition-transform" />
        </button>
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <FiTwitter className="text-xl group-hover:scale-110 transition-transform" />
        </button>
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-blue-700 hover:border-blue-700 border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <FiLinkedin className="text-xl group-hover:scale-110 transition-transform" />
        </button>
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-[#25D366] hover:border-[#25D366] border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
        </button>
        <div className="w-6 border-b border-slate-200 mx-auto my-1"></div>
        <button className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:text-[#2E8B57] hover:border-[#2E8B57] border border-slate-200 shadow-sm hover:shadow-md transition-all group" title="Copy Link">
          <FiLink2 className="text-xl group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-lg border border-slate-200 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-50 p-3 flex justify-between items-center">
        <span className="font-bold text-slate-800 text-sm ml-2">Share:</span>
        <div className="flex gap-2">
          <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/10 transition-colors">
            <FaWhatsapp size={18} />
          </button>
          <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
            <FiFacebook size={18} />
          </button>
          <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-sky-500 hover:bg-sky-50 transition-colors">
            <FiTwitter size={18} />
          </button>
          <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200">
            <FiLink2 size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogShareBar;
