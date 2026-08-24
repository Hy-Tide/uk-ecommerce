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

const Home = () => {
  const [homeData, setHomeData] = useState({});

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await getData('website/home');
        if (response?.success && response.data) {
          setHomeData(response.data);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner data={homeData.banners} />
      <FeaturesSection data={homeData.features} />
      <PromoBanners data={homeData.offers} />
      
      <CategorySection data={homeData.categories} />
      <FeaturedProducts bestDealsData={homeData.bestDeals} limitedProductsData={homeData.limitedProducts} />
      <OfferBanner data={homeData.subscriptionBanner} />
      <RecommendedProducts data={{}} /> {/* No recommended products in API currently */}
      <Brands data={homeData.brands} />
      <NewArrivals data={homeData.newArrivals} />
      
      <RecentlyViewed />
      
      <Recipes data={homeData.popularRecipes} />
      <Testimonials data={homeData.testimonials} />
      <Newsletter />
    </div>
  );
};

export default Home;
