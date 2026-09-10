export const STORAGE_KEYS = {
    HAS_LAUNCHED: 'app.hasLaunched',    
    AUTH_TOKEN: 'app.authToken',      
    USER_DATA: 'app.userData',          
    REFRESH_TOKEN: 'app.refreshToken',
  } as const;
  
  export const storageService = {
    // Auth Token
    getAuthToken: (): string | null => {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    },
    
    setAuthToken: (token: string): void => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    },
    
    removeAuthToken: (): void => {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    },
    
    // Refresh Token
    getRefreshToken: (): string | null => {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    },
    
    setRefreshToken: (token: string): void => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    },
    
    // Check if user is authenticated
    isAuthenticated: (): boolean => {
      if (typeof window === 'undefined') return false;
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      return token !== null;
    },
    
    // User Data
    getUserData: (): any | null => {
      if (typeof window === 'undefined') return null;
      const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      return data ? JSON.parse(data) : null;
    },
    
    setUserData: (userData: any): void => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    },
    
    // Has Launched
    getHasLaunched: (): boolean => {
      if (typeof window === 'undefined') return false;
      return localStorage.getItem(STORAGE_KEYS.HAS_LAUNCHED) === 'true';
    },
    
    setHasLaunched: (value: boolean): void => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(STORAGE_KEYS.HAS_LAUNCHED, String(value));
    },
    
    // Clear all auth data on logout
    clearAuthData: (): void => {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    },
  };