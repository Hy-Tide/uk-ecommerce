import React, { useState, useEffect } from 'react';
import { FiTruck, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getData } from '../../services/webservices';

const TopBar = () => {
  const [announcement, setAnnouncement] = useState({
    freeDeliveryText: '',
    offerText: '',
    timingText: '',
    whatsappText: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getData('website/settings');
        if (response?.success && response?.data?.announcement) {
          const { freeDeliveryText, offerText, timingText, whatsappText } = response.data.announcement;
          setAnnouncement(prev => ({
            freeDeliveryText: freeDeliveryText || prev.freeDeliveryText,
            offerText: offerText || prev.offerText,
            timingText: timingText || prev.timingText,
            whatsappText: whatsappText || prev.whatsappText
          }));
        }
      } catch (err) {
        console.error('Failed to load settings', err);
      }
    };
    fetchSettings();
  }, []);

  const cleanWhatsappNumber = announcement.whatsappText.replace(/[^0-9+]/g, '') || '+447700900000';

  return (
    <div className="bg-[#111827] text-slate-300 text-[11px] font-medium py-2 hidden lg:block border-b border-white/10">
      <div className="container flex justify-between items-center">

        {/* Left */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <FiTruck className="text-[#eb5b27]" size={14} />
            <span>{announcement.freeDeliveryText}</span>
          </div>
          {announcement.offerText && (
            <>
              <div className="w-[1px] h-3 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold bg-gradient-to-r from-[#FF6B00] to-[#E05E00] px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 text-[10px] tracking-wide uppercase shadow-[#FF6B00]/40 animate-pulse">
                  ✨ {announcement.offerText}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Center/Right */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FiClock className="text-slate-400" size={13} />
            <span>{announcement.timingText}</span>
          </div>
          <a href={`https://wa.me/${cleanWhatsappNumber.replace('+', '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-[#124827]/80 text-green-300 hover:text-white transition-colors px-3 py-1 rounded-full border border-green-700/50">
            <div className="w-1.5 h-1.5 rounded-full bg-[#eb5b27] animate-pulse"></div>
            <FaWhatsapp size={12} />
            <span>{announcement.whatsappText}</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopBar;
