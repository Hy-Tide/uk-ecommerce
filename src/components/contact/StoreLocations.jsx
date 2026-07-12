import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiTruck, FiCoffee, FiNavigation } from 'react-icons/fi';
import { FaCarSide } from 'react-icons/fa';

const StoreLocations = () => {
  return (
    <section id="locations" className="py-20 bg-white">
      <div className="container px-4">
        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">Our Locations</h2>
          <p className="text-slate-500 text-lg max-w-2xl">
            Visit our main flagship store and warehouse in London. We offer click-and-collect and in-store shopping.
          </p>
        </div>

        <div className="bg-[#fcfbf9] rounded-[32px] border border-slate-100 overflow-hidden flex flex-col lg:flex-row shadow-sm">
          
          {/* Map Placeholder */}
          <div className="w-full lg:w-1/2 min-h-[400px] relative bg-slate-200">
            {/* Embedded Google Maps Placeholder */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.7281066703!2d-0.2416815370618454!3d51.52877184087617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '100%', position: 'absolute', inset: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="UK Groceries Location"
            ></iframe>
          </div>

          {/* Store Details */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <h3 className="text-3xl font-black text-slate-800 mb-2">London Flagship Store</h3>
            <p className="text-[#2E8B57] font-bold text-lg mb-8">Central Warehouse & Fulfillment</p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#FF8A00] flex-shrink-0">
                  <FiMapPin size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Address</h4>
                  <p className="text-slate-500 font-medium">UK Groceries<br />123 Grocery Lane, Wembley<br />London, HA0 1AB, United Kingdom</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <FiTruck size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Delivery Coverage</h4>
                  <p className="text-slate-500 font-medium">Nationwide UK Delivery (Next Day)<br />Same-Day delivery within M25</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#2E8B57] flex-shrink-0">
                  <FaCarSide size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Parking Availability</h4>
                  <p className="text-slate-500 font-medium">Free customer parking available on-site for up to 2 hours.</p>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-base px-8 py-4 rounded-[16px] transition-colors w-full md:w-auto"
            >
              Get Directions <FiNavigation />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoreLocations;
