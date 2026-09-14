"use client"
import PasswordInput from '@/lib/components/Inputs/PasswordInput'
import { Card, TableTitle, FlexWrapper, PageWrapper } from '@/lib/components/ui/Reusable'
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
    <PageWrapper>
      <FlexWrapper>
        <Card className='mt-5'>
          <TableTitle>Change Password</TableTitle>
          <form action="" className='mt-3'>
              <PasswordInput 
                  placeholder='*****'
                  label='Current Password'
                  value={inputValue.currentPassword}
                  onChange={handleChange}
                  name='currentPassword'
              />
              <PasswordInput 
                  placeholder='*****'
                  label='New Password'
                  value={inputValue.newPassword}
                  onChange={handleChange}
                  name='newPassword'
              />
              <PasswordInput 
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
    </FlexWrapper>
    </PageWrapper>
  )
}

export default ChangePassword