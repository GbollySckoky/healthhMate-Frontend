import axios from 'axios'
import { storageService } from './storage';

const ClientHttps = () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:{
      'Content-Type': 'application/json'
    }
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
      const status = error.response ? error.response.status : null;
      
      if (status === 401 || !storageService.isAuthenticated()) {
        // Handle unauthorized access
        //  window.location.href = ROUTES.login
      } else if (status === 404) {
        // Handle not found errors
      } else {
        // Handle other errors
      }
      
      return Promise.reject(error);
    }
  );

  return api;
}

export default ClientHttps