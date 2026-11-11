"use client"
import AuthPassword from '@/lib/components/Inputs/AuthPassword'
import { TableTitle } from '@/lib/components/ui/Reusable'
import React, { useState } from 'react'
import useChangePassword from '@/lib/hooks/useChangePassword'
import { toast } from 'react-toastify'


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

    const { isPending, mutation } = useChangePassword()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isPending) return
        if (!inputValue.currentPassword || !inputValue.newPassword || !inputValue.confirmPassword) {
            toast.error('Please fill in all password fields')
            return
        }
        if (inputValue.newPassword !== inputValue.confirmPassword) {
            toast.error('New passwords do not match')
            return
        }
        mutation({
            oldPassword: inputValue.currentPassword,
            newPassword: inputValue.newPassword
        })
    }

  return (
    <div className='px-5'>
        <TableTitle>Change Password</TableTitle>
        <form onSubmit={handleSubmit} className='mt-3'>
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
                <button type='submit' disabled={isPending} className='bg-red-800 text-white font-medium w-fit px-4 py-2 rounded-lg text-[14px] my-4'>
                    {isPending ? 'Processing...' : 'Update Password'}
                </button>
            </div>
        </form>
    </div>
  )
}

export default ChangePassword