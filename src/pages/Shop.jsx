import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ShopHero from '../components/shop/ShopHero';
import ShopSidebar from '../components/shop/ShopSidebar';
import ShopProductCard from '../components/shop/ShopProductCard';
import ProductScroller from '../components/shop/ProductScroller';

import Newsletter from '../components/home/Newsletter';
import SubCategoryPills from '../components/shop/SubCategoryPills';
import RecentlyViewed from '../components/home/RecentlyViewed';
import RecommendedProducts from '../components/home/RecommendedProducts';
import { getData } from '../services/webservices';
import { ROUTES } from '../utils/constants';
import ProductCardSkeleton from '../components/skeletons/ProductCardSkeleton';

const Shop = () => {
  const { category: categorySlugParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categorySlug = queryParams.get('category') || categorySlugParam;
  const brandSlug = queryParams.get('brand');
  const subCategoryParam = queryParams.get('subcategoryId') || queryParams.get('subcategory');

  const [categoryData, setCategoryData] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState(null);
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
  }, [categorySlug]);

  useEffect(() => {
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
      
      if (subCategoryParam) {
        setActiveSubCategoryId(subCategoryParam);
      } else {
        setActiveSubCategoryId(null);
      }
    };
    fetchCategoryAndSub();
  }, [categorySlug, subCategoryParam]);

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

      let endpoint = 'website/products';
      if (activeSubCategoryId) {
        endpoint = `website/products/subcategory/${activeSubCategoryId}`;
      } else if (categoryData) {
        endpoint = `website/products/category/${categoryData._id}`;
      }

      const token = sessionStorage.getItem('sessionToken');
      const response = await getData(endpoint, {}, token);
      if (response && response.success !== false && response.data && response.data.products) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
      }
      setIsProductsLoading(false);
    };

    fetchProducts();
  }, [categorySlug, categoryData, brandSlug, brandData, activeSubCategoryId]);

  const displayName = categoryData?.name || brandData?.name || 'All Products';

  const breadcrumbPaths = [{ name: 'Shop', url: ROUTES.SHOP }];
  if (categoryData) {
    breadcrumbPaths.push({ name: categoryData.name });
  } else if (brandData) {
    breadcrumbPaths.push({ name: brandData.name });
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <div className="container">
        {/* Top Breadcrumb */}
        <Breadcrumbs paths={breadcrumbPaths} />

        {/* Banner */}
        <ShopHero
          title={displayName}
          description={categoryData?.description || brandData?.description || 'Discover pure goodness in every bite with our organic, premium products. The perfect choice for your daily health.'}
        />

        {/* Layout Split */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">

          {/* Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <ShopSidebar />
          </div>

          {/* Main Content */}
          <div className="w-full lg:flex-grow min-w-0">

            {/* Sub Categories Pills - Only show if a subcategory is active to allow switching, or if we want to show it always. Wait, if we are showing a grid, maybe we still show pills? Yes, but they can just use the grid. Let's keep pills. */}
            {subCategoriesData.length > 0 && (
              <SubCategoryPills
                categories={subCategoriesData}
                activeCategoryId={activeSubCategoryId}
                onCategoryChange={(subId) => {
                  if (subId) {
                    navigate(`${ROUTES.SHOP}?category=${categorySlug}&subcategoryId=${subId}`);
                  } else {
                    navigate(`${ROUTES.SHOP}?category=${categorySlug}`);
                  }
                }}
              />
            )}

            {/* Grid Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#0C3823] font-black text-lg md:text-xl"><span className="text-[#FF6B00]">{products.length} Products</span> in {displayName}</h2>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs font-semibold">Sort by:</span>
                <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-[#0C3823] hover:border-[#0C3823] transition-colors shadow-xs">
                  Best Selling <FiChevronDown />
                </button>
              </div>
            </div>

            {/* Grid */}
            {isProductsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex justify-center py-20 text-slate-500 font-bold">No products found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {products.map(product => (
                  <ShopProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recently Viewed & Recommended Products */}
        <RecommendedProducts />
        <RecentlyViewed />
      </div>

      <div className="mt-20">
        <Newsletter />
      </div>
    </div>
  );
};

export default Shop;
