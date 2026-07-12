import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock } from 'react-icons/fi';

const BlogRelatedPosts = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-16 mt-16 border-t border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-slate-800">Related Articles</h2>
        <Link to="/blog" className="hidden md:flex items-center gap-2 font-bold text-[#2E8B57] hover:text-[#236b43] transition-colors">
          View All <FiArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <Link to={`/blog/${article.slug}`}>
              <div className="relative h-48 rounded-[20px] overflow-hidden mb-4 shadow-sm">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-[#FF8A00] uppercase tracking-wider">
                  {article.category}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mb-2 uppercase tracking-wider">
                <span>{article.publishedDate}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1"><FiClock /> {article.readTime}</span>
              </div>
              <h3 className="font-bold text-lg text-slate-800 group-hover:text-[#2E8B57] transition-colors leading-snug line-clamp-2">
                {article.title}
              </h3>
            </Link>
          </motion.article>
        ))}
      </div>
      
      <Link to="/blog" className="md:hidden mt-8 w-full flex items-center justify-center gap-2 bg-slate-50 font-bold text-slate-700 py-4 rounded-xl hover:bg-slate-100 transition-colors">
        View All Articles <FiArrowRight />
      </Link>
    </section>
  );
};

export default BlogRelatedPosts;
