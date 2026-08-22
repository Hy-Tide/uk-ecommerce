import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiEdit2, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiShield, 
  FiTrash2, 
  FiShoppingBag, 
  FiHeart, 
  FiLock, 
  FiPlus, 
  FiCheck, 
  FiChevronRight,
  FiUser
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import AccountPageHeader from '../components/account/AccountPageHeader';
import { getData, putData, postData, deleteData, showSnackbar } from '../services/webservices';
import Skeleton from '../components/common/Skeleton';
import { ROUTES } from '../utils/constants';

const Profile = () => {
  const { user, fetchUserProfile } = useAuth();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [ordersCount, setOrdersCount] = useState(0);

  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    phone_number: ''
  });
  
  const [addresses, setAddresses] = useState([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    house_number: '',
    street_address: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
    is_default: true
  });

  const fetchAddresses = async () => {
    const token = sessionStorage.getItem('sessionToken') || localStorage.getItem('token');
    
    if (!token || token === 'demo_token') {
      setAddresses([]);
      return;
    }

    try {
      const addressResponse = await getData('website/users/addresses', {}, token);
      let fetchedList = [];

      if (addressResponse && addressResponse.success !== false) {
        if (Array.isArray(addressResponse.data)) {
          fetchedList = addressResponse.data;
        } else if (Array.isArray(addressResponse.data?.addresses)) {
          fetchedList = addressResponse.data.addresses;
        } else if (Array.isArray(addressResponse.data?.data)) {
          fetchedList = addressResponse.data.data;
        } else if (Array.isArray(addressResponse.addresses)) {
          fetchedList = addressResponse.addresses;
        }
      }

      setAddresses(fetchedList);
    } catch (e) {
      console.error('Failed to fetch addresses:', e);
    }
  };

  const fetchOrdersCount = async () => {
    const token = sessionStorage.getItem('sessionToken');
    if (!token || token === 'demo_token') return;
    try {
      const res = await getData('website/orders');
      if (res?.success && res?.data?.orders) {
        setOrdersCount(res.data.orders.length);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const token = sessionStorage.getItem('sessionToken');
      if (token && token !== 'demo_token') {
        const response = await getData('website/users/profile', {}, token);
        if (response && response.success !== false && response.data && response.data.user) {
          const userObj = response.data.user;
          setProfile(userObj);
          if (Array.isArray(userObj.addresses) && userObj.addresses.length > 0) {
            setAddresses(userObj.addresses);
          }
        } else {
          setProfile(user || { first_name: 'Customer', email: 'user@example.com' });
        }
      } else {
        setProfile(user || { first_name: 'Customer', email: 'user@example.com' });
      }
      try { await fetchAddresses(); } catch (e) {}
      try { await fetchOrdersCount(); } catch (e) {}
      setIsLoading(false);
    };
    fetchData();
  }, [user]);

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSavingAddress(true);
    const token = sessionStorage.getItem('sessionToken');
    let response = null;
    
    if (token && token !== 'demo_token') {
      if (editingAddressId) {
        response = await putData(`website/users/addresses/${editingAddressId}`, addressForm, token);
      } else {
        response = await postData('website/users/addresses', addressForm, token);
      }
    }
    
    setIsSavingAddress(false);

    let updatedList = [...addresses];
    const targetId = editingAddressId;

    if (targetId) {
      updatedList = updatedList.map(a => 
        (a._id === targetId || a.id === targetId)
          ? { ...a, ...addressForm }
          : (addressForm.is_default ? { ...a, is_default: false } : a)
      );
    } else {
      const newAddress = {
        _id: response?.data?._id || response?.data?.id || `addr_${Date.now()}`,
        id: `addr_${Date.now()}`,
        ...addressForm
      };
      if (addressForm.is_default) {
        updatedList = updatedList.map(a => ({ ...a, is_default: false }));
      }
      updatedList.push(newAddress);
    }

    setAddresses(updatedList);
    showSnackbar(targetId ? 'Address updated successfully!' : 'Address added successfully!', 'success');
    setIsAddingAddress(false);
    setEditingAddressId(null);
    setAddressForm({
      house_number: '',
      street_address: '',
      city: '',
      county: '',
      postcode: '',
      country: 'United Kingdom',
      is_default: true
    });
  };

  const handleEditAddressClick = (addr) => {
    setAddressForm({
      house_number: addr.house_number || '',
      street_address: addr.street_address || '',
      city: addr.city || '',
      county: addr.county || '',
      postcode: addr.postcode || '',
      country: addr.country || 'United Kingdom',
      is_default: addr.is_default || false
    });
    setEditingAddressId(addr._id || addr.id);
    setIsAddingAddress(true);
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    
    const token = sessionStorage.getItem('sessionToken');
    if (token && token !== 'demo_token') {
      await deleteData(`website/users/addresses/${id}`, token);
    }
    
    const updatedList = addresses.filter(a => (a._id || a.id) !== id);
    setAddresses(updatedList);
    showSnackbar('Address deleted successfully!', 'success');
  };


  const displayUser = profile || user || {};
  const fullName = displayUser.first_name 
    ? `${displayUser.first_name} ${displayUser.last_name || ''}`.trim() 
    : (displayUser.name || 'Customer Name');
  const initial = fullName && fullName !== 'Customer Name' ? fullName.charAt(0).toUpperCase() : 'U';
  
  const handleEdit = () => {
    setEditForm({
      first_name: displayUser.first_name || '',
      last_name: displayUser.last_name || '',
      phone_number: displayUser.phone_number || displayUser.phone || ''
    });
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const token = sessionStorage.getItem('sessionToken');
    const response = await putData('website/users/profile', editForm, token);
    setIsUpdating(false);
    
    if (response && response.success !== false) {
      showSnackbar('Profile updated successfully!', 'success');
      setProfile({ ...displayUser, ...editForm });
      if (fetchUserProfile) fetchUserProfile();
      setIsEditing(false);
    } else {
      showSnackbar(response?.error || 'Failed to update profile', 'error');
    }
  };

  return (
    <div className="bg-[#FAFBF9] min-h-screen pb-20">

      {/* Hero Header Cover with embedded breadcrumbs */}
      <div className="bg-gradient-to-r from-[#072414] via-[#0C3823] to-[#165636] relative pt-5 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.15),transparent_50%)]"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>

        <div className="container max-w-5xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-emerald-200/80">
            <Link to={ROUTES.HOME} className="hover:text-white transition-colors flex items-center gap-1">
              <FiUser size={13} /> Home
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <span className="text-emerald-200/80">My Account</span>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <span className="text-white font-bold">My Profile</span>
          </nav>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto -mt-14 sm:-mt-16 relative z-10">

        {/* Profile Card Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 sm:p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              {/* Avatar */}
              <div className="relative -mt-16 sm:-mt-20">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-[#0C3823] to-[#1C6B3B] text-white flex items-center justify-center font-black text-3xl sm:text-4xl shrink-0 overflow-hidden">
                  {displayUser?.avatar ? (
                    <img src={displayUser.avatar} alt={fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{initial}</span>
                  )}
                </div>
                <div className="absolute bottom-1 right-1 w-4.5 h-4.5 bg-emerald-500 rounded-full border-2 border-white" title="Online"></div>
              </div>

              {/* Info */}
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {isLoading ? <Skeleton className="h-8 w-44 rounded-md" /> : fullName}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0C3823] bg-[#EBF5ED] px-3 py-1 rounded-full border border-[#0C3823]/15">
                    <FiShield size={13} className="text-[#0C3823]" /> Verified Customer
                  </span>
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  {isLoading ? <Skeleton className="h-4 w-40 rounded" /> : (displayUser?.email || 'customer@example.com')}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                onClick={handleEdit}
                className="inline-flex items-center gap-2 bg-[#0C3823] hover:bg-[#FF6B00] text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md shadow-[#0C3823]/20 hover:shadow-lg transition-all duration-200"
              >
                <FiEdit2 size={14} /> Edit Profile
              </button>
            </div>
          </div>


          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <Link
              to={ROUTES.ORDERS}
              className="p-4 rounded-2xl bg-[#FAFBF9] border border-slate-100 hover:border-[#0C3823]/30 hover:bg-[#EBF5ED]/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Orders</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#0C3823] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiShoppingBag size={16} />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900">{ordersCount}</p>
              <span className="text-[11px] text-[#0C3823] font-semibold flex items-center gap-1 mt-1">
                View History <FiChevronRight size={12} />
              </span>
            </Link>

            <Link
              to={ROUTES.WISHLIST}
              className="p-4 rounded-2xl bg-[#FAFBF9] border border-slate-100 hover:border-[#FF6B00]/30 hover:bg-orange-50/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Wishlist</span>
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiHeart size={16} />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900">{wishlistItems?.length || 0}</p>
              <span className="text-[11px] text-[#FF6B00] font-semibold flex items-center gap-1 mt-1">
                Saved Items <FiChevronRight size={12} />
              </span>
            </Link>

            <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Addresses</span>
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FiMapPin size={16} />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900">{addresses.length}</p>
              <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">Locations Saved</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account Tier</span>
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <FiShield size={16} />
                </div>
              </div>
              <p className="text-lg font-black text-[#0C3823]">Prime Member</p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">Active Status</span>
            </div>
          </div>
        </motion.div>

        {/* Content Section: Personal Info & Addresses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Account Details */}
          <div className="lg:col-span-1 space-y-6">

            {/* Profile Information Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5"
            >
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-4">
                <FiUser className="text-[#0C3823]" /> Personal Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FAFBF9] border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <FiMail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                    <div className="font-bold text-slate-800 text-xs truncate">
                      {isLoading ? <Skeleton className="h-4 w-32 rounded" /> : (displayUser?.email || 'customer@example.com')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FAFBF9] border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0C3823] flex items-center justify-center shrink-0">
                    <FiPhone size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</p>
                    <div className="font-bold text-slate-800 text-xs truncate">
                      {isLoading ? <Skeleton className="h-4 w-28 rounded" /> : (displayUser?.phone_number || displayUser?.phone || 'Not Provided')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FAFBF9] border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FiShield size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Security</p>
                    <p className="font-bold text-slate-800 text-xs">Password Encrypted</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={ROUTES.CHANGE_PASSWORD}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-[#0C3823] hover:text-white transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <FiLock size={15} /> Change Password
                  </span>
                  <FiChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Quick Links Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="bg-[#0C3823] text-white rounded-3xl p-6 shadow-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
              <h4 className="font-bold text-base mb-2">Need Help with Orders?</h4>
              <p className="text-xs text-emerald-100 leading-relaxed mb-4">
                Track your package status in real-time or reach out to our support team 24/7.
              </p>
              <div className="flex gap-3">
                <Link
                  to={ROUTES.TRACK_ORDER}
                  className="flex-1 py-2.5 px-3 bg-white text-[#0C3823] rounded-xl font-bold text-xs text-center hover:bg-slate-100 transition-colors"
                >
                  Track Order
                </Link>
                <Link
                  to={ROUTES.SUPPORT}
                  className="flex-1 py-2.5 px-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-xs text-center hover:bg-white/20 transition-colors"
                >
                  Support Center
                </Link>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Saved Delivery Addresses */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-xl flex items-center gap-2">
                    <FiMapPin className="text-[#FF6B00]" /> Saved Delivery Addresses
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Manage your delivery locations for fast checkout
                  </p>
                </div>
                <button
                  onClick={() => {
                    setAddressForm({ house_number: '', street_address: '', city: '', county: '', postcode: '', country: 'United Kingdom', is_default: true });
                    setEditingAddressId(null);
                    setIsAddingAddress(true);
                  }}
                  className="inline-flex items-center gap-2 bg-[#EBF5ED] hover:bg-[#0C3823] text-[#0C3823] hover:text-white font-bold text-xs px-4 py-2.5 rounded-2xl border border-[#0C3823]/15 transition-all duration-200 shrink-0"
                >
                  <FiPlus size={16} /> Add New Address
                </button>
              </div>

              {/* Address List */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="p-5 bg-[#FAFBF9] rounded-2xl border border-slate-100 flex items-start gap-4">
                      <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                      <div className="w-full">
                        <Skeleton className="h-5 w-2/3 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="p-10 bg-[#FAFBF9] rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0C3823] flex items-center justify-center mb-3">
                      <FiMapPin size={24} />
                    </div>
                    <p className="text-slate-800 font-bold text-sm mb-1">No delivery addresses saved</p>
                    <p className="text-slate-400 text-xs max-w-xs mb-4">Add your home or office address to make checking out faster.</p>
                    <button
                      onClick={() => {
                        setAddressForm({ house_number: '', street_address: '', city: '', county: '', postcode: '', country: 'United Kingdom', is_default: true });
                        setEditingAddressId(null);
                        setIsAddingAddress(true);
                      }}
                      className="bg-[#0C3823] text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-[#FF6B00] transition-colors"
                    >
                      + Add Address
                    </button>
                  </div>
                ) : (
                  addresses.map((addr, idx) => (
                    <div
                      key={addr._id || idx}
                      className={`p-5 rounded-2xl border transition-all relative flex items-start gap-4 ${
                        addr.is_default
                          ? 'bg-[#F4F9F5] border-[#0C3823]/30 shadow-xs'
                          : 'bg-[#FAFBF9] border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                        addr.is_default ? 'bg-[#0C3823] text-white' : 'bg-white text-slate-500 border border-slate-200'
                      }`}>
                        <FiMapPin size={20} />
                      </div>

                      <div className="flex-1 min-w-0 pr-16">
                        {addr.is_default && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0C3823] bg-white px-2.5 py-0.5 rounded-full border border-[#0C3823]/20 mb-2 shadow-2xs">
                            <FiCheck size={11} /> Default Address
                          </span>
                        )}
                        <p className="font-extrabold text-slate-900 text-base mb-1 truncate">
                          {addr.house_number} {addr.street_address}
                        </p>
                        <p className="text-slate-600 font-medium text-xs leading-relaxed">
                          {addr.city}, {addr.county} {addr.postcode}, {addr.country || 'UK'}
                        </p>
                      </div>

                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/80 backdrop-blur-xs rounded-xl p-1 border border-slate-200/60 shadow-2xs">
                        <button
                          onClick={() => handleEditAddressClick(addr)}
                          className="text-slate-500 hover:text-[#0C3823] transition-colors p-1.5 rounded-lg hover:bg-slate-100"
                          title="Edit Address"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr._id || addr.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1.5 rounded-lg hover:bg-rose-50"
                          title="Delete Address"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Modal: Edit Profile */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-[#FAFBF9]">
              <h3 className="font-extrabold text-base text-slate-900">Edit Profile</h3>
              <button 
                onClick={() => setIsEditing(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors text-sm font-bold"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">First Name</label>
                <input 
                  type="text" 
                  value={editForm.first_name}
                  onChange={(e) => setEditForm({...editForm, first_name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0C3823]/20 focus:border-[#0C3823] outline-none transition-all text-xs font-semibold text-slate-800"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Last Name</label>
                <input 
                  type="text" 
                  value={editForm.last_name}
                  onChange={(e) => setEditForm({...editForm, last_name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0C3823]/20 focus:border-[#0C3823] outline-none transition-all text-xs font-semibold text-slate-800"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                <input 
                  type="tel" 
                  value={editForm.phone_number}
                  onChange={(e) => setEditForm({...editForm, phone_number: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0C3823]/20 focus:border-[#0C3823] outline-none transition-all text-xs font-semibold text-slate-800"
                  placeholder="+44 7123 456789"
                />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 font-bold text-slate-600 text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0C3823] hover:bg-[#FF6B00] text-white font-bold text-xs transition-colors disabled:opacity-70 flex justify-center items-center shadow-md shadow-[#0C3823]/20"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Modal: Add/Edit Address */}
      {isAddingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto py-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 my-auto"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-[#FAFBF9]">
              <h3 className="font-extrabold text-base text-slate-900">{editingAddressId ? 'Edit Address' : 'Add New Address'}</h3>
              <button 
                onClick={() => setIsAddingAddress(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors text-sm font-bold"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSaveAddress} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">House No.</label>
                  <input 
                    type="text" 
                    value={addressForm.house_number}
                    onChange={(e) => setAddressForm({...addressForm, house_number: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#0C3823]/20 focus:border-[#0C3823] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Street</label>
                  <input 
                    type="text" 
                    value={addressForm.street_address}
                    onChange={(e) => setAddressForm({...addressForm, street_address: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#0C3823]/20 focus:border-[#0C3823] outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">City</label>
                  <input 
                    type="text" 
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#0C3823]/20 focus:border-[#0C3823] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">County</label>
                  <input 
                    type="text" 
                    value={addressForm.county}
                    onChange={(e) => setAddressForm({...addressForm, county: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#0C3823]/20 focus:border-[#0C3823] outline-none"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Postcode</label>
                  <input 
                    type="text" 
                    value={addressForm.postcode}
                    onChange={(e) => setAddressForm({...addressForm, postcode: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#0C3823]/20 focus:border-[#0C3823] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Country</label>
                  <input 
                    type="text" 
                    value={addressForm.country}
                    onChange={(e) => setAddressForm({...addressForm, country: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#0C3823]/20 focus:border-[#0C3823] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="is_default_addr"
                  checked={addressForm.is_default}
                  onChange={(e) => setAddressForm({...addressForm, is_default: e.target.checked})}
                  className="w-4 h-4 text-[#0C3823] rounded focus:ring-[#0C3823]"
                />
                <label htmlFor="is_default_addr" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Set as default address
                </label>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsAddingAddress(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSavingAddress}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0C3823] hover:bg-[#FF6B00] text-white font-bold text-xs transition-colors disabled:opacity-70 flex justify-center items-center shadow-md shadow-[#0C3823]/20"
                >
                  {isSavingAddress ? 'Saving...' : (editingAddressId ? 'Update Address' : 'Add Address')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default Profile;

