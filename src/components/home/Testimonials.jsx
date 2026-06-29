import React from 'react';
import { testimonials } from '../../data/dummyData';
import { FaStar } from 'react-icons/fa';
import { RiDoubleQuotesL } from 'react-icons/ri';

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#171923]">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-0.5 bg-orange-500"></div>
              <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em]">Happy Customers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">What Our Customers Say</h2>
            <p className="text-slate-400">Trusted by over 50,000 families across the UK</p>
          </div>
          
          <div className="flex flex-col items-start md:items-end">
            <span className="text-5xl font-black text-white leading-none">4.9</span>
            <div className="flex items-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar key={star} className="text-orange-500" size={14} />
              ))}
            </div>
            <span className="text-slate-400 text-xs font-medium">14,200+ verified reviews</span>
          </div>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-[#1f2129] p-8 rounded-2xl border border-white/5 shadow-2xl flex flex-col"
            >
              <RiDoubleQuotesL className="text-[#2d3748] text-5xl mb-4" />
              
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <FaStar key={star} className="text-orange-500" size={12} />
                ))}
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                />
                <div>
                  <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                  <span className="text-slate-500 text-xs">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
