"use client"
import AuthEmail from '@/components/Inputs/AuthEmail'
import AuthPassword from '@/components/Inputs/AuthPassword'
import React, { useState } from 'react'
import Link from 'next/link'
import Img from '@/components/ui/Image'
import { ROUTES } from '@/lib/Routes'

const Page = () => {
    const [inputValue, setInputValue] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Add your authentication logic here
            console.log('Login attempt:', inputValue);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Handle successful login (redirect, etc.)
            
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex flex-col lg:flex-row bg-white'>
            {/* Left side - Form area */}
            <div className='w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6  h-screen'>
                {/* Form container - centered blue-bordered box */}
                <div className=' w-full max-w-md'>
                    <div className='mb-6'>
                        <h1 className='font-semibold text-xl sm:text-2xl text-[#1B1818] mb-2 font-lato'>
                            Welcome Back, Admin
                        </h1>
                        <p className='text-sm text-[#645D5D] font-normal font-lato'>
                            Log in to your hospital
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <AuthEmail
                            label='Work Email'
                            placeholder='admin@example.com'
                            value={inputValue.email}
                            name='email'
                            onChange={handleChange}
                        />
                        
                        <AuthPassword
                            label='Password'
                            placeholder='hswj****'
                            value={inputValue.password}
                            name='password'
                            onChange={handleChange}
                        />

                        {/* Remember me and Forgot password */}
                        <div className='flex items-center justify-between text-sm py-2'>
                            <label className='flex items-center space-x-2 text-gray-600'>
                                <input 
                                    type="checkbox" 
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className='w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-red-900'
                                />
                                <span className='text-xs sm:text-sm'>Remember me</span>
                            </label>
                            
                            <Link href={ROUTES.forgotPassword} className='text-red-800 hover:text-pink-600 transition-colors text-[14px] font-medium'>
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login button - pink background */}
                        <button 
                            type='submit'
                            disabled={isLoading || !inputValue.email || !inputValue.password}
                            className='w-full bg-pink-600  disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-6 font-inter'
                        >
                            {isLoading ? 'Signing In...' : 'Log in'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right side - Image (exactly as shown in Figma) */}
           <Img />
        </div>
    )
}

export default Page