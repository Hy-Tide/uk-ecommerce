import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiCheckCircle } from 'react-icons/fi';
import AccountPageHeader from '../components/account/AccountPageHeader';

const ChangePassword = () => {
  const [current, setCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    return strength;
  };

  const strength = getStrength();
  let strengthColor = 'bg-slate-200';
  let strengthLabel = 'Weak';
  if (strength > 25) { strengthColor = 'bg-orange-400'; strengthLabel = 'Fair'; }
  if (strength > 50) { strengthColor = 'bg-yellow-400'; strengthLabel = 'Good'; }
  if (strength > 75) { strengthColor = 'bg-[#2E8B57]'; strengthLabel = 'Strong'; }

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title="Change Password" />

      <div className="container px-4 lg:px-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-8 md:p-12"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
            <FiLock size={28} />
          </div>
          
          <h2 className="text-2xl font-black text-slate-800 mb-2">Create New Password</h2>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed">Your new password must be different from previous used passwords and at least 8 characters long.</p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
              <input 
                type="password" 
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="Enter current password" 
                className="w-full bg-[#FAFAF8] border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-700"
              />
            </div>

            <div className="h-px bg-slate-100 my-4"></div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password" 
                className="w-full bg-[#FAFAF8] border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-700 mb-3"
              />
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex gap-1 h-1.5">
                    <div className={`h-full flex-1 rounded-full ${strength > 0 ? strengthColor : 'bg-slate-200'}`}></div>
                    <div className={`h-full flex-1 rounded-full ${strength > 25 ? strengthColor : 'bg-slate-200'}`}></div>
                    <div className={`h-full flex-1 rounded-full ${strength > 50 ? strengthColor : 'bg-slate-200'}`}></div>
                    <div className={`h-full flex-1 rounded-full ${strength > 75 ? strengthColor : 'bg-slate-200'}`}></div>
                  </div>
                  <span className={`text-xs font-bold uppercase ${strength > 75 ? 'text-[#2E8B57]' : 'text-slate-500'}`}>{strengthLabel}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
              <input 
                type="password" 
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm new password" 
                className="w-full bg-[#FAFAF8] border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-700"
              />
              {confirm && password && confirm === password && (
                <p className="text-[#2E8B57] text-xs font-bold mt-2 flex items-center gap-1">
                  <FiCheckCircle /> Passwords match
                </p>
              )}
            </div>

            <button type="submit" className="w-full bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold py-4 rounded-xl transition-colors shadow-sm shadow-[#2E8B57]/20 mt-4">
              Update Password
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangePassword;
