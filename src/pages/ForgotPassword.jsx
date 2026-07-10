import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { ROUTES } from '../utils/constants';

const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Column - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#eef4f6]">
        <img 
          src="/images/forgot-illustration.png" 
          alt="Coffee and croissant illustration" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-12 xl:px-24 bg-[#faf9f6]">
        <div className="max-w-md w-full mx-auto">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-serif text-dark mb-3">Reset Password</h1>
            <p className="text-slate-600">Enter your email and we'll send you a link to reset your password.</p>
          </div>

          <form className="space-y-6" action="#" method="POST">
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

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-dark hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark transition-colors"
              >
                Send Reset Link
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <Link to={ROUTES.LOGIN} className="inline-flex items-center font-medium text-slate-600 hover:text-dark transition-colors group underline underline-offset-4 decoration-slate-300 hover:decoration-dark">
              <FiArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
