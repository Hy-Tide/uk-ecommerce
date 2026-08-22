import React, { createContext, useContext, useState, useEffect } from 'react';
import { getData, postData, deleteData } from '../services/webservices';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { showToast } = useToast();
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlist = async () => {
    const token = sessionStorage.getItem('sessionToken');
    if (!token) {
      const guestWishlist = sessionStorage.getItem('guestWishlist');
      setWishlistItems(guestWishlist ? JSON.parse(guestWishlist) : []);
      return;
    }
    
    try {
      const response = await getData('website/wishlist', {}, token);
      if (response && response.success && response.data && response.data.wishlist && Array.isArray(response.data.wishlist.products)) {
        setWishlistItems(response.data.wishlist.products);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist', error);
    }
  };

  const syncGuestWishlist = async () => {
    const token = sessionStorage.getItem('sessionToken');
    if (!token) return;

    const guestWishlistStr = sessionStorage.getItem('guestWishlist');
    if (guestWishlistStr) {
      try {
        const guestWishlist = JSON.parse(guestWishlistStr);
        for (const product of guestWishlist) {
          const productId = product._id || product.id;
          await postData('website/wishlist', { productId }, token);
        }
        sessionStorage.removeItem('guestWishlist');
      } catch (e) {
        console.error('Failed to sync guest wishlist', e);
      }
    }
    
    await fetchWishlist();
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const toggleWishlist = async (product) => {
    const token = sessionStorage.getItem('sessionToken');
    const productId = product._id || product.id;
    const isExisting = wishlistItems.some(item => (item._id || item.id) === productId);

    if (!token) {
      let newWishlist;
      if (isExisting) {
        newWishlist = wishlistItems.filter(item => (item._id || item.id) !== productId);
        showToast('Removed from wishlist', 'success');
      } else {
        newWishlist = [...wishlistItems, product];
        showToast('Added to wishlist', 'success');
      }
      setWishlistItems(newWishlist);
      sessionStorage.setItem('guestWishlist', JSON.stringify(newWishlist));
      return;
    }

    if (isExisting) {
      setWishlistItems(prev => prev.filter(item => (item._id || item.id) !== productId));
      
      const response = await deleteData(`website/wishlist/${productId}`, token);
      if (!response || !response.success) {
        showToast(response?.error || 'Failed to remove from wishlist', 'error');
        fetchWishlist();
      }
    } else {
      setWishlistItems(prev => [...prev, product]);
      
      const response = await postData('website/wishlist', { productId }, token);
      if (!response || !response.success) {
        showToast(response?.error || 'Failed to add to wishlist', 'error');
        fetchWishlist();
      }
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => (item._id || item.id) === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    sessionStorage.removeItem('guestWishlist');
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, clearWishlist, fetchWishlist, syncGuestWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
