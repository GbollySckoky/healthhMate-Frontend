'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { storageService } from '@/constants/storage';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  const checkAuth = useCallback(() => {
    setIsAuthenticated(storageService.isAuthenticated());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback((token: string, refreshToken?: string) => {
    storageService.setAuthToken(token);
    if (refreshToken) storageService.setRefreshToken(refreshToken);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    storageService.clearAuthData();
    setIsAuthenticated(false);
    queryClient.clear();
    router.replace('/auth/login');
    router.refresh();
  }, [router, queryClient]);

  return { isAuthenticated, isLoading, login, logout, refresh: checkAuth };
}