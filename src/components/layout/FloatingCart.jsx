import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { ROUTES } from '../../utils/constants';
import { useCart } from '../../context/CartContext';

const FloatingCart = () => {
  const { cartItems } = useCart();
  const location = useLocation();

  // Hide on cart or checkout pages
  if (location.pathname === ROUTES.CART || location.pathname === ROUTES.CHECKOUT) {
    return null;
  }

  return (
    <Link 
      to={ROUTES.CART}
      className="md:hidden fixed bottom-24 right-6 z-50 bg-[#FF6B00] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(255,107,0,0.4)] hover:scale-105 transition-transform"
    >
      <div className="relative">
        <FiShoppingCart size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-3 -right-3 bg-white text-[#FF6B00] text-[11px] font-bold h-5 min-w-[20px] rounded-full flex items-center justify-center border border-[#FF6B00] px-1">
            {cartItems.length}
          </span>
        )}
      </div>
    </Link>
  );
};

export default FloatingCart;
