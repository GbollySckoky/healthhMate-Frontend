import axios from 'axios';
import { storageService } from '@/constants/storage';

const api = axios.create({
  baseURL: 'https://healthcare-backend-5y5b.onrender.com/api/v1/',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const authToken = storageService.getAuthToken();

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window === 'undefined') return Promise.reject(error);

    const isLoginRequest = error.config?.url?.includes('/auth/login');
    const alreadyOnLoginPage = window.location.pathname.startsWith('/auth/login');

    if (error.response?.status === 401 && !isLoginRequest && !alreadyOnLoginPage) {
      storageService.clearAuthData();
      window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  }
);

export default api;