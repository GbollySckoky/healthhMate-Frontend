"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageWrapper } from '@/components/ui/Reusable'
import AllAppointmentTable from './_components/All'
import CompletedTable from './_components/Completed'
import PendingTable from './_components/PendingTable'
import CancelledTable from './_components/CancelledTable'
import { useQuery } from '@tanstack/react-query'
import { Doctor } from '@/lib/constant/service'


const Page = () => {
  // const {data, isLoading, error, isError} = useQuery({
  //   queryKey: ['getAppointment'],
  //   queryFn: () => Doctor.getAppointment()
  // })

  // console.log(data)
  return (
    <PageWrapper>
        <Tabs defaultValue="allAppointment" >
            <TabsList  className="mb-5">
                <TabsTrigger value="allAppointment">All Appointment</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="allAppointment"> <AllAppointmentTable /> </TabsContent>
            <TabsContent value="completed"> <CompletedTable />  </TabsContent>
            <TabsContent value="pending"> <PendingTable />  </TabsContent>
            <TabsContent value="cancelled">  <CancelledTable /> </TabsContent>
        </Tabs>
    </PageWrapper>
  )
}

export default Page