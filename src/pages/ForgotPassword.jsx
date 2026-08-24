import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { ROUTES } from '../utils/constants';
import { useToast } from '../context/ToastContext';

const ForgotPassword = () => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Password reset link sent to your email!', 'success');
  };

  return (
    <div className="flex min-h-screen bg-[#fafcfb]">
      
      {/* Left Column - Showcase Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0d2a17] overflow-hidden justify-center items-center p-12">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="/images/forgot-illustration.png" 
            alt="Groceries illustration" 
            className="w-full h-full object-cover mix-blend-luminosity scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d2a17] via-[#124827]/90 to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#eb5b27]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-lg text-white">
          <Link to="/" className="inline-flex items-center gap-3 mb-10 group">
            <img src="/images/logo.png" alt="Grandma's Basket" className="h-12 w-auto bg-white p-1.5 rounded-2xl shadow-md" />
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black text-white tracking-tight">Grandma's Basket</span>
              <span className="text-[10px] text-[#eb5b27] font-bold uppercase tracking-widest mt-0.5">Fresh & Local</span>
            </div>
          </Link>

          <h2 className="text-4xl font-extrabold mb-6 leading-tight">
            Secure Account Recovery
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-8">
            Don't worry! It happens to the best of us. Enter your email address and we'll send you instructions to safely reset your password.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-12 xl:px-20 bg-white">
        <div className="max-w-md w-full mx-auto">
          
          <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#124827] mb-8 transition-colors">
            <FiArrowLeft size={14} /> Back to Sign In
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#124827] mb-2">Reset Password</h1>
            <p className="text-sm text-slate-500">Enter your email address to receive password reset instructions.</p>
          </div>

          {submitted ? (
            <div className="bg-[#e8f5ed] border border-[#124827]/30 p-6 rounded-2xl text-center space-y-4">
              <FiCheckCircle className="w-12 h-12 text-[#124827] mx-auto" />
              <h3 className="text-lg font-bold text-[#124827]">Reset Link Sent!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
              </p>
              <Link 
                to={ROUTES.LOGIN}
                className="inline-block w-full py-3 bg-[#124827] text-white text-xs font-bold rounded-xl hover:bg-[#1c6b3b] transition-colors"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Registered Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <FiMail size={18} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-11 pr-4 py-3.5 text-sm border border-slate-200 bg-[#fafcfb] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] transition-all outline-none"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg text-sm font-bold text-white bg-[#124827] hover:bg-[#1c6b3b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#124827] transition-all transform active:scale-[0.98] shadow-[#124827]/20"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          )}

          <p className="mt-10 text-center text-xs font-medium text-slate-600">
            Remember your password?{' '}
            <Link to={ROUTES.LOGIN} className="font-bold text-[#124827] hover:text-[#eb5b27] transition-colors underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
