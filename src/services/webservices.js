import React from 'react';
import { API_URL } from './url';

// Helper to dispatch global toast for non-react components
export const dispatchToast = (message, type = 'error') => {
  window.dispatchEvent(new CustomEvent('GLOBAL_TOAST', { detail: { message, type } }));
};

// --- AUTHENTICATION STATE & SECURITY ---
// PCI-DSS / GDPR XSS Mitigation:
// Session token is stored in-memory rather than sessionStorage to reduce XSS blast radius.
// Refresh token is managed entirely via httpOnly cookies by the backend.
let memorySessionToken = null;
let isRefreshing = false;
let refreshSubscribers = [];
let proactiveRefreshTimer = null;

// Cross-tab synchronization
const authChannel = new BroadcastChannel('auth_sync_channel');
authChannel.onmessage = (event) => {
  const { type, token } = event.data;
  if (type === 'TOKEN_UPDATE') {
    memorySessionToken = token;
    scheduleProactiveRefresh(token);
  } else if (type === 'LOGOUT') {
    performLogout(false); // don't broadcast back
  }
};

// Base64Url decode helper for JWT (no external dependencies)
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const scheduleProactiveRefresh = (token) => {
  if (proactiveRefreshTimer) {
    clearTimeout(proactiveRefreshTimer);
    proactiveRefreshTimer = null;
  }
  if (!token) return;

  const payload = parseJwt(token);
  if (!payload || !payload.exp) return;

  // Schedule refresh 60s before expiry
  const expiryTimeMs = payload.exp * 1000;
  const currentTimeMs = Date.now();
  const timeUntilExpiry = expiryTimeMs - currentTimeMs;
  const refreshDelay = timeUntilExpiry - 60000;
  
  if (refreshDelay > 0) {
    proactiveRefreshTimer = setTimeout(() => {
      handleTokenRefresh().catch(() => {});
    }, refreshDelay);
  } else if (timeUntilExpiry > 0) {
    handleTokenRefresh().catch(() => {});
  }
};

export const performLogout = async (shouldBroadcast = true) => {
  memorySessionToken = null;
  if (proactiveRefreshTimer) {
    clearTimeout(proactiveRefreshTimer);
  }
  
  // Clear any cached checkout or user state
  sessionStorage.removeItem('auth_user');
  localStorage.removeItem('checkout_state');
  
  if (shouldBroadcast) {
    authChannel.postMessage({ type: 'LOGOUT' });
  }

  // Attempt to notify backend to clear the httpOnly cookie
  try {
    await fetch(`${API_URL}website/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  } catch (e) {
    // Ignore network errors on logout
  }

  if (window.location.pathname !== '/register' && window.location.pathname !== '/login') {
    dispatchToast('Session ended. Please login to continue.', 'error');
    window.location.href = '/login';
  }
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

let bootstrapPromise = null;

// Silently re-establish session from httpOnly cookie on hard refresh/load
export const bootstrapAuth = () => {
  if (!bootstrapPromise) {
    bootstrapPromise = handleTokenRefresh().catch(() => null);
  }
  return bootstrapPromise;
};

export const handleTokenRefresh = async () => {
  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshSubscribers.push((token) => resolve(token));
    });
  }

  isRefreshing = true;

  try {
    const URL_ROUTE = `${API_URL}website/auth/refresh-token`;
    // credentials: 'include' is critical here so the browser sends the httpOnly refresh cookie
    const response = await fetch(URL_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' 
    });

    if (response.ok) {
      const data = await response.json();
      const newToken = data?.data?.token || data?.token || data?.data?.accessToken || data?.accessToken;

      if (newToken) {
        memorySessionToken = newToken;
        scheduleProactiveRefresh(newToken);
        authChannel.postMessage({ type: 'TOKEN_UPDATE', token: newToken });
        
        isRefreshing = false;
        onRefreshed(newToken);
        return newToken;
      }
    }

    isRefreshing = false;
    onRefreshed(null);
    return null;
  } catch (error) {
    isRefreshing = false;
    onRefreshed(null);
    return null;
  }
};

const waitForBootstrap = async () => {
  if (bootstrapPromise) {
    await bootstrapPromise;
  }
};

// Start bootstrap immediately on module load
bootstrapAuth();

// Expose token setter for login/register components
export const getSessionToken = () => memorySessionToken;
export const setSessionToken = (token) => {
  memorySessionToken = token;
  scheduleProactiveRefresh(token);
  authChannel.postMessage({ type: 'TOKEN_UPDATE', token });
};

// --- EXPORTED HTTP METHODS ---

const getData = async (route, params = {}, token = null, _retryCount = 0) => {
  await waitForBootstrap();
  const queryParams = new URLSearchParams(params).toString();
  const sessionToken = token || memorySessionToken;
  const URL_ROUTE = `${API_URL}${route}?${queryParams}`;

  try {
    const response = await fetch(URL_ROUTE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionToken ? { 'Authorization': `Bearer ${sessionToken}` } : {})
      },
    });

    if (response.status === 401) {
      if (URL_ROUTE.includes('/auth/')) {
        const responseData = await response.json();
        return { success: false, error: Array.isArray(responseData?.errors) ? responseData.errors[0] : Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
      }

      // Retry cap to prevent infinite loop if backend misbehaves
      if (_retryCount >= 1) {
        await performLogout();
        return { success: false, error: 'Session timed out. Please login to continue.' };
      }

      const newToken = await handleTokenRefresh();
      if (newToken) {
        return getData(route, params, newToken, _retryCount + 1);
      }

      if (memorySessionToken) await performLogout();
      return { success: false, error: 'Session timed out. Please login to continue.' };
    }

    const responseData = await response.json();
    if (!response.ok) {
      dispatchToast(`Response Error: ${JSON.stringify(responseData)}`, 'error');
      return { success: false, error: Array.isArray(responseData?.errors) ? responseData.errors[0] : Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
    }

    return responseData;
  } catch (e) {
    console.error('API Error:', e);
    return { success: false, error: e.message || 'Network error occurred' };
  }
};

const postData = async (route, data, token, _retryCount = 0) => {
  await waitForBootstrap();
  try {
    const URL_ROUTE = `${API_URL}${route}`.replace(/\/+$/, '');
    const sessionToken = token || memorySessionToken;
    const response = await fetch(URL_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {})
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      if (URL_ROUTE.includes('/auth/')) {
        const responseData = await response.json();
        return { success: false, error: Array.isArray(responseData?.errors) ? responseData.errors[0] : Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
      }

      if (_retryCount >= 1) {
        await performLogout();
        return { success: false, error: 'Session timed out. Please login to continue.' };
      }

      const newToken = await handleTokenRefresh();
      if (newToken) {
        return postData(route, data, newToken, _retryCount + 1);
      }

      if (memorySessionToken) await performLogout();
      return { success: false, error: 'Session timed out. Please login to continue.' };
    }

    const responseData = await response.json();
    
    // Intercept login/register responses to set token
    if (response.ok && (URL_ROUTE.includes('/auth/login') || URL_ROUTE.includes('/auth/register') || URL_ROUTE.includes('/auth/verify-email'))) {
        const interceptToken = responseData?.data?.tokens?.accessToken || responseData?.data?.token || responseData?.token;
        if (interceptToken) {
            setSessionToken(interceptToken);
        }
    }

    if (!response.ok) {
      console.error('Response Error:', responseData);
      return { success: false, error: Array.isArray(responseData?.errors) ? responseData.errors[0] : Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
    }

    return responseData;
  } catch (e) {
    console.error('Unexpected Error:', e.message);
    return { success: false, error: e.message || 'Network error occurred' };
  }
};

const patchData = async (route, body = {}, token = null, _retryCount = 0) => {
  await waitForBootstrap();
  const URL_ROUTE = `${API_URL}${route}`;
  const sessionToken = token || memorySessionToken;
  try {
    const response = await fetch(URL_ROUTE, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionToken ? { 'Authorization': `Bearer ${sessionToken}` } : {})
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      if (URL_ROUTE.includes('/auth/')) {
        const responseData = await response.json();
        return { success: false, error: Array.isArray(responseData?.errors) ? responseData.errors[0] : Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
      }

      if (_retryCount >= 1) {
        await performLogout();
        return { success: false, error: 'Session timed out. Please login to continue.' };
      }

      const newToken = await handleTokenRefresh();
      if (newToken) {
        return patchData(route, body, newToken, _retryCount + 1);
      }

      if (memorySessionToken) await performLogout();
      return { success: false, error: 'Session timed out. Please login to continue.' };
    }

    const responseData = await response.json();
    if (!response.ok) {
      console.error('Response Error:', responseData);
      return { success: false, error: Array.isArray(responseData?.errors) ? responseData.errors[0] : Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
    }

    return responseData;
  } catch (e) {
    console.error('API Error:', e);
    throw e;
  }
};

const putData = async (route, data, token, _retryCount = 0) => {
  await waitForBootstrap();
  const URL_ROUTE = `${API_URL}${route}`.replace(/\/+$/, '');
  const sessionToken = token || memorySessionToken;
  try {
    const response = await fetch(URL_ROUTE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {})
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      if (URL_ROUTE.includes('/auth/')) {
        const responseData = await response.json();
        throw new Error(responseData.message || `Error: ${response.status}`);
      }

      if (_retryCount >= 1) {
        await performLogout();
        return { success: false, error: 'Session timed out. Please login to continue.' };
      }

      const newToken = await handleTokenRefresh();
      if (newToken) {
        return putData(route, data, newToken, _retryCount + 1);
      }

      if (memorySessionToken) await performLogout();
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

const deleteData = async (route, token, _retryCount = 0) => {
  await waitForBootstrap();
  const URL_ROUTE = `${API_URL}${route}`.replace(/\/+$/, '');
  const sessionToken = token || memorySessionToken;
  try {
    const response = await fetch(URL_ROUTE, {
      method: 'DELETE',
      headers: {
        ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {})
      },
    });

    if (response.status === 401) {
      if (URL_ROUTE.includes('/auth/')) {
        const responseData = await response.json();
        return { success: false, error: Array.isArray(responseData?.errors) ? responseData.errors[0] : Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
      }

      if (_retryCount >= 1) {
        await performLogout();
        return { success: false, error: 'Session timed out. Please login to continue.' };
      }

      const newToken = await handleTokenRefresh();
      if (newToken) {
        return deleteData(route, newToken, _retryCount + 1);
      }

      if (memorySessionToken) await performLogout();
      return { success: false, error: 'Session timed out. Please login to continue.' };
    }

    const responseData = await response.json();
    if (!response.ok) {
      console.error('Response Error:', responseData);
      return { success: false, error: Array.isArray(responseData?.errors) ? responseData.errors[0] : Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
    }

    return responseData;
  } catch (e) {
    console.error('Unexpected Error:', e.message);
    throw e;
  }
};

const uploadFile = async (route, file, token, _retryCount = 0) => {
  await waitForBootstrap();
  const URL_ROUTE = `${API_URL}${route}`.replace(/\/+$/, '');
  const sessionToken = token || memorySessionToken;
  try {
    if (!file) {
      return { success: false, message: 'No file selected' };
    }

    const headers = {};
    if (sessionToken) {
      headers.Authorization = `Bearer ${sessionToken}`;
    }

    const response = await fetch(URL_ROUTE, {
      method: 'POST',
      headers,
      body: file,
    });

    if (response.status === 401) {
      if (URL_ROUTE.includes('/auth/')) {
        const responseData = await response.json();
        return { success: false, error: Array.isArray(responseData?.errors) ? responseData.errors[0] : Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
      }

      if (_retryCount >= 1) {
        await performLogout();
        return { success: false, error: 'Session timed out. Please login to continue.' };
      }

      const newToken = await handleTokenRefresh();
      if (newToken) {
        return uploadFile(route, file, newToken, _retryCount + 1);
      }

      if (memorySessionToken) await performLogout();
      return { success: false, error: 'Session timed out. Please login to continue.' };
    }

    const responseData = await response.json();
    if (!response.ok) {
      console.error('Response Error:', responseData);
      return { success: false, error: Array.isArray(responseData?.errors) ? responseData.errors[0] : Array.isArray(responseData?.error) ? responseData.error[0] : responseData?.error || responseData.message, data: responseData };
    }

    return responseData;
  } catch (error) {
    console.error('File Upload Error:', error);
    return { success: false, message: 'Error uploading file' };
  }
};

export { getData, postData, putData, patchData, deleteData, uploadFile };
