import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiBox, FiTag, FiGift, FiHeart, FiMoreVertical, FiChevronRight, FiUser, FiBell } from 'react-icons/fi';
import { getData, patchData, showSnackbar } from '../services/webservices';
import { ROUTES } from '../utils/constants';

const getIconForType = (type) => {
  switch (type) {
    case 'order': return <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0C3823] flex items-center justify-center flex-shrink-0 border border-emerald-100/80"><FiBox size={18} /></div>;
    case 'offer': return <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0 border border-rose-100/80"><FiTag size={18} /></div>;
    case 'reward': return <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-100/80"><FiGift size={18} /></div>;
    case 'wishlist': return <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0 border border-blue-100/80"><FiHeart size={18} /></div>;
    default: return <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0"><FiBell size={18} /></div>;
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    const token = sessionStorage.getItem('sessionToken');
    if (!token || token === 'demo_token') {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await getData('website/notifications');
      if (response && response.success && Array.isArray(response.data?.notifications)) {
        setNotifications(response.data.notifications);
      } else if (Array.isArray(response?.data)) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    const token = sessionStorage.getItem('sessionToken');
    if (token && token !== 'demo_token') {
      try {
        await patchData('website/notifications/read-all');
      } catch (e) {}
    }
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showSnackbar('All notifications marked as read', 'success');
  };

  const markAsRead = async (id) => {
    const token = sessionStorage.getItem('sessionToken');
    if (token && token !== 'demo_token') {
      try {
        await patchData(`website/notifications/${id}/read`);
      } catch (e) {}
    }
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div className="bg-[#FAFBF9] min-h-screen pb-20">

      {/* Hero Header Cover */}
      <div className="bg-gradient-to-r from-[#072414] via-[#0C3823] to-[#165636] relative pt-6 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.15),transparent_50%)]"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>

        <div className="container max-w-4xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-emerald-200/80 mb-2">
            <Link to={ROUTES.HOME} className="hover:text-white transition-colors flex items-center gap-1">
              <FiUser size={13} /> Home
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <Link to={ROUTES.PROFILE} className="hover:text-white transition-colors">
              My Account
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <span className="text-white font-bold">Notifications</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Account Notifications</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium mt-1">Stay updated with delivery tracking, offers, and rewards</p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto -mt-12 sm:-mt-14 relative z-10">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden">
          
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#FAFBF9]">
            <h3 className="font-extrabold text-slate-900 text-base">All Activity Notifications</h3>
            <button onClick={markAllAsRead} className="text-xs font-bold text-[#0C3823] hover:text-[#FF6B00] transition-colors">
              Mark all as read
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-slate-500 font-medium text-xs">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-medium text-xs">No notifications yet.</div>
            ) : (
              notifications.map((notif, index) => {
                const isUnread = !notif.isRead;
                return (
                  <motion.div
                    key={notif._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                    className={`p-5 sm:p-6 flex items-start gap-4 transition-colors relative group cursor-pointer ${isUnread ? 'bg-[#EBF5ED]/40' : 'hover:bg-slate-50/60'}`}
                    onClick={() => { if (isUnread) markAsRead(notif._id); }}
                  >
                    {isUnread && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0C3823]"></div>
                    )}
                    
                    {getIconForType((notif.type || '').toLowerCase())}
                    
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-extrabold text-sm ${isUnread ? 'text-slate-900' : 'text-slate-700'}`}>{notif.title}</h4>
                        {isUnread && <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping"></span>}
                      </div>
                      <p className={`text-xs leading-relaxed mb-2 ${isUnread ? 'text-slate-800 font-semibold' : 'text-slate-500 font-medium'}`}>
                        {notif.message}
                      </p>
                      <p className="text-[11px] font-bold text-slate-400">
                        {new Date(notif.createdAt).toLocaleDateString('en-GB', {
                          month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
                        })}
                      </p>
                    </div>

                    <button className="text-slate-400 hover:text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-white">
                      <FiMoreVertical size={16} />
                    </button>
                  </motion.div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Notifications;

