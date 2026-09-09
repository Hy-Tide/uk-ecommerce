import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { getData } from '../../services/webservices';
import Skeleton from '../common/Skeleton';

const SeasonalRecipes = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getData('website/recipes/seasonal');
        if (res?.success && res?.data?.collections?.length > 0) {
          setCollections(res.data.collections);
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
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-5 w-96 mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-[24px]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (collections.length === 0) return null;

  return (
    <section className="w-full py-20 px-4 md:px-[80px] bg-[#FAFAF8]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-[#294535] text-[36px] md:text-[42px] font-[700] leading-tight mb-4">
              Seasonal Collections
            </h2>
            <p className="text-[#6B7280] text-[18px] max-w-[600px]">
              Curated recipe collections perfect for the current season and upcoming festivals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[400px] rounded-[24px] overflow-hidden cursor-pointer shadow-lg"
            >
              <img
                src={collection.img?.startsWith('/') ? `https://api.grandmasbasket.co.uk${collection.img}` : collection.img}
                alt={collection.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${collection.color || 'from-green-700/80 to-green-900/90'} opacity-80 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90`}></div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {collection.subtitle && (
                  <p className="text-white/80 font-[600] text-[14px] uppercase tracking-wider mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {collection.subtitle}
                  </p>
                )}
                <h3 className="text-white text-[28px] font-[800] leading-tight mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {collection.title}
                </h3>
                <button className="w-fit flex items-center gap-2 bg-white/20 hover:bg-white backdrop-blur-md text-white hover:text-gray-900 px-6 py-3 rounded-full font-[600] text-[14px] transition-all duration-300 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore Collection <FiArrowRight />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalRecipes;
