import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiCheckCircle, FiShoppingBag, FiTruck, FiArrowRight, FiFileText } from 'react-icons/fi';
import { ROUTES } from '../utils/constants';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || searchParams.get('payment_intent') || 'GB-' + Math.floor(100000 + Math.random() * 900000);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-16 flex items-center justify-center">
      <div className="container max-w-2xl px-4">
        
        {/* Main Success Container */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl text-center flex flex-col items-center">
          
          {/* Checkmark Icon */}
          <div className="w-20 h-20 rounded-full bg-[#E8F5ED] text-[#124827] flex items-center justify-center mb-6 shadow-inner border border-[#124827]/10">
            <FiCheckCircle size={44} />
          </div>

          <span className="text-[11px] font-black uppercase tracking-widest text-[#124827] bg-[#E8F5ED] px-3.5 py-1 rounded-full border border-[#124827]/20 mb-3">
            PAYMENT SUCCESSFUL
          </span>

          <h1 className="text-3xl md:text-4xl font-black text-[#0C3823] tracking-tight mb-3">
            Order Successfully Placed!
          </h1>

          <p className="text-slate-600 font-medium text-sm md:text-base max-w-md leading-relaxed mb-6">
            Thank you for shopping with Grandma's Basket. We have received your payment and are preparing your order.
          </p>

          {/* Reference Order Box */}
          <div className="w-full bg-[#FAFCFB] rounded-2xl p-6 border border-slate-200/80 mb-8 text-left flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Order Reference</span>
              <span className="text-sm font-black text-[#124827] font-mono">{orderId}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium pt-1">
              <span className="flex items-center gap-2">
                <FiTruck className="text-[#FF6B00]" size={16} /> Estimated Delivery:
              </span>
              <span className="font-bold text-slate-800">Tomorrow (9:00 AM - 12:00 PM)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link
              to={ROUTES.SHOP}
              className="w-full sm:w-auto bg-[#124827] hover:bg-[#1c6b3b] text-white font-extrabold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#124827]/20 flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
            >
              <FiShoppingBag size={16} /> Continue Shopping
            </Link>

            <Link
              to={ROUTES.ORDERS}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              <FiFileText size={16} /> View My Orders
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
