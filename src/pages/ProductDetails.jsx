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
import RecentlyViewed from '../components/home/RecentlyViewed';
import RecommendedProducts from '../components/home/RecommendedProducts';
import { getData } from '../services/webservices';

import ProductCard from '../components/product/ProductCard';

const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;
  return (
    <section className="bg-white py-10 rounded-[32px] border border-slate-100 shadow-sm p-6 md:p-10 mb-12">
      <h2 className="text-2xl font-black text-[#0C3823] tracking-tight mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={product._id || product.id} data-aos="fade-up" data-aos-delay={index * 80}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

const ProductDetails = () => {
  const { productSlug } = useParams();

  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [relatedProducts, setRelatedProducts] = useState([]);

  // Scroll to top and fetch when navigating to a new product
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await getData(`website/products/${productSlug}`);
        if (response?.success && response?.data?.product) {
          const fetchedProduct = response.data.product;
          setProductData(fetchedProduct);
        } else {
          setProductData(null);
        }

        const relatedRes = await getData(`website/products/${productSlug}/related`);
        if (relatedRes?.success && relatedRes?.data?.products) {
          setRelatedProducts(relatedRes.data.products);
        }
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchProduct();
  }, [productSlug]);

  const currentProduct = useMemo(() => {
    if (!productData) return null;

    return {
      ...productData,
      id: productData.id || productData._id,
      name: productData.name || productData.title,
      description: productData.description || '',
      image: productData.mainImage || (productData.images && productData.images.length > 0 ? productData.images[0] : ''),
      images: productData.images && productData.images.length > 0 ? productData.images : (productData.mainImage ? [productData.mainImage] : []),
      category: typeof productData.category === 'object' ? productData.category?.name : (productData.category || 'Shop'),
      discountBadge: productData.badge?.text,
      stockCount: productData.stockCount ?? 0,
      highlights: productData.highlights || [],
      features: productData.features || [],
      brand: productData.brand || '',
      ingredients: productData.ingredients,
      nutritionalInfo: productData.nutritionalInfo,
    };
  }, [productData, productSlug]);

  if (isLoading || !currentProduct) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen relative pb-16 md:pb-0">
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

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />

        {/* Recommended Products */}
        <div className="mb-12">
          <RecommendedProducts />
        </div>

        {/* Frequently Bought Together */}
        <FrequentlyBought items={[]} />

        {/* Recently Viewed */}
        <div className="mb-12">
          <RecentlyViewed />
        </div>

        {/* FAQ */}
        <ProductFAQ faqs={[]} />

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
