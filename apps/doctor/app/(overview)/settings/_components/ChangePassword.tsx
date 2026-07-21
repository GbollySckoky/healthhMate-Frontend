"use client"
import InputField from '@/lib/components/ui/InputField'
import { Card, TableTitle } from '@/lib/components/ui/Reusable'
import React, { useState } from 'react'

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

  return (
    <Card className='mt-5'>
        <TableTitle>Change Password</TableTitle>
        <form action="" className='mt-3'>
            <InputField 
                placeholder='*****'
                label='Current Password'
                value={inputValue.currentPassword}
                onChange={handleChange}
                name='currentPassword'
            />
            <InputField 
                placeholder='*****'
                label='New Password'
                value={inputValue.newPassword}
                onChange={handleChange}
                name='newPassword'
            />
            <InputField 
                placeholder='*****'
                label='Confirm Password'
                value={inputValue.confirmPassword}
                onChange={handleChange}
                name='confirmPassword'
            />
            <div className="flex justify-end ">
                <button className='bg-red-800 text-white font-medium w-fit px-4 py-2 rounded-lg text-[14px] my-4'>
                    Update Password
                </button>
            </div>
        </form>
    </Card>
  )
}

export default ChangePassword