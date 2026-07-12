import React from 'react';
import { motion } from 'framer-motion';

const BlogCategories = ({ categories }) => {
  if (!categories) return null;

  return (
    <section id="categories" className="py-16 bg-[#FAFAF8]">
      <div className="container px-4">
        
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">Explore Categories</h2>
            <p className="text-slate-500 font-medium">Find exactly what you're looking for</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat, index) => (
            <motion.a
              href={`#${cat.slug}`}
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#2E8B57]/30 transition-all duration-300 group flex flex-col items-center text-center cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-1 group-hover:text-[#2E8B57] transition-colors">{cat.name}</h3>
              <p className="text-sm text-slate-400 font-medium">{cat.count} Articles</p>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogCategories;
