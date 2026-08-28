import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiPhone, FiArrowLeft } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { ROUTES } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { postData } from '../services/webservices';
import { useToast } from '../context/ToastContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();
  const { syncGuestWishlist } = useWishlist();
  const { syncGuestCart } = useCart();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    const nameParts = name.split(' ');
    const first_name = nameParts[0];
    const last_name = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    setIsLoading(true);
    const payload = {
      first_name,
      last_name,
      email,
      password,
      phone_number: phone
    };

    const response = await postData('website/auth/register', payload, '');
    setIsLoading(false);

    if (response && response.success !== false) {
      if (response.data && response.data.tokens) {

      }
      
      try { await syncGuestWishlist(); } catch(e) {}
      try { await syncGuestCart(); } catch(e) {}

      if (response.data && response.data.user) {
        sessionStorage.setItem('auth_user', JSON.stringify(response.data.user));
        login(response.data.user);
      } else {
        login({ name: `${first_name} ${last_name}`, email });
      }

      showToast('Registration successful!', 'success');
      navigate(ROUTES.PROFILE);
    } else {
      const message = response?.error || response?.data?.message || response?.message || 'Registration failed. Please try again.';
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
            src="/images/signup-illustration.png" 
            alt="Groceries illustration" 
            className="w-full h-full object-cover mix-blend-luminosity scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d2a17] via-[#124827]/90 to-transparent"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#eb5b27]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-lg text-white">
          <Link to="/" className="inline-flex items-center gap-3 mb-10 group">
            <img src="/images/logo.png" alt="Grandma's Basket" className="h-12 w-auto bg-white p-1.5 rounded-2xl shadow-md" />
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black text-white tracking-tight">Grandma's Basket</span>
              <span className="text-[10px] text-[#eb5b27] font-bold uppercase tracking-widest mt-0.5">Fresh & Local</span>
            </div>
          </Link>

          <h2 className="text-4xl font-extrabold mb-6 leading-tight">
            Join 50,000+ Happy Grocery Shoppers Across the UK
          </h2>
          <p className="text-slate-300 text-base leading-relaxed mb-8">
            Create your account today to unlock personalized recommendations, track your deliveries live, save your favorite recipes, and claim exclusive discounts.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <p className="text-xl font-extrabold text-[#eb5b27]">Free Shipping</p>
              <p className="text-xs text-slate-300">On orders over €40</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <p className="text-xl font-extrabold text-[#eb5b27]">Fresh Promise</p>
              <p className="text-xs text-slate-300">100% Quality Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-12 xl:px-20 bg-white">
        <div className="max-w-md w-full mx-auto" data-aos="fade-up">

          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#124827] mb-6 transition-colors">
            <FiArrowLeft size={14} /> Back to Store
          </Link>

          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-[#124827] mb-2">Create an Account</h1>
            <p className="text-sm text-slate-500">Fill in your information to get started with Grandma's Basket.</p>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <FiUser size={18} />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full pl-11 pr-4 py-3 text-sm border border-slate-200 bg-[#fafcfb] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
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
                  className="block w-full pl-11 pr-4 py-3 text-sm border border-slate-200 bg-[#fafcfb] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <FiPhone size={18} />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="block w-full pl-11 pr-4 py-3 text-sm border border-slate-200 bg-[#fafcfb] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] transition-all outline-none"
                  placeholder="+44 7700 900000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
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
                  autoComplete="new-password"
                  required
                  className="block w-full pl-11 pr-11 py-3 text-sm border border-slate-200 bg-[#fafcfb] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] transition-all outline-none"
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

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <FiLock size={18} />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="block w-full pl-11 pr-11 py-3 text-sm border border-slate-200 bg-[#fafcfb] rounded-xl focus:bg-white focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                  ) : (
                    <FiEye className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start pt-1">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[#124827] focus:ring-[#124827] border-slate-300 rounded cursor-pointer mt-0.5"
              />
              <label htmlFor="terms" className="ml-2.5 block text-xs text-slate-600">
                I agree to the{' '}
                <Link to="#" className="font-bold text-[#124827] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="font-bold text-[#124827] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-lg text-sm font-bold text-white bg-[#124827] hover:bg-[#1c6b3b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#124827] transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-[#124827]/20"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase font-bold tracking-wider">
                <span className="px-4 bg-white text-slate-400">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-slate-200 rounded-xl shadow-sm bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <FcGoogle className="h-5 w-5 mr-3" />
                Sign up with Google
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs font-medium text-slate-600">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="font-bold text-[#124827] hover:text-[#eb5b27] transition-colors underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
