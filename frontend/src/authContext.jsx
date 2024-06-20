import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const refreshAccessToken = async () => {
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (storedRefreshToken) {
        try {
          const response = await axios.post('http://localhost:3002/token/auth', { refreshToken: storedRefreshToken }, {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
            },
          });
          setAccessToken(response.data.accessToken);
          localStorage.setItem('accessToken', response.data.accessToken);
        } catch (error) {
          console.error('Error refreshing access token:', error);
          logout();
        }
      }
    };

    const interval = setInterval(() => {
      refreshAccessToken();
    }, 15 * 60 * 1000); // Refresh the token every 15 minutes

    return () => clearInterval(interval);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3002/login', { email, password });
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      setRole(response.data.role);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('role', response.data.role);
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
