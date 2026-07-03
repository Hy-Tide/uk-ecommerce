import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';

const Breadcrumbs = ({ paths }) => {
  return (
    <nav className="flex items-center text-xs font-bold text-slate-400 py-4">
      <Link to={ROUTES.HOME} className="hover:text-primary transition-colors">Home</Link>
      
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          <FiChevronRight className="mx-2 text-slate-300" size={12} />
          {path.url ? (
            <Link to={path.url} className="hover:text-primary transition-colors">
              {path.name}
            </Link>
          ) : (
            <span className="text-dark">{path.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
