"use client";
import React, { FormEvent, useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom'; // swap for your router (expo-router's `router` won't work on web)
import { patientService } from '@/service/patientService';
import { storageService } from '@/constants/storage';
import { ROUTES } from '@/constants/route';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
// import { storageService } from '@/lib/storage';
// import { ROUTES } from '@/lib/routes';

const LoginPage = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleChange = (key: string, value: string) => {
    setInputValue((prev) => ({ ...prev, [key]: value }));
  };

  const loginMutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) => patientService.login(payload),
    onSuccess: (response) => {
      console.log('access_token', response.data.access_token);
      storageService.setAuthToken(response.data.access_token);
    //   setToast({ type: 'success', message: 'Logged in successfully' });
      router.push(ROUTES.home);
    },
    onError: (error: AxiosError) => {
      console.log('ERROR!!!!', error?.response?.data?.message);
    //   setToast({ type: 'error', message: error.response.data.message });
    },
    retry: 3,
    retryDelay: 1000,
  });

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const credentials = {
      email: inputValue.email || '',
      password: inputValue.password || '',
    };
    loginMutation.mutate(credentials);
  };

  const isPending = loginMutation.isPending;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start sm:items-center justify-center px-4 py-10">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xl font-medium text-[#414651] font-lato">Welcome Back</p>
          <p className="text-sm text-[#717680] mt-1 font-lato font-normal">
            Log in to access your HealthMate account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5 mb-2">
          <div>
            <label htmlFor="email" className="block text-sm font-normal text-[#414651] mb-1.5 font-inter">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={inputValue.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full rounded-xl border border-[#D5D7DA] p-2 pr-11 text-[16px] text-gray-500 font-inter focus:outline-none text-sm font-normal mt-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-normal text-[#414651] mb-1.5 font-inter">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter password"
                value={inputValue.password || ''}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full rounded-xl border border-[#D5D7DA] p-2 pr-11 text-[16px] text-gray-500 font-inter focus:outline-none text-sm font-normal"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((v) => !v)}
                className="absolute right-0 top-12 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                {passwordVisible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me / Forgot password */}
          <div className="flex items-center justify-between mt-4 pb-2">
            <button
              type="button"
              onClick={() => setRememberMe((v) => !v)}
              className="flex items-center gap-2 "
            >
              <span
                className={`flex items-center justify-center border ${
                  rememberMe ? 'bg-pink-600 border-pink-500' : 'bg-white'
                }`}
              >
                {rememberMe && <Check size={12} className="text-white" strokeWidth={3} />}
              </span>
              <span className="text-sm text-[#C11574] font-libre">Remember me</span>
            </button>
            <p className="text-sm text-[#c11574] font-libre">
              Forgot Password?
            </p>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-pink-600 py-4 text-sm font-semibold text-white hover:bg-pink-500 disabled:bg-pink-500"
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Sign up */}
        <div className="flex justify-center items-center mb-6 text-sm font-libre">
          <span className="text-[#717680]">Don&apos;t have an account? </span>
          <button type="button" className="text-[#c11574] font-medium ml-1 hover:underline">
            Sign Up
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-5">
          <div className="flex-1 h-2px bg-[#D5D7DA]" />
          <span className="px-4 text-sm text-gray-400">Or</span>
          <div className="flex-1 h-2px bg-[#D5D7DA]" />
        </div>

        {/* Google sign-in */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#D5D7DA] py-2 text-sm font-medium text-gray-900"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.2-.1-2.3-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.6 15.8 18.9 13 24 13c3.1 0 5.9 1.1 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.6 0-14.2 4.3-17.7 10.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.5 0 10.5-2.1 14.2-5.6l-6.6-5.4C29.6 34.6 27 35.5 24 35.5c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.7 39.6 16.3 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.6 5.4C40.9 36 44 30.6 44 24c0-1.2-.1-2.3-.4-3.5z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;