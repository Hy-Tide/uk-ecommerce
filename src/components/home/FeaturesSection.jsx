import React, { useState, useEffect } from 'react';
import { FiTruck, FiShield, FiLock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getData } from '../../services/webservices';

<<<<<<< HEAD
const FeaturesSection = () => {
  const features = [
    {
      icon: <FiTruck size={24} className="text-green-600" />,
      bg: 'bg-green-50',
      title: 'Free Delivery',
      desc: 'On orders over £40'
    },
    {
      icon: <FiShield size={24} className="text-orange-500" />,
      bg: 'bg-orange-50',
      title: '100% Authentic',
      desc: 'Genuine Indian brands'
    },
    {
      icon: <FiLock size={24} className="text-yellow-600" />,
      bg: 'bg-yellow-50',
      title: 'Secure Payment',
      desc: 'Stripe'
    },
    {
      icon: <FaWhatsapp size={24} className="text-green-500" />,
      bg: 'bg-green-50',
      title: 'WhatsApp Support',
      desc: 'Chat with us anytime'
    }
=======
const FeaturesSection = ({ data }) => {
  const featuresData = data?.items || [];

  const defaultIcons = [
    { icon: <FiTruck size={24} className="text-green-600" />, bg: 'bg-green-50' },
    { icon: <FiShield size={24} className="text-orange-500" />, bg: 'bg-orange-50' },
    { icon: <FiLock size={24} className="text-yellow-600" />, bg: 'bg-yellow-50' },
    { icon: <FaWhatsapp size={24} className="text-green-500" />, bg: 'bg-green-50' }
>>>>>>> main
  ];

  return (
    <section className="bg-white border-b border-slate-100">
      <div className="container py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {featuresData.map((feature, idx) => {
            const iconData = defaultIcons[idx % defaultIcons.length];
            return (
              <div key={idx} className="flex items-center gap-4 py-4 sm:py-0 px-4 first:pl-0 last:pr-0 justify-center sm:justify-start lg:justify-center">
                <div className={`w-14 h-14 rounded-2xl ${iconData.bg} flex items-center justify-center flex-shrink-0`}>
                  {iconData.icon}
                </div>
                <div>
                  <h4 className="font-bold text-dark text-[15px] mb-0.5">{feature.title}</h4>
                  <p className="text-slate-500 text-sm">{feature.description}</p>
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
