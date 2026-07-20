import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiShield, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import AccountPageHeader from '../components/account/AccountPageHeader';
import { getData, putData, postData, deleteData, showSnackbar } from '../services/webservices';

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
      const response = await getData('website/users/profile', {}, token);
      if (response && response.success !== false && response.data && response.data.user) {
        setProfile(response.data.user);
      }
      await fetchAddresses();
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title="My Profile" />

      <div className="container px-4 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden"
        >
          {/* Cover Photo Area */}
          <div className="h-32 bg-gradient-to-r from-[#2E8B57] to-[#1D3B2A] relative">
            <button
              onClick={handleEdit}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors border border-white/20"
            >
              <FiEdit2 /> Edit Profile
            </button>
          </div>

          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-6 flex justify-between items-end">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white overflow-hidden flex items-center justify-center">
                {displayUser?.avatar ? (
                  <img src={displayUser.avatar} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-black text-[#2E8B57] text-5xl">
                    {initial}
                  </span>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-800 mb-1">{isLoading ? 'Loading...' : fullName}</h2>
              <div className="flex items-center gap-2 text-[#2E8B57] font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full w-fit">
                <FiShield /> Verified Customer
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="p-6 bg-[#FAFAF8] rounded-[20px] border border-slate-100 flex items-start gap-4 hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF8A00] shadow-sm flex-shrink-0">
                  <FiMail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                  <p className="font-bold text-slate-800">{isLoading ? 'Loading...' : (displayUser?.email || 'customer@example.com')}</p>
                </div>
              </div>

              <div className="p-6 bg-[#FAFAF8] rounded-[20px] border border-slate-100 flex items-start gap-4 hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#2E8B57] shadow-sm flex-shrink-0">
                  <FiPhone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile Number</p>
                  <p className="font-bold text-slate-800">{isLoading ? 'Loading...' : (displayUser?.phone_number || displayUser?.phone || 'Not Provided')}</p>
                </div>
              </div>

              {/* Addresses Section */}
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-4 mt-2">
                  <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <FiMapPin className="text-[#2E8B57]" /> My Addresses
                  </h3>
                  <button 
                    onClick={() => {
                      setAddressForm({ house_number: '', street_address: '', city: '', county: '', postcode: '', country: '', is_default: true });
                      setEditingAddressId(null);
                      setIsAddingAddress(true);
                    }}
                    className="text-sm font-bold text-[#2E8B57] hover:text-[#1D3B2A] transition-colors bg-emerald-50 px-4 py-2 rounded-xl"
                  >
                    + Add New
                  </button>
                </div>

                <div className="space-y-4">
                  {isLoading ? (
                    <div className="p-6 bg-[#FAFAF8] rounded-[20px] border border-slate-100 flex justify-center items-center">
                      <p className="text-slate-500 font-medium">Loading addresses...</p>
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="p-6 bg-[#FAFAF8] rounded-[20px] border border-slate-100 flex justify-center items-center text-center">
                      <p className="text-slate-500 font-medium">No addresses saved yet.</p>
                    </div>
                  ) : (
                    addresses.map((addr, idx) => (
                      <div key={addr._id || idx} className="p-6 bg-[#FAFAF8] rounded-[20px] border border-slate-100 flex items-start gap-4 hover:shadow-sm transition-shadow relative">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm flex-shrink-0">
                          <FiMapPin size={20} />
                        </div>
                        <div>
                          {addr.is_default && (
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF8A00] bg-orange-50 px-2 py-1 rounded-md mb-2 inline-block">
                              Default Address
                            </span>
                          )}
                          <p className="font-bold text-slate-800 mb-1">
                            {addr.house_number} {addr.street_address}
                          </p>
                          <p className="text-slate-600 font-medium">
                            {addr.city}, {addr.county} {addr.postcode}, {addr.country}
                          </p>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-1">
                          <button
                            onClick={() => handleEditAddressClick(addr)}
                            className="text-slate-400 hover:text-[#2E8B57] transition-colors p-2"
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
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-[#FAFAF8]">
              <h3 className="font-bold text-lg text-slate-800">Edit Profile</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600 transition-colors text-xl font-bold">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  value={editForm.first_name}
                  onChange={(e) => setEditForm({...editForm, first_name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2E8B57]/20 focus:border-[#2E8B57] outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  value={editForm.last_name}
                  onChange={(e) => setEditForm({...editForm, last_name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2E8B57]/20 focus:border-[#2E8B57] outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  value={editForm.phone_number}
                  onChange={(e) => setEditForm({...editForm, phone_number: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2E8B57]/20 focus:border-[#2E8B57] outline-none transition-all"
                />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#2E8B57] text-white font-bold hover:bg-[#1D3B2A] transition-colors disabled:opacity-70 flex justify-center items-center"
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
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-[#FAFAF8]">
              <h3 className="font-bold text-lg text-slate-800">{editingAddressId ? 'Edit Address' : 'Add New Address'}</h3>
              <button onClick={() => setIsAddingAddress(false)} className="text-slate-400 hover:text-slate-600 transition-colors text-xl font-bold">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSaveAddress} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">House No.</label>
                  <input 
                    type="text" 
                    value={addressForm.house_number}
                    onChange={(e) => setAddressForm({...addressForm, house_number: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2E8B57]/20 focus:border-[#2E8B57] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Street</label>
                  <input 
                    type="text" 
                    value={addressForm.street_address}
                    onChange={(e) => setAddressForm({...addressForm, street_address: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2E8B57]/20 focus:border-[#2E8B57] outline-none transition-all"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">City</label>
                  <input 
                    type="text" 
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2E8B57]/20 focus:border-[#2E8B57] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">County</label>
                  <input 
                    type="text" 
                    value={addressForm.county}
                    onChange={(e) => setAddressForm({...addressForm, county: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2E8B57]/20 focus:border-[#2E8B57] outline-none transition-all"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Postcode</label>
                  <input 
                    type="text" 
                    value={addressForm.postcode}
                    onChange={(e) => setAddressForm({...addressForm, postcode: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2E8B57]/20 focus:border-[#2E8B57] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Country</label>
                  <input 
                    type="text" 
                    value={addressForm.country}
                    onChange={(e) => setAddressForm({...addressForm, country: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#2E8B57]/20 focus:border-[#2E8B57] outline-none transition-all"
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
                  className="w-4 h-4 text-[#2E8B57] rounded"
                />
                <label htmlFor="is_default_addr" className="text-sm font-bold text-slate-700 cursor-pointer">
                  Set as default address
                </label>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsAddingAddress(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSavingAddress}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#2E8B57] text-white font-bold hover:bg-[#1D3B2A] transition-colors disabled:opacity-70 flex justify-center items-center"
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
