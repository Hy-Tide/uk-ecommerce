import React, { createContext, useContext, useState, useEffect } from 'react';
import { getData } from '../services/webservices';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    const token = sessionStorage.getItem('sessionToken');
    if (token && token !== 'demo_token') {
      try {
        const response = await getData('website/users/profile', {}, token);
        if (response && response.success !== false && response.data) {
          const userData = response.data.user || response.data;
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          sessionStorage.setItem('auth_user', JSON.stringify(userData));
          return userData;
        } else {
          logout();
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        logout();
      }
    } else {
      logout();
    }
    return null;
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = sessionStorage.getItem('sessionToken');
      if (token && token !== 'demo_token') {
        await fetchUserProfile();
      } else {
        logout();
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('auth_user', JSON.stringify(userData));
    setUser(userData);
    fetchUserProfile();
  };

  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('auth_user');
    sessionStorage.removeItem('sessionToken');
    sessionStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

