// /contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [token, setToken] = useState(storedToken || '');

  const login = async(email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const tokenObject = await response.json();
        const tokenString = tokenObject.token;
        // AuthContext to update authentication state
        setIsLoggedIn(true);
        setToken(tokenString);
        localStorage.setItem('token', tokenString);
        window.location.href = '/';
        return response;
      } else {
        console.error('Error logging in');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }

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

  const register = async(username, email,password) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response;
      console.log(response);
      return data;
    } catch (error) {
      console.error('Error registering:', error);
    }
  }

  useEffect(() => {
  }, [isLoggedIn, token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};