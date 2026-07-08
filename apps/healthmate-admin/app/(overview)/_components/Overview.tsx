"use client"
import React from 'react'
import { Card, DisplayFlex, FlexWrapper, MediumText, MediumTitle, SmallText, SmallTitle, SmallestText, Text, Title, Value } from '../../../lib/components/ui/Reusable'
import { PageWrapper } from '../../../lib/components/ui/Reusable'
import {  CalendarDays } from 'lucide-react';
import { overviewData } from '../../../lib/components/data';
import { ArrowDown, ArrowUp } from "lucide-react"
import Earnings from './Earnings';
import { AppointmentTrends } from './AppointmentTrends';
import { ConsultDept } from './ConsultDept';
import UpcomingConsultation from './UpcomingConsultation';
import RecentActivities from './RecentActivities';
import { TopDoctors } from './TopDoctors';
import { useQuery } from '@tanstack/react-query';
import { Hospital_Admin } from '@/lib/service/service';

const Overview = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['stats'],
        queryFn: () => Hospital_Admin.getStats(),
    })
    console.log('DATA!!', data?.data)

    const stats = data?.data;
    const overviewData = [
    {
        id: 1,
        about: 'Total Doctors',
        value: stats?.totalDoctors ?? 0,
        percent: 12,
    },
    {
        id: 2,
        about: 'Registered Patients',
        value: stats?.totalPatients ?? 0,
        percent: 12,
    },
    {
        id: 3,
        about: 'Appointments Today',
        value: stats?.totalAppointmentsToday ?? 0,
        percent: -14,
    },
    {
        id: 4,
        about: 'Branches',
        value: stats?.branches ?? 0,
        percent: 10,
    },
    {
        id: 5,
            about: 'Completed Consults',
            value: stats?.appointments?.completedConsultation?.count ?? 0,
        percent: stats?.appointments?.completedConsultation?.percentage ?? 0,
        month: 'this month',
    },
    {
        id: 6,
        about: 'In Progress Consults',
        value: stats?.appointments?.pendingRequest?.count ?? 0,
        percent: stats?.appointments?.pendingRequest?.percentage ?? 0,
        month: 'this month',
    },
    {
        id: 7,
        about: 'Canceled Consults',
        value: stats?.appointments?.canceledConsultation?.count ?? 0,
        percent: stats?.appointments?.canceledConsultation?.percentage ?? 0,
        month: 'this month',
    },
    {
        id: 8,
        about: 'Pending Consults',
        value: stats?.appointments?.pendingConsultation?.count ?? 0,
        percent: stats?.appointments?.pendingConsultation?.percentage ?? 0,
        month: 'this month',
    },
]
  return (
    <PageWrapper>
        <FlexWrapper>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <Title>Welcome Admin,</Title>
                    <Text>Stay informed and in control of your hospital.😊</Text>
                </div> 
                <div className="flex bg-white rounded-lg p-3 border border-borderColor w-fit px-5 py-4">
                    <p className='bg-red-50 rounded-full p-3'> <CalendarDays size={18} /> </p>
                    <div className='ml-3 '>
                        <SmallText> Today’s Date </SmallText>
                        <SmallTitle>5th July, 2025</SmallTitle>
                    </div>
                </div>
            </div>
            {/* Overview */}
            <div className="flex justify-between gap-4 mb-7">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    isError ? (
                    <p>Error: {error.message}</p>
                    ) : (
                        <Card>
                    <MediumTitle>Overview</MediumTitle>
                    <div className="grid grid-cols-4 gap-4 mt-3">
                        {overviewData.map((overview) => {
                            const {id,  value,percent,month, about} = overview;
                            return(
                                <Card key={id}>
                                    <MediumText> {about} </MediumText>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center space-x-2">
                                            <Value>{value}</Value>
                                            {month && <SmallestText>{month} </SmallestText>}
                                        </div>
                                        <div className={`flex items-center ${percent > 0 ? 'text-[#05A505]' :'text-[#F04438]'}`}>
                                            {percent > 0 ? <ArrowUp size={15}  /> : <ArrowDown size={15} />}
                                            <p>{percent}%</p>
                                        </div>
                                        
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </Card>
                ))}
            
                <Earnings />
            </div>
            {/* Charts */}
            <DisplayFlex>
                <AppointmentTrends />
                <ConsultDept />
            </DisplayFlex>
            <div className="my-7 flex items-center  gap-5 ">
                <UpcomingConsultation />
                <RecentActivities />
            </div>
            <TopDoctors />
        </FlexWrapper>
        
    </PageWrapper>
  )
}

export default Overview