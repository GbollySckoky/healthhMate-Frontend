"use client"
import NewPassword from '@/app/auth/forgot-password/_components/NewPassword'
import AuthPassword from '@/lib/components/Inputs/AuthPassword'
import PasswordInput from '@/lib/components/Inputs/PasswordInput'
import { Card, TableTitle, FlexWrapper, PageWrapper } from '@/lib/components/ui/Reusable'
import React, { useState } from 'react'


const ChangePassword = () => {
    const [inputValue, setInputValue] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    })

    const handleClick = (name: keyof typeof showPassword) => {
        setShowPassword((prev) => ({
            ...prev,
            [name]: !prev[name]
        }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value
        }));
      };

  return (
    <div className='px-5'>
        <TableTitle>Change Password</TableTitle>
        <form action="" className='mt-3'>
            <AuthPassword 
                placeholder='*****'
                label='Current Password'
                value={inputValue.currentPassword}
                onChange={handleChange}
                name='currentPassword'
                showPassword={showPassword.currentPassword}
                onClick={() => handleClick('currentPassword')}
            />
            <AuthPassword 
                placeholder='*****'
                label='New Password'
                value={inputValue.newPassword}
                onChange={handleChange}
                name='newPassword'
                showPassword={showPassword.newPassword}
                onClick={() => handleClick('newPassword')}  
            />
            <AuthPassword 
                placeholder='*****'
                label='Confirm Password'
                value={inputValue.confirmPassword}
                onChange={handleChange}
                name='confirmPassword'
                showPassword={showPassword.confirmPassword}
                onClick={() => handleClick('confirmPassword')}
            />
            <div className="flex justify-end ">
                <button className='bg-red-800 text-white font-medium w-fit px-4 py-2 rounded-lg text-[14px] my-4'>
                    Update Password
                </button>
            </div>
        </form>
    </div>
  )
}

export default ChangePassword