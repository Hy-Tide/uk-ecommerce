import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const BlogNav = ({ previousPost, nextPost }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-16 pt-8 border-t border-slate-100">
      
      {/* Previous Post */}
      <div className="w-full md:w-1/2">
        {previousPost && (
          <Link to={`/blog/${previousPost.slug}`} className="group flex items-center gap-4 bg-[#FAFAF8] p-4 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-[#2E8B57] group-hover:-translate-x-1 transition-all flex-shrink-0">
              <FiArrowLeft />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Previous Article</p>
              <h4 className="font-bold text-slate-800 line-clamp-1 group-hover:text-[#2E8B57] transition-colors">{previousPost.title}</h4>
            </div>
          </Link>
        )}
      </div>

      {/* Next Post */}
      <div className="w-full md:w-1/2 text-right">
        {nextPost && (
          <Link to={`/blog/${nextPost.slug}`} className="group flex items-center justify-end gap-4 bg-[#FAFAF8] p-4 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Next Article</p>
              <h4 className="font-bold text-slate-800 line-clamp-1 group-hover:text-[#2E8B57] transition-colors">{nextPost.title}</h4>
            </div>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-[#2E8B57] group-hover:translate-x-1 transition-all flex-shrink-0">
              <FiArrowRight />
            </div>
          </Link>
        )}
      </div>

    </div>
  );
};

export default BlogNav;
