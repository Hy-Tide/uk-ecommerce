import React from 'react';
import { motion } from 'framer-motion';
import { FiPhoneCall, FiMail, FiMapPin, FiMessageSquare, FiArrowRight } from 'react-icons/fi';

const ContactCards = () => {
  const cards = [
    {
      id: 'phone',
      icon: <FiPhoneCall size={24} />,
      title: 'Customer Support',
      detail: '+44 7700 900000',
      subtext: 'Available Mon–Sat | 9 AM – 8 PM',
      actionText: 'Call Now',
      actionLink: 'tel:+447700900000',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'email',
      icon: <FiMail size={24} />,
      title: 'Email Support',
      detail: 'support@ukgroceries.com',
      subtext: 'Reply within 24 hours',
      actionText: 'Send Email',
      actionLink: 'mailto:support@ukgroceries.com',
      color: 'bg-emerald-50 text-[#2E8B57]',
    },
    {
      id: 'warehouse',
      icon: <FiMapPin size={24} />,
      title: 'Warehouse Address',
      detail: 'UK Groceries',
      subtext: 'London, United Kingdom',
      actionText: 'Show on Map',
      actionLink: '#locations',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      id: 'whatsapp',
      icon: <FiMessageSquare size={24} />,
      title: 'WhatsApp Support',
      detail: 'Chat Instantly',
      subtext: 'Average response time: Under 5 Minutes',
      actionText: 'Start Chat',
      actionLink: '#',
      color: 'bg-[#25D366]/10 text-[#25D366]',
    }
  ];

  return (
    <section className="relative z-20 -mt-10 mb-16 container px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.a
            href={card.actionLink}
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-[#2E8B57]/5 hover:border-[#2E8B57]/20 transition-all duration-300 flex flex-col h-full"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${card.color} group-hover:scale-110 transition-transform duration-300`}>
              {card.icon}
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">{card.title}</h3>
            
            <div className="flex-grow">
              <p className="text-[#2E8B57] font-bold text-lg mb-1 leading-tight">{card.detail}</p>
              <p className="text-slate-500 text-sm font-medium">{card.subtext}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400 group-hover:text-[#FF8A00] transition-colors">
              <span className="font-bold text-sm">{card.actionText}</span>
              <FiArrowRight />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ContactCards;
