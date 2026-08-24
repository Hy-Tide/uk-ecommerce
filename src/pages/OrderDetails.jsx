import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiPackage, FiTruck, FiCheckCircle, FiDownload, FiRefreshCw, FiMapPin, FiCreditCard } from 'react-icons/fi';
import AccountPageHeader from '../components/account/AccountPageHeader';
import { ROUTES } from '../utils/constants';
import { getData, postData } from '../services/webservices';
import { useToast } from '../context/ToastContext';
import OrderDetailsSkeleton from '../components/skeletons/OrderDetailsSkeleton';

const OrderDetails = () => {
  const { showToast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const res = await getData(`website/orders/${id}`);
      if (res?.success && res?.data?.order) {
        setOrder(res.data.order);
      } else {
        showToast('Order not found', 'error');
        navigate('/orders');
      }
    } catch (err) {
      showToast('Failed to fetch order details', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrderDetails();
  }, [id]);

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    setCancelling(true);
    try {
      const res = await postData(`website/orders/${id}/cancel`, {});
      if (res?.success) {
        showToast('Order cancelled successfully', 'success');
        fetchOrderDetails();
      } else {
        showToast(res?.error || 'Failed to cancel order', 'error');
      }
    } catch (err) {
      showToast('Error cancelling order', 'error');
    } finally {
      setCancelling(false);
    }
  };

  const handleReorder = async () => {
    setReordering(true);
    try {
      const res = await postData(`website/orders/${id}/reorder`, {});
      if (res?.success) {
        showToast('Items added to cart for reorder', 'success');
        navigate('/cart');
      } else {
        showToast(res?.error || 'Failed to reorder', 'error');
      }
    } catch (err) {
      showToast('Error during reorder', 'error');
    } finally {
      setReordering(false);
    }
  };

  const handleDownloadInvoice = async () => {
    setDownloading(true);
    try {
      const res = await getData(`website/orders/${id}/invoice`);
      if (res?.success && res?.data?.invoice) {
        const invoice = res.data.invoice;
        const printWindow = window.open('', '_blank');
        
        let itemsHtml = '';
        if (invoice.items && Array.isArray(invoice.items)) {
          invoice.items.forEach(item => {
            itemsHtml += `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">£${item.price.toFixed(2)}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">£${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            `;
          });
        }

        const htmlContent = `
          <html>
            <head>
              <title>Invoice - ${invoice.orderNumber}</title>
              <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
                .header { text-align: center; margin-bottom: 40px; }
                .details { display: flex; justify-content: space-between; margin-bottom: 40px; }
                .details div { width: 45%; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
                th { text-align: left; padding: 10px; border-bottom: 2px solid #333; }
                .summary { text-align: right; }
                .summary p { margin: 5px 0; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>INVOICE</h1>
                <p>Order Number: ${invoice.orderNumber}</p>
                <p>Date: ${new Date(invoice.date).toLocaleDateString()}</p>
              </div>
              <div class="details">
                <div>
                  <h3>Bill To:</h3>
                  <p>${invoice.billingAddress?.firstName || ''} ${invoice.billingAddress?.lastName || ''}</p>
                  <p>${invoice.billingAddress?.email || invoice.customerEmail}</p>
                  <p>${invoice.billingAddress?.houseNumber || ''} ${invoice.billingAddress?.street || ''}</p>
                  <p>${invoice.billingAddress?.city || ''} ${invoice.billingAddress?.postcode || ''}</p>
                </div>
                <div>
                  <h3>Ship To:</h3>
                  <p>${invoice.shippingAddress?.firstName || ''} ${invoice.shippingAddress?.lastName || ''}</p>
                  <p>${invoice.shippingAddress?.houseNumber || ''} ${invoice.shippingAddress?.street || ''}</p>
                  <p>${invoice.shippingAddress?.city || ''} ${invoice.shippingAddress?.postcode || ''}</p>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              <div class="summary">
                <p>Subtotal: £${(invoice.subTotal || 0).toFixed(2)}</p>
                <p>Shipping: £${(invoice.shippingFee || 0).toFixed(2)}</p>
                <p>Discount: £${(invoice.discount || 0).toFixed(2)}</p>
                <h3>Total: £${(invoice.total || 0).toFixed(2)}</h3>
              </div>
              <script>
                window.onload = function() {
                  window.print();
                }
              </script>
            </body>
          </html>
        `;
        
        printWindow.document.write(htmlContent);
        printWindow.document.close();
      } else {
        showToast('Invoice not found', 'error');
      }
    } catch (err) {
      showToast('Failed to download invoice', 'error');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return <OrderDetailsSkeleton />;
  }

  if (!order) return null;

  const status = order.orderStatus || 'Pending';
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });


  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title={`Order #${order.orderNumber}`} />

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
                  <p className="text-slate-500 text-sm">Order Date: <span className="font-bold text-[#FF8A00]">{orderDate}</span></p>
                </div>
                <div className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border ${status.toLowerCase() === 'cancelled' ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-[#FF8A00] bg-orange-50 border-orange-100'}`}>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  {status}
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
                    <div className={`w-12 h-12 rounded-full ${['delivered', 'completed'].includes(status.toLowerCase()) ? 'bg-[#2E8B57] text-white shadow-sm' : 'bg-slate-200 text-slate-500'} flex items-center justify-center flex-shrink-0`}>
                      <FiMapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Delivered</h4>
                      <p className="text-slate-500 text-sm">{['delivered', 'completed'].includes(status.toLowerCase()) ? 'Order has been delivered.' : 'Pending'}</p>
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
                <h3 className="font-bold text-slate-800 text-lg">Ordered Products ({(order.items || []).length})</h3>
              </div>
              <div className="divide-y divide-slate-100 p-6">
                {(order.items || []).map(item => (
                  <div key={item._id || item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="w-20 h-20 rounded-xl border border-slate-100 p-2 flex-shrink-0">
                      <img src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100'} alt={item.name} className="w-full h-full object-contain rounded-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 truncate mb-1">{item.name}</h4>
                      <p className="text-slate-500 text-sm font-medium">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">£{(item.price || 0).toFixed(2)}</p>
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
              {status.toLowerCase() !== 'cancelled' && (
                <button onClick={handleReorder} disabled={reordering} className="w-full bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-[#2E8B57]/20 disabled:opacity-50">
                  <FiRefreshCw className={reordering ? 'animate-spin' : ''} /> {reordering ? 'Processing...' : 'Buy Again'}
                </button>
              )}
              <button onClick={handleDownloadInvoice} disabled={downloading} className="w-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                <FiDownload /> {downloading ? 'Downloading...' : 'Download Invoice'}
              </button>
              {status.toLowerCase() !== 'cancelled' && status.toLowerCase() !== 'delivered' && status.toLowerCase() !== 'completed' && (
                <button onClick={handleCancelOrder} disabled={cancelling} className="w-full bg-slate-50 hover:bg-rose-50 text-rose-600 hover:text-rose-700 font-bold py-3.5 rounded-xl transition-colors mt-4 disabled:opacity-50">
                  {cancelling ? 'Cancelling...' : 'Cancel Order'}
                </button>
              )}
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
                  <span className="font-bold text-slate-800">£{(order.subTotal || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium text-sm">
                  <span>Shipping</span>
                  <span className="font-bold text-slate-800">£{(order.shippingFee || 0).toFixed(2)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-slate-600 font-medium text-sm">
                    <span>Discount</span>
                    <span className="font-bold text-emerald-600">-£{(order.discountAmount || 0).toFixed(2)}</span>
                  </div>
                )}
                <div className="h-px bg-slate-100 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">Total</span>
                  <span className="font-black text-xl text-[#2E8B57]">£{(order.totalAmount || 0).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 bg-[#FAFAF8] rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-sm">
                    <FiMapPin className="text-[#FF8A00]" /> Shipping Address
                  </div>
                  <p className="text-slate-600 text-sm">
                    {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}<br/>
                    {order.shippingAddress?.houseNumber} {order.shippingAddress?.street}<br/>
                    {order.shippingAddress?.city}, {order.shippingAddress?.postcode}
                  </p>
                </div>

                <div className="p-4 bg-[#FAFAF8] rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold text-sm">
                    <FiCreditCard className="text-blue-500" /> Payment Method
                  </div>
                  <p className="text-slate-600 text-sm capitalize">{order.paymentMethod || 'N/A'}<br/>
                  <span className="text-xs text-slate-400">Status: {order.paymentStatus || 'Pending'}</span></p>
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
