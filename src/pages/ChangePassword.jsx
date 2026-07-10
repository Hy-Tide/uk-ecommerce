import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiCheck } from 'react-icons/fi';

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [password, setPassword] = useState('');

  // Password validation checks
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-dark">Change Password</h1>
        <p className="text-slate-500 text-sm mt-1">Update your password to keep your account secure.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
        <form className="space-y-6">
          
          {/* Current Password */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                type={showCurrent ? "text" : "password"} 
                placeholder="Enter current password"
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
              />
              <button 
                type="button" 
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="border-t border-slate-100 my-6"></div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                type={showNew ? "text" : "password"} 
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
              />
              <button 
                type="button" 
                onClick={() => setShowNew(!showNew)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showNew ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Validation Indicators */}
          <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">Password Requirements:</h4>
            <div className={`flex items-center gap-2 text-sm ${hasMinLength ? 'text-green-600 font-medium' : 'text-slate-500'}`}>
              <FiCheck className={`w-4 h-4 ${hasMinLength ? 'opacity-100' : 'opacity-30'}`} /> Minimum 8 characters
            </div>
            <div className={`flex items-center gap-2 text-sm ${hasUppercase ? 'text-green-600 font-medium' : 'text-slate-500'}`}>
              <FiCheck className={`w-4 h-4 ${hasUppercase ? 'opacity-100' : 'opacity-30'}`} /> One uppercase letter
            </div>
            <div className={`flex items-center gap-2 text-sm ${hasNumber ? 'text-green-600 font-medium' : 'text-slate-500'}`}>
              <FiCheck className={`w-4 h-4 ${hasNumber ? 'opacity-100' : 'opacity-30'}`} /> One number
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                type={showConfirm ? "text" : "password"} 
                placeholder="Confirm new password"
                className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
              />
              <button 
                type="button" 
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-colors shadow-md shadow-primary/20 w-full sm:w-auto"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
