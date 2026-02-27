import { PageWrapper } from '@/components/ui/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from './Overview'
import Doctor from './Doctor'
import DetailsNav from '@/components/ui/DetailsNav'

const BranchDetails = () => {
  return (
    <PageWrapper>
        <DetailsNav text='Branches' detailsText='Branch Details'/>
        <div className='flex justify-between p-4 rounded-lg border border-borderColor100 my-5'>
            <div>
                <p className='font-libre font-medium text-[20px] text-grey-10'>Ikoyi Clinic</p>
                <p className='font-lato font-medium text-[16px] text-grey-20'>12B Bourdillion Road, Ikoyi Lagos</p>
            </div>
            <p className='text-[#027A48] font-inter text-[14px] bg-[#ECFDF3] rounded-lg p-2 h-fit'>Active</p>
        </div>
        <Tabs defaultValue="overview">
            <TabsList  className="mb-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="doctors"> Doctors </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <Overview />
            </TabsContent>
            <TabsContent value="doctors">
                <Doctor />
            </TabsContent>
        </Tabs>
    </PageWrapper>
  )
}

export default BranchDetails