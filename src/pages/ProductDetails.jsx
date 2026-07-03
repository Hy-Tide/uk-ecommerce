import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTabs from '../components/product/ProductTabs';
import SimpleProductCard from '../components/product/SimpleProductCard';
import FrequentlyBought from '../components/product/FrequentlyBought';
import ProductScroller from '../components/shop/ProductScroller';
import CustomerReviews from '../components/product/CustomerReviews';
import ProductFAQ from '../components/product/ProductFAQ';
import StickyBottomBar from '../components/product/StickyBottomBar';
import Newsletter from '../components/home/Newsletter';

import { 
  detailedProduct, 
  frequentlyBought, 
  productReviewsData, 
  productFAQs, 
  shopProducts 
} from '../data/dummyData';

const ProductDetails = () => {
  return (
    <div className="bg-[#fcfbf9] min-h-screen relative pb-16 md:pb-0">
      <div className="container">
        
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumbs 
            paths={[
              { name: 'Shop', url: '/shop' }, 
              { name: 'Atta & Flour', url: '/shop' }, 
              { name: 'Aashirvaad Whole Wheat Atta 10kg' }
            ]} 
          />
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 border border-slate-100 shadow-sm mb-12 flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-[45%]">
            <ProductGallery images={[detailedProduct.image, detailedProduct.image, detailedProduct.image, detailedProduct.image]} />
          </div>
          <div className="w-full lg:w-[55%]">
            <ProductInfo product={detailedProduct} />
          </div>
        </div>

        {/* Product Tabs */}
        <ProductTabs product={detailedProduct} />

        {/* Related Products Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark">Related products</h2>
            <Link to="/shop" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors border border-slate-200 px-4 py-2 rounded-full hover:border-primary">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shopProducts.slice(0, 4).map(product => (
              <SimpleProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Frequently Bought Together */}
        <FrequentlyBought items={frequentlyBought} />

        {/* Recently Viewed (Using the Horizontal Scroller) */}
        <ProductScroller 
          title="Recently viewed" 
          products={shopProducts.slice(4, 8)} 
          actionText="" 
        />

        {/* Customer Reviews */}
        <CustomerReviews data={productReviewsData} />

        {/* FAQ */}
        <ProductFAQ faqs={productFAQs} />

      </div>

      {/* Newsletter */}
      <div className="mt-20">
        <Newsletter />
      </div>

      {/* Sticky Bottom Bar */}
      <StickyBottomBar product={detailedProduct} />

    </div>
  );
};

export default ProductDetails;
