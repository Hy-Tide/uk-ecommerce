import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { ROUTES } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { postData } from '../services/webservices';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();
  const { syncGuestWishlist } = useWishlist();
  const { syncGuestCart } = useCart();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    setIsLoading(true);
    const response = await postData('website/auth/login', { email, password }, '');
    setIsLoading(false);

    if (response && response.success !== false) {
      if (response.data && response.data.tokens) {

      }

      try { await syncGuestWishlist(); } catch (e) { }
      try { await syncGuestCart(); } catch (e) { }

      if (response.data && response.data.user) {
        sessionStorage.setItem('auth_user', JSON.stringify(response.data.user));
        login(response.data.user);
      } else {
        login({ email }); // Fallback
      }

      showToast('Login successful!', 'success');
      navigate(ROUTES.PROFILE);
    } else {
      const message = response?.error || response?.data?.message || response?.message || 'Login failed. Invalid credentials or server error.';
      setErrorMsg(message);
      showToast(message, 'error');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fafcfb]">

      {/* Left Column - Showcase Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0d2a17] overflow-hidden justify-center items-center p-12">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/images/login-illustration.png"
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
            Authentic Flavors, Delivered Fresh to Your Home
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-8">
            Access thousands of authentic Indian groceries, regional spices, organic flours, and fresh produce with member-exclusive deals.
          </p>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <div className="w-10 h-10 rounded-full bg-[#eb5b27] text-white flex items-center justify-center font-bold text-sm">
              50k+
            </div>
            <div>
              <p className="text-sm font-bold text-white">Trusted by UK Families</p>
              <p className="text-xs text-slate-300">Fast delivery nationwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-12 xl:px-20 bg-white">
        <div className="max-w-md w-full mx-auto" data-aos="fade-up">

          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#124827] mb-8 transition-colors">
            <FiArrowLeft size={14} /> Back to Store
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#124827] mb-2">Welcome Back</h1>
            <p className="text-sm text-slate-500">Sign in to manage your orders, wishlist, and account settings.</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <FiAlertCircle size={18} className="flex-shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
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
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <FiLock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-11 pr-11 py-3.5 text-sm border border-slate-200 bg-[#fafcfb] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                  ) : (
                    <FiEye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#124827] focus:ring-[#124827] border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs font-semibold text-slate-600 cursor-pointer">
                  Remember me
                </label>
              </div>

              <Link to={ROUTES.FORGOT_PASSWORD} className="text-xs font-bold text-[#eb5b27] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg text-sm font-bold text-white bg-[#124827] hover:bg-[#1c6b3b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#124827] transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-[#124827]/20"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase font-bold tracking-wider">
                <span className="px-4 bg-white text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3.5 px-4 border border-slate-200 rounded-xl shadow-sm bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <FcGoogle className="h-5 w-5 mr-3" />
                Sign in with Google
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-xs font-medium text-slate-600">
            Don't have an account?{' '}
            <Link to={ROUTES.REGISTER} className="font-bold text-[#124827] hover:text-[#eb5b27] transition-colors underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
