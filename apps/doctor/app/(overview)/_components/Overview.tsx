"use client"
import React from 'react'
import { Card, MediumText, MediumTitle, SmallText, SmallTitle, Text, Title, Value } from '@/components/ui/Reusable'
import { PageWrapper } from '../../../components/ui/Reusable'
import {  CalendarDays } from 'lucide-react';
import { overviewData } from '@/components/ui/data';
import { ArrowDown, ArrowUp } from "lucide-react"
import RecentActivities from './RecentActivities';
import UpcomingAppointment from './UpcomingAppointments';
import { RecentConsultation } from './RecentConsultation';
import Earnings from './Earnings';


const Overview = () => {
  return (
    <PageWrapper>
        {/*  */}
        <div className="flex items-center justify-between mb-5">
            <div>
                <Title>Goodmorning Dr. Uche 🌞,</Title>
                <Text>You have 6 appointments today, take good care of their health.</Text>
            </div> 
            <div className="flex bg-white rounded-lg p-3 border border-borderColor w-fit px-5 py-4">
                <p className='bg-red-50 rounded-full p-3'> <CalendarDays size={18} /> </p>
                <div className='ml-3 '>
                    <SmallText> Today’s Date </SmallText>
                    <SmallTitle>5th July, 2025</SmallTitle>
                </div>
            </div>
        </div>
        <div className='flex items-center h-full gap-5'>
            <Card className='h-[170px]'>
                <MediumTitle>Overview</MediumTitle>
                <div className="grid grid-cols-4 gap-4 mt-3">
                    {overviewData.map((overview) => {
                        const {id,  value,percent, about} = overview;
                        return(
                            <Card key={id}>
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
            </Card>
            <Earnings />
        </div>
        <div className="my-7 flex items-center  gap-5 h-full">
            <UpcomingAppointment />
            <RecentActivities />
        </div>
        <RecentConsultation />
    </PageWrapper>
  )
}

export default Overview