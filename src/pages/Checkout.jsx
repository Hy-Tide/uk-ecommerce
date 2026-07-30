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

  useEffect(() => {
    const validateCheckout = async () => {
      const token = sessionStorage.getItem('sessionToken');
      if (!cartItems || cartItems.length === 0) {
        return; // wait for cart fetch if empty, but cart might actually be empty
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
        showSnackbar('Order placed successfully!', 'success');
        clearCart();
        navigate('/order-success');
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
    <div className="bg-white pb-20 font-sans">
      
      {/* Breadcrumb Area */}
      <div className="border-b border-gray-100 py-3">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-500 font-medium">
            <Link to="/" className="hover:text-[#2e7d32]">Home</Link>
            <span className="mx-2 text-gray-300">&gt;</span>
            <Link to="/cart" className="hover:text-[#2e7d32]">Cart</Link>
            <span className="mx-2 text-gray-300">&gt;</span>
            <span className="text-gray-900 font-bold">Checkout</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-gray-100 py-6">
        <div className="container px-4 mx-auto flex items-center justify-center max-w-3xl">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2e7d32] text-white flex items-center justify-center font-bold">
              <FiCheck size={18} />
            </div>
            <span className="text-[#2e7d32] font-bold text-sm">Cart</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-[#2e7d32] mx-4"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2e7d32] text-white flex items-center justify-center font-bold">
              2
            </div>
            <span className="text-[#2e7d32] font-bold text-sm">Address</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-bold">
              3
            </div>
            <span className="text-gray-400 font-bold text-sm">Delivery</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-bold">
              4
            </div>
            <span className="text-gray-400 font-bold text-sm">Payment</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-bold">
              5
            </div>
            <span className="text-gray-400 font-bold text-sm">Review</span>
          </div>
          
        </div>
      </div>

      <div className="container px-4 mx-auto pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Checkout Steps */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            
            {/* Step 2: Shipping Address */}
            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center">
                    <FiMapPin size={16} />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">Shipping Address</h2>
                </div>
                <span className="text-[#2e7d32] text-xs font-bold bg-[#e8f5e9] px-3 py-1 rounded-full">Step 2</span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">First Name <span className="text-red-500">*</span></label>
                    <input type="text" name="firstName" value={shippingAddress.firstName} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" name="lastName" value={shippingAddress.lastName} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                    <input type="text" name="phone" value={shippingAddress.phone} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={shippingAddress.email} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">House / Flat Number <span className="text-red-500">*</span></label>
                    <input type="text" name="houseNumber" value={shippingAddress.houseNumber} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Street Address <span className="text-red-500">*</span></label>
                    <input type="text" name="street" value={shippingAddress.street} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">City <span className="text-red-500">*</span></label>
                    <input type="text" name="city" value={shippingAddress.city} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">County</label>
                    <input type="text" name="county" value={shippingAddress.county} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Postcode <span className="text-red-500">*</span></label>
                    <input type="text" name="postcode" value={shippingAddress.postcode} onChange={handleInputChange} className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5 mb-5">
                  <label className="text-sm font-bold text-gray-700">Delivery Notes</label>
                  <textarea 
                    rows="2" 
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32] resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">Address Type</label>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setShippingAddress(prev => ({ ...prev, addressType: 'Home' }))}
                      className={`flex-1 border font-bold text-sm py-2.5 rounded-lg transition-colors ${shippingAddress.addressType === 'Home' ? 'border-[#2e7d32] bg-[#e8f5e9] text-[#2e7d32]' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      Home
                    </button>
                    <button 
                      onClick={() => setShippingAddress(prev => ({ ...prev, addressType: 'Work' }))}
                      className={`flex-1 border font-bold text-sm py-2.5 rounded-lg transition-colors ${shippingAddress.addressType === 'Work' ? 'border-[#2e7d32] bg-[#e8f5e9] text-[#2e7d32]' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      Work
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Choose Delivery Slot */}
            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center">
                    <FiClock size={16} />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">Choose Delivery Slot</h2>
                </div>
                <span className="text-[#2e7d32] text-xs font-bold bg-[#e8f5e9] px-3 py-1 rounded-full">Step 3</span>
              </div>
              
              <div className="p-6">
                <p className="text-sm font-bold text-gray-900 mb-4">Select your preferred delivery time for tomorrow:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Morning', 'Afternoon', 'Evening'].map((slot) => {
                    const times = { 'Morning': '9:00 AM - 12:00 PM', 'Afternoon': '12:00 PM - 5:00 PM', 'Evening': '5:00 PM - 8:00 PM' };
                    const isSelected = deliverySlot === slot;
                    return (
                      <div 
                        key={slot}
                        onClick={() => setDeliverySlot(slot)}
                        className={`border rounded-xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${isSelected ? 'border-[#2e7d32] bg-[#e8f5e9]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                      >
                        <span className={`font-bold text-sm ${isSelected ? 'text-[#2e7d32]' : 'text-gray-900'}`}>{slot}</span>
                        <span className="text-gray-500 text-xs font-medium">{times[slot]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 4: Payment Method */}
            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center">
                    <FiCreditCard size={16} />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">Payment Method</h2>
                </div>
                <span className="text-[#2e7d32] text-xs font-bold bg-[#e8f5e9] px-3 py-1 rounded-full">Step 4</span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {paymentMethods.map((method) => {
                    const id = typeof method === 'string' ? method : method.id;
                    const name = typeof method === 'string' ? method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : method.name;
                    const isSelected = selectedPaymentMethod === id;
                    
                    const getIcon = () => {
                      if (id.toLowerCase().includes('stripe')) return <div className="w-8 h-8 bg-[#635BFF] rounded flex items-center justify-center text-white shadow-sm"><FaCcStripe size={20} /></div>;
                      if (id.toLowerCase().includes('paypal')) return <div className="w-8 h-8 bg-[#00457C] rounded flex items-center justify-center text-white shadow-sm"><FaPaypal size={18} /></div>;
                      if (id.toLowerCase().includes('google')) return <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-900 shadow-sm"><FaGooglePay size={24} /></div>;
                      return <div className={`w-8 h-8 ${isSelected ? 'bg-white text-gray-600' : 'bg-gray-50 border border-gray-100 text-gray-600'} rounded flex items-center justify-center shadow-sm`}><FiCreditCard size={18} /></div>;
                    };

                    return (
                      <div 
                        key={id}
                        onClick={() => setSelectedPaymentMethod(id)}
                        className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors ${isSelected ? 'border-[#2e7d32] bg-[#e8f5e9]' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                      >
                        <div className="flex items-center gap-3">
                          {getIcon()}
                          <span className={`${isSelected ? 'text-[#2e7d32]' : 'text-gray-700'} font-bold text-sm`}>{name}</span>
                        </div>
                        {isSelected ? <FiCheckCircle className="text-[#2e7d32]" size={18} /> : <FiCircle className="text-gray-300" size={18} />}
                      </div>
                    );
                  })}
                </div>

                {/* Billing Address Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer w-fit">
                  <div className="w-5 h-5 rounded bg-[#2e7d32] flex items-center justify-center text-white">
                    <FiCheck size={14} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Billing address is the same as shipping address</span>
                </label>
              </div>
            </div>

            {/* Step 5: Review Your Order */}
            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center">
                    <FiFileText size={16} />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">Review Your Order</h2>
                </div>
                <span className="text-[#2e7d32] text-xs font-bold bg-[#e8f5e9] px-3 py-1 rounded-full">Step 5</span>
              </div>
              
              <div className="p-6 flex flex-col gap-5">
                {cartItems?.map((item, index) => {
                  const product = item.product || {};
                  const variation = item.variation || {};
                  const brandName = product.brand?.name || 'Grandmas Basket';
                  const weightStr = variation.weight ? `${variation.weight}${variation.weightUnit || ''}` : '';
                  const price = variation.salePrice || variation.regularPrice || 0;
                  const imageUrl = product.images?.[0]?.url || '/placeholder.png';

                  return (
                    <div key={item._id || index}>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white border border-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 p-1">
                          <img src={imageUrl} alt={product.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <span className="text-[#2e7d32] text-[9px] font-black uppercase tracking-wider">{brandName}</span>
                          <h4 className="text-sm font-bold text-gray-900 leading-tight mb-1">{product.name}</h4>
                          <span className="text-xs font-medium text-gray-500">{weightStr}</span>
                        </div>
                        <div className="flex flex-col items-end text-right">
                          <span className="text-xs font-bold text-gray-500 mb-1">Qty: {item.quantity}</span>
                          <span className="text-sm font-black text-[#2e7d32]">£{(price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && <div className="h-[1px] bg-gray-100 w-full mt-5"></div>}
                    </div>
                  );
                })}
                
                <div className="h-[1px] bg-gray-200 w-full mt-2"></div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-black text-gray-900">Order Total:</span>
                  <span className="text-2xl font-black text-[#2e7d32]">£{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              
              <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm mb-6">
                <div className="bg-[#2e7d32] text-white p-5">
                  <h3 className="text-lg font-bold">Order Summary</h3>
                </div>
                
                <div className="p-6">
                  {/* Small items list */}
                  <div className="flex flex-col gap-4 mb-6">
                    {cartItems?.map((item, index) => {
                      const product = item.product || {};
                      const variation = item.variation || {};
                      const brandName = product.brand?.name || 'Grandmas Basket';
                      const price = variation.salePrice || variation.regularPrice || 0;
                      const imageUrl = product.images?.[0]?.url || '/placeholder.png';
                      return (
                        <div key={item._id || index} className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white border border-gray-100 rounded flex items-center justify-center p-1">
                            <img src={imageUrl} alt={product.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div className="flex-1 flex flex-col overflow-hidden">
                            <span className="text-xs font-bold text-gray-900 truncate">{brandName} {product.name}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-gray-500 font-medium">x{item.quantity}</span>
                            <span className="font-bold text-gray-900 min-w-[45px] text-right">£{(price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Promo Code Input */}
                  <div className="flex gap-2 mb-6">
                    <input 
                      type="text" 
                      placeholder="Enter promo code..." 
                      className="flex-1 bg-[#f9fafb] border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:border-[#2e7d32]"
                    />
                    <button className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors">
                      Apply
                    </button>
                  </div>

                  {/* Totals */}
                  <div className="flex flex-col gap-3.5 mb-6 text-sm font-medium">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartItems?.length || 0} items)</span>
                      <span className="text-gray-900 font-bold">£{subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[#2e7d32]">
                        <span>Discount</span>
                        <span className="font-bold">- £{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#2e7d32]">
                      <span>Delivery Charge</span>
                      <span className="font-bold">{deliveryCharge === 0 ? 'FREE' : `£${deliveryCharge.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (VAT 5%)</span>
                      <span className="text-gray-900 font-bold">£{tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-900 font-bold text-lg">Grand Total</span>
                      <span className="text-[#2e7d32] font-black text-2xl">£{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                    className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-black py-4 rounded-lg transition-colors shadow-md text-base mb-3 disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {isLoading ? <FiClock className="animate-spin" /> : null}
                    {isLoading ? 'Placing Order...' : 'Place Order Securely'}
                  </button>
                  
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">256-bit SSL Encrypted Checkout</span>
                  </div>
                </div>
              </div>

              {/* Trust Features Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f9fafb] border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                  <FiShield className="text-[#2e7d32] text-xl" />
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Secure Payment</span>
                </div>
                <div className="bg-[#f9fafb] border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                  <FiTruck className="text-[#2e7d32] text-xl" />
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Fast Delivery</span>
                </div>
                <div className="bg-[#f9fafb] border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                  <FiPackage className="text-[#2e7d32] text-xl" />
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Fresh Products</span>
                </div>
                <div className="bg-[#f9fafb] border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                  <FiAward className="text-[#2e7d32] text-xl" />
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Money Back Guarantee</span>
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
