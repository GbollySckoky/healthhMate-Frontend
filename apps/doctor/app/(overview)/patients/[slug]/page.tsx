"use client"
import { Card, FlexWrapper, PageWrapper } from '@/lib/components/ui/Reusable'
import React from 'react'
import Image from 'next/image'
import profileImage from '@/assets/Image (1).png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/ui/tabs"
import Overview from './_components/Overview'
import Consultation from './_components/Consultation'
import Prescription from './_components/Prescription'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Doctor } from '@/lib/constant/service'
import { Appointment } from '@/lib/interface/doctor-apppointment.interface'
import PatientCardSkeleton from '@/lib/components/ui/PatientCardSkeleton'
import { CapitalizeName } from '@/lib/constant/capitalizeName'
// import DetailSkeleton from '@/components/ui/DetailsSkeleton'


const Page = () => {
   const params = useParams()
    const id = String(params.slug)
    console.log(id);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getAppointmentDetails', id],
        queryFn: () => Doctor.getAppointmentDetail(id),
        enabled: !!id
    });
    console.log(data?.data);
    const appointmentDetails: Appointment = data?.data ?? {}

//   if (isError) {
//     return (
//       <div className="text-center py-10 text-sm text-grey-500">
//         Failed to load appointment details. {error.message}
//       </div>
//     );
//   }
  return (
    <PageWrapper>
        <FlexWrapper>
            {isLoading ? (
                <PatientCardSkeleton />
                ) : isError ? (
                    <div className="text-center py-10 text-sm text-grey-500">
                        Failed to load appointment details. {error?.message}
                    </div>
                ) : (   
                    <Card className="flex">
                    <div className="w-50 h-50">
                        <Image 
                            src={appointmentDetails?.user?.profile?.profilePicture} 
                            alt={appointmentDetails?.user?.firstName} 
                            className="h-fit w-[50px] border border-border rounded-full" 
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="ml-2">
                    <p className="font-medium text-[18px] text-grey-800">
                        {`${appointmentDetails?.user?.firstName || ""} ${
                        appointmentDetails?.user?.lastName || ""
                        }`.trim() || "-"}
                    </p>

                    <p className="font-normal text-[14px] text-grey-20 pt-[2px]">
                      {CapitalizeName(appointmentDetails?.user?.profile?.gender) || "-"}
                    </p>

                    <p className="font-normal text-[14px] text-grey-20 pt-[2px]">
                        {appointmentDetails?.user?.email || "-"}
                    </p>
                    </div>
                </Card>
            )}
            <Tabs defaultValue="overview"  className="mt-5 w-full">
                <TabsList className='w-full mb-5'>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="consultationNotes">Consultation notes</TabsTrigger>
                    <TabsTrigger value="prescription">Prescription</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">  
                    <Overview 
                        appointmentDetails={appointmentDetails} 
                        isLoading={isLoading}
                    /> 
                </TabsContent>
                <TabsContent value="consultationNotes"> <Consultation />  </TabsContent>
                <TabsContent value="prescription"> <Prescription />  </TabsContent>
            </Tabs>
        </FlexWrapper>
    </PageWrapper>
  )
}

export default Page