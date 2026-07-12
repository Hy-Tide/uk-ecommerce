import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiEye, FiShare2, FiHeart } from 'react-icons/fi';

const BlogDetailsHero = ({ article, author }) => {
  if (!article) return null;

  return (
    <section className="relative w-full min-h-[450px] md:min-h-[550px] flex flex-col justify-end pb-16 overflow-hidden mt-[1px]">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            <div className="inline-block bg-[#FF8A00] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-md shadow-[#FF8A00]/30">
              {article.category}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed border-l-4 border-[#2E8B57] pl-4">
              {article.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/20 pt-6">
              
              <div className="flex items-center gap-4">
                <img src={author?.avatar} alt={author?.name} className="w-14 h-14 rounded-full object-cover border-2 border-white/30" />
                <div>
                  <h4 className="font-bold text-white text-lg">{author?.name}</h4>
                  <p className="text-sm text-white/60 font-medium">{article.publishedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-white/70 font-bold text-sm">
                <div className="flex items-center gap-2"><FiClock className="text-xl" /> {article.readTime}</div>
                <div className="flex items-center gap-2"><FiEye className="text-xl" /> {article.views}</div>
                <div className="flex items-center gap-2 text-rose-400"><FiHeart className="text-xl" /> {article.likes}</div>
                <button className="flex items-center gap-2 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                  <FiShare2 className="text-xl" /> Share
                </button>
              </div>

            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsHero;
