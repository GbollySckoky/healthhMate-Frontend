import axios from 'axios'

const Clienthttps = () => {
  const api = axios.create({
    baseURL: 'https://healthteamapi.onrender.com/api/',
    headers:{
        'Content-Type': 'application/json'
    }
  })

  api.interceptors.request.use(config => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    response => response,
    error => {
      const status = error.response ? error.response.status : null;
      
      if (status === 401) {
        // Handle unauthorized access
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

export default Clienthttps