import React, { useState } from 'react';
import { FiMaximize2 } from 'react-icons/fi';
import { resolveProductImageUrl } from '../../utils/constants';

const ProductGallery = ({ images = [] }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [mainError, setMainError] = useState(false);
  const [failedIndices, setFailedIndices] = useState({});

  const formattedImages = images.map(img => resolveProductImageUrl({ image: img })).filter(Boolean);
  const galleryImages = formattedImages.length > 0 ? formattedImages : [];

  const handleThumbError = (index) => {
    setFailedIndices(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative bg-[#fcfbf9] rounded-2xl p-8 flex items-center justify-center border border-slate-100 group overflow-hidden" style={{ aspectRatio: '1/1' }}>
        <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-dark transition-colors opacity-0 group-hover:opacity-100">
          <FiMaximize2 size={18} />
        </button>
        {galleryImages.length > 0 && galleryImages[activeImage] && !mainError ? (
          <img 
            src={galleryImages[activeImage]} 
            alt="Product Display" 
            className="w-full h-full object-contain max-w-[80%] hover:scale-110 transition-transform duration-500 cursor-zoom-in"
            onError={() => setMainError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50/80 rounded-xl p-4 select-none text-center">
            <img
              src="/images/logo.png"
              alt="Grandma's Basket Logo"
              className="w-24 h-24 object-contain opacity-25 grayscale hover:grayscale-0 transition-all duration-300"
            />
            <span className="text-xs text-slate-400 font-bold mt-2 opacity-70">
              Grandma's Basket
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {galleryImages.map((img, index) => (
            <button 
              key={index}
              onClick={() => {
                setActiveImage(index);
                setMainError(false);
              }}
              className={`w-20 h-20 rounded-xl p-2 flex-shrink-0 flex items-center justify-center border-2 transition-all ${activeImage === index ? 'border-[#379c6b] bg-white' : 'border-transparent bg-[#fcfbf9] hover:border-slate-200'}`}
            >
              {!failedIndices[index] ? (
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-contain"
                  onError={() => handleThumbError(index)}
                />
              ) : (
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-8 h-8 object-contain opacity-25 grayscale"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
