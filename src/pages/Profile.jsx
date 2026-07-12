import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import AccountPageHeader from '../components/account/AccountPageHeader';

const Profile = () => {
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEdit = () => {
    alert("Edit Profile modal would open here.");
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title="My Profile" />

      <div className="container px-4 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden"
        >
          {/* Cover Photo Area */}
          <div className="h-32 bg-gradient-to-r from-[#2E8B57] to-[#1D3B2A] relative">
            <button
              onClick={handleEdit}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors border border-white/20"
            >
              <FiEdit2 /> Edit Profile
            </button>
          </div>

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-6 flex justify-between items-end">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white overflow-hidden flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-black text-[#2E8B57] text-5xl">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-800 mb-1">{user?.name || 'Customer Name'}</h2>
              <div className="flex items-center gap-2 text-[#2E8B57] font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full w-fit">
                <FiShield /> Verified Customer
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="p-6 bg-[#FAFAF8] rounded-[20px] border border-slate-100 flex items-start gap-4 hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF8A00] shadow-sm flex-shrink-0">
                  <FiMail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                  <p className="font-bold text-slate-800">{user?.email || 'customer@example.com'}</p>
                </div>
              </div>

              <div className="p-6 bg-[#FAFAF8] rounded-[20px] border border-slate-100 flex items-start gap-4 hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#2E8B57] shadow-sm flex-shrink-0">
                  <FiPhone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile Number</p>
                  <p className="font-bold text-slate-800">{user?.phone || '+44 7700 900000'}</p>
                </div>
              </div>

              <div className="p-6 bg-[#FAFAF8] rounded-[20px] border border-slate-100 flex items-start gap-4 hover:shadow-sm transition-shadow md:col-span-2">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm flex-shrink-0">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Default Address</p>
                  <p className="font-bold text-slate-800 mb-1">UK Groceries (London)</p>
                  <p className="text-slate-600 font-medium">123 Grocery Lane, Wembley, London, HA0 1AB</p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
