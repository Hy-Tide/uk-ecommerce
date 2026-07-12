import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiChevronLeft, FiChevronRight, FiClock, FiEye } from 'react-icons/fi';

const BlogTrending = ({ articles }) => {
  const scrollRef = useRef(null);
  
  if (!articles || articles.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container px-4">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <FiTrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-black text-slate-800">Trending Now</h2>
              <p className="text-slate-500 font-medium">Most read articles this week</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#2E8B57] hover:border-[#2E8B57] transition-all">
              <FiChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#2E8B57] hover:border-[#2E8B57] transition-all">
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 snap-x"
        >
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="min-w-[300px] md:min-w-[350px] bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow group snap-start overflow-hidden flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                  {article.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-slate-800 mb-4 line-clamp-2 group-hover:text-[#2E8B57] transition-colors leading-snug">
                  <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>
                
                <div className="mt-auto flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><FiClock /> {article.readTime}</div>
                  <div className="flex items-center gap-1.5"><FiEye /> {article.views}</div>
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
