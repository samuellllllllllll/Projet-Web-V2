import axios from 'axios';
import AuthContext from './authContext.jsx';
import { useContext } from 'react';

const useAPI = () => {
  const { accessToken, refreshToken, logout } = useContext(AuthContext);

  const API = axios.create({ baseURL: '/api' });

  API.interceptors.request.use(config => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  API.interceptors.response.use(response => {
    return response;
  }, async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;
      try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/api/token/auth', { refreshToken: storedRefreshToken });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        logout();
      }
    }
    return Promise.reject(error);
  });

  return API;
};

export default useAPI;
