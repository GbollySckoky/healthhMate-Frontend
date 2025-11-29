"use client"
import AuthEmail from '@/components/Inputs/AuthEmail'
import AuthPassword from '@/components/Inputs/AuthPassword'
import React, { useState } from 'react'
import Link from 'next/link'
import Img from '@/components/ui/Image'
import { ROUTES } from '@/lib/Routes'
import { Login } from '@/types/login.schema'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { Hospital_Admin } from '@/lib/constant/service'
import { LogIn } from '@/lib/interface/login.interface'


const Page = () => {
    const [inputValue, setInputValue] = useState<Login>({
        workEmail: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value
        }));
    };

    const mutation = useMutation({
        mutationFn: (payload: LogIn) => Hospital_Admin.login(payload),
        onSuccess: (response) => {
            console.log(response)
            router.push(ROUTES.dashboard)
          // Handle success
        },
        onError: (error: any) => {
            console.log(error)
          // Handle error
        }
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const data = {
            email: inputValue.workEmail ?? '',
            password: inputValue.password ?? ''
        }
        await mutation.mutate(data)
        
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
                            value={inputValue.workEmail}
                            name='workEmail'
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
                            disabled={mutation.isPending || !inputValue.workEmail || !inputValue.password}
                            className='w-full bg-pink-600  disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-6 font-inter'
                        >
                            {mutation.isPending ? 'Login In...' : 'Log in'}
                        </button>
                    </form>
                </div>
            </div>
           <Img />
        </div>
    )
}

export default Page