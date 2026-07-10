import React, { useState } from 'react';
import { FiCamera, FiEdit2, FiSave, FiX } from 'react-icons/fi';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Profile Information</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your personal details.</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary font-bold rounded-xl hover:bg-primary-100 transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              <FiX className="w-4 h-4" />
              Cancel
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
            >
              <FiSave className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
        <form className="max-w-2xl">
          <div className="mb-10 flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary-50 text-primary flex items-center justify-center text-3xl font-bold overflow-hidden border-4 border-white shadow-sm ring-1 ring-slate-100">
                <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover" />
              </div>
              {isEditing && (
                <button type="button" className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-dark text-white flex items-center justify-center border-2 border-white hover:bg-primary transition-colors cursor-pointer shadow-sm">
                  <FiCamera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg text-dark">Deepika</h3>
              <p className="text-sm text-slate-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
              <input 
                type="text" 
                defaultValue="Deepika"
                disabled={!isEditing}
                className={`w-full px-5 py-3 rounded-xl border outline-none transition-colors text-sm ${
                  isEditing 
                    ? 'border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary bg-white' 
                    : 'border-transparent bg-slate-50 text-slate-700 font-medium'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
              <input 
                type="text" 
                defaultValue="V"
                disabled={!isEditing}
                className={`w-full px-5 py-3 rounded-xl border outline-none transition-colors text-sm ${
                  isEditing 
                    ? 'border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary bg-white' 
                    : 'border-transparent bg-slate-50 text-slate-700 font-medium'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                defaultValue="deepika@example.com"
                disabled={!isEditing}
                className={`w-full px-5 py-3 rounded-xl border outline-none transition-colors text-sm ${
                  isEditing 
                    ? 'border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary bg-white' 
                    : 'border-transparent bg-slate-50 text-slate-700 font-medium'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                defaultValue="+44 20 7946 0958"
                disabled={!isEditing}
                className={`w-full px-5 py-3 rounded-xl border outline-none transition-colors text-sm ${
                  isEditing 
                    ? 'border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary bg-white' 
                    : 'border-transparent bg-slate-50 text-slate-700 font-medium'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Date of Birth</label>
              <input 
                type="date" 
                defaultValue="1990-01-01"
                disabled={!isEditing}
                className={`w-full px-5 py-3 rounded-xl border outline-none transition-colors text-sm ${
                  isEditing 
                    ? 'border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary bg-white' 
                    : 'border-transparent bg-slate-50 text-slate-700 font-medium'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
              <select
                disabled={!isEditing}
                className={`w-full px-5 py-3 rounded-xl border outline-none transition-colors text-sm appearance-none ${
                  isEditing 
                    ? 'border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary bg-white' 
                    : 'border-transparent bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
