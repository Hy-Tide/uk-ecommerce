import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiEye, 
  FiDownload, 
  FiRefreshCw, 
  FiMapPin, 
  FiMessageCircle,
  FiSearch,
  FiFilter
} from 'react-icons/fi';
import { ROUTES } from '../utils/constants';

const orders = [
  {
    id: 'UK-294182',
    date: 'Oct 12, 2024',
    total: '£45.99',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    estimatedDelivery: 'Delivered on Oct 14',
    statusColor: 'bg-green-100 text-green-700',
    items: 3
  },
  {
    id: 'UK-294005',
    date: 'Sep 28, 2024',
    total: '£12.50',
    paymentStatus: 'Paid',
    deliveryStatus: 'Processing',
    estimatedDelivery: 'Est: Oct 02, 2024',
    statusColor: 'bg-blue-100 text-blue-700',
    items: 1
  },
  {
    id: 'UK-293881',
    date: 'Sep 15, 2024',
    total: '£89.99',
    paymentStatus: 'Refunded',
    deliveryStatus: 'Cancelled',
    estimatedDelivery: '-',
    statusColor: 'bg-red-100 text-red-700',
    items: 5
  },
  {
    id: 'UK-293772',
    date: 'Sep 01, 2024',
    total: '£105.20',
    paymentStatus: 'Paid',
    deliveryStatus: 'Shipped',
    estimatedDelivery: 'Est: Sep 05, 2024',
    statusColor: 'bg-purple-100 text-purple-700',
    items: 8
  }
];

const MyOrders = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">My Orders</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track your recent orders.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by Order ID..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full sm:w-64"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors shrink-0">
            <FiFilter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-4 px-6 font-bold text-slate-700 text-sm rounded-tl-2xl">Order ID & Date</th>
                <th className="py-4 px-6 font-bold text-slate-700 text-sm">Total Amount</th>
                <th className="py-4 px-6 font-bold text-slate-700 text-sm">Payment Status</th>
                <th className="py-4 px-6 font-bold text-slate-700 text-sm">Delivery Status</th>
                <th className="py-4 px-6 font-bold text-slate-700 text-sm">Estimated Delivery</th>
                <th className="py-4 px-6 font-bold text-slate-700 text-sm text-right rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6">
                    <span className="font-bold text-dark">{order.id}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-slate-500">{order.date}</p>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <p className="text-xs text-slate-500">{order.items} Items</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-dark">{order.total}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.statusColor}`}>
                      {order.deliveryStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {order.estimatedDelivery}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={ROUTES.ORDERS}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors group-hover:text-primary"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </Link>
                      <Link 
                        to={ROUTES.TRACK_ORDER}
                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Track Order"
                      >
                        <FiMapPin className="w-4 h-4" />
                      </Link>
                      <button 
                        className="p-2 text-slate-400 hover:text-dark hover:bg-slate-200 rounded-lg transition-colors"
                        title="Download Invoice"
                      >
                        <FiDownload className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Reorder"
                      >
                        <FiRefreshCw className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                        title="Need Help?"
                      >
                        <FiMessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-white">
          <p className="text-sm text-slate-500">Showing 1 to 4 of 12 orders</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 font-bold hover:bg-slate-100 transition-colors border border-slate-200">&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-md shadow-primary/20">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-500 font-bold hover:bg-slate-50 border border-slate-200 transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-500 font-bold hover:bg-slate-50 border border-slate-200 transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-slate-500 font-bold hover:bg-slate-50 border border-slate-200 transition-colors">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
