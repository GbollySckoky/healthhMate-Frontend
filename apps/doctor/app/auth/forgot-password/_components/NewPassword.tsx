"use client"
import AuthPassword from '@/components/ui/AuthPassword'
import { STEP } from '@/lib/step'
import React, { useState } from 'react'

const NewPassword = ({handleNextStep}: {handleNextStep: () => void}) => {
    const [inputValue, setInputValue] = useState({
        password: '',
        confirmPassword: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value
        }));
    };
    console.log(inputValue)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleNextStep()
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
            Create a New Password
        </h1>
        <p className='text-sm text-[#645D5D] font-normal font-lato'>
            Choose a strong password to secure your account.
        </p>
    </div>

    <form onSubmit={handleSubmit} className='space-y-4'>
        <AuthPassword
            label='Password'
            placeholder='****'
            value={inputValue.password}
            name='password'
            onChange={handleChange}
        />

        <AuthPassword
            label='Confirm Password'
            placeholder='****'
            value={inputValue.confirmPassword}
            name='confirmPassword'
            onChange={handleChange}
        />
        {/* Login button - pink background */}
        <button 
            type='submit'
            disabled={isLoading || !inputValue.password || !inputValue.confirmPassword}
            className='w-full bg-pink-600 hover:bg-pink-500 disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-10 font-inter'
        >
            {isLoading ? 'Saveing.....' : 'Save Password'}
        </button>
    </form>
</div>
  )
}

export default NewPassword