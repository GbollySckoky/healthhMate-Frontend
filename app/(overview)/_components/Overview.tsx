import React from 'react'
import { Card, MediumText, MediumTitle, SmallText, SmallTitle, SmallestText, Text, Title, Value } from '../../../components/reusable/Reusable'
import { PageWrapper } from '../../../components/reusable/Reusable'
import {  CalendarDays } from 'lucide-react';
import { overviewData } from '../../../components/data';
import { ArrowDown, ArrowUp } from "lucide-react"
import Earnings from './Earnings';

const Overview = () => {
  return (
    <PageWrapper>
        {/*  */}
        <div className="flex items-center justify-between mb-5">
            <div>
                <Title>Welcome Admin,</Title>
                <Text>Stay informed and in control of your hospital.😊</Text>
            </div> 
            <div className="flex bg-white rounded-lg p-3 border border-borderColor w-fit px-5 py-4">
                <p className='bg-red-50 rounded-full p-3'> <CalendarDays size={18} /> </p>
                <div className='ml-3'>
                    <SmallText> Today’s Date </SmallText>
                    <SmallTitle>5th July, 2025</SmallTitle>
                </div>
            </div>
        </div>
        {/* Overview */}
        <div className="flex justify-between gap-4">
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
            <Earnings />
        </div>
    </PageWrapper>
  )
}

export default Overview