export const CURRENCY_SYMBOL = '€';
export const CURRENCY_CODE = 'EUR';

export const ROUTES = {
  HOME: '/',
  CATEGORIES: '/categories',
  SHOP: '/category',
  SHOP_CATEGORY: '/category/:category',
  PRODUCT_DETAILS: '/category/:categorySlug/:subCategorySlug/:productSlug',
  BRANDS: '/brands',
  BRAND_DETAILS: '/brands/:slug',
  RECIPES: '/recipes',
  ALL_CUISINES: '/recipes/cuisines',
  BLOG: '/blog',
  BLOG_DETAILS: '/blog/:slug',
  ABOUT: '/about',
  CONTACT: '/contact',
  OFFERS: '/offers',
  OFFER_DETAILS: '/offers/:id',
  WISHLIST: '/wishlist',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_SUCCESS: '/order-success',
  ORDER_FAILURE: '/order-failure',
  TRACK_ORDER: '/track-order',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  ORDERS: '/orders',
  ORDER_DETAILS: '/orders/:id',
  PROFILE: '/profile',
  ADDRESSES: '/addresses',
  SEARCH: '/search',
  CHANGE_PASSWORD: '/change-password',
  NOTIFICATIONS: '/notifications',
  SUPPORT: '/support',
  REWARDS: '/rewards',
  COMING_SOON: '/coming-soon',
  EXPLORE: '/explore',
};

export const getProductUrl = (product) => {
  if (!product) return '/';
  const cat = typeof product.category === 'object' ? product.category?.slug || 'all' : (product.category || 'all');
  const sub = typeof product.subCategory === 'object' ? product.subCategory?.slug || 'all' : (product.subCategory || 'all');
  return `/category/${cat}/${sub}/${product.slug || product._id || product.id || product.productId || 'product'}`;
};

export const resolveProductImageUrl = (product) => {
  if (!product) return null;
  let rawUrl = null;

  if (Array.isArray(product.images) && product.images.length > 0 && product.images[0]) {
    rawUrl = product.images[0];
  } else if (typeof product.images === 'string' && product.images.trim()) {
    rawUrl = product.images;
  } else if (product.mainImage && typeof product.mainImage === 'string') {
    rawUrl = product.mainImage;
  } else if (product.image && typeof product.image === 'string') {
    rawUrl = product.image;
  } else if (product.thumbnail && typeof product.thumbnail === 'string') {
    rawUrl = product.thumbnail;
  }

  if (!rawUrl || typeof rawUrl !== 'string') return null;
  rawUrl = rawUrl.trim();
  if (!rawUrl || rawUrl.includes('example.com') || rawUrl === 'undefined' || rawUrl === 'null') return null;

  if (rawUrl.startsWith('http://api.grandmasbasket.co.uk')) {
    return rawUrl.replace('http://api.grandmasbasket.co.uk', 'https://api.grandmasbasket.co.uk');
  }
  if (rawUrl.startsWith('/uploads')) {
    return `https://api.grandmasbasket.co.uk${rawUrl}`;
  }

  return rawUrl;
};

