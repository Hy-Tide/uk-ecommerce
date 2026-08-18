import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  FiSearch, 
  FiCheckCircle, 
  FiPackage, 
  FiTruck, 
  FiMapPin, 
  FiSmile, 
  FiClock, 
  FiPhoneCall, 
  FiHelpCircle,
  FiChevronRight,
  FiUser
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { getData, showSnackbar } from '../services/webservices';
import { ROUTES } from '../utils/constants';

const TrackOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get('id') || searchParams.get('orderId') || '';

  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [emailInput, setEmailInput] = useState(user?.email || '');
  const [isSearching, setIsSearching] = useState(false);
  const [trackResult, setTrackResult] = useState(null);

  const fetchOrderDetails = async (idToSearch) => {
    if (!idToSearch) return;
    setIsSearching(true);
    const token = sessionStorage.getItem('sessionToken');

    try {
      if (token && token !== 'demo_token') {
        const res = await getData(`website/orders/${idToSearch.trim()}`);
        if (res?.success && res?.data) {
          const ord = res.data;
          const status = ord.orderStatus || 'Processing';
          setTrackResult({
            orderId: ord.orderNumber || ord._id || idToSearch,
            status: status,
            expectedDelivery: ord.estimatedDelivery || 'Estimated 1-2 Days',
            carrier: ord.courier || 'UK Express',
            shippingAddress: {
              name: ord.shippingAddress ? `${ord.shippingAddress.firstName} ${ord.shippingAddress.lastName}` : (user?.name || 'Customer'),
              street: ord.shippingAddress?.address || 'Delivery Address Registered',
              city: ord.shippingAddress?.city || 'London',
              postcode: ord.shippingAddress?.postcode || '',
              phone: ord.shippingAddress?.phone || user?.phone_number || ''
            },
            timeline: [
              { title: 'Order Confirmed', date: 'Confirmed', completed: true, icon: FiCheckCircle },
              { title: 'Order Packed', date: status !== 'Pending' ? 'Packed' : 'Pending', completed: status !== 'Pending', icon: FiPackage },
              { title: 'Dispatched', date: (status === 'Dispatched' || status === 'Out for Delivery' || status === 'Delivered') ? 'Dispatched' : 'Pending', completed: (status === 'Dispatched' || status === 'Out for Delivery' || status === 'Delivered'), icon: FiTruck },
              { title: 'Out for Delivery', date: status === 'Out for Delivery' ? 'Today' : 'Pending', completed: status === 'Out for Delivery' || status === 'Delivered', active: status === 'Out for Delivery', icon: FiMapPin },
              { title: 'Delivered', date: status === 'Delivered' ? 'Delivered' : 'Pending', completed: status === 'Delivered', icon: FiSmile }
            ]
          });
          return;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user?.email && !emailInput) {
      setEmailInput(user.email);
    }
    if (initialOrderId) {
      fetchOrderDetails(initialOrderId);
    }
  }, [user, initialOrderId]);

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) {
      showSnackbar('Please enter a valid Order ID', 'error');
      return;
    }
    await fetchOrderDetails(orderIdInput.trim());
    showSnackbar('Tracking updated', 'success');
  };

  return (
    <div className="bg-[#FAFBF9] min-h-screen pb-20">

      {/* Hero Header Cover */}
      <div className="bg-gradient-to-r from-[#072414] via-[#0C3823] to-[#165636] relative pt-6 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.15),transparent_50%)]"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>

        <div className="container max-w-4xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-emerald-200/80 mb-2">
            <Link to={ROUTES.HOME} className="hover:text-white transition-colors flex items-center gap-1">
              <FiUser size={13} /> Home
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <span className="text-emerald-200/80">My Account</span>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <span className="text-white font-bold">Track Your Order</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Track Your Package</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium mt-1">Real-time order status and delivery updates</p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto -mt-12 sm:-mt-14 relative z-10 space-y-8">
        
        {/* Search Order Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 sm:p-8"
        >
          <h2 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <FiSearch className="text-[#0C3823]" /> Find Your Shipment
          </h2>
          <form onSubmit={handleTrackSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Order ID</label>
              <input 
                type="text" 
                placeholder="e.g. ORD-2026-8924"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                className="w-full bg-[#FAFBF9] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#0C3823] focus:ring-2 focus:ring-[#0C3823]/15 transition-all text-xs font-bold text-slate-800"
                required
              />
            </div>
            <div className="md:col-span-5">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-[#FAFBF9] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#0C3823] focus:ring-2 focus:ring-[#0C3823]/15 transition-all text-xs font-semibold text-slate-800"
                required
              />
            </div>
            <div className="md:col-span-2 flex items-end">
              <button 
                type="submit" 
                disabled={isSearching}
                className="w-full bg-[#0C3823] hover:bg-[#FF6B00] text-white font-bold text-xs py-3 px-5 rounded-xl transition-all duration-200 shadow-md shadow-[#0C3823]/20 flex items-center justify-center gap-2 h-[42px] disabled:opacity-70"
              >
                {isSearching ? 'Searching...' : (
                  <>
                    <FiSearch size={15} /> Track
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Tracking Results Card */}
        {trackResult ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
          >
            {/* Header Details */}
            <div className="p-6 sm:p-8 bg-[#FAFBF9] border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">Tracking Number</p>
                <h3 className="font-black text-xl text-slate-900">#{trackResult.orderId}</h3>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">Expected Delivery</p>
                <p className="font-extrabold text-base text-[#FF6B00] flex items-center gap-1.5">
                  <FiClock size={16} /> {trackResult.expectedDelivery}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#0C3823] bg-[#EBF5ED] border border-[#0C3823]/20">
                <span className="w-2 h-2 rounded-full bg-[#0C3823] animate-pulse"></span>
                {trackResult.status}
              </div>
            </div>

            {/* Timeline Section */}
            <div className="p-6 sm:p-10">
              <div className="relative">
                
                {/* Connecting Lines */}
                <div className="absolute top-6 left-8 right-8 h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full hidden md:block"></div>
                <div className="absolute top-6 left-8 h-1 bg-[#0C3823] -translate-y-1/2 z-0 rounded-full hidden md:block transition-all duration-1000" style={{ width: '75%' }}></div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                  {trackResult.timeline.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={idx} className="flex md:flex-col items-center gap-3 md:text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all ${
                          step.active
                            ? 'bg-[#FF6B00] text-white ring-4 ring-[#FF6B00]/20 shadow-md shadow-[#FF6B00]/30'
                            : step.completed
                              ? 'bg-[#0C3823] text-white'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                        }`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h4 className={`font-bold text-xs sm:text-sm ${step.active ? 'text-[#FF6B00]' : step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                            {step.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">{step.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* Live Status Banner */}
            <div className="p-4 bg-[#EBF5ED] border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0C3823] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <FiTruck size={18} />
                </div>
                <p className="text-xs font-semibold text-slate-800">
                  Your package status is <strong className="text-[#0C3823]">{trackResult.status}</strong> via {trackResult.carrier}.
                </p>
              </div>
              <a
                href="tel:+447700900000"
                className="inline-flex items-center gap-1.5 bg-white text-[#0C3823] font-bold text-xs px-3.5 py-2 rounded-xl border border-[#0C3823]/20 shadow-2xs hover:bg-[#0C3823] hover:text-white transition-colors shrink-0"
              >
                <FiPhoneCall size={14} /> Contact Courier
              </a>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xs text-center">
            <div className="w-14 h-14 bg-emerald-50 text-[#0C3823] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FiSearch size={24} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-1">Search Your Order Status</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto font-medium">
              Enter your Order ID above to retrieve real-time shipment updates, carrier details, and tracking timelines.
            </p>
          </div>
        )}

        {/* Delivery Address & Order Info Grid */}
        {trackResult && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                <FiMapPin className="text-[#FF6B00]" /> Delivery Address
              </h3>
              <div>
                <p className="font-extrabold text-slate-900 text-sm">{trackResult.shippingAddress.name}</p>
                <p className="text-slate-600 text-xs mt-1 font-medium leading-relaxed">{trackResult.shippingAddress.street}</p>
                <p className="text-slate-600 text-xs font-medium">{trackResult.shippingAddress.city}, {trackResult.shippingAddress.postcode}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FiHelpCircle className="text-[#0C3823]" /> Need Assistance?
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2">
                  Have questions about your order or want to change your delivery instructions? Our team is available 24/7.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Link
                  to={ROUTES.SUPPORT}
                  className="flex-1 py-2.5 px-4 bg-[#0C3823] text-white rounded-xl font-bold text-xs text-center hover:bg-[#FF6B00] transition-colors shadow-xs"
                >
                  Help & Support
                </Link>
                <Link
                  to={ROUTES.ORDERS}
                  className="flex-1 py-2.5 px-4 bg-[#FAFBF9] text-slate-700 border border-slate-200 rounded-xl font-bold text-xs text-center hover:bg-slate-100 transition-colors"
                >
                  All Orders
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrackOrder;

