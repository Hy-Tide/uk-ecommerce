import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiPlus, 
  FiMapPin, 
  FiEdit2, 
  FiTrash2, 
  FiHome, 
  FiBriefcase, 
  FiPhone, 
  FiCheck,
  FiChevronRight,
  FiUser
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { getData, putData, postData, deleteData } from '../services/webservices';
import { useToast } from '../context/ToastContext';
import { ROUTES } from '../utils/constants';

const AddressBook = () => {
  const { showToast } = useToast();
  const { user } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [addressForm, setAddressForm] = useState({
    house_number: '',
    street_address: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
    is_default: false
  });

  const fetchAddresses = async () => {
    const token = sessionStorage.getItem('sessionToken') || localStorage.getItem('token');
    if (!token || token === 'demo_token') {
      setAddresses([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await getData('website/users/addresses', {}, token);
      let fetchedList = [];

      if (response && response.success !== false) {
        if (Array.isArray(response.data)) {
          fetchedList = response.data;
        } else if (Array.isArray(response.data?.addresses)) {
          fetchedList = response.data.addresses;
        } else if (Array.isArray(response.data?.data)) {
          fetchedList = response.data.data;
        } else if (Array.isArray(response.addresses)) {
          fetchedList = response.addresses;
        }
      }

      setAddresses(fetchedList);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAddresses();
  }, []);

  const handleOpenAddModal = () => {
    setAddressForm({
      house_number: '',
      street_address: '',
      city: '',
      county: '',
      postcode: '',
      country: 'United Kingdom',
      is_default: addresses.length === 0
    });
    setEditingAddressId(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (addr) => {
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
    setIsModalOpen(true);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const token = sessionStorage.getItem('sessionToken');
    let response = null;

    if (token && token !== 'demo_token') {
      if (editingAddressId) {
        response = await putData(`website/users/addresses/${editingAddressId}`, addressForm, token);
      } else {
        response = await postData('website/users/addresses', addressForm, token);
      }
    }

    setIsSaving(false);

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
    showToast(targetId ? 'Address updated successfully!' : 'Address added successfully!', 'success');
    setIsModalOpen(false);
    setEditingAddressId(null);
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    const token = sessionStorage.getItem('sessionToken');
    if (token && token !== 'demo_token') {
      await deleteData(`website/users/addresses/${id}`, token);
    }

    const updatedList = addresses.filter(a => (a._id || a.id) !== id);
    setAddresses(updatedList);
    showToast('Address deleted successfully!', 'success');
  };

  const handleSetDefault = (id) => {
    const updatedList = addresses.map(a => ({
      ...a,
      is_default: (a._id === id || a.id === id)
    }));
    setAddresses(updatedList);
    showToast('Default address updated!', 'success');
  };

  return (
    <div className="bg-[#FAFBF9] min-h-screen pb-20">

      {/* Hero Header Cover */}
      <div className="bg-gradient-to-r from-[#072414] via-[#0C3823] to-[#165636] relative pt-6 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.15),transparent_50%)]"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>

        <div className="container max-w-5xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-emerald-200/80 mb-2">
            <Link to={ROUTES.HOME} className="hover:text-white transition-colors flex items-center gap-1">
              <FiUser size={13} /> Home
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <Link to={ROUTES.PROFILE} className="hover:text-white transition-colors">
              My Account
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <span className="text-white font-bold">Saved Addresses</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Saved Delivery Addresses</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium mt-1">Manage your home, office, and delivery locations</p>
        </div>
      </div>

      {/* Addresses Grid Container */}
      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto -mt-12 sm:-mt-14 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Add New Address Card */}
          <motion.button
            onClick={handleOpenAddModal}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full min-h-[240px] bg-white border-2 border-dashed border-slate-200 hover:border-[#0C3823] rounded-3xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-[#0C3823] hover:bg-[#EBF5ED]/40 transition-all duration-200 group shadow-xs hover:shadow-md cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0C3823] group-hover:bg-[#0C3823] group-hover:text-white flex items-center justify-center mb-3 shadow-xs transition-all duration-200 group-hover:scale-110">
              <FiPlus size={24} />
            </div>
            <span className="font-extrabold text-slate-800 group-hover:text-[#0C3823] text-base">Add New Address</span>
            <span className="text-xs text-slate-400 font-medium mt-1">Create a new delivery location</span>
          </motion.button>

          {/* Address Cards */}
          {addresses.map((addr, index) => {
            const addrId = addr._id || addr.id;
            return (
              <motion.div
                key={addrId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index + 1) * 0.08 }}
                className={`relative bg-white rounded-3xl border transition-all duration-200 p-6 flex flex-col justify-between hover:shadow-md ${
                  addr.is_default ? 'border-[#0C3823]/40 shadow-sm ring-1 ring-[#0C3823]/20 bg-gradient-to-b from-[#F4F9F5] to-white' : 'border-slate-100 shadow-xs'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-xl text-slate-700 text-[11px] font-extrabold uppercase tracking-wider">
                      {index === 0 ? <FiHome className="text-blue-500" /> : <FiBriefcase className="text-[#FF6B00]" />}
                      {addr.type || (index === 0 ? 'Home' : 'Office')}
                    </div>

                    {addr.is_default ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#0C3823] bg-white px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#0C3823]/20 shadow-2xs">
                        <FiCheck size={11} /> Default
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefault(addrId)}
                        className="text-[11px] font-bold text-slate-400 hover:text-[#0C3823] transition-colors"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-1 mb-6">
                    <h4 className="font-extrabold text-slate-900 text-base mb-1">
                      {addr.house_number} {addr.street_address}
                    </h4>
                    <p className="text-slate-600 font-medium text-xs leading-relaxed">
                      {addr.city}, {addr.county || ''} {addr.postcode}
                    </p>
                    <p className="text-slate-500 font-semibold text-xs">{addr.country || 'United Kingdom'}</p>
                    {addr.phone && (
                      <p className="text-slate-400 font-medium text-xs mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                        <FiPhone size={13} /> {addr.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleEditClick(addr)}
                    className="flex-1 bg-[#FAFBF9] hover:bg-[#0C3823] text-slate-700 hover:text-white font-bold py-2 px-3 rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 text-xs border border-slate-200"
                  >
                    <FiEdit2 size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(addrId)}
                    className="flex-1 bg-[#FAFBF9] hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold py-2 px-3 rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 text-xs border border-slate-200"
                  >
                    <FiTrash2 size={13} /> Delete
                  </button>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* Add / Edit Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto py-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 my-auto"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-[#FAFBF9]">
              <h3 className="font-extrabold text-base text-slate-900">{editingAddressId ? 'Edit Address' : 'Add New Address'}</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
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
                  id="is_default_addr_book"
                  checked={addressForm.is_default}
                  onChange={(e) => setAddressForm({...addressForm, is_default: e.target.checked})}
                  className="w-4 h-4 text-[#0C3823] rounded focus:ring-[#0C3823]"
                />
                <label htmlFor="is_default_addr_book" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Set as default address
                </label>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0C3823] hover:bg-[#FF6B00] text-white font-bold text-xs transition-colors disabled:opacity-70 flex justify-center items-center shadow-md shadow-[#0C3823]/20"
                >
                  {isSaving ? 'Saving...' : (editingAddressId ? 'Update Address' : 'Add Address')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default AddressBook;

