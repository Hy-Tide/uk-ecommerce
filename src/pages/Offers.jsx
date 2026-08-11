import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTag, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { getData } from '../services/webservices';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const res = await getData('website/offers');
        if (res?.success && res?.data?.offers) {
          setOffers(res.data.offers);
        }
      } catch (err) {
        console.error('Failed to fetch offers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#FFE57F] pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#FFD54F] rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-[#FFCA28] rounded-full opacity-50 blur-3xl"></div>
        </div>
        <div className="container px-4 lg:px-8 mx-auto relative z-10 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-[#FF8A00] font-bold text-sm mb-6 shadow-sm border border-[#FF8A00]/20">
              <FiTag /> Special Deals
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#0C3823] mb-4">
              Current Offers & Promotions
            </h1>
            <p className="text-[#0C3823]/80 text-lg font-medium">
              Save big on your favorite groceries. Browse our latest discounts and limited-time deals below.
            </p>
          </motion.div>
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
                    {offer.discountValue > 0 && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-lg px-4 py-1.5 rounded-xl shadow-lg">
                        {offer.discountType === 'percentage' ? `${offer.discountValue}% OFF` : `£${offer.discountValue} OFF`}
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
                      className="inline-flex items-center justify-center gap-2 w-full bg-slate-50 hover:bg-[#2E8B57] text-[#2E8B57] hover:text-white border border-slate-200 hover:border-transparent font-bold py-3.5 rounded-xl transition-all"
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
