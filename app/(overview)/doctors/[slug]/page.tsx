import { PageWrapper,} from '@/components/ui/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Appointment from './Appointment'
import Image from 'next/image'
import image from '@/assets/Image.png'
import { Trash2, ChevronRight  } from 'lucide-react'
import Overview from './Overview'
import Documents from './Documents'

const Page = () => {

  return (
    <PageWrapper >
        <div className="flex items-center space-x-1 border-b border-borderColor pb-3 pl-5 text-[12px] text-[#717680]">
            <p>Doctors</p>
            <ChevronRight size={15} />
            <p className='text-red-800'>Doctor Details</p>
        </div>
        <div className='bg-white p-6 border border-borderColor rounded-lg mt-5'>
            <div className="mb-3 flex items-center justify-between border-b pb-6 border-borderColor">
                <div className="flex items-center">
                <Image src={image} alt='Image' className="w-[50px] h-[50px] rounded-full" />
                <div className='ml-2'>
                    <p className='font-medium font-libre text-[14px] text-grey-800 mb-1'>Uche Abiodun</p>
                    <p className='text-[12px] font-inter text-grey-20'>olivia@untitledui.com</p>
                </div>
                </div>
                <button className='text-inter font-semibold text-[14px] text-white flex items-center space-x-2 bg-red-600 rounded-lg p-3 cursor-pointer '>
                    <Trash2 size={15} className='mr-2' />
                    Deactivate Doctor
                </button>
            </div>
            <Tabs defaultValue="overview" className='bg-white mt-4'>
                <TabsList >
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="availabilty">Availability</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="overview"><Overview /> </TabsContent>
                <TabsContent value="appointments"> <Appointment /> </TabsContent>
                <TabsContent value="availabilty">  </TabsContent>
                <TabsContent value="documents"> <Documents /> </TabsContent>
            </Tabs>
        </div>
    </PageWrapper>
  )
}

export default Page