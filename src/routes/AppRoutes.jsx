import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { ROUTES } from '../utils/constants';

// Lazy load pages for performance
const Home = lazy(() => import('../pages/Home'));
const Shop = lazy(() => import('../pages/Shop'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Categories = lazy(() => import('../pages/Categories'));
const Brands = lazy(() => import('../pages/Brands'));
const BrandDetails = lazy(() => import('../pages/BrandDetails'));
const Recipes = lazy(() => import('../pages/Recipes'));
const AllCuisines = lazy(() => import('../pages/AllCuisines'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogDetails = lazy(() => import('../pages/BlogDetails'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Wishlist = lazy(() => import('../pages/Wishlist'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const MyAccount = lazy(() => import('../pages/MyAccount'));
const MyOrders = lazy(() => import('../pages/MyOrders'));
const OrderDetails = lazy(() => import('../pages/OrderDetails'));
const Profile = lazy(() => import('../pages/Profile'));
const AddressBook = lazy(() => import('../pages/AddressBook'));
const ChangePassword = lazy(() => import('../pages/ChangePassword'));
const Notifications = lazy(() => import('../pages/Notifications'));
const Support = lazy(() => import('../pages/Support'));
const Search = lazy(() => import('../pages/Search'));
const TrackOrder = lazy(() => import('../pages/TrackOrder'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Rewards = lazy(() => import('../pages/Rewards'));

const Loader = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Auth Routes without Header/Footer */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.SHOP} element={<Shop />} />
          <Route path={ROUTES.SHOP_CATEGORY} element={<Shop />} />
          <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
          <Route path={ROUTES.BRANDS} element={<Brands />} />
          <Route path={ROUTES.BRAND_DETAILS} element={<BrandDetails />} />
          <Route path={ROUTES.RECIPES} element={<Recipes />} />
          <Route path={ROUTES.ALL_CUISINES} element={<AllCuisines />} />
          <Route path={ROUTES.BLOG} element={<Blog />} />
          <Route path={ROUTES.BLOG_DETAILS} element={<BlogDetails />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          
          {/* Standalone Account Pages (MainLayout) */}
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.ORDERS} element={<MyOrders />} />
          <Route path={ROUTES.ORDER_DETAILS} element={<OrderDetails />} />
          <Route path={ROUTES.TRACK_ORDER} element={<TrackOrder />} />
          <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
          <Route path={ROUTES.ADDRESSES} element={<AddressBook />} />
          <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
          <Route path={ROUTES.SUPPORT} element={<Support />} />
          <Route path={ROUTES.REWARDS} element={<Rewards />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
