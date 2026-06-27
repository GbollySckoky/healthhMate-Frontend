import axios from "axios";

// Create an Axios instance with proper headers
const admin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 
    'Content-Type': 'multipart/form-data'
  },
});

// Request interceptor to attach token
admin.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('authToken');
    console.log("Token from interceptor:", authToken); // Debugging log
  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }

  // Axios will automatically handle multipart/form-data
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

export default admin;