import { PageWrapper,} from '@/components/ui/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Appointments from './Appointments'
import Image from 'next/image'
import image from '@/assets/Image.png'
import { Trash2, ChevronRight  } from 'lucide-react'
import Overview from './Overview'

const Page = () => {

  return (
    <PageWrapper >
        <div className="flex items-center space-x-1 border-b border-borderColor pb-3 pl-5 text-[12px] text-[#717680]">
            <p>Patients</p>
            <ChevronRight size={15} />
            <p className='text-red-800'>Patient Details</p>
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
                <button className='text-inter font-semibold text-[14px] text-red-700 flex items-center space-x-2 border border-red-700 rounded-lg px-3 py-1 cursor-pointer '>
                    <Trash2 size={15} className='mr-2' />
                    Delete Patient
                </button>
            </div>
            <Tabs defaultValue="overview" className='bg-white mt-4'>
                <TabsList >
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                </TabsList>
                <TabsContent value="overview"><Overview /> </TabsContent>
                <TabsContent value="appointments"> <Appointments /> </TabsContent>
            </Tabs>
        </div>
    </PageWrapper>
  )
}

export default Page