import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiTrash2, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiPlus, 
  FiMinus, 
  FiShield, 
  FiTruck, 
  FiLock, 
  FiArrowLeft,
  FiFileText,
  FiMessageCircle,
  FiZap,
  FiRefreshCw,
  FiPackage,
  FiMapPin,
  FiTag,
  FiX
} from 'react-icons/fi';
import { ROUTES } from '../utils/constants';
import { useCart } from '../context/CartContext';
import { getData } from '../services/webservices';

const fallbackRelated = [
  { id: 1, brand: 'AMUL', name: 'Pure Ghee Can', weight: '500 ml', price: 7.99, image: '/images/prod-amul-ghee.png' },
  { id: 2, brand: 'MDH', name: 'Garam Masala', weight: '100 g Tin', price: 3.49, image: '/images/prod-garam-masala.png' },
  { id: 3, brand: "HALDIRAM'S", name: 'Aloo Bhujia', weight: '400 g', price: 6.49, image: '/images/prod-aloo-bhujia.png' },
  { id: 4, brand: 'TATA TEA', name: 'Masala Chai', weight: '250 g', price: 4.49, image: '/images/prod-chai.png' }
];

const Cart = () => {
  const { cartItems, cartTotal, cartDetails, updateQuantity, removeFromCart, applyCoupon, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [availableCoupons, setAvailableCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getData('website/coupons');
        if (response && response.success !== false && response.data) {
          const fetchedCoupons = Array.isArray(response.data) ? response.data : response.data.coupons || [];
          setAvailableCoupons(fetchedCoupons);
        }
      } catch (error) {
        console.error('Failed to fetch coupons', error);
      }
    };
    fetchCoupons();
  }, []);

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      applyCoupon(couponCode.trim());
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode('');
  };

  const subtotal = cartDetails?.subTotal || cartItems.reduce((sum, item) => sum + ((item.price || item.product?.price || 0) * (item.quantity || 1)), 0);
  const discount = cartDetails?.discountAmount || 0;
  const delivery = cartDetails?.deliveryCharge || 0;
  const total = cartDetails?.totalAmount || cartTotal;
  const appliedCoupon = cartDetails?.coupon?.code;

  return (
    <div className="bg-[#F8F9FA] pb-24 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100 py-3">
        <div className="container flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <Link to="/" className="hover:text-[#0C3823]">Home</Link>
            <span className="text-slate-300">&gt;</span>
            <span className="text-[#0C3823] font-bold">Shopping Cart</span>
          </div>
        </div>
      </div>

      <div className="container pt-8">
        
        {/* Title Area */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0C3823] leading-none">Your Cart</h1>
            <div className="bg-[#E8F5ED] text-[#0C3823] text-xs font-extrabold px-3 py-1 rounded-full flex items-center h-7 border border-[#0C3823]/10">
              {cartItems.length} items
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#0C3823] font-bold text-xs bg-[#E8F5ED] px-4 py-2 rounded-xl border border-[#0C3823]/20">
            <FiShield className="text-base text-[#0C3823]" />
            Encrypted & Secure Checkout
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            
            <div>
              <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm">
                {cartItems.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 font-bold">
                    <p className="text-lg mb-4 text-[#124827]">Your basket is currently empty.</p>
                    <Link to={ROUTES.SHOP} className="inline-block bg-[#124827] text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-[#1c6b3b] transition-colors">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item, index) => {
                    const product = item.product || item;
                    const variation = item.variation;
                    const price = item.price || variation?.salePrice || variation?.regularPrice || product?.discount_price || product?.price || 0;
                    const name = product?.name || product?.title || 'Unknown Product';
                    const brand = product?.brand?.name || product?.brand || 'Grandma\'s Basket';
                    const image = product?.mainImage || (product?.images && product.images[0]) || product?.image || '/images/placeholder.png';
                    const weight = variation?.displayWeight || `${variation?.weight || ''}${variation?.weightUnit || ''}` || product?.weight || '';
                    const stockCount = variation?.stockQuantity ?? product?.stockCount ?? 10;
                    const isLowStock = stockCount < 5;

                    return (
                      <div key={item._id || item.id} className={`flex flex-col sm:flex-row gap-6 p-6 ${index !== cartItems.length - 1 ? 'border-b border-slate-100' : ''}`}>
                        {/* Item Image */}
                        <div className="w-24 h-24 flex-shrink-0 bg-[#fafcfb] rounded-xl border border-slate-100 flex items-center justify-center p-2">
                          <img src={image} alt={name} className="max-w-full max-h-full object-contain" />
                        </div>
                        
                        {/* Item Details */}
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex flex-col">
                            <span className="text-[#1c6b3b] text-[10px] font-extrabold uppercase tracking-wider mb-1">{brand}</span>
                            <h3 className="text-base font-bold text-slate-900 leading-tight mb-2">{name}</h3>
                            {weight && (
                              <div className="flex items-center text-slate-500 text-xs font-medium mb-3 gap-1.5">
                                <FiPackage className="text-slate-400" /> {weight}
                              </div>
                            )}
                            <div className="text-2xl font-black text-[#124827] mb-3">
                              £{price.toFixed(2)}
                            </div>
                            
                            {/* Stock Badge */}
                            <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full w-fit ${
                              !isLowStock 
                                ? 'bg-[#e8f5ed] text-[#124827]' 
                                : 'bg-[#feeee8] text-[#eb5b27]'
                            }`}>
                              {!isLowStock ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
                              {!isLowStock ? 'In Stock' : `Only ${stockCount} Left`}
                            </div>
                          </div>

                          {/* Right side controls */}
                          <div className="flex flex-col items-end justify-between min-h-full">
                            {/* Qty Selector */}
                            <div className="flex items-center border border-slate-200 rounded-xl h-10 w-32 bg-[#fafcfb] overflow-hidden mb-4">
                              <button 
                                onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                                className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-[#124827] transition-colors"
                              >
                                <FiMinus size={14} />
                              </button>
                              <span 
                                className="flex-1 flex items-center justify-center text-xs font-extrabold text-[#124827] border-x border-slate-200 h-full bg-white"
                              >
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                                className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-[#124827] transition-colors"
                              >
                                <FiPlus size={14} />
                              </button>
                            </div>

                            <div className="text-xs font-semibold text-slate-500 mb-4 text-right">
                              Subtotal: <span className="text-[#124827] font-black text-sm">£{(price * item.quantity).toFixed(2)}</span>
                            </div>

                            <button 
                              onClick={() => removeFromCart(item._id || item.id)}
                              className="flex items-center gap-1.5 text-red-500 text-xs font-bold hover:text-red-600 transition-colors"
                            >
                              <FiTrash2 size={14} /> Remove Item
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Coupons & Delivery Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              {/* Apply Coupon */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-2 text-[#124827] font-bold mb-4 text-sm uppercase tracking-wider">
                  <FiTag className="text-[#eb5b27] text-lg" /> Apply Coupon
                </div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#e8f5ed] border border-[#124827]/30 p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="text-[#124827]" />
                      <span className="font-extrabold text-[#124827] text-xs">{appliedCoupon}</span>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-red-500 hover:text-red-700">
                      <FiX />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2 mb-4">
                      <input 
                        type="text" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter promo code..." 
                        className="flex-1 bg-[#fafcfb] border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#124827]"
                      />
                      <button onClick={handleApplyCoupon} className="bg-[#124827] hover:bg-[#1c6b3b] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm">
                        Apply
                      </button>
                    </div>
                    {availableCoupons.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {availableCoupons.map((coupon, idx) => (
                          <button 
                            key={coupon._id || idx}
                            onClick={() => { setCouponCode(coupon.code); applyCoupon(coupon.code); }} 
                            className="bg-[#fafcfb] border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold flex items-center gap-2 hover:bg-[#e8f5ed] transition-colors"
                          >
                            <span className="text-[#124827]">{coupon.code}</span>
                            {coupon.discountPercentage && <span className="text-[#eb5b27]">({coupon.discountPercentage}% OFF)</span>}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Estimate Delivery */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-2 text-[#124827] font-bold mb-4 text-sm uppercase tracking-wider">
                  <FiMapPin className="text-[#124827] text-lg" /> Delivery Check
                </div>
                <div className="flex gap-2 mb-4">
                  <input 
                    type="text" 
                    placeholder="Enter UK Postcode..." 
                    className="flex-1 bg-[#fafcfb] border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#124827]"
                  />
                  <button className="bg-[#124827] hover:bg-[#1c6b3b] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm">
                    Check
                  </button>
                </div>
                <div className="flex flex-col gap-2 text-xs font-medium text-slate-600">
                  <div className="flex items-center gap-2">
                    <FiZap className="text-[#eb5b27] text-sm" /> Same-Day Delivery available for order before 2pm
                  </div>
                  <div className="flex items-center gap-2">
                    <FiTruck className="text-slate-400 text-sm" /> Standard UK Shipping: 1-2 working days
                  </div>
                </div>
              </div>
            </div>

            {/* You May Also Like */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-extrabold text-[#124827]">You May Also Like</h3>
                <Link to={ROUTES.SHOP} className="text-[#eb5b27] text-xs font-bold hover:underline flex items-center gap-1">
                  View All Products <span>&gt;</span>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {fallbackRelated.slice(0, 4).map(item => (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-3 flex flex-col hover:shadow-lg transition-all hover:border-[#124827]/30">
                    <div className="relative h-28 mb-3 bg-[#fafcfb] rounded-xl flex items-center justify-center p-2">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="text-[#1c6b3b] text-[9px] font-black uppercase tracking-wider mb-1">
                      {item.brand}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight mb-1 line-clamp-2 min-h-[32px]">
                      {item.name}
                    </h4>
                    <div className="text-[10px] text-slate-400 font-medium mb-2">
                      {item.weight}
                    </div>
                    <div className="text-sm font-black text-[#124827] mb-3 mt-auto">
                      £{item.price.toFixed(2)}
                    </div>
                    <Link to={ROUTES.SHOP} className="w-full bg-[#124827] hover:bg-[#1c6b3b] text-white font-bold text-xs py-2 rounded-xl transition-colors flex items-center justify-center">
                      View Item
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              {/* Summary Box */}
              <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white mb-6 shadow-sm">
                <div className="bg-[#124827] text-white p-5 flex items-center gap-2">
                  <FiFileText className="text-xl text-[#eb5b27]" />
                  <h3 className="text-lg font-bold">Order Summary</h3>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col gap-4 mb-6 text-xs font-semibold">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="text-slate-900 font-bold">£{subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[#eb5b27]">
                        <span>Discount {appliedCoupon ? `(${appliedCoupon})` : ''}</span>
                        <span className="font-extrabold">- £{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#124827]">
                      <span>Delivery Charge</span>
                      <span className="font-bold">{delivery === 0 ? 'FREE' : `£${delivery.toFixed(2)}`}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mb-6">
                    <div className="flex justify-between items-end">
                      <span className="text-slate-900 font-extrabold text-base">Grand Total</span>
                      <span className="text-[#124827] font-black text-3xl">£{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {discount > 0 && (
                    <div className="bg-[#e8f5ed] text-[#124827] text-xs font-bold p-3 rounded-xl flex items-center gap-2 mb-6 text-center justify-center border border-[#124827]/20">
                      You're saving £{discount.toFixed(2)} on this order!
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <Link to={ROUTES.CHECKOUT} className="w-full bg-[#124827] hover:bg-[#1c6b3b] text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#124827]/20 text-sm">
                      <FiLock /> Proceed to Checkout
                    </Link>
                    
                    <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs shadow-sm">
                      <FiMessageCircle size={16} /> Order via WhatsApp
                    </button>
                    
                    <Link to={ROUTES.SHOP} className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs mt-1">
                      <FiArrowLeft /> Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-500 mb-8">
                <FiShield className="text-[#124827]" /> 256-bit SSL Secure Checkout 
                <span className="text-slate-300 mx-1">|</span> 
                Visa • Mastercard • PayPal
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
