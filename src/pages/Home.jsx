import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import FeaturesSection from '../components/home/FeaturesSection';
import PromoBanners from '../components/home/PromoBanners';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import OfferBanner from '../components/home/OfferBanner';
import Brands from '../components/home/Brands';
import NewArrivals from '../components/home/NewArrivals';
import Recipes from '../components/home/Recipes';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <FeaturesSection />
      <PromoBanners />
      <CategorySection />
      <FeaturedProducts />
      <OfferBanner />
      <Brands />
      <NewArrivals />
      <Recipes />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
