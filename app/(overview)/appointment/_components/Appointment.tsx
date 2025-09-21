import { appointmentData } from '@/components/data';
import { Card, MediumText, PageWrapper, Value } from '@/components/reusable/Reusable'
import React from 'react'
import { ArrowDown, ArrowUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AllAppointmentTable from './AllAppointmentTable';
import CompletedTable from './CompletedTable';
import PendingTable from './PendingTable';
import CancelledTable from './CancelledTable';



const Appointment = () => {
  return (
    <PageWrapper>
        <Card className='flex items-center gap-4 mb-5'>
            {appointmentData.map((appointment) => {
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