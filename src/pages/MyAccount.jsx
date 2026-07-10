import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiShoppingBag, 
  FiMapPin, 
  FiHeart, 
  FiGift, 
  FiPackage, 
  FiTruck,
  FiChevronRight,
  FiClock,
  FiEdit3,
  FiLock,
  FiCheckCircle
} from 'react-icons/fi';
import { ROUTES } from '../utils/constants';

const MyAccount = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="bg-primary-50 rounded-2xl p-6 lg:p-8 flex items-center justify-between border border-primary-100">
        <div>
          <h1 className="text-2xl font-bold text-dark mb-2">Welcome back, Deepika! 🌟</h1>
          <p className="text-slate-600">Here's what's happening with your account today.</p>
        </div>
        <div className="hidden md:block">
          {/* Optional illustration */}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { title: 'Total Orders', count: '12', icon: <FiShoppingBag />, color: 'bg-blue-50 text-blue-600 border-blue-100' },
          { title: 'Pending Orders', count: '1', icon: <FiClock />, color: 'bg-orange-50 text-orange-600 border-orange-100' },
          { title: 'Delivered', count: '11', icon: <FiPackage />, color: 'bg-green-50 text-green-600 border-green-100' },
          { title: 'Wishlist', count: '8', icon: <FiHeart />, color: 'bg-red-50 text-red-500 border-red-100' },
          { title: 'Addresses', count: '3', icon: <FiMapPin />, color: 'bg-purple-50 text-purple-600 border-purple-100' },
          { title: 'Reward Points', count: '450', icon: <FiGift />, color: 'bg-yellow-50 text-yellow-600 border-yellow-100' },
        ].map((card, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-3 ${card.color} group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <h4 className="text-2xl font-bold text-dark mb-1">{card.count}</h4>
            <p className="text-xs text-slate-500 font-medium">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Recent Orders & Recommended) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-dark">Recent Orders</h3>
              <Link to={ROUTES.ORDERS} className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
                View All <FiChevronRight />
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 text-sm">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { id: '#UK-294182', date: 'Oct 12, 2024', total: '£45.99', status: 'Delivered', statusColor: 'bg-green-100 text-green-700' },
                    { id: '#UK-294183', date: 'Oct 15, 2024', total: '£12.50', status: 'Processing', statusColor: 'bg-blue-100 text-blue-700' },
                  ].map((order, idx) => (
                    <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-4 font-medium text-dark">{order.id}</td>
                      <td className="py-4 text-slate-500">{order.date}</td>
                      <td className="py-4 font-bold text-dark">{order.total}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Products Carousel (CSS Scroll Snap) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-lg text-dark mb-6">Recommended For You</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="min-w-[180px] bg-white border border-slate-100 rounded-xl p-3 snap-start group hover:border-primary-200 transition-colors">
                  <div className="relative aspect-square bg-slate-50 rounded-lg mb-3 overflow-hidden">
                    <img src={`/images/product-${item}.png`} alt="Product" className="w-full h-full object-cover group-hover:scale-105 transition-transform" onError={(e) => { e.target.src = 'https://placehold.co/180x180/f8fafc/94a3b8?text=Product' }} />
                  </div>
                  <h4 className="font-bold text-sm text-dark truncate">Organic Apples</h4>
                  <p className="text-xs text-slate-500 mb-2">500g</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-sm">£2.99</span>
                    <button className="w-8 h-8 rounded-full bg-primary-50 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <FiShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Loyalty & Activity) */}
        <div className="space-y-8">
          
          {/* Loyalty & Rewards */}
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-sm border border-primary-100 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FiGift className="w-24 h-24 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-dark mb-4 relative z-10">Fresh Rewards</h3>
            <div className="mb-4 relative z-10">
              <p className="text-sm text-slate-600 mb-1">Available Points</p>
              <h2 className="text-4xl font-bold text-primary">450 <span className="text-sm font-medium text-slate-500">pts</span></h2>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Silver Tier</span>
                <span>50 pts to Gold</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-2 relative z-10">
              <button className="flex-1 bg-white border border-primary-200 text-primary py-2 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                Redeem
              </button>
              <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                Refer a Friend
              </button>
            </div>
          </div>

          {/* Account Activity Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-lg text-dark mb-6">Recent Activity</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-100 text-green-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <FiCheckCircle className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-slate-50 shadow-sm ml-4 md:ml-0 md:group-odd:mr-4 md:group-even:ml-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-dark text-sm">Order Delivered</div>
                  </div>
                  <div className="text-slate-500 text-xs">Your order #UK-294182 was delivered successfully.</div>
                  <time className="block text-[10px] text-slate-400 mt-2">Today, 10:30 AM</time>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <FiLock className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm ml-4 md:ml-0 md:group-odd:mr-4 md:group-even:ml-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-dark text-sm">Password Changed</div>
                  </div>
                  <div className="text-slate-500 text-xs">You successfully updated your password.</div>
                  <time className="block text-[10px] text-slate-400 mt-2">Yesterday, 04:15 PM</time>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-orange-100 text-orange-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <FiEdit3 className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm ml-4 md:ml-0 md:group-odd:mr-4 md:group-even:ml-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-dark text-sm">Profile Updated</div>
                  </div>
                  <div className="text-slate-500 text-xs">Updated phone number.</div>
                  <time className="block text-[10px] text-slate-400 mt-2">Oct 10, 2024</time>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default MyAccount;
