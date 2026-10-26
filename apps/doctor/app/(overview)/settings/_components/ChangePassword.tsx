"use client"
import InputField from '@/lib/components/ui/InputField'
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
        <form onSubmit={handleSubmit} className='mt-3'>
            <InputField
                type="password"
                placeholder='*****'
                label='Current Password'
                value={inputValue.currentPassword}
                onChange={handleChange}
                name='currentPassword'
            />
            <InputField
                type="password"
                placeholder='*****'
                label='New Password'
                value={inputValue.newPassword}
                onChange={handleChange}
                name='newPassword'
            />
            <InputField
                type="password"
                placeholder='*****'
                label='Confirm Password'
                value={inputValue.confirmPassword}
                onChange={handleChange}
                name='confirmPassword'
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