import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FiPackage, FiTruck, FiCheckCircle, FiDownload, FiRefreshCw, FiMapPin, FiCreditCard } from 'react-icons/fi';
import AccountPageHeader from '../components/account/AccountPageHeader';
import { ROUTES } from '../utils/constants';

const dummyOrder = {
  id: 'ORD-2026-8924',
  date: '12 Jul 2026, 14:30',
  status: 'In Transit',
  total: '£45.90',
  items: [
    { id: 1, name: 'Premium Saffron (1g)', price: '£8.50', qty: 2, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100' },
    { id: 2, name: 'Organic Turmeric Powder (500g)', price: '£5.20', qty: 1, image: 'https://images.unsplash.com/photo-1626082895617-2c6b484a0d9c?w=100' },
    { id: 3, name: 'Basmati Rice (5kg)', price: '£18.99', qty: 1, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100' }
  ],
  subtotal: '£41.19',
  shipping: '£4.71',
  discount: '£0.00'
};

const OrderDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title={`Order #${id || dummyOrder.id}`} />

      <div className="container px-4 lg:px-8 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="w-full lg:flex-1 space-y-8">
            
            {/* Status Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Delivery Status</h3>
                  <p className="text-slate-500 text-sm">Estimated Delivery: <span className="font-bold text-[#FF8A00]">14 Jul 2026</span></p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border text-[#FF8A00] bg-orange-50 border-orange-100">
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  In Transit
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                <div className="space-y-8 relative z-10">
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-[#2E8B57] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <FiCheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Order Placed</h4>
                      <p className="text-slate-500 text-sm">12 Jul 2026, 14:30</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-[#2E8B57] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <FiPackage size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Packed</h4>
                      <p className="text-slate-500 text-sm">13 Jul 2026, 09:15</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-[#FF8A00] text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-[#FF8A00]/20 ring-4 ring-[#FF8A00]/20">
                      <FiTruck size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">In Transit</h4>
                      <p className="text-slate-500 text-sm">13 Jul 2026, 14:00 - Out for delivery facility.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start opacity-40 grayscale">
                    <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center flex-shrink-0">
                      <FiMapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Delivered</h4>
                      <p className="text-slate-500 text-sm">Pending</p>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* Ordered Products */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 bg-[#FAFAF8]">
                <h3 className="font-bold text-slate-800 text-lg">Ordered Products ({dummyOrder.items.length})</h3>
              </div>
              <div className="divide-y divide-slate-100 p-6">
                {dummyOrder.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="w-20 h-20 rounded-xl border border-slate-100 p-2 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 truncate mb-1">{item.name}</h4>
                      <p className="text-slate-500 text-sm font-medium">Qty: {item.qty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-96 flex-shrink-0 space-y-6">
            
            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 space-y-3"
            >
              <button className="w-full bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-[#2E8B57]/20">
                <FiRefreshCw /> Buy Again
              </button>
              <button className="w-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <FiDownload /> Download Invoice
              </button>
              <button className="w-full bg-slate-50 hover:bg-rose-50 text-rose-600 hover:text-rose-700 font-bold py-3.5 rounded-xl transition-colors mt-4">
                Cancel Order
              </button>
            </motion.div>

            {/* Summary & Addresses */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6"
            >
              <h3 className="font-bold text-slate-800 text-lg mb-6 border-b pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600 font-medium text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800">{dummyOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium text-sm">
                  <span>Shipping</span>
                  <span className="font-bold text-slate-800">{dummyOrder.shipping}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium text-sm">
                  <span>Discount</span>
                  <span className="font-bold text-emerald-600">{dummyOrder.discount}</span>
                </div>
                <div className="h-px bg-slate-100 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">Total</span>
                  <span className="font-black text-xl text-[#2E8B57]">{dummyOrder.total}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-[#FAFAF8] rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-sm">
                    <FiMapPin className="text-[#FF8A00]" /> Shipping Address
                  </div>
                  <p className="text-slate-600 text-sm">Deepika Venkatesan<br/>123 Grocery Lane<br/>Wembley, London, HA0 1AB</p>
                </div>

                <div className="p-4 bg-[#FAFAF8] rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-sm">
                    <FiCreditCard className="text-blue-500" /> Payment Method
                  </div>
                  <p className="text-slate-600 text-sm">Visa ending in ****4242<br/>Paid on 12 Jul 2026</p>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
