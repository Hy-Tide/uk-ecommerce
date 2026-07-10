import React from 'react';
import AccountLayout from '../components/account/AccountLayout';
import { FiDownload, FiTruck, FiBox, FiCheckCircle } from 'react-icons/fi';
import { shopProducts } from '../data/dummyData';

const OrderDetails = () => {
  const orderItems = shopProducts.slice(0, 3);

  return (
    <AccountLayout 
      title="Order Details" 
      breadcrumbs={[
        { name: 'My Account', url: '/my-account' },
        { name: 'Orders', url: '/my-orders' },
        { name: 'UK-294182' }
      ]}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-8 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-dark mb-1">Order #UK-294182</h2>
          <p className="text-slate-500 text-sm">Placed on October 12, 2024 at 10:24 AM</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl font-bold text-dark hover:bg-slate-50 transition-colors">
          <FiDownload className="w-4 h-4" />
          Invoice
        </button>
      </div>

      {/* Progress Tracker */}
      <div className="mb-12">
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2/3 h-1 bg-primary rounded-full"></div>
          
          <div className="relative flex justify-between">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm z-10">
                <FiBox className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-dark">Processing</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white shadow-sm z-10">
                <FiTruck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-dark">Shipped</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center border-4 border-white shadow-sm z-10">
                <FiCheckCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-400">Delivered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="font-bold text-lg text-dark mb-4">Items Ordered</h3>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border border-slate-100 rounded-2xl bg-white">
                <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-dark text-sm leading-tight">{item.name}</h4>
                    <span className="font-bold text-primary ml-4">£{item.price}</span>
                  </div>
                  <p className="text-slate-500 text-xs mb-2">{item.weight}</p>
                  <p className="text-sm font-medium text-slate-700">Qty: 1</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-lg text-dark mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-dark">£40.79</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium text-dark">£5.20</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span className="font-medium text-dark">£0.00</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="font-bold text-dark text-base">Total</span>
                <span className="font-bold text-primary text-xl">£45.99</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-lg text-dark mb-4">Shipping Address</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              <span className="font-bold text-dark block mb-1">John Doe</span>
              123 Baker Street<br />
              London, W1U 8ED<br />
              United Kingdom
            </p>
            <p className="text-slate-600 text-sm font-medium">
              Mobile: +44 20 7946 0958
            </p>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default OrderDetails;
