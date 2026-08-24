import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiMapPin, FiRefreshCw, FiEye, FiChevronRight, FiUser, FiPackage } from 'react-icons/fi';
import { getData, postData } from '../services/webservices';
import { useToast } from '../context/ToastContext';
import { ROUTES } from '../utils/constants';
import OrderSkeleton from '../components/skeletons/OrderSkeleton';

const getStatusColor = (status) => {
  const s = (status || '').toLowerCase();
  if (s === 'delivered' || s === 'completed') return 'text-[#0C3823] bg-[#EBF5ED] border-[#0C3823]/20';
  if (s === 'in transit' || s === 'out for delivery' || s === 'processing') return 'text-[#FF6B00] bg-orange-50 border-orange-100';
  if (s === 'cancelled') return 'text-rose-600 bg-rose-50 border-rose-100';
  return 'text-blue-600 bg-blue-50 border-blue-100';
};

const MyOrders = () => {
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reorderingId, setReorderingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const token = sessionStorage.getItem('sessionToken');
    if (!token || token === 'demo_token') {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await getData('website/orders');
      if (res?.success && Array.isArray(res?.data?.orders)) {
        setOrders(res.data.orders);
      } else if (Array.isArray(res?.data)) {
        setOrders(res.data);
      }
    } catch (err) {
      console.error(err);
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
      const token = sessionStorage.getItem('sessionToken');
      if (token && token !== 'demo_token') {
        await postData(`website/orders/${orderId}/reorder`, {});
      }
      showToast('Items added to cart for reorder', 'success');
      navigate('/cart');
    } catch (err) {
      showToast('Error during reorder', 'error');
    } finally {
      setReorderingId(null);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredOrders = orders.filter(o =>
    o.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.items?.some(i => i.name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="bg-[#FAFBF9] min-h-screen pb-20">

      {/* Hero Header Cover */}
      <div className="bg-gradient-to-r from-[#072414] via-[#0C3823] to-[#165636] relative pt-6 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.15),transparent_50%)]"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>

        <div className="container max-w-5xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-emerald-200/80 mb-2">
            <Link to={ROUTES.HOME} className="hover:text-white transition-colors flex items-center gap-1">
              <FiUser size={13} /> Home
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <Link to={ROUTES.PROFILE} className="hover:text-white transition-colors">
              My Account
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <span className="text-white font-bold">My Orders</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Order History & Tracking</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium mt-1">View past orders, track live shipments, and easily reorder</p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto -mt-12 sm:-mt-14 relative z-10">

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 flex-shrink-0">
            <input
              type="text"
              placeholder="Search by order ID or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFBF9] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#0C3823] focus:ring-2 focus:ring-[#0C3823]/15 transition-all text-xs font-semibold text-slate-800"
            />
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 bg-[#FAFBF9] hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors w-full md:w-auto justify-center">
              <FiFilter size={14} /> Filter
            </button>
            <select className="bg-[#FAFBF9] border border-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl outline-none hover:bg-slate-100 transition-colors cursor-pointer w-full md:w-auto">
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
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <OrderSkeleton key={i} />
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-bold text-sm bg-white rounded-3xl p-8 border border-slate-100 shadow-xs">
              No matching orders found.
            </div>
          ) : (
            currentOrders.map((order, index) => {
              const orderId = order._id;
              const status = order.orderStatus || 'Pending';
              const statusColor = getStatusColor(status);
              const total = `£${(order.totalAmount || 0).toFixed(2)}`;
              const itemsCount = Array.isArray(order.items) ? order.items.reduce((acc, item) => acc + (item.quantity || 1), 0) : 0;
              const date = new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
              const shipTo = order.shippingAddress ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}` : 'Customer';

              return (
                <motion.div
                  key={orderId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  {/* Order Header */}
                  <div className="bg-[#FAFBF9] px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-6 md:gap-10 text-xs">
                      <div>
                        <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">Order Placed</p>
                        <p className="font-extrabold text-slate-900">{date}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">Total Amount</p>
                        <p className="font-extrabold text-slate-900">{total}</p>
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">Ship To</p>
                        <p className="font-extrabold text-[#0C3823]">{shipTo}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">Order ID</p>
                      <p className="font-black text-slate-900">#{order.orderNumber}</p>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-center justify-between">
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 text-center sm:text-left w-full md:w-auto">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#0C3823] flex items-center justify-center shrink-0 border border-emerald-100/60">
                        <FiPackage size={28} />
                      </div>
                      <div>
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border w-fit mb-2 mx-auto sm:mx-0 ${statusColor}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {status}
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-base mb-0.5">{order.items?.[0]?.name || 'Grocery Basket'}</h4>
                        <p className="text-xs text-slate-500 font-semibold">{itemsCount} Items • {order.deliverySlot || 'Standard Delivery'}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-44 flex-shrink-0">
                      <Link
                        to={`/track-order?id=${order._id}`}
                        className="w-full bg-[#0C3823] hover:bg-[#FF6B00] text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-xs text-center"
                      >
                        <FiMapPin size={14} /> Track Order
                      </Link>
                      <button
                        onClick={() => handleReorder(orderId)}
                        disabled={reorderingId === orderId}
                        className="w-full bg-[#FAFBF9] border border-slate-200 hover:border-[#0C3823] text-slate-700 hover:text-[#0C3823] font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                      >
                        <FiRefreshCw size={13} className={reorderingId === orderId ? 'animate-spin' : ''} /> {reorderingId === orderId ? 'Reordering...' : 'Buy Again'}
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {!loading && filteredOrders.length > ordersPerPage && (
          <div className="flex items-center justify-center gap-2 mt-8 mb-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-colors ${currentPage === idx + 1
                    ? 'bg-[#0C3823] text-white shadow-md shadow-[#0C3823]/20'
                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
                  }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrders;

