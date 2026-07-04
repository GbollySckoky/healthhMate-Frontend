"use client"
import React from 'react'
import { Card, MediumText, MediumTitle, SmallText, SmallTitle, Text, Title, Value } from '@/components/ui/Reusable'
import {  CalendarDays } from 'lucide-react';
import { ArrowDown, ArrowUp } from "lucide-react"
import RecentActivities from './RecentActivities';
import UpcomingAppointment from './UpcomingAppointments';
import { RecentConsultation } from './RecentConsultation';
import Earnings from './Earnings';
import useGreeting from '@/hooks/useGreeting';
import { Doctor } from '@/lib/constant/service';
import { useQuery } from '@tanstack/react-query';
import { OverviewStatsSkeleton } from '@/components/ui/DashboardSkeleton';


const Overview = () => {
    const today = new Date().toLocaleDateString("en-us", {
        day: "numeric",
        year: "numeric",
        month: "long",
    })
    console.log(today) 
    const {greeting} = useGreeting()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getStats'],
        queryFn: () => Doctor.getStats(),
    })
    console.log('DATA!!', data?.data)

    const stats = data?.data;
    const overviewData = [
        {
            id: 5,
            about: 'Completed Consults',
            value: stats?.completedConsultation?.count ?? 0,
            percent: stats?.completedConsultation?.percentage ?? 0,
            month: 'this month',
        },
        {
            id: 6,
            about: 'In Progress Consults',
            value: stats?.pendingRequest?.count ?? 0,
            percent: stats?.pendingRequest?.percentage ?? 0,
            month: 'this month',
        },
        {
            id: 7,
            about: 'Canceled Consults',
            value: stats?.canceledConsultation?.count ?? 0,
            percent: stats?.canceledConsultation?.percentage ?? 0,
            month: 'this month',
        },
        {
            id: 8,
            about: 'Pending Consults',
            value: stats?.pendingConsultation?.count ?? 0,
            percent: stats?.pendingConsultation?.percentage ?? 0,
            month: 'this month',
        },
    ]
   
  return (
    <div className="p-8 min-h-screen bg-[#FAFAFA] mt-[65px]">
        <div className="flex items-center justify-between mb-5">
            <div>
                <Title>{greeting}, Dr. Uche </Title>
                <Text>You have 6 appointments today, take good care of their health.</Text>
            </div> 
            <div className="flex bg-white rounded-lg p-3 border border-borderColor w-fit px-5 py-4">
                <p className='bg-red-50 rounded-full p-3'> <CalendarDays size={18} /> </p>
                <div className='ml-3 '>
                    <SmallText> Today’s Date </SmallText>
                    <SmallTitle>{today}</SmallTitle>
                </div>
            </div>
        </div>
        <div className='flex items-center h-full gap-5'>
            <Card className='h-[170px]'>
                <MediumTitle>Overview</MediumTitle>
                {isLoading ? (
                    <OverviewStatsSkeleton />
                ): isError ? (
                    <div className="text-center text-grey-500">
                        {error.message || 'An error occurred while fetching overview data.'}
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-4 mt-3">
                        {overviewData.map((overview) => {
                            const {id,  value,percent, about} = overview;
                            return(
                                <Card key={id} className='overflow-x-auto text-nowrap'>
                                    <MediumText> {about} </MediumText>
                                    <div className="flex items-center justify-between mt-2">
                                        <Value>{value}</Value>
                                        <div className={`flex items-center ${percent > 0 ? 'text-[#05A505]' :'text-[#F04438]'}`}>
                                            {percent > 0 ? <ArrowUp size={15}  /> : <ArrowDown size={15} />}
                                            <p>{percent}%</p>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </Card>
            <Earnings />
        </div>
        <div className="my-7 flex items-center  gap-5 h-full">
            <UpcomingAppointment />
            <RecentActivities />
        </div>
        <RecentConsultation />
    </div>
  )
}

export default Overview