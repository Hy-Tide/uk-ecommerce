import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiSearch } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import ShopProductCard from '../components/shop/ShopProductCard';
import AccountPageHeader from '../components/account/AccountPageHeader';
import { products } from '../data/dummyData';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // The context stores the actual product objects
  const wishlistProducts = wishlistItems;

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      <AccountPageHeader title="My Wishlist" />

      <div className="container px-4 lg:px-8 max-w-7xl mx-auto">

        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-12 text-center flex flex-col items-center justify-center max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-rose-300 mb-6">
              <FiHeart size={40} className="fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
            <p className="text-slate-500 font-medium mb-8">Save items you love here to easily find them later and keep track of price drops.</p>
            <button className="bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-md shadow-[#2E8B57]/20">
              Start Shopping
            </button>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-xl font-bold text-slate-800">
                Saved Items ({wishlistProducts.length})
              </h2>

              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search wishlist..."
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#2E8B57] focus:ring-2 focus:ring-[#2E8B57]/10 transition-all font-medium text-sm text-slate-700 shadow-sm"
                />
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlistProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ShopProductCard product={product} viewMode="grid" />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
