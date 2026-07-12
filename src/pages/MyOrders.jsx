import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiMapPin, FiRefreshCw, FiEye } from 'react-icons/fi';
import AccountPageHeader from '../components/account/AccountPageHeader';

// Dummy Order Data
const dummyOrders = [
  {
    id: 'ORD-2026-8924',
    date: '12 Jul 2026',
    status: 'Delivered',
    statusColor: 'text-[#2E8B57] bg-emerald-50 border-emerald-100',
    total: '£45.90',
    items: 4,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'ORD-2026-8901',
    date: '02 Jul 2026',
    status: 'In Transit',
    statusColor: 'text-[#FF8A00] bg-orange-50 border-orange-100',
    total: '£112.50',
    items: 12,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'ORD-2026-8755',
    date: '15 Jun 2026',
    status: 'Cancelled',
    statusColor: 'text-rose-600 bg-rose-50 border-rose-100',
    total: '£22.00',
    items: 2,
    image: 'https://images.unsplash.com/photo-1626082895617-2c6b484a0d9c?auto=format&fit=crop&q=80&w=200'
  }
];

const MyOrders = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title="My Orders" />

      <div className="container px-4 lg:px-8 max-w-5xl mx-auto">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:w-96 flex-shrink-0">
            <input 
              type="text" 
              placeholder="Search by order ID or product..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#2E8B57] focus:ring-2 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-700"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl transition-colors w-full md:w-auto justify-center">
              <FiFilter /> Filter
            </button>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 font-bold px-5 py-3 rounded-xl outline-none hover:bg-slate-100 transition-colors cursor-pointer w-full md:w-auto">
              <option value="last30">Last 30 days</option>
              <option value="last3months">Past 3 months</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>

        {/* Order Cards */}
        <div className="space-y-6">
          {dummyOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="bg-[#FAFAF8] px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6 md:gap-12 text-sm">
                  <div>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Order Placed</p>
                    <p className="font-bold text-slate-800">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Total Amount</p>
                    <p className="font-bold text-slate-800">{order.total}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Ship To</p>
                    <p className="font-bold text-[#2E8B57] hover:underline cursor-pointer">Deepika Venkatesan</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Order ID</p>
                  <p className="font-bold text-slate-800">#{order.id}</p>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start justify-between">
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left w-full md:w-auto">
                  <div className="w-24 h-24 bg-white border border-slate-100 rounded-xl p-2 flex-shrink-0">
                    <img src={order.image} alt="Product" className="w-full h-full object-contain rounded-lg" />
                  </div>
                  <div className="flex flex-col justify-center h-full pt-2">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border w-fit mb-3 mx-auto sm:mx-0 ${order.statusColor}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {order.status}
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">Premium Indian Groceries</h4>
                    <p className="text-slate-500 font-medium text-sm">{order.items} Items • Standard Delivery</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-48 flex-shrink-0">
                  <Link 
                    to={`/orders/${order.id}`}
                    className="w-full bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-[#2E8B57]/20"
                  >
                    <FiEye /> View Details
                  </Link>
                  {order.status !== 'Cancelled' && (
                    <button className="w-full bg-white border border-slate-200 hover:border-[#2E8B57] text-slate-700 hover:text-[#2E8B57] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                      <FiRefreshCw /> Buy Again
                    </button>
                  )}
                  {order.status === 'In Transit' && (
                    <button className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                      <FiMapPin /> Track Order
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MyOrders;
