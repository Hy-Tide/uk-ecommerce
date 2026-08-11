import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiMapPin, FiRefreshCw, FiEye } from 'react-icons/fi';
import AccountPageHeader from '../components/account/AccountPageHeader';
import { getData, postData, showSnackbar } from '../services/webservices';

const getStatusColor = (status) => {
  const s = (status || '').toLowerCase();
  if (s === 'delivered' || s === 'completed') return 'text-[#2E8B57] bg-emerald-50 border-emerald-100';
  if (s === 'in transit' || s === 'processing') return 'text-[#FF8A00] bg-orange-50 border-orange-100';
  if (s === 'cancelled') return 'text-rose-600 bg-rose-50 border-rose-100';
  return 'text-blue-600 bg-blue-50 border-blue-100'; // Pending / Default
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reorderingId, setReorderingId] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getData('website/orders');
      if (res?.success && res?.data?.orders) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrders();
  }, []);

  const handleReorder = async (orderId) => {
    setReorderingId(orderId);
    try {
      const res = await postData(`website/orders/${orderId}/reorder`, {});
      if (res?.success) {
        showSnackbar('Items added to cart for reorder', 'success');
        navigate('/cart');
      } else {
        showSnackbar(res?.error || 'Failed to reorder', 'error');
      }
    } catch (err) {
      showSnackbar('Error during reorder', 'error');
    } finally {
      setReorderingId(null);
    }
  };

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
          {loading ? (
            <div className="text-center py-10 text-slate-500 font-medium">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10 text-slate-500 font-medium">No orders found.</div>
          ) : (
            orders.map((order, index) => {
              const orderId = order._id;
              const status = order.orderStatus || 'Pending';
              const statusColor = getStatusColor(status);
              const total = `£${(order.totalAmount || 0).toFixed(2)}`;
              const itemsCount = Array.isArray(order.items) ? order.items.reduce((acc, item) => acc + item.quantity, 0) : 0;
              const date = new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
              // Assuming populated product image, else fallback
              const image = order.items?.[0]?.product?.images?.[0] || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=200';
              const shipTo = order.shippingAddress ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}` : 'N/A';

              return (
                <motion.div
                  key={orderId}
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
                        <p className="font-bold text-slate-800">{date}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Total Amount</p>
                        <p className="font-bold text-slate-800">{total}</p>
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Ship To</p>
                        <p className="font-bold text-[#2E8B57] hover:underline cursor-pointer">{shipTo}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-1">Order ID</p>
                      <p className="font-bold text-slate-800">#{order.orderNumber}</p>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start justify-between">
                    
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left w-full md:w-auto">
                      <div className="w-24 h-24 bg-white border border-slate-100 rounded-xl p-2 flex-shrink-0">
                        <img src={image} alt="Product" className="w-full h-full object-contain rounded-lg" />
                      </div>
                      <div className="flex flex-col justify-center h-full pt-2">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border w-fit mb-3 mx-auto sm:mx-0 ${statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {status}
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg mb-1">{order.items?.[0]?.name || 'Products'}</h4>
                        <p className="text-slate-500 font-medium text-sm">{itemsCount} Items • {order.deliverySlot || 'Standard Delivery'}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full md:w-48 flex-shrink-0">
                      <Link 
                        to={`/orders/${orderId}`}
                        className="w-full bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-[#2E8B57]/20"
                      >
                        <FiEye /> View Details
                      </Link>
                      {status.toLowerCase() !== 'cancelled' && (
                        <button 
                          onClick={() => handleReorder(orderId)}
                          disabled={reorderingId === orderId}
                          className="w-full bg-white border border-slate-200 hover:border-[#2E8B57] text-slate-700 hover:text-[#2E8B57] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                        >
                          <FiRefreshCw className={reorderingId === orderId ? 'animate-spin' : ''} /> {reorderingId === orderId ? 'Reordering...' : 'Buy Again'}
                        </button>
                      )}
                      {status.toLowerCase() === 'in transit' && (
                        <button className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                          <FiMapPin /> Track Order
                        </button>
                      )}
                    </div>

                  </div>
                </motion.div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

export default MyOrders;
