import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import { getData } from '../../services/webservices';
import Skeleton from '../common/Skeleton';
import ProductCardSkeleton from '../skeletons/ProductCardSkeleton';

const ShopIngredients = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getData('website/products?featured=true&limit=4');
        if (res?.success && res?.data?.products?.length > 0) {
          setProducts(res.data.products);
        } else if (res?.data?.length > 0) {
          setProducts(res.data.slice(0, 4));
        }
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 px-4 md:px-[80px] bg-[#FAFAF8]">
        <div className="max-w-[1280px] mx-auto">
          <Skeleton className="h-10 w-72 mb-4" />
          <Skeleton className="h-5 w-96 mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="w-full py-20 px-4 md:px-[80px] bg-[#FAFAF8]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-[#294535] text-[36px] md:text-[42px] font-[700] leading-tight mb-4">
              Shop Authentic Ingredients
            </h2>
            <p className="text-[#6B7280] text-[18px] max-w-[600px]">
              Recreate our premium recipes at home with the exact ingredients used by our chefs.
            </p>
          </div>
          <Link to="/shop" className="text-[#2E8B57] font-[600] text-[16px] hover:text-[#FF8A00] transition-colors flex items-center gap-2 group">
            Browse All Spices & Groceries
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id || product.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <ProductCard product={product} removeImagePadding={true} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopIngredients;
