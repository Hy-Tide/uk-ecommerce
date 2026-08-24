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
  FiAward,
  FiPlus,
  FiX
} from 'react-icons/fi';
import { FaCcStripe } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { getData, postData } from '../services/webservices';
import { useToast } from '../context/ToastContext';
import PaymentWrapper from '../components/checkout/PaymentWrapper';

const Checkout = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { cartItems, cartTotal, cartDetails, clearCart } = useCart();
  const [validatedCart, setValidatedCart] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    house_number: '',
    street_address: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
    address_type: 'Home',
    is_default: true
  });
  const [user, setUser] = useState(null);
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('Morning');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [publishableKey, setPublishableKey] = useState('');

  useEffect(() => {
    const validateCheckout = async () => {
      const token = sessionStorage.getItem('sessionToken');

      if (!token || token === 'demo_token') {
        showToast('Please login to place an order', 'error');
        navigate('/login');
        return;
      }

      if (!cartItems || cartItems.length === 0) {
        return;
      }
      try {
        const res = await postData('website/checkout/validate', {}, token);
        if (res.success === false) {
          showToast(res.error || 'Cart validation failed', 'error');
          navigate('/cart');
        } else if (res.data && res.data.cart) {
          setValidatedCart(res.data.cart);
        }
      } catch (e) {
        navigate('/cart');
      }
    };

    const fetchPaymentMethods = async () => {
      try {
        const token = sessionStorage.getItem('sessionToken');
        await getData('website/checkout/payment-methods', {}, token);
        setPaymentMethods(['stripe']);
        setSelectedPaymentMethod('stripe');
      } catch (e) {
        console.error(e);
      }
    };

    const fetchAddresses = async () => {
      const token = sessionStorage.getItem('sessionToken');
      if (!token) return;
      try {
        const res = await getData('website/users/addresses', {}, token);
        let fetchedList = [];
        if (res && res.success !== false) {
          if (Array.isArray(res.data)) fetchedList = res.data;
          else if (Array.isArray(res.data?.addresses)) fetchedList = res.data.addresses;
          else if (Array.isArray(res.data?.data)) fetchedList = res.data.data;
          else if (Array.isArray(res.addresses)) fetchedList = res.addresses;
        }
        setAddresses(fetchedList);
        if (fetchedList.length > 0) {
          const def = fetchedList.find(a => a.is_default);
          setSelectedAddressId(def ? (def._id || def.id) : (fetchedList[0]._id || fetchedList[0].id));
        } else {
          setIsAddingAddress(true);
        }
      } catch (e) {
        console.error(e);
      }
    };

    const fetchUser = async () => {
      const token = sessionStorage.getItem('sessionToken');
      if (!token) return;
      try {
        const res = await getData('website/users/profile', {}, token);
        if (res?.success && res?.data?.user) {
          setUser(res.data.user);
        } else {
          const storedUser = sessionStorage.getItem('auth_user');
          if (storedUser) setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        const storedUser = sessionStorage.getItem('auth_user');
        if (storedUser) setUser(JSON.parse(storedUser));
      }
    };

    if (cartItems && cartItems.length > 0) {
      validateCheckout();
    }
    fetchPaymentMethods();
    fetchAddresses();
    fetchUser();
  }, [cartItems, navigate]);

  const handleAddressInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!addressForm.house_number || !addressForm.street_address || !addressForm.city || !addressForm.postcode || !addressForm.name || !addressForm.phone) {
      showToast('Please fill all required address fields', 'error');
      return;
    }
    
    setIsSavingAddress(true);
    const token = sessionStorage.getItem('sessionToken');
    try {
      const response = await postData('website/users/addresses', addressForm, token);
      
      const newAddress = {
        _id: response?.data?._id || response?.data?.id || `addr_${Date.now()}`,
        id: `addr_${Date.now()}`,
        ...addressForm
      };
      
      let updatedList = [...addresses];
      if (addressForm.is_default) {
        updatedList = updatedList.map(a => ({ ...a, is_default: false }));
      }
      updatedList.push(newAddress);
      
      setAddresses(updatedList);
      setSelectedAddressId(newAddress._id || newAddress.id);
      setIsAddingAddress(false);
      showToast('Address added successfully', 'success');
      
      setAddressForm({
        name: '', phone: '', house_number: '', street_address: '', city: '', county: '', postcode: '', country: 'United Kingdom', address_type: 'Home', is_default: true
      });
    } catch (e) {
      showToast('Failed to save address', 'error');
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      showToast('Please select a delivery address', 'error');
      return;
    }
    
    const selectedAddress = addresses.find(a => (a._id === selectedAddressId || a.id === selectedAddressId));
    if (!selectedAddress) {
      showToast('Invalid address selected', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const token = sessionStorage.getItem('sessionToken');
      
      const finalShippingAddress = {
        firstName: selectedAddress.name?.split(' ')[0] || user?.first_name || '',
        lastName: selectedAddress.name?.split(' ').slice(1).join(' ') || user?.last_name || '',
        email: user?.email || '',
        phone: selectedAddress.phone || user?.phone || '',
        houseNumber: selectedAddress.house_number || selectedAddress.houseNumber || '',
        street: selectedAddress.street_address || selectedAddress.street || '',
        city: selectedAddress.city || '',
        county: selectedAddress.county || '',
        postcode: selectedAddress.postcode || '',
        addressType: selectedAddress.address_type || selectedAddress.addressType || 'Home'
      };

      const payload = {
        shippingAddress: finalShippingAddress,
        billingAddress: finalShippingAddress,
        deliveryNotes,
        deliverySlot,
        paymentMethod: selectedPaymentMethod
      };
      if (selectedPaymentMethod === 'stripe') {
        const intentRes = await postData('website/payments/create-payment-intent', payload, token);
        if (intentRes && intentRes.success !== false) {
          setClientSecret(intentRes.data.clientSecret);
          setPublishableKey(intentRes.data.publishableKey);
        } else {
          showToast(intentRes.error || 'Failed to initialize payment', 'error');
        }
      } else {
        const res = await postData('website/checkout/place-order', payload, token);
        if (res && res.success !== false) {
          showToast('Order placed successfully!', 'success');
          clearCart();
          navigate('/order-success');
        } else {
          showToast(res.error || 'Failed to place order', 'error');
        }
      }
    } catch (e) {
      showToast('Error placing order', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const discount = validatedCart ? (validatedCart.discountAmount || 0) : (cartDetails?.discount || 0);
  const subtotal = validatedCart ? (validatedCart.subTotal || 0) : (cartTotal || 0);
  const deliveryCharge = 0;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal - discount + deliveryCharge + tax;
  
  const displayItems = validatedCart ? validatedCart.items : cartItems;

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
                {addresses.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-slate-500 mb-4 font-medium text-sm">You have no saved delivery addresses.</p>
                    <button
                      onClick={() => setIsAddingAddress(true)}
                      className="bg-[#124827] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                    >
                      + Add New Address
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {addresses.map((addr, idx) => {
                      const id = addr._id || addr.id || idx;
                      const isSelected = selectedAddressId === id;
                      const name = addr.name || (user ? `${user.first_name || ''} ${user.last_name || ''}` : '');
                      const phone = addr.phone || user?.phone || '';
                      
                      return (
                        <div 
                          key={id} 
                          onClick={() => setSelectedAddressId(id)}
                          className={`relative border rounded-2xl p-5 cursor-pointer transition-all ${isSelected ? 'border-[#124827] bg-[#F4F9F5]' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-[#124827] bg-[#124827]' : 'border-slate-300'}`}>
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-extrabold text-slate-900">{name}</span>
                                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md">{addr.address_type || 'Home'}</span>
                                {addr.is_default && <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0C3823] bg-white border border-[#0C3823]/20 px-2 py-0.5 rounded-md">Default</span>}
                              </div>
                              <p className="text-sm text-slate-600 font-medium mb-1">
                                {addr.house_number}, {addr.street_address}
                              </p>
                              <p className="text-sm text-slate-600 font-medium mb-3">
                                {addr.city}, {addr.county} {addr.postcode}
                              </p>
                              <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                Mobile: <span className="font-extrabold">{phone}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    <button
                      onClick={() => setIsAddingAddress(true)}
                      className="mt-2 w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-500 font-extrabold text-sm hover:border-[#124827] hover:text-[#124827] hover:bg-[#F4F9F5] transition-all cursor-pointer"
                    >
                      <FiPlus size={18} /> Add a New Address
                    </button>
                  </div>
                )}
                
                <div className="mt-6 flex flex-col gap-1.5 pt-6 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Delivery Instructions</label>
                  <textarea
                    rows="2"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="Leave at door if no answer. Please ring bell first..."
                    className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-xs font-medium outline-none focus:border-[#124827] resize-none"
                  ></textarea>
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
                {displayItems?.map((item, index) => {
                  const product = item.product || {};
                  
                  // Map variation from product.variations if it exists in the validated cart format
                  let variation = item.variation || {};
                  if (item.variationId && Array.isArray(product.variations)) {
                    variation = product.variations.find(v => v._id === item.variationId || v.id === item.variationId) || variation;
                  }

                  const brandName = typeof product.brand === 'string' ? '' : (product.brand?.name || '');
                  const weightStr = variation.displayWeight || (variation.weight ? `${variation.weight}${variation.weightUnit || ''}` : '');
                  
                  // item.price is the exact price sent from validate checkout
                  const price = item.price || variation.salePrice || variation.regularPrice || product.price || 0;
                  
                  let imageUrl = '/images/placeholder.png';
                  if (Array.isArray(product.images) && product.images.length > 0) {
                    imageUrl = typeof product.images[0] === 'string' ? product.images[0] : (product.images[0].url || imageUrl);
                  } else if (product.image) {
                    imageUrl = typeof product.image === 'string' ? product.image : (product.image.url || imageUrl);
                  }

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
                    <PaymentWrapper clientSecret={clientSecret} publishableKey={publishableKey} clearCart={clearCart} navigate={navigate} />
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

      {/* Add Address Modal */}
      {isAddingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="font-extrabold text-lg text-slate-900">Add New Address</h3>
              <button
                onClick={() => setIsAddingAddress(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSaveAddress} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name <span className="text-[#eb5b27]">*</span></label>
                  <input required type="text" name="name" value={addressForm.name} onChange={handleAddressInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#124827]" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Mobile Number <span className="text-[#eb5b27]">*</span></label>
                  <input required type="text" name="phone" value={addressForm.phone} onChange={handleAddressInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#124827]" placeholder="+44 7700 900000" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">House / Flat No. <span className="text-[#eb5b27]">*</span></label>
                  <input required type="text" name="house_number" value={addressForm.house_number} onChange={handleAddressInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#124827]" placeholder="Apt 4B" />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Street Address <span className="text-[#eb5b27]">*</span></label>
                  <input required type="text" name="street_address" value={addressForm.street_address} onChange={handleAddressInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#124827]" placeholder="123 Example Street" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">City <span className="text-[#eb5b27]">*</span></label>
                  <input required type="text" name="city" value={addressForm.city} onChange={handleAddressInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#124827]" placeholder="London" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Postcode <span className="text-[#eb5b27]">*</span></label>
                  <input required type="text" name="postcode" value={addressForm.postcode} onChange={handleAddressInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#124827]" placeholder="SW1A 1AA" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">County</label>
                  <input type="text" name="county" value={addressForm.county} onChange={handleAddressInputChange} className="border border-slate-200 bg-[#fafcfb] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-[#124827]" placeholder="Greater London" />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Address Label</label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setAddressForm(prev => ({ ...prev, address_type: 'Home' }))} className={`flex-1 border font-bold text-xs py-2.5 rounded-xl transition-colors ${addressForm.address_type === 'Home' ? 'border-[#124827] bg-[#F4F9F5] text-[#124827]' : 'border-slate-200 bg-white text-slate-600'}`}>Home</button>
                  <button type="button" onClick={() => setAddressForm(prev => ({ ...prev, address_type: 'Work' }))} className={`flex-1 border font-bold text-xs py-2.5 rounded-xl transition-colors ${addressForm.address_type === 'Work' ? 'border-[#124827] bg-[#F4F9F5] text-[#124827]' : 'border-slate-200 bg-white text-slate-600'}`}>Work</button>
                  <button type="button" onClick={() => setAddressForm(prev => ({ ...prev, address_type: 'Other' }))} className={`flex-1 border font-bold text-xs py-2.5 rounded-xl transition-colors ${addressForm.address_type === 'Other' ? 'border-[#124827] bg-[#F4F9F5] text-[#124827]' : 'border-slate-200 bg-white text-slate-600'}`}>Other</button>
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer mb-6">
                <input type="checkbox" name="is_default" checked={addressForm.is_default} onChange={handleAddressInputChange} className="w-4 h-4 rounded text-[#124827] focus:ring-[#124827] accent-[#124827]" />
                <span className="text-sm font-semibold text-slate-700">Set as default delivery address</span>
              </label>

              <button
                type="submit"
                disabled={isSavingAddress}
                className="w-full bg-[#0C3823] hover:bg-[#155a38] text-white font-extrabold py-3.5 rounded-xl transition-all shadow-lg shadow-[#0C3823]/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSavingAddress ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Save & Use This Address'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
