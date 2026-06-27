"use client"
import AuthEmail from '@/components/ui/AuthEmail'
import AuthPassword from '@/components/ui/AuthPassword'
import React, { useState } from 'react'
import Link from 'next/link'
import { Login } from '@/interface/login.schema'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/routes'
import Img from '@/components/ui/Image'
import MinHeader from '@/components/ui/MinHeader'
import { useMutation } from '@tanstack/react-query'
import { Doctor } from '@/lib/constant/service'
import { storageService } from '@/lib/storage'
// import { toast } from 'react-toastify'
import { LOGIN } from '@/lib/interface/login.interface'
// import { AxiosError } from 'axios'

const Page = () => {
    const [inputValue, setInputValue] = useState<Login>({
        workEmail: '',
        password: ''
    })
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
        mutationFn: (payload: LOGIN) => Doctor.login(payload),
        onSuccess: (response) => {
            console.log(response.data)
            storageService.setAuthToken(response.data.access_token)
          router.push(ROUTES.dashboard)
        },
        onError: (error: unknown) => {
            console.log(error)
            // toast.error(error?.response?.data)
          // Handle error
        }
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
       const credentials = {
        email: inputValue.workEmail,
        password: inputValue.password
       }

       await mutation.mutate(credentials)
    };

    return (
        <div className='min-h-screen flex flex-col lg:flex-row bg-white'>
            {/* Left side - Form area */}
            <div className='w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6  h-screen'>
                {/* Form container - centered blue-bordered box */}
                <div className=' w-full max-w-md'>
                    <MinHeader />
                    <div className='mb-6'>
                        <h1 className='font-semibold text-xl sm:text-2xl text-[#1B1818] mb-2 font-lato'>
                            Welcome Back, 
                        </h1>
                        <p className='text-sm text-[#645D5D] font-normal font-lato'>
                            Log in to your account
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
                            {mutation.isPending ? 'Processing..' : 'Log in'}
                        </button>
                    </form>
                </div>
            </div>
           <Img />
        </div>
    )
}

export default Page