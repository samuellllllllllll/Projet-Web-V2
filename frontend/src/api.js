import axios from 'axios';
import AuthContext from './authContext.jsx';
import { useContext } from 'react';

const useAPI = () => {
  const { accessToken, login, logout } = useContext(AuthContext);

  const API = axios.create({ baseURL: 'http://localhost:3001' });

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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://localhost:3001/token/auth', { refreshToken });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
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
