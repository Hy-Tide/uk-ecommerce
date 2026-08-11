import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiEye, FiHeart, FiArrowRight } from 'react-icons/fi';

const BlogFeatured = ({ article, author }) => {
  if (!article) return null;

  return (
    <section className="py-16 bg-white relative z-20 -mt-10">
      <div className="container px-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#FAFAF8] rounded-[32px] overflow-hidden shadow-lg shadow-black/5 border border-slate-100 flex flex-col lg:flex-row group"
        >
          {/* Left: Large Image */}
          <div className="w-full lg:w-[55%] relative h-[300px] lg:h-auto overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-[#2E8B57] font-bold px-4 py-1.5 rounded-full text-sm shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF8A00]"></span>
              Featured Article
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-[45%] p-8 lg:p-14 flex flex-col justify-center">
            
            <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider text-[#FF8A00] mb-4">
              <span>{article.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="text-slate-500 normal-case tracking-normal font-medium">{article.publishedDate}</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-black text-slate-800 leading-tight mb-6 group-hover:text-[#2E8B57] transition-colors">
              <Link to={`/blog/${article.slug}`}>{article.title}</Link>
            </h2>

            <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200">
              <img src={author?.avatar} alt={author?.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
              <div>
                <h4 className="font-bold text-slate-800">{author?.name}</h4>
                <p className="text-sm text-slate-500">{author?.role}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-5 text-slate-500 text-sm font-medium">
                <div className="flex items-center gap-1.5"><FiClock className="text-slate-400" /> {article.readTime}</div>
                <div className="flex items-center gap-1.5"><FiEye className="text-slate-400" /> {article.views}</div>
                <div className="flex items-center gap-1.5"><FiHeart className="text-[#2E8B57]" /> {article.likes}</div>
              </div>
              
              <Link 
                to={`/blog/${article.slug}`}
                className="flex items-center gap-2 text-white bg-[#2E8B57] hover:bg-[#236b43] px-6 py-3 rounded-xl font-bold shadow-md shadow-[#2E8B57]/20 transition-all hover:-translate-y-1"
              >
                Read Article <FiArrowRight />
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BlogFeatured;
