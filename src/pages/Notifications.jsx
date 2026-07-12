import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBox, FiTag, FiGift, FiHeart, FiMoreVertical } from 'react-icons/fi';
import AccountPageHeader from '../components/account/AccountPageHeader';

const dummyNotifications = [
  {
    id: 1,
    title: 'Order Delivered',
    message: 'Your order #ORD-2026-8924 has been successfully delivered. Enjoy your groceries!',
    time: '2 hours ago',
    type: 'order',
    isUnread: true,
  },
  {
    id: 2,
    title: 'New Offer on Spices',
    message: 'Get 20% off on all whole spices this weekend. Use code SPICE20 at checkout.',
    time: '1 day ago',
    type: 'offer',
    isUnread: true,
  },
  {
    id: 3,
    title: 'Cashback Earned',
    message: 'You have earned £5.00 cashback from your last order. It has been added to your Rewards wallet.',
    time: '3 days ago',
    type: 'reward',
    isUnread: false,
  },
  {
    id: 4,
    title: 'Wishlist Item Back in Stock',
    message: 'Good news! Premium Saffron (1g) is back in stock. Grab it before it runs out again.',
    time: '5 days ago',
    type: 'wishlist',
    isUnread: false,
  },
];

const getIconForType = (type) => {
  switch (type) {
    case 'order': return <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#2E8B57] flex items-center justify-center flex-shrink-0"><FiBox size={20} /></div>;
    case 'offer': return <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0"><FiTag size={20} /></div>;
    case 'reward': return <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center flex-shrink-0"><FiGift size={20} /></div>;
    case 'wishlist': return <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0"><FiHeart size={20} /></div>;
    default: return <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center flex-shrink-0"><FiBox size={20} /></div>;
  }
};

const Notifications = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title="Notifications" />

      <div className="container px-4 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
          
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#FAFAF8]">
            <h3 className="font-bold text-slate-800 text-lg">All Notifications</h3>
            <button className="text-sm font-bold text-[#2E8B57] hover:underline">Mark all as read</button>
          </div>

          <div className="divide-y divide-slate-100">
            {dummyNotifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`p-6 flex items-start gap-4 transition-colors relative group ${notif.isUnread ? 'bg-emerald-50/30' : 'hover:bg-slate-50/50'}`}
              >
                {notif.isUnread && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2E8B57]"></div>
                )}
                
                {getIconForType(notif.type)}
                
                <div className="flex-1 min-w-0 pr-8">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-bold ${notif.isUnread ? 'text-slate-900' : 'text-slate-800'}`}>{notif.title}</h4>
                    {notif.isUnread && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                  </div>
                  <p className={`text-sm leading-relaxed mb-2 ${notif.isUnread ? 'text-slate-700 font-medium' : 'text-slate-600'}`}>
                    {notif.message}
                  </p>
                  <p className="text-xs font-bold text-slate-400">{notif.time}</p>
                </div>

                <button className="text-slate-400 hover:text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-slate-100">
                  <FiMoreVertical />
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Notifications;
