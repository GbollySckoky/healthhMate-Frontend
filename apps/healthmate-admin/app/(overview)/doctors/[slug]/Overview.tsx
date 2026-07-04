import { Infos } from '@/components/ui/Reusable'
import { Data } from '@/lib/interface/doctor_details.interface'
import React from 'react'

const Overview = ({ doctorDetails }: { doctorDetails: Data }) => {
  return (
    
    <div>
        {/* ACCOUNT DETAILS */}
        <div className='mt-5 border-b border-borderColor pb-4'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Account Details</p>
            <Infos label='Name:' value={`${doctorDetails.firstName} ${doctorDetails.lastName}`}/>
            <Infos label='Email:' value={doctorDetails.email || '-'}/>
            <Infos label='Phone Number:' value={doctorDetails.phoneNumber || '-'}/>
        </div>
        {/* PERSONAL INFORMATION */}
        <div className='mt-5 border-b border-borderColor pb-4'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Personal Information</p>
            <Infos label='Gender:' value={doctorDetails.gender || '-'}/>
            <Infos label='Date of Birth:' value='Aug 2, 1985'/>
            <Infos label='Branch:' value='Lekki,Lagos'/>
            <Infos label='Department:' value='Cardiology'/>
            <Infos label='License Number:' value={doctorDetails.profile?.licenseNumber || '-'}/>
            {/* <Infos label='Address:' value={doctorDetails.profile?.address || '-'}/>   */}
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