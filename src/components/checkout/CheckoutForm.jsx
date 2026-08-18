import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { FiLock, FiClock } from 'react-icons/fi';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;

    setIsLoading(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success`, 
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      
      {errorMessage && (
        <div className="bg-[#feeee8] text-[#eb5b27] p-3 rounded-lg text-sm font-bold border border-[#eb5b27]/20 mt-2">
          {errorMessage}
        </div>
      )}

      <button 
        disabled={!stripe || isLoading}
        className="w-full bg-[#124827] hover:bg-[#1c6b3b] text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg text-sm mt-4 disabled:opacity-50"
      >
        {isLoading ? <FiClock className="animate-spin" /> : <FiLock />}
        {isLoading ? 'Processing Payment...' : 'Pay Now Securely'}
      </button>
      
      <div className="text-center text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-2">
        Payments processed securely by Stripe
      </div>
    </form>
  );
}
