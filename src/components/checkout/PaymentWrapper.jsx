import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

export default function PaymentWrapper({ clientSecret, publishableKey, clearCart, navigate }) {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const key = publishableKey || import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx';
    if (key) {
      setStripePromise(loadStripe(key));
    }
  }, [publishableKey]);

  if (!clientSecret || !stripePromise) {
    return (
      <div className="flex flex-col justify-center items-center p-12 text-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#124827]"></div>
        <span className="text-xs font-bold text-slate-500">Connecting to Stripe Gateway...</span>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#124827',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm clearCart={clearCart} navigate={navigate} />
    </Elements>
  );
}
