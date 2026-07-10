import React, { useState } from 'react';
import { FiPackage, FiDollarSign, FiTag, FiClock, FiCheck } from 'react-icons/fi';

const initialNotifications = [
  {
    id: 1,
    title: 'Order Delivered',
    message: 'Your order #UK-294182 has been delivered successfully. Enjoy your fresh groceries!',
    time: '2 hours ago',
    icon: <FiPackage className="w-5 h-5 text-green-500" />,
    bg: 'bg-green-100 border-green-200',
    unread: true
  },
  {
    id: 2,
    title: 'Payment Successful',
    message: 'We have received your payment of £45.99 for order #UK-294182.',
    time: 'Yesterday',
    icon: <FiDollarSign className="w-5 h-5 text-blue-500" />,
    bg: 'bg-blue-100 border-blue-200',
    unread: true
  },
  {
    id: 3,
    title: 'New Offers Available!',
    message: 'Get 20% off on all organic fruits this weekend. Use code FRESH20.',
    time: '2 days ago',
    icon: <FiTag className="w-5 h-5 text-orange-500" />,
    bg: 'bg-orange-100 border-orange-200',
    unread: false
  },
  {
    id: 4,
    title: 'Delivery Delay',
    message: 'Sorry! Due to heavy rain, your delivery might be delayed by 30 mins.',
    time: 'Oct 12, 2024',
    icon: <FiClock className="w-5 h-5 text-red-500" />,
    bg: 'bg-red-100 border-red-200',
    unread: false
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const hasUnread = notifications.some(n => n.unread);

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Notifications</h1>
          <p className="text-slate-500 text-sm mt-1">Stay updated with your orders and offers.</p>
        </div>
        
        {hasUnread && (
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors shrink-0"
          >
            <FiCheck className="w-4 h-4 text-green-500" />
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-6 flex gap-4 transition-colors hover:bg-slate-50 ${
                  notification.unread ? 'bg-primary-50/30 relative' : ''
                }`}
              >
                {notification.unread && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                )}
                
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 ${notification.bg}`}>
                  {notification.icon}
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                    <h4 className={`text-sm ${notification.unread ? 'font-bold text-dark' : 'font-semibold text-slate-700'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 mb-6 rounded-full bg-slate-50 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-dark mb-2">No notifications yet</h3>
          <p className="text-slate-500 max-w-sm mb-6">When you get updates about your orders or special offers, they will appear here.</p>
          <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-md shadow-primary/20">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
