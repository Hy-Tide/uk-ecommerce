import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTag, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { getData } from '../services/webservices';
import OfferSkeleton from '../components/skeletons/OfferSkeleton';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setLoading(true);
      try {
        const [offersRes, bannerRes] = await Promise.all([
          getData('website/offers'),
          getData('website/banners/offers')
        ]);
        
        if (offersRes?.success && offersRes?.data?.offers) {
          setOffers(offersRes.data.offers);
        }
        
        if (bannerRes?.success && bannerRes?.data?.banners?.length > 0) {
          setBanner(bannerRes.data.banners[0]);
        }
      } catch (err) {
        console.error('Failed to fetch offers data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <OfferSkeleton />;
  }

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col justify-center overflow-hidden bg-[#1D3B2A]">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={banner?.image_url || 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=2000'}
            alt={banner?.title || 'Offers'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
        </div>
        <div className="container px-4 lg:px-8 mx-auto relative z-10 pt-20 pb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#FF8A00]/20 backdrop-blur-md border border-[#FF8A00]/30 text-[#FF8A00] px-4 py-1.5 rounded-full font-bold text-sm mb-6 shadow-sm">
                <FiTag /> Special Deals
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                {banner?.title || "Current Offers & Promotions"}
              </h1>
              <p className="text-white/85 text-lg md:text-xl font-medium leading-relaxed">
                {banner?.description || "Save big on your favorite groceries. Browse our latest discounts and limited-time deals below."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container px-4 lg:px-8 max-w-6xl mx-auto mt-12">
        {loading ? (
          <div className="flex justify-center items-center py-20 text-slate-500 font-medium">
            <div className="w-8 h-8 border-4 border-[#2E8B57] border-t-transparent rounded-full animate-spin mr-3"></div>
            Loading offers...
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <FiTag className="text-6xl text-slate-200 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Active Offers</h2>
            <p className="text-slate-500">Check back later for exciting new deals and discounts.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.map((offer, index) => {
              const startDate = new Date(offer.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
              const endDate = new Date(offer.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
              
              return (
                <motion.div
                  key={offer._id || offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all group flex flex-col h-full"
                >
                  <div className="h-56 overflow-hidden relative bg-slate-100">
                    <img 
                      src={offer.bannerImage || 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a'} 
                      alt={offer.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {offer.discountValue > 0 ? (
                      <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-lg px-4 py-1.5 rounded-xl shadow-lg">
                        {offer.discountType === 'percentage' ? `${offer.discountValue}% OFF` : `£${offer.discountValue} OFF`}
                      </div>
                    ) : (
                      <div className="absolute top-4 left-4 bg-[#FF8A00] text-white font-black text-sm px-4 py-1.5 rounded-xl shadow-lg uppercase tracking-wider">
                        {offer.productCount ? `${offer.productCount} Items Inside` : 'Special Deal'}
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">
                      <FiCalendar /> {startDate} - {endDate}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">{offer.title}</h3>
                    <p className="text-slate-600 mb-6 flex-1">{offer.description}</p>
                    
                    <Link 
                      to={`/offers/${offer._id || offer.id}`}
                      className="inline-flex items-center justify-center gap-2 w-full bg-[#FF8A00] hover:bg-[#e67a00] text-white font-bold py-3.5 rounded-full shadow-[0_4px_15px_rgba(255,138,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,138,0,0.5)] transition-all duration-300"
                    >
                      Shop This Offer <FiArrowRight />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Offers;
