import React from 'react';
import { cn } from '../../utils/helpers';

const SectionTitle = ({ title, subtitle, centered = false, className }) => {
  return (
    <div className={cn('mb-8', centered && 'text-center', className)}>
      <h2 className="text-2xl md:text-3xl font-bold text-dark mb-2">{title}</h2>
      {subtitle && <p className="text-slate-500">{subtitle}</p>}
      <div className={cn('h-1 w-16 bg-primary rounded mt-3', centered && 'mx-auto')}></div>
    </div>
  );
};

export default SectionTitle;
