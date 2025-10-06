'use client'
import { PageWrapper,} from '@/components/ui/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import image from '@/assets/Image.png'
import Overview from './_components/Overview'
import Documents from './_components/Documents'
import { PencilLine } from 'lucide-react'
import { useFormModal } from '@/components/modal/FormModal'
import EditProfile from './_components/EditProfile'

const Page = () => {
    const {openModal} = useFormModal()
  return (
    <PageWrapper >
        <div className='bg-white p-6 border border-borderColor rounded-lg mt-5'>
            <div className="mb-3  border-b pb-6 border-borderColor">
                <div className="flex h-fit items-center justify-between">
                    <div className="flex items-center">
                      <Image src={image} alt='Image' className="w-[50px] h-[50px] rounded-full" />
                      <div className='ml-2'>
                          <p className='font-medium font-libre text-[20px] text-grey-800 mb-1'>Dr Uche Abiodun</p>
                          <p className='text-[12px] font-inter bg-green-100 rounded-full px-3 w-fit py-1 text-green-900'>Active</p>
                      </div>
                    </div>
                    <button className='font-inter font-semibold text-[14px] text-red-800 flex items-center space-x-2 border border-red-800 rounded-lg p-2 cursor-pointer '
                    onClick={() =>
                        openModal(<EditProfile
                          />, {
                          title:
                            'Edit Profile',
                          className: 'max-w-lg',
                          onClose: () => {},
                        })
                      }>
                        <PencilLine size={15} className='mr-2' />
                        Edit Profile
                    </button>
                </div>
                <div className='mt-3'>
                    <p className='font-semibold font-libre text-[14px] text-[#414651] pb-[2px]'>About me</p>
                    <p className='font-inter font-normal text-[14px] text-[#717680]'>I am a General Practitioner with over 8years experience. I help patients manage chronic migraines and sleep issues with comprehensive care approaches.</p>
                </div>
            </div>
            
            <Tabs defaultValue="overview" className='bg-white mt-4'>
                <TabsList className='mb-5'>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="overview"><Overview /> </TabsContent>
                <TabsContent value="documents"> <Documents /> </TabsContent>
            </Tabs>
        </div>
    </PageWrapper>
  )
}

export default Page