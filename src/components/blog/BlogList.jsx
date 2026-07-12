import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiHeart, FiArrowRight, FiBookmark } from 'react-icons/fi';

const BlogList = ({ articles, authors }) => {
  if (!articles || articles.length === 0) return null;

  const getAuthor = (id) => authors.find(a => a.id === id);

  return (
    <section id="latest" className="py-16 bg-white">
      <div className="container px-4">
        
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-800 mb-2">Latest Articles</h2>
          <p className="text-slate-500 font-medium">Fresh recipes, tips, and guides from our experts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => {
            const author = getAuthor(article.authorId);
            
            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-[240px] overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-[#FF8A00] uppercase tracking-wider shadow-sm">
                    {article.category}
                  </div>

                  {/* Bookmark Button */}
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-[#2E8B57] shadow-sm transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                    <FiBookmark size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-bold mb-3 uppercase tracking-wider">
                    <span>{article.publishedDate}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1"><FiClock /> {article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-800 leading-tight mb-3 group-hover:text-[#2E8B57] transition-colors">
                    <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <img src={author?.avatar} alt={author?.name} className="w-8 h-8 rounded-full object-cover shadow-sm" />
                      <span className="text-sm font-bold text-slate-700">{author?.name}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-rose-500 transition-colors">
                        <FiHeart /> {article.likes}
                      </div>
                      <Link to={`/blog/${article.slug}`} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-[#2E8B57] group-hover:text-white transition-colors">
                        <FiArrowRight />
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-8 py-3 rounded-xl transition-colors">
            Load More Articles
          </button>
        </div>

      </div>
    </section>
  );
};

export default BlogList;
