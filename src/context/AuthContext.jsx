import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth state from localStorage
    const checkAuth = setTimeout(() => {
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('auth_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    }, 500); // Simulated delay
    return () => clearTimeout(checkAuth);
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('auth_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('auth_user');
    sessionStorage.removeItem('sessionToken');
    sessionStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
