import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiCalendar, FiAlertCircle } from 'react-icons/fi';

const BusinessHours = () => {
  const hours = [
    { 
      day: 'Monday – Friday', 
      time: '9:00 AM – 8:00 PM', 
      icon: <FiClock />,
      color: 'bg-emerald-50 text-[#2E8B57] border-[#2E8B57]/20',
      status: 'Open'
    },
    { 
      day: 'Saturday', 
      time: '9:00 AM – 6:00 PM', 
      icon: <FiCalendar />,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      status: 'Open'
    },
    { 
      day: 'Sunday', 
      time: '10:00 AM – 4:00 PM', 
      icon: <FiCalendar />,
      color: 'bg-orange-50 text-[#FF8A00] border-[#FF8A00]/20',
      status: 'Reduced Hours'
    },
    { 
      day: 'Bank Holidays', 
      time: '10:00 AM – 2:00 PM', 
      icon: <FiAlertCircle />,
      color: 'bg-rose-50 text-rose-500 border-rose-200',
      status: 'Limited Support'
    }
  ];

  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="container px-4">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">Business & Support Hours</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Our customer support team and warehouse operate on the following schedule. Online ordering is available 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hours.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 border-t-4 shadow-sm hover:shadow-md transition-shadow flex flex-col ${item.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm text-xl border border-slate-100">
                  {item.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
                  {item.status}
                </span>
              </div>
              
              <h3 className="text-slate-800 font-bold text-lg mb-1">{item.day}</h3>
              <p className="font-black text-xl mb-2">{item.time}</p>
              
              <div className="mt-auto pt-4 border-t border-slate-100">
                <span className="text-slate-500 text-sm font-medium">UK Time (GMT/BST)</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BusinessHours;
