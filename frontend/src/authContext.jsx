import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [id, setId] = useState(localStorage.getItem('id'));
  const [isLoading, setIsLoading] = useState(true);

  const refreshAccessToken = async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedRefreshToken) {
      try {
        const response = await axios.post('http://localhost:3001/api/token/auth', { refreshToken: storedRefreshToken }, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        });
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setId(response.data.id); // Set the user ID
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        localStorage.setItem('id', response.data.id); // Store the user ID
        return newAccessToken;
      } catch (error) {
        console.error('Error refreshing access token:', error);
        logout();
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const initAuth = async () => {
      if (accessToken && isTokenExpired(accessToken)) {
        console.log('Access token is expired, attempting to refresh...');
        await refreshAccessToken();
      } else {
        console.log('Access token is valid.');
      }
      setIsLoading(false);
    };
    initAuth();
  }, [accessToken]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3002/login', { email, password });
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      setRole(response.data.role);
      setId(response.data.id);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('id', response.data.id);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setRole(null);
    setId(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    console.log('Logged out');
  };

  const isTokenExpired = (token) => {
    if (!token) return true;
    const { exp } = jwtDecode(token);
    const isExpired = Date.now() >= exp * 1000;
    console.log('Token expiration check:', isExpired ? 'expired' : 'valid');
    return isExpired;
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, role, id, isTokenExpired, refreshAccessToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
