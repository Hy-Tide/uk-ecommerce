import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiHeart, FiArrowRight, FiBookmark } from 'react-icons/fi';

const BlogList = ({ articles, authors, onLoadMore, hasMore, isLoadingMore }) => {
  if (!articles || articles.length === 0) return null;

  const getAuthor = (id) => authors.find(a => a.id === id);

  return (
    <section id="latest" className="py-16 bg-white">
      <div className="container px-4">

        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#FF8A00] text-xs font-bold uppercase tracking-widest mb-2">Fresh off the press</p>
            <h2 className="text-3xl font-black text-slate-800 mb-1">Latest Articles</h2>
            <p className="text-slate-500 font-medium">Fresh recipes, tips, and guides from our experts.</p>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-1.5 text-[#2E8B57] hover:text-[#FF8A00] font-bold text-sm transition-colors"
          >
            View all articles <FiArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {articles.map((article, index) => {
            const author = getAuthor(article.authorId) || {
              name: article.authorName || 'Admin',
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(article.authorName || 'Admin')}&background=random`
            };
            const isNew = index === 0;

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="bg-[#FBF6EE] rounded-[24px] border border-[#ede8e0] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-[240px] overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-[#FF8A00] uppercase tracking-wider shadow-sm">
                    {article.category}
                  </div>

                  {/* New Badge */}
                  {isNew && (
                    <div className="absolute top-4 right-14 bg-[#2E8B57] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">
                      ✨ New
                    </div>
                  )}

                  {/* Bookmark Button */}
                  <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-[#2E8B57] shadow-sm transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                    <FiBookmark size={16} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow bg-white">

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-bold mb-3 uppercase tracking-wider">
                    <span>{article.publishedDate}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1"><FiClock size={11} /> {article.readTime}</span>
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
                      <img src={author?.avatar} alt={author?.name} className="w-8 h-8 rounded-full object-cover shadow-sm ring-1 ring-[#FF8A00]/20" />
                      <span className="text-sm font-bold text-slate-700">{author?.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-400 group-hover:text-rose-400 transition-colors">
                        <FiHeart size={12} /> {article.likes}
                      </div>
                      <Link
                        to={`/blog/${article.slug}`}
                        className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#FF8A00] hover:bg-[#e67a00] px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                      >
                        Read <FiArrowRight size={12} />
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={onLoadMore}
              disabled={isLoadingMore}
              className="bg-[#FF8A00] hover:bg-[#e67a00] text-white text-sm font-bold px-10 py-3.5 rounded-full transition-all shadow-lg shadow-[#FF8A00]/25 hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2 mx-auto"
            >
              {isLoadingMore ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Loading...
                </>
              ) : (
                <>Load More Articles <FiArrowRight size={16} /></>
              )}
            </button>
          </div>
        )}

        {/* Mobile view all */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[#2E8B57] hover:text-[#FF8A00] font-bold text-sm transition-colors"
          >
            View all articles <FiArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BlogList;
