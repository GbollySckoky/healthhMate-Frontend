import axios from "axios";
import { clearAuthSession } from "./auth-session";
import { ROUTES } from "../constant/Routes";
import { ADMIN_ENDPOINTS } from "../constant/endpoints";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30_000,
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;
  const authToken = localStorage.getItem("access_token");

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window === "undefined") return Promise.reject(error);

    const requestPath = error.config?.url?.split("?")[0]?.replace(/\/$/, "");
    const isLoginRequest = requestPath?.endsWith(
      ADMIN_ENDPOINTS.LOGIN.replace(/\/$/, ""),
    );
    const alreadyOnLoginPage = window.location.pathname === ROUTES.login;

    if (error.response?.status === 401 && !isLoginRequest) {
      clearAuthSession();
      if (!alreadyOnLoginPage) {
        window.location.replace(ROUTES.login);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
