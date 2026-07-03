"use client"
import { appointmentData } from '@/components/data';
import { Card, MediumText, PageWrapper, Value } from '@/components/ui/Reusable'
import React from 'react'
import { ArrowDown, ArrowUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AllAppointmentTable from './AllAppointmentTable';
import CompletedTable from './CompletedTable';
import PendingTable from './PendingTable';
import CancelledTable from './CancelledTable';
import { useQuery } from '@tanstack/react-query';
import { Hospital_Admin } from '@/lib/service/service';



const Appointment = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['appointment'],
        queryFn: () => Hospital_Admin.getPatients(),
    })
    console.log('DATA!!', data?.data)
    const appointments = data?.data || []
    // {isLoading ? (
    //         <div className="flex justify-center py-8">
    //           <LoadingSpinner />
    //         </div>
    //         ) : isError ? (
    //           <p className="text-center text-sm text-gray-500 py-20">
    //             {error.message}
    //           </p>
    //         ) : recentActivities.length === 0 ? (
    //           <p className="text-center py-8 text-gray-500 text-sm">
    //             No recent activities found
    //           </p>
    //         ) :
  return (
    <PageWrapper>
        <Card className='flex items-center gap-4 mb-5'>
            {appointmentData.map((appointment: any) => {
                const {id,  value,percent, about} = appointment;
                return(
                    <Card key={id}>
                        <MediumText> {about} </MediumText>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                                <Value>{value}</Value>
                            </div>
                            <div className={`flex items-center ${percent > 0 ? 'text-[#05A505]' :'text-[#F04438]'}`}>
                                {percent > 0 ? <ArrowUp size={15}  /> : <ArrowDown size={15} />}
                                <p>{percent}%</p>
                            </div>
                            
                        </div>
                    </Card>
                )
            })}
        </Card>
        {/* Tabs */}
        <Tabs defaultValue="allAppointment" >
            <TabsList  className="">
                <TabsTrigger value="allAppointment">All Appointment</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="allAppointment">  <AllAppointmentTable /> </TabsContent>
            <TabsContent value="completed"> <CompletedTable />  </TabsContent>
            <TabsContent value="pending"> <PendingTable />  </TabsContent>
            <TabsContent value="cancelled"> <CancelledTable />  </TabsContent>
        </Tabs>
    </PageWrapper>
  )
}

export default Appointment