import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiShield, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import AccountPageHeader from '../components/account/AccountPageHeader';
import { getData, putData, postData, deleteData, showSnackbar } from '../services/webservices';
import Skeleton from '../components/common/Skeleton';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
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
    country: '',
    is_default: true
  });

  const fetchAddresses = async () => {
    const token = sessionStorage.getItem('sessionToken');
    const addressResponse = await getData('website/users/addresses', {}, token);
    if (addressResponse && addressResponse.success !== false && addressResponse.data) {
      setAddresses(Array.isArray(addressResponse.data) ? addressResponse.data : (addressResponse.data.addresses || []));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const token = sessionStorage.getItem('sessionToken');
      if (token && token !== 'demo_token') {
        const response = await getData('website/users/profile', {}, token);
        if (response && response.success !== false && response.data && response.data.user) {
          setProfile(response.data.user);
        } else {
          setProfile(user || { first_name: 'Customer', email: 'user@example.com' });
        }
      } else {
        setProfile(user || { first_name: 'Customer', email: 'user@example.com' });
      }
      try { await fetchAddresses(); } catch (e) {}
      setIsLoading(false);
    };
    fetchData();
  }, [user]);

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSavingAddress(true);
    const token = sessionStorage.getItem('sessionToken');
    let response;
    
    if (editingAddressId) {
      response = await putData(`website/users/addresses/${editingAddressId}`, addressForm, token);
    } else {
      response = await postData('website/users/addresses', addressForm, token);
    }
    
    setIsSavingAddress(false);
    
    if (response && response.success !== false) {
      showSnackbar(editingAddressId ? 'Address updated successfully!' : 'Address added successfully!', 'success');
      await fetchAddresses();
      setIsAddingAddress(false);
      setEditingAddressId(null);
      setAddressForm({
        house_number: '',
        street_address: '',
        city: '',
        county: '',
        postcode: '',
        country: '',
        is_default: true
      });
    }
  };

  const handleEditAddressClick = (addr) => {
    setAddressForm({
      house_number: addr.house_number || '',
      street_address: addr.street_address || '',
      city: addr.city || '',
      county: addr.county || '',
      postcode: addr.postcode || '',
      country: addr.country || '',
      is_default: addr.is_default || false
    });
    setEditingAddressId(addr._id || addr.id);
    setIsAddingAddress(true);
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    
    const token = sessionStorage.getItem('sessionToken');
    const response = await deleteData(`website/users/addresses/${id}`, token);
    
    if (response && response.success !== false) {
      showSnackbar('Address deleted successfully!', 'success');
      await fetchAddresses();
    }
  };

  const displayUser = profile || user || {};
  const fullName = displayUser.first_name ? `${displayUser.first_name} ${displayUser.last_name || ''}`.trim() : (displayUser.name || 'Customer Name');
  const initial = fullName ? fullName.charAt(0).toUpperCase() : 'U';
  
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
      setProfile({ ...profile, ...editForm });
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-[#fafcfb] min-h-screen pb-24">
      <AccountPageHeader title="My Profile" />

      <div className="container px-4 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden"
        >
          {/* Cover Photo Area */}
          <div className="h-36 bg-gradient-to-r from-[#0d2a17] via-[#124827] to-[#1c6b3b] relative">
            <button
              onClick={handleEdit}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors border border-white/20"
            >
              <FiEdit2 /> Edit Profile
            </button>
          </div>

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-6 flex justify-between items-end">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden flex items-center justify-center">
                {displayUser?.avatar ? (
                  <img src={displayUser.avatar} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-black text-[#124827] text-5xl">
                    {initial}
                  </span>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="mb-10">
              <h2 className="text-3xl font-extrabold text-[#124827] mb-2">{isLoading ? <Skeleton className="h-8 w-48 inline-block rounded-md" /> : fullName}</h2>
              <div className="flex items-center gap-2 text-[#124827] font-extrabold text-xs bg-[#e8f5ed] px-3.5 py-1.5 rounded-full w-fit border border-[#124827]/20">
                <FiShield className="text-[#124827]" /> Verified Customer
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="p-6 bg-[#fafcfb] rounded-2xl border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-[#feeee8] flex items-center justify-center text-[#eb5b27] shadow-sm flex-shrink-0">
                  <FiMail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                  <p className="font-bold text-slate-900 text-sm">{isLoading ? <Skeleton className="h-5 w-40 inline-block rounded" /> : (displayUser?.email || 'customer@example.com')}</p>
                </div>
              </div>

              <div className="p-6 bg-[#fafcfb] rounded-2xl border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f5ed] flex items-center justify-center text-[#124827] shadow-sm flex-shrink-0">
                  <FiPhone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Mobile Number</p>
                  <p className="font-bold text-slate-900 text-sm">{isLoading ? <Skeleton className="h-5 w-32 inline-block rounded" /> : (displayUser?.phone_number || displayUser?.phone || 'Not Provided')}</p>
                </div>
              </div>

              {/* Addresses Section */}
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-4 mt-2">
                  <h3 className="font-extrabold text-base text-[#124827] flex items-center gap-2">
                    <FiMapPin className="text-[#eb5b27]" /> Saved Addresses
                  </h3>
                  <button 
                    onClick={() => {
                      setAddressForm({ house_number: '', street_address: '', city: '', county: '', postcode: '', country: '', is_default: true });
                      setEditingAddressId(null);
                      setIsAddingAddress(true);
                    }}
                    className="text-xs font-extrabold text-[#124827] hover:text-[#eb5b27] transition-colors bg-[#e8f5ed] px-4 py-2 rounded-xl border border-[#124827]/20"
                  >
                    + Add New Address
                  </button>
                </div>

                <div className="space-y-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      <div className="p-6 bg-[#fafcfb] rounded-2xl border border-slate-100 flex items-start gap-4">
                        <Skeleton className="w-12 h-12 rounded-2xl flex-shrink-0" />
                        <div className="w-full">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="p-8 bg-[#fafcfb] rounded-2xl border border-slate-100 flex justify-center items-center text-center">
                      <p className="text-slate-500 font-semibold text-xs">No addresses saved yet.</p>
                    </div>
                  ) : (
                    addresses.map((addr, idx) => (
                      <div key={addr._id || idx} className="p-6 bg-[#fafcfb] rounded-2xl border border-slate-100 flex items-start gap-4 hover:shadow-md transition-all relative">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#124827] shadow-sm flex-shrink-0 border border-slate-100">
                          <FiMapPin size={20} />
                        </div>
                        <div>
                          {addr.is_default && (
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#eb5b27] bg-[#feeee8] px-2.5 py-1 rounded-md mb-2 inline-block border border-[#eb5b27]/20">
                              Default Address
                            </span>
                          )}
                          <p className="font-extrabold text-slate-900 text-sm mb-1">
                            {addr.house_number} {addr.street_address}
                          </p>
                          <p className="text-slate-600 font-medium text-xs">
                            {addr.city}, {addr.county} {addr.postcode}, {addr.country}
                          </p>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-1">
                          <button
                            onClick={() => handleEditAddressClick(addr)}
                            className="text-slate-400 hover:text-[#124827] transition-colors p-2"
                            title="Edit Address"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(addr._id || addr.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-2"
                            title="Delete Address"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-[#fafcfb]">
              <h3 className="font-extrabold text-base text-[#124827]">Edit Profile</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600 transition-colors text-xl font-bold">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">First Name</label>
                <input 
                  type="text" 
                  value={editForm.first_name}
                  onChange={(e) => setEditForm({...editForm, first_name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] outline-none transition-all text-xs font-semibold"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Last Name</label>
                <input 
                  type="text" 
                  value={editForm.last_name}
                  onChange={(e) => setEditForm({...editForm, last_name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] outline-none transition-all text-xs font-semibold"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  value={editForm.phone_number}
                  onChange={(e) => setEditForm({...editForm, phone_number: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] outline-none transition-all text-xs font-semibold"
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
                  className="flex-1 py-3 px-4 rounded-xl bg-[#124827] text-white font-bold text-xs hover:bg-[#1c6b3b] transition-colors disabled:opacity-70 flex justify-center items-center shadow-md shadow-[#124827]/20"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {isAddingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto pt-24 pb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-[#fafcfb]">
              <h3 className="font-extrabold text-base text-[#124827]">{editingAddressId ? 'Edit Address' : 'Add New Address'}</h3>
              <button onClick={() => setIsAddingAddress(false)} className="text-slate-400 hover:text-slate-600 transition-colors text-xl font-bold">
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Street</label>
                  <input 
                    type="text" 
                    value={addressForm.street_address}
                    onChange={(e) => setAddressForm({...addressForm, street_address: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] outline-none"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">County</label>
                  <input 
                    type="text" 
                    value={addressForm.county}
                    onChange={(e) => setAddressForm({...addressForm, county: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] outline-none"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Country</label>
                  <input 
                    type="text" 
                    value={addressForm.country}
                    onChange={(e) => setAddressForm({...addressForm, country: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-[#124827]/20 focus:border-[#124827] outline-none"
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
                  className="w-4 h-4 text-[#124827] rounded focus:ring-[#124827]"
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
                  className="flex-1 py-3 px-4 rounded-xl bg-[#124827] text-white font-bold text-xs hover:bg-[#1c6b3b] transition-colors disabled:opacity-70 flex justify-center items-center shadow-md shadow-[#124827]/20"
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
