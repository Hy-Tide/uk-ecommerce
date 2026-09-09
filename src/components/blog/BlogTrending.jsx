import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiChevronLeft, FiChevronRight, FiClock, FiEye } from 'react-icons/fi';

const BlogTrending = ({ articles }) => {
  const scrollRef = useRef(null);

  if (!articles || articles.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 370;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#FBF6EE] overflow-hidden">
      <div className="container px-4">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0">
              <FiTrendingUp size={26} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#FF8A00] uppercase tracking-widest mb-1">This Week</p>
              <h2 className="text-2xl lg:text-3xl font-black text-slate-800 leading-none">Trending Now</h2>
              <p className="text-slate-500 font-medium text-sm mt-0.5">Most read articles this week</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-[#FF8A00] hover:border-[#FF8A00]/40 hover:shadow-md transition-all"
            >
              <FiChevronLeft size={22} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-[#FF8A00] hover:border-[#FF8A00]/40 hover:shadow-md transition-all"
            >
              <FiChevronRight size={22} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x"
        >
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="min-w-[300px] md:min-w-[360px] bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group snap-start overflow-hidden flex flex-col hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                  {article.category}
                </div>
                {/* 🔥 Hot badge on first card */}
                {index === 0 && (
                  <div className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    🔥 Most Read
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-base text-slate-800 mb-4 line-clamp-2 group-hover:text-[#2E8B57] transition-colors leading-snug">
                  <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5"><FiClock size={12} /> {article.readTime}</div>
                    <div className="flex items-center gap-1.5"><FiEye size={12} /> {article.views}</div>
                  </div>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="w-8 h-8 rounded-full bg-[#FBF6EE] group-hover:bg-[#FF8A00] flex items-center justify-center text-slate-500 group-hover:text-white transition-colors shadow-sm"
                  >
                    <FiChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogTrending;
