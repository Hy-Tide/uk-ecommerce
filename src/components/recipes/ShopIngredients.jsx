import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import ShopProductCard from '../shop/ShopProductCard';
import basmatiImg from '../../assets/basmati_rice.png';
import garamMasalaImg from '../../assets/garam_masala.png';
import paneerImg from '../../assets/fresh_paneer.png';
import turmericImg from '../../assets/turmeric_powder.png';

// Mock product data for ingredients
const ingredientsData = [
  {
    id: 'ing-1',
    name: 'Kohinoor Extra Long Basmati Rice',
    slug: 'kohinoor-basmati-rice',
    brand: 'Kohinoor',
    price: 18.99,
    oldPrice: 22.50,
    weight: '5kg',
    rating: 4.8,
    reviews: 320,
    image: basmatiImg,
    discountAmount: 'Save £3.51',
    badge: { type: 'hot', text: 'Best Seller' }
  },
  {
    id: 'ing-2',
    name: 'MDH Garam Masala Blend',
    slug: 'mdh-garam-masala',
    brand: 'MDH',
    price: 2.49,
    weight: '100g',
    rating: 4.9,
    reviews: 1450,
    image: garamMasalaImg,
    badge: null
  },
  {
    id: 'ing-3',
    name: 'Fresh Paneer (Cottage Cheese)',
    slug: 'fresh-paneer',
    brand: 'Amul',
    price: 4.99,
    oldPrice: 5.50,
    weight: '200g',
    rating: 4.7,
    reviews: 89,
    image: paneerImg,
    discountAmount: '10% OFF',
    badge: { type: 'new', text: 'Fresh Weekly' }
  },
  {
    id: 'ing-4',
    name: 'Organic Turmeric Powder (Haldi)',
    slug: 'organic-turmeric',
    brand: 'Natco',
    price: 3.25,
    weight: '100g',
    rating: 4.9,
    reviews: 560,
    image: turmericImg,
    badge: null
  }
];

const ShopIngredients = () => {
  return (
    <section className="w-full py-20 px-4 md:px-[80px] bg-[#FAFAF8]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-[#294535] text-[36px] md:text-[42px] font-[700] leading-tight mb-4">
              Shop Authentic Ingredients
            </h2>
            <p className="text-[#6B7280] text-[18px] max-w-[600px]">
              Recreate our premium recipes at home with the exact ingredients used by our chefs.
            </p>
          </div>
          <button className="text-[#2E8B57] font-[600] text-[16px] hover:text-[#FF8A00] transition-colors flex items-center gap-2 group">
            Browse All Spices & Groceries 
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ingredientsData.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <ShopProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopIngredients;
