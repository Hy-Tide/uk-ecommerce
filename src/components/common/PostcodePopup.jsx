import React, { useState } from 'react';
import { usePostcode } from '../../context/PostcodeContext';

const PostcodePopup = () => {
  const { isPopupOpen, validatePostcode, isLoading, error, setError } = usePostcode();
  const [inputValue, setInputValue] = useState('');

  if (!isPopupOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError('Please enter a postcode.');
      return;
    }
    await validatePostcode(inputValue);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-[fadeIn_0.3s_ease-out]">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#FFF3EB] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#FF6B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-black text-[#0C3823] tracking-tight mb-2">
            Check Availability
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Enter your postcode to see if we deliver to your area
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. SW1A 1AA"
              className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-[#0C3823]/20 font-medium text-slate-700 uppercase`}
              disabled={isLoading}
            />
            {error && (
              <p className="text-red-500 text-xs font-semibold mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0C3823] hover:bg-[#0a2f1d] text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_14px_rgba(12,56,35,0.2)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostcodePopup;
