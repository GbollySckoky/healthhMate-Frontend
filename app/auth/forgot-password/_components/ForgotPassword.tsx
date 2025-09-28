"use client"
import AuthEmail from '@/components/Inputs/AuthEmail'
import { STEP } from '@/lib/step'
import React, { useState } from 'react'

const ForgotPassword = ({handleNextStep}: {handleNextStep: (value: number) => void}) => {
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleNextStep(STEP.ONE)
        setIsLoading(true);
   
        // try {
        //     // Add your authentication logic here
        //     console.log('Login attempt:', inputValue);
            
        //     // Simulate API call
        //     await new Promise(resolve => setTimeout(resolve, 1000));
            
        //     // Handle successful login (redirect, etc.)
            
        // } catch (error) {
        //     console.error('Login error:', error);
        //     // Handle login error
        // } finally {
        //     setIsLoading(false);
        // }
    };
  return (
    <div className=' w-full max-w-md'>
    <div className='mb-6'>
        <h1 className='font-semibold text-xl sm:text-2xl text-[#1B1818] mb-2 font-lato'>
            Forgot Password
        </h1>
        <p className='text-sm text-[#645D5D] font-normal font-lato'>
            Enter the email or phone number associated with your account. We’ll send a reset code.
        </p>
    </div>

    <form onSubmit={handleSubmit} className='space-y-4'>
        <AuthEmail
            label='Work Email'
            placeholder='admin@example.com'
            value={inputValue}
            name='email'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        />

        {/* Login button - pink background */}
        <button 
            type='submit'
            disabled={isLoading || !inputValue}
            className='w-full bg-pink-600  disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-6 font-inter'
        >
            {isLoading ? 'Sending.....' : 'Send Reset Code'}
        </button>
    </form>
</div>
  )
}

export default ForgotPassword