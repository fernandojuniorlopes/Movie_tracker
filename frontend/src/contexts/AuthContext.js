// /contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [token, setToken] = useState(storedToken || '');

  const login = (newToken) => {
    setIsLoggedIn(true);
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    const isConfirmed = window.confirm(`Are you sure you want to logout?`);
    if (isConfirmed) {
      setIsLoggedIn(false);
      setToken('');
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  useEffect(() => {
  }, [isLoggedIn, token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};