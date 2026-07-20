import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ShopProductCard from '../components/shop/ShopProductCard';
import Newsletter from '../components/home/Newsletter';
import { getData } from '../services/webservices';

const BrandDetails = () => {
  const { slug } = useParams();
  const [brandData, setBrandData] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setIsLoading(true);
      // Fetch brand details
      let currentBrand = null;
      if (slug) {
        const brandRes = await getData(`website/brands/${slug}`);
        if (brandRes && brandRes.success !== false && brandRes.data && brandRes.data.brand) {
          currentBrand = brandRes.data.brand;
          setBrandData(currentBrand);
        } else {
          setBrandData(null);
        }
      }
      
      // Fetch products for this brand
      if (currentBrand) {
        const prodRes = await getData('website/products', { brand_id: currentBrand._id });
        if (prodRes && prodRes.success !== false && prodRes.data && prodRes.data.products) {
          setProducts(prodRes.data.products);
        } else {
          setProducts([]);
        }
      } else {
        setProducts([]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [slug]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500 bg-[#fcfbf9]">Loading Brand Details...</div>;
  }

  if (!brandData) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500 bg-[#fcfbf9]">Brand not found.</div>;
  }

  return (
    <div className="bg-[#fcfbf9] min-h-screen">
      <div className="container py-8">
        {/* Top Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs paths={[{ name: 'Brands', url: '/brands' }, { name: brandData.name }]} />
        </div>

        {/* Brand Hero */}
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100 mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 rounded-full border-4 border-slate-50 overflow-hidden shadow-sm flex items-center justify-center bg-slate-100">
            {brandData.image_url ? (
              <img src={brandData.image_url} alt={brandData.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-5xl font-black text-slate-300">{brandData.name.charAt(0)}</span>
            )}
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl md:text-5xl font-black text-dark mb-4">{brandData.name}</h1>
            {brandData.description && (
              <p className="text-slate-500 text-lg max-w-3xl leading-relaxed">
                {brandData.description}
              </p>
            )}
          </div>
        </div>

        {/* Brand Products */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-dark font-bold text-2xl">Products by {brandData.name} <span className="text-[#379c6b] text-lg">({products.length})</span></h2>
          </div>

          {products.length === 0 ? (
            <div className="flex justify-center py-20 text-slate-500 font-bold bg-white rounded-2xl border border-slate-100">No products found for this brand.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ShopProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-20">
        <Newsletter />
      </div>
    </div>
  );
};

export default BrandDetails;
