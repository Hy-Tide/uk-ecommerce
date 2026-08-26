import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import FeaturesSection from '../components/home/FeaturesSection';
import PromoBanners from '../components/home/PromoBanners';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import OfferBanner from '../components/home/OfferBanner';
import RecommendedProducts from '../components/home/RecommendedProducts';
import Brands from '../components/home/Brands';
import NewArrivals from '../components/home/NewArrivals';
import RecentlyViewed from '../components/home/RecentlyViewed';
import Recipes from '../components/home/Recipes';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import { getData } from '../services/webservices';
import HomeSkeleton from '../components/skeletons/HomeSkeleton';

const Home = () => {
  const [homeData, setHomeData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const response = await getData('website/home');
        if (response?.success && response.data) {
          setHomeData(response.data);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const safeHomeData = homeData || {};

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner data={safeHomeData.banners} isLoading={loading} />
      <FeaturesSection data={safeHomeData.features} />
      <PromoBanners data={safeHomeData.offers} isLoading={loading} />

      <CategorySection data={safeHomeData.categories} />
      <FeaturedProducts bestDealsData={safeHomeData.bestDeals} limitedProductsData={safeHomeData.limitedProducts} isLoading={loading} />
      <OfferBanner data={safeHomeData.subscriptionBanner} isLoading={loading} />
      <RecommendedProducts data={{}} />
      <Brands data={safeHomeData.brands} />
      <NewArrivals data={safeHomeData.newArrivals} />

      <RecentlyViewed />

      <Recipes data={safeHomeData.popularRecipes} />
      <Testimonials data={safeHomeData.testimonials} />
      <Newsletter />
    </div>
  );
};

export default Home;

