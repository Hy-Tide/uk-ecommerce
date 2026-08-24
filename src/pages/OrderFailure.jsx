import React, { useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { FiXCircle, FiRefreshCw, FiShoppingCart, FiHelpCircle, FiArrowRight } from 'react-icons/fi';
import { ROUTES } from '../utils/constants';

const OrderFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reason = searchParams.get('reason') || searchParams.get('error') || 'Your payment was cancelled or could not be processed by the bank.';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-16 flex items-center justify-center">
      <div className="container max-w-2xl px-4">
        
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl text-center flex flex-col items-center">
          
          {/* Failure Alert Badge */}
          <div className="w-20 h-20 rounded-full bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mb-6 shadow-inner border border-red-100 animate-bounce">
            <FiXCircle size={44} />
          </div>

          <span className="text-[11px] font-black uppercase tracking-widest text-[#DC2626] bg-red-50 px-3.5 py-1 rounded-full border border-red-100 mb-3">
            PAYMENT UNSUCCESSFUL
          </span>

          <h1 className="text-3xl md:text-4xl font-black text-[#0C3823] tracking-tight mb-4">
            Payment Failed or Cancelled
          </h1>

          <p className="text-slate-600 font-medium text-sm md:text-base max-w-md leading-relaxed mb-8">
            {reason}
          </p>

          {/* Detailed Notice Box */}
          <div className="w-full bg-[#FAFCFB] rounded-2xl p-5 border border-slate-200/80 mb-8 text-left text-xs text-slate-600 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#0C3823] font-bold text-sm mb-1">
              <FiHelpCircle className="text-[#FF6B00]" size={16} />
              <span>What should you do next?</span>
            </div>
            <p className="leading-normal">
              1. Check your payment card details, balance, or billing address.<br />
              2. Try using a different card or alternative payment method.<br />
              3. If funds were debited, they will be automatically refunded by your bank within 2-3 business days.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <button
              onClick={() => navigate(ROUTES.CHECKOUT)}
              className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#E05E00] text-white font-extrabold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#FF6B00]/20 flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
            >
              <FiRefreshCw size={16} /> Retry Payment
            </button>

            <Link
              to={ROUTES.CART}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              <FiShoppingCart size={16} /> Return to Cart
            </Link>
          </div>

          {/* Contact Support Link */}
          <div className="mt-8 pt-6 border-t border-slate-100 w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
            <span>Need assistance?</span>
            <Link to={ROUTES.CONTACT} className="text-[#0C3823] hover:text-[#FF6B00] underline underline-offset-2 inline-flex items-center gap-1">
              Contact Store Support <FiArrowRight size={12} />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderFailure;
