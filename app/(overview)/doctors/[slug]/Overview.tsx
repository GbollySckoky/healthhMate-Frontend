import { Card, Infos } from '@/components/reusable/Reusable'
import React from 'react'

const Overview = () => {
  return (
    <div>
        {/* ACCOUNT DETAILS */}
        <div className='mt-5 border-b border-borderColor pb-4'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Account Details</p>
            <Infos label='Name:' value='Dr. Sarah Johnson'/>
            <Infos label='Email:' value='sarah.johnson@hospital.com'/>
            <Infos label='Phone Number:' value='0907563932'/>
        </div>
        {/* PATIENT INFORMATION */}
        <div className='mt-5 border-b border-borderColor pb-4'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Personal Information</p>
            <Infos label='Gender:' value='Female'/>
            <Infos label='Date of Birth:' value='Aug 2, 1985'/>
            <Infos label='Branch:' value='Lekki,Lagos'/>
            <Infos label='Department:' value='Cardiology'/>
            <Infos label='License Number:' value='MDCN-2356215'/>
            <Infos label='Address:' value='12b, Bourdillon Road, Ikoyi, Lagos'/>
        </div>
        {/* ACCOUNT ACTIVITY */}
        <div className='mt-5'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Account Activity</p>
            <Infos label='Total Consultations:' value='10'/>
            <Infos label='Avg Rating:' value={`⭐ 4.0 (29 reviews)`}/>
            <Infos label='Status:' value='Active'/>
            <Infos label='Last Login:' value='Today, 2:30 PM'/>
            <Infos label='Date Joined:' value='Today, 2:30 PM'/>
        </div>
    </div>
  )
}

export default Overview