import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ShopHero from '../components/shop/ShopHero';
import ShopSidebar from '../components/shop/ShopSidebar';
import ShopProductCard from '../components/shop/ShopProductCard';
import ProductScroller from '../components/shop/ProductScroller';
import { shopProducts } from '../data/dummyData';
import Newsletter from '../components/home/Newsletter';
import SubCategoryPills from '../components/shop/SubCategoryPills';
import { getData } from '../services/webservices';

const Shop = () => {
  const { category: categorySlug } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const brandSlug = queryParams.get('brand');
  
  const [categoryData, setCategoryData] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      if (brandSlug) {
        const response = await getData(`website/brands/${brandSlug}`);
        if (response && response.success !== false && response.data && response.data.brand) {
          setBrandData(response.data.brand);
        }
      } else {
        setBrandData(null);
      }
    };
    fetchBrand();
  }, [brandSlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategoryAndSub = async () => {
      if (categorySlug) {
        const response = await getData(`website/categories/${categorySlug}`);
        if (response && response.success !== false && response.data && response.data.category) {
          setCategoryData(response.data.category);
        }
        
        const subResponse = await getData(`website/subcategories/category/${categorySlug}`);
        if (subResponse && subResponse.success !== false && subResponse.data && subResponse.data.subCategories) {
          setSubCategoriesData(subResponse.data.subCategories);
        }
      } else {
        setCategoryData(null);
        setSubCategoriesData([]);
      }
    };
    fetchCategoryAndSub();
  }, [categorySlug]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsProductsLoading(true);
      let params = {};
      
      // If we are on a category or brand page, we must wait for respective data to be populated
      if (categorySlug && !categoryData) return;
      if (brandSlug && !brandData) return;
      
      if (categoryData) {
        params.category_id = categoryData._id;
      }
      if (brandData) {
        params.brand_id = brandData._id;
      }
      
      const response = await getData('website/products', params);
      if (response && response.success !== false && response.data && response.data.products) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
      setIsProductsLoading(false);
    };
    
    fetchProducts();
  }, [categorySlug, categoryData, brandSlug, brandData]);

  const displayName = categoryData?.name || brandData?.name || 'All Products';
  
  const breadcrumbPaths = [{ name: 'Shop', url: '/shop' }];
  if (categoryData) {
    breadcrumbPaths.push({ name: categoryData.name });
  } else if (brandData) {
    breadcrumbPaths.push({ name: brandData.name });
  }

  return (
    <div className="bg-[#fcfbf9] min-h-screen">
      <div className="container">
        {/* Top Breadcrumb */}
        <Breadcrumbs paths={breadcrumbPaths} />

        {/* Banner */}
        <ShopHero />

        {/* Layout Split */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">

          {/* Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <ShopSidebar />
          </div>

          {/* Main Content */}
          <div className="w-full lg:flex-grow min-w-0">

            {/* Sub Categories Pills */}
            {subCategoriesData.length > 0 && (
              <SubCategoryPills categories={subCategoriesData} />
            )}

            {/* Grid Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-dark font-bold text-lg"><span className="text-[#379c6b]">{products.length} Products</span> in {displayName}</h2>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-sm font-medium">Sort by:</span>
                <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-dark hover:border-[#379c6b] transition-colors">
                  Best Selling <FiChevronDown />
                </button>
              </div>
            </div>

            {/* Grid */}
            {isProductsLoading ? (
              <div className="flex justify-center py-20 text-slate-500 font-bold">Loading Products...</div>
            ) : products.length === 0 ? (
              <div className="flex justify-center py-20 text-slate-500 font-bold">No products found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {products.map(product => (
                  <ShopProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 font-bold hover:bg-slate-200 transition-colors">&lt;</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#379c6b] text-white font-bold shadow-md">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 font-bold hover:bg-slate-50 border border-slate-100 transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 font-bold hover:bg-slate-50 border border-slate-100 transition-colors">3</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 font-bold hover:bg-slate-50 border border-slate-100 transition-colors">&gt;</button>
            </div>
          </div>
        </div>


        {/* Carousels */}
        <ProductScroller
          title="Recently Viewed"
          products={shopProducts.slice(0, 4)}
          actionText=""
        />
        <ProductScroller
          title="Recommended Products"
          products={shopProducts.slice(4, 8)}
          actionText="See more recommendations"
        />
      </div>

      <div className="mt-20">
        <Newsletter />
      </div>
    </div>
  );
};

export default Shop;
