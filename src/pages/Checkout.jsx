import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiCheck, 
  FiMapPin, 
  FiClock, 
  FiCreditCard, 
  FiFileText,
  FiCircle,
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiPackage,
  FiAward
} from 'react-icons/fi';
import { FaCcStripe, FaPaypal, FaGooglePay } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { getData, postData } from '../services/webservices';
import { showSnackbar } from '../services/webservices';
import PaymentWrapper from '../components/checkout/PaymentWrapper';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, cartDetails, clearCart } = useCart();
  
  const [shippingAddress, setShippingAddress] = useState({
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@email.com',
    phone: '+44 7890 123456',
    houseNumber: 'Flat 4B',
    street: '142 Brick Lane',
    city: 'London',
    county: 'Greater London',
    postcode: 'E1 6RF',
    addressType: 'Home'
  });
  const [deliveryNotes, setDeliveryNotes] = useState('Leave at door if no answer. Please ring bell first.');
  const [deliverySlot, setDeliverySlot] = useState('Morning');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [publishableKey, setPublishableKey] = useState('');

  useEffect(() => {
    const validateCheckout = async () => {
      const token = sessionStorage.getItem('sessionToken');
      if (!cartItems || cartItems.length === 0) {
        return;
      }
      try {
        const res = await postData('website/checkout/validate', {}, token);
        if (res.success === false) {
          showSnackbar(res.error || 'Cart validation failed', 'error');
          navigate('/cart');
        }
      } catch (e) {
        navigate('/cart');
      }
    };
    
    const fetchPaymentMethods = async () => {
      try {
        const token = sessionStorage.getItem('sessionToken');
        const res = await getData('website/checkout/payment-methods', {}, token);
        if (res && res.success !== false && res.data) {
          const methods = Array.isArray(res.data) ? res.data : (res.data.paymentMethods || ['credit_card', 'paypal', 'stripe']);
          setPaymentMethods(methods);
          if (methods.length > 0) {
            setSelectedPaymentMethod(typeof methods[0] === 'string' ? methods[0] : methods[0].id);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (cartItems && cartItems.length > 0) {
      validateCheckout();
    }
    fetchPaymentMethods();
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem('sessionToken');
      const payload = {
        shippingAddress,
        billingAddress: shippingAddress,
        deliveryNotes,
        deliverySlot,
        paymentMethod: selectedPaymentMethod
      };
      const res = await postData('website/checkout/place-order', payload, token);
      if (res && res.success !== false) {
        if (selectedPaymentMethod === 'stripe') {
          const intentRes = await postData('website/payments/create-payment-intent', { orderId: res.data.order._id }, token);
          if (intentRes && intentRes.success !== false) {
            setClientSecret(intentRes.data.clientSecret);
            setPublishableKey(intentRes.data.publishableKey);
            clearCart();
          } else {
            showSnackbar(intentRes.error || 'Failed to initialize payment', 'error');
          }
        } else {
          showSnackbar('Order placed successfully!', 'success');
          clearCart();
          navigate('/order-success');
        }
      } else {
        showSnackbar(res.error || 'Failed to place order', 'error');
      }
    } catch (e) {
      showSnackbar('Error placing order', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const discount = cartDetails?.discount || 0;
  const subtotal = cartTotal || 0;
  const deliveryCharge = 0;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal - discount + deliveryCharge + tax;

  return (
    <div className="bg-[#F8F9FA] pb-24 min-h-screen">
      
      {/* Breadcrumb Area */}
      <div className="bg-white border-b border-slate-100 py-3">
        <div className="container flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <Link to="/" className="hover:text-[#0C3823]">Home</Link>
            <span className="text-slate-300">&gt;</span>
            <Link to="/cart" className="hover:text-[#0C3823]">Cart</Link>
            <span className="text-slate-300">&gt;</span>
            <span className="text-[#0C3823] font-bold">Checkout</span>
          </div>
        </div>
      </div>

      {/* Step Indicator Bar */}
      <div className="bg-white border-b border-slate-100 py-6">
        <div className="container max-w-3xl flex items-center justify-center">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#124827] text-white flex items-center justify-center font-bold text-xs">
              <FiCheck size={16} />
            </div>
            <span className="text-[#124827] font-bold text-xs">Cart</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-[#124827] mx-3"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#124827] text-white flex items-center justify-center font-bold text-xs">
              2
            </div>
            <span className="text-[#124827] font-bold text-xs">Address</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-slate-200 mx-3"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#fafcfb] border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <span className="text-slate-400 font-bold text-xs">Delivery</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-slate-200 mx-3"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#fafcfb] border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <span className="text-slate-400 font-bold text-xs">Payment</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-slate-200 mx-3"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#fafcfb] border-2 border-slate-200 text-slate-400 flex items-center justify-center font-bold text-xs">
              5
            </div>
            <span className="text-slate-400 font-bold text-xs">Review</span>
          </div>
          
        </div>
      </div>

      <div className="container pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Checkout Steps */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            
            {/* Step 2: Shipping Address */}
            <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f5ed] text-[#124827] flex items-center justify-center">
                    <FiMapPin size={16} />
                  </div>
                  <h2 className="text-base font-extrabold text-[#124827]">Shipping Address</h2>
                </div>
                <span className="text-[#124827] text-xs font-extrabold bg-[#e8f5ed] px-3 py-1 rounded-full border border-[#124827]/20">Step 2</span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">First Name <span className="text-[#eb5b27]">*</span></label>
                    <input type="text" name="firstName" value={shippingAddress.firstName} onChange={handleInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#124827]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Last Name <span className="text-[#eb5b27]">*</span></label>
                    <input type="text" name="lastName" value={shippingAddress.lastName} onChange={handleInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#124827]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Mobile Number <span className="text-[#eb5b27]">*</span></label>
                    <input type="text" name="phone" value={shippingAddress.phone} onChange={handleInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#124827]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address <span className="text-[#eb5b27]">*</span></label>
                    <input type="email" name="email" value={shippingAddress.email} onChange={handleInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#124827]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">House / Flat Number <span className="text-[#eb5b27]">*</span></label>
                    <input type="text" name="houseNumber" value={shippingAddress.houseNumber} onChange={handleInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#124827]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Street Address <span className="text-[#eb5b27]">*</span></label>
                    <input type="text" name="street" value={shippingAddress.street} onChange={handleInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#124827]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">City <span className="text-[#eb5b27]">*</span></label>
                    <input type="text" name="city" value={shippingAddress.city} onChange={handleInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#124827]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">County</label>
                    <input type="text" name="county" value={shippingAddress.county} onChange={handleInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#124827]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Postcode <span className="text-[#eb5b27]">*</span></label>
                    <input type="text" name="postcode" value={shippingAddress.postcode} onChange={handleInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-[#124827]" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Delivery Instructions</label>
                  <textarea 
                    rows="2" 
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-xs font-medium outline-none focus:border-[#124827] resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Address Tag</label>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setShippingAddress(prev => ({ ...prev, addressType: 'Home' }))}
                      className={`flex-1 border font-bold text-xs py-2.5 rounded-xl transition-colors ${shippingAddress.addressType === 'Home' ? 'border-[#124827] bg-[#e8f5ed] text-[#124827]' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                    >
                      Home
                    </button>
                    <button 
                      onClick={() => setShippingAddress(prev => ({ ...prev, addressType: 'Work' }))}
                      className={`flex-1 border font-bold text-xs py-2.5 rounded-xl transition-colors ${shippingAddress.addressType === 'Work' ? 'border-[#124827] bg-[#e8f5ed] text-[#124827]' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                    >
                      Work
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Choose Delivery Slot */}
            <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f5ed] text-[#124827] flex items-center justify-center">
                    <FiClock size={16} />
                  </div>
                  <h2 className="text-base font-extrabold text-[#124827]">Delivery Window</h2>
                </div>
                <span className="text-[#124827] text-xs font-extrabold bg-[#e8f5ed] px-3 py-1 rounded-full border border-[#124827]/20">Step 3</span>
              </div>
              
              <div className="p-6">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Select preferred slot for tomorrow:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Morning', 'Afternoon', 'Evening'].map((slot) => {
                    const times = { 'Morning': '9:00 AM - 12:00 PM', 'Afternoon': '12:00 PM - 5:00 PM', 'Evening': '5:00 PM - 8:00 PM' };
                    const isSelected = deliverySlot === slot;
                    return (
                      <div 
                        key={slot}
                        onClick={() => setDeliverySlot(slot)}
                        className={`border rounded-2xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${isSelected ? 'border-[#124827] bg-[#e8f5ed] shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                      >
                        <span className={`font-extrabold text-sm ${isSelected ? 'text-[#124827]' : 'text-slate-800'}`}>{slot}</span>
                        <span className="text-slate-500 text-xs font-medium">{times[slot]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 4: Payment Method */}
            <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f5ed] text-[#124827] flex items-center justify-center">
                    <FiCreditCard size={16} />
                  </div>
                  <h2 className="text-base font-extrabold text-[#124827]">Payment Method</h2>
                </div>
                <span className="text-[#124827] text-xs font-extrabold bg-[#e8f5ed] px-3 py-1 rounded-full border border-[#124827]/20">Step 4</span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {paymentMethods.map((method) => {
                    const id = typeof method === 'string' ? method : method.id;
                    const name = typeof method === 'string' ? method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : method.name;
                    const isSelected = selectedPaymentMethod === id;
                    
                    const getIcon = () => {
                      if (id.toLowerCase().includes('stripe')) return <div className="w-8 h-8 bg-[#635BFF] rounded-xl flex items-center justify-center text-white shadow-sm"><FaCcStripe size={20} /></div>;
                      if (id.toLowerCase().includes('paypal')) return <div className="w-8 h-8 bg-[#00457C] rounded-xl flex items-center justify-center text-white shadow-sm"><FaPaypal size={18} /></div>;
                      if (id.toLowerCase().includes('google')) return <div className="w-8 h-8 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-900 shadow-sm"><FaGooglePay size={24} /></div>;
                      return <div className={`w-8 h-8 ${isSelected ? 'bg-[#124827] text-white' : 'bg-slate-100 text-slate-600'} rounded-xl flex items-center justify-center shadow-sm`}><FiCreditCard size={18} /></div>;
                    };

                    return (
                      <div 
                        key={id}
                        onClick={() => setSelectedPaymentMethod(id)}
                        className={`border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all ${isSelected ? 'border-[#124827] bg-[#e8f5ed] shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                      >
                        <div className="flex items-center gap-3">
                          {getIcon()}
                          <span className={`${isSelected ? 'text-[#124827]' : 'text-slate-700'} font-extrabold text-xs`}>{name}</span>
                        </div>
                        {isSelected ? <FiCheckCircle className="text-[#124827]" size={18} /> : <FiCircle className="text-slate-300" size={18} />}
                      </div>
                    );
                  })}
                </div>

                {/* Billing Address Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer w-fit">
                  <div className="w-4 h-4 rounded bg-[#124827] flex items-center justify-center text-white">
                    <FiCheck size={12} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Billing address matches shipping address</span>
                </label>
              </div>
            </div>

            {/* Step 5: Review Your Order */}
            <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f5ed] text-[#124827] flex items-center justify-center">
                    <FiFileText size={16} />
                  </div>
                  <h2 className="text-base font-extrabold text-[#124827]">Review Order Items</h2>
                </div>
                <span className="text-[#124827] text-xs font-extrabold bg-[#e8f5ed] px-3 py-1 rounded-full border border-[#124827]/20">Step 5</span>
              </div>
              
              <div className="p-6 flex flex-col gap-4">
                {cartItems?.map((item, index) => {
                  const product = item.product || {};
                  const variation = item.variation || {};
                  const brandName = product.brand?.name || 'Grandma\'s Basket';
                  const weightStr = variation.weight ? `${variation.weight}${variation.weightUnit || ''}` : '';
                  const price = variation.salePrice || variation.regularPrice || product.price || 0;
                  const imageUrl = product.images?.[0]?.url || product.image || '/images/placeholder.png';

                  return (
                    <div key={item._id || index}>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#fafcfb] border border-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 p-1">
                          <img src={imageUrl} alt={product.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <span className="text-[#1c6b3b] text-[9px] font-extrabold uppercase tracking-wider">{brandName}</span>
                          <h4 className="text-xs font-bold text-slate-900 leading-tight mb-1">{product.name}</h4>
                          <span className="text-[11px] font-medium text-slate-500">{weightStr}</span>
                        </div>
                        <div className="flex flex-col items-end text-right">
                          <span className="text-xs font-semibold text-slate-500 mb-1">Qty: {item.quantity}</span>
                          <span className="text-sm font-black text-[#124827]">£{(price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && <div className="h-[1px] bg-slate-100 w-full mt-4"></div>}
                    </div>
                  );
                })}
                
                <div className="h-[1px] bg-slate-200 w-full mt-2"></div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-base font-black text-slate-900">Total Order Amount:</span>
                  <span className="text-2xl font-black text-[#124827]">£{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Order Summary Sticky */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              
              <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden shadow-sm mb-6">
                <div className="bg-[#124827] text-white p-5 flex items-center justify-between">
                  <h3 className="text-base font-bold">Summary</h3>
                  <span className="text-xs font-bold text-[#eb5b27] bg-white px-2.5 py-0.5 rounded-full">{cartItems?.length || 0} items</span>
                </div>
                
                <div className="p-6">
                  {/* Totals */}
                  <div className="flex flex-col gap-3 mb-6 text-xs font-semibold">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="text-slate-900 font-bold">£{subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[#eb5b27]">
                        <span>Discount</span>
                        <span className="font-extrabold">- £{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#124827]">
                      <span>Delivery Charge</span>
                      <span className="font-bold">{deliveryCharge === 0 ? 'FREE' : `£${deliveryCharge.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Tax (VAT 5%)</span>
                      <span className="text-slate-900 font-bold">£{tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mb-6">
                    <div className="flex justify-between items-end">
                      <span className="text-slate-900 font-extrabold text-base">Grand Total</span>
                      <span className="text-[#124827] font-black text-3xl">£{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {clientSecret && publishableKey ? (
                    <PaymentWrapper clientSecret={clientSecret} publishableKey={publishableKey} />
                  ) : (
                    <>
                      <button 
                        onClick={handlePlaceOrder}
                        disabled={isLoading}
                        className="w-full bg-[#eb5b27] hover:bg-[#ca4313] text-white font-extrabold py-4 rounded-xl transition-all shadow-lg shadow-[#eb5b27]/30 text-sm mb-3 disabled:opacity-50 flex justify-center items-center gap-2 active:scale-[0.98]"
                      >
                        {isLoading ? <FiClock className="animate-spin" /> : null}
                        {isLoading ? 'Placing Order...' : 'Place Order Securely'}
                      </button>
                      
                      <div className="text-center">
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">256-bit SSL Encrypted Payment</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Trust Features Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm">
                  <FiShield className="text-[#124827] text-lg" />
                  <span className="text-[9px] font-extrabold text-slate-700 uppercase tracking-wider">Secure Payment</span>
                </div>
                <div className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm">
                  <FiTruck className="text-[#eb5b27] text-lg" />
                  <span className="text-[9px] font-extrabold text-slate-700 uppercase tracking-wider">Fast Delivery</span>
                </div>
                <div className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm">
                  <FiPackage className="text-[#124827] text-lg" />
                  <span className="text-[9px] font-extrabold text-slate-700 uppercase tracking-wider">Fresh Quality</span>
                </div>
                <div className="bg-white border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm">
                  <FiAward className="text-[#eb5b27] text-lg" />
                  <span className="text-[9px] font-extrabold text-slate-700 uppercase tracking-wider">100% Guaranteed</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
