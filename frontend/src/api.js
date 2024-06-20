import axios from 'axios';
import AuthContext from './authContext.jsx';
import { useContext } from 'react';

const useAPI = () => {
  const { accessToken, refreshToken, logout, refreshAccessToken } = useContext(AuthContext);

  const API = axios.create({ baseURL: 'http://localhost:3001/api' });

  let isRefreshing = false;
  let refreshSubscribers = [];

  const onRrefreshed = (token) => {
    console.log("on hold");
    refreshSubscribers.map((callback) => callback(token));
  };

  const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
  };

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
    const { response } = error;
    const originalRequest = error.config;

    if (response.status === 401 && !originalRequest._retry && refreshToken) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newAccessToken = await refreshAccessToken();
          isRefreshing = false;
          onRrefreshed(newAccessToken);
          refreshSubscribers = [];
        } catch (err) {
          logout();
          return Promise.reject(error);
        }
      }

      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          resolve(API(originalRequest));
        });
      });

      return retryOriginalRequest;
    }

    return Promise.reject(error);
  });

  return API;
};

export default useAPI;
