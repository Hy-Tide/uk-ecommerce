import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiMapPin, FiEdit2, FiTrash2, FiHome, FiBriefcase, FiPhone } from 'react-icons/fi';
import AccountPageHeader from '../components/account/AccountPageHeader';

const dummyAddresses = [
  {
    id: 1,
    type: 'Home',
    name: 'Deepika Venkatesan',
    address: '123 Grocery Lane, Apartment 4B',
    city: 'Wembley, London',
    zip: 'HA0 1AB',
    phone: '+44 7700 900000',
    isDefault: true
  },
  {
    id: 2,
    type: 'Office',
    name: 'Deepika Venkatesan',
    address: '45 Tech Park, Building A, Floor 3',
    city: 'Central London',
    zip: 'EC1A 1BB',
    phone: '+44 7700 900001',
    isDefault: false
  }
];

const AddressBook = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title="Saved Addresses" />

      <div className="container px-4 lg:px-8 max-w-5xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Add New Address Card */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full min-h-[260px] border-2 border-dashed border-slate-200 hover:border-[#2E8B57] rounded-[24px] flex flex-col items-center justify-center text-slate-500 hover:text-[#2E8B57] hover:bg-emerald-50/50 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-slate-50 group-hover:bg-white flex items-center justify-center mb-4 shadow-sm transition-all group-hover:scale-110">
              <FiPlus size={24} />
            </div>
            <span className="font-bold text-lg">Add New Address</span>
          </motion.button>

          {/* Address Cards */}
          {dummyAddresses.map((addr, index) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (index + 1) * 0.1 }}
              className={`relative bg-white rounded-[24px] border ${addr.isDefault ? 'border-[#2E8B57] shadow-md shadow-[#2E8B57]/10' : 'border-slate-100 shadow-sm'} p-6 flex flex-col hover:shadow-md transition-shadow`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-700 text-xs font-bold uppercase tracking-wider">
                  {addr.type === 'Home' ? <FiHome className="text-blue-500" /> : <FiBriefcase className="text-[#FF8A00]" />}
                  {addr.type}
                </div>
                {addr.isDefault && (
                  <span className="text-[10px] font-black text-[#2E8B57] bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-widest border border-emerald-100">
                    Default
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 space-y-1 mb-6">
                <h4 className="font-bold text-slate-800 text-lg mb-2">{addr.name}</h4>
                <p className="text-slate-600 font-medium">{addr.address}</p>
                <p className="text-slate-600 font-medium">{addr.city}, {addr.zip}</p>
                <p className="text-slate-500 font-medium text-sm mt-3 pt-3 border-t border-slate-50 flex items-center gap-2">
                  <FiPhone /> {addr.phone}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <button className="flex-1 bg-[#FAFAF8] hover:bg-[#2E8B57] text-slate-600 hover:text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm border border-slate-100 hover:border-[#2E8B57]">
                  <FiEdit2 /> Edit
                </button>
                <button className="flex-1 bg-[#FAFAF8] hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm border border-slate-100">
                  <FiTrash2 /> Delete
                </button>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AddressBook;
