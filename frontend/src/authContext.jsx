import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

  useEffect(() => {
    const refreshAccessToken = async () => {
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:3001/token/auth', { refreshToken });
          setAccessToken(response.data.accessToken);
          localStorage.setItem('accessToken', response.data.accessToken);
        } catch (error) {
          console.error('Error refreshing access token:', error);
        }
      }
    };

    const interval = setInterval(() => {
      refreshAccessToken();
    }, 15 * 60 * 1000); // Taux rafraichissement du token set à 15 minutes pour l'instant

    return () => clearInterval(interval);
  }, [refreshToken]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3001/token', { username, password });
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
