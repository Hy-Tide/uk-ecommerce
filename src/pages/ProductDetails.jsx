import React, { useMemo, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTabs from '../components/product/ProductTabs';
import SimpleProductCard from '../components/product/SimpleProductCard';
import FrequentlyBought from '../components/product/FrequentlyBought';
import ProductScroller from '../components/shop/ProductScroller';
import CustomerReviews from '../components/product/CustomerReviews';
import ProductDetailsSkeleton from '../components/skeletons/ProductDetailsSkeleton';
import ProductFAQ from '../components/product/ProductFAQ';
import StickyBottomBar from '../components/product/StickyBottomBar';
import Newsletter from '../components/home/Newsletter';
import { getData } from '../services/webservices';

import { 
  detailedProduct, 
  frequentlyBought, 
  productReviewsData, 
  productFAQs, 
  shopProducts 
} from '../data/dummyData';

const ProductDetails = () => {
  const { productSlug } = useParams();

  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top and fetch when navigating to a new product
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      setIsLoading(true);
      const response = await getData(`website/products/${productSlug}`);
      if (response && response.success !== false && response.data && response.data.product) {
        setProductData(response.data.product);
      } else {
        setProductData(null);
      }
      setIsLoading(false);
    };
    fetchProduct();
  }, [productSlug]);

  const currentProduct = useMemo(() => {
    if (!productData) return detailedProduct;

    return {
      ...detailedProduct,
      ...productData,
      id: productData.id || productData._id,
      name: productData.name || productData.title,
      description: productData.description || detailedProduct.description,
      image: productData.mainImage || (productData.images && productData.images.length > 0 ? productData.images[0] : detailedProduct.image),
      images: productData.images && productData.images.length > 0 ? productData.images : (productData.mainImage ? [productData.mainImage] : [detailedProduct.image]),
      category: typeof productData.category === 'object' ? productData.category?.name : (productData.category || 'Shop'),
      discountBadge: productData.badge?.text,
      stockCount: productData.stockCount ?? detailedProduct.stockCount,
      highlights: productData.highlights || detailedProduct.highlights,
      features: productData.features || detailedProduct.features,
      brand: productData.brand || detailedProduct.brand,
      ingredients: productData.ingredients,
      nutritionalInfo: productData.nutritionalInfo,
    };
  }, [productData, productSlug]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="bg-[#fcfbf9] min-h-screen relative pb-16 md:pb-0">
      <div className="container">
        
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumbs 
            paths={[
              { name: 'Shop', url: '/shop' }, 
              { name: currentProduct.category ? currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1) : 'Atta & Flour', url: '/shop' }, 
              { name: currentProduct.name }
            ]} 
          />
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 border border-slate-100 shadow-sm mb-12 flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="w-full lg:w-[45%]">
            <ProductGallery images={currentProduct.images.length >= 4 ? currentProduct.images : [currentProduct.image, currentProduct.image, currentProduct.image, currentProduct.image]} />
          </div>
          <div className="w-full lg:w-[55%]">
            <ProductInfo product={currentProduct} />
          </div>
        </div>

        {/* Product Tabs */}
        <ProductTabs product={currentProduct} />

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


        {/* FAQ */}
        <ProductFAQ faqs={productFAQs} />

      </div>

      {/* Newsletter */}
      <div className="mt-20">
        <Newsletter />
      </div>

      {/* Sticky Bottom Bar */}
      <StickyBottomBar product={currentProduct} />

    </div>
  );
};

export default ProductDetails;
