"use client"
import { FlexWrapper, PageWrapper,} from '@/lib/components/ui/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/ui/tabs"
import Appointment from './Appointment'
import Image from 'next/image'
import image from '@/assets/Image.png'
import { Trash2 } from 'lucide-react'
import Overview from './Overview'
import Documents from './Documents'
import { useQuery } from '@tanstack/react-query'
import { Hospital_Admin } from '@/lib/service/service'
import { useParams } from "next/navigation";
import { DoctorHeaderSkeleton } from '@/components/ui/DoctorDetailsSkeleton'


const Page = () => {
    const params = useParams();

    const hospitalId = params?.slug; // Access the hospitalId from the URL parameters
    const { data, isLoading } = useQuery({
        queryKey: ['getAllDoctor', hospitalId],
        queryFn: () => Hospital_Admin.getDoctorDetails(Number(hospitalId)),
        enabled: !!hospitalId
    });
    console.log('DATA!!', data?.data)
    const doctorDetails = data?.data || {}
    console.log('DOCTOR DETAILS!!', doctorDetails)
    console.log("Appoint:", doctorDetails.appointments)
  return (
    <PageWrapper >
        <FlexWrapper>
            <div className='bg-white p-6 border border-borderColor rounded-lg mt-5'>
                {isLoading ? (
                    <DoctorHeaderSkeleton />
                ) : (
                <div className="mb-3 flex items-center justify-between border-b pb-6 border-borderColor">
                    <div className="flex items-center">
                    <Image src={image} alt="Image" className="w-[50px] h-[50px] rounded-full" />

                    <div className="ml-2">
                        <p className="font-medium font-libre text-[14px] text-grey-800 mb-1">
                        {`${doctorDetails?.firstName || ""} ${
                            doctorDetails?.lastName || ""
                        }`.trim() || "-"}
                        </p>

                        <p className="text-[12px] font-inter text-grey-20">
                        {doctorDetails?.email || "-"}
                        </p>
                    </div>
                    </div>

                    <button className="text-inter font-semibold text-[14px] text-white flex items-center space-x-2 bg-red-600 rounded-lg p-3 cursor-pointer">
                    <Trash2 size={15} className="mr-2" />
                    Deactivate Doctor
                    </button>
                </div>
                )}
                <Tabs defaultValue="overview" className='bg-white mt-4'>
                    <TabsList >
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="appointments">Appointments</TabsTrigger>
                        <TabsTrigger value="availabilty">Availability</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview"><Overview doctorDetails={doctorDetails} isLoading={isLoading} /> </TabsContent>
                    <TabsContent value="appointments"> 
                        <Appointment
                            appointments={doctorDetails?.appointments || []}
                            isLoading={isLoading}
                        />
                    </TabsContent>
                    <TabsContent value="availabilty">  </TabsContent>
                    <TabsContent value="documents"> <Documents /> </TabsContent>
                </Tabs>
            </div>
        </FlexWrapper>
    </PageWrapper>
  )
}

export default Page
