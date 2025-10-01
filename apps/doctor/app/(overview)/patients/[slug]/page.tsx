import { Card, PageWrapper } from '@/components/ui/Reusable'
import React from 'react'
import Image from 'next/image'
import profileImage from '@/assets/Image (1).png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from './_components/Overview'
import Consultation from './_components/Consultation'
import Prescription from './_components/Prescription'


const Page = () => {
  return (
    <PageWrapper>
        <Card className='flex '>
            <Image src={profileImage} alt="Profile Image" className='h-fit w-[50px]'/>
            <div className='ml-2'>
                <p className='font-medium text-[18px] text-grey-800'>Janet Okeke</p>
                <p className='font-normal text-[14px] text-grey-20 pt-[2px]'>34 y/o — Female</p>
                <p className='font-normal text-[14px] text-grey-20 pt-[2px]'>olivia@untitledui.com</p>
            </div>
        </Card>
        <Tabs defaultValue="overview" >
            <TabsList  className="">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="consultationNotes">Consultation notes</TabsTrigger>
                <TabsTrigger value="prescription">Prescription</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">  <Overview /> </TabsContent>
            <TabsContent value="consultationNotes"> <Consultation />  </TabsContent>
            <TabsContent value="prescription"> <Prescription />  </TabsContent>
        </Tabs>
    </PageWrapper>
  )
}

export default Page