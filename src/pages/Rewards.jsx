import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGift, FiStar, FiAward, FiInfo, FiChevronRight } from 'react-icons/fi';
import AccountPageHeader from '../components/account/AccountPageHeader';

const dummyHistory = [
  { id: 1, action: 'Order #ORD-2026-8924', date: '12 Jul 2026', points: '+45', type: 'earned' },
  { id: 2, action: 'Product Review (Turmeric)', date: '10 Jul 2026', points: '+15', type: 'earned' },
  { id: 3, action: 'Redeemed £5 Voucher', date: '01 Jul 2026', points: '-500', type: 'redeemed' },
  { id: 4, action: 'Order #ORD-2026-8901', date: '02 Jul 2026', points: '+112', type: 'earned' },
];

const Rewards = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title="Rewards & Points" />

      <div className="container px-4 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Points Display */}
          <div className="lg:col-span-2 space-y-8">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-[#2E8B57] to-[#1D3B2A] rounded-[24px] shadow-lg overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
                <FiGift size={200} />
              </div>
              
              <div className="p-8 md:p-10 relative z-10 text-white">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full w-fit mb-8 border border-white/20">
                  <FiAward className="text-[#FF8A00]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Gold Member</span>
                </div>
                
                <p className="text-white/80 font-medium mb-1">Available Points</p>
                <h2 className="text-5xl md:text-6xl font-black mb-6">1,245 <span className="text-2xl text-white/60 font-medium">pts</span></h2>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <div className="flex justify-between items-end mb-3">
                    <p className="text-sm font-medium text-white/90">255 points until <strong className="text-[#FF8A00]">Platinum</strong> tier</p>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest">1500 MAX</p>
                  </div>
                  <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#FF8A00] to-yellow-400 h-full rounded-full" style={{ width: '83%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/20 p-6 flex items-center justify-between backdrop-blur-md">
                <p className="text-white/90 font-medium">Value: <strong className="text-xl">£12.45</strong></p>
                <button className="bg-white text-[#2E8B57] font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-md">
                  Redeem Now
                </button>
              </div>
            </motion.div>

            {/* History Table */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-lg">Points History</h3>
                <button className="text-sm font-bold text-[#2E8B57] hover:underline">View All</button>
              </div>
              
              <div className="divide-y divide-slate-100">
                {dummyHistory.map((item, index) => (
                  <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border ${item.type === 'earned' ? 'bg-emerald-50 text-[#2E8B57] border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                        {item.type === 'earned' ? <FiStar /> : <FiGift />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{item.action}</h4>
                        <p className="text-slate-500 text-sm">{item.date}</p>
                      </div>
                    </div>
                    <div className={`font-black text-lg ${item.type === 'earned' ? 'text-[#2E8B57]' : 'text-slate-600'}`}>
                      {item.points}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-[#FAFAF8] rounded-[24px] border border-slate-100 shadow-sm p-6"
            >
              <h3 className="font-bold text-slate-800 text-lg mb-4">How to Earn Points</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#2E8B57] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiShoppingBag size={14} className="ml-0.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Shop Groceries</h4>
                    <p className="text-slate-500 text-xs">Earn 1 point for every £1 spent on any order.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiEdit2 size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Review Products</h4>
                    <p className="text-slate-500 text-xs">Get 15 points for every approved product review.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF8A00] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiUser size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Refer a Friend</h4>
                    <p className="text-slate-500 text-xs">Earn 500 points when they make their first purchase.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <FiInfo className="text-slate-400" /> Tier Benefits
                </div>
                <FiChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-slate-500 text-sm">Learn about Bronze, Silver, Gold, and Platinum rewards.</p>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
};

// Simple icon mocks since we didn't import all
const FiShoppingBag = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full p-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const FiUser = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full p-1.5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

export default Rewards;
