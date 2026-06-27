import axios from 'axios';

const api = axios.create({
  baseURL: 'https://healthcare-backend-5y5b.onrender.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('access_token');

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  }
);

export default api;