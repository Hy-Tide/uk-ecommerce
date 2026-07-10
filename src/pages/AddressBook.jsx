import React from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin, FiPhone } from 'react-icons/fi';

const AddressBook = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-dark">Saved Addresses</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your delivery addresses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Add New Card */}
        <button className="h-full min-h-[240px] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-primary-50 hover:border-primary/50 hover:text-primary transition-all flex flex-col items-center justify-center gap-4 text-slate-500 cursor-pointer group shadow-sm hover:shadow-md">
          <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
            <FiPlus className="w-6 h-6" />
          </div>
          <span className="font-bold">Add New Address</span>
        </button>

        {/* Address Card 1 */}
        <div className="rounded-2xl border-2 border-primary bg-primary-50/30 p-6 relative shadow-sm flex flex-col h-full min-h-[240px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-primary text-white text-[10px] uppercase font-bold px-2 py-1 rounded">HOME</span>
              <span className="bg-slate-800 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">DEFAULT</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 transition-colors bg-white rounded-lg border border-slate-100 shadow-sm" title="Edit">
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors bg-white rounded-lg border border-slate-100 shadow-sm" title="Delete">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-grow">
            <h4 className="font-bold text-dark text-lg mb-3">John Doe</h4>
            <div className="flex items-start gap-2 text-slate-600 text-sm mb-2">
              <FiMapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="leading-relaxed">
                123 Baker Street<br />
                London, W1U 8ED<br />
                United Kingdom
              </p>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <FiPhone className="w-4 h-4 shrink-0" />
              <p className="font-medium">
                +44 20 7946 0958
              </p>
            </div>
          </div>
        </div>

        {/* Address Card 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 relative shadow-sm hover:border-primary/50 transition-all flex flex-col h-full min-h-[240px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] uppercase font-bold px-2 py-1 rounded">WORK</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 transition-colors bg-white rounded-lg border border-slate-100 shadow-sm" title="Edit">
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors bg-white rounded-lg border border-slate-100 shadow-sm" title="Delete">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-grow">
            <h4 className="font-bold text-dark text-lg mb-3">John Doe</h4>
            <div className="flex items-start gap-2 text-slate-600 text-sm mb-2">
              <FiMapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="leading-relaxed">
                Level 5, One New Change<br />
                London, EC4M 9AF<br />
                United Kingdom
              </p>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm mb-4">
              <FiPhone className="w-4 h-4 shrink-0" />
              <p className="font-medium">
                +44 20 7946 1122
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 mt-auto">
            <button className="text-primary text-sm font-bold hover:underline">
              Set as Default
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AddressBook;
