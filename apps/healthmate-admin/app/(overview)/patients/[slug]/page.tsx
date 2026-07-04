"use client"
import { PageWrapper,} from '@/components/ui/Reusable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Appointments from './Appointments'
import Image from 'next/image'
import image from '@/assets/Image.png'
import { Trash2  } from 'lucide-react'
import Overview from './Overview'
import DetailsNav from '@/components/ui/DetailsNav'
import { useQuery } from '@tanstack/react-query'
import { Hospital_Admin } from '@/lib/service/service'
import { GET_ALL_APPOINTMENTS } from '@/lib/interface/get_all_appointyment'
import { STATUS } from '@/types/status'
import { useParams } from 'next/navigation'


const Page = () => {
    const params = useParams();
    const id = Number(params.slug);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['appointment'],
        queryFn: () => Hospital_Admin.getAllAppointments(),
    })
    console.log('DATA!!', data?.data)
    const patientData = data?.data || []
    const patients = patientData?.filter((patient: GET_ALL_APPOINTMENTS) => patient.status !== STATUS.PENDING)
    const patient = patients.find((patient: GET_ALL_APPOINTMENTS) => patient.id === id)
    console.log("PATIENT", patient)
  return (
    <PageWrapper >
        <DetailsNav text='Patients' detailsText='Patient Details'/>
        <div className='bg-white p-6 border border-borderColor rounded-lg mt-5'>
            <div className="mb-3 flex items-center justify-between border-b pb-6 border-borderColor">
                <div className="flex items-center">
                <Image src={image} alt='Image' className="w-[50px] h-[50px] rounded-full" />
                <div className='ml-2'>
                    <p className='font-medium font-libre text-[14px] text-grey-800 mb-1'>{patient?.user.firstName} {patient?.user.lastName}</p>
                    <p className='text-[12px] font-inter text-grey-20'>{patient?.user.email}</p>
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
                <TabsContent value="overview"><Overview patient={patient} /> </TabsContent>
                <TabsContent value="appointments"> <Appointments /> </TabsContent>
            </Tabs>
        </div>
    </PageWrapper>
  )
}

export default Page