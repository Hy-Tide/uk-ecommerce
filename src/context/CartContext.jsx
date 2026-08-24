import React, { createContext, useContext, useState, useEffect } from 'react';
import { getData, postData, putData, deleteData } from '../services/webservices';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartDetails, setCartDetails] = useState(null); // to store full cart object (discounts, coupons, etc)

  const fetchCart = async () => {
    const token = sessionStorage.getItem('sessionToken');
    if (!token) {
      const guestCartStr = sessionStorage.getItem('guestCart');
      if (guestCartStr) {
        const guestCart = JSON.parse(guestCartStr);
        setCartItems(guestCart.items || []);
        const total = (guestCart.items || []).reduce((sum, item) => sum + ((item.price || item.product?.price || 0) * (item.quantity || 1)), 0);
        setCartTotal(total);
        setCartDetails({ totalAmount: total });
      } else {
        setCartItems([]);
        setCartTotal(0);
        setCartDetails(null);
      }
      return;
    }

    try {
      const response = await getData('website/cart', {}, token);
      if (response && response.success && response.data && response.data.cart) {
        const cart = response.data.cart;
        setCartItems(cart.items || []);
        setCartTotal(cart.totalAmount || 0);
        setCartDetails(cart);
      } else {
        setCartItems([]);
        setCartTotal(0);
        setCartDetails(null);
      }
    } catch (error) {
      console.error('Failed to fetch cart', error);
    }
  };

  const syncGuestCart = async () => {
    const token = sessionStorage.getItem('sessionToken');
    if (!token) return;

    const guestCartStr = sessionStorage.getItem('guestCart');
    if (guestCartStr) {
      try {
        debugger
        const guestCart = JSON.parse(guestCartStr);
        const items = guestCart.items || [];
        for (const item of items) {
          const productId = item.productId || (item.product && (item.product._id || item.product.id)) || item.id;
          const variationId = item.variationId || (item.variation && (item.variation._id || item.variation.id)) || null;
          const payload = { productId, quantity: item.quantity };
          if (variationId) payload.variationId = variationId;
          await postData('website/cart/items', payload, token);
        }
        sessionStorage.removeItem('guestCart');
      } catch (e) {
        console.error('Failed to sync guest cart', e);
      }
    }
    await fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product, variation = null, quantity = 1) => {
    const selectedVariation = variation || (product.variations && product.variations.length > 0 ? product.variations[0] : null);
    const token = sessionStorage.getItem('sessionToken');
    const productId = product._id || product.id || product.productId;
    const variationId = selectedVariation ? (selectedVariation._id || selectedVariation.id || selectedVariation.variationId) : null;
    if (!token) {
      const guestCartStr = sessionStorage.getItem('guestCart');
      let guestCart = guestCartStr ? JSON.parse(guestCartStr) : { items: [] };

      const existingIdx = guestCart.items.findIndex(item =>
        (item.productId === productId || (item.product && item.product._id === productId)) &&
        (item.variationId === variationId || (item.variation && item.variation._id === variationId))
      );

      if (existingIdx >= 0) {
        guestCart.items[existingIdx].quantity += quantity;
      } else {
        // mock a cart item
        const price = selectedVariation?.salePrice || selectedVariation?.regularPrice || product.discount_price || product.price || 0;
        guestCart.items.push({
          _id: `guest_${Date.now()}`,
          productId,
          variationId,
          product,
          variation: selectedVariation,
          quantity,
          price
        });
      }

      sessionStorage.setItem('guestCart', JSON.stringify(guestCart));
      showToast('Added to cart', 'success');
      await fetchCart();
      return true;
    }

    try {
      const payload = { productId, quantity };
      if (variationId) payload.variationId = variationId;
      const response = await postData('website/cart/items', payload, token);
      if (response && response.success !== false) {
        showToast('Added to cart', 'success');
        await fetchCart();
        return true;
      } else {
        showToast(response?.error || 'Failed to add to cart', 'error');
        return false;
      }
    } catch (e) {
      showToast('Error adding to cart', 'error');
      return false;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) return removeFromCart(itemId);

    const token = sessionStorage.getItem('sessionToken');

    if (!token) {
      const guestCartStr = sessionStorage.getItem('guestCart');
      if (guestCartStr) {
        let guestCart = JSON.parse(guestCartStr);
        const itemIdx = guestCart.items.findIndex(item => item._id === itemId);
        if (itemIdx >= 0) {
          guestCart.items[itemIdx].quantity = quantity;
          sessionStorage.setItem('guestCart', JSON.stringify(guestCart));
          await fetchCart();
        }
      }
      return;
    }

    try {
      const response = await putData(`website/cart/items/${itemId}`, { quantity }, token);
      if (response && response.success !== false) {
        await fetchCart();
      } else {
        showToast(response?.error || 'Failed to update quantity', 'error');
      }
    } catch (e) {
      showToast('Error updating quantity', 'error');
    }
  };

  const removeFromCart = async (itemId) => {
    const token = sessionStorage.getItem('sessionToken');

    if (!token) {
      const guestCartStr = sessionStorage.getItem('guestCart');
      if (guestCartStr) {
        let guestCart = JSON.parse(guestCartStr);
        guestCart.items = guestCart.items.filter(item => item._id !== itemId);
        sessionStorage.setItem('guestCart', JSON.stringify(guestCart));
        await fetchCart();
      }
      return;
    }

    try {
      const response = await deleteData(`website/cart/items/${itemId}`, token);
      if (response && response.success !== false) {
        await fetchCart();
      } else {
        showToast(response?.error || 'Failed to remove item', 'error');
      }
    } catch (e) {
      showToast('Error removing item', 'error');
    }
  };

  const clearCart = async () => {
    const token = sessionStorage.getItem('sessionToken');

    if (!token) {
      sessionStorage.removeItem('guestCart');
      await fetchCart();
      return;
    }

    try {
      const response = await deleteData('website/cart/clear', token);
      if (response && response.success !== false) {
        await fetchCart();
      } else {
        showToast(response?.error || 'Failed to clear cart', 'error');
      }
    } catch (e) {
      showToast('Error clearing cart', 'error');
    }
  };

  const applyCoupon = async (code) => {
    const token = sessionStorage.getItem('sessionToken');
    if (!token) {
      showToast('Please log in to apply coupons', 'warning');
      return;
    }

    try {
      const response = await postData('website/cart/coupon', { code }, token);
      if (response && response.success !== false) {
        showToast('Coupon applied successfully', 'success');
        await fetchCart();
      } else {
        showToast(response?.error || 'Failed to apply coupon', 'error');
      }
    } catch (e) {
      showToast('Error applying coupon', 'error');
    }
  };

  const removeCoupon = async () => {
    const token = sessionStorage.getItem('sessionToken');
    if (!token) return;

    try {
      const response = await deleteData('website/cart/coupon', token);
      if (response && response.success !== false) {
        showToast('Coupon removed', 'success');
        await fetchCart();
      } else {
        showToast(response?.error || 'Failed to remove coupon', 'error');
      }
    } catch (e) {
      showToast('Error removing coupon', 'error');
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartTotal,
      cartDetails,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      fetchCart,
      syncGuestCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
