// import LoadingSpinner from '@/components/ui/LoadingSpinner'
import {  Infos } from '@/components/ui/Reusable'
// import { DoctorProfile } from '@/lib/interface/profile-interface'
import React from 'react'

// interface DoctorOverview{
//   data: DoctorProfile
// }
const Overview = () => {

  return (
    <div>
          {/* ACCOUNT DETAILS */}
          <div className='mt-5 border-b border-borderColor pb-4'>
              <p className='font-semibold text-[18px] font-libre mb-3'>Account Details</p>
              <Infos label='Name:' value="Gbolahan Coker"/>
              <Infos label='Email:' value="gbolahan.coker@healthmate.com"/>
              <Infos label='Phone Number:' value='+234 803 456 7890'/>
          </div>
          {/* DOCTOR INFORMATION */}
          <div className='mt-5 border-b border-borderColor pb-4'>
              <p className='font-semibold text-[18px] font-libre mb-3'>Personal Information</p>
              <Infos label='Gender:' value={'Male'}/>
              <Infos label='Date of Birth:' value={"12th June, 2025"}/>
              <Infos label='Branch:' value={"Downtown Branch"}/>
              <Infos label='Department:' value={'Cardiology'}/>
              <Infos label='License Number:' value={"LIC-2025-001"}/>
              <Infos label='Address:' value={"123 Health Street, Downtown, City"}/>
              <Infos label='Hospital:' value={"HealthMate Hospital"}/>
          </div>
        {/* ACCOUNT ACTIVITY */}
        <div className='mt-5'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Account Activity</p>
            <Infos label='Total Consultations:' value='10'/>
            <Infos label='Avg Rating:' value={`⭐ 4.0 (29 reviews)`}/>
            <Infos label='Status:' value='Active'/>
            <Infos label='Last Login:' value='Today, 2:30 PM'/>
            <Infos label='Date Joined:' value={"12th June, 2025"}/>
        </div>
    </div>
  )
}

export default Overview