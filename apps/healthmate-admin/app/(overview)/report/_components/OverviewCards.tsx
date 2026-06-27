import { overviewCardData } from '@/components/data';
import { Card, DisplayFlex, MediumText, MediumTitle, PageWrapper, SmallestText, Value } from '@/components/ui/Reusable';
import React from 'react'
import { ArrowDown, ArrowUp } from "lucide-react"
import { EarningsTrend } from './EarningsTrends';
import { AppointmentTrends } from '../../_components/AppointmentTrends';
import { ConsultDept } from '../../_components/ConsultDept';
import { PatientGrowth } from './PatientGrowth';
import { FinancialReport } from './FinancialReport';
import DoctorPerformannce from './DoctorPerformance';
import { CloudUpload } from 'lucide-react';


const OverviewCards = () => {
  return (
    <PageWrapper>
        {/* Generate Report */}
        <div className='flex justify-end mb-4'>
            <div className="flex bg-pink-600 text-white items-center cursor-pointer p-3 rounded-lg">
                <span> <CloudUpload size={15} /></span>
                <p className='ml-2 font-semibold text-[14px] font-inter'>Generate Report</p>
            </div>
        </div>
         {/* Overview */}
         <div className=" mb-7">
            <Card>
                <MediumTitle>Overview</MediumTitle>
                <div className="grid grid-cols-4 gap-4 mt-3">
                    {overviewCardData.map((overview) => {
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
        </div>
        <EarningsTrend />
        <div className="my-7 flex items-center  gap-5 h-full">
            <AppointmentTrends />
            <ConsultDept />
        </div>
        <div className="my-7 flex items-center  gap-5 h-full">
            <PatientGrowth/>
            <DoctorPerformannce />
        </div>
        <FinancialReport />
    </PageWrapper>
  )
}

export default OverviewCards