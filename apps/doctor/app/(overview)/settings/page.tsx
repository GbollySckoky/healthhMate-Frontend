import {  PageWrapper, TableTitle } from '@/components/ui/Reusable'
import React from 'react'
import ChangePassword from './_components/ChangePassword'


const Page = () => {
    const notifications = ["Email Notification", "In-App Notification", "Push Notification"]
  return (
    <PageWrapper className='w-[70%] mx-auto'>
        <div className='border border-borderColor rounded-lg p-3'>
            <TableTitle className='border-b  py-3'>Notification Preferences</TableTitle>
            {notifications.map((notification, index) => (
                <div className="flex items-center justify-between py-3" key={index}>
                    <p className='font-medium font-inter text-[16px] text-[#414651]'>{notification} </p>
                    <span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M19 12C19 13.6569 17.6569 15 16 15C14.3431 15 13 13.6569 13 12C13 10.3431 14.3431 9 16 9C17.6569 9 19 10.3431 19 12Z" stroke="currentColor" strokeWidth="1.5"></path>
    <path d="M16 6H8C4.68629 6 2 8.68629 2 12C2 15.3137 4.68629 18 8 18H16C19.3137 18 22 15.3137 22 12C22 8.68629 19.3137 6 16 6Z" stroke="currentColor" strokeWidth="1.5"></path>
</svg></span>
                </div>
            ))}
        </div>
        {/* Privacy & Availability */}
        <div className='border border-borderColor rounded-lg p-3 mt-5'>
            <TableTitle className='border-b  py-3'>Privacy & Availability</TableTitle>
            <div className="flex items-center justify-between py-3">
                <p className='font-medium font-inter text-[16px] text-[#414651]'> Allow new patients to find and book me</p>
                <input type="checkbox" />
            </div>
        </div>
        <ChangePassword />
    </PageWrapper>
  )
}

export default Page