'use client'
import { FlexWrapper, PageWrapper,} from '@/lib/components/ui/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/ui/tabs"
import Image from 'next/image'
import image from '@/assets/default.jpg'
import Overview from './_components/Overview'
import Documents from './_components/Documents'
import { useQuery } from '@tanstack/react-query'
import { Doctor } from '@/lib/constant/service'
import DoctorProfileSkeleton from '@/lib/components/ui/DoctorProfileSkeleto'
// import { DOCTOR_PROFILE } from '@/lib/interface/get-doctor-profile.interface'

const Page = () => {
    const {data, isLoading, isError, error } = useQuery({
      queryKey: ['me'],
      queryFn: () => Doctor.getDoctor()
    })
    const profileData = data?.data

  return (
    <PageWrapper>
      <FlexWrapper>
        {isLoading ? (
          <DoctorProfileSkeleton />

        ) : (
          <div className='bg-white p-6 border border-borderColor rounded-lg mt-5'>
              <div className="mb-3  border-b pb-6 border-borderColor">
                  <div className="flex h-fit items-center justify-between">
                      <div className="flex items-center">
                        <Image 
                          src={profileData?.profile?.profilePicture || image} 
                          alt={profileData?.firstName} 
                          className="w-[50px] h-[50px] rounded-full border border-border" 
                          width={300} 
                          height={300} 
                        />
                        <div className='ml-2'>
                            <p className='font-medium font-libre text-[20px] text-grey-800 mb-1'>{profileData?.title} {`${profileData?.firstName.charAt(0).toUpperCase() + profileData?.firstName.slice(1) || ""} ${
                                profileData?.lastName.charAt(0).toUpperCase() + profileData?.lastName.slice(1) || ""
                              }`.trim() || "N/A"} </p>
                            <p className='text-[12px] font-inter bg-green-100 rounded-full px-3 w-fit py-1 text-green-900'>Active</p>
                        </div>
                      </div>
                  </div>
                  <div className='mt-3'>
                      <p className='font-semibold font-libre text-[14px] text-[#414651] pb-[2px]'>About me</p>
                      <p className='font-inter font-normal text-[14px] text-[#717680]'>{profileData?.profile?.bio || "N/A"}</p>
                  </div>
              </div>
              
              <Tabs defaultValue="overview" className='bg-white mt-4'>
                  <TabsList className='mb-5'>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview"><Overview  profileData={profileData} isLoading={isLoading} isError={isError} error={error} /> </TabsContent>
                  <TabsContent value="documents"> <Documents/> </TabsContent>
              </Tabs>
          </div>
        )}
        </FlexWrapper>
    </PageWrapper>
  )
}

export default Page