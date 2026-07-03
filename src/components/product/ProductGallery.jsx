import React, { useState } from 'react';
import { FiMaximize2 } from 'react-icons/fi';

const ProductGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);

  // If no images provided, fallback
  const galleryImages = images && images.length > 0 ? images : ['/placeholder.jpg'];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative bg-[#fcfbf9] rounded-2xl p-8 flex items-center justify-center border border-slate-100 group overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-dark transition-colors opacity-0 group-hover:opacity-100">
          <FiMaximize2 size={18} />
        </button>
        <img 
          src={galleryImages[activeImage]} 
          alt="Product Display" 
          className="w-full h-full object-contain max-w-[80%] hover:scale-110 transition-transform duration-500 cursor-zoom-in"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar">
        {galleryImages.map((img, index) => (
          <button 
            key={index}
            onClick={() => setActiveImage(index)}
            className={`w-20 h-20 rounded-xl p-2 flex-shrink-0 flex items-center justify-center border-2 transition-all ${activeImage === index ? 'border-[#379c6b] bg-white' : 'border-transparent bg-[#fcfbf9] hover:border-slate-200'}`}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
