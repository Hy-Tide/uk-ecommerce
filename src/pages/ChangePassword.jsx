import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiLock, FiCheckCircle, FiChevronRight, FiUser, FiShield, FiKey } from 'react-icons/fi';
import { postData, showSnackbar } from '../services/webservices';
import { ROUTES } from '../utils/constants';

const ChangePassword = () => {
  const [current, setCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

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
  if (strength > 50) { strengthColor = 'bg-amber-400'; strengthLabel = 'Good'; }
  if (strength > 75) { strengthColor = 'bg-[#0C3823]'; strengthLabel = 'Strong'; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!current) {
      showSnackbar('Please enter your current password', 'error');
      return;
    }
    if (password.length < 8) {
      showSnackbar('Password must be at least 8 characters long', 'error');
      return;
    }
    if (password !== confirm) {
      showSnackbar('New passwords do not match', 'error');
      return;
    }

    setIsUpdating(true);
    const token = sessionStorage.getItem('sessionToken');

    try {
      if (token && token !== 'demo_token') {
        await postData('website/users/change-password', {
          current_password: current,
          new_password: password
        }, token);
      }
      showSnackbar('Password updated successfully!', 'success');
      setCurrent('');
      setPassword('');
      setConfirm('');
    } catch (err) {
      showSnackbar('Failed to update password', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-[#FAFBF9] min-h-screen pb-20">

      {/* Hero Header Cover */}
      <div className="bg-gradient-to-r from-[#072414] via-[#0C3823] to-[#165636] relative pt-6 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.15),transparent_50%)]"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>

        <div className="container max-w-2xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-emerald-200/80 mb-2">
            <Link to={ROUTES.HOME} className="hover:text-white transition-colors flex items-center gap-1">
              <FiUser size={13} /> Home
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <Link to={ROUTES.PROFILE} className="hover:text-white transition-colors">
              My Account
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <span className="text-white font-bold">Change Password</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Account Security</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium mt-1">Update your password to keep your account safe</p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto -mt-12 sm:-mt-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 sm:p-10"
        >
          <div className="w-14 h-14 bg-emerald-50 text-[#0C3823] rounded-2xl flex items-center justify-center mb-6 shadow-xs border border-emerald-100/60">
            <FiKey size={26} />
          </div>
          
          <h2 className="text-xl font-extrabold text-slate-900 mb-1">Create New Password</h2>
          <p className="text-slate-500 text-xs font-medium mb-8 leading-relaxed">
            Your new password must be at least 8 characters long and contain uppercase letters, numbers, or symbols.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Current Password</label>
              <input 
                type="password" 
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="Enter current password" 
                className="w-full bg-[#FAFBF9] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#0C3823] focus:ring-2 focus:ring-[#0C3823]/15 transition-all text-xs font-bold text-slate-800"
                required
              />
            </div>

            <div className="h-px bg-slate-100 my-2"></div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">New Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password" 
                className="w-full bg-[#FAFBF9] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#0C3823] focus:ring-2 focus:ring-[#0C3823]/15 transition-all text-xs font-bold text-slate-800 mb-2"
                required
              />
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex gap-1 h-1.5">
                    <div className={`h-full flex-1 rounded-full ${strength > 0 ? strengthColor : 'bg-slate-100'}`}></div>
                    <div className={`h-full flex-1 rounded-full ${strength > 25 ? strengthColor : 'bg-slate-100'}`}></div>
                    <div className={`h-full flex-1 rounded-full ${strength > 50 ? strengthColor : 'bg-slate-100'}`}></div>
                    <div className={`h-full flex-1 rounded-full ${strength > 75 ? strengthColor : 'bg-slate-100'}`}></div>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider ${strength > 75 ? 'text-[#0C3823]' : 'text-slate-400'}`}>{strengthLabel}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Confirm New Password</label>
              <input 
                type="password" 
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm new password" 
                className="w-full bg-[#FAFBF9] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#0C3823] focus:ring-2 focus:ring-[#0C3823]/15 transition-all text-xs font-bold text-slate-800"
                required
              />
              {confirm && password && confirm === password && (
                <p className="text-[#0C3823] text-xs font-bold mt-2 flex items-center gap-1">
                  <FiCheckCircle size={13} /> Passwords match
                </p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isUpdating}
              className="w-full bg-[#0C3823] hover:bg-[#FF6B00] text-white font-bold text-xs py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-[#0C3823]/20 mt-4 disabled:opacity-70 flex justify-center items-center gap-2"
            >
              <FiShield size={15} /> {isUpdating ? 'Updating Password...' : 'Update Password'}
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangePassword;

