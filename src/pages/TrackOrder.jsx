import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCheckCircle, FiPackage, FiTruck, FiMapPin, FiSmile } from 'react-icons/fi';
import AccountPageHeader from '../components/account/AccountPageHeader';

const TrackOrder = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title="Track Your Order" />

      <div className="container px-4 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          
          {/* Search Order Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-8"
          >
            <h2 className="text-xl font-bold text-slate-800 mb-6">Find your shipment</h2>
            <form className="flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Order ID</label>
                <input 
                  type="text" 
                  placeholder="e.g. ORD-2026-..."
                  className="w-full bg-[#FAFAF8] border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-700"
                  defaultValue="ORD-2026-8924"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  className="w-full bg-[#FAFAF8] border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#2E8B57] focus:ring-4 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-700"
                  defaultValue="deepika@example.com"
                />
              </div>
              <div className="flex items-end">
                <button 
                  type="button" 
                  className="w-full md:w-auto bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-sm shadow-[#2E8B57]/20 flex items-center justify-center gap-2 h-[52px]"
                >
                  <FiSearch size={18} />
                  Track
                </button>
              </div>
            </form>
          </motion.div>

          {/* Tracking Results Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 bg-[#FAFAF8] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Tracking Number</p>
                <h3 className="font-bold text-xl text-slate-800">#ORD-2026-8924</h3>
              </div>
              <div className="text-left md:text-right">
                <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Expected Delivery</p>
                <p className="font-bold text-lg text-[#FF8A00]">Tomorrow by 14:00</p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border text-[#FF8A00] bg-orange-50 border-orange-100 w-fit">
                <span className="w-2 h-2 rounded-full bg-current"></span>
                Out for delivery
              </div>
            </div>

            {/* Horizontal Timeline (Desktop) & Vertical (Mobile) */}
            <div className="p-8 lg:p-12">
              <div className="relative">
                
                {/* Connecting Lines */}
                <div className="absolute top-1/2 left-6 right-6 h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full hidden sm:block"></div>
                <div className="absolute top-1/2 left-6 h-1 bg-[#2E8B57] -translate-y-1/2 z-0 rounded-full hidden sm:block transition-all duration-1000" style={{ width: '75%' }}></div>
                
                <div className="absolute top-6 bottom-6 left-6 w-1 bg-slate-100 z-0 rounded-full sm:hidden"></div>
                <div className="absolute top-6 left-6 w-1 bg-[#2E8B57] z-0 rounded-full sm:hidden transition-all duration-1000" style={{ height: '75%' }}></div>

                <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-8 sm:gap-0">
                  
                  {/* Step 1 */}
                  <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#2E8B57] text-white flex items-center justify-center shadow-sm shrink-0">
                      <FiCheckCircle size={20} />
                    </div>
                    <div className="sm:text-center mt-1">
                      <h4 className="font-bold text-slate-800 text-sm">Confirmed</h4>
                      <p className="text-xs text-slate-500 mt-0.5">12 Jul, 14:30</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#2E8B57] text-white flex items-center justify-center shadow-sm shrink-0">
                      <FiPackage size={20} />
                    </div>
                    <div className="sm:text-center mt-1">
                      <h4 className="font-bold text-slate-800 text-sm">Packed</h4>
                      <p className="text-xs text-slate-500 mt-0.5">13 Jul, 09:15</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#2E8B57] text-white flex items-center justify-center shadow-sm shrink-0">
                      <FiTruck size={20} />
                    </div>
                    <div className="sm:text-center mt-1">
                      <h4 className="font-bold text-slate-800 text-sm">Dispatched</h4>
                      <p className="text-xs text-slate-500 mt-0.5">13 Jul, 14:00</p>
                    </div>
                  </div>

                  {/* Step 4 (Current) */}
                  <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FF8A00] text-white flex items-center justify-center shadow-sm shadow-[#FF8A00]/20 ring-4 ring-[#FF8A00]/20 shrink-0">
                      <FiMapPin size={20} />
                    </div>
                    <div className="sm:text-center mt-1">
                      <h4 className="font-bold text-slate-800 text-sm">Out for Delivery</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Today, 08:00</p>
                    </div>
                  </div>

                  {/* Step 5 (Pending) */}
                  <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3 opacity-40 grayscale">
                    <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                      <FiSmile size={20} />
                    </div>
                    <div className="sm:text-center mt-1">
                      <h4 className="font-bold text-slate-800 text-sm">Delivered</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Pending</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
            <div className="p-6 bg-emerald-50/50 border-t border-slate-100 flex items-center justify-center">
              <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <FiMapPin className="text-[#2E8B57]" /> Your package is currently out for delivery in <strong className="text-slate-900">Wembley, London</strong>.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
