import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';

const AccountPageHeader = ({ title }) => {
  return (
    <div className="bg-white border-b border-slate-100 py-6 mb-8 shadow-sm">
      <div className="container px-4 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 overflow-x-auto hide-scrollbar whitespace-nowrap mb-4">
          <Link to={ROUTES.HOME} className="hover:text-[#2E8B57] transition-colors flex items-center gap-1">
            <FiHome /> Home
          </Link>
          <FiChevronRight className="text-slate-300" />
          <span className="text-slate-500">My Account</span>
          <FiChevronRight className="text-slate-300" />
          <span className="text-slate-800 font-bold">
            {title}
          </span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl font-black text-slate-800">
          {title}
        </h1>

      </div>
    </div>
  );
};

export default AccountPageHeader;
