import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';

const BlogBreadcrumb = ({ category, title }) => {
  return (
    <div className="bg-white border-b border-slate-100 py-4 hidden md:block">
      <div className="container px-4">
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 overflow-x-auto hide-scrollbar whitespace-nowrap">
          <Link to="/" className="hover:text-[#2E8B57] transition-colors flex items-center gap-1">
            <FiHome /> Home
          </Link>
          <FiChevronRight className="text-slate-300" />
          <Link to="/blog" className="hover:text-[#2E8B57] transition-colors">
            Blog
          </Link>
          <FiChevronRight className="text-slate-300" />
          <span className="hover:text-[#2E8B57] transition-colors cursor-pointer">
            {category}
          </span>
          <FiChevronRight className="text-slate-300" />
          <span className="text-slate-800 font-bold truncate max-w-[300px]">
            {title}
          </span>
        </nav>
      </div>
    </div>
  );
};

export default BlogBreadcrumb;
