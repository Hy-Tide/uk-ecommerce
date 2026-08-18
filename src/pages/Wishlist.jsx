import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiSearch, FiChevronRight, FiUser, FiShoppingBag } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import ShopProductCard from '../components/shop/ShopProductCard';
import { ROUTES } from '../utils/constants';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const wishlistProducts = wishlistItems || [];

  return (
    <div className="bg-[#FAFBF9] min-h-screen pb-20">

      {/* Hero Header Cover */}
      <div className="bg-gradient-to-r from-[#072414] via-[#0C3823] to-[#165636] relative pt-6 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,0,0.15),transparent_50%)]"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>

        <div className="container max-w-7xl mx-auto relative z-10">
          <nav className="flex items-center gap-2 text-xs font-semibold text-emerald-200/80 mb-2">
            <Link to={ROUTES.HOME} className="hover:text-white transition-colors flex items-center gap-1">
              <FiUser size={13} /> Home
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <Link to={ROUTES.PROFILE} className="hover:text-white transition-colors">
              My Account
            </Link>
            <FiChevronRight className="text-emerald-400/40" size={12} />
            <span className="text-white font-bold">My Wishlist</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Saved Favorites & Wishlist</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium mt-1">Keep track of your favorite products and price drops</p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-12 sm:-mt-14 relative z-10">

        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-md p-10 sm:p-16 text-center flex flex-col items-center justify-center max-w-xl mx-auto"
          >
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-5 shadow-xs">
              <FiHeart size={36} className="fill-current" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Your Wishlist is Empty</h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mb-6 leading-relaxed">
              Explore our fresh Indian grocery selection and click the heart icon on any product to save it to your wishlist.
            </p>
            <Link 
              to={ROUTES.SHOP}
              className="bg-[#0C3823] hover:bg-[#FF6B00] text-white font-bold text-xs py-3 px-8 rounded-2xl transition-all duration-200 shadow-md shadow-[#0C3823]/20 flex items-center gap-2"
            >
              <FiShoppingBag size={15} /> Start Shopping
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-base font-extrabold text-slate-900 px-2">
                Saved Items ({wishlistProducts.length})
              </h2>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search wishlist..."
                  className="w-full bg-[#FAFBF9] border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-[#0C3823] focus:ring-2 focus:ring-[#0C3823]/15 transition-all text-xs font-semibold text-slate-800"
                />
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlistProducts.map((product, index) => (
                <motion.div
                  key={product._id || product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
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

