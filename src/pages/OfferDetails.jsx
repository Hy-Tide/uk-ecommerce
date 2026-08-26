import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiTag } from 'react-icons/fi';
import { getData } from '../services/webservices';
import ShopProductCard from '../components/shop/ShopProductCard';

const OfferDetails = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchOfferDetails = async () => {
      setLoading(true);
      try {
        const res = await getData(`website/offers/${id}/products`);
        if (res?.success && res?.data) {
          setOffer(res.data.offer);
          setProducts(res.data.products || []);
        }
      } catch (err) {
        console.error('Failed to fetch offer details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOfferDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#fcfbf9] min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#2E8B57] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="bg-[#fcfbf9] min-h-screen pt-32 pb-20 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Offer Not Found</h2>
        <Link to="/offers" className="text-[#2E8B57] font-bold hover:underline inline-flex items-center gap-2">
          <FiArrowLeft /> Back to Offers
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20 pt-24">
      {/* Banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-slate-900 overflow-hidden">
        <img 
          src={offer.bannerImage || 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a'} 
          alt={offer.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="container px-4 lg:px-8 mx-auto h-full flex flex-col justify-end pb-12 relative z-10">
          <Link to="/offers" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-6 w-fit transition-colors">
            <FiArrowLeft /> Back to all offers
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-600 text-white font-black text-sm px-3 py-1 rounded-lg">
              {offer.discountValue > 0 ? (offer.discountType === 'percentage' ? `${offer.discountValue}% OFF` : `€${offer.discountValue} OFF`) : 'SPECIAL OFFER'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 max-w-3xl">
            {offer.title}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl font-medium">
            {offer.description}
          </p>
        </div>
      </div>

      <div className="container px-4 lg:px-8 mx-auto mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FiTag className="text-[#2E8B57]" /> Eligible Products ({products.length})
          </h2>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 font-medium">No products currently available for this offer.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id || product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ShopProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferDetails;
