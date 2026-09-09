import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';


const BlogCategories = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  const displayCats = categories;

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="container px-4">

        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#FF8A00] text-xs font-bold uppercase tracking-widest mb-2">Browse by Topic</p>
            <h2 className="text-3xl font-black text-slate-800 mb-1">Explore Categories</h2>
            <p className="text-slate-500 font-medium">Find exactly what you're looking for</p>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-1.5 text-[#2E8B57] hover:text-[#FF8A00] font-bold text-sm transition-colors"
          >
            View all categories <FiArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayCats.slice(0, 6).map((cat, index) => (
            <motion.a
              href={`#${cat.slug || cat.id}`}
              key={cat.id || cat._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="bg-[#FBF6EE] hover:bg-white rounded-2xl p-5 border border-transparent hover:border-[#FF8A00]/20 hover:shadow-lg transition-all duration-300 group flex flex-col items-center text-center cursor-pointer hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform overflow-hidden shadow-sm ${cat.color || 'bg-emerald-50 text-emerald-600'}`}>
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-10 h-10 object-cover rounded-xl" />
                ) : (
                  cat.icon || '📚'
                )}
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-[#2E8B57] transition-colors leading-tight">{cat.name}</h3>
              {cat.count !== undefined && (
                <p className="text-xs text-slate-400 font-medium">{cat.count} {cat.count === 1 ? 'article' : 'articles'}</p>
              )}
            </motion.a>
          ))}
        </div>

        {/* Mobile view all link */}
        <div className="mt-6 text-center md:hidden">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[#2E8B57] hover:text-[#FF8A00] font-bold text-sm transition-colors"
          >
            View all categories <FiArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BlogCategories;
