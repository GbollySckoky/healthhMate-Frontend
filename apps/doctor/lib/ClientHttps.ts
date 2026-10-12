import axios from 'axios'
import { storageService } from '@/lib/constant/storage';
import { ROUTES } from './routes';
import { DOCTOR_ENDPOINTS } from './constant/endpoints';

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // headers:{
    //   'Content-Type': 'application/json'
    // }
  })

  api.interceptors.request.use(config => {
    const authToken = storageService.getAuthToken()
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    response => response,
    error => {
      if (typeof window === 'undefined') return Promise.reject(error);
      const requestPath = error.config?.url?.split('?')[0].replace(/^\/+|\/+$/g, '');
      const isLoginRequest = requestPath === DOCTOR_ENDPOINTS.LOGIN.replace(/^\/+|\/+$/g, '');
      if (error.response?.status === 401 && !isLoginRequest) {
        storageService.clearAuthData();
        if (window.location.pathname !== ROUTES.login) {
          window.location.replace(ROUTES.login);
        }
      }

      return Promise.reject(error);
    }
  );

export default api;
