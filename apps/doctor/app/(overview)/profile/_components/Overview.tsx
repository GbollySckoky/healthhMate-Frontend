import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { FlexWrapper, Infos, PageWrapper } from '@/components/ui/Reusable'
import { DOCTOR_PROFILE } from '@/interface/get-doctor-profile.interface'
import React from 'react'


const Overview = ({profileData, isLoading, isError, error}:{profileData:DOCTOR_PROFILE, isLoading: boolean,isError: boolean, error: Error}) => {
    if (isLoading) {
        return (
        <PageWrapper>
          <FlexWrapper>
            <LoadingSpinner />
          </FlexWrapper>
        </PageWrapper>
        );
    }

    if (isError) {
        return (
        <div className="text-center py-10 text-red-600 text-sm">
            Failed to load patients. Please try again. {" "} {error.message}
        </div>
        );
    }
  return (
    <div>
          {/* ACCOUNT DETAILS */}
          <div className='mt-5 border-b border-borderColor pb-4'>
              <p className='font-semibold text-[18px] font-libre mb-3'>Account Details</p>
              <Infos label='Name:' value={profileData?.firstName || profileData?.lastName || "N/A" }  />
              <Infos label='Email:' value={profileData?.email}/>
              <Infos label='Phone Number:' value={profileData?.phoneNumber}/>
          </div>
          {/* DOCTOR INFORMATION */}
          <div className='mt-5 border-b border-borderColor pb-4'>
              <p className='font-semibold text-[18px] font-libre mb-3'>Personal Information</p>
              <Infos label='Gender:' value={profileData?.gender || 'N/A'}/> 
              <Infos label='Consultation Fee:' value={profileData?.profile?.consultationFee || 'N/A'}/>
              <Infos label='Years Of Experience:' value={profileData?.profile?.yearsOfExperience > 1 ? `${profileData?.profile?.yearsOfExperience} Years` : `${profileData?.profile?.yearsOfExperience}  Year`}/>
              <Infos label='Specialization:' value={profileData?.profile?.specialization || 'N/A'}/>
              <Infos label='License Number:' value={profileData?.profile?.liscenceNumber || 'N/A'}/>
              {/* <Infos label='Address:' value={"123 Health Street, Downtown, City"}/> */}
              <Infos label='Hospital:' value={profileData?.hospital?.hospitalName || 'N/A'}/>
          </div>
        {/* ACCOUNT ACTIVITY */}
        <div className='mt-5'>
            <p className='font-semibold text-[18px] font-libre mb-3'>Account Activity</p>
            <Infos label='Total Consultations:' value='10'/>
            <Infos label='Avg Rating:' value={`⭐ 4.0 (29 reviews)`}/>
            <Infos label='Status:' value='Active'/>
            <Infos label='Last Login:' value='Today, 2:30 PM'/>
            <Infos label='Date Joined:' value={new Date(profileData?.createdAt).toLocaleDateString() || 'N/A'}/>
        </div>
    </div>
  )
}

export default Overview