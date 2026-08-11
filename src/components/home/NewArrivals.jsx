import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';
import { getData } from '../../services/webservices';

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await getData('website/products/new-arrivals');
        if (res?.success && res?.data?.products) {
          setNewArrivals(res.data.products);
        }
      } catch (err) {
        console.error('Failed to fetch new arrivals', err);
      }
    };
    fetchNewArrivals();
  }, []);

  if (newArrivals.length === 0) return null;

  return (
    <section className="container py-12 md:py-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10" data-aos="fade-up">
        <div>
          <span className="text-[#2E8B57] font-bold tracking-wider uppercase text-sm mb-2 block">Just Landed</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0C3823] tracking-tight">New Arrivals</h2>
        </div>
        <Link
          to={ROUTES.SHOP}
          className="text-[#0C3823] hover:text-[#FF6B00] font-bold text-sm inline-flex items-center gap-1.5 transition-colors mt-4 md:mt-0"
        >
          View All New Products <FiArrowRight size={16} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {newArrivals.slice(0, 5).map((product, index) => (
          <div key={product._id || product.id} data-aos="fade-up" data-aos-delay={index * 100}>
            <ProductCard product={{...product, badge: { type: 'new' }}} />
          </div>
        ))}
      </div>

    </section>
  );
};

export default NewArrivals;
