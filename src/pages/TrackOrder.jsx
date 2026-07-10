import React from 'react';
import { FiSearch, FiCheckCircle, FiPackage, FiTruck, FiMapPin, FiSmile } from 'react-icons/fi';

const TrackOrder = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-dark">Track Order</h1>
        <p className="text-slate-500 text-sm mt-1">Track the status of your recent shipments.</p>
      </div>

      {/* Search Order Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
        <form className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Order ID</label>
            <input 
              type="text" 
              placeholder="e.g. UK-123456"
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
              defaultValue="UK-294182"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
              defaultValue="deepika@example.com"
            />
          </div>
          <div className="flex items-end">
            <button 
              type="button" 
              className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 h-[46px]"
            >
              <FiSearch className="w-5 h-5" />
              Track
            </button>
          </div>
        </form>
      </div>

      {/* Tracking Results Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-xl text-dark">Order: UK-294182</h3>
            <p className="text-slate-500 text-sm mt-1">Expected Delivery: <span className="font-bold text-primary">Oct 15, 2024</span></p>
          </div>
          <span className="bg-blue-50 border border-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg text-sm">
            Out for delivery
          </span>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full"></div>
          {/* Progress bar */}
          <div className="hidden sm:block absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 rounded-full" style={{ width: '75%' }}></div>

          <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-6 sm:gap-0">
            
            {/* Step 1 */}
            <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-2">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                <FiCheckCircle className="w-4 h-4" />
              </div>
              <div className="sm:text-center">
                <h4 className="font-bold text-dark text-sm">Confirmed</h4>
                <p className="text-xs text-slate-500 mt-1">Oct 12, 10:24 AM</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-2">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                <FiPackage className="w-4 h-4" />
              </div>
              <div className="sm:text-center">
                <h4 className="font-bold text-dark text-sm">Packed</h4>
                <p className="text-xs text-slate-500 mt-1">Oct 13, 09:15 AM</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-2">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                <FiTruck className="w-4 h-4" />
              </div>
              <div className="sm:text-center">
                <h4 className="font-bold text-dark text-sm">Dispatched</h4>
                <p className="text-xs text-slate-500 mt-1">Oct 14, 02:30 PM</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-2">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                <FiMapPin className="w-4 h-4" />
              </div>
              <div className="sm:text-center">
                <h4 className="font-bold text-dark text-sm">Out for Delivery</h4>
                <p className="text-xs text-slate-500 mt-1">Oct 15, 08:30 AM</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                <FiSmile className="w-4 h-4" />
              </div>
              <div className="sm:text-center">
                <h4 className="font-bold text-slate-400 text-sm">Delivered</h4>
                <p className="text-xs text-slate-400 mt-1">Pending</p>
              </div>
            </div>
            
          </div>
        </div>

        <div className="mt-12 bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start gap-3">
          <div className="text-primary mt-1">
            <FiTruck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-dark text-sm mb-1">Driver is nearby</h4>
            <p className="text-slate-600 text-sm">Your driver <span className="font-bold">Rahul</span> is currently 3 stops away. Ensure someone is available at the delivery address.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
