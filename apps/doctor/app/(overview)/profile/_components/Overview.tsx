import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Card, Infos } from '@/components/ui/Reusable'
import { DoctorProfile } from '@/interface/profile-interface'
import React from 'react'

// interface DoctorOverview{
//   data: DoctorProfile
// }
const Overview = ({data,isLoading}:{data: DoctorProfile, isLoading: boolean}) => {
  console.log('testing..', data)
  return (
    <div>
      {isLoading ? (
         <LoadingSpinner />
      ):(
        <>
          {/* ACCOUNT DETAILS */}
          <div className='mt-5 border-b border-borderColor pb-4'>
              <p className='font-semibold text-[18px] font-libre mb-3'>Account Details</p>
              <Infos label='Name:' value={data.full_name || "N/A"}/>
              <Infos label='Email:' value={data.email || "N/A"}/>
              <Infos label='Phone Number:' value={data.phone_number || "N/A"}/>
          </div>
          {/* DOCTOR INFORMATION */}
          <div className='mt-5 border-b border-borderColor pb-4'>
              <p className='font-semibold text-[18px] font-libre mb-3'>Personal Information</p>
              <Infos label='Gender:' value={data.gender || "N/A"}/>
              <Infos label='Date of Birth:' value={data.date_of_birth || "N/A"}/>
              <Infos label='Branch:' value={data.branch || "N/A"}/>
              <Infos label='Department:' value={'Cardiology'}/>
              <Infos label='License Number:' value={data.license_number || "N/A"}/>
              <Infos label='Address:' value={data.address || "N/A"}/>
              <Infos label='Hospital:' value={data.hospital || "N/A"}/>
          </div>
        </>
      )}
        {/* ACCOUNT ACTIVITY */}
        <div className='mt-5'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Account Activity</p>
            <Infos label='Total Consultations:' value='10'/>
            <Infos label='Avg Rating:' value={`⭐ 4.0 (29 reviews)`}/>
            <Infos label='Status:' value='Active'/>
            <Infos label='Last Login:' value='Today, 2:30 PM'/>
            <Infos label='Date Joined:' value={data?.date_joined || "N/A"}/>
        </div>
    </div>
  )
}

export default Overview