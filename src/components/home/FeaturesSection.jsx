import React, { useState, useEffect } from 'react';
import { FiTruck, FiShield, FiLock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getData } from '../../services/webservices';

const FeaturesSection = ({ data }) => {
  const featuresData = data?.items || [];

  const defaultIcons = [
    { icon: <FiTruck size={24} className="text-green-600" />, bg: 'bg-green-50' },
    { icon: <FiShield size={24} className="text-orange-500" />, bg: 'bg-orange-50' },
    { icon: <FiLock size={24} className="text-yellow-600" />, bg: 'bg-yellow-50' },
    { icon: <FaWhatsapp size={24} className="text-green-500" />, bg: 'bg-green-50' }
  ];

  return (
    <section className="bg-white border-b border-slate-100">
      <div className="container py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-2 sm:gap-y-0 sm:gap-x-0 sm:divide-x divide-slate-100">
          {featuresData.map((feature, idx) => {
            const iconData = defaultIcons[idx % defaultIcons.length];
            return (
              <div key={idx} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 py-2 sm:py-0 px-2 sm:px-4 sm:first:pl-0 sm:last:pr-0 text-center sm:text-left justify-center sm:justify-start lg:justify-center">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${iconData.bg} flex items-center justify-center flex-shrink-0`}>
                  {React.cloneElement(iconData.icon, { className: `${iconData.icon.props.className} text-xl sm:text-2xl` })}
                </div>
                <div>
                  <h4 className="font-bold text-dark text-[13px] sm:text-[15px] mb-0.5 leading-tight sm:leading-normal">{feature.title}</h4>
                  <p className="text-slate-500 text-[11px] sm:text-sm leading-tight sm:leading-normal">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
