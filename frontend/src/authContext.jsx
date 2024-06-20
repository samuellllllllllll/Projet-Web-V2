import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [isLoading, setIsLoading] = useState(true);

  const refreshAccessToken = async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedRefreshToken) {
      try {
        console.log('Attempting to refresh access token...');
        const response = await axios.post('http://localhost:3001/api/token/auth', { refreshToken: storedRefreshToken }, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        });
        const newAccessToken = response.data.accessToken;
        console.log('Access token refreshed successfully:', newAccessToken);
        setAccessToken(newAccessToken);
        localStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
      } catch (error) {
        console.error('Error refreshing access token:', error);
        logout();
        return null;
      }
    }
    console.log('No refresh token found in local storage.');
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
      console.log('Attempting to log in with email:', email);
      const response = await axios.post('http://localhost:3002/login', { email, password });
      console.log('Login successful, setting tokens and role...');
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      setRole(response.data.role);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('role', response.data.role);
      console.log('Tokens and role set in state and local storage.');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('Logging out, clearing tokens and role...');
    setAccessToken(null);
    setRefreshToken(null);
    setRole(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    console.log('Tokens and role cleared from state and local storage.');
  };

  const isTokenExpired = (token) => {
    if (!token) return true;
    const { exp } = jwtDecode(token); // Decode the token to get the expiration time
    const isExpired = Date.now() >= exp * 1000; // Check if the current time is past the expiration time
    console.log('Token expiration check:', isExpired ? 'expired' : 'valid');
    return isExpired;
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, role, isTokenExpired, refreshAccessToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
