import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiPhone } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { ROUTES } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { postData, showSnackbar } from '../services/webservices';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');

    if (password !== confirmPassword) {
      showSnackbar('Passwords do not match', 'error');
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
        sessionStorage.setItem('sessionToken', response.data.tokens.accessToken);
        sessionStorage.setItem('refreshToken', response.data.tokens.refreshToken);
      }
      
      if (response.data && response.data.user) {
        sessionStorage.setItem('auth_user', JSON.stringify(response.data.user));
        login(response.data.user);
      } else {
        login({ name: `${first_name} ${last_name}`, email });
      }

      showSnackbar('Registration successful!', 'success');
      navigate(ROUTES.PROFILE);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#f4ebd9]">
        <img
          src="/images/signup-illustration.png"
          alt="Reusable grocery bag illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-12 xl:px-24 bg-[#faf9f6]">
        <div className="max-w-md w-full mx-auto">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif text-dark mb-3">Create Account</h1>
            <p className="text-slate-600">Fill in the info below to create your user account. All fields are required.</p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full pl-12 pr-4 py-4 sm:text-sm border-slate-200 bg-white rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-12 pr-4 py-4 sm:text-sm border-slate-200 bg-white rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="Your email address"
                />
              </div>
            </div>

            <div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="block w-full pl-12 pr-4 py-4 sm:text-sm border-slate-200 bg-white rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="Phone number (optional)"
                />
              </div>
            </div>

            <div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="block w-full pl-12 pr-12 py-4 sm:text-sm border-slate-200 bg-white rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="Your password"
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
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="block w-full pl-12 pr-12 py-4 sm:text-sm border-slate-200 bg-white rounded-xl border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="Confirm password"
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

            <div className="flex items-center pt-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded cursor-pointer mt-0.5"
              />
              <label htmlFor="terms" className="ml-3 block text-sm text-slate-600">
                I agree to the{' '}
                <Link to="#" className="text-dark hover:text-primary transition-colors underline underline-offset-2">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="text-dark hover:text-primary transition-colors underline underline-offset-2">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-dark hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#faf9f6] text-slate-500">
                  Or
                </span>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3.5 px-4 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:ring-2 focus:ring-offset-2 focus:ring-primary/20 transition-colors"
              >
                <FcGoogle className="h-5 w-5 mr-3" />
                Sign up with Google
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="font-medium text-dark hover:text-primary transition-colors underline underline-offset-4 decoration-slate-300 hover:decoration-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
