import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBox, FiTag, FiGift, FiHeart, FiMoreVertical } from 'react-icons/fi';
import AccountPageHeader from '../components/account/AccountPageHeader';
import { getData, patchData, showSnackbar } from '../services/webservices';

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
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getData('website/notifications');
      if (response && response.success && response.data && response.data.notifications) {
        setNotifications(response.data.notifications);
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
    try {
      const response = await patchData('website/notifications/read-all');
      if (response && response.success !== false) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        showSnackbar('All notifications marked as read', 'success');
      } else {
        showSnackbar(response?.error || 'Failed to mark all as read', 'error');
      }
    } catch (error) {
      showSnackbar('Error updating notifications', 'error');
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await patchData(`website/notifications/${id}/read`);
      if (response && response.success !== false) {
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      } else {
        showSnackbar(response?.error || 'Failed to mark as read', 'error');
      }
    } catch (error) {
      showSnackbar('Error updating notification', 'error');
    }
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title="Notifications" />

      <div className="container px-4 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
          
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#FAFAF8]">
            <h3 className="font-bold text-slate-800 text-lg">All Notifications</h3>
            <button onClick={markAllAsRead} className="text-sm font-bold text-[#2E8B57] hover:underline">Mark all as read</button>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-slate-500 font-medium">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-medium">No notifications yet.</div>
            ) : (
              notifications.map((notif, index) => {
                const isUnread = !notif.isRead;
                return (
                  <motion.div
                    key={notif._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`p-6 flex items-start gap-4 transition-colors relative group cursor-pointer ${isUnread ? 'bg-emerald-50/30' : 'hover:bg-slate-50/50'}`}
                    onClick={() => { if (isUnread) markAsRead(notif._id); }}
                  >
                    {isUnread && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2E8B57]"></div>
                    )}
                    
                    {getIconForType((notif.type || '').toLowerCase())}
                    
                    <div className="flex-1 min-w-0 pr-8">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-bold ${isUnread ? 'text-slate-900' : 'text-slate-800'}`}>{notif.title}</h4>
                        {isUnread && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                      </div>
                      <p className={`text-sm leading-relaxed mb-2 ${isUnread ? 'text-slate-700 font-medium' : 'text-slate-600'}`}>
                        {notif.message}
                      </p>
                      <p className="text-xs font-bold text-slate-400">
                        {new Date(notif.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
                        })}
                      </p>
                    </div>

                    <button className="text-slate-400 hover:text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-slate-100">
                      <FiMoreVertical />
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
