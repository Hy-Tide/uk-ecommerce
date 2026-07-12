import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';

// Import our local image for South Indian as we did before
import southIndianImg from '../assets/south_indian_cuisine.png';

const allCuisinesData = [
  { id: 1, name: 'North Indian', recipes: 350, desc: 'Rich curries, tandoori breads, and creamy gravies featuring robust spices and dairy.', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'South Indian', recipes: 280, desc: 'Rice-based dishes, lentils, coconut flavors, and tangy tamarind infusions.', img: southIndianImg },
  { id: 3, name: 'Punjabi', recipes: 150, desc: 'Hearty, buttery dishes like Chole Bhature and rich Paneer preparations.', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Gujarati', recipes: 120, desc: 'A perfect balance of sweet, salty, and spicy vegetarian delicacies.', img: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800' },
  { id: 5, name: 'Indo-Chinese', recipes: 130, desc: 'Indian spices mixed with Chinese cooking techniques like stir-frying.', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
  { id: 6, name: 'Vegan Indian', recipes: 400, desc: 'Plant-based traditional recipes naturally free of any animal products.', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800' },
  { id: 7, name: 'Bengali', recipes: 90, desc: 'Mustard oil preparations, freshwater fish, and iconic milk-based sweets.', img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800' },
  { id: 8, name: 'Maharashtrian', recipes: 110, desc: 'Flavorful street food, peanut gravies, and spicy misal.', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800' },
  { id: 9, name: 'Rajasthani', recipes: 85, desc: 'Desert-adapted recipes using gram flour, yogurt, and intense spices.', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800' },
  { id: 10, name: 'Kashmiri', recipes: 75, desc: 'Aromatic, mild dishes using fennel, ginger powder, and saffron.', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800' },
  { id: 11, name: 'Goan', recipes: 60, desc: 'Coastal flavors combining coconut, seafood, and Portuguese influences.', img: 'https://images.unsplash.com/photo-1626074961596-caa949bb205a?auto=format&fit=crop&q=80&w=800' },
  { id: 12, name: 'Kerala', recipes: 95, desc: 'Spicy curries packed with black pepper, curry leaves, and coconut milk.', img: 'https://images.unsplash.com/photo-1610192244261-3f3394b7fa78?auto=format&fit=crop&q=80&w=800' },
];

const ITEMS_PER_PAGE = 4;

const AllCuisines = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and Pagination Logic
  const filteredCuisines = allCuisinesData.filter(cuisine => 
    cuisine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredCuisines.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCuisines = filteredCuisines.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16 px-4 md:px-[80px]">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <Link to="/recipes" className="text-gray-500 hover:text-[#2E8B57] text-sm font-semibold mb-4 inline-block transition-colors">
              &larr; Back to Recipes
            </Link>
            <h1 className="text-[#294535] text-[36px] md:text-[48px] font-[800] leading-tight mb-4">
              All Regional Cuisines
            </h1>
            <p className="text-[#6B7280] text-[18px]">
              Explore the rich diversity of Indian food. Browse by region to find authentic recipes.
            </p>
          </div>

          <div className="relative w-full md:w-[300px]">
            <input 
              type="text" 
              placeholder="Search cuisines..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
              className="w-full bg-white border border-gray-200 rounded-full py-3 px-6 pr-12 text-[#294535] outline-none focus:border-[#2E8B57] transition-all shadow-sm"
            />
            <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          </div>
        </div>

        {/* Horizontal Cuisine Cards */}
        <div className="flex flex-col gap-6 mb-12">
          {paginatedCuisines.length > 0 ? (
            paginatedCuisines.map((cuisine, index) => (
              <motion.div 
                key={cuisine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row overflow-hidden group h-auto md:h-[280px]"
              >
                {/* Image Section */}
                <div className="w-full md:w-[350px] h-[250px] md:h-full relative overflow-hidden flex-shrink-0">
                  <img 
                    src={cuisine.img} 
                    alt={cuisine.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 md:from-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-10 flex flex-col justify-center flex-grow">
                  <div className="inline-flex items-center bg-[#FF8A00]/10 text-[#FF8A00] px-3 py-1 rounded-full text-xs font-[700] uppercase tracking-wide mb-4 w-fit">
                    {cuisine.recipes}+ Recipes
                  </div>
                  
                  <h2 className="text-[#294535] text-[28px] md:text-[32px] font-[700] mb-4 group-hover:text-[#2E8B57] transition-colors">
                    {cuisine.name}
                  </h2>
                  
                  <p className="text-gray-600 text-[16px] leading-[1.7] max-w-[500px]">
                    {cuisine.desc}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[24px] border border-gray-100">
              <p className="text-gray-500 text-lg">No cuisines found matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:bg-[#FAFAF8] hover:text-[#2E8B57] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-[600] text-[15px] transition-colors ${
                  currentPage === i + 1 
                    ? 'bg-[#2E8B57] text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-[#FAFAF8]'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:bg-[#FAFAF8] hover:text-[#2E8B57] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllCuisines;
