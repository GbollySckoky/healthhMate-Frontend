// constants/storage.ts
export const STORAGE_KEYS = {
  HAS_LAUNCHED: 'app.hasLaunched',
  AUTH_TOKEN: 'app.authToken',
  USER_DATA: 'app.userData',
  REFRESH_TOKEN: 'app.refreshToken',
  CALL_SESSION_ID: 'callSessionId'
} as const;

const isBrowser = typeof window !== 'undefined';

const getCookie = (name: string): string | null => {
  if (!isBrowser) return null;
  const prefix = `${name}=`;
  const cookie = document.cookie.split('; ').find((item) => item.startsWith(prefix));
  if (!cookie) return null;
  try {
    return decodeURIComponent(cookie.slice(prefix.length)) || null;
  } catch {
    return null;
  }
};

const setCookie = (name: string, value: string): void => {
  if (!isBrowser) return;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax${secure}`;
};

const removeCookie = (name: string): void => {
  if (!isBrowser) return;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
};

export const storageService = {
  hasLaunched: (): boolean => {
    if (!isBrowser) return false;
    return localStorage.getItem(STORAGE_KEYS.HAS_LAUNCHED) !== null;
  },

  setHasLaunched: (): void => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.HAS_LAUNCHED, 'true');
  },

  // Auth token
  getAuthToken: (): string | null => {
    if (!isBrowser) return null;
    return getCookie(STORAGE_KEYS.AUTH_TOKEN);
  },

  setAuthToken: (token: string): void => {
    if (!isBrowser) return;
    setCookie(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  removeAuthToken: (): void => {
    if (!isBrowser) return;
    removeCookie(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  // Refresh token
  getRefreshToken: (): string | null => {
    if (!isBrowser) return null;
    return getCookie(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setRefreshToken: (token: string): void => {
    if (!isBrowser) return;
    setCookie(STORAGE_KEYS.REFRESH_TOKEN, token);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  removeRefreshToken: (): void => {
    if (!isBrowser) return;
    removeCookie(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  isAuthenticated: (): boolean => {
    return storageService.getAuthToken() !== null;
  },

  // User data
  getUserData: <T = unknown>(): T | null => {
    if (!isBrowser) return null;
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? (JSON.parse(data) as T) : null;
  },

  setUserData: (userData: unknown): void => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  },

  setCallSessionId: (token: string): void => {
    if (!isBrowser) return 
    sessionStorage.setItem(STORAGE_KEYS.CALL_SESSION_ID, token)
  },

  getCallSessionId: (): string | null => {
    if (!isBrowser) return null;
    return localStorage.getItem(STORAGE_KEYS.CALL_SESSION_ID);
  },

  removeCallSessionId: (): void => {
    if (!isBrowser) return;
    localStorage.removeItem(STORAGE_KEYS.CALL_SESSION_ID);
  },

  // Clear all auth data on logout
  clearAuthData: (): void => {
    if (!isBrowser) return;
    removeCookie(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    removeCookie(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },
};
