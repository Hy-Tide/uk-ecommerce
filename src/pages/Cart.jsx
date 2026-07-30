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

// Fallback mock if relatedProducts is not in dummyData
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

  // Derive subtotal and discount if cartDetails doesn't provide it clearly, or use cartDetails directly
  const subtotal = cartDetails?.subTotal || cartItems.reduce((sum, item) => sum + ((item.price || item.product?.price || 0) * (item.quantity || 1)), 0);
  const discount = cartDetails?.discountAmount || 0;
  const delivery = cartDetails?.deliveryCharge || 0;
  const total = cartDetails?.totalAmount || cartTotal;
  const appliedCoupon = cartDetails?.coupon?.code;

  return (
    <div className="bg-white pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-500 font-medium">
            <Link to="/" className="hover:text-[#2e7d32]">Home</Link>
            <span className="mx-2 text-gray-300">&gt;</span>
            <span className="text-gray-900 font-bold">Cart</span>
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto pt-8">
        
        {/* Title Area */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <h1 className="text-[28px] font-black text-gray-900 leading-none">Shopping Cart</h1>
            <div className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full flex items-center h-7">
              {cartItems.length} items
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#2e7d32] font-bold text-sm bg-[#e8f5e9] px-4 py-2 rounded-lg">
            <FiShield className="text-lg" />
            Secure Checkout
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-4">Your Items</h2>
              
              <div className="border border-gray-100 rounded-xl overflow-hidden bg-white">
                {cartItems.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">Your cart is empty</div>
                ) : (
                  cartItems.map((item, index) => {
                    const product = item.product || item;
                    const variation = item.variation;
                    const price = item.price || variation?.salePrice || variation?.regularPrice || product?.discount_price || product?.price || 0;
                    const name = product?.name || product?.title || 'Unknown Product';
                    const brand = product?.brand?.name || product?.brand || 'Brand';
                    const image = product?.mainImage || (product?.images && product.images[0]) || product?.image || '/images/placeholder.png';
                    const weight = variation?.displayWeight || `${variation?.weight || ''}${variation?.weightUnit || ''}` || product?.weight || '';
                    const stockCount = variation?.stockQuantity ?? product?.stockCount ?? 10;
                    const isLowStock = stockCount < 5;

                    return (
                      <div key={item._id || item.id} className={`flex flex-col sm:flex-row gap-6 p-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        {/* Item Image */}
                        <div className="w-24 h-24 flex-shrink-0 bg-white flex items-center justify-center">
                          <img src={image} alt={name} className="max-w-full max-h-full object-contain" />
                        </div>
                        
                        {/* Item Details */}
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex flex-col">
                            <span className="text-[#2e7d32] text-[10px] font-black uppercase tracking-wider mb-1">{brand}</span>
                            <h3 className="text-[16px] font-bold text-gray-900 leading-tight mb-2">{name}</h3>
                            {weight && (
                              <div className="flex items-center text-gray-500 text-xs font-medium mb-3 gap-1.5">
                                <FiPackage className="text-gray-400" /> {weight}
                              </div>
                            )}
                            <div className="text-2xl font-black text-[#2e7d32] mb-3">
                              £{price.toFixed(2)}
                            </div>
                            
                            {/* Stock Badge */}
                            <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full w-fit ${
                              !isLowStock 
                                ? 'bg-[#dcfce7] text-[#166534]' 
                                : 'bg-[#fef3c7] text-[#92400e]'
                            }`}>
                              {!isLowStock ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
                              {!isLowStock ? 'In Stock' : `Only ${stockCount} Left`}
                            </div>
                          </div>

                          {/* Right side controls */}
                          <div className="flex flex-col items-end justify-between min-h-full">
                            {/* Qty Selector */}
                            <div className="flex items-center border border-gray-200 rounded-lg h-10 w-32 bg-white overflow-hidden mb-4">
                              <button 
                                onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                                className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                              >
                                <FiMinus size={14} />
                              </button>
                              <span 
                                className="flex-1 flex items-center justify-center text-sm font-bold text-gray-900 border-x border-gray-200 h-full"
                              >
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                                className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                              >
                                <FiPlus size={14} />
                              </button>
                            </div>

                            <div className="text-xs font-bold text-gray-500 mb-4 text-right">
                              Subtotal: <span className="text-gray-900 text-sm">£{(price * item.quantity).toFixed(2)}</span>
                            </div>

                            <button 
                              onClick={() => removeFromCart(item._id || item.id)}
                              className="flex items-center gap-1.5 text-red-500 text-xs font-bold hover:text-red-600 transition-colors"
                            >
                              <FiTrash2 size={14} /> Remove
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Apply Coupon */}
              <div className="bg-[#f9fafb] p-6 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 text-gray-900 font-bold mb-4">
                  <FiTag className="text-[#f97316] text-lg" /> Apply Coupon
                </div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="text-green-600" />
                      <span className="font-bold text-green-800">{appliedCoupon}</span>
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
                        placeholder="Enter coupon code..." 
                        className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]"
                      />
                      <button onClick={handleApplyCoupon} className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors">
                        Apply
                      </button>
                    </div>
                    {availableCoupons.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {availableCoupons.map((coupon, idx) => (
                          <button 
                            key={coupon._id || idx}
                            onClick={() => { setCouponCode(coupon.code); applyCoupon(coupon.code); }} 
                            className="bg-white border border-green-100 rounded-md px-3 py-1.5 text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-green-50"
                          >
                            <span className="text-gray-900">{coupon.code}</span>
                            {coupon.discountPercentage && <span className="text-green-600">({coupon.discountPercentage}%)</span>}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Estimate Delivery */}
              <div className="bg-[#f9fafb] p-6 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 text-gray-900 font-bold mb-4">
                  <FiMapPin className="text-[#2e7d32] text-lg" /> Estimate Delivery
                </div>
                <div className="flex gap-2 mb-4">
                  <input 
                    type="text" 
                    placeholder="Enter UK Postcode..." 
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]"
                  />
                  <button className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors">
                    Check
                  </button>
                </div>
                <div className="flex flex-col gap-2.5 text-xs font-medium text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiZap className="text-[#2e7d32] text-sm" /> Same-Day Delivery — order before 2pm
                  </div>
                  <div className="flex items-center gap-2">
                    <FiTruck className="text-gray-400 text-sm" /> Standard: 1-2 working days
                  </div>
                </div>
              </div>
            </div>

            {/* You May Also Like */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-gray-900">You May Also Like</h3>
                <Link to="/" className="text-[#2e7d32] text-sm font-bold hover:underline flex items-center gap-1">
                  View All <span className="text-lg leading-none">›</span>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {fallbackRelated.slice(0, 4).map(item => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col hover:shadow-md transition-all hover:border-[#379c6b]/30">
                    <div className="relative h-28 mb-3 bg-white flex items-center justify-center p-2">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="text-[#2e7d32] text-[9px] font-black uppercase tracking-wider mb-1">
                      {item.brand}
                    </div>
                    <h4 className="text-[13px] font-bold text-gray-900 leading-tight mb-1 line-clamp-2 min-h-[36px]">
                      {item.name}
                    </h4>
                    <div className="text-[10px] text-gray-500 font-medium mb-3">
                      {item.weight}
                    </div>
                    <div className="text-[15px] font-black text-gray-900 mb-3 mt-auto">
                      £{item.price.toFixed(2)}
                    </div>
                    <Link to={`/category/all/all/${item.slug || 'product'}`} className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold text-xs py-2 rounded-md transition-colors flex items-center justify-center gap-1">
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              {/* Summary Box */}
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mb-6">
                <div className="bg-[#111827] text-white p-5 flex items-center gap-2">
                  <FiFileText className="text-xl" />
                  <h3 className="text-lg font-bold">Order Summary</h3>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col gap-4 mb-6 text-sm font-medium">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="text-gray-900 font-bold">£{subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[#2e7d32]">
                        <span>Discount {appliedCoupon ? `(${appliedCoupon})` : ''}</span>
                        <span className="font-bold">- £{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#2e7d32]">
                      <span>Delivery Charge</span>
                      <span className="font-bold">{delivery === 0 ? 'FREE' : `£${delivery.toFixed(2)}`}</span>
                    </div>
                    {/* VAT can be calculated or fetched from backend */}
                  </div>

                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-900 font-bold text-lg">Grand Total</span>
                      <span className="text-[#2e7d32] font-black text-2xl">£{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {discount > 0 && appliedCoupon && (
                    <div className="bg-[#dcfce7] border border-green-200 text-[#166534] text-xs font-bold p-3 rounded-lg flex items-start gap-2 mb-3">
                      <FiCheckCircle className="text-lg flex-shrink-0 mt-0.5" />
                      <span>Coupon <span className="text-black bg-white/50 px-1 rounded">{appliedCoupon}</span> applied — saving £{discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {discount > 0 && (
                    <div className="bg-[#e8f5e9] text-[#2e7d32] text-xs font-bold p-3 rounded-lg flex items-center gap-2 mb-6 text-center justify-center">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      You're saving £{discount.toFixed(2)} on this order
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <Link to={ROUTES.CHECKOUT} className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-black py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-900/20">
                      <FiLock /> Proceed to Checkout
                    </Link>
                    
                    <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md">
                      <FiMessageCircle /> Order via WhatsApp
                    </button>
                    
                    <Link to="/" className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors mt-1">
                      <FiArrowLeft /> Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 mb-8">
                <FiShield className="text-gray-400" /> 256-bit SSL Secure Checkout 
                <span className="text-gray-300 mx-1">|</span> 
                Visa • Mastercard • PayPal
              </div>

              {/* Delivery Info */}
              <div className="bg-[#f9fafb] p-6 rounded-xl border border-gray-100">
                <h4 className="text-gray-900 font-bold text-sm mb-4">Delivery Info</h4>
                <div className="flex flex-col gap-3.5 text-xs font-medium text-gray-600">
                  <div className="flex items-start gap-2.5">
                    <FiZap className="text-[#2e7d32] text-sm flex-shrink-0 mt-0.5" />
                    <span>Same-Day if ordered before 2pm</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <FiTruck className="text-gray-400 text-sm flex-shrink-0 mt-0.5" />
                    <span>Standard: 1-2 Working Days</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <FiRefreshCw className="text-gray-400 text-sm flex-shrink-0 mt-0.5" />
                    <span>Free Returns within 14 Days</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
