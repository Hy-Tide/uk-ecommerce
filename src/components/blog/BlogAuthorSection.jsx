import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const BlogAuthorSection = ({ author }) => {
  if (!author) return null;

  return (
    <div className="mt-16 bg-[#FAFAF8] rounded-[32px] p-8 md:p-10 border border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
      
      <div className="flex-shrink-0">
        <img src={author.avatar} alt={author.name} className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white" />
      </div>

      <div className="flex-grow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-[#2E8B57] text-xs font-bold uppercase tracking-wider mb-1">Written By</p>
            <h3 className="text-2xl font-black text-slate-800">{author.name}</h3>
            <p className="text-slate-500 font-medium">{author.role}</p>
          </div>
          <button className="w-full md:w-auto bg-white border-2 border-slate-200 hover:border-[#2E8B57] text-slate-700 hover:text-[#2E8B57] font-bold px-6 py-2 rounded-xl transition-all">
            Follow
          </button>
        </div>
        
        <p className="text-slate-600 leading-relaxed mb-6">
          {author.bio}
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#FF8A00] hover:border-[#FF8A00] transition-colors"><FiFacebook /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#FF8A00] hover:border-[#FF8A00] transition-colors"><FiTwitter /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#FF8A00] hover:border-[#FF8A00] transition-colors"><FiInstagram /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#FF8A00] hover:border-[#FF8A00] transition-colors"><FiLinkedin /></a>
        </div>
      </div>

    </div>
  );
};

export default BlogAuthorSection;
