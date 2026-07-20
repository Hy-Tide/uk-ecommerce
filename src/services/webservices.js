import React from 'react';
import { API_URL } from './url';

// Helper to show snackbars from any place
export const showSnackbar = (message, type = 'error') => {
  window.dispatchEvent(new CustomEvent('snack', { detail: { message, type } }));
};

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const handleTokenRefresh = async () => {
  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshSubscribers.push((token) => {
        resolve(token);
      });
    });
  }

  isRefreshing = true;
  const refreshToken = sessionStorage.getItem('refreshToken');

  if (!refreshToken) {
    isRefreshing = false;
    return null;
  }

  try {
    const URL_ROUTE = `${API_URL}website/auth/refresh-token`;
    const response = await fetch(URL_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      const newToken = data?.data?.token || data?.token;
      const newRefreshToken = data?.data?.refreshToken || data?.refreshToken;

      if (newToken) {
        sessionStorage.setItem('sessionToken', newToken);
        if (newRefreshToken) {
          sessionStorage.setItem('refreshToken', newRefreshToken);
        }
        isRefreshing = false;
        onRefreshed(newToken);
        return newToken;
      }
    }
    
    isRefreshing = false;
    return null;
  } catch (error) {
    isRefreshing = false;
    return null;
  }
};

const getData = async (route, params = {}, token = null) => {
  const queryParams = new URLSearchParams(params).toString();
  const sessionToken = token || sessionStorage.getItem('sessionToken');
  const URL_ROUTE = `${API_URL}${route}?${queryParams}`;

  try {
    const response = await fetch(URL_ROUTE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
    });

    if (response.status === 401) {
      if (URL_ROUTE.includes('/auth/')) {
        const responseData = await response.json();
        return { success: false, error: Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
      }

      const newToken = await handleTokenRefresh();
      if (newToken) {
        const retryResponse = await fetch(URL_ROUTE, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newToken}`,
          },
        });
        const retryData = await retryResponse.json();
        if (!retryResponse.ok) return { success: false, error: Array.isArray(retryData?.error) ? retryData.error[0] : retryData?.error || retryData.message, data: retryData };
        return retryData;
      }

      showSnackbar('Session timed out. Please login to continue.', 'error');
      sessionStorage.removeItem('auth_user');
      sessionStorage.removeItem('sessionToken');
      sessionStorage.removeItem('refreshToken');
      if (window.location.pathname !== '/register' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return { success: false, error: 'Session timed out. Please login to continue.' };
    }

    const responseData = await response.json();

    if (!response.ok) {
      showSnackbar(`Response Error: ${JSON.stringify(responseData)}`, 'error');
      return { success: false, error: Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
    }

    return responseData;
  } catch (e) {
    console.error('API Error:', e);
    return { success: false, error: e.message || 'Network error occurred' };
  }
};

const postData = async (route, data, token) => {
  try {
    const URL_ROUTE = `${API_URL}${route}`.replace(/\/+$/, '');
    const response = await fetch(URL_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      if (URL_ROUTE.includes('/auth/')) {
        const responseData = await response.json();
        return { success: false, error: Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
      }

      const newToken = await handleTokenRefresh();
      if (newToken) {
        const retryResponse = await fetch(URL_ROUTE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newToken}`,
          },
          body: JSON.stringify(data),
        });
        const retryData = await retryResponse.json();
        if (!retryResponse.ok) return { success: false, error: Array.isArray(retryData?.error) ? retryData.error[0] : retryData?.error || retryData.message, data: retryData };
        return retryData;
      }

      showSnackbar('Session timed out. Please login to continue.', 'error');
      sessionStorage.removeItem('auth_user');
      sessionStorage.removeItem('sessionToken');
      sessionStorage.removeItem('refreshToken');
      if (window.location.pathname !== '/register' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return { success: false, error: 'Session timed out. Please login to continue.' };
    }

    const responseData = await response.json();
    if (!response.ok) {
      console.error('Response Error:', responseData);
      return { success: false, error: Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
    }

    return responseData;
  } catch (e) {
    console.error('Unexpected Error:', e.message);
    return { success: false, error: e.message || 'Network error occurred' };
  }
};

const patchData = async (route, body = {}, token = null) => {
  const URL_ROUTE = `${API_URL}${route}`;
  const sessionToken = token || sessionStorage.getItem('sessionToken');
  try {
    const response = await fetch(URL_ROUTE, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      if (URL_ROUTE.includes('/auth/')) {
        const responseData = await response.json();
        return { success: false, error: Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
      }

      const newToken = await handleTokenRefresh();
      if (newToken) {
        const retryResponse = await fetch(URL_ROUTE, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newToken}`,
          },
          body: JSON.stringify(body),
        });
        const retryData = await retryResponse.json();
        if (!retryResponse.ok) return { success: false, error: Array.isArray(retryData?.error) ? retryData.error[0] : retryData?.error || retryData.message, data: retryData };
        return retryData;
      }

      showSnackbar('Session timed out. Please login to continue.', 'error');
      sessionStorage.removeItem('auth_user');
      sessionStorage.removeItem('sessionToken');
      sessionStorage.removeItem('refreshToken');
      if (window.location.pathname !== '/register' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return { success: false, error: 'Session timed out. Please login to continue.' };
    }

    const responseData = await response.json();
    if (!response.ok) {
      console.error('Response Error:', responseData);
      return { success: false, error: Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
    }

    return responseData;
  } catch (e) {
    console.error('API Error:', e);
    throw e;
  }
};

const putData = async (route, data, token) => {
  const URL_ROUTE = `${API_URL}${route}`.replace(/\/+$/, '');
  try {
    const response = await fetch(URL_ROUTE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      if (URL_ROUTE.includes('/auth/')) {
        const responseData = await response.json();
        throw new Error(responseData.message || `Error: ${response.status}`);
      }

      const newToken = await handleTokenRefresh();
      if (newToken) {
        const retryResponse = await fetch(URL_ROUTE, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newToken}`,
          },
          body: JSON.stringify(data),
        });
        const retryData = await retryResponse.json();
        if (!retryResponse.ok) {
          throw new Error(retryData.message || `Error: ${retryResponse.status}`);
        }
        return retryData;
      }

      showSnackbar('Session timed out. Please login to continue.', 'error');
      sessionStorage.removeItem('auth_user');
      sessionStorage.removeItem('sessionToken');
      sessionStorage.removeItem('refreshToken');
      if (window.location.pathname !== '/register' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return { success: false, error: 'Session timed out. Please login to continue.' };
    }

    const responseData = await response.json();
    if (!response.ok) {
      console.error('Response Error:', responseData);
      throw new Error(responseData.message || `Error: ${response.status}`);
    }

    return responseData;
  } catch (e) {
    console.error('Unexpected Error:', e.message);
    throw e;
  }
};

const deleteData = async (route, token) => {
  const URL_ROUTE = `${API_URL}${route}`.replace(/\/+$/, '');
  try {
    const response = await fetch(URL_ROUTE, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      if (URL_ROUTE.includes('/auth/')) {
        const responseData = await response.json();
        return { success: false, error: Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
      }

      const newToken = await handleTokenRefresh();
      if (newToken) {
        const retryResponse = await fetch(URL_ROUTE, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        const retryData = await retryResponse.json();
        if (!retryResponse.ok) return { success: false, error: Array.isArray(retryData?.error) ? retryData.error[0] : retryData?.error || retryData.message, data: retryData };
        return retryData;
      }

      showSnackbar('Session timed out. Please login to continue.', 'error');
      sessionStorage.removeItem('auth_user');
      sessionStorage.removeItem('sessionToken');
      sessionStorage.removeItem('refreshToken');
      if (window.location.pathname !== '/register' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return { success: false, error: 'Session timed out. Please login to continue.' };
    }

    const responseData = await response.json();
    if (!response.ok) {
      console.error('Response Error:', responseData);
      return { success: false, error: Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
    }

    return responseData;
  } catch (e) {
    console.error('Unexpected Error:', e.message);
    throw e;
  }
};

const uploadFile = async (route, file, token) => {
  const URL_ROUTE = `${API_URL}${route}`.replace(/\/+$/, '');
  try {
    if (!file) {
      return { success: false, message: 'No file selected' };
    }

    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(URL_ROUTE, {
      method: 'POST',
      headers,
      body: file,
    });

    if (response.status === 401) {
      if (URL_ROUTE.includes('/auth/')) {
        const responseData = await response.json();
        return { success: false, error: Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
      }

      const newToken = await handleTokenRefresh();
      if (newToken) {
        const retryHeaders = { Authorization: `Bearer ${newToken}` };
        const retryResponse = await fetch(URL_ROUTE, {
          method: 'POST',
          headers: retryHeaders,
          body: file,
        });
        const retryData = await retryResponse.json();
        if (!retryResponse.ok) return { success: false, error: Array.isArray(retryData?.error) ? retryData.error[0] : retryData?.error || retryData.message, data: retryData };
        return retryData;
      }

      showSnackbar('Session timed out. Please login to continue.', 'error');
      sessionStorage.removeItem('auth_user');
      sessionStorage.removeItem('sessionToken');
      sessionStorage.removeItem('refreshToken');
      if (window.location.pathname !== '/register' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return { success: false, error: 'Session timed out. Please login to continue.' };
    }

    const responseData = await response.json();
    if (!response.ok) {
      console.error('Response Error:', responseData);
      return { success: false, error: Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
    }

    return responseData;
  } catch (error) {
    console.error('File Upload Error:', error);
    return { success: false, message: 'Error uploading file' };
  }
};

export { getData, postData, putData, patchData, deleteData, uploadFile };
