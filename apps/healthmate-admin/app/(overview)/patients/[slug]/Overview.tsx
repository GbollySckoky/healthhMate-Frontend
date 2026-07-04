import { Card, Infos } from '@/components/ui/Reusable'
import React from 'react'

const Overview = ({patient}:{patient: any}) => {
    console.log("PATIENT", patient)
  return (
    <div>
        {/* ACCOUNT DETAILS */}
        <div className='mt-5 border-b border-borderColor pb-4'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Account Details</p>
            <Infos label='Name:' value={patient?.user.firstName + ' ' + patient?.user.lastName} />
            <Infos label='Email:' value={patient?.user.email} />
            <Infos label='Phone Number:' value={patient?.user.phone} />
        </div>
        {/* PATIENT INFORMATION */}
        <div className='mt-5 border-b border-borderColor pb-4'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Patient Information</p>
            <Infos label='Gender:' value={patient?.user.gender || 'Not specified'} />
            <Infos label='Date of Birth:' value={patient?.user.dateOfBirth || 'Not specified'} />
        </div>
        {/* ACCOUNT ACTIVITY */}
        <div className='mt-5'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Account Activity</p>
            <Infos label='Total Appointments:' value={patient?.appointments?.length || '0'} />
            <Infos label='Status:' value={patient?.user.status || 'Not specified'} />
            <Infos label='Last Visit:' value={patient?.user.lastVisit || 'Not specified'} />
        </div>
    </div>
  )
}

export default Overview