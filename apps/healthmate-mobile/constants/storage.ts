// constants/storage.ts
export const STORAGE_KEYS = {
  HAS_LAUNCHED: 'app.hasLaunched',
  AUTH_TOKEN: 'app.authToken',
  USER_DATA: 'app.userData',
  REFRESH_TOKEN: 'app.refreshToken',
} as const;

const isBrowser = typeof window !== 'undefined';

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
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  setAuthToken: (token: string): void => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  removeAuthToken: (): void => {
    if (!isBrowser) return;
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  // Refresh token
  getRefreshToken: (): string | null => {
    if (!isBrowser) return null;
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setRefreshToken: (token: string): void => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  removeRefreshToken: (): void => {
    if (!isBrowser) return;
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

  // Clear all auth data on logout
  clearAuthData: (): void => {
    if (!isBrowser) return;
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },
};